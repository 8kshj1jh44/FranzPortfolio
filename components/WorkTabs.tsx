"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutGrid, Workflow, User } from "lucide-react";
import WebProjects from "@/components/WebProjects";
import AutomationShowcase from "@/components/AutomationShowcase";
import ExperienceSection from "@/components/ExperienceSection";

import { WEB_PROJECTS, AUTOMATION_WORKFLOWS } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

type TabKey = "projects" | "automations" | "experience";

const TABS: Array<{
  key: TabKey;
  label: string;
  hash: string;
  icon: typeof LayoutGrid;
}> = [
  { key: "projects", label: "Web Projects", hash: "#projects", icon: LayoutGrid },
  { key: "automations", label: "Automations", hash: "#automations", icon: Workflow },
  { key: "experience", label: "Experience", hash: "#experience", icon: User },
];

const PANELS: Record<TabKey, React.ReactNode> = {
  projects: <WebProjects projects={WEB_PROJECTS} />,
  automations: <AutomationShowcase automations={AUTOMATION_WORKFLOWS} />,
  experience: <ExperienceSection />,
};

function tabFromHash(): TabKey {
  const hash = window.location.hash;
  if (hash === "#automations") return "automations";
  if (hash === "#experience") return "experience";
  return "projects";
}

export default function WorkTabs() {
  const [active, setActive] = useState<TabKey>(() =>
    typeof window === "undefined" ? "projects" : tabFromHash()
  );
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onHashChange = () => setActive(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <section id="work" className="relative scroll-mt-20 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            const Icon = tab.icon;
            return (
              <a
                key={tab.key}
                href={tab.hash}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all active:scale-[0.98]",
                  isActive
                    ? "border-coral/40 bg-coral/10 text-coral"
                    : "border-white/10 bg-surface text-ink-secondary hover:border-white/20 hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </a>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {PANELS[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}