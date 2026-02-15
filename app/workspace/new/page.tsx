"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowLeft, Wand2 } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

const templates = [
  {
    id: "blank",
    name: "Blank Project",
    description: "Start with a clean slate",
    icon: "📝",
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Modern marketing landing page",
    icon: "🚀",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Admin dashboard with charts",
    icon: "📊",
  },
  {
    id: "blog",
    name: "Blog",
    description: "Content-focused blog layout",
    icon: "✍️",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online store with cart",
    icon: "🛒",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio site",
    icon: "💼",
  },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    // Generate a project ID
    const projectId = `proj-${Date.now()}`;
    router.push(`/workspace/${projectId}`);
  };

  const handleAIGenerate = async () => {
    if (!projectDescription.trim()) return;

    setIsGenerating(true);

    // Generate a project ID
    const projectId = `ai-proj-${Date.now()}`;

    // In a real app, this would call the AI to generate the full project
    setTimeout(() => {
      router.push(`/workspace/${projectId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </a>
          </Button>
        </div>
      </header>

      <main className="container px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Create New Project</h1>
            <p className="text-xl text-muted-foreground">
              Start from scratch or let AI generate it for you
            </p>
          </div>

          {/* AI Generation Section */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                AI-Powered Generation
              </CardTitle>
              <CardDescription>
                Describe your app idea and let AI create it for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-description">App Description</Label>
                <Textarea
                  id="ai-description"
                  placeholder="Describe your app in detail. For example: 'A task management app with drag-and-drop, due dates, and team collaboration features'"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ai-project-name">Project Name</Label>
                <Input
                  id="ai-project-name"
                  placeholder="My Awesome App"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <Button
                onClick={handleAIGenerate}
                disabled={!projectDescription.trim() || !projectName.trim() || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Template Selection */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose a Template</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div className="text-4xl mb-2">{template.icon}</div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Manual Creation */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Setup</CardTitle>
              <CardDescription>
                Create a blank project or customize a template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="my-project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <Button
                onClick={handleCreateProject}
                disabled={!projectName.trim()}
                className="w-full"
                size="lg"
              >
                {selectedTemplate ? `Create from ${selectedTemplate} Template` : "Create Blank Project"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
