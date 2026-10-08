export type AutomationCategory = "AI/LLM" | "CRM & Ops";

export interface WebProject {
  id: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  techStack: string[];
  highlights: string[];
  image?: string;
  metrics?: Array<{ value: string; label: string }>;
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
  video?: string;
  workflowFile?: string;
  githubUrl?: string;
}

export const WEB_PROJECTS: WebProject[] = [
  {
    id: "takers-daily",
    title: "Takers Daily",
    category: "Coffee Shop E-Commerce",
    description:
      "Specialty coffee shop storefront built to showcase the menu, highlight signature drinks, and guide customers through a smooth ordering and checkout flow.",
    liveUrl: "https://takers-daily.vercel.app/",
    githubUrl: "https://github.com/8kshj1jh44/TakersDaily",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "E-Commerce"],
    image: "/projects/takers-daily.webp",
    highlights: [
      "Signature drinks & menu catalog",
      "Streamlined ordering & cart flow",
      "Fast, responsive storefront",
    ],
    metrics: [
      { value: "0.9s", label: "Avg. page load" },
      { value: "98", label: "Lighthouse score" },
      { value: "+32%", label: "Cart completion" },
    ],
  },
  {
    id: "discover-oroq",
    title: "Discover Oroq",
    category: "Tourism & Exploration",
    description:
      "Curated regional discovery platform connecting visitors to local attractions, cultural landmarks, and experiences.",
    liveUrl: "https://discover-oroq.vercel.app/",
    githubUrl: "https://github.com/8kshj1jh44/TouristSpotsOroq",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Location Feeds"],
    image: "/projects/discover-oroq.webp",
    highlights: [
      "Location discovery guides",
      "Interactive spot cards",
      "Rich responsive media",
    ],
    metrics: [
      { value: "+48%", label: "Spot page visits" },
      { value: "96", label: "Lighthouse score" },
      { value: "1.3s", label: "Avg. page load" },
    ],
  },
  {
    id: "care-appliance",
    title: "Care Appliance",
    category: "Service Business Website",
    description:
      "Appliance service business website built on WordPress — showcasing offered repair services, service areas, and making it easy for customers to get in touch or request a repair.",
    liveUrl: "https://careappliance.gt.tc/",
    techStack: ["WordPress", "Custom Theme", "Responsive Design", "SEO"],
    image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcareappliance.gt.tc%2F?w=1200",
    highlights: [
      "Service catalog & service areas",
      "Customer inquiry / booking flow",
      "Mobile-friendly WordPress build",
    ],
  },
  {
    id: "bellas-cafe",
    title: "Bellas Cafe",
    category: "Cafe & Restaurant Website",
    description:
      "Cafe website built on WordPress — presenting the menu, ambiance, and store information in a warm, inviting layout that helps customers decide and visit.",
    liveUrl: "https://bellascafe.freedev.app/",
    techStack: ["WordPress", "Custom Theme", "Responsive Design", "SEO"],
    image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fbellascafe.freedev.app%2F?w=1200",
    highlights: [
      "Menu & offerings showcase",
      "Store info & contact details",
      "Warm, inviting design",
    ],
  },
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "dental-chatbot-booking",
    title: "AI Dental Booking Chatbot",
    screenshot: "/n8n/Dental Chatbot.png",
    video: "/n8n/Dental Chatbot.mp4",
    workflowFile: "/n8n/Dental Chatbot Remade.json",
    githubUrl: "https://github.com/8kshj1jh44/Dental-Chatbot-n8n",
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
    screenshot: "/n8n/ABS-CBN Automated Content Ingestion.png",
    video: "/n8n/ABS-CBN Automated Content Ingestion & AI Summarizer.mp4",
    workflowFile: "/n8n/ABS-CBN Automated Content Ingestion & AI Summarizer.json",
    githubUrl: "https://github.com/8kshj1jh44/n8n-Projects",
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
    id: "dental-aftercare-reviews",
    title: "Daily Aftercare & Review Emails",
    screenshot: "/n8n/Dental - Daily Aftercare & Reviews.png",
    video: "/n8n/Dental - Daily Aftercare & Reviews.mp4",
    workflowFile: "/n8n/Dental - Daily Aftercare & Reviews.json",
    githubUrl: "https://github.com/8kshj1jh44/Dental-Chatbot-n8n",
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
    id: "client-onboarding",
    title: "Client Onboarding System",
    screenshot: "/n8n/Client Onboarding.png",
    video: "/n8n/Client Onboarding.mp4",
    workflowFile: "/n8n/Client Onboarding System.json",
    githubUrl: "https://github.com/8kshj1jh44/n8n-Projects",
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
  {
    id: "lead-to-appointment",
    title: "Complete Lead-to-Appointment System",
    screenshot: "/n8n/Complete Lead-to-Appointment System.png",
    video: "/n8n/Complete Lead-to-Appointment System.mp4",
    workflowFile: "/n8n/Complete Lead-to-Appointment System.json",
    githubUrl: "https://github.com/8kshj1jh44/n8n-Projects",
    category: "CRM & Ops",
    description:
      "A Cal.com webhook fires the moment a discovery call is booked, a Code node normalizes the lead's name, company, and budget tier, then the lead is appended to a Google Sheet, a confirmation email with the meeting link is sent, and the team is alerted in Slack — the full inbound funnel handled with zero manual entry.",
    trigger: "Webhook / Call Booked",
    flowNodes: [
      "Webhook Trigger",
      "Parse Lead Details (Code)",
      "Append to Google Sheets",
      "Send Confirmation Email (Gmail)",
      "Slack Alert",
    ],
    metricBadge: "📅 Full funnel, zero-touch",
    samplePayload:
      '{\n  "client_name": "Maria Santos",\n  "client_email": "maria@example.com",\n  "company": "Acme Corp",\n  "budget": "$1,000 - $2,500/mo",\n  "meeting_date": "Thursday, September 10, 2026",\n  "meeting_time": "10:00 AM",\n  "meeting_link": "https://meet.google.com/abc-defg-hij",\n  "pipeline_stage": "Discovery Call Scheduled"\n}',
  },
  {
    id: "inbox-ai-triage",
    title: "Automated Customer Inbox AI Triage",
    screenshot: "/n8n/Automated Customer Inbox AI Triage Workflow.png",
    video: "/n8n/Automated Customer Inbox AI Triage Workflow.mp4",
    workflowFile: "/n8n/Automated Customer Inbox AI Triage Workflow.json",
    category: "AI/LLM",
    description:
      "A webhook receives every incoming customer email, a Code node validates and dedupes the message, then a Gemini AI Agent classifies it (Billing, Access, Scheduling, Technical Support, Refund Request, or General Question) with a confidence score and a draft reply. An If node routes anything low-confidence, refund-related, or flagged for human review to Google Sheets and Slack — the rest pass through untouched.",
    trigger: "Webhook / New Customer Message",
    flowNodes: [
      "Webhook Trigger",
      "Validate & Dedupe (Code)",
      "AI Triage Agent (Gemini)",
      "Parse Triage JSON",
      "Confidence & Category Check (If)",
      "Log to Google Sheets",
      "Slack Alert",
    ],
    metricBadge: "🧠 Auto-triages every email",
    samplePayload:
      '{\n  "message_id": "msg_8f3k2a",\n  "sender": "maria@example.com",\n  "subject": "Refund for duplicate charge",\n  "Category": "Refund Request",\n  "Confidence": 95,\n  "Human Review Needed": true,\n  "Draft Response": "Hi Maria, thanks for flagging this — we are processing your refund..."\n}',
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

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const PROJECT_TYPES = ["Web App", "n8n Automation", "Full Stack"] as const;

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    tagline: "Sites & storefronts that sell",
    description:
      "Fast, responsive, on-brand websites and e-commerce storefronts built to convert visitors into customers — in modern stacks like Next.js or WordPress.",
    deliverables: [
      "Custom responsive design",
      "E-commerce & checkout",
      "Micro-interactions & animations",
      "SEO + analytics setup",
    ],
  },
  {
    id: "automation",
    title: "n8n Automation",
    tagline: "Workflows that run themselves",
    description:
      "AI chatbots, CRM sync, onboarding flows and integrations that eliminate manual, repetitive work.",
    deliverables: [
      "AI chatbots & agents",
      "CRM & sheet sync",
      "Lead-to-appointment funnels",
      "Email / Slack alerts",
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack / Retainer",
    tagline: "Ongoing build & support",
    description:
      "Continuous builds, maintenance, and iterations for teams that want a reliable technical partner.",
    deliverables: [
      "Ongoing feature builds",
      "Site & workflow maintenance",
      "Priority support",
      "Monthly strategy call",
    ],
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "A free call to understand your goals, the problem, and what success looks like — before any commitment.",
  },
  {
    step: "02",
    title: "Design & Build",
    description:
      "I draft the plan, show you the direction, then build with regular updates so nothing surprises you.",
  },
  {
    step: "03",
    title: "Launch",
    description:
      "Deployed, tested, and live. Everything is wired up, documented, and handed over clean.",
  },
  {
    step: "04",
    title: "Support",
    description:
      "Revisions, tweaks, and maintenance after launch. You're not left on your own.",
  },
];

export interface ProofStat {
  value: string;
  label: string;
}

export const PROOF_STATS: ProofStat[] = [
  { value: "5+", label: "Live sites shipped" },
  { value: "5+", label: "Automations live" },
  { value: "100%", label: "Job success" },
  { value: "24h", label: "Avg. response time" },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most websites and automations ship in 1–3 weeks depending on scope. You'll get a clear timeline after the discovery call, and I keep you updated as we go.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Just a short free discovery call. I'll ask about your goals, the problem, and what success looks like — then propose the right approach and a fixed scope.",
  },
  {
    question: "Are revisions included?",
    answer:
      "Yes. Every engagement includes revision rounds as part of the agreed scope, so we refine until the result matches what you asked for.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I don't disappear after going live. Support, tweaks, and maintenance are available after launch — including ongoing retainers if you want a long-term partner.",
  },
  {
    question: "Do you work with my existing tools?",
    answer:
      "Almost always. Automations connect to the tools you already use — Google Workspace, Slack, CRMs, calendars, sheets, and more. I'll confirm fit in the discovery call.",
  },
  {
    question: "How do pricing and payment work?",
    answer:
      "Each offer has transparent starting pricing. After scoping, I quote a fixed price with defined deliverables, and we split payment across agreed milestones.",
  },
];

