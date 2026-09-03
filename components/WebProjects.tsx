"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ExternalLink, ArrowUpRight, Lock } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { type WebProject } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import ScrollFloat from "@/components/ScrollFloat";

const THUMB_TONES: Record<number, string> = {
  0: "from-accent/35 via-accent/10 to-transparent",
  1: "from-coral/30 via-coral/10 to-transparent",
  2: "from-emerald-500/25 via-emerald-500/5 to-transparent",
  3: "from-violet-500/25 via-violet-500/5 to-transparent",
};

function hostnameOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

function MockupFrame({ project, index }: { project: WebProject; index: number }) {
  const [failed, setFailed] = useState(false);
  const showImage = !!project.image && !failed;
  const monogram = project.title.charAt(0).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-t-card border-b border-white/[0.06] bg-surface-2">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-ink-muted">
          <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400/70" />
          <span className="truncate">{hostnameOf(project.liveUrl)}</span>
        </span>
      </div>

      {showImage ? (
        <div className="relative h-44 overflow-hidden sm:h-52">
          <img
            src={project.image}
            alt={`${project.title} live site screenshot`}
            onError={() => setFailed(true)}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div
          className={cn(
            "relative flex h-44 items-end overflow-hidden bg-gradient-to-br sm:h-52",
            THUMB_TONES[index % 4]
          )}
        >
          <div className="dot-grid absolute inset-0 opacity-40" />
          <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-background/60 font-mono text-xl font-bold text-ink backdrop-blur-sm">
            {monogram}
          </div>
          <div className="relative m-4 w-full rounded-lg border border-white/10 bg-background/80 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="h-2 w-20 rounded-full bg-white/25" />
              <span className="h-2 w-8 rounded-full bg-white/10" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-1.5">
                <span className="block h-1.5 w-full rounded-full bg-white/15" />
                <span className="block h-1.5 w-4/5 rounded-full bg-white/10" />
                <span className="block h-1.5 w-3/5 rounded-full bg-white/[0.07]" />
              </div>
              <div className="h-10 rounded-md bg-white/[0.06]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: WebProject; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface transition-colors duration-300 hover:border-accent/40"
    >
      <MockupFrame project={project} index={index} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full border border-white/10 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-secondary">
              {project.category}
            </span>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
              {project.title}
            </h3>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live site`}
            className="rounded-lg border border-white/10 p-2 text-ink-secondary transition-all hover:border-accent/50 hover:text-accent active:scale-95"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.07] bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-ink-secondary">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3 w-3" />
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
          >
            <ExternalLink className="h-4 w-4" /> Live Site
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-white/20 active:scale-[0.98]"
          >
            <GitHubLogoIcon className="h-4 w-4" /> Source
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function WebProjects({ projects }: { projects: WebProject[] }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative">
        <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ScrollFloat
            text="Web Projects"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary">
            5+ live products in production, each built end-to-end and
            deployed to Vercel.
          </p>
        </div>
        <span className="shrink-0 font-mono text-sm text-ink-muted">
          5+ deployed sites
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      </div>
    </div>
  );
}