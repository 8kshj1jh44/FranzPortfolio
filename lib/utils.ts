import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

  const id = hash.replace(/^#/, "");
  const target = id ? document.getElementById(id) : null;

  // Tab sections (#projects/#automations/#experience) live inside #work
  const el = target ?? document.getElementById("work");
  el?.scrollIntoView({ behavior, block: "start" });
}

export function navigateToHash(hash: string) {
  if (typeof window === "undefined") return;
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  scrollToHash(hash);
}
