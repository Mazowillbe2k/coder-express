import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Get all projects from user's workspaces
    const { data: workspaces } = await supabase
      .from("workspaces")
      .select("id, name")
      .eq("owner_id", profile.id);

    if (!workspaces || workspaces.length === 0) {
      return NextResponse.json({ projects: [] });
    }

    const workspaceIds = workspaces.map((w) => w.id);

    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .in("workspace_id", workspaceIds)
      .order("updated_at", { ascending: false });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, workspaceId, templateId } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Get user's default workspace or create one
    let workspace;

    if (workspaceId) {
      const { data } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId)
        .eq("owner_id", user.id)
        .single();

      workspace = data;
    }

    if (!workspace) {
      // Create default workspace
      const { data: newWorkspace } = await supabase
        .from("workspaces")
        .insert({
          name: "My Workspace",
          slug: `workspace-${Date.now()}`,
          owner_id: user.id,
        })
        .select()
        .single();

      workspace = newWorkspace;
    }

    // Create project
    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        workspace_id: workspace.id,
        name,
        description,
        template_id: templateId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
