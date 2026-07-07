import { useState } from "react";
import { Search, Music, Play, Disc, ExternalLink, HelpCircle, Film, Radio } from "lucide-react";
import { repertoire } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

export default function Muziek() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState("live-1");

  const filteredRepertoire = repertoire.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.originalArtist.toLowerCase().includes(query)
    );
  });

  const videos = [
    { id: "live-1", title: "Quarter Life Crisis - Live Rehearsal (Radar Love Cover)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" },
    { id: "live-2", title: "Backyard Sessions #1 - Promo Teaser (Sweet Child O' Mine)", url: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">LUISTER & BEKIJK ONS</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            MUZIEK & REPERTOIRE
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Ontdek onze setlist vol rockhits en geniet van onze live-opnames en sfeerimpressies.
          </p>
        </div>

        {/* Media Block (Spotify Embed + YouTube Video) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Video Player (Left Column) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wider flex items-center gap-2">
              <Film className="w-5 h-5 text-brand-red" /> LIVESHOW IMPRESSIE VIDEO
            </h3>
            
            <div className="relative aspect-video bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden hard-shadow-red card-rotate-left">
              {/* Responsive Iframe Embed */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Quarter Life Crisis Live Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-2 bg-brand-bg-2 p-4 border border-brand-cream/10 rounded-xl">
              <h4 className="font-semibold text-brand-cream text-sm">Promo Video — Live Rehearsal Suite</h4>
              <p className="text-xs text-brand-text-muted">Opgenomen in Bunschoten, live repetitie opnames van onze rock setlist. Ervaar de echte QLC-energie!</p>
            </div>
          </div>

          {/* Spotify & Audio player (Right Column) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-5 h-5 text-brand-amber" /> SPOTIFY PLAYLIST
            </h3>

            {/* Spotify Player Embed */}
            <div className="bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden hard-shadow-cream p-4 flex-1 flex flex-col justify-between gap-5 card-rotate-right">
              <div className="relative h-44 bg-gradient-to-br from-brand-amber to-brand-red border-2 border-brand-cream rounded-xl flex flex-col justify-end p-5 overflow-hidden">
                <div className="absolute inset-0 bg-black/45 z-0" />
                <div className="absolute top-4 right-4 z-10 text-brand-cream">
                  <Disc className="w-10 h-10 animate-spin" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded w-fit uppercase">SPOTIFY EMBED</span>
                  <h4 className="font-display text-3xl text-brand-cream uppercase tracking-wider leading-none">QLC SETLIST</h4>
                  <p className="text-xs text-brand-text/90">De originele nummers van onze liveshow!</p>
                </div>
              </div>

              {/* Real Spotify Embed widget */}
              <iframe 
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4XgSg4bygE8?utm_source=generator&theme=0" 
                width="100%" 
                height="220" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg border border-brand-cream/10 bg-brand-bg-2"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Repertoire Search List section */}
        <section className="bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-10 rounded-2xl hard-shadow-cream">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-display text-3xl text-brand-amber uppercase tracking-wider flex items-center gap-2">
                <Music className="w-6 h-6 text-brand-red" /> ONS REPERTOIRE
              </h3>
              <p className="text-xs text-brand-text-muted mt-1">
                We spelen een gevarieerde mix van legendarische pop/rockklassiekers en moderne hits.
              </p>
            </div>

            {/* Search Input field */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute top-3 left-4 w-4 h-4 text-brand-text-muted" />
              <input
                type="text"
                placeholder="Zoek een nummer of artiest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none pl-11 pr-4 py-2.5 w-full rounded-lg text-sm text-brand-cream font-sans transition-colors"
              />
            </div>
          </div>

          {/* Songs table */}
          {filteredRepertoire.length === 0 ? (
            <div className="py-12 text-center text-brand-text-muted text-sm font-mono">
              Geen nummers gevonden die overeenkomen met je zoekopdracht.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRepertoire.map((song) => (
                <div 
                  key={song.id} 
                  className="bg-brand-bg-3 border border-brand-cream/10 p-4 rounded-xl flex items-center justify-between hover:border-brand-neon/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-bg-2 border border-brand-cream/10 group-hover:border-brand-red rounded-lg transition-colors">
                      <Music className="w-4 h-4 text-brand-red group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-cream text-sm sm:text-base">{song.title}</h4>
                      <p className="text-xs text-brand-text-muted">{song.originalArtist}</p>
                    </div>
                  </div>
                  
                  {song.spotifyUrl && (
                    <a
                      href={song.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-brand-text-muted hover:text-brand-neon transition-colors"
                      aria-label={`Open ${song.title} op Spotify`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-10 p-5 bg-brand-bg-3 border border-brand-cream/10 rounded-xl text-xs text-brand-text-muted text-center leading-relaxed">
            <span className="font-bold text-brand-cream">Staat je favoriete rocknummer er niet tussen?</span> We breiden onze setlist continu uit en studeren met plezier een specifiek verzoeknummer in voor jouw bruiloft of speciale evenement! Geef het aan bij je boeking.
          </div>
        </section>

      </div>
    </div>
  );
}
