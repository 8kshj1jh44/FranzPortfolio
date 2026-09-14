import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Zap, Download, Braces, ArrowUpRight } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { AUTOMATION_WORKFLOWS } from "@/data/portfolioData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://franz-portfolio-psi.vercel.app";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return AUTOMATION_WORKFLOWS.map((automation) => ({ id: automation.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const automation = AUTOMATION_WORKFLOWS.find((a) => a.id === params.id);
  if (!automation) return {};
  return {
    title: `${automation.title} — Automation Case Study`,
    description: automation.description,
    alternates: { canonical: `/automations/${automation.id}` },
    openGraph: {
      title: `${automation.title} — Automation Case Study`,
      description: automation.description,
      url: `/automations/${automation.id}`,
    },
  };
}

function FlowDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {nodes.map((label, i) => (
        <div key={label} className="flex items-center">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] text-ink-secondary">
            {label}
          </span>
          {i < nodes.length - 1 && (
            <span className="mx-1.5 text-ink-muted">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AutomationDetailPage({ params }: Props) {
  const automation = AUTOMATION_WORKFLOWS.find((a) => a.id === params.id);
  if (!automation) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Automations",
        item: `${SITE_URL}/#automations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: automation.title,
        item: `${SITE_URL}/automations/${automation.id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link
          href="/#automations"
          className="inline-flex items-center gap-2 font-mono text-sm text-ink-secondary transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to automations
        </Link>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-coral/25 bg-coral/10 px-3 py-1 font-mono text-[11px] text-coral">
                <Zap className="h-3 w-3" />
                {automation.trigger}
              </span>
              <span className="rounded-full border border-white/10 bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-secondary">
                {automation.category}
              </span>
              <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-ink">
                {automation.metricBadge}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              {automation.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {automation.githubUrl && (
              <a
                href={automation.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-white/20 active:scale-[0.98]"
              >
                <GitHubLogoIcon className="h-4 w-4" /> View on GitHub
              </a>
            )}
            {automation.workflowFile && (
              <a
                href={automation.workflowFile}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
              >
                <Download className="h-4 w-4" /> Download workflow
              </a>
            )}
          </div>
        </div>

        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-ink-secondary">
          {automation.description}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {automation.screenshot && (
              <div className="overflow-hidden rounded-card border border-white/[0.08] bg-surface">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={automation.screenshot}
                    alt={`${automation.title} workflow screenshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            <div className="rounded-card border border-white/[0.08] bg-surface p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                Pipeline
              </h2>
              <div className="mt-4">
                <FlowDiagram nodes={automation.flowNodes} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-card border border-white/[0.08] bg-surface">
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-2.5">
                <Braces className="h-4 w-4 text-coral" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Sample payload
                </span>
              </div>
              <pre className="max-h-[480px] overflow-auto p-5 font-mono text-xs leading-relaxed text-emerald-300/90">
                {automation.samplePayload}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
          <p className="text-sm text-ink-muted">
            Need a workflow like this? Let&apos;s automate your operations.
          </p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
          >
            Automate with me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </main>
  );
}