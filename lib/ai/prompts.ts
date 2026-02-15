export const AI_PROMPTS = {
  // App Generation Prompts
  generateApp: (description: string) => `
You are an expert full-stack developer specializing in React, TypeScript, and Tailwind CSS.
Generate a complete, production-ready web application based on this description:

"${description}"

Requirements:
1. Use React with functional components and hooks
2. Use TypeScript for all components
3. Use Tailwind CSS for styling
4. Make it responsive and mobile-friendly
5. Include proper error handling
6. Add loading states where appropriate
7. Ensure good accessibility (ARIA labels, semantic HTML)
8. Follow modern React best practices

Generate all necessary files with their full content. Return as a JSON object with this structure:
{
  "files": [
    {
      "path": "path/to/file.ext",
      "content": "full file content"
    }
  ],
  "dependencies": ["@types/react", "lucide-react", etc.],
  "devDependencies": [],
  "scripts": {}
}
`,

  // Code Modification Prompts
  modifyCode: (instruction: string, filePath: string) => `
Modify the code according to this instruction:
${instruction}

File: ${filePath}

Requirements:
1. Maintain the existing functionality
2. Keep TypeScript type safety
3. Preserve the component interface
4. Add necessary imports
5. Follow existing code style
6. Only return the modified code, no explanations
`,

  // Feature Addition Prompts
  addFeature: (featureDescription: string, context: string) => `
Add this feature to the application:
${featureDescription}

Context:
${context}

Requirements:
1. Integrate seamlessly with existing code
2. Maintain consistency with current architecture
3. Add necessary dependencies
4. Include error handling
5. Add TypeScript types
6. Make it reusable where appropriate
`,

  // Bug Fix Prompts
  fixBug: (bugDescription: string, code: string) => `
Fix this bug:
${bugDescription}

Code:
${code}

Requirements:
1. Identify the root cause
2. Implement a minimal fix
3. Don't break existing functionality
4. Add defensive coding if needed
5. Return the complete fixed code
`,

  // Refactoring Prompts
  refactorCode: (refactoringGoal: string, code: string) => `
Refactor this code to achieve:
${refactoringGoal}

Code:
${code}

Requirements:
1. Improve code quality and maintainability
2. Follow SOLID principles
3. Extract reusable logic
4. Improve type safety
5. Optimize performance if applicable
6. Return the complete refactored code
`,

  // Code Explanation Prompts
  explainCode: (code: string) => `
Explain this code clearly:
${code}

Provide:
1. A high-level summary of what the code does
2. Break down of each important section
3. Explanation of key functions and their purposes
4. Any patterns or best practices used
5. Potential improvements or considerations
`,

  // Testing Prompts
  generateTests: (code: string) => `
Generate comprehensive tests for this code:
${code}

Requirements:
1. Use Jest + React Testing Library for React components
2. Test all user interactions
3. Test edge cases and error conditions
4. Mock external dependencies
5. Include setup and teardown if needed
6. Provide clear test descriptions
`,

  // Documentation Prompts
  generateDocumentation: (code: string) => `
Generate documentation for this code:
${code}

Include:
1. JSDoc comments for functions and components
2. Parameter descriptions
3. Return type descriptions
4. Usage examples
5. Notes about edge cases or important considerations
`,

  // Optimization Prompts
  optimizeCode: (code: string) => `
Optimize this code for better performance:
${code}

Focus on:
1. Reducing unnecessary re-renders (React.memo, useMemo, useCallback)
2. Optimizing data fetching and caching
3. Improving algorithm efficiency
4. Reducing bundle size
5. Memory optimization
6. Return the optimized code with explanations
`,

  // Accessibility Prompts
  improveAccessibility: (code: string) => `
Improve the accessibility of this code:
${code}

Add:
1. Proper ARIA labels and roles
2. Keyboard navigation support
3. Screen reader friendly markup
4. Focus management
5. Color contrast improvements
6. Semantic HTML elements
`,
};

export const SYSTEM_PROMPTS = {
  codeGenerator: `You are an expert full-stack developer with deep knowledge of:
- React 18+ with hooks and concurrent features
- TypeScript and advanced type definitions
- Tailwind CSS and modern CSS techniques
- Vite build tool and ecosystem
- Modern JavaScript (ES2022+)
- Web performance optimization
- Accessibility best practices (WCAG 2.1)
- Responsive and mobile-first design
- State management patterns
- API design and integration

Your code is:
- Clean, readable, and well-structured
- Type-safe with proper TypeScript usage
- Performant with optimizations
- Accessible to all users
- Follows modern best practices
- Well-documented with comments`,

  codeReviewer: `You are a senior code reviewer with expertise in:
- Code quality and maintainability
- Security best practices
- Performance optimization
- Testing strategies
- Architecture patterns

Your reviews are:
- Constructive and actionable
- Specific with examples
- Focused on improvement
- Balanced between criticism and praise`,

  debugger: `You are a debugging expert who:
- Identifies root causes efficiently
- Provides clear explanations
- Suggests minimal fixes
- Helps prevent future issues
- Explains debugging techniques`,
};
