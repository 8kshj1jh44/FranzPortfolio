"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, Loader2, Mail, MapPin, CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { CTA_BANNER, PROJECT_TYPES, SOCIAL_LINKS } from "@/data/portfolioData";
import TextType from "@/components/TextType";

import { cn } from "@/lib/utils";

const INITIAL_STATE: ContactFormState = { success: false, message: "" };

interface Toast {
  id: number;
  success: boolean;
  message: string;
}

export default function Contact() {
  const [state, formAction, pending] = useFormState(
    submitContactForm,
    INITIAL_STATE
  );
  const [toast, setToast] = useState<Toast | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!state.message) return;
    const id = Date.now();
    setToast({ id, success: state.success, message: state.message });
    const timeout = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4500);
    return () => clearTimeout(timeout);
  }, [state.message, state.success]);

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface-2 px-3.5 py-3 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <section id="contact" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <TextType
              as="h2"
              text={["Let's build something"]}
              loop={false}
              startOnVisible
              className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
            <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-ink-secondary">
              Tell me about the product, the workflow, or the problem you&apos;re
              trying to automate. I&apos;ll reply within one business day.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {CTA_BANNER.guarantees.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-ink-muted"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-4">
              <a
                href={SOCIAL_LINKS.email}
                className="flex items-center gap-3 text-sm text-ink-secondary transition-colors hover:text-ink"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-accent">
                  <Mail className="h-4 w-4" />
                </span>
                franzlyster@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-ink-secondary">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-coral">
                  <MapPin className="h-4 w-4" />
                </span>
                Remote · Worldwide
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-ink-secondary transition-all hover:border-coral/40 hover:bg-surface-2"
            >
              <span className="font-mono text-xs font-bold text-coral">Up</span>
              <span>
                Prefer Upwork?{" "}
                <span className="font-medium text-ink underline decoration-coral/50 underline-offset-2">
                  Hire me directly on Upwork
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <form
            action={formAction}
            className="rounded-card border border-white/[0.08] bg-surface p-6 sm:p-8"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-ink"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label
                htmlFor="projectType"
                className="block text-sm font-medium text-ink"
              >
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                defaultValue={PROJECT_TYPES[0]}
                className={cn(inputClass, "appearance-none")}
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-surface">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="A few details about your project or automation…"
                className={cn(inputClass, "resize-none")}
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="glass fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-xl border border-white/10 p-4 shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
          >
            <span
              className={cn(
                "mt-0.5 shrink-0",
                toast.success ? "text-emerald-400" : "text-coral"
              )}
            >
              {toast.success ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </span>
            <p className="text-sm text-ink">{toast.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
              className="ml-auto shrink-0 rounded-md p-1 text-ink-muted transition-colors hover:text-ink"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}