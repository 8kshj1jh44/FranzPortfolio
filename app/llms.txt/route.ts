import {
  WEB_PROJECTS,
  AUTOMATION_WORKFLOWS,
  SERVICES,
  FAQS,
  SOCIAL_LINKS,
} from "@/data/portfolioData";
import { RESUME_DATA } from "@/data/resumeData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://franz-portfolio-psi.vercel.app";

export const dynamic = "force-static";

// Plain-text summary for AI assistants (https://llmstxt.org).
export function GET() {
  const { experience, certifications, education, skills } = RESUME_DATA;

  const lines = [
    `# ${RESUME_DATA.name}`,
    "",
    `> ${RESUME_DATA.title}. ${RESUME_DATA.summary}`,
    "",
    "Available for freelance projects: web development, e-commerce storefronts, n8n automation, AI chatbots and agents, and ongoing full-stack retainers.",
    "",
    `- Website: ${SITE_URL}`,
    `- Book a call: https://cal.com/franzlysert/callwfranz`,
    `- Email: ${SOCIAL_LINKS.email.replace("mailto:", "")}`,
    `- Upwork: ${SOCIAL_LINKS.upwork}`,
    `- LinkedIn: ${SOCIAL_LINKS.linkedin}`,
    `- GitHub: ${SOCIAL_LINKS.github}`,
    "",
    "## Services",
    "",
    ...SERVICES.map(
      (s) =>
        `- **${s.title}** — ${s.description} Includes: ${s.deliverables.join(", ")}.`,
    ),
    "",
    "## Web Projects",
    "",
    ...WEB_PROJECTS.map(
      (p) =>
        `- [${p.title}](${SITE_URL}/projects/${p.id}): ${p.category}. ${p.description} Stack: ${p.techStack.join(", ")}. Live: ${p.liveUrl}`,
    ),
    "",
    "## Automation Workflows",
    "",
    ...AUTOMATION_WORKFLOWS.map(
      (a) =>
        `- [${a.title}](${SITE_URL}/automations/${a.id}): ${a.description}`,
    ),
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) =>
        `- ${e.role}, ${e.company} (${e.period}): ${e.description.join(" ")}`,
    ),
    "",
    "## Skills",
    "",
    ...Object.entries(skills).map(
      ([group, items]) => `- ${group}: ${items.join(", ")}`,
    ),
    "",
    "## Education & Certifications",
    "",
    `- ${education.degree}, ${education.school} (${education.period})`,
    ...certifications.map((c) => `- ${c.name} — ${c.issuer} (${c.year})`),
    "",
    "## FAQ",
    "",
    ...FAQS.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
