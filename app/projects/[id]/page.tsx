import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Check, ArrowUpRight } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { WEB_PROJECTS } from "@/data/portfolioData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://franz-portfolio-psi.vercel.app";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return WEB_PROJECTS.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = WEB_PROJECTS.find((p) => p.id === params.id);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      url: `/projects/${project.id}`,
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = WEB_PROJECTS.find((p) => p.id === params.id);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Web Projects",
        item: `${SITE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/projects/${project.id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-ink-secondary transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full border border-white/10 bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-secondary">
              {project.category}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              {project.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
            >
              <ExternalLink className="h-4 w-4" /> Live Site
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-white/20 active:scale-[0.98]"
            >
              <GitHubLogoIcon className="h-4 w-4" /> Source
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-ink-secondary">
          {project.description}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-3 rounded-card border border-white/[0.08] bg-surface p-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center justify-center gap-1 rounded-lg border border-white/[0.06] bg-background/50 px-4 py-5 text-center"
              >
                <span className="text-2xl font-semibold tracking-tight text-ink">
                  {metric.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-card border border-white/[0.08] bg-surface">
          {project.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/[0.06]">
              <img
                src={project.image}
                alt={`${project.title} live site screenshot`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}
          <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                Tech Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.07] bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                Highlights
              </h2>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-ink-secondary"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
          <p className="text-sm text-ink-muted">
            Want something similar? Let&apos;s build your next project together.
          </p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </main>
  );
}