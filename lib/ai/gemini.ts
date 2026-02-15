import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";

// Type assertion for the Gemini model
const geminiModel = geminiModel as any;

export async function generateCode(
  prompt: string,
  context?: {
    existingCode?: string;
    language?: string;
    framework?: string;
  }
) {
  const systemPrompt = `You are an expert full-stack developer specializing in modern web applications.
You generate clean, production-ready code using React, TypeScript, Tailwind CSS, and Vite.
Your code should be well-structured, type-safe, and follow best practices.
Always include necessary imports and ensure all components are self-contained.

When generating code:
1. Use functional components with hooks
2. Use TypeScript for type safety
3. Use Tailwind CSS for styling
4. Ensure responsive design
5. Add helpful comments where appropriate
6. Follow modern React patterns (composition, hooks, etc.)
7. Handle loading and error states
8. Make components reusable and maintainable

${context?.language ? `Language/Format: ${context.language}` : ""}
${context?.framework ? `Framework: ${context.framework}` : ""}`;

  try {
    const result = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt: context?.existingCode
        ? `${prompt}\n\nExisting code context:\n\`\`\`\n${context.existingCode}\n\`\`\``
        : prompt,
      temperature: 0.7,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating code:", error);
    throw new Error("Failed to generate code. Please try again.");
  }
}

export async function streamCodeResponse(
  prompt: string,
  context?: {
    existingCode?: string;
    language?: string;
    framework?: string;
  }
) {
  const systemPrompt = `You are an expert full-stack developer specializing in modern web applications.
You help users build and modify applications using React, TypeScript, Tailwind CSS, and Vite.
Provide clear explanations and code examples.
Always format code blocks with the appropriate language syntax.

${context?.language ? `Language/Format: ${context.language}` : ""}
${context?.framework ? `Framework: ${context.framework}` : ""}`;

  try {
    const result = await streamText({
      model: geminiModel,
      system: systemPrompt,
      prompt: context?.existingCode
        ? `${prompt}\n\nExisting code context:\n\`\`\`\n${context.existingCode}\n\`\`\``
        : prompt,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error streaming response:", error);
    throw new Error("Failed to get AI response. Please try again.");
  }
}

export async function analyzeProject(
  files: Array<{ path: string; content: string }>
) {
  const systemPrompt = `You are an expert code analyst specializing in React/TypeScript applications.
Analyze the provided code and provide insights about:
1. Project structure and architecture
2. Component organization
3. Dependencies and integrations
4. Potential improvements or issues
5. Code quality and best practices adherence

Be concise and specific in your analysis.`;

  const fileContents = files
    .map((f) => `### ${f.path}\n\`\`\`\n${f.content}\n\`\`\``)
    .join("\n\n");

  try {
    const result = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt: `Analyze this project:\n\n${fileContents}`,
      temperature: 0.3,
    });

    return result.text;
  } catch (error) {
    console.error("Error analyzing project:", error);
    throw new Error("Failed to analyze project. Please try again.");
  }
}

export async function refactorCode(
  code: string,
  instructions: string,
  filePath: string
) {
  const systemPrompt = `You are an expert code refactoring specialist.
Refactor the provided code according to the instructions while maintaining:
- Original functionality
- TypeScript type safety
- Performance characteristics
- Component interface compatibility

Only return the refactored code, no explanations.`;

  try {
    const result = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt: `Refactor this code (${filePath}):\n${instructions}\n\n\`\`\`\n${code}\n\`\`\``,
      temperature: 0.5,
    });

    return result.text;
  } catch (error) {
    console.error("Error refactoring code:", error);
    throw new Error("Failed to refactor code. Please try again.");
  }
}

export async function generateFromTemplate(
  template: string,
  description: string
) {
  const systemPrompt = `You are an expert application developer.
Create a complete application based on the provided template and user description.
Generate all necessary files including components, pages, styles, and configuration.
The application should be fully functional and production-ready.

Return the response as a JSON object with this structure:
{
  "files": [
    {
      "path": "path/to/file.ext",
      "content": "file content"
    }
  ],
  "dependencies": ["dependency1", "dependency2"],
  "description": "brief description of what was generated"
}`;

  try {
    const result = await generateText({
      model: geminiModel,
      system: systemPrompt,
      prompt: `Template: ${template}\n\nDescription: ${description}\n\nGenerate the complete application.`,
      temperature: 0.8,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating from template:", error);
    throw new Error("Failed to generate application. Please try again.");
  }
}
