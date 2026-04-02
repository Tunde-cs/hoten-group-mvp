import { credibilityStats, reviewPlatforms, testimonials, trustBadges } from "@/data/site-content";
import { SectionHeading } from "./section-heading";

export function TrustSection() {
  return (
    <section id="trust" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust & Credibility"
          title="A more trusted experience for homeowners, buyers, and investors"
          description="We present our services with professionalism, responsiveness, and a client-first approach designed to inspire confidence from the first interaction."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {credibilityStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-stone-400">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-300">{stat.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-400">
              Client Testimonials
            </p>

            <div className="mt-6 grid gap-6">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-3xl border border-white/10 bg-stone-900/80 p-6"
                >
                  <div className="flex items-center gap-1 text-amber-300">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <p className="mt-4 text-base leading-8 text-stone-200">
                    “{testimonial.quote}”
                  </p>

                  <div className="mt-6">
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-stone-400">{testimonial.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-400">
                Trust Badges
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.title}
                    className="rounded-2xl border border-white/10 bg-stone-900/80 p-5"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                      {badge.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-400">
                Review Platforms
              </p>

              <div className="mt-6 space-y-4">
                {reviewPlatforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-stone-900/80 px-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-white">{platform.name}</p>
                      <p className="mt-1 text-sm text-stone-400">{platform.note}</p>
                    </div>
                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-300">
                      Placeholder
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs leading-6 text-stone-500">
                These placeholders can later be replaced with real review links, ratings, badges,
                and verified client feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}