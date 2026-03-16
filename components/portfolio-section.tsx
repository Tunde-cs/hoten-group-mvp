import { portfolioProjects } from "@/data/site-content";
import { SectionHeading } from "./section-heading";

export function PortfolioSection() {
  return (
    <section id="projects" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected project types and portfolio highlights"
          description="Showcase renovation work, investment projects, or completed builds here. Replace placeholder content with real project photos and details later."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="h-56 bg-gradient-to-br from-stone-800 to-stone-900" />
              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-amber-400">
                  {project.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}