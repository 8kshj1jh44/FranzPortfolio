"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers, Zap, RefreshCcw, Check, Sparkles } from "lucide-react";
import { SERVICES, type Service } from "@/data/portfolioData";
import ScrollFloat from "@/components/ScrollFloat";

const SERVICE_ICONS: Record<Service["id"], typeof Layers> = {
  web: Layers,
  automation: Zap,
  fullstack: RefreshCcw,
};

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

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
            <Sparkles className="h-3.5 w-3.5 text-coral" />
            Services
          </p>
          <ScrollFloat
            text="What I can build for you"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary">
            Every offer is scoped around your goals — no one-size-fits-all
            packages. Let&apos;s talk about what you need on a free discovery call.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id];
            return (
              <Reveal key={service.id} delay={index * 0.06} className="h-full">
                <div className="group flex h-full flex-col rounded-card border border-white/[0.08] bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface-2">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-white/10 bg-surface-2 px-3 py-1 font-mono text-[11px] text-ink-secondary">
                      {service.tagline}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink-secondary"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}