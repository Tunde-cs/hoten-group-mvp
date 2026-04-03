import { portfolioProjects } from "@/data/site-content";
import { SectionHeading } from "./section-heading";
import { ProjectSliderCard } from "@/components/project-slider-card";

export function PortfolioSection() {
  return (
    <section id="projects" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected project types and portfolio highlights"
          
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolioProjects.map((project) =>
            project.images?.length ? (
                <ProjectSliderCard
                key={project.title}
                category={project.category}
                title={project.title}
                description={project.description}
                images={project.images}
                />
            ) : (
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
            )
            )}
        </div>
      </div>
    </section>
  );
}