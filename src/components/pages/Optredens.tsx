import { useState } from "react";
import { Calendar, MapPin, Clock, ArrowRight, AlertCircle, Film, Volume2, VolumeX } from "lucide-react";
import { shows, liveMoments } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";
import LazyVideo from "../LazyVideo";

export default function Optredens() {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [unmutedId, setUnmutedId] = useState<string | null>(null);

  const filteredShows = shows.filter((show) => {
    if (activeTab === 'all') return true;
    return show.status === activeTab;
  });

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">LIVE TOUR DATA</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            OPTREDENS & CONCERTEN
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Wil je ons live meemaken? Bekijk onze aankomende optredens of duik in het archief van onze voorgaande legendarische rockavonden. 
          </p>
        </div>

        {/* Filter Navigation Tabs with Hard Shadow */}
        <div className="flex justify-center md:justify-start gap-4 mb-12">
          {(['all', 'upcoming', 'past'] as const).map((tab) => {
            const label = tab === 'all' ? 'Alle Shows' : tab === 'upcoming' ? 'Aankomend' : 'Voorgaande';
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-display uppercase tracking-widest text-sm sm:text-base px-6 py-2.5 border-2 transition-all ${
                  isActive
                    ? "bg-brand-red text-white border-brand-cream hard-shadow-cream -translate-y-1"
                    : "bg-brand-bg-2 text-brand-cream border-brand-cream/20 hover:border-brand-cream"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Shows Listing */}
        {filteredShows.length === 0 ? (
          <div className="bg-brand-bg-2 border-2 border-brand-cream p-12 text-center rounded-2xl hard-shadow-cream max-w-2xl mx-auto my-12">
            <AlertCircle className="w-12 h-12 text-brand-amber mx-auto mb-4" />
            <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide">Geen optredens gevonden</h3>
            <p className="text-sm text-brand-text-muted mt-2">
              Op dit moment zijn er geen geplande optredens in deze categorie. Heb je zelf een locatie of feest? Boek ons nu!
            </p>
            <a 
              href="#/boek-ons" 
              className="mt-6 inline-block font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-amber text-brand-bg-3 border-2 border-brand-cream font-bold hard-shadow-cream hover-bounce"
            >
              BOEK QLC DIRECT
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShows.map((show, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={show.id}
                  className={`bg-brand-bg-2 border-3 border-brand-cream rounded-2xl overflow-hidden flex flex-col justify-between hover-bounce transition-all ${
                    isEven ? "card-rotate-left hard-shadow-cream" : "card-rotate-right hard-shadow-red"
                  }`}
                >
                  {/* Show Image */}
                  <div className="relative h-56 overflow-hidden border-b-2 border-brand-cream">
                    <img 
                      src={show.image} 
                      alt={show.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {show.status === 'upcoming' ? (
                      <div className="absolute top-4 left-4 bg-brand-amber text-brand-bg-3 text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 border border-brand-cream rounded">
                        UPCOMING
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-brand-bg-3 text-brand-text-muted text-xs font-mono uppercase tracking-wider px-2.5 py-1 border border-brand-cream/20 rounded">
                        ARCHIEF
                      </div>
                    )}
                  </div>

                  {/* Show Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-brand-neon font-mono uppercase">
                        <Calendar className="w-3.5 h-3.5" /> {show.date}
                        <span className="text-brand-cream/20">|</span>
                        <Clock className="w-3.5 h-3.5" /> {show.time}
                      </div>

                      <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide leading-tight group-hover:text-brand-neon transition-colors mt-1">
                        {show.title}
                      </h3>

                      <p className="text-xs text-brand-amber font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {show.location}, {show.city}
                      </p>

                      <p className="text-brand-text-muted text-sm mt-2 line-clamp-3">
                        {show.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-cream/10 flex items-center justify-between">
                      <a 
                        href={`#/optredens/${show.slug}`}
                        className="font-display uppercase tracking-widest text-xs text-brand-cream hover:text-brand-neon inline-flex items-center gap-1.5 group/link"
                      >
                        MEER INFO <ArrowRight className="w-4 h-4 text-brand-red group-hover/link:translate-x-1 transition-transform" />
                      </a>
                      
                      {show.status === 'upcoming' && (
                        <a 
                          href="#/boek-ons"
                          className="font-mono text-[10px] text-brand-red font-bold uppercase border border-brand-red/30 px-2 py-0.5 rounded hover:bg-brand-red hover:text-white transition-colors"
                        >
                          BOEK ONS
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Live Moments — video clips van het podium */}
        <section className="mt-24">
          <div className="mb-6">
            <h2 className="font-display text-3xl sm:text-4xl text-brand-cream uppercase tracking-wider flex items-center gap-2">
              <Film className="w-6 h-6 text-brand-red" /> LIVE MOMENTS
            </h2>
            <p className="text-xs text-brand-text-muted mt-1">Recht van het podium, opgenomen tijdens de bruiloft van T&amp;E. Klik op de speaker voor geluid.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMoments.map((m, i) => {
              const rotate = i % 3 === 0 ? "card-rotate-left" : i % 3 === 1 ? "" : "card-rotate-right";
              const shadow = i % 3 === 0 ? "hard-shadow-cream" : i % 3 === 1 ? "hard-shadow-red" : "hard-shadow-cyan";
              const isUnmuted = unmutedId === m.id;
              return (
                <figure key={m.id} className={`relative bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden ${rotate} ${shadow}`}>
                  <LazyVideo
                    src={m.video}
                    poster={m.poster}
                    muted={!isUnmuted}
                    aria-label={`Quarter Life Crisis spelen ${m.title} live`}
                    className="w-full aspect-video object-cover"
                  />
                  <figcaption className="flex items-center justify-between px-4 py-3 border-t-2 border-brand-cream/10 bg-brand-bg-2">
                    <span className="font-display uppercase tracking-widest text-sm text-brand-cream">{m.title}</span>
                    <button
                      type="button"
                      onClick={() => setUnmutedId(isUnmuted ? null : m.id)}
                      className={`p-2 rounded-full border-2 transition-all ${isUnmuted ? "bg-brand-amber border-brand-cream text-brand-bg-3" : "bg-brand-bg-3 border-brand-cream/40 text-brand-cream hover:border-brand-amber hover:text-brand-amber"}`}
                      aria-label={isUnmuted ? "Geluid uit" : "Geluid aan"}
                      aria-pressed={isUnmuted}
                    >
                      {isUnmuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* Local Booking Banner */}
        <div className="mt-20 bg-brand-bg-3 border-3 border-brand-cream p-8 sm:p-12 rounded-2xl text-center hard-shadow-neon relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <h2 className="font-display text-3xl sm:text-4xl text-brand-cream uppercase tracking-wider relative z-10">
            ZELF EEN OPTREDEN BOEKEN?
          </h2>
          <p className="text-brand-text-muted max-w-xl mx-auto mt-2 mb-6 text-sm relative z-10">
            Heb je een zaal, festival, bruiloft, verjaardag of kantoorevenement in regio Utrecht, Amersfoort of daarbuiten? QLC regelt de geluidsinstallatie, vette show en gitaargeweld.
          </p>
          <a 
            href="#/boek-ons" 
            className="font-display uppercase tracking-widest text-sm px-8 py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce relative z-10 inline-block"
          >
            VRIJBLIJVEND CONTACT OPZNEMEN
          </a>
        </div>

      </div>
    </div>
  );
}
