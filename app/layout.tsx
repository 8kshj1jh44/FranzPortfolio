import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import VisitTracker from "@/components/VisitTracker";
import { FAQS, SERVICES, SOCIAL_LINKS } from "@/data/portfolioData";
import { RESUME_DATA } from "@/data/resumeData";
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
  "Franz Lyster — GHL Automation Specialist & Full-Stack Web Developer";
const DESCRIPTION =
  "Portfolio of Franz Lyster Tagalogon: GoHighLevel (GHL) automation — speed-to-lead, appointment confirmations, reactivation — plus n8n AI pipelines and full-stack Next.js & WordPress development.";

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
    "freelance web developer",
    "n8n developer",
    "n8n expert",
    "AI chatbot developer",
    "workflow automation",
    "Next.js developer",
    "WordPress developer",
    "WordPress expert",
    "PHP",
    "AI automation",
    "GoHighLevel",
    "GHL automation specialist",
    "GHL expert",
    "speed-to-lead",
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
  verification: {
    google: "BkiaObjE9k4RPifMjXffR-v-eDwXZ_HF3kBYdgMF2fo",
    other: {
      "msvalidate.01": "09924E29D29ED1C1C1D5506201BD7A5A",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Franz Lyster Tagalogon",
      alternateName: ["Franz Lyster L. Tagalogon", "Franz Lyster"],
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      email: "mailto:franzlyster@gmail.com",
      jobTitle: "GoHighLevel (GHL) Automation Specialist & Full-Stack Web Developer",
      description: RESUME_DATA.summary,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: RESUME_DATA.education.school,
      },
      hasCredential: RESUME_DATA.certifications.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: cert.name,
        recognizedBy: { "@type": "Organization", name: cert.issuer },
      })),
      sameAs: Object.values(SOCIAL_LINKS).filter((link) =>
        link.startsWith("https://"),
      ),
      knowsAbout: [
        "GoHighLevel (GHL)",
        "GHL Workflows",
        "Speed-to-Lead Automation",
        "Full-Stack Web Development",
        "WordPress",
        "PHP",
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "E-Commerce Development",
        "n8n Automation",
        "AI Automation",
        "Appointment Confirmation Automation",
        "Lead Reactivation",
        "Workflow Automation",
        "AI Chatbots",
        "AI Agents",
        "Webhooks",
        "REST APIs",
        "Appwrite",
        "Supabase",
        "CRM Automation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Franz Lyster — GHL Automation & Full-Stack Web Development",
      url: SITE_URL,
      description: DESCRIPTION,
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: "Worldwide",
      availableLanguage: "English",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Franz Lyster",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
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
