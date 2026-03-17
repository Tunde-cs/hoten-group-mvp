import { companyInfo } from "@/data/site-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hotengroup.com";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.name,
    url: siteUrl,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    description:
      "Hoten Group provides home inspections, real estate support, renovations, new construction, and property solutions for homeowners, buyers, sellers, and investors in Atlanta and surrounding Georgia communities.",
    areaServed: ["Atlanta, GA", "Surrounding Georgia communities"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Atlanta",
      addressRegion: "GA",
      addressCountry: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}