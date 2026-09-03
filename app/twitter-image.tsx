import { buildSocialImage, OG_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const alt =
  "Franz Lyster — Full-Stack Developer & n8n Automation Specialist";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return buildSocialImage();
}