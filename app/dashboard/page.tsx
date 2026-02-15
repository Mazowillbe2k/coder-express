import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Sparkles, FolderOpen, Clock, Zap } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AI App Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to AI App Builder</h1>
            <p className="text-xl text-muted-foreground">
              Describe your app idea and let AI create it for you
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <ActionCard
              icon={<Plus className="w-6 h-6" />}
              title="Create New Project"
              description="Start from scratch or use a template"
              href="/workspace/new"
              color="primary"
            />
            <ActionCard
              icon={<FolderOpen className="w-6 h-6" />}
              title="My Projects"
              description="View and manage your existing projects"
              href="/projects"
              color="secondary"
            />
            <ActionCard
              icon={<Clock className="w-6 h-6" />}
              title="Recent Activity"
              description="See your latest edits and changes"
              href="/activity"
              color="muted"
            />
          </div>

          {/* Templates Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Start with a Template</h2>
              <Button variant="outline" asChild>
                <Link href="/templates">View All Templates</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TemplateCard
                title="Landing Page"
                description="Modern marketing landing page"
                category="Marketing"
                href="/workspace/new?template=landing-page"
              />
              <TemplateCard
                title="Dashboard"
                description="Admin dashboard with charts"
                category="Admin"
                href="/workspace/new?template=dashboard"
              />
              <TemplateCard
                title="E-commerce"
                description="Online store with cart"
                category="E-commerce"
                href="/workspace/new?template=ecommerce"
              />
              <TemplateCard
                title="Blog"
                description="Content-focused blog layout"
                category="Content"
                href="/workspace/new?template=blog"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI-Powered Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Describe what you want to build in plain English, and our AI agents
                  will generate production-ready code instantly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See your changes in real-time with hot-reload enabled preview. Test on
                  desktop, tablet, and mobile views.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  href,
  color = "primary",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color?: "primary" | "secondary" | "muted";
}) {
  const colorClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    muted: "bg-muted text-muted-foreground hover:bg-muted/80",
  };

  return (
    <Link href={href}>
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
        <CardHeader>
          <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function TemplateCard({
  title,
  description,
  category,
  href,
}: {
  title: string;
  description: string;
  category: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
        <div className="aspect-video bg-muted/50 border-b" />
        <CardHeader className="p-4">
          <div className="text-xs font-medium text-primary mb-2">{category}</div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
