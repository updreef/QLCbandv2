import SquiggleUnderline from "../SquiggleUnderline";

export default function OverOns() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">HET VERHAAL ACHTER QLC</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            OVER ONS
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Zes mannen midden twintig, één biertje in de tuin, en de vraag die maar bleef hangen: waarom zijn we eigenlijk gestopt met muziek maken?
          </p>
        </div>

        {/* Content Story Grid */}
        <div className="flex flex-col gap-10 font-sans text-sm sm:text-base leading-relaxed text-brand-text-muted">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-8 rounded-2xl hard-shadow-red card-rotate-left">
            <div className="md:col-span-4">
              <h3 className="font-display text-3xl text-brand-amber uppercase tracking-widest">
                HET BEGIN
              </h3>
              <p className="text-xs font-mono text-brand-red mt-1">Op onze 25e</p>
            </div>
            <div className="md:col-span-8 border-l-2 border-brand-cream/10 pl-0 md:pl-6">
              <p>
                Het begon zoals de beste ideeën beginnen: met een biertje in de tuin. Zes mannen, midden twintig, en die ene vraag die maar bleef hangen, waarom zijn we eigenlijk gestopt met muziek maken?
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-4">
            <h2 className="font-display text-3xl text-brand-cream uppercase tracking-wider">
              PLAY LOUD, GROW UP LATER
            </h2>
            <p>
              Want dat was het ding. We deden het allemaal vroeger. Gitaren, drums, keyboards. Het zat er altijd al in. Maar ergens tussen studeren, werken en "volwassen worden" waren we het kwijtgeraakt. Tot die ene koude winteravond. Eén biertje werd er vijf, en voor we het wisten hadden we een bandnaam, een groepsapp en een afspraak om te repeteren.
            </p>

            <blockquote className="border-l-4 border-brand-amber pl-4 my-6 italic text-brand-text font-semibold bg-brand-bg-2/30 py-4 pr-4">
              Op onze 25e deden we wat we op onze 15e het allerliefst deden: herrie maken. En het voelde meteen weer als thuiskomen.
            </blockquote>

            <p>
              De naam? Quarter Life Crisis. Want als je op je 25e besluit om alles opzij te zetten voor muziek, dan is dat óf een crisis, óf het beste besluit dat je ooit hebt genomen. Wij denken het tweede.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="border-2 border-brand-cream p-6 bg-brand-bg-3 rounded-xl hard-shadow-cream">
              <h3 className="font-display text-xl text-brand-neon uppercase tracking-wider mb-2">DE BEZETTING</h3>
              <p className="text-xs leading-relaxed text-brand-text-muted">
                Niels op zang, Tristan, Ruben en Joel op gitaar, Peter op drums en Julian op piano. Zes muzikanten uit Bunschoten-Spakenburg en Amersfoort. Wekelijkse repetitie, groeiend repertoire, dezelfde groepsapp die die ene winteravond ontstond.
              </p>
            </div>
            <div className="border-2 border-brand-cream p-6 bg-brand-bg-3 rounded-xl hard-shadow-red">
              <h3 className="font-display text-xl text-brand-red uppercase tracking-wider mb-2">DE BELOFTE</h3>
              <p className="text-xs leading-relaxed text-brand-text-muted">
                Boek QLC en je krijgt een uur volle bak live rock. Covers met eigen kop, meezingers, en zes mannen die het meest gelukkig zijn als de versterkers aanstaan. Van Backyard Sessions in de tuin tot podium op een festival.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wider mb-4">
              WIL JE ONS IN ACTIE ZIEN OF HOREN?
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#/optredens" 
                className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-red text-white border-2 border-brand-cream hard-shadow-cream hover-bounce"
              >
                BEKIJK SPEELDATA
              </a>
              <a 
                href="#/boek-ons" 
                className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce"
              >
                BOEK ONS DIRECT
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
