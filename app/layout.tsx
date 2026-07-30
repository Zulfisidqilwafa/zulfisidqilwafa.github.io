import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b1110",
  width: "device-width",
  initialScale: 1,
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
    title: "Zulfi Sidqil Wafa — Full-stack Developer & IT Systems",
    description:
      "Portfolio Zulfi Sidqil Wafa, Full-stack Developer dan Staff IT dengan fokus pada Golang, React, sistem, jaringan, dan pengembangan produk digital.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "/",
      title: "Zulfi Sidqil Wafa — Full-stack Developer & IT Systems",
      description:
        "Membangun produk digital dan menjaga sistem tetap andal.",
      images: [
        {
          url: "/og.png",
          alt: "Zulfi Sidqil Wafa — Full-stack Developer dan IT Systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zulfi Sidqil Wafa — Full-stack Developer & IT Systems",
      description:
        "Membangun produk digital dan menjaga sistem tetap andal.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/images/zulfi-2.png",
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
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
