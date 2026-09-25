"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Workflow } from "lucide-react";
import BlurText from "@/components/BlurText";
import { SOCIAL_ITEMS, SocialGlyph, isExternal } from "@/components/socials";
import { navigateToHash } from "@/lib/utils";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();
    navigateToHash(hash);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[520px] translate-x-1/3 translate-y-1/3 rounded-full bg-coral/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-4xl px-5 pt-24 pb-20 text-center sm:px-8">
        <h1 className="mx-auto block max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <BlurText
            text="Full Stack Developer and AI Specialist"
            delay={0.05}
            direction="top"
            threshold={0.1}
          />
        </h1>

        <motion.p
          {...fade(0.7)}
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-ink-secondary sm:text-lg"
        >
          Shipping high-performance web applications and autonomous webhook
          pipelines.
        </motion.p>

        <motion.div
          {...fade(0.85)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="https://cal.com/franzlysert/callwfranz"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98] sm:w-auto"
          >
            Book a Free Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavigate(e, "#projects")}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-all hover:border-coral/40 hover:bg-surface-2 active:scale-[0.98] sm:w-auto"
          >
            View Web Projects
          </a>
          <a
            href="#automations"
            onClick={(e) => handleNavigate(e, "#automations")}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-all hover:border-coral/40 hover:bg-surface-2 active:scale-[0.98] sm:w-auto"
          >
            <Workflow className="h-4 w-4 text-coral" />
            Explore Automations
          </a>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          {SOCIAL_ITEMS.filter((s) =>
            ["github", "linkedin", "upwork", "facebook"].includes(s.key)
          ).map((social) => (
            <a
              key={social.key}
              href={social.href}
              {...(isExternal(social.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={social.label}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface text-ink-secondary transition-all duration-200 hover:border-accent/50 hover:text-accent hover:shadow-accent-glow active:scale-95"
            >
              <SocialGlyph kind={social.key} />
              <span
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-surface px-2.5 py-1 text-[11px] text-ink opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100"
                role="tooltip"
              >
                {social.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}