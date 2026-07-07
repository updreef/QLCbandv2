import { useState } from "react";
import { Search, Music, Disc, Radio, ExternalLink } from "lucide-react";
import { repertoire } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

export default function Muziek() {
  const [searchQuery, setSearchQuery] = useState("");

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
            Ontdek onze setlist vol rockhits. Wil je ons live zien? Bekijk de video's op de <a href="#/optredens" className="text-brand-neon underline">optredens-pagina</a>.
          </p>
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

          {/* Setlist */}
          {filteredRepertoire.length === 0 ? (
            <div className="py-12 text-center text-brand-text-muted text-sm font-mono">
              Geen nummers gevonden die overeenkomen met je zoekopdracht.
            </div>
          ) : searchQuery.trim() ? (
            // Flat list when searching
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredRepertoire.map((song) => (
                <SongRow key={song.id} song={song} />
              ))}
            </div>
          ) : (
            // Grouped: SET 1 → PAUZE → SET 2
            <div className="flex flex-col gap-8">
              {[1, 2].map((setNum) => (
                <div key={setNum}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-display uppercase text-brand-neon tracking-[0.3em] text-sm">SET {setNum}</span>
                    <span className="flex-1 h-px bg-brand-cream/15" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredRepertoire.filter((s) => s.set === setNum).sort((a, b) => a.position - b.position).map((song) => (
                      <SongRow key={song.id} song={song} />
                    ))}
                  </div>
                  {setNum === 1 && (
                    <div className="mt-8 flex items-center gap-4 opacity-70">
                      <span className="flex-1 h-px bg-brand-cream/15" />
                      <span className="font-display uppercase tracking-[0.4em] text-xs text-brand-amber">— pauze —</span>
                      <span className="flex-1 h-px bg-brand-cream/15" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 p-5 bg-brand-bg-3 border border-brand-cream/10 rounded-xl text-xs text-brand-text-muted text-center leading-relaxed">
            <span className="font-bold text-brand-cream">Verzoeknummer voor je feest?</span> We spelen deze setlist live, en studeren met plezier een specifiek verzoek in voor je bruiloft of evenement. Geef het door bij je boeking.
          </div>
        </section>

      </div>
    </div>
  );
}

function SongRow({ song }: { song: typeof repertoire[0] }) {
  return (
    <div className="bg-brand-bg-3 border border-brand-cream/10 p-4 rounded-xl flex items-start justify-between gap-3 hover:border-brand-neon/30 transition-colors group">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <span className="font-mono text-xs text-brand-amber bg-brand-bg-2 border border-brand-cream/10 rounded px-2 py-1 shrink-0 mt-0.5 min-w-[2.25rem] text-center">
          {String(song.position).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-brand-cream text-sm sm:text-base truncate">{song.title}</h4>
          <p className="text-xs text-brand-text-muted truncate">{song.originalArtist}</p>
          {song.roles && (
            <p className="text-[10px] font-mono text-brand-neon/80 mt-1.5 truncate">{song.roles}</p>
          )}
        </div>
      </div>

      {song.spotifyUrl && (
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-brand-text-muted hover:text-brand-neon transition-colors shrink-0"
          aria-label={`Open ${song.title} op Spotify`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
