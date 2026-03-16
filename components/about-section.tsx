import { whyChooseUs } from "@/data/site-content";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Why clients choose Hoten Group"
            description="We combine practical real estate understanding with a polished, client-friendly presentation that supports inspections, property decisions, and renovation planning."
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <ul className="space-y-4">
            {whyChooseUs.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-stone-900 px-4 py-4 text-sm leading-7 text-stone-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}