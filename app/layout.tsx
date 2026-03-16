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

export const metadata: Metadata = {
  title: "Hoten Group LLC | Home Inspections, Real Estate, Renovations",
  description:
    "Hoten Group LLC provides home inspections, direct home buying, fix-and-flip services, investment property solutions, home building, and renovations.",
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