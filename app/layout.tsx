import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-brand",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hotengroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hoten Group | Home Inspections, Real Estate, Renovations",
    template: "%s | Hoten Group",
  },
  description:
    "Hoten Group provides home inspections, real estate support, renovations, and property solutions for homeowners, buyers, sellers, and investors in the Atlanta area.",
  keywords: [
    "Hoten Group",
    "home inspections",
    "home inspector Atlanta",
    "Atlanta home inspections",
    "property inspections",
    "real estate support",
    "renovations",
    "investment property services",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hoten Group | Home Inspections, Real Estate, Renovations",
    description:
      "Professional home inspections, real estate support, renovations, and property solutions in the Atlanta area.",
    url: siteUrl,
    siteName: "Hoten Group",
    type: "website",
    
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoten Group | Home Inspections, Real Estate, Renovations",
    description:
      "Professional home inspections, real estate support, renovations, and property solutions in the Atlanta area.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cinzel.variable} bg-stone-950 text-stone-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}