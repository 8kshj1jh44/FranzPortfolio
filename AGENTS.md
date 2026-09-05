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
- **Sales-page sections** added to homepage: `components/StatsBar.tsx` (PROOF_STATS strip), `components/Services.tsx` (SERVICES offer cards w/ starting price), `components/Process.tsx` (PROCESS_STEPS 4-step). Data in `data/portfolioData.ts`. Homepage order is now Hero → StatsBar → Services → Process → WorkTabs → Testimonials → Contact.
- **Client Testimonials section** added to homepage: `components/Testimonials.tsx` + `TESTIMONIALS` in `data/portfolioData.ts`, grouped by niche (`Web Development` / `Automation`), 3 placeholders each — replace with real client quotes. Not yet committed.
- **FAQ + CTA sections** added to homepage: `components/FAQ.tsx` (FAQS accordion, first item open by default) and `components/CTA.tsx` (CTA_BANNER risk-reversal banner w/ guarantees). Homepage order: Hero → StatsBar → Services → Process → WorkTabs → Testimonials → FAQ → CTA → Contact.
- **CTA banner removed** — it duplicated the Contact ask. Guarantees (free discovery call / revisions included / support after launch) from `CTA_BANNER.guarantees` were folded into the Contact heading; `components/CTA.tsx` deleted. Homepage order is now Hero → StatsBar → Services → Process → WorkTabs → Testimonials → FAQ → Contact.

## Outstanding / deferred (user explicitly skipped these)
- Certificates badges strip (Azure AI, Google Cybersecurity, NC, THM PDFs already in `public/`) — was proposed, user dropped it.
- Blog (repo markdown) — user dropped it.
- Analytics link in Footer — user dropped it.
- FAQ JSON-LD on homepage — user dropped it.
- **Case-study metrics + ROI badges**: added optional `metrics` (`{value,label}[]`) to `WebProject` (placeholder results per project, rendered as a stat strip on `/projects/[id]`), and restyled the automation card `metricBadge` into a prominent emerald ROI chip (TrendingUp icon) in `AutomationShowcase.tsx`. Replace placeholder metrics with real numbers. Not yet committed.
- **Automation GIFs**: added optional `gif` field to `AutomationWorkflow` and wired `AutomationShowcase` to prefer the GIF ("View demo" button) with fallback to `screenshot` on error. Animated pan/zoom GIFs were generated from the static PNGs with ffmpeg (`C:\Users\Franz\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg...\bin\ffmpeg.exe`, 640px wide, ~4.7s, 12fps, palette dither). To regenerate: zoompan filter `zoompan=z='min(zoom+0.0020,1.25)':d=120:...s=<w>x<h>,fps=12` + palettegen/paletteuse. Not yet committed.

## Gotchas
- `robots.ts` disallows `/analytics` and `/api` (intentional — analytics is private).
- Web project thumbnails use wordpress.com mshots (plain `<img>`, pre-existing ESLint warnings).
- Google Analytics script in `app/layout.tsx` uses inline `<script>` (pre-existing warning).
- `.env` has Appwrite + analytics creds — do not commit secrets.
- Filenames in `public/n8n/` matter; keep screenshot name matching its workflow JSON name.