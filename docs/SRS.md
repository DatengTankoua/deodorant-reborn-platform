# Software Requirements Specification (SRS)

## deodorant-reborn-platform

| | |
|---|---|
| **Document Title** | Software Requirements Specification |
| **Project Name** | deodorant-reborn-platform |
| **Related Product** | `intellij-deodorant-reborn` (IntelliJ IDEA plugin) |
| **Document Version** | 1.0 |
| **Status** | Draft |
| **Author** | Portfolio Project (Bachelor Graduate) |
| **Last Updated** | 2026-06-09 |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Purpose and Scope](#2-purpose-and-scope)
3. [Overall Description](#3-overall-description)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [System Architecture Overview](#6-system-architecture-overview)
7. [Constraints and Assumptions](#7-constraints-and-assumptions)
8. [Glossary](#8-glossary)

---

## 1. Introduction

### 1.1 Document Overview

This Software Requirements Specification (SRS) describes the functional and
non-functional requirements for **deodorant-reborn-platform**, an open-source
community web platform that supports the **`intellij-deodorant-reborn`**
IntelliJ IDEA plugin. The plugin detects and refactors **Type-1** and
**Type-2** code clones in Java/Kotlin projects.

This document is intended for the project author, prospective employers
reviewing the portfolio, open-source contributors, and any maintainers who
extend the platform.

### 1.2 Intended Audience

| Audience | Use of this document |
|---|---|
| Project Author | Single source of truth for build decisions |
| Reviewers / Recruiters | Demonstration of engineering rigor |
| Contributors | Understanding scope before contributing |
| Maintainers | Reference for future enhancements |

### 1.3 References

- IEEE 830-1998 — Recommended Practice for Software Requirements Specifications
- OWASP Top 10 (2021)
- WCAG 2.1 Level AA
- Core Web Vitals (Google) — LCP, INP, CLS

---

## 2. Purpose and Scope

### 2.1 Purpose

The platform serves as the **public home and community hub** for the
`intellij-deodorant-reborn` plugin. It exists to:

- Present the plugin to potential users and the JetBrains ecosystem.
- Provide thorough, versioned documentation for installation and usage.
- Host a community space for discussion, questions, and feedback.
- Publish the research foundation (clone detection theory, refactoring catalog).
- Showcase the author's related projects as a portfolio.
- Provide background on the author and the project's origin.

### 2.2 In Scope

- A responsive, dark-mode-first marketing and documentation website.
- Six primary sections: **Home, Docs, Community, Research, Projects, About**.
- A Spring Boot backend exposing REST endpoints for community content.
- Supabase-backed persistence (PostgreSQL) and authentication.
- Internationalization for **English (EN)**, **German (DE)**, and **French (FR)**.
- CI/CD with GitHub Actions and zero-cost hosting (Vercel + Render).

### 2.3 Out of Scope

- The IntelliJ plugin's internal clone-detection engine (separate repository).
- Paid features, billing, or commercial subscriptions.
- Native mobile applications.
- Real-time collaborative editing of documentation.

---

## 3. Overall Description

### 3.1 Product Perspective

The platform is a **new, self-contained product** that complements an existing
plugin. The frontend (Next.js) and backend (Spring Boot) are decoupled and
communicate over HTTPS/REST. Supabase provides the database and identity layer.

### 3.2 User Classes and Characteristics

| User Class | Description | Technical Skill |
|---|---|---|
| Visitor | Anonymous reader browsing public pages | Low–High |
| Plugin User | Java/Kotlin developer using the plugin | High |
| Community Member | Authenticated user posting/commenting | High |
| Maintainer / Admin | Moderates content, publishes docs | High |

### 3.3 Operating Environment

- **Frontend:** Modern evergreen browsers (Chromium, Firefox, Safari), desktop and mobile.
- **Backend:** JVM 21 runtime inside a Docker container on Render.
- **Database/Auth:** Supabase (managed PostgreSQL 15+).

### 3.4 Design and Implementation Constraints

- **Zero-cost hosting** only (free tiers of Vercel, Render, and Supabase).
- TypeScript **strict mode** is mandatory across the frontend.
- Feature-based folder structure with clean architecture boundaries.

---

## 4. Functional Requirements

Requirements are grouped by page. Each requirement uses the identifier
`FR-<PAGE>-<n>` and a priority of **Must**, **Should**, or **Could**.

### 4.1 Global / Cross-Cutting

| ID | Requirement | Priority |
|---|---|---|
| FR-GLB-1 | The system shall render a persistent navigation bar with links to Home, Docs, Community, Research, Projects, and About. | Must |
| FR-GLB-2 | The system shall default to a dark theme and allow toggling to a light theme, persisting the choice. | Should |
| FR-GLB-3 | The system shall render a footer with the author's name, GitHub, and LinkedIn links. | Must |
| FR-GLB-4 | The system shall provide a language switcher for EN, DE, and FR, persisting the selection. | Must |
| FR-GLB-5 | The system shall be fully navigable by keyboard and screen reader. | Must |
| FR-GLB-6 | The system shall display a localized 404 page for unknown routes. | Should |

### 4.2 Home

| ID | Requirement | Priority |
|---|---|---|
| FR-HOME-1 | The Home page shall display a hero section with the plugin title and a concise description. | Must |
| FR-HOME-2 | The hero shall include a primary **Download Plugin** call-to-action linking to the JetBrains Marketplace. | Must |
| FR-HOME-3 | The hero shall include a secondary **View Source** call-to-action linking to the GitHub repository. | Must |
| FR-HOME-4 | The Home page shall summarize key features (Type-1 and Type-2 clone detection, automated refactoring). | Should |
| FR-HOME-5 | The Home page shall surface the latest release version and changelog highlights. | Could |

### 4.3 Docs

| ID | Requirement | Priority |
|---|---|---|
| FR-DOCS-1 | The Docs page shall present categorized documentation (Getting Started, Installation, Usage, Configuration, FAQ). | Must |
| FR-DOCS-2 | The Docs page shall render Markdown/MDX content with syntax-highlighted code blocks. | Must |
| FR-DOCS-3 | The Docs page shall provide client-side search across documentation content. | Should |
| FR-DOCS-4 | The Docs page shall display a table of contents with active-section highlighting. | Should |
| FR-DOCS-5 | Documentation content shall be available in EN, DE, and FR, falling back to EN when a translation is missing. | Must |

### 4.4 Community

| ID | Requirement | Priority |
|---|---|---|
| FR-COMM-1 | The Community page shall list discussion threads retrieved from the backend. | Must |
| FR-COMM-2 | Authenticated users shall be able to create threads and post replies. | Must |
| FR-COMM-3 | Users shall authenticate via Supabase Auth (email/password). | Must |
| FR-COMM-4 | The system shall sanitize and validate all user-generated content before storage and display. | Must |
| FR-COMM-5 | Maintainers shall be able to moderate (edit/delete/flag) community content. | Should |
| FR-COMM-6 | The system shall paginate or infinitely scroll long thread lists. | Should |

### 4.5 Research

| ID | Requirement | Priority |
|---|---|---|
| FR-RES-1 | The Research page shall explain the theory of Type-1 and Type-2 clone detection. | Must |
| FR-RES-2 | The Research page shall present the refactoring catalog used by the plugin. | Must |
| FR-RES-3 | The Research page shall link to or embed referenced academic papers and citations. | Should |
| FR-RES-4 | The Research page shall include diagrams illustrating the detection pipeline. | Could |

### 4.6 Projects

| ID | Requirement | Priority |
|---|---|---|
| FR-PROJ-1 | The Projects page shall display a portfolio of the author's related projects as cards. | Must |
| FR-PROJ-2 | Each project card shall show a title, description, tech stack, and links (repo/demo). | Must |
| FR-PROJ-3 | The Projects page shall allow filtering by technology or category. | Could |

### 4.7 About

| ID | Requirement | Priority |
|---|---|---|
| FR-ABOUT-1 | The About page shall present the author's biography and the project's origin story. | Must |
| FR-ABOUT-2 | The About page shall provide contact and social links (GitHub, LinkedIn, email). | Must |
| FR-ABOUT-3 | The About page shall describe the open-source license and contribution guidelines. | Should |

---

## 5. Non-Functional Requirements

### 5.1 Security

| ID | Requirement |
|---|---|
| NFR-SEC-1 | The system shall address the **OWASP Top 10** risks, including injection, broken access control, and security misconfiguration. |
| NFR-SEC-2 | All input shall be validated and sanitized on **both client and server** (e.g., Zod on the frontend, Bean Validation on the backend). |
| NFR-SEC-3 | Secrets and credentials shall be stored in **environment variables**; **no hardcoded secrets** shall exist in source control. |
| NFR-SEC-4 | All traffic shall be served exclusively over **HTTPS** with HSTS enabled. |
| NFR-SEC-5 | Public and authenticated API endpoints shall enforce **rate limiting** to mitigate abuse and brute-force attacks. |
| NFR-SEC-6 | State-changing requests shall be protected against **CSRF** (token-based or SameSite cookie strategy). |
| NFR-SEC-7 | Supabase **Row Level Security (RLS)** shall restrict data access to authorized users. |
| NFR-SEC-8 | Security-relevant dependencies shall be scanned automatically (e.g., Dependabot / `npm audit`). |
| NFR-SEC-9 | Authentication shall use Supabase-managed password hashing and session tokens; passwords shall never be stored in plaintext. |

### 5.2 Performance

| ID | Requirement |
|---|---|
| NFR-PERF-1 | The platform shall meet **Core Web Vitals** "Good" thresholds: **LCP ≤ 2.5s**, **INP ≤ 200ms**, **CLS ≤ 0.1**. |
| NFR-PERF-2 | Non-critical components and below-the-fold assets shall be **lazy loaded**. |
| NFR-PERF-3 | Static and semi-static content shall be **cached** via CDN and HTTP cache headers; data fetching shall use SWR-style caching. |
| NFR-PERF-4 | Images shall be optimized and served in modern formats (WebP/AVIF) with responsive sizing. |
| NFR-PERF-5 | JavaScript bundles shall be code-split per route to minimize initial payload. |

### 5.3 Maintainability

| ID | Requirement |
|---|---|
| NFR-MAINT-1 | The codebase shall follow a **clean architecture** with clear separation of concerns. |
| NFR-MAINT-2 | The frontend shall use a **feature-based folder structure** (e.g., `features/<domain>/components`). |
| NFR-MAINT-3 | Code shall adhere to **SOLID** principles, especially single-responsibility and dependency inversion. |
| NFR-MAINT-4 | Business logic shall be decoupled from framework and UI concerns to ease testing and reuse. |
| NFR-MAINT-5 | The project shall maintain a meaningful automated test suite for critical paths. |

### 5.4 Readability

| ID | Requirement |
|---|---|
| NFR-READ-1 | TypeScript **strict mode** shall be enabled and enforced. |
| NFR-READ-2 | **ESLint** shall enforce a consistent linting ruleset; builds shall fail on lint errors in CI. |
| NFR-READ-3 | **Prettier** shall enforce consistent formatting across the codebase. |
| NFR-READ-4 | Public functions, modules, and complex logic shall include **JSDoc** comments. |
| NFR-READ-5 | Naming shall be descriptive and consistent; magic values shall be replaced with named constants. |

### 5.5 Accessibility

| ID | Requirement |
|---|---|
| NFR-A11Y-1 | The platform shall conform to **WCAG 2.1 Level AA**. |
| NFR-A11Y-2 | All interactive elements shall be keyboard operable with a visible focus indicator. |
| NFR-A11Y-3 | Color contrast shall meet AA ratios (≥ 4.5:1 for normal text, ≥ 3:1 for large text). |
| NFR-A11Y-4 | Semantic HTML and appropriate ARIA roles/labels shall be used throughout. |
| NFR-A11Y-5 | All non-decorative images shall provide meaningful `alt` text. |

### 5.6 Scalability

| ID | Requirement |
|---|---|
| NFR-SCALE-1 | The backend shall be **stateless** to allow horizontal scaling. |
| NFR-SCALE-2 | The frontend shall scale globally via Vercel's edge/CDN distribution. |
| NFR-SCALE-3 | Database access shall use connection pooling and indexed queries to handle growth. |
| NFR-SCALE-4 | The architecture shall permit adding new feature modules without major refactoring. |

### 5.7 Deployment

| ID | Requirement |
|---|---|
| NFR-DEP-1 | Hosting shall remain **zero-cost** using free tiers (Vercel, Render, Supabase). |
| NFR-DEP-2 | The backend shall be packaged and deployed as a **Docker** container. |
| NFR-DEP-3 | **GitHub Actions** shall run CI (lint, type-check, test, build) on every pull request. |
| NFR-DEP-4 | Merges to the main branch shall trigger **CD** to Vercel (frontend) and Render (backend). |
| NFR-DEP-5 | Environment-specific configuration shall be injected via secrets/variables, never committed. |

### 5.8 Internationalization

| ID | Requirement |
|---|---|
| NFR-I18N-1 | The platform shall support **English (EN)**, **German (DE)**, and **French (FR)**. |
| NFR-I18N-2 | All user-facing strings shall be externalized into translation resource files. |
| NFR-I18N-3 | The active locale shall be reflected in the URL and persisted between sessions. |
| NFR-I18N-4 | Missing translations shall gracefully fall back to English. |
| NFR-I18N-5 | Date, number, and pluralization formatting shall respect the active locale. |

---

## 6. System Architecture Overview

### 6.1 High-Level Architecture

```text
                ┌──────────────────────────────┐
                │            Users              │
                │  (Browsers: desktop/mobile)   │
                └───────────────┬──────────────┘
                                │ HTTPS
                                ▼
        ┌───────────────────────────────────────────┐
        │   Frontend — Next.js 15 (App Router)        │
        │   TypeScript · Tailwind CSS · shadcn/ui     │
        │   Hosted on Vercel (Edge/CDN)               │
        └───────┬───────────────────────────┬────────┘
                │ REST/HTTPS                 │ Supabase JS SDK
                ▼                            ▼
   ┌─────────────────────────┐   ┌───────────────────────────┐
   │ Backend — Spring Boot    │   │  Supabase                 │
   │ Java 21 · REST API       │   │  PostgreSQL + Auth + RLS  │
   │ Docker on Render         │◄──┤  (Database & Identity)    │
   └─────────────────────────┘   └───────────────────────────┘

   CI/CD: GitHub Actions → Vercel (frontend) + Render (backend)
```

### 6.2 Frontend

- **Framework:** Next.js 15 with the App Router and React Server Components.
- **Language/Styling:** TypeScript (strict), Tailwind CSS, shadcn/ui.
- **Structure:** Feature-based folders (`features/<domain>/components`, `config/`, `lib/`).
- **Data:** Server Components for static content; SWR for client-side cached fetches.

### 6.3 Backend

- **Framework:** Spring Boot (Java 21), exposing versioned REST endpoints.
- **Responsibilities:** Community threads/replies, moderation, content aggregation.
- **Validation:** Bean Validation (JSR-380) on request DTOs.
- **Packaging:** Docker image deployed to Render's free tier.

### 6.4 Data and Authentication

- **Supabase PostgreSQL** stores community and content data.
- **Supabase Auth** manages identity (email/password) and issues JWTs.
- **Row Level Security** enforces per-user authorization at the database layer.

### 6.5 CI/CD Pipeline

1. Pull request opens → GitHub Actions runs lint, type-check, tests, and build.
2. On merge to `main` → frontend deploys to Vercel; backend image builds and deploys to Render.
3. Secrets are provided via GitHub Actions secrets and platform environment variables.

---

## 7. Constraints and Assumptions

### 7.1 Constraints

- **Budget:** All infrastructure must use free tiers; no paid services.
- **Free-tier limits:** Render's free backend may cold-start after inactivity; Supabase free tier has storage and connection caps.
- **Single maintainer:** Limited capacity for ongoing moderation and support.
- **Tech stack is fixed:** Next.js 15, TypeScript, Tailwind, shadcn/ui, Spring Boot, Supabase, Docker, GitHub Actions, Vercel, Render.

### 7.2 Assumptions

- Users have a modern, evergreen browser with JavaScript enabled.
- The `intellij-deodorant-reborn` plugin is distributed via the JetBrains Marketplace.
- Community traffic is modest and fits within free-tier quotas.
- Translations (DE, FR) are provided by the author or trusted contributors.
- The plugin's clone-detection engine is maintained in a separate repository.

---

## 8. Glossary

| Term | Definition |
|---|---|
| **Code Clone** | A fragment of source code that is identical or similar to another fragment. |
| **Type-1 Clone** | Identical code fragments except for whitespace, layout, and comments. |
| **Type-2 Clone** | Syntactically identical fragments differing in identifiers, literals, or types (in addition to Type-1 variations). |
| **Refactoring** | Restructuring existing code without changing its external behavior. |
| **SRS** | Software Requirements Specification — this document. |
| **FR / NFR** | Functional Requirement / Non-Functional Requirement. |
| **App Router** | Next.js routing system based on the `app/` directory and React Server Components. |
| **RSC** | React Server Component — a component rendered on the server. |
| **RLS** | Row Level Security — PostgreSQL feature restricting row access per policy. |
| **OWASP** | Open Worldwide Application Security Project; publishes the Top 10 risks. |
| **CSRF** | Cross-Site Request Forgery — an attack forcing unintended authenticated actions. |
| **HSTS** | HTTP Strict Transport Security — enforces HTTPS-only connections. |
| **Core Web Vitals** | Google's UX metrics: LCP, INP, and CLS. |
| **LCP** | Largest Contentful Paint — loading performance metric. |
| **INP** | Interaction to Next Paint — responsiveness metric. |
| **CLS** | Cumulative Layout Shift — visual stability metric. |
| **WCAG** | Web Content Accessibility Guidelines. |
| **SOLID** | Five object-oriented design principles for maintainable software. |
| **CI/CD** | Continuous Integration / Continuous Deployment. |
| **i18n** | Internationalization (EN, DE, FR support in this project). |
| **DTO** | Data Transfer Object — a structured object passed across system boundaries. |
| **SWR** | "Stale-While-Revalidate" — a client-side data-fetching/caching strategy. |

---

*End of document.*
