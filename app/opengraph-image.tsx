import { buildSocialImage, OG_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const alt =
  "Franz Lyster — Full-Stack Web Developer, WordPress & AI Automation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return buildSocialImage();
}