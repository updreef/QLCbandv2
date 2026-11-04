"use client";

import { useMemo, useState } from "react";
import { Music, Disc, Radio, Search } from "lucide-react";
import { repertoire, type Song } from "../../data";

const isNL = (s: Song) => s.language === "nl";

const FILTERS: { id: "all" | "nl" | "en"; label: string }[] = [
  { id: "all", label: "Alles" },
  { id: "nl", label: "Nederlands" },
  { id: "en", label: "Engels" },
];

export default function Muziek() {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<"all" | "nl" | "en">("all");

  const set1 = repertoire.filter((s) => s.set === 1).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const set2 = repertoire.filter((s) => s.set === 2).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return repertoire
      .filter((s) => (lang === "all" ? true : lang === "nl" ? isNL(s) : !isNL(s)))
      .filter((s) => !needle || s.title.toLowerCase().includes(needle) || s.originalArtist.toLowerCase().includes(needle))
      .sort((a, b) => a.title.localeCompare(b.title, "nl"));
  }, [q, lang]);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="font-stamp text-brand-tlbr uppercase text-xs tracking-[0.28em]">
            Band &middot; Spakenburg / Amersfoort
          </p>
          <h1 className="font-poster uppercase text-brand-crm text-6xl sm:text-7xl mt-2 leading-[0.85]">
            Repertoire
          </h1>
          <p className="text-brand-crm/60 max-w-2xl mt-5 text-sm sm:text-base leading-relaxed">
            Alle nummers die we live spelen, van meezingers tot rockhits. Zoek je verzoeknummer op of filter op taal. Staat je nummer er niet bij? Geef het door bij je{" "}
            <a href="/boek-ons" className="text-brand-tlbr underline underline-offset-2">boeking</a>, grote kans dat we het erbij leren.
          </p>
        </div>

        {/* Zoek + taalfilter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-crm/40" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek een nummer of artiest…"
              aria-label="Zoek in het repertoire"
              className="w-full bg-brand-base2 border border-brand-crm/15 rounded-xl pl-10 pr-4 py-3 text-brand-crm placeholder:text-brand-crm/40 focus:outline-none focus:border-brand-tlbr"
            />
          </div>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setLang(f.id)}
                className={`font-stamp uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl border transition-colors ${
                  lang === f.id
                    ? "bg-brand-tlbr text-brand-base3 border-brand-tlbr"
                    : "bg-brand-base2 text-brand-crm/70 border-brand-crm/15 hover:border-brand-tlbr"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="font-stamp text-xs tracking-wide text-brand-crm/50 mt-4 mb-2">
          {filtered.length} {filtered.length === 1 ? "nummer" : "nummers"}
        </p>

        {/* Repertoire-lijst */}
        {filtered.length === 0 ? (
          <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-10 text-center">
            <p className="font-poster uppercase text-2xl text-brand-crm">Niks gevonden</p>
            <p className="text-sm text-brand-crm/60 mt-2">
              Staat je nummer er niet bij?{" "}
              <a href="/boek-ons" className="text-brand-tlbr underline underline-offset-2">Vraag het aan bij je boeking</a>.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {filtered.map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-3 py-3 border-b border-brand-crm/10">
                <span className="min-w-0 leading-snug">
                  <span className="font-semibold text-brand-crm">{s.title}</span>
                  <span className="text-brand-crm/45 text-sm"> &middot; {s.originalArtist}</span>
                </span>
                {isNL(s) && (
                  <span className="font-stamp text-[9px] uppercase tracking-wider text-brand-tlbr border border-brand-tlbr/40 rounded px-1.5 py-0.5 shrink-0">
                    NL
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Zo ziet een avond eruit — de vaste 2-set */}
        <div className="mt-24">
          <span className="qlc-stamp text-brand-pb -rotate-2 inline-block">Zo ziet een avond eruit</span>
          <h2 className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl mt-3 leading-none">Onze vaste live-set</h2>
          <p className="text-brand-crm/60 text-sm mt-2 max-w-2xl leading-relaxed">
            Twee sets met een pauze ertussen. Zo bouwen we een avond op: van meezingers naar volle bak.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 mt-8">
            <SetColumn title="Set 1" songs={set1} pauze />
            <SetColumn title="Set 2" songs={set2} />
          </div>
        </div>

        {/* Spotify + waarom live */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-24">
          <div className="flex flex-col gap-4">
            <h3 className="font-poster text-2xl text-brand-crm uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-5 h-5 text-brand-tlbr" /> Spotify
            </h3>
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl overflow-hidden shadow-[6px_6px_0_0_#5d2a58] p-4 flex flex-col gap-5">
              <div className="relative h-40 bg-gradient-to-br from-brand-pd to-brand-pm border border-brand-crm/15 rounded-xl flex flex-col justify-end p-5 overflow-hidden">
                <div className="absolute top-4 right-4 text-brand-crm/80">
                  <Disc className="w-9 h-9 animate-spin" style={{ animationDuration: "6s" }} />
                </div>
                <span className="font-stamp text-[10px] text-brand-crm/70 bg-brand-base3/60 px-2 py-0.5 rounded w-fit uppercase tracking-wider">Binnenkort</span>
                <h4 className="font-poster text-3xl text-brand-crm uppercase tracking-wider leading-none mt-1">QLC Setlist</h4>
                <p className="text-xs text-brand-crm/70 mt-1">Onze setlist komt binnenkort op Spotify.</p>
              </div>
              <a
                href="https://open.spotify.com/user/RubenBeukers"
                target="_blank"
                rel="noopener"
                className="text-center font-poster uppercase tracking-widest text-sm py-3 bg-brand-tlbr text-brand-base3 rounded-lg hover:bg-brand-crm transition-colors"
              >
                Volg ons op Spotify
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-poster text-2xl text-brand-crm uppercase tracking-wider flex items-center gap-2">
              <Music className="w-5 h-5 text-brand-tlbr" /> Waarom QLC live?
            </h3>
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#1c857a] flex flex-col gap-4 text-sm text-brand-crm/70 leading-relaxed">
              <p>Geen backing tracks, geen computer. Zes muzikanten, versterkers open, en een uur lang volle bak rock. Van meezingers tot deep cuts, we passen de setlist aan op de gelegenheid.</p>
              <p>Wil je ons horen op jouw feest, festival of bruiloft? <a href="/boek-ons" className="text-brand-tlbr underline underline-offset-2">Vraag een offerte aan</a> of bel Julian op <a href="tel:+31640081979" className="text-brand-tlbr underline underline-offset-2">06 40 08 19 79</a>.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 p-5 border border-brand-crm/10 rounded-xl bg-brand-base2/60 text-xs text-brand-crm/60 text-center leading-relaxed">
          <span className="font-bold text-brand-crm">Verzoeknummer voor je feest?</span> We studeren met plezier een specifiek verzoek in voor je bruiloft of evenement. Geef het door bij je boeking.
        </div>

      </div>
    </div>
  );
}

function SetColumn({ title, songs, pauze = false }: { title: string; songs: Song[]; pauze?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        <h3 className="font-poster uppercase text-brand-crm text-3xl tracking-[0.15em]">{title}</h3>
        <span className="flex-1 h-0.5 bg-gradient-to-r from-brand-pb to-transparent" />
      </div>
      <ol className="flex flex-col">
        {songs.map((song) => (
          <li key={song.id} className="flex items-baseline gap-4 py-3 border-b border-brand-crm/10">
            <span className="font-poster text-brand-pb text-2xl leading-none w-8 shrink-0 tabular-nums">
              {String(song.position ?? 0).padStart(2, "0")}
            </span>
            <p className="font-bold text-brand-crm text-base sm:text-lg leading-snug min-w-0">
              {song.title}
              <span className="font-normal text-brand-crm/40 text-sm"> &middot; {song.originalArtist}</span>
            </p>
          </li>
        ))}
      </ol>
      {pauze && (
        <div className="flex items-center gap-4 mt-6 justify-center">
          <span className="h-px w-14 bg-brand-crm/15" />
          <span className="font-stamp uppercase tracking-[0.3em] text-xs text-brand-tlbr">Pauze</span>
          <span className="h-px w-14 bg-brand-crm/15" />
        </div>
      )}
    </div>
  );
}
