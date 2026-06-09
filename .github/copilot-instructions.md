# Copilot Global Instructions — deodorant-reborn-platform

## Project
Open-source community platform for an IntelliJ IDEA plugin (code clone 
detection and refactoring). Portfolio project by a recent Bachelor graduate.

## Stack
- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- Backend: Spring Boot 3, Java 21
- Database: Supabase (PostgreSQL + Auth)
- DevOps: Docker, GitHub Actions, Vercel, Render

## General Rules
- Always use TypeScript strict mode on frontend
- Always use Java 21 features on backend
- Never hardcode secrets — always use environment variables
- Follow SOLID principles
- Write JSDoc/Javadoc comments on every function
- Use descriptive variable and function names
- No code duplication — extract reusable components/services
- Follow feature-based folder structure
- Every function must have error handling
- Write code that is readable by a junior developer

## Naming Conventions
- Components: PascalCase (HeroSection.tsx)
- Hooks: camelCase with "use" prefix (useGitHubStats.ts)
- Services: camelCase with "Service" suffix (feedbackService.ts)
- API routes: kebab-case (/api/plugin-stats)
- Java classes: PascalCase (PluginStatsController.java)
- Java methods: camelCase (getPluginStats())
- Database tables: snake_case (plugin_downloads)