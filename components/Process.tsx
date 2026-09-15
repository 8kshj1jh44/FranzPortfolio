"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Workflow } from "lucide-react";
import { PROCESS_STEPS } from "@/data/portfolioData";
import ScrollFloat from "@/components/ScrollFloat";

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

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
            <Workflow className="h-3.5 w-3.5 text-coral" />
            How I work
          </p>
          <ScrollFloat
            text="A simple, no-surprises process"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />
          <ScrollFloat
            as="p"
            text="Four clear steps from first call to launch — you always know what's happening and what comes next."
            className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary"
            stagger={0.015}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.06} className="h-full">
              <div className="group relative h-full rounded-card border border-white/[0.08] bg-surface p-6 transition-all duration-300 hover:border-accent/30">
                <span
                  className="pointer-events-none absolute right-5 top-4 font-mono text-5xl font-semibold tracking-tight text-white/[0.05] transition-colors duration-300 group-hover:text-accent/10"
                  aria-hidden
                >
                  {item.step}
                </span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}