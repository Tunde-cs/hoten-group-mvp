import { currentProperties } from "@/data/site-content";
import { SectionHeading } from "./section-heading";

export function PropertiesSection() {
  return (
    <section id="properties" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Current Properties"
          title="Featured properties and active opportunities"
          description="Use this section to highlight current listings, investment opportunities, or properties under evaluation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {currentProperties.map((property) => (
            <article
              key={property.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/30"
            >
              <div className="mb-5 h-48 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900" />
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">{property.title}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-stone-300">
                  {property.status}
                </span>
              </div>
              <p className="mt-4 text-lg font-medium text-amber-400">{property.price}</p>
              <p className="mt-2 text-sm text-stone-300">{property.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}