import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" aria-hidden />
      <p className="font-mono text-7xl font-bold tracking-tight text-ink sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        This page drifted off the grid
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-ink-secondary">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get
        you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
        >
          <Home className="h-4 w-4" />
          Back home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-white/20 active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          View projects
        </Link>
      </div>
    </main>
  );
}