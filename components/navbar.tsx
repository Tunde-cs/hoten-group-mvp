import { LogoMark } from "./logo-mark";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Properties", href: "#properties" },
  { label: "Inspections", href: "#inspection" },
  { label: "Sell Your Home", href: "#sell" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="group flex items-center gap-4">
          <LogoMark />

          <div className="flex flex-col leading-none">
            <div className="flex items-end gap-2">
              <span className="font-brand text-[1.7rem] font-semibold uppercase tracking-[0.16em] text-white transition group-hover:text-amber-300">
                Hoten
              </span>
              <span className="pb-[0.32rem] text-[0.62rem] font-medium uppercase tracking-[0.42em] text-stone-400">
                Group
              </span>
              <span className="mb-[0.18rem] rounded-sm border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-amber-300">
                LLC
              </span>
            </div>

            <span className="mt-1 text-[0.58rem] uppercase tracking-[0.5em] text-stone-500">
              Property • Inspection • Renovation
            </span>
          </div>
        </a>

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-stone-300 transition hover:text-amber-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#inspection"
          className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
        >
          Book Inspection
        </a>
      </div>
    </header>
  );
}