import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Sparkles, Code2, Zap, Rocket, Users, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <Sparkles className="w-4 h-4 mr-2" />
              AI App Builder
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold">About AI App Builder</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering developers to build applications faster with the power of artificial intelligence
            </p>
          </section>

          {/* Mission */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              AI App Builder is on a mission to democratize software development by making it
              accessible to everyone. We believe that anyone with an idea should be able to bring
              it to life without spending months learning complex frameworks and tools.
            </p>
            <p className="text-lg text-muted-foreground">
              By leveraging the latest advances in AI, we've created a platform that understands
              natural language and transforms it into production-ready code. Our AI agents work
              alongside you, learning from your preferences and helping you build better applications
              faster than ever before.
            </p>
          </section>

          {/* Features */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Code2 className="w-6 h-6" />}
                title="Full-Stack Generation"
                description="Generate complete applications including frontend, backend, and database schemas"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Real-Time Preview"
                description="See your changes instantly with hot-reload enabled preview across devices"
              />
              <FeatureCard
                icon={<Rocket className="w-6 h-6" />}
                title="Production Ready"
                description="Generated code follows best practices and is ready for deployment"
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Collaborative"
                description="Work together with your team in real-time with live collaboration features"
              />
            </div>
          </section>

          {/* Technology */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Built with Modern Technology</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <TechCard title="Next.js 15" description="React framework with App Router" />
              <TechCard title="TypeScript" description="Type-safe development" />
              <TechCard title="Tailwind CSS" description="Utility-first styling" />
              <TechCard title="Google Gemini" description="Advanced AI model" />
              <TechCard title="Supabase" description="Backend as a service" />
              <TechCard title="Monaco Editor" description="VS Code editor in browser" />
            </div>
          </section>

          {/* Open Source */}
          <section className="bg-muted/50 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Open Source</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              AI App Builder is open source and free to use. We believe in the power of community
              and welcome contributions from developers around the world. Together, we can build
              something amazing.
            </p>
            <Button size="lg" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          </section>

          {/* Team */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">The Team</h2>
            <p className="text-lg text-muted-foreground">
              We're a small team of developers, designers, and AI enthusiasts passionate about
              making software development more accessible. We come from various backgrounds and
              bring diverse perspectives to everything we build.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Build?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers who are already using AI App Builder to bring their
              ideas to life.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">Learn More</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
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
    <Card>
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function TechCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
