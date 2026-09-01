export type AutomationCategory = "AI/LLM" | "CRM & Ops";

export interface WebProject {
  id: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  highlights: string[];
  image?: string;
}

function screenshotOf(url: string): string {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  category: AutomationCategory;
  description: string;
  trigger: string;
  flowNodes: string[];
  metricBadge: string;
  samplePayload: string;
  screenshot?: string;
}

export const WEB_PROJECTS: WebProject[] = [
  {
    id: "takers-daily",
    title: "Takers Daily",
    category: "Coffee Shop E-Commerce",
    description:
      "Specialty coffee shop storefront built to showcase the menu, highlight signature drinks, and guide customers through a smooth ordering and checkout flow.",
    liveUrl: "https://takers-daily.vercel.app/",
    githubUrl: "https://github.com/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "E-Commerce"],
    image: screenshotOf("https://takers-daily.vercel.app/"),
    highlights: [
      "Signature drinks & menu catalog",
      "Streamlined ordering & cart flow",
      "Fast, responsive storefront",
    ],
  },
  {
    id: "oroq-coco-shop",
    title: "Oroq Coco Shop",
    category: "E-Commerce & Storefront",
    description:
      "Specialty e-commerce storefront tailored for local product showcase, catalog management, and seamless buyer UX.",
    liveUrl: "https://oroq-coco-shop.vercel.app/",
    githubUrl: "https://github.com/",
    techStack: ["React", "Tailwind CSS", "TypeScript", "E-Commerce"],
    image: screenshotOf("https://oroq-coco-shop.vercel.app/"),
    highlights: [
      "Interactive product catalog",
      "Responsive cart flow",
      "Optimized image delivery",
    ],
  },
  {
    id: "pixel-vibe",
    title: "Pixel Vibe",
    category: "Creative & Interactive UI",
    description:
      "Visually expressive portfolio showcasing creative front-end styling, micro-interactions, and modern design aesthetics.",
    liveUrl: "https://pixel-vibe-portfolio.vercel.app/",
    githubUrl: "https://github.com/",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    image: screenshotOf("https://pixel-vibe-portfolio.vercel.app/"),
    highlights: [
      "Smooth micro-animations",
      "Bold design accents",
      "Fluid responsive layout",
    ],
  },
  {
    id: "discover-oroq",
    title: "Discover Oroq",
    category: "Tourism & Exploration",
    description:
      "Curated regional discovery platform connecting visitors to local attractions, cultural landmarks, and experiences.",
    liveUrl: "https://discover-oroq.vercel.app/",
    githubUrl: "https://github.com/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Location Feeds"],
    image: screenshotOf("https://discover-oroq.vercel.app/"),
    highlights: [
      "Location discovery guides",
      "Interactive spot cards",
      "Rich responsive media",
    ],
  },
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "dental-chatbot-booking",
    title: "AI Dental Booking Chatbot",
    screenshot: "/Dental Chatbot.png",
    category: "AI/LLM",
    description:
      "A Gemini-powered virtual receptionist that collects a patient's details, checks the clinic's Google Calendar for their preferred time, then books the slot, logs it to Google Sheets, and emails the dentist.",
    trigger: "Chat Message Received",
    flowNodes: [
      "Chat Trigger",
      "AI Agent (Gemini)",
      "Parse Booking JSON",
      "Check Calendar Availability",
      "Create Calendar Event",
      "Append to Google Sheets",
      "Email the Dentist",
    ],
    metricBadge: "⚡ Books in seconds",
    samplePayload:
      '{\n  "first_name": "Maria",\n  "last_name": "Santos",\n  "age": 32,\n  "procedure": "Teeth Cleaning",\n  "appointment_date": "2026-09-10",\n  "appointment_time": "10:00 AM",\n  "contact_number": "09171234567",\n  "available": true,\n  "start": { "dateTime": "2026-09-10T10:00:00+08:00" },\n  "status": "confirmed"\n}',
  },
  {
    id: "content-auto-sync",
    title: "Automated Content Ingestion & AI Summarizer",
    screenshot: "/AI Summarizer.png",
    category: "AI/LLM",
    description:
      "Polls RSS/Content sources, generates concise summaries via OpenAI node, and publishes structured drafts directly to the CMS.",
    trigger: "Cron Schedule / Webhook",
    flowNodes: [
      "Schedule Trigger",
      "Fetch Feed",
      "OpenAI Summarizer",
      "CMS Auto-Publish",
    ],
    metricBadge: "⏱️ Saves 8 hrs/week",
    samplePayload:
      '{\n  "task": "summarize_draft",\n  "tokens": 420,\n  "status": "published"\n}',
  },
  {
    id: "ai-social-media-repurposer",
    title: "AI Social Media Repurposer",
    screenshot: "/AI Repurposer.png",
    category: "AI/LLM",
    description:
      "Pulls the latest ingested news articles from a Google Sheet, has a Gemini agent rewrite each story into a LinkedIn post and an X (Twitter) thread, then logs the ready-for-review drafts back to a Social Drafts sheet.",
    trigger: "Manual Trigger / Sheet Read",
    flowNodes: [
      "Manual Trigger",
      "Get Rows (Sheet)",
      "Limit",
      "AI Agent (Gemini)",
      "Parse JSON Drafts",
      "Append to Social Drafts",
    ],
    metricBadge: "📱 2 platforms per run",
    samplePayload:
      '{\n  "date": "8/26/2026",\n  "original_title": "Latest News",\n  "linkedin_post": "Hook...\\n\\nKey analysis...",\n  "twitter_thread": "Tweet 1: ...\\n\\nTweet 2: ...",\n  "hashtags": "#Tech #News",\n  "status": "Ready for Review"\n}',
  },
  {
    id: "dental-aftercare-reviews",
    title: "Daily Aftercare & Review Emails",
    screenshot: "/Aftercare and Review.png",
    category: "CRM & Ops",
    description:
      "A daily cron pulls the clinic's Google Calendar events for the day and branches by procedure — sending post-extraction aftercare instructions, a review request after cleanings, and a general thank-you email. No human in the loop.",
    trigger: "Daily Cron (18:00)",
    flowNodes: [
      "Schedule Trigger",
      "Today's Calendar Events",
      "Route by Procedure",
      "Send Aftercare Email",
      "Send Review Request",
      "Send Thank-You Email",
    ],
    metricBadge: "📬 Emails 3 audiences",
    samplePayload:
      '{\n  "summary": "Maria Santos - Teeth Cleaning",\n  "start": { "dateTime": "2026-09-10T10:00:00+08:00" },\n  "branch": "review"\n}',
  },
  {
    id: "24hr-appointment-reminder",
    title: "24-Hour Appointment Reminder",
    screenshot: "/24 hr Reminder.png",
    category: "CRM & Ops",
    description:
      "A daily cron computes tomorrow's date, fetches upcoming appointments from Google Calendar, and emails each patient a friendly reminder the day before their visit.",
    trigger: "Daily Cron (08:00)",
    flowNodes: [
      "Schedule Trigger",
      "Compute Tomorrow",
      "Fetch Tomorrow's Events",
      "Email Appointment Reminder",
    ],
    metricBadge: "📅 No-show reducer",
    samplePayload:
      '{\n  "tomorrow_date": "2026-09-10T16:00:00+08:00",\n  "summary": "Teeth Cleaning",\n  "start": { "dateTime": "2026-09-11T10:00:00+08:00" },\n  "recipient": "patient@example.com"\n}',
  },
  {
    id: "lead-nurture",
    title: "Lead Nurture Automation",
    screenshot: "/Lead Nurture.png",
    category: "CRM & Ops",
    description:
      "A webhook captures every inbound lead, appends it to a Google Sheet, sends an instant welcome email, and pings Slack. After a set delay it checks the lead's status and fires a personalized follow-up email, keeping the funnel warm with no manual tracking.",
    trigger: "Webhook / Lead Intake",
    flowNodes: [
      "Webhook Trigger",
      "Append Lead to Sheet",
      "Welcome Email (Gmail)",
      "Slack Alert",
      "Wait",
      "Fetch Lead Status",
      "Route by Status (If)",
      "Follow-Up Email",
      "Update Lead Status",
    ],
    metricBadge: "📨 Auto follow-ups",
    samplePayload:
      '{\n  "createdAt": "2026-08-30T09:12:00+08:00",\n  "data": { "fields": [{ "value": "Maria Santos" }, { "value": "maria@example.com" }, { "value": "09171234567" }, { "value": "Web Design" }] },\n  "status": "New Lead"\n}',
  },
  {
    id: "client-onboarding",
    title: "Client Onboarding System",
    screenshot: "/Client Onboarding.png",
    category: "CRM & Ops",
    description:
      "On a new-client webhook, this workflow builds a dedicated Google Drive hub with a brand-kit subfolder, logs the project to a tracking sheet, emails the welcome + Drive link, and notifies Slack — a zero-touch onboarding kickoff.",
    trigger: "Webhook / New Client",
    flowNodes: [
      "Webhook Trigger",
      "Create Drive Hub Folder",
      "Create Brand Kit Subfolder",
      "Append to Project Tracker",
      "Welcome Email (Gmail)",
      "Slack Alert",
    ],
    metricBadge: "🚀 Zero-touch onboarding",
    samplePayload:
      '{\n  "data": { "fields": [{ "value": "Maria Santos" }, { "value": "Acme Corp" }, { "value": "maria@example.com" }, { "options": [{ "text": "Growth" }] }] },\n  "drive_hub_id": "1AbCdEfGhIjKlMnOpQrStUvWxYz",\n  "status": "Onboarding Sent"\n}',
  },
];

export const AUTOMATION_FILTERS: Array<"All" | AutomationCategory> = [
  "All",
  "AI/LLM",
  "CRM & Ops",
];

export const SOCIAL_LINKS = {
  github: "https://github.com/8kshj1jh44",
  linkedin: "https://www.linkedin.com/in/franz-lyster-tagalogon-2b7283217/",
  upwork: "https://www.upwork.com/freelancers/~01b4e057e37d32e9fd",
  facebook: "https://www.facebook.com/tagalogonXD/",
  email: "mailto:franzlyster@gmail.com",
};

export const RESUME_PATH = "/Franz_Lyster_Tagalogon_ATS_Resume.pdf";