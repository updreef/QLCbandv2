import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 px-4 text-center min-h-screen">
      <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em] mb-3">404</p>
      <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider mb-4">
        DEZE PAGINA IS VAN HET PODIUM GEVALLEN
      </h1>
      <p className="text-brand-text-muted mb-10 text-sm sm:text-base">
        De pagina die je zoekt bestaat niet (meer). Geen paniek, de band speelt gewoon door.
      </p>
      <Link
        href="/"
        className="font-display uppercase tracking-widest text-sm px-6 py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce inline-block"
      >
        TERUG NAAR HOME
      </Link>
    </div>
  );
}
