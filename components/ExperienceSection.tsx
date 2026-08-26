"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  User,
  ExternalLink,
} from "lucide-react";
import {
  RESUME_DATA,
  type CertificationItem,
  type ExperienceItem,
} from "@/data/resumeData";
import CVButton from "@/components/CVButton";
import { cn } from "@/lib/utils";

const TYPE_TONE: Record<
  ExperienceItem["type"],
  { badge: string; node: string }
> = {
  "Full-Time": { badge: "border-accent/30 bg-accent/10 text-accent", node: "bg-accent" },
  Freelance: { badge: "border-coral/30 bg-coral/10 text-coral", node: "bg-coral" },
  Contract: { badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400", node: "bg-emerald-500" },
};

const SKILL_GROUPS: Array<{
  key: keyof typeof RESUME_DATA.skills;
  label: string;
}> = [
  { key: "automation", label: "Automation" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "BaaS / Backend" },
  { key: "devopsSecurity", label: "DevOps / Security" },
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const tone = TYPE_TONE[item.type];

  return (
    <Reveal delay={index * 0.08} className="group relative pl-12 pb-12 last:pb-0 sm:pl-16">
      <span
        className={cn(
          "absolute left-[5px] top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-white/5 transition-all duration-300 group-hover:scale-125 group-hover:ring-accent/30",
          tone.node
        )}
        aria-hidden
      />
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-medium",
              tone.badge
            )}
          >
            <Briefcase className="h-3 w-3" />
            {item.type}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <Calendar className="h-3.5 w-3.5" />
            {item.period}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink sm:text-xl">
          {item.role}
        </h3>
        <p className="mt-0.5 text-sm text-ink-secondary">{item.company}</p>

        <ul className="mt-4 space-y-2">
          {item.description.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-ink-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-white/[0.07] bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function CertificationCard({ cert }: { cert: CertificationItem }) {
  return (
    <Reveal className="h-full">
      <div className="group flex h-full flex-col rounded-card border border-white/[0.08] bg-surface p-3 transition-colors duration-300 hover:border-white/20">
        <a
          href={cert.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${cert.name} certificate`}
          className="relative block h-48 w-full overflow-hidden rounded-lg border border-white/10 bg-surface-2"
        >
          <iframe
            src={cert.pdfPath}
            title={`${cert.name} certificate`}
            loading="lazy"
            className="h-full w-full bg-white"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-300 group-hover:bg-background/50">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-background/80 px-3 py-1.5 text-xs font-medium text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ExternalLink className="h-3.5 w-3.5" />
              View certificate
            </span>
          </span>
        </a>

        <div className="flex flex-1 flex-col p-2">
          <div className="mt-2 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cert.badgeColor }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {cert.issuer}
            </span>
            <span className="ml-auto font-mono text-xs text-ink-muted">
              {cert.year}
            </span>
          </div>
          <h4 className="mt-2 text-sm font-semibold leading-snug text-ink">
            {cert.name}
          </h4>
          <a
            href={cert.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent/80"
          >
            Open certificate <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function ExperienceSection() {
  const { experience, skills, certifications, education } = RESUME_DATA;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                <User className="h-3.5 w-3.5 text-coral" />
                {RESUME_DATA.name}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Experience &amp; Background
              </h2>
              <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary">
                {RESUME_DATA.summary}
              </p>
            </div>
            <CVButton label="Check My CV" />
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <h3 className="text-xl font-semibold tracking-tight text-ink">
              Career Timeline
            </h3>
          </Reveal>
          <div className="mt-8">
            <div className="relative">
              <div
                className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10"
                aria-hidden
              />
              {experience.map((item, index) => (
                <TimelineItem key={item.role} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-xl font-semibold tracking-tight text-ink">
              Skills Matrix
            </h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SKILL_GROUPS.map((group, index) => (
              <Reveal key={group.key} delay={index * 0.06}>
                <div className="h-full rounded-card border border-white/[0.08] bg-surface p-5 transition-colors duration-300 hover:border-accent/30">
                  <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills[group.key].map((skill) => (
                      <span
                        key={skill}
                        className="cursor-default rounded-lg border border-white/[0.08] bg-surface-2 px-3 py-1.5 font-mono text-xs text-ink-secondary transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-ink"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col gap-6 rounded-card border border-white/[0.08] bg-gradient-to-br from-accent/10 via-surface to-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                  Education
                </p>
                <h4 className="mt-1 text-lg font-semibold text-ink">
                  {education.degree}
                </h4>
                <p className="mt-0.5 text-sm text-ink-secondary">
                  {education.school} · {education.period}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-xl font-semibold tracking-tight text-ink">
              Certifications
            </h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <CertificationCard key={cert.name} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}