# AGENTS.md — Franz Lyster Portfolio

Next.js 14 (App Router) + Tailwind + TypeScript portfolio deployed on Vercel.
Repo: https://github.com/8kshj1jh44/FranzPortfolio

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (runs ESLint + type checks)
- `npx tsc --noEmit` — typecheck
- `npm run lint` — ESLint
- No test framework exists; build + typecheck + lint are the verification gates.

## Structure
- `app/page.tsx` — homepage (Navbar, Hero, WorkTabs, Contact, Footer)
- `app/projects/[id]/page.tsx` — web project detail pages (SSG, from WEB_PROJECTS)
- `app/automations/[id]/page.tsx` — automation detail pages (SSG, from AUTOMATION_WORKFLOWS)
- `app/analytics/page.tsx` + `app/api/analytics` + `app/api/visit` — Appwrite-backed visit analytics (password-protected, path `/analytics`; not linked from UI)
- `app/not-found.tsx` — custom 404
- `app/icon.svg` — favicon (FL monogram)
- `app/sitemap.ts` — includes homepage + all project/automation detail URLs
- `data/portfolioData.ts` — source of truth: WEB_PROJECTS, AUTOMATION_WORKFLOWS, SOCIAL_LINKS, RESUME_PATH
- `components/` — Navbar, Hero, WorkTabs (tabs: web / automations / experience), AutomationShowcase, WebProjects, ExperienceSection, Contact, Footer, CVButton, VisitTracker, BlurText, ScrollFloat
- `public/n8n/` — workflow screenshots (.png) + workflow JSONs (.json). Pair by matching name.

## Design system
Dark theme. Tokens in `tailwind.config.ts`: `background #0a0a0c`, `surface`, `surface-2`, `ink`/`ink-secondary`/`ink-muted`, `accent #3b82f6`, `coral #ff6d5a`. Rounded `rounded-card` (1rem). Geist fonts via `next/font/local`. Custom utilities in `app/globals.css`: `.glass`, `.dot-grid`, `.hairline-top`.

## Current state (session handoff — Sep 2026)
- Header is **static** (scrolls away, no fixed/glass). Done in commit `607f6c0`.
- Web + automation **detail pages** live with per-page metadata, breadcrumb JSON-LD, sitemap entries, "Read case study" links on cards. Done in `607f6c0`.
- Custom **404** and **favicon** added. Done in `607f6c0`.
- CV swapped to `public/CV.pdf` (converted from `public/CV.docx`); `RESUME_PATH = "/CV.pdf"` in `data/portfolioData.ts`. Done in `eda640f`.
- ShapeGrid canvas backgrounds and GooeyNav removed from Hero/WorkTabs/Contact/Navbar (plain nav links instead). Done in `eda640f`.
- **AI Social Media Repurposer workflow dropped** from AUTOMATION_WORKFLOWS (was trimmed previously too). `cafbb0e`.
- Automation screenshots fixed so each workflow points to its own PNG that actually exists and is decodable (the old `ABS-CBN.png` was corrupt; `AI Summarizer.png` referenced a missing file). `cafbb0e`. **Lesson: always verify the referenced screenshot file exists AND decodes (System.Drawing) before wiring it up.**

## Outstanding / deferred (user explicitly skipped these)
- Certificates badges strip (Azure AI, Google Cybersecurity, NC, THM PDFs already in `public/`) — was proposed, user dropped it.
- Blog (repo markdown) — user dropped it.
- Analytics link in Footer — user dropped it.
- FAQ JSON-LD on homepage — user dropped it.
- Homepage still shows "5+ live sites" hero stat and 6 automation count — verify counts match current data (now 4 web projects, 5 automations).

## Gotchas
- `robots.ts` disallows `/analytics` and `/api` (intentional — analytics is private).
- Web project thumbnails use wordpress.com mshots (plain `<img>`, pre-existing ESLint warnings).
- Google Analytics script in `app/layout.tsx` uses inline `<script>` (pre-existing warning).
- `.env` has Appwrite + analytics creds — do not commit secrets.
- Filenames in `public/n8n/` matter; keep screenshot name matching its workflow JSON name.