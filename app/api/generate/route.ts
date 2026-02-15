import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { description, name, template } = await req.json();

    const systemPrompt = template
      ? `You are an expert full-stack developer specializing in React, TypeScript, and Tailwind CSS.
Generate a complete web application based on the template and description provided.

Template: ${template}

Requirements:
1. Use React with functional components and hooks
2. Use TypeScript for all components
3. Use Tailwind CSS for styling
4. Make it responsive and mobile-friendly
5. Include proper error handling
6. Add loading states where appropriate

Return the response as a JSON object with this structure:
{
  "files": [
    {
      "path": "path/to/file.ext",
      "content": "full file content"
    }
  ],
  "description": "brief description of what was generated"
}`
      : `You are an expert full-stack developer specializing in React, TypeScript, and Tailwind CSS.
Generate a complete web application based on the description provided.

Requirements:
1. Use React with functional components and hooks
2. Use TypeScript for all components
3. Use Tailwind CSS for styling
4. Make it responsive and mobile-friendly
5. Include proper error handling
6. Add loading states where appropriate

Return the response as a JSON object with this structure:
{
  "files": [
    {
      "path": "path/to/file.ext",
      "content": "full file content"
    }
  ],
  "description": "brief description of what was generated"
}`;

    const result = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt: `Project Name: ${name}\n\nDescription: ${description}`,
      temperature: 0.8,
    });

    // Parse the AI response to extract JSON
    let responseText = result.text.trim();

    // Try to extract JSON from markdown code blocks if present
    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      responseText = jsonMatch[1];
    }

    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json(parsed);
    } catch (parseError) {
      // If JSON parsing fails, try to create a basic structure
      return NextResponse.json({
        files: [
          {
            path: "App.tsx",
            content: `export default function App() {\n  return (\n    <div className="p-8">\n      <h1 className="text-2xl font-bold">${name}</h1>\n      <p>${description}</p>\n    </div>\n  );\n}`,
          },
        ],
        description: "Basic app structure",
      });
    }
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate application" },
      { status: 500 }
    );
  }
}
