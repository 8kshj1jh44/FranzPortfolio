"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Download, FileText, ChevronDown } from "lucide-react";
import { RESUME_PATH } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export default function CVButton({
  variant = "full",
  label = "Check My CV",
  className,
}: {
  variant?: "full" | "compact";
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98]",
          variant === "full"
            ? "rounded-xl border border-white/10 bg-surface px-6 py-3.5 text-ink hover:border-accent/50 hover:bg-surface-2"
            : "h-9 w-9 justify-center border border-white/10 bg-surface text-ink-secondary hover:border-accent/40 hover:text-accent"
        )}
      >
        {variant === "full" && <FileText className="h-4 w-4 text-accent" />}
        {variant === "compact" && <FileText className="h-4 w-4" />}
        {variant === "full" && (
          <>
            <span>{label}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-ink-muted transition-transform",
                open && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      <div
        role="menu"
        className={cn(
          "absolute z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-200",
          variant === "full"
            ? "left-1/2 w-48 -translate-x-1/2"
            : "right-0 w-44",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <a
          role="menuitem"
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 px-4 py-3 text-sm text-ink transition-colors hover:bg-white/[0.05]"
        >
          <Eye className="h-4 w-4 text-coral" />
          View CV
        </a>
        <a
          role="menuitem"
          href={RESUME_PATH}
          download="Franz_Lyster_Tagalogon_CV.pdf"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 border-t border-white/[0.06] px-4 py-3 text-sm text-ink transition-colors hover:bg-white/[0.05]"
        >
          <Download className="h-4 w-4 text-accent" />
          Download CV
        </a>
      </div>
    </div>
  );
}