import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b1110",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zulfi Sidqil Wafa",
  url: "https://zulfisidqilwafa.github.io/",
  image: "https://zulfisidqilwafa.github.io/images/zulfi-2.png",
  jobTitle: "Full-stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "PT Polyta Global Mandiri",
    url: "https://www.polyta.id",
  },
  knowsAbout: [
    "PHP",
    "SQL",
    "Golang",
    "React",
    "JavaScript",
    "Web Development",
    "Database Design",
    "REST API",
    "System Analysis",
    "Git",
  ],
  sameAs: [
    "https://github.com/Zulfisidqilwafa",
    "https://www.instagram.com/zulfi_sidqil_wafa",
    "https://www.youtube.com/channel/UCRnHvNKlamJaEKf3JYuEDiQ",
    "https://www.tiktok.com/@zulfisidqilwafa",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "zulfisidqilwafa.github.io";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Zulfi Sidqil Wafa — Full-stack Developer",
    description:
      "Portfolio Zulfi Sidqil Wafa, Full-stack Developer dengan fokus pada PHP, SQL, Golang, React, JavaScript, database, dan aplikasi web.",
    alternates: {
      canonical: "/",
      languages: {
        id: "/?lang=id",
        en: "/?lang=en",
      },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "/",
      title: "Zulfi Sidqil Wafa — Full-stack Developer",
      description:
        "Membangun aplikasi web dari database hingga antarmuka.",
      images: [
        {
          url: "/og.png",
          alt: "Zulfi Sidqil Wafa — Full-stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zulfi Sidqil Wafa — Full-stack Developer",
      description:
        "Membangun aplikasi web dari database hingga antarmuka.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/images/favicon-right.png",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Barlow+Condensed:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" />
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </head>
      <body>{children}</body>
    </html>
  );
}