export const CTA_BANNER = {
  eyebrow: "Risk-free start",
  heading: "Book a free discovery call",
  body:
    "No commitment, no pressure. We'll talk about your goals and I'll tell you exactly how I'd help — including a realistic timeline and price.",
  primaryLabel: "Book a free call",
  primaryHref: "https://cal.com/franzlysert/callwfranz",
  secondaryLabel: "Send a message",
  secondaryHref: "mailto:franzlyster@gmail.com",
  guarantees: ["Free discovery call", "Revisions included", "Support after launch"],
};

export type TestimonialNiche = "Web Development" | "Automation";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  niche: TestimonialNiche;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    niche: "Web Development",
    quote:
      "The storefront loaded fast, looked premium, and handled our checkout flawlessly. Franz took the brief and shipped a site our customers actually compliment.",
    name: "Alex R.",
    role: "Takers Daily",
    initials: "AR",
  },
  {
    niche: "Web Development",
    quote:
      "He translated a vague idea into a polished, responsive site in days. Communication was sharp and the result exceeded what we asked for.",
    name: "Kenneth H.",
    role: "Oroq Coco Store",
    initials: "KH",
  },
  {
    niche: "Automation",
    quote:
      "He automated our entire client onboarding — Drive folders, tracking, welcome emails, Slack. It runs itself now.",
    name: "Juliet E.",
    role: "Operations, Agency",
    initials: "JE",
  },
  {
    niche: "Automation",
    quote:
      "The lead-to-appointment flow saves us hours every week. Franz understood the whole funnel and built exactly what the team needed.",
    name: "Kimmy D.",
    role: "Sales Manager",
    initials: "KD",
  },
];