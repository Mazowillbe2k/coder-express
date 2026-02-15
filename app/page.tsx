import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code2,
  Sparkles,
  Zap,
  Rocket,
  Layers,
  Terminal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Powered by AI Agents
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Build Apps with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Autonomous AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your app idea in plain English. Our AI agents will generate,
            modify, and deploy your React/Vite/TypeScript application in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Start Building Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-24 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete development environment powered by autonomous AI agents
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI-Powered Generation"
            description="Describe your app in natural language and watch AI generate production-ready code with React, TypeScript, and Tailwind CSS."
          />
          <FeatureCard
            icon={<Code2 className="w-8 h-8" />}
            title="Intelligent Code Editor"
            description="Full-featured Monaco editor with syntax highlighting, IntelliSense, and AI-assisted code completion."
          />
          <FeatureCard
            icon={<Terminal className="w-8 h-8" />}
            title="Built-in Terminal"
            description="Execute commands, run tests, and install packages directly in the browser with our integrated terminal."
          />
          <FeatureCard
            icon={<Rocket className="w-8 h-8" />}
            title="Live Preview"
            description="See your changes instantly with hot-reload enabled preview. Works on desktop, tablet, and mobile views."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Smart Refactoring"
            description="AI understands your codebase and can intelligently refactor, optimize, and add features while maintaining quality."
          />
          <FeatureCard
            icon={<Layers className="w-8 h-8" />}
            title="Template Library"
            description="Start with professionally designed templates for landing pages, dashboards, e-commerce, and more."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24 mx-auto">
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl">Ready to Build?</CardTitle>
            <CardDescription className="text-xl">
              Join thousands of developers building apps with AI
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-2 hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
