import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import localFont from "next/font/local";

import { Header } from "~/components/header";
import { JsonLd } from "~/components/json-ld";
import { MotionProvider } from "~/components/motion-provider";
import { env } from "~/env";
import { site } from "~/data/site";
import { TRPCReactProvider } from "~/trpc/react";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

/** Static ExtraBold cut: clean contours, so the outlined first name has no inner overlap lines. */
const display = localFont({
  src: "../fonts/Manrope-ExtraBold.woff2",
  variable: "--font-manrope-800",
  display: "swap",
  weight: "800",
});

const siteUrl = env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${site.name} is a full-stack developer in Hyderabad building fast, type-safe web apps and AI-powered products with Next.js, TypeScript, tRPC and PostgreSQL.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.shortName} | ${site.role}`,
    template: `%s | ${site.shortName}`,
  },
  description,
  applicationName: `${site.shortName} portfolio`,
  authors: [{ name: site.name }],
  keywords: [
    "Sampath Yadav Gundaram",
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "tRPC",
    "PostgreSQL",
    "AI chatbot",
    "Hyderabad",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.shortName} portfolio`,
    title: `${site.shortName} | ${site.role}`,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} | ${site.role}`,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#a3a3a3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${display.variable}`}>
      <body>
        {/* Scroll reveals start hidden; keep everything visible without JavaScript. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="sky" aria-hidden />
        <JsonLd />
        <TRPCReactProvider>
          <MotionProvider>
            <Header />
            <main
              id="main"
              className="mx-auto flex w-full max-w-[1480px] flex-col gap-4 p-3 pt-3 sm:gap-6 sm:p-5 lg:p-7"
            >
              {children}
            </main>
          </MotionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
