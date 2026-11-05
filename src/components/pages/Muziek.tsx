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

        {/* Repertoire als setlist-poster: donker paneel, halftoon, plakband
            en grote riso-cijfers. Een kale lijst viel uit de toon op een site
            die verder helemaal poster is. */}
        <div className="relative mt-10">
          {/* Plakband linksboven en rechtsboven */}
          <span className="absolute -top-3 left-8 z-10 w-24 h-6 bg-brand-tlbr/40 border border-brand-crm/20 -rotate-3" aria-hidden />
          <span className="absolute -top-3 right-12 z-10 w-20 h-6 bg-brand-pb/40 border border-brand-crm/20 rotate-6" aria-hidden />

          <div className="relative overflow-hidden bg-brand-base2 border border-brand-crm/15 shadow-[12px_12px_0_0_#5d2a58] p-6 sm:p-10">
            <div className="qlc-halftone absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden />

            {/* Kop van de poster: titel links, aantal als rond stempel rechts */}
            <div className="relative flex items-start justify-between gap-4 mb-8">
              <div>
                <span className="qlc-stamp text-brand-tlbr -rotate-2 inline-block">Wat we spelen</span>
                <h2 className="font-poster uppercase text-brand-crm text-3xl sm:text-4xl mt-3 leading-none">
                  De setlist
                </h2>
              </div>
              <span className="shrink-0 w-[74px] h-[74px] rounded-full border-2 border-brand-pb text-brand-pb -rotate-12 hidden sm:flex flex-col items-center justify-center text-center font-stamp leading-tight">
                <span className="text-xl">{filtered.length}</span>
                <span className="text-[9px] tracking-wider uppercase">
                  {filtered.length === 1 ? "nummer" : "nummers"}
                </span>
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="relative text-center py-14">
                <p className="font-poster uppercase text-3xl text-brand-crm">Niks gevonden</p>
                <p className="text-sm text-brand-crm/60 mt-3">
                  Staat je nummer er niet bij?{" "}
                  <a href="/boek-ons" className="text-brand-tlbr underline underline-offset-2">Vraag het aan bij je boeking</a>.
                </p>
              </div>
            ) : (
              // CSS-kolommen en geen grid: een grid vult van links naar rechts,
              // waardoor je 01 03 05 onder elkaar krijgt. Zo loopt 01 t/m 13
              // netjes door in de linkerkolom.
              <ol className="relative md:columns-2 md:gap-x-12">
                {filtered.map((s, i) => (
                  <li
                    key={s.id}
                    className="group flex items-baseline gap-4 py-3.5 border-b border-brand-crm/10 transition-colors hover:border-brand-tlbr/50 break-inside-avoid"
                  >
                    <span className="font-poster text-2xl leading-none w-9 shrink-0 tabular-nums text-brand-pb transition-colors group-hover:text-brand-tlbr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="min-w-0 leading-snug flex-1">
                      <span className="font-bold text-brand-crm text-base sm:text-lg">{s.title}</span>
                      <span className="font-normal text-brand-crm/45 text-sm"> &middot; {s.originalArtist}</span>
                    </p>
                    {isNL(s) && (
                      <span className="font-stamp text-[9px] uppercase tracking-wider text-brand-tlbr border border-brand-tlbr/40 rounded px-1.5 py-0.5 shrink-0 self-center">
                        NL
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}
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
