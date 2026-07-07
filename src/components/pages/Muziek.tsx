import { useState } from "react";
import { Search, Music, Disc, Film, Radio, Volume2, VolumeX } from "lucide-react";
import { repertoire, liveMoments } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

export default function Muziek() {
  const [searchQuery, setSearchQuery] = useState("");
  const [unmutedId, setUnmutedId] = useState<string | null>(null);

  const filteredRepertoire = repertoire.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.originalArtist.toLowerCase().includes(query)
    );
  });

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

        {/* Live Moments — video clips van het podium */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-cream uppercase tracking-wider flex items-center gap-2">
                <Film className="w-6 h-6 text-brand-red" /> LIVE MOMENTS
              </h2>
              <p className="text-xs text-brand-text-muted mt-1">Recht van het podium. Klik op de speaker voor geluid.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMoments.map((m, i) => {
              const rotate = i % 3 === 0 ? "card-rotate-left" : i % 3 === 1 ? "" : "card-rotate-right";
              const shadow = i % 3 === 0 ? "hard-shadow-cream" : i % 3 === 1 ? "hard-shadow-red" : "hard-shadow-cyan";
              const isUnmuted = unmutedId === m.id;
              return (
                <figure key={m.id} className={`relative bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden ${rotate} ${shadow}`}>
                  <video
                    src={m.video}
                    poster={m.poster}
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
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
        </div>

        {/* Spotify Playlist (placeholder) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-5 h-5 text-brand-amber" /> SPOTIFY PLAYLIST
            </h3>
            <div className="bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden hard-shadow-amber p-4 flex flex-col gap-5">
              <div className="relative h-44 bg-gradient-to-br from-brand-amber to-brand-red border-2 border-brand-cream rounded-xl flex flex-col justify-end p-5 overflow-hidden">
                <div className="absolute inset-0 bg-black/45 z-0" />
                <div className="absolute top-4 right-4 z-10 text-brand-cream">
                  <Disc className="w-10 h-10 animate-spin" />
                </div>
                <div className="relative z-10 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded w-fit uppercase">Binnenkort</span>
                  <h4 className="font-display text-3xl text-brand-cream uppercase tracking-wider leading-none">QLC SETLIST</h4>
                  <p className="text-xs text-brand-text/90">Onze setlist komt binnenkort op Spotify.</p>
                </div>
              </div>
              <a
                href="https://open.spotify.com/user/RubenBeukers"
                target="_blank"
                rel="noopener"
                className="text-center font-display uppercase tracking-widest text-sm py-3 bg-brand-cream text-brand-bg border-2 border-brand-cream font-bold hover:bg-transparent hover:text-brand-cream transition-colors"
              >
                Volg ons op Spotify
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wider flex items-center gap-2">
              <Music className="w-5 h-5 text-brand-neon" /> WAAROM QLC LIVE?
            </h3>
            <div className="bg-brand-bg-2 border-3 border-brand-cream rounded-2xl p-6 hard-shadow-cream flex flex-col gap-4 text-sm text-brand-text-muted leading-relaxed">
              <p>Geen backing tracks, geen computer. Zes muzikanten, versterkers open, en een uur lang volle bak rock. Van meezingers tot deep cuts, we passen de setlist aan op de gelegenheid.</p>
              <p>Wil je ons horen op jouw feest, festival of bruiloft? <a href="#/boek-ons" className="text-brand-neon underline">Vraag een offerte aan</a> of bel Ruben op <a href="tel:+31640420054" className="text-brand-neon underline">06 40 42 00 54</a>.</p>
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
