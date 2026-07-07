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
            Quarter Life Crisis (QLC) is niet zomaar een coverband; het is onze gezamenlijke rock-rebellie tegen volwassen worden.
          </p>
        </div>

        {/* Content Story Grid */}
        <div className="flex flex-col gap-10 font-sans text-sm sm:text-base leading-relaxed text-brand-text-muted">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-8 rounded-2xl hard-shadow-red card-rotate-left">
            <div className="md:col-span-4">
              <h3 className="font-display text-3xl text-brand-amber uppercase tracking-widest">
                DE CRISIS
              </h3>
              <p className="text-xs font-mono text-brand-red mt-1">Sinds 2024</p>
            </div>
            <div className="md:col-span-8 border-l-2 border-brand-cream/10 pl-0 md:pl-6">
              <p>
                Rond de grens van 25 jaar oud kregen we allemaal te maken met de beruchte 'Quarter Life Crisis'. Vaste contracten, kantoorgesprekken over pensioenen en meubilair... De sleur loerde om de hoek. Onze reactie? Een snoeiharde rockband oprichten. Om lawaai te maken, te springen en onszelf te herinneren aan wat écht belangrijk is: plezier, passie en gitaarsolo's.
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-4">
            <h2 className="font-display text-3xl text-brand-cream uppercase tracking-wider">
              ONZE FILOSOFIE: PLAY LOUD, GROW UP LATER
            </h2>
            <p>
              We nemen de muziek uiterst serieus, maar onszelf absoluut niet. Dat is de kern van QLC. Elk optreden is voor ons een kans om de energie van legendarische liveshows te herbeleven. We weigeren om met backing tracks of computerspelers te werken. Elke drumslag, basnoot, synthesizer-akkoord en gitaarriff die je hoort is 100% live en ter plekke gecreëerd door zes gepassioneerde muzikanten.
            </p>

            <blockquote className="border-l-4 border-brand-amber pl-4 my-6 italic text-brand-text font-semibold bg-brand-bg-2/30 py-4 pr-4">
              "We wilden de gitaarsolo's weer terugbrengen in de schijnwerpers. Geen zacht achtergrondgeruis, maar rock zoals het bedoeld is: rauw, puur en recht in je gezicht."
            </blockquote>

            <p>
              Onze setlist is een eerbetoon aan de geschiedenis van de rock. Van de pure gitaarrock van AC/DC en Golden Earring tot de bombastische synths van Muse en de zangharmonieën van The Cranberries. We bouwen de show zo op dat niemand stil kan blijven staan. 
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="border-2 border-brand-cream p-6 bg-brand-bg-3 rounded-xl hard-shadow-cream">
              <h3 className="font-display text-xl text-brand-neon uppercase tracking-wider mb-2">HET RECEPT</h3>
              <p className="text-xs leading-relaxed text-brand-text-muted">
                Zes vrienden uit Spakenburg en Amersfoort, één wekelijkse repetitieavond vol zweet en rock, en een onuitputtelijke drang om elk podium waar we op staan om te toveren tot een kolkende rock-arena.
              </p>
            </div>
            <div className="border-2 border-brand-cream p-6 bg-brand-bg-3 rounded-xl hard-shadow-red">
              <h3 className="font-display text-xl text-brand-red uppercase tracking-wider mb-2">DE BELOFTE</h3>
              <p className="text-xs leading-relaxed text-brand-text-muted">
                Als je QLC boekt, krijg je geen standaard bruiloftsorkest. Je krijgt een rockshow. We betrekken het publiek, gooien de gitaarversterkers wijd open en zingen mee tot we geen stem meer over hebben.
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
