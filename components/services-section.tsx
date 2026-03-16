import { services } from "@/data/site-content";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Professional property services built for owners, buyers, and investors"
          description="A focused service mix designed to help clients inspect, improve, acquire, and position residential properties with confidence."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30"
            >
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}