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
      "Care Appliance Aircon Trading website built on WordPress — a direct dealer, installer, and service center showcasing branded window and split-type aircons with free installation in Oroquieta City, and making it easy for customers to call or message to request a repair.",
    liveUrl: "https://careappliance.gt.tc/",
    techStack: ["WordPress", "PHP", "Custom Theme", "Custom Plugins", "Responsive Design", "SEO"],
    image: "/projects/care-appliance.jpg",
    highlights: [
      "Branded aircon catalog at bodega prices",
      "Call & Facebook Messenger contact flow",
      "Installer & service-center credibility sections",
    ],
  },
  {
    id: "identify-snakes-ph",
    title: "Identify Snakes in PH",
    category: "Educational / Interactive Guide",
    description:
      "\"A Dummy's Guide to the Philippine Snakes\" — an educational WordPress site that walks visitors through identifying snake species in the Philippines, with a guided, beginner-friendly flow from landing page to species information.",
    liveUrl: "https://identifysnakesinph.freedev.app/",
    githubUrl: "https://github.com/8kshj1jh44/Snake-Website-",
    techStack: ["WordPress", "PHP", "Custom Theme", "Custom Plugins", "Responsive Design", "SEO"],
    image: "/projects/identify-snakes-ph.jpg",
    highlights: [
      "Guided species-identification flow",
      "Beginner-friendly educational content",
      "Bold, imagery-driven landing page",
    ],
  },
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "dental-chatbot-booking",
    title: "AI Dental Booking Chatbot",
    screenshot: "/n8n/Dental Chatbot.png",
    video: "/n8n/dental-chatbot-film.mp4",
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
    id: "ghl-speed-to-lead",
    title: "GHL Speed-to-Lead: Quiz to Booking",
    screenshot: "/n8n/GHL - Speed to Lead.png",
    video: "/n8n/GHL - Speed to Lead.mp4",
    category: "CRM & Ops",
    description:
      "A GoHighLevel workflow that fires the moment a quiz is submitted: the lead is tagged and prioritized, an AI conversation qualifies their skin concern, and a personalized SMS goes out within a second — booking the appointment straight from the text thread.",
    trigger: "Quiz Submitted (GHL)",
    flowNodes: [
      "Quiz Submitted Trigger",
      "Update Opportunity",
      "Add Tag (speed-to-lead, high priority)",
      "Wait",
      "Conversation AI — Lead Qualification",
      "Qualified / Ready to Book → SMS + Book",
      "Price Inquiry / Objection → SMS",
      "Not Interested → Tag & Close",
      "Internal Notification",
    ],
    metricBadge: "⚡ First touch in 1 second",
    samplePayload:
      '{\n  "contact_name": "Maya Torres",\n  "quiz": "Franz Med Spa Quiz",\n  "skin_primary_concern": "Acne & Active Breakouts",\n  "tags": ["speed-to-lead", "high priority"],\n  "first_sms": "Hi Maya — it\'s the studio assistant. Based on your quiz, let\'s start on the acne program. Would Tuesday 10:30 work?",\n  "reply": "Yes — book it",\n  "appointment": { "status": "confirmed", "slot": "Tue 10:30" }\n}',
  },
  {
    id: "ghl-high-value-consultation",
    title: "GHL High-Value Consultation: Confirm & Rebook",
    screenshot: "/n8n/GHL - High Value Consultation.png",
    video: "/n8n/GHL - High Value Consultation.mp4",
    category: "CRM & Ops",
    description:
      "A GoHighLevel workflow that guards every booked consultation: it updates the pipeline, emails a prep note, asks for confirmation by SMS, then branches on the reply — YES confirms, RESCHEDULE rebooks, and a 2-hour no-reply timeout alerts the team and marks the lead for follow-up.",
    trigger: "Appointment Status (GHL)",
    flowNodes: [
      "Appointment Status Trigger",
      "Update Opportunity (Consultation pipeline)",
      "Add Tag (appointment-booked)",
      "Email — Prep Note",
      "SMS — Confirmation Ask",
      "Wait for Reply (2h timeout)",
      "Reply YES → Confirmed",
      "Reply RESCHEDULE → Rebooked",
      "No Reply → Internal Notification + Follow-up",
    ],
    metricBadge: "📅 Every consult answered",
    samplePayload:
      '{\n  "appointment": { "date": "Tue 10:30", "type": "Consultation", "status": "booked" },\n  "prep_email_subject": "Quick prep for your consultation",\n  "confirmation_sms": "Reply YES to confirm, or RESCHEDULE.",\n  "reply": "YES",\n  "outcome": "confirmed",\n  "followup_sms": "You\'re confirmed — see you at your consultation. 🎉"\n}',
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

export const PROJECT_TYPES = ["Web App", "GHL Automation", "Full Stack"] as const;

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    tagline: "Sites & storefronts that sell",
    description:
      "Fast, responsive, on-brand websites and e-commerce storefronts built to convert visitors into customers — in modern stacks like Next.js or WordPress.",
    deliverables: [
      "Custom responsive design",
      "Custom WordPress themes & plugins",
      "E-commerce & checkout",
      "SEO + analytics setup",
    ],
  },
  {
    id: "automation",
    title: "GHL & AI Automation",
    tagline: "Workflows that book, confirm & reactivate",
    description:
      "GoHighLevel workflows — speed-to-lead, appointment confirmations, reactivation campaigns, Conversation AI qualification — plus n8n AI pipelines that eliminate manual, repetitive work.",
    deliverables: [
      "GHL speed-to-lead & quiz funnels",
      "Appointment confirm & rebook flows",
      "Conversation AI & tagging logic",
      "n8n AI chatbots & CRM sync",
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack / Retainer",
    tagline: "Ongoing build & support",
    description:
      "Continuous builds, maintenance, and iterations across Next.js, WordPress, and n8n — a reliable long-term technical partner.",
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
      "The speed-to-lead automation saves us hours every week. Franz understood the whole funnel and built exactly what the team needed.",
    name: "Kimmy D.",
    role: "Sales Manager",
    initials: "KD",
  },
];