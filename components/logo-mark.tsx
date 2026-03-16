export function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/35 bg-gradient-to-br from-amber-400/15 to-stone-900 shadow-[0_0_30px_rgba(251,191,36,0.08)]">
      <div className="absolute inset-[4px] rounded-full border border-white/8" />
      <span className="font-brand text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
        HG
      </span>
    </div>
  );
}