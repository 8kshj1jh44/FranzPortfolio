import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://franz-portfolio-psi.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/analytics", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}