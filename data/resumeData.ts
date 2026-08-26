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
  title: "Full-Stack Web Developer & n8n Automation Specialist",
  summary:
    "Solutions-driven Full-Stack Web Developer and Automation Engineer with a Computer Engineering foundation and specialized expertise in architecting autonomous n8n workflows, cloud databases, and high-performance web applications.",
  education: {
    degree: "Bachelor of Science in Computer Engineering",
    school: "Jose Rizal Memorial State University – Main Campus",
    period: "2019 – 2023",
  },
  skills: {
    automation: [
      "n8n Workflows",
      "Webhooks",
      "REST APIs",
      "JSON/Node.js Logic",
      "Cron Triggers",
      "Discord/Slack Alerts",
    ],
    frontend: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
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
      role: "Freelance Full-Stack Developer & Automation Engineer",
      company: "Self-Employed",
      period: "Sept 2025 – Present",
      type: "Freelance",
      description: [
        "Architected and deployed 5+ production web applications using Next.js, React, and Tailwind CSS.",
        "Built autonomous n8n workflows connecting Appwrite databases, contact webhooks, and multi-channel notifications.",
        "Delivered performant edge deployments on Vercel with optimized assets and sub-second response times.",
      ],
      skills: ["Next.js", "TypeScript", "n8n", "Appwrite", "Tailwind CSS"],
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