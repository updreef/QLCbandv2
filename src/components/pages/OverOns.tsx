import SquiggleUnderline from "../SquiggleUnderline";

export default function OverOns() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">OVER ONS</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            WIE WE ZIJN
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
        </div>

        {/* Two-column: photo + story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Photo */}
          <div className="relative justify-self-center lg:justify-self-start">
            <div className="absolute -inset-2 bg-brand-neon blob-about-photo border-3 border-brand-cream rotate-[2deg] -z-10" />
            <img
              src="/images/band-live.jpg"
              alt="Quarter Life Crisis live op het podium"
              className="w-full max-w-md object-cover blob-about-photo border-3 border-brand-cream hard-shadow-cyan"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Story */}
          <div className="flex flex-col gap-5 text-sm sm:text-base leading-relaxed text-brand-text-muted">
            <p>
              Het begon zoals de beste ideeën beginnen: met een biertje in de tuin. Zes mannen, midden twintig, en die ene vraag die maar bleef hangen, waarom zijn we eigenlijk gestopt met muziek maken?
            </p>
            <p>
              Want dat was het ding. We deden het allemaal vroeger. Gitaren, drums, keyboards. Het zat er altijd al in. Maar ergens tussen studeren, werken en "volwassen worden" waren we het kwijtgeraakt. Tot die ene koude winteravond. Eén biertje werd er vijf, en voor we het wisten hadden we een bandnaam, een groepsapp en een afspraak om te repeteren.
            </p>
            <p>
              Op onze 25e deden we wat we op onze 15e het allerliefst deden: herrie maken. En het voelde meteen weer als thuiskomen.
            </p>
            <p>
              De naam? Quarter Life Crisis. Want als je op je 25e besluit om alles opzij te zetten voor muziek, dan is dat óf een crisis, óf het beste besluit dat je ooit hebt genomen. Wij denken het tweede.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="border-2 border-brand-cream rounded-lg p-4 bg-brand-bg-2 text-center hard-shadow-amber">
                <div className="font-display text-4xl sm:text-5xl text-brand-green-light leading-none">3</div>
                <div className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest mt-2">Shows</div>
              </div>
              <div className="border-2 border-brand-cream rounded-lg p-4 bg-brand-bg-2 text-center hard-shadow-amber">
                <div className="font-display text-4xl sm:text-5xl text-brand-green-light leading-none">6</div>
                <div className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest mt-2">Leden</div>
              </div>
              <div className="border-2 border-brand-cream rounded-lg p-4 bg-brand-bg-2 text-center hard-shadow-amber">
                <div className="font-display text-4xl sm:text-5xl text-brand-green-light leading-none">1</div>
                <div className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest mt-2">Missie</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
