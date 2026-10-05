import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = "https://aurevixa.vercel.app";
const DESCRIPTION =
  "Aurevixa designs and builds custom software, websites, mobile apps, AI solutions, automation, integrations and cloud systems around how your business actually works.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aurevixa Technologies | Technology built around your business",
  description: DESCRIPTION,
  keywords: ["custom software", "AI solutions", "workflow automation", "integrations", "cloud", "web development", "mobile apps", "Philippines"],
  openGraph: {
    title: "Aurevixa Technologies",
    description: "Custom Software · AI · Automation · Integrations · Cloud. Technology built around your business.",
    url: SITE_URL,
    siteName: "Aurevixa Technologies",
    images: [{ url: "/brand/aurevixa-logo.png", width: 1448, height: 1086, alt: "Aurevixa logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurevixa Technologies",
    description: "Technology built around your business.",
    images: ["/brand/aurevixa-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#061528",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Reveal-on-scroll content stays visible when JavaScript is off */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.loader{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
