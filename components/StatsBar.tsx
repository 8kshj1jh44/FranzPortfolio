"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROOF_STATS } from "@/data/portfolioData";

export default function StatsBar() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.06] lg:grid-cols-4"
        >
          {PROOF_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 bg-background px-6 py-8 text-center"
            >
              <span className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {stat.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}