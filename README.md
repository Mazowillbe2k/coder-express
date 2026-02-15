# AI App Builder

An AI-powered application development platform similar to lovable.com. Build modern web applications with autonomous AI agents that generate React/Vite/TypeScript/Tailwind apps.

## Features

- 🤖 **AI-Powered Development**: Describe your app in plain English and watch AI generate production-ready code
- 💻 **Full-Featured Code Editor**: Monaco Editor with syntax highlighting, IntelliSense, and more
- 🖥️ **Live Preview**: See your changes instantly with hot-reload enabled preview
- 💬 **AI Chat Assistant**: Get help building, modifying, and understanding your code
- 📁 **File Management**: Complete file system with create, edit, delete, and organize
- 🎨 **Template Library**: Start with professionally designed templates
- 🌙 **Dark Mode**: Built-in theme support

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Code Editor**: Monaco Editor
- **AI/ML**: Google Gemini 2.0 (via Vercel AI SDK)
- **Backend**: Supabase (PostgreSQL database + Auth + Real-time)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase project (free tier works)
- A Google AI API key (Gemini)

### 1. Clone and Install

```bash
# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google AI (Gemini) Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Go to your Supabase project's SQL Editor
2. Run the migration file: `lib/supabase/migrations/001_initial_schema.sql`
3. This will create all necessary tables, indexes, and RLS policies

Alternatively, you can use the Supabase CLI:

```bash
supabase db push
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-app-builder/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── chat/             # AI chat endpoint
│   ├── dashboard/            # Dashboard pages
│   ├── workspace/            # Workspace/editor pages
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── providers/            # Context providers
│   └── workspace/            # Workspace-specific components
├── lib/                      # Utility libraries
│   ├── ai/                   # AI integration (Gemini)
│   ├── supabase/             # Supabase client
│   ├── hooks/                # Custom React hooks
│   └── utils.ts              # Utility functions
├── server/                   # Server-side code
│   ├── agents/               # AI agents
│   ├── preview/              # Preview server management
│   └── files/                # File operations
└── public/                   # Static assets
```

## How It Works

### AI Code Generation

1. **User Input**: You describe what you want to build in natural language
2. **Context Building**: The system builds context from existing files (if any)
3. **AI Generation**: Gemini generates code based on your description
4. **File Creation**: The system creates/updates files in your project
5. **Live Preview**: Changes are reflected instantly in the preview panel

### Workspace Architecture

The workspace is divided into three main panels:

1. **File Explorer**: Navigate and manage your project files
2. **Code Editor**: Monaco-based editor with full TypeScript support
3. **Preview/AI Panel**: Toggle between live preview and AI chat assistant

## API Endpoints

### POST `/api/chat`

Chat with AI assistant. Supports streaming responses.

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Help me add a login form to my app"
    }
  ]
}
```

## Database Schema

### Core Tables

- `profiles` - User profiles
- `workspaces` - User workspaces
- `projects` - App projects
- `files` - Project files with tree structure
- `chat_sessions` - AI chat history
- `templates` - UI templates library

All tables have Row Level Security (RLS) policies enabled for security.

## AI Features

### Code Generation

Generate entire applications from descriptions:

```typescript
import { generateCode } from '@/lib/ai/gemini';

const code = await generateCode(
  "Create a todo app with add, delete, and toggle completion",
  { language: "TypeScript", framework: "React" }
);
```

### Code Modification

Modify existing code intelligently:

```typescript
import { refactorCode } from '@/lib/ai/gemini';

const newCode = await refactorCode(
  existingCode,
  "Add error handling and loading states",
  "App.tsx"
);
```

### Project Analysis

Analyze and get insights about your codebase:

```typescript
import { analyzeProject } from '@/lib/ai/gemini';

const analysis = await analyzeProject(files);
```

## Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
npm start
```

## Roadmap

### Phase 1 - Foundation (Current)
- ✅ Basic project structure
- ✅ Monaco Editor integration
- ✅ AI chat with Gemini
- ✅ File management UI
- ✅ Supabase backend setup

### Phase 2 - Core Features
- ⏳ Real-time preview with Vite
- ⏳ AI code generation agents
- ⏳ Template library
- ⏳ Git integration

### Phase 3 - Advanced Features
- ⏳ Multi-user collaboration
- ⏳ Advanced AI agents (debugging, refactoring)
- ⏳ Custom components library
- ⏳ Deployment integration

### Phase 4 - Polish
- ⏳ Performance optimization
- ⏳ Security hardening
- ⏳ Comprehensive testing
- ⏳ Documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Supabase](https://supabase.com/) - Backend services
- [Google Gemini](https://ai.google.dev/) - AI model
- [lovable.com](https://lovable.com/) - Inspiration

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and AI
