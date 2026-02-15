# Contributing to AI App Builder

Thank you for your interest in contributing to AI App Builder! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When creating a bug report, include:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment information (OS, browser, Node version)
- Any relevant error messages or logs

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Use a clear and descriptive title
- Provide a detailed description of the enhancement
- Explain why this enhancement would be useful
- Provide examples of how it would work
- Consider including mockups or diagrams

### Pull Requests

1. Fork the repository
2. Create a branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Write tests if applicable
5. Ensure all tests pass:
   ```bash
   npm test
   ```
6. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a pull request with a clear description of your changes

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode in tsconfig.json
- Avoid `any` types when possible
- Use interfaces for object shapes
- Use type inference where appropriate

### React

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for props and state
- Use `useCallback` and `useMemo` for performance optimization when needed
- Keep components small and focused

### Styling

- Use Tailwind CSS for styling
- Follow existing component patterns
- Use shadcn/ui components when possible
- Ensure responsive design
- Support dark mode

### File Organization

- Organize files by feature
- Use clear and descriptive filenames
- Keep related files together
- Use barrel exports for cleaner imports

## Development Workflow

### Setting Up Development Environment

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```
4. Fill in your environment variables
5. Run the development server:
   ```bash
   npm run dev
   ```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
ai-app-builder/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   └── workspace/         # Workspace-specific components
├── lib/                    # Utility libraries
│   ├── ai/                # AI integration
│   ├── supabase/          # Supabase client
│   ├── hooks/             # Custom hooks
│   └── constants/         # Constants
└── server/                # Server-side code
```

## Commit Messages

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

Examples:
- `feat: add file tree component`
- `fix: resolve preview refresh issue`
- `docs: update README`

## Pull Request Guidelines

### Title

Use a clear and concise title that describes the change:

- `feat: add AI chat streaming`
- `fix: prevent duplicate file creation`
- `docs: update API documentation`

### Description

Provide a detailed description of your changes:

- What was changed and why
- Any breaking changes
- How to test the changes
- Related issues or PRs

### Screenshots

Include screenshots for UI changes when applicable.

### Checklist

Before submitting a PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] Tests pass locally
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow conventional commits
- [ ] PR title is clear and descriptive

## Getting Help

- Check existing issues and discussions
- Read the documentation
- Ask questions in discussions
- Join our community chat (if available)

## Recognition

Contributors will be recognized in:
- README.md
- CHANGELOG.md
- Special thanks section

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI App Builder! 🚀
