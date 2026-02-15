import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google("gemini-2.0-flash-exp"),
      system: `You are an expert full-stack developer specializing in React, TypeScript, Tailwind CSS, and Vite.
You help users build, modify, and understand web applications.
Provide clear, actionable code examples and explanations.
When generating code, always use TypeScript and include proper imports.
Format code blocks with the appropriate language syntax (typescript, tsx, css, etc.).
Be concise but thorough in your explanations.`,
      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
