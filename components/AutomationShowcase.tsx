"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Webhook,
  Database,
  Sparkles,
  FileText,
  Bell,
  Code2,
  Mail,
  ChevronDown,
  Braces,
  Zap,
  Workflow,
  CalendarClock,
  Table,
  type LucideIcon,
} from "lucide-react";
import { type AutomationWorkflow } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "AI/LLM", value: "AI/LLM" },
  { label: "CRM & Ops", value: "CRM & Ops" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

function nodeIconFor(label: string): LucideIcon {
  const text = label.toLowerCase();
  if (/trigger|webhook|chat trigger/.test(text)) return Webhook;
  if (/calendar|event|appointment|schedule|availability/.test(text))
    return CalendarClock;
  if (/sheet|spreadsheet|table|append|row/.test(text)) return Table;
  if (/mail|email|send|gmail/.test(text)) return Mail;
  if (/ai|llm|gpt|gemini|agent|assistant/.test(text)) return Sparkles;
  if (/alert|discord|slack|telegram|notif/.test(text)) return Bell;
  if (/db|database|storage|appwrite|supabase|backup|cloud/.test(text))
    return Database;
  if (/parse|json|code|script|extract|transform|validate/.test(text))
    return Code2;
  if (/export|publish|cms|draft|file|doc/.test(text)) return FileText;
  return Workflow;
}

function FlowDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {nodes.map((label, i) => {
        const Icon = nodeIconFor(label);
        return (
          <div key={label} className="flex items-center">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] text-ink-secondary">
              <Icon className="h-3.5 w-3.5 text-accent" />
              {label}
            </span>
            {i < nodes.length - 1 && (
              <span className="mx-1.5 text-ink-muted">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WorkflowCard({ automation }: { automation: AutomationWorkflow }) {
  const [open, setOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface transition-colors hover:border-coral/30"
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-coral/25 bg-coral/10 px-3 py-1 font-mono text-[11px] text-coral">
            <Zap className="h-3 w-3" />
            {automation.trigger}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-ink">
            {automation.metricBadge}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
          {automation.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
          {automation.description}
        </p>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-background/50 p-3.5">
          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Pipeline
          </p>
          <FlowDiagram nodes={automation.flowNodes} />
        </div>

        {automation.screenshot && (
          <button
            type="button"
            onClick={() => setShowImage((v) => !v)}
            aria-expanded={showImage}
            className="mt-4 inline-flex items-center justify-between rounded-lg border border-white/[0.08] bg-surface-2 px-3.5 py-2.5 text-left text-sm text-ink-secondary transition-colors hover:border-coral/30 hover:text-ink"
          >
            <span className="inline-flex items-center gap-2">
              <Workflow className="h-4 w-4 text-coral" />
              View workflow
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                showImage && "rotate-180"
              )}
            />
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center justify-between rounded-lg border border-white/[0.08] bg-surface-2 px-3.5 py-2.5 text-left text-sm text-ink-secondary transition-colors hover:border-white/20 hover:text-ink"
        >
          <span className="inline-flex items-center gap-2">
            <Braces className="h-4 w-4 text-coral" />
            Inspect sample payload
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-background"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-2 font-mono text-[10px] text-ink-muted">
                payload.json
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-emerald-300/90">
              {automation.samplePayload}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {showImage && automation.screenshot && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-background"
          >
            <div className="relative aspect-[16/10] w-full bg-background">
              <Image
                src={automation.screenshot}
                alt={`${automation.title} workflow`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function AutomationShowcase({
  automations,
}: {
  automations: AutomationWorkflow[];
}) {
  const [filter, setFilter] = useState<FilterValue>("All");
  const reduceMotion = useReducedMotion();

  const visible =
    filter === "All"
      ? automations
      : automations.filter((a) => a.category === filter);

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Automation Workflows
          </h2>
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-secondary">
            Event-driven n8n pipelines that connect webhooks, AI, and Appwrite
            to move work without a human in the loop.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-[0.98]",
                filter === f.value
                  ? "border-coral/40 bg-coral/10 text-coral"
                  : "border-white/10 bg-surface text-ink-secondary hover:border-white/20 hover:text-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout={!reduceMotion} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((automation) => (
              <WorkflowCard key={automation.id} automation={automation} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}