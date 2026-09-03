"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SOCIAL_ITEMS, SocialGlyph } from "@/components/socials";
import CVButton from "@/components/CVButton";
import { cn, navigateToHash } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Automations", href: "#automations" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  navigateToHash(href);
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            navigateToHash("#top");
          }}
          className="group flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-coral font-mono text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            FL
          </span>
          <span className="font-mono text-sm tracking-tight text-ink">
            franz<span className="text-accent">.</span>dev
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-lg px-3 py-2 text-sm text-ink-secondary transition-colors hover:bg-white/[0.05] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {["github", "linkedin"].map((key) => {
            const social = SOCIAL_ITEMS.find((s) => s.key === key);
            if (!social) return null;
            return (
              <a
                key={key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface text-ink-secondary transition-all hover:border-accent/40 hover:text-accent active:scale-95"
              >
                <SocialGlyph kind={key as "github" | "linkedin"} />
              </a>
            );
          })}
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1.5 text-xs text-ink-secondary lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono">Available for builds</span>
          </span>
          <CVButton variant="compact" />
          <a
            href={SOCIAL_ITEMS.find((s) => s.key === "upwork")?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
          >
            Hire on Upwork
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink transition-colors hover:bg-white/[0.05] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "glass overflow-hidden border-b border-white/[0.06] transition-all duration-300 md:hidden",
          open ? "max-h-72" : "max-h-0 border-b-0"
        )}
      >
        <div className="space-y-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setOpen(false);
                handleNavClick(e, link.href);
              }}
              className="block rounded-lg px-3 py-3 text-sm text-ink-secondary transition-colors hover:bg-white/[0.05] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <CVButton
            label="Check My CV"
            className="mt-2 flex w-full"
          />
          <a
            href={SOCIAL_ITEMS.find((s) => s.key === "upwork")?.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white"
          >
            Hire on Upwork <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
