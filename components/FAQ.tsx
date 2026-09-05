"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { FAQS } from "@/data/portfolioData";
import ScrollFloat from "@/components/ScrollFloat";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
            <HelpCircle className="h-3.5 w-3.5 text-coral" />
            FAQ
          </p>
          <ScrollFloat
            text="Questions, answered"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          />
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary">
            The things clients usually ask before hiring. If yours isn&apos;t here,
            just reach out.
          </p>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={faq.question}
                  className={cn(
                    "overflow-hidden rounded-xl border bg-surface transition-colors duration-300",
                    isOpen ? "border-accent/30" : "border-white/[0.08] hover:border-white/20"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-ink sm:text-base">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "shrink-0",
                        isOpen ? "text-accent" : "text-ink-muted"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink-secondary">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}