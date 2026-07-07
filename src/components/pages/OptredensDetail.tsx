import { ArrowLeft, Calendar, MapPin, Clock, Star, Film } from "lucide-react";
import { shows, liveMoments } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

interface OptredensDetailProps {
  slug: string;
}

export default function OptredensDetail({ slug }: OptredensDetailProps) {
  const show = shows.find((s) => s.slug === slug);
  const showMoments = show ? liveMoments.filter((m) => m.showSlug === show.slug) : [];

  if (!show) {
    return (
      <div className="pt-36 pb-24 text-center min-h-screen">
        <h2 className="font-display text-4xl text-brand-cream uppercase mb-4">Optreden niet gevonden</h2>
        <p className="text-brand-text-muted mb-8">We konden het gevraagde optreden niet vinden.</p>
        <a 
          href="#/optredens" 
          className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-cream text-brand-bg border-2 border-brand-cream hard-shadow-cream"
        >
          TERUG NAAR OPTREDENS
        </a>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Link */}
        <a 
          href="#/optredens" 
          className="inline-flex items-center gap-2 text-sm text-brand-neon font-mono uppercase mb-8 hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Terug naar alle optredens
        </a>

        {/* Gig Detail Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info Box (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono font-bold bg-brand-red text-white px-3 py-1 border border-brand-cream uppercase tracking-wider rotate-[-1deg] shadow-[2px_2px_0_0_#f1f1f1]">
                {show.status === 'upcoming' ? 'AANKOMENDE SHOW' : 'ARCHIEF DETAILS'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-cream uppercase tracking-wide leading-tight">
              {show.title}
            </h1>
            <SquiggleUnderline />

            <div className="flex flex-wrap gap-4 text-xs font-mono text-brand-text-muted mt-2">
              <div className="flex items-center gap-1.5 bg-brand-bg-2 border border-brand-cream/10 px-3 py-1.5 rounded-lg text-brand-cream">
                <Calendar className="w-4 h-4 text-brand-amber" /> {show.date}
              </div>
              <div className="flex items-center gap-1.5 bg-brand-bg-2 border border-brand-cream/10 px-3 py-1.5 rounded-lg text-brand-neon">
                <Clock className="w-4 h-4 text-brand-neon" /> {show.time}
              </div>
            </div>

            <div className="prose prose-invert mt-4">
              <p className="text-brand-text-muted leading-relaxed text-sm sm:text-base">
                {show.description}
              </p>
            </div>

            {/* Highlights Checklist */}
            {show.highlights && (
              <div className="bg-brand-bg-2 border-2 border-brand-cream p-6 rounded-xl hard-shadow-cream mt-4">
                <h3 className="font-display text-xl text-brand-amber uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 fill-brand-amber text-brand-amber" /> {show.status === 'upcoming' ? 'WAT JE KUNT VERWACHTEN' : 'HOOGTEPUNTEN'}
                </h3>
                <ul className="space-y-3">
                  {show.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <span className="text-brand-red font-bold text-lg leading-none mt-0.5">•</span>
                      <span className="text-brand-text">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Live Moments from this show */}
            {showMoments.length > 0 && (
              <div className="mt-4">
                <h3 className="font-display text-xl text-brand-amber uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Film className="w-5 h-5 text-brand-red" /> LIVE MOMENTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {showMoments.map((m) => (
                    <figure key={m.id} className="bg-brand-bg-3 border-2 border-brand-cream rounded-xl overflow-hidden hard-shadow-cyan">
                      <video
                        src={m.video}
                        poster={m.poster}
                        controls
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-label={`Quarter Life Crisis spelen ${m.title} live`}
                        className="w-full aspect-video object-cover bg-brand-bg-3"
                      />
                      <figcaption className="px-3 py-2 text-xs font-display uppercase tracking-widest text-brand-cream border-t border-brand-cream/10">
                        {m.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Details Sidebar Card (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden hard-shadow-red card-rotate-right">
              
              <img 
                src={show.image} 
                alt={show.title} 
                className="w-full h-48 object-cover border-b-2 border-brand-cream"
                referrerPolicy="no-referrer"
              />

              <div className="p-6 flex flex-col gap-5">
                <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wider">
                  LOCATIE GEGEVENS
                </h3>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-cream">{show.location}</p>
                      <p className="text-xs text-brand-text-muted">{show.address}</p>
                      <p className="text-xs text-brand-text-muted">{show.city}, NL</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-cream">Tijdschema</p>
                      <p className="text-xs text-brand-text-muted">Aanvang optreden: {show.time.split(" - ")[0]}</p>
                      <p className="text-xs text-brand-text-muted">Einde show: {show.time.split(" - ")[1] || "Laat"}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-cream/10">
                  {show.status === 'upcoming' ? (
                    <div className="flex flex-col gap-3">
                      <a 
                        href="#/boek-ons"
                        className="font-display text-center uppercase tracking-widest text-sm py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce"
                      >
                        BOEK ONS VOOR JOUW FEEST
                      </a>
                      <p className="text-center text-[10px] text-brand-text-muted font-mono">
                        Gratis entree • Gezellige rock sfeer gegarandeerd!
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-2 bg-brand-bg-2 border border-brand-cream/10 rounded-lg">
                      <p className="font-mono text-xs text-brand-amber">ARCHIEF SHOW AFGELOPEN</p>
                      <p className="text-[10px] text-brand-text-muted mt-1">Bedankt voor de fantastische energie!</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* General booking helper banner */}
            <div className="bg-brand-bg-2 border-2 border-brand-cream p-6 rounded-xl hard-shadow-cream text-center">
              <h4 className="font-display text-lg text-brand-cream uppercase tracking-wider mb-2">QLC IN JOUW ACHTERTUIN?</h4>
              <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                Wil je zelf een intiem concert in je tuin, net als de legendarische Backyard Sessions? Neem contact op!
              </p>
              <a 
                href="#/boek-ons"
                className="font-display inline-block uppercase text-xs tracking-widest px-4 py-2 bg-brand-red text-white border-2 border-brand-cream font-bold hover-bounce"
              >
                VRAAG OFFERTE AAN
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
