"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  Play,
  Square,
  Settings,
  FileText,
  FolderOpen,
  RefreshCw,
  Download,
  Sparkles,
  Terminal,
  Layout,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

const defaultFiles: Record<string, string> = {
  "App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to AI App Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Describe your app idea and watch it come to life
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              {count}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCount((c) => c - 1)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Decrease
              </button>
              <button
                onClick={() => setCount((c) => c + 1)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Increase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  "index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`,
  "main.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
  "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI App Builder</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
`,
};

export default function WorkspacePage() {
  const params = useParams();
  const [activeFile, setActiveFile] = useState("App.tsx");
  const [files, setFiles] = useState<Record<string, string>>(defaultFiles);
  const [isPreviewRunning, setIsPreviewRunning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const fileEntries = Object.entries(files);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFiles((prev) => ({ ...prev, [activeFile]: value }));
    }
  };

  const startPreview = () => {
    setIsPreviewRunning(true);
    // In a real app, this would start a Vite dev server
    // For now, we'll use a data URL
    const htmlContent = files["index.html"];
    setPreviewUrl(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
  };

  const stopPreview = () => {
    setIsPreviewRunning(false);
    setPreviewUrl("");
  };

  const applyAISuggestion = (code: string) => {
    setFiles((prev) => ({ ...prev, [activeFile]: code }));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/dashboard">← Back</a>
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Workspace</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground">{params.projectId}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layout className="w-4 h-4 mr-2" />
            Layout
          </Button>
          <Button variant="outline" size="sm">
            <Terminal className="w-4 h-4 mr-2" />
            Terminal
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={isPreviewRunning ? stopPreview : startPreview}
            variant={isPreviewRunning ? "destructive" : "default"}
          >
            {isPreviewRunning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <aside className="w-64 border-r flex flex-col bg-muted/30">
          <div className="p-3 border-b">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Files</span>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {fileEntries.map(([name, content]) => (
                <button
                  key={name}
                  onClick={() => setActiveFile(name)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                    activeFile === name
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="h-10 border-b flex items-center px-4 bg-muted/30">
            <span className="text-sm font-medium">{activeFile}</span>
          </div>
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language="typescript"
              theme="vs-dark"
              value={files[activeFile]}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-[600px] border-r flex flex-col">
          <Tabs defaultValue="preview" className="flex-1 flex flex-col">
            <div className="h-10 border-b flex items-center px-4 bg-muted/30">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="ai">
                  <Sparkles className="w-3 h-3 mr-2" />
                  AI Chat
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="preview" className="flex-1 m-0 p-0 overflow-hidden">
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click Run to see your preview
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="ai" className="flex-1 m-0 p-0 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">
                      Ask AI to help you build or modify your app
                    </p>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Card
                      className={`max-w-[85%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      <div className="p-4">
                        {message.role === "assistant" ? (
                          <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Card className="max-w-[85%]">
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            AI is thinking...
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask AI to help you build..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
