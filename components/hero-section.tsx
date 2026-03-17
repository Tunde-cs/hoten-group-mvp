export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(255,255,255,0.06),transparent_25%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,10,9,0.55),rgba(12,10,9,0.9))]" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">
            Home Inspections • Real Estate Support • New Construction • Renovations
          </p>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Home inspections, property solutions, and renovations in Atlanta and Georgia.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-300">
            Hoten Group helps homeowners, buyers, sellers, and investors in the
            Atlanta area with professional home inspections, property guidance,
            renovations, and real estate support.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#inspection"
              className="rounded-full bg-amber-400 px-7 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Schedule an Inspection
            </a>
            <a
              href="#sell"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Sell Your Property
            </a>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="text-2xl font-semibold text-white">6+</p>
              <p className="mt-2 text-sm text-stone-300">Core service areas</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="text-2xl font-semibold text-white">Fast</p>
              <p className="mt-2 text-sm text-stone-300">Seller response flow</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="text-2xl font-semibold text-white">Clear</p>
              <p className="mt-2 text-sm text-stone-300">Inspection scheduling</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="grid gap-4">
              <div className="h-[420px] rounded-[1.5rem] bg-[linear-gradient(135deg,#2c241f_0%,#171412_45%,#0c0a09_100%)] p-6">
                <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_30%)] p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-300">
                      Featured Service
                    </span>
                    <span className="text-sm text-stone-400">Atlanta Area</span>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
                      Service Focus
                    </p>
                    <h3 className="mt-3 text-4xl font-semibold text-white">
                      Inspections
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-stone-300">
                      Clean, modern booking experience for homeowners, buyers,
                      and investors who need fast property insight.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-stone-400">Property Strategy</p>
                      <p className="mt-2 text-xl font-semibold text-white">
                        Buy • Build • Renovate
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-stone-400">Client Experience</p>
                      <p className="mt-2 text-xl font-semibold text-white">
                        Premium & Clear
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}