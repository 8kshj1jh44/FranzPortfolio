import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export type SocialKey = "github" | "linkedin" | "upwork" | "facebook" | "email";

export interface SocialItem {
  key: SocialKey;
  label: string;
  href: string;
  external: boolean;
}

export const SOCIAL_ITEMS: SocialItem[] = [
  { key: "github", label: "GitHub", href: SOCIAL_LINKS.github, external: true },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    external: true,
  },
  { key: "upwork", label: "Upwork", href: SOCIAL_LINKS.upwork, external: true },
  {
    key: "facebook",
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    external: true,
  },
  { key: "email", label: "Email", href: SOCIAL_LINKS.email, external: false },
];

export function SocialGlyph({
  kind,
  className = "h-4 w-4",
}: {
  kind: SocialKey;
  className?: string;
}) {
  switch (kind) {
    case "github":
      return <GitHubLogoIcon className={className} />;
    case "linkedin":
      return <LinkedInLogoIcon className={className} />;
    case "facebook":
      return (
        <span
          className={cn("font-mono text-xs font-bold tracking-tight", className)}
        >
          f
        </span>
      );
    case "email":
      return <Mail className={className} />;
    case "upwork":
      return (
        <span
          className={cn("font-mono text-xs font-bold tracking-tight", className)}
        >
          Up
        </span>
      );
  }
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}