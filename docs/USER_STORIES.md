# Agile User Stories — deodorant-reborn-platform

**Project:** deodorant-reborn-platform
**Description:** Open-source community platform for an IntelliJ IDEA plugin focused on code clone detection and refactoring.
**Personas:**
- **Developer** — uses the plugin and consumes docs/downloads.
- **Researcher** — interested in the academic concepts and thesis behind the plugin.
- **Student** — learning about code clone detection; lighter technical depth.
- **Contributor** — submits feedback, feature requests, and code contributions.
- **Admin (Platform Owner)** — manages content, moderates community input, reviews stats.

**Priority legend:** Must Have / Should Have / Could Have
**Estimation:** Story Points on a 1–8 modified Fibonacci scale (1, 2, 3, 5, 8).

---

## 1. Home Page

### US-001
- **Role:** As a first-time visitor
- **Goal:** I want to see a hero section with the plugin name, tagline, and primary call-to-action
- **Benefit:** So that I immediately understand what the plugin does and how to get it
- **Acceptance Criteria:**
  - Hero displays plugin title, one-line description, and two buttons (Download Plugin, View Source).
  - Hero is fully responsive from 320px to 1920px wide.
  - Primary CTA is visible above the fold on desktop and mobile.
- **Priority:** Must Have
- **Story Points:** 3

### US-002
- **Role:** As a potential user
- **Goal:** I want to see live project stats (GitHub stars, contributors, total downloads)
- **Benefit:** So that I can gauge the project's credibility and adoption
- **Acceptance Criteria:**
  - Stats bar shows stars, contributors, and downloads pulled from the GitHub API.
  - Values are cached and revalidated periodically to avoid rate limits.
  - A graceful fallback (last known value or skeleton) is shown if the API is unavailable.
- **Priority:** Should Have
- **Story Points:** 5

### US-003
- **Role:** As a developer
- **Goal:** I want to read a concise features section highlighting clone detection and refactoring capabilities
- **Benefit:** So that I can quickly evaluate whether the plugin fits my workflow
- **Acceptance Criteria:**
  - Features are presented as scannable cards with icon, title, and short description.
  - At least the core features (clone detection, refactoring suggestions, IDE integration) are listed.
  - Section is keyboard navigable and screen-reader friendly.
- **Priority:** Must Have
- **Story Points:** 3

### US-004
- **Role:** As a visitor
- **Goal:** I want to view screenshots or a demo of the plugin inside IntelliJ IDEA
- **Benefit:** So that I can see the plugin in action before installing
- **Acceptance Criteria:**
  - A gallery or carousel displays at least three annotated screenshots.
  - Images use lazy loading and descriptive alt text.
  - Clicking a screenshot opens a larger view (lightbox or modal).
- **Priority:** Should Have
- **Story Points:** 3

### US-005
- **Role:** As a visitor reaching the bottom of the page
- **Goal:** I want a closing call-to-action prompting me to download or contribute
- **Benefit:** So that I have a clear next step after exploring the page
- **Acceptance Criteria:**
  - CTA section includes Download and Contribute buttons.
  - Buttons link to the download page and contribution guidelines respectively.
- **Priority:** Should Have
- **Story Points:** 1

---

## 2. Plugin Download & Version Management

### US-006
- **Role:** As a developer
- **Goal:** I want to download the latest plugin build with a single click
- **Benefit:** So that I can install it without searching for release artifacts
- **Acceptance Criteria:**
  - Download button always resolves to the latest stable release asset.
  - The current version number and release date are displayed next to the button.
  - Download events increment the tracked download count.
- **Priority:** Must Have
- **Story Points:** 3

### US-007
- **Role:** As a developer maintaining compatibility
- **Goal:** I want to browse previous plugin versions and changelogs
- **Benefit:** So that I can pick a version compatible with my IntelliJ build
- **Acceptance Criteria:**
  - A versions list shows version number, release date, and changelog summary.
  - Each entry links to the corresponding downloadable asset.
  - Versions are sorted newest-first and paginated if long.
- **Priority:** Should Have
- **Story Points:** 5

### US-008
- **Role:** As a user
- **Goal:** I want to see IntelliJ compatibility info for each version
- **Benefit:** So that I avoid installing an incompatible build
- **Acceptance Criteria:**
  - Each version lists supported IntelliJ IDEA versions.
  - Incompatible combinations are clearly flagged.
- **Priority:** Could Have
- **Story Points:** 2

---

## 3. Documentation

### US-009
- **Role:** As a new user
- **Goal:** I want step-by-step installation instructions
- **Benefit:** So that I can set up the plugin without confusion
- **Acceptance Criteria:**
  - Installation guide covers Marketplace install and manual install.
  - Code/command snippets are copyable with one click.
  - Instructions include screenshots for key steps.
- **Priority:** Must Have
- **Story Points:** 3

### US-010
- **Role:** As a developer
- **Goal:** I want usage documentation describing how to run clone detection and apply refactorings
- **Benefit:** So that I can use the plugin's features effectively
- **Acceptance Criteria:**
  - Usage docs are organized by task with a navigable sidebar/table of contents.
  - Each feature includes an example and expected result.
  - Content supports deep linking to specific sections via anchors.
- **Priority:** Must Have
- **Story Points:** 5

### US-011
- **Role:** As a user with a question
- **Goal:** I want an FAQ covering common issues and questions
- **Benefit:** So that I can self-serve answers before asking the community
- **Acceptance Criteria:**
  - FAQ uses an accordion with searchable/expandable questions.
  - Includes at least troubleshooting, compatibility, and licensing topics.
- **Priority:** Should Have
- **Story Points:** 2

### US-012
- **Role:** As a user
- **Goal:** I want to search the documentation
- **Benefit:** So that I can quickly find relevant content
- **Acceptance Criteria:**
  - A search input filters or jumps to matching docs sections.
  - Search is keyboard-accessible (focus shortcut, arrow navigation).
- **Priority:** Could Have
- **Story Points:** 3

---

## 4. Community

### US-013
- **Role:** As a user
- **Goal:** I want to submit feedback about my experience with the plugin
- **Benefit:** So that the maintainers can improve it
- **Acceptance Criteria:**
  - Authenticated users can submit feedback with a category and message.
  - Submission shows success/error states and validates input.
  - Feedback is persisted and visible to the admin.
- **Priority:** Must Have
- **Story Points:** 3

### US-014
- **Role:** As a contributor
- **Goal:** I want to submit and upvote feature requests
- **Benefit:** So that the most-wanted features can be prioritized
- **Acceptance Criteria:**
  - Users can create a feature request with title and description.
  - Authenticated users can upvote requests once each.
  - Requests are listed sorted by votes with status labels (open, planned, done).
- **Priority:** Should Have
- **Story Points:** 5

### US-015
- **Role:** As a potential contributor
- **Goal:** I want to read clear contribution guidelines
- **Benefit:** So that I can contribute code, docs, or translations correctly
- **Acceptance Criteria:**
  - Guidelines cover dev setup, branching/PR process, and code style.
  - Links to the GitHub repo, issues, and code of conduct are present.
- **Priority:** Should Have
- **Story Points:** 2

### US-016
- **Role:** As a community member
- **Goal:** I want to see a list of existing feedback and feature requests
- **Benefit:** So that I avoid duplicates and understand what others want
- **Acceptance Criteria:**
  - Public list displays request titles, vote counts, and status.
  - Sensitive/private feedback fields are not exposed publicly.
- **Priority:** Could Have
- **Story Points:** 3

---

## 5. Research

### US-017
- **Role:** As a researcher
- **Goal:** I want to read the thesis and academic background behind the plugin
- **Benefit:** So that I understand the theoretical foundation of the clone detection approach
- **Acceptance Criteria:**
  - Research page presents the thesis abstract and a downloadable PDF link.
  - Long-form content is readable with proper typography and headings.
- **Priority:** Should Have
- **Story Points:** 3

### US-018
- **Role:** As a student
- **Goal:** I want explanations of the core concepts (clone types, detection techniques)
- **Benefit:** So that I can learn the domain while using the plugin
- **Acceptance Criteria:**
  - Concepts are explained with diagrams and examples.
  - Technical terms link to the glossary or external references.
- **Priority:** Could Have
- **Story Points:** 3

### US-019
- **Role:** As a researcher
- **Goal:** I want to see documented future directions and open research questions
- **Benefit:** So that I can identify collaboration or study opportunities
- **Acceptance Criteria:**
  - A "Future Directions" section lists planned research and open problems.
  - Each item includes a short rationale.
- **Priority:** Could Have
- **Story Points:** 2

---

## 6. Projects Portfolio

### US-020
- **Role:** As a visitor
- **Goal:** I want to browse a portfolio of related projects
- **Benefit:** So that I can explore the broader ecosystem and the owner's work
- **Acceptance Criteria:**
  - Projects are shown as cards with title, description, tech tags, and links.
  - Each card links to its repository or live demo.
  - Layout is responsive grid (1/2/3 columns by breakpoint).
- **Priority:** Should Have
- **Story Points:** 3

### US-021
- **Role:** As a visitor
- **Goal:** I want to filter projects by technology or category
- **Benefit:** So that I can find projects relevant to my interests
- **Acceptance Criteria:**
  - Filter controls update the visible projects without a full page reload.
  - An empty state is shown when no projects match.
- **Priority:** Could Have
- **Story Points:** 3

---

## 7. About & Contact

### US-022
- **Role:** As a visitor
- **Goal:** I want to read about the project owner and the project's mission
- **Benefit:** So that I can understand who is behind it and why
- **Acceptance Criteria:**
  - About page includes bio, mission statement, and social links.
  - Links to GitHub and LinkedIn open in a new tab with rel="noopener".
- **Priority:** Should Have
- **Story Points:** 2

### US-023
- **Role:** As a visitor
- **Goal:** I want to send a message through a contact form
- **Benefit:** So that I can reach the owner directly
- **Acceptance Criteria:**
  - Form collects name, email, and message with client + server validation.
  - Spam protection (honeypot or rate limiting) is applied.
  - User sees clear success and error feedback.
- **Priority:** Should Have
- **Story Points:** 3

---

## 8. Authentication (Supabase Auth — GitHub OAuth)

### US-024
- **Role:** As a contributor
- **Goal:** I want to sign in with my GitHub account
- **Benefit:** So that I can participate without creating a new password
- **Acceptance Criteria:**
  - GitHub OAuth login is handled via Supabase Auth.
  - On success, a session is established and the UI reflects the logged-in state.
  - Auth errors are surfaced with a friendly message.
- **Priority:** Must Have
- **Story Points:** 5

### US-025
- **Role:** As a logged-in user
- **Goal:** I want to sign out
- **Benefit:** So that I can secure my session on shared devices
- **Acceptance Criteria:**
  - Sign-out clears the session and redirects to the home page.
  - Protected actions become unavailable after sign-out.
- **Priority:** Must Have
- **Story Points:** 1

### US-026
- **Role:** As a logged-in user
- **Goal:** I want to view my basic profile (avatar, name) in the nav
- **Benefit:** So that I can confirm I'm signed in with the right account
- **Acceptance Criteria:**
  - Avatar/name from GitHub is shown in the navbar when authenticated.
  - A dropdown exposes profile and sign-out options.
- **Priority:** Should Have
- **Story Points:** 2

---

## 9. Admin Dashboard

### US-027
- **Role:** As an admin
- **Goal:** I want to review and moderate submitted feedback
- **Benefit:** So that I can act on user input and remove abuse
- **Acceptance Criteria:**
  - Admin-only route lists all feedback with filters by category/status.
  - Admin can mark items as reviewed, resolved, or archived.
  - Non-admin users are denied access (server-side authorization).
- **Priority:** Must Have
- **Story Points:** 5

### US-028
- **Role:** As an admin
- **Goal:** I want to manage feature requests and update their status
- **Benefit:** So that the community sees an accurate roadmap
- **Acceptance Criteria:**
  - Admin can change status (open, planned, in-progress, done, declined).
  - Status changes are reflected on the public community page.
- **Priority:** Should Have
- **Story Points:** 3

### US-029
- **Role:** As an admin
- **Goal:** I want to view download statistics and trends
- **Benefit:** So that I can understand adoption over time
- **Acceptance Criteria:**
  - Dashboard shows total downloads and a time-series chart.
  - Data can be filtered by version and date range.
- **Priority:** Should Have
- **Story Points:** 5

### US-030
- **Role:** As an admin
- **Goal:** I want role-based access control for the dashboard
- **Benefit:** So that only authorized owners can manage the platform
- **Acceptance Criteria:**
  - Admin role is enforced via Supabase RLS and server checks.
  - Unauthorized access attempts are logged and blocked.
- **Priority:** Must Have
- **Story Points:** 3

---

## 10. Theme (Dark/Light Mode)

### US-031
- **Role:** As a user
- **Goal:** I want to toggle between dark and light modes
- **Benefit:** So that I can read comfortably in my preferred environment
- **Acceptance Criteria:**
  - A toggle switches themes instantly without a full reload.
  - The choice persists across sessions and respects system preference by default.
  - No flash of incorrect theme on initial load.
- **Priority:** Must Have
- **Story Points:** 2

---

## 11. Internationalization (EN, DE, FR)

### US-032
- **Role:** As a non-English speaker
- **Goal:** I want to switch the interface language between English, German, and French
- **Benefit:** So that I can use the platform in my preferred language
- **Acceptance Criteria:**
  - A language switcher updates all UI strings for the selected locale.
  - Selected locale persists and is reflected in the URL or storage.
  - Missing translations gracefully fall back to English.
- **Priority:** Should Have
- **Story Points:** 5

### US-033
- **Role:** As a search engine / international visitor
- **Goal:** I want localized routes with proper hreflang metadata
- **Benefit:** So that the correct language version is discoverable and indexed
- **Acceptance Criteria:**
  - Each locale has a distinct URL path or parameter.
  - hreflang tags are emitted for all supported locales.
- **Priority:** Could Have
- **Story Points:** 3

---

## 12. GitHub API Integration

### US-034
- **Role:** As a visitor
- **Goal:** I want to see live star, fork, and contributor counts
- **Benefit:** So that I can assess community activity in real time
- **Acceptance Criteria:**
  - Counts are fetched from the GitHub API and cached server-side.
  - Rate-limit handling includes caching and graceful fallback.
- **Priority:** Should Have
- **Story Points:** 3

### US-035
- **Role:** As a visitor
- **Goal:** I want to see a list of top contributors with avatars
- **Benefit:** So that I can recognize the people behind the project
- **Acceptance Criteria:**
  - Contributor avatars link to their GitHub profiles.
  - List is limited to a configurable top-N and is responsive.
- **Priority:** Could Have
- **Story Points:** 3

### US-036
- **Role:** As an admin
- **Goal:** I want release/download data synced from GitHub Releases
- **Benefit:** So that download stats and version lists stay accurate
- **Acceptance Criteria:**
  - Release assets and download counts are fetched and stored.
  - Sync runs on a schedule or on-demand and reports failures.
- **Priority:** Could Have
- **Story Points:** 5

---

## 13. SEO & Open Graph

### US-037
- **Role:** As a marketer / the owner
- **Goal:** I want each page to have proper title, description, and Open Graph/Twitter meta tags
- **Benefit:** So that shared links render rich previews and rank well
- **Acceptance Criteria:**
  - Every page sets unique title, description, canonical URL, and OG/Twitter tags.
  - A default OG image is provided and overridable per page.
  - A sitemap.xml and robots.txt are generated.
- **Priority:** Must Have
- **Story Points:** 3

### US-038
- **Role:** As a search engine
- **Goal:** I want structured data (JSON-LD) for the software/organization
- **Benefit:** So that rich results can be displayed in search
- **Acceptance Criteria:**
  - JSON-LD includes SoftwareApplication and Organization schemas.
  - Markup validates against schema.org requirements.
- **Priority:** Could Have
- **Story Points:** 2

---

## 14. Contact Form

### US-039
- **Role:** As a visitor
- **Goal:** I want confirmation that my contact message was sent
- **Benefit:** So that I know my message reached the owner
- **Acceptance Criteria:**
  - On success, a confirmation message is shown and the form resets.
  - Submissions are stored and/or emailed to the owner.
  - Validation prevents empty or malformed submissions.
- **Priority:** Should Have
- **Story Points:** 3

---

## 15. Newsletter Subscription (Optional)

### US-040
- **Role:** As an interested visitor
- **Goal:** I want to subscribe to a newsletter with my email
- **Benefit:** So that I receive updates about new releases and research
- **Acceptance Criteria:**
  - Email input validates format and prevents duplicate subscriptions.
  - Subscriber sees a confirmation and can opt out later.
  - Double opt-in is supported where required by regulation.
- **Priority:** Could Have
- **Story Points:** 3

---

## Summary

| Feature Area | Stories | Must | Should | Could |
| --- | --- | --- | --- | --- |
| Home Page | US-001–US-005 | 2 | 3 | 0 |
| Download & Versions | US-006–US-008 | 1 | 1 | 1 |
| Documentation | US-009–US-012 | 2 | 1 | 1 |
| Community | US-013–US-016 | 1 | 2 | 1 |
| Research | US-017–US-019 | 0 | 1 | 2 |
| Projects | US-020–US-021 | 0 | 1 | 1 |
| About & Contact | US-022–US-023 | 0 | 2 | 0 |
| Authentication | US-024–US-026 | 2 | 1 | 0 |
| Admin Dashboard | US-027–US-030 | 2 | 2 | 0 |
| Theme Toggle | US-031 | 1 | 0 | 0 |
| Internationalization | US-032–US-033 | 0 | 1 | 1 |
| GitHub API | US-034–US-036 | 0 | 1 | 2 |
| SEO & Open Graph | US-037–US-038 | 1 | 0 | 1 |
| Contact Form | US-039 | 0 | 1 | 0 |
| Newsletter | US-040 | 0 | 0 | 1 |

**Total stories:** 40
