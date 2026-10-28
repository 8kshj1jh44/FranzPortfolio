export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: "Full-Time" | "Freelance" | "Contract";
  description: string[];
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  badgeColor: string;
  pdfPath: string;
}

export const RESUME_DATA = {
  name: "Franz Lyster L. Tagalogon",
  title: "GHL Automation Specialist & Full-Stack Web Developer",
  summary:
    "GoHighLevel (GHL) Automation Specialist and Full-Stack Web Developer — building speed-to-lead, appointment-confirmation, and reactivation workflows in GHL, AI pipelines in n8n, and high-performance Next.js and WordPress sites with custom themes and plugins.",
  education: {
    degree: "Bachelor of Science in Computer Engineering",
    school: "Jose Rizal Memorial State University – Main Campus",
    period: "2019 – 2023",
  },
  skills: {
    frontend: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    wordpress: [
      "WordPress",
      "PHP",
      "Custom Theme Development",
      "Custom Plugin Development",
    ],
    automation: [
      "GoHighLevel (GHL)",
      "GHL Workflows & Pipelines",
      "GHL Conversation AI",
      "AI Agents (Gemini/OpenAI)",
      "n8n Workflows",
      "Webhooks",
      "REST APIs",
      "Cron Triggers",
    ],
    backend: [
      "Appwrite BaaS",
      "Supabase",
      "Python",
      "Serverless Functions",
      "Azure AI",
    ],
    devopsSecurity: [
      "Linux",
      "Git",
      "Vercel",
      "Google Cybersecurity",
      "Penetration Testing",
    ],
  },
  experience: [
    {
      role: "GoHighLevel (GHL) Automation Specialist",
      company: "Freelance — Agency & Local Business Clients",
      period: "2024 – Present (2+ yrs)",
      type: "Freelance",
      description: [
        "Built speed-to-lead workflows that fire personalized SMS within a second of quiz or form submission, tagging and prioritizing leads automatically.",
        "Deployed high-value consultation workflows — prep-note emails, SMS confirmation asks, reply branching (confirm / reschedule), and no-reply timeouts with team alerts.",
        "Configured GHL pipelines, Conversation AI lead qualification, tagging logic, and opportunity automation across client sub-accounts.",
      ],
      skills: ["GoHighLevel", "GHL Workflows", "Conversation AI", "SMS/Email Automation", "Pipeline Design"],
    },
    {
      role: "Freelance Full-Stack Developer & Automation Engineer",
      company: "Self-Employed",
      period: "Sept 2022 – Present",
      type: "Freelance",
      description: [
        "Architected and deployed 5+ production web applications using Next.js, React, and Tailwind CSS.",
        "Built client websites on WordPress with custom themes and plugins (PHP) for local businesses.",
        "Built autonomous n8n AI workflows connecting Appwrite databases, contact webhooks, and multi-channel notifications.",
        "Delivered performant edge deployments on Vercel with optimized assets and sub-second response times.",
      ],
      skills: ["Next.js", "WordPress", "PHP", "TypeScript", "n8n", "Appwrite"],
    },
    {
      role: "Systems & Operations Support Engineer",
      company: "JMC Power Depot / Haitek Logistics Services",
      period: "Aug 2023 – Aug 2025",
      type: "Full-Time",
      description: [
        "Maintained and monitored internal logistics infrastructure and system integrity for inbound/outbound record operations.",
        "Troubleshot network, software, and hardware incidents to maintain continuous uptime.",
        "Optimized manual reporting tasks by structuring internal operational data.",
      ],
      skills: [
        "System Administration",
        "Logistics Data Ops",
        "Network Troubleshooting",
        "Process Optimization",
      ],
    },
    {
      role: "Embedded Systems & Hardware Programmer",
      company: "Freelance",
      period: "Dec 2024 – Present",
      type: "Freelance",
      description: [
        "Configured Arduino and embedded microcontrollers to interface with hardware sensors and execute automated routines.",
        "Diagnosed low-level hardware/software faults to guarantee stable system operation.",
      ],
      skills: ["C/C++", "Arduino", "Hardware Diagnostics", "Embedded Logic"],
    },
  
  ] as ExperienceItem[],
  certifications: [
{
      name: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      year: "2026",
      badgeColor: "#0078D4",
      pdfPath: "/Azure%20AI%20Fundamentals.pdf",
    },
    {
      name: "Junior Penetration Tester",
      issuer: "TryHackMe",
      year: "2026",
      badgeColor: "#FF4154",
      pdfPath: "/THM-AWXZ12HKVE.pdf",
    },
    {
      name: "Google Cybersecurity Certificate",
      issuer: "Google",
      year: "2024",
      badgeColor: "#4285F4",
      pdfPath: "/GoogleCybersecurityCertificate_Badge20240729-7-i1k3wx.pdf",
    },
    {
      name: "Electronics Processing and Servicing",
      issuer: "TESDA",
      year: "2026",
      badgeColor: "#10B981",
      pdfPath: "/NC.pdf",
    },
  ] as CertificationItem[],
};