import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, FolderOpen, Calendar, ArrowLeft, Search } from "lucide-react";

// Mock data - in real app, this would come from API
const mockProjects = [
  {
    id: "proj-1",
    name: "E-commerce Store",
    description: "Full-featured online store with cart and checkout",
    template: "ecommerce",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: "active",
  },
  {
    id: "proj-2",
    name: "Portfolio Website",
    description: "Personal portfolio with project showcase",
    template: "portfolio",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    status: "active",
  },
  {
    id: "proj-3",
    name: "Dashboard App",
    description: "Analytics dashboard with charts and metrics",
    template: "dashboard",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    status: "active",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">My Projects</h1>
          </div>
          <Button asChild>
            <Link href="/workspace/new">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          {/* Projects Grid */}
          {mockProjects.length === 0 ? (
            <Card className="p-12 text-center">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first project to get started
              </p>
              <Button asChild>
                <Link href="/workspace/new">Create New Project</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof mockProjects[0] }) {
  return (
    <Link href={`/workspace/${project.id}`}>
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Updated {formatRelativeTime(project.updatedAt)}</span>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium">
                Active
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
