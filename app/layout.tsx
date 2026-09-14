import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import VisitTracker from "@/components/VisitTracker";
import { FAQS } from "@/data/portfolioData";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://franz-portfolio-psi.vercel.app";

const TITLE =
  "Franz Lyster — Full-Stack Developer & n8n Automation Specialist";
const DESCRIPTION =
  "Portfolio of Franz Lyster Tagalogon: production-ready full-stack web applications and end-to-end n8n automation pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Franz Lyster",
  },
  description: DESCRIPTION,
  keywords: [
    "full-stack developer",
    "n8n",
    "automation",
    "webhooks",
    "AI",
    "Next.js",
    "freelance",
    "portfolio",
  ],
  authors: [{ name: "Franz Lyster Tagalogon", url: `${SITE_URL}` }],
  creator: "Franz Lyster Tagalogon",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Franz Lyster",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Franz Lyster Tagalogon",
  url: SITE_URL,
  jobTitle: "Full-Stack Developer & Automation Engineer",
  description: DESCRIPTION,
  sameAs: [
    "https://github.com/8kshj1jh44",
    "https://www.linkedin.com/in/franz-lyster-tagalogon-2b7283217/",
    "https://www.upwork.com/freelancers/~01b4e057e37d32e9fd",
    "https://www.facebook.com/tagalogonXD/",
  ],
  knowsAbout: ["Web Development", "n8n Automation", "AI Pipelines", "Next.js"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QTY3RTVPK1"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-QTY3RTVPK1');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
        <VisitTracker />
      </body>
    </html>
  );
}
