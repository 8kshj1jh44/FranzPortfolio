import { SOCIAL_ITEMS, SocialGlyph } from "@/components/socials";

export default function Footer() {
  return (
    <footer className="hairline-top">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-coral font-mono text-sm font-bold text-white">
              FL
            </span>
            <div className="text-sm">
              <p className="font-medium text-ink">
                Franz Lyster L. Tagalogon
              </p>
              <p className="text-ink-muted">
                Full-Stack Developer &amp; Automation Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_ITEMS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-ink-secondary transition-all hover:border-accent/40 hover:text-accent active:scale-95"
              >
                <SocialGlyph kind={social.key} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Franz Lyster L. Tagalogon. All rights
            reserved.
          </p>
          <p className="font-mono">
            Built with Next.js · TypeScript · Tailwind · n8n
          </p>
        </div>
      </div>
    </footer>
  );
}