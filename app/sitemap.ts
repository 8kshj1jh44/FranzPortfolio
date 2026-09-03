import type { MetadataRoute } from "next";
import { WEB_PROJECTS, AUTOMATION_WORKFLOWS } from "@/data/portfolioData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://franz-portfolio-psi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = WEB_PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const automations = AUTOMATION_WORKFLOWS.map((automation) => ({
    url: `${SITE_URL}/automations/${automation.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects,
    ...automations,
  ];
}