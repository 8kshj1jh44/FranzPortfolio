"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, MessageSquareQuote, Workflow } from "lucide-react";
import { TESTIMONIALS, type TestimonialNiche } from "@/data/portfolioData";
import ScrollFloat from "@/components/ScrollFloat";
import { cn } from "@/lib/utils";

const NICHES: Array<{
  key: TestimonialNiche;
  label: string;
  icon: typeof Workflow;
}> = [
  { key: "Web Development", label: "Web Development", icon: MessageSquareQuote },
  { key: "Automation", label: "Automation", icon: Workflow },
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

function initialsOf(name: string): string {
  return name
    .replace(/\b(Mr\.|Ms\.|Dr\.)\s+/gi, "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                <Quote className="h-3.5 w-3.5 text-coral" />
                Testimonials
              </p>
              <ScrollFloat
                text="Client Testimonials"
                className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              />
              <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary">
                What clients say after working together across my two niches.
              </p>
            </div>
          </div>
        </Reveal>

        {NICHES.filter((niche) =>
          TESTIMONIALS.some((t) => t.niche === niche.key)
        ).map((niche) => {
          const items = TESTIMONIALS.filter((t) => t.niche === niche.key);
          const Icon = niche.icon;
          return (
            <div key={niche.key} className="mt-16">
              <Reveal>
                <h3 className="flex w-full items-center justify-center gap-2 text-center text-xl font-semibold tracking-tight text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-surface text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  {niche.label}
                </h3>
              </Reveal>
              <div className="mt-8 mx-auto flex max-w-3xl flex-wrap justify-center gap-6">
                {items.map((item, index) => (
                  <Reveal key={item.name} delay={index * 0.06} className="w-full sm:w-[calc(50%-0.75rem)]">
                    <figure className="group flex h-full flex-col rounded-card border border-white/[0.08] bg-surface p-6 transition-colors duration-300 hover:border-accent/30">
                      <Quote className="h-6 w-6 text-accent/40" />
                      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-secondary">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            niche.key === "Web Development"
                              ? "bg-accent/10 text-accent"
                              : "bg-coral/10 text-coral"
                          )}
                        >
                          {item.initials || initialsOf(item.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">
                            {item.name}
                          </p>
                          <p className="truncate text-xs text-ink-muted">
                            {item.role}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
