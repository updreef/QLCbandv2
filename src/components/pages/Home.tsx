"use client";

import { useRef } from "react";
import Link from "next/link";
import { Calendar, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { liveMoments, type Show } from "../../data";
import LazyVideo from "../LazyVideo";

const WEEKDAYS = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
const MONTHS = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
const SHOW_LABELS: Record<string, string> = { "bruiloft-te": "Bruiloft T&E" };

export default function Home({ upcomingShow }: { upcomingShow?: Show }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 380), behavior: "smooth" });
  };

  const showDate = upcomingShow ? new Date(upcomingShow.date + "T00:00:00") : null;

  return (
    <div>
      {/* 1. HERO — full-bleed video */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden border-b-4 border-brand-ink">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/videos/hero/hero-movie.mp4" type="video/mp4" />
          </video>
          <div className="qlc-halftone absolute inset-0 opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-pd/60 via-brand-ink/45 to-brand-pd/75" />
        </div>

        <div className="absolute top-4 right-4 z-20 font-stamp text-[10px] tracking-[0.16em] text-brand-crm bg-brand-ink/60 border border-brand-crm/30 px-2 py-1">
          &#9654; LIVE
        </div>

        <div className="relative z-10 w-full text-center px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <span className="qlc-stamp text-brand-gold bg-brand-ink/25 -rotate-2 inline-block">
              Band &middot; Spakenburg / Amersfoort
            </span>
            <h1 className="font-poster uppercase text-brand-crm leading-[0.8] mt-5 mb-3 text-[clamp(3.5rem,12vw,9rem)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
              <span className="block">Quarter</span>
              <span className="block">Life</span>
              <span className="block">Crisis</span>
            </h1>
            <p className="font-serif italic text-brand-gold text-2xl sm:text-3xl mt-3">
              &ldquo;Play loud, grow up later&rdquo;
            </p>
            <div className="w-44 h-2 bg-brand-gold border-2 border-brand-ink mx-auto my-5" />
            <p className="text-brand-crm/90 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Zes mannen midden twintig uit Spakenburg en Amersfoort. Ooit gestopt met muziek, nu weer helemaal terug. Covers, eigen werk en de energie die elke show nodig heeft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/boek-ons"
                className="font-poster uppercase text-lg tracking-wider px-8 py-3 bg-brand-gold text-brand-ink border-2 border-brand-ink shadow-[5px_5px_0_0_#191319] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#191319] active:translate-y-0 transition-all"
              >
                Boek ons direct
              </Link>
              <Link
                href="/optredens"
                className="font-poster uppercase text-lg tracking-wider px-8 py-3 bg-transparent text-brand-crm border-2 border-brand-crm shadow-[5px_5px_0_0_#1c857a] hover:-translate-y-0.5 transition-all"
              >
                Bekijk shows
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee-lint */}
        <div className="absolute bottom-0 inset-x-0 z-10 bg-brand-tl border-t-2 border-brand-ink overflow-hidden">
          <div className="whitespace-nowrap flex gap-8 py-2.5 font-poster uppercase tracking-wider text-brand-crm">
            {Array(10)
              .fill("+++ Play loud, grow up later +++ Band uit Spakenburg & Amersfoort")
              .map((text, i) => (
                <span key={i} className="animate-marquee">
                  {text}
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* 2. SPOTLIGHT — aankomende show (ticket) */}
      {upcomingShow && showDate && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-paper">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="qlc-stamp text-brand-tl -rotate-2 inline-block">Aankomend optreden</span>
              <h2 className="font-poster uppercase text-brand-ink text-4xl sm:text-5xl mt-3">
                Volgende show in de <span className="text-brand-pm">schijnwerpers</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-[230px_1fr] bg-brand-paper2 border-2 border-brand-ink shadow-[12px_12px_0_0_#3c1138]">
              {/* Stub */}
              <div className="bg-brand-pd text-brand-crm p-7 flex flex-col justify-center gap-1">
                <span className="font-stamp text-sm tracking-[0.2em]">{WEEKDAYS[showDate.getDay()]}</span>
                <span className="font-poster text-6xl leading-none text-brand-gold">{showDate.getDate()}</span>
                <span className="font-stamp text-sm tracking-[0.2em]">{MONTHS[showDate.getMonth()]}</span>
                <span className="font-stamp text-xs tracking-[0.2em] opacity-80">{showDate.getFullYear()}</span>
                <span className="font-stamp text-xs tracking-[0.14em] opacity-85 mt-3">{upcomingShow.time}</span>
              </div>

              {/* Main */}
              <div className="relative p-7 border-t-2 border-dashed border-brand-ink lg:border-t-0 lg:border-l-2">
                <span className="qlc-notch hidden lg:block" style={{ background: "#f0eee9", left: "-10px", top: "-10px" }} />
                <span className="qlc-notch hidden lg:block" style={{ background: "#f0eee9", left: "-10px", bottom: "-10px" }} />
                <span className="absolute right-5 top-5 w-[70px] h-[70px] rounded-full border-2 border-brand-goldd text-brand-goldd -rotate-12 hidden sm:flex items-center justify-center text-center font-stamp text-[11px] leading-tight">
                  RSVP<br />NU
                </span>
                <h3 className="font-poster uppercase text-brand-ink text-3xl sm:text-4xl pr-16">{upcomingShow.title}</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 my-2 font-stamp text-xs tracking-wide text-brand-tl">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{upcomingShow.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{upcomingShow.city}</span>
                </div>
                <p className="text-brand-inksoft text-sm sm:text-base leading-relaxed max-w-2xl">{upcomingShow.description}</p>
                {upcomingShow.highlights && (
                  <div className="flex flex-wrap gap-2 my-4">
                    {upcomingShow.highlights.map((h, i) => (
                      <span key={i} className="font-stamp text-[11px] tracking-wide uppercase border border-dashed border-brand-ink px-2.5 py-1.5 bg-brand-paper inline-flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-brand-gold" />{h}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/optredens/${upcomingShow.slug}`}
                  className="inline-block mt-1 font-poster uppercase tracking-wider text-sm px-6 py-2.5 bg-brand-ink text-brand-crm border-2 border-brand-ink hover:bg-transparent hover:text-brand-ink transition-colors"
                >
                  Meer details &amp; RSVP
                </Link>
              </div>
            </div>

            <div className="mt-5 font-stamp text-xs tracking-wide text-brand-inksoft flex flex-wrap items-center gap-3">
              <span>Net gespeeld:</span>
              <span className="border border-brand-pm text-brand-pm px-2.5 py-1">Backyard Sessions #1 &mdash; video&rsquo;s volgen</span>
              <Link href="/optredens" className="border border-brand-tl text-brand-tl px-2.5 py-1 hover:bg-brand-tl hover:text-brand-crm transition-colors">
                Alle optredens &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. OVER DE BAND (kort) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lila border-y-4 border-brand-ink">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative justify-self-center lg:justify-self-start w-full max-w-md">
            <span className="absolute -top-3 right-10 z-10 w-24 h-6 bg-brand-tlbr/50 border border-white/40 rotate-6" />
            <img
              src="/images/band-live.jpg"
              alt="Quarter Life Crisis live op het podium"
              className="w-full object-cover border-2 border-brand-ink shadow-[12px_12px_0_0_#1c857a] -rotate-2"
            />
          </div>
          <div>
            <span className="qlc-stamp text-brand-goldd -rotate-2 inline-block">Wie we zijn</span>
            <h2 className="font-poster uppercase text-brand-ink text-4xl sm:text-5xl mt-3 leading-tight">
              Zes mannen, een <span className="text-brand-pm">quarter life crisis</span>
            </h2>
            <p className="text-brand-inksoft mt-4 leading-relaxed max-w-lg">
              Het begon zoals de beste ideeën beginnen: met een biertje in de tuin. Zes mannen, midden twintig, en die ene vraag die maar bleef hangen, waarom zijn we eigenlijk gestopt met muziek maken?
            </p>
            <blockquote className="font-serif italic text-brand-pm border-l-4 border-brand-gold pl-4 my-4 text-lg">
              Op onze 25e deden we wat we op onze 15e het allerliefst deden: herrie maken.
            </blockquote>
            <p className="text-brand-inksoft leading-relaxed">En het voelde meteen weer als thuiskomen.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/over-ons" className="font-poster uppercase tracking-wider text-sm px-6 py-2.5 bg-brand-pd text-brand-crm border-2 border-brand-ink shadow-[4px_4px_0_0_#191319] hover:-translate-y-0.5 transition-all">
                Ons hele verhaal
              </Link>
              <Link href="/mannen" className="font-poster uppercase tracking-wider text-sm px-6 py-2.5 bg-transparent text-brand-ink border-2 border-brand-ink hover:-translate-y-0.5 transition-all">
                De muzikanten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE IN BEELD — video-slider */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-paper">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <span className="qlc-stamp text-brand-tl -rotate-2 inline-block">Van het podium</span>
          <h2 className="font-poster uppercase text-brand-ink text-4xl sm:text-5xl mt-3">
            QLC <span className="text-brand-pm">live in beeld</span>
          </h2>
          <p className="text-brand-inksoft mt-2 max-w-xl mx-auto">Beelden van onze optredens &mdash; swipe erdoorheen.</p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <button
            onClick={() => scrollSlider(-1)}
            aria-label="Vorige"
            className="hidden md:flex absolute -left-3 top-[45%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-brand-ink bg-brand-paper text-brand-ink items-center justify-center shadow-[3px_3px_0_0_#5d2a58] hover:bg-brand-gold transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollSlider(1)}
            aria-label="Volgende"
            className="hidden md:flex absolute -right-3 top-[45%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-brand-ink bg-brand-paper text-brand-ink items-center justify-center shadow-[3px_3px_0_0_#5d2a58] hover:bg-brand-gold transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={sliderRef} className="flex gap-5 overflow-x-auto snap-x snap-proximity pb-5 px-1">
            {liveMoments.map((m) => (
              <div key={m.id} className="snap-center shrink-0 w-[80%] sm:w-[360px]">
                <div className="relative border-2 border-brand-ink shadow-[8px_8px_0_0_#5d2a58] overflow-hidden bg-brand-ink">
                  <LazyVideo src={m.video} poster={m.poster} className="w-full h-56 object-cover" />
                  <span className="absolute left-3 bottom-3 font-stamp text-[11px] tracking-wide uppercase text-brand-crm bg-brand-ink/75 border border-brand-crm/30 px-2 py-1">
                    {m.title}
                    {m.showSlug && SHOW_LABELS[m.showSlug] ? ` · ${SHOW_LABELS[m.showSlug]}` : ""}
                  </span>
                </div>
              </div>
            ))}
            {/* Backyard — komt eraan */}
            <div className="snap-center shrink-0 w-[80%] sm:w-[360px]">
              <div className="relative border-2 border-dashed border-brand-ink h-56 flex items-center justify-center text-center bg-brand-paper2">
                <div className="font-stamp text-xs tracking-wide text-brand-pm px-4">
                  Backyard Sessions #1<br />video&rsquo;s binnenkort
                </div>
              </div>
            </div>
          </div>
          <p className="text-center mt-3 font-stamp text-xs tracking-wide text-brand-tl">
            &rarr; Meer beelden op{" "}
            <Link href="/optredens" className="underline">optredens</Link>
          </p>
        </div>
      </section>

      {/* 5. CTA — boeken */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-pm text-brand-crm border-t-4 border-brand-ink relative overflow-hidden">
        <div className="qlc-halftone absolute inset-0 opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl leading-[0.95]">
            Maak van jouw evenement een <span className="text-brand-gold">knalfeest</span>
          </h2>
          <p className="text-brand-crm/90 max-w-xl mx-auto my-5 leading-relaxed">
            Feest, festival, bruiloft of bedrijfsevent? QLC komt langs met een uur live muziek, meezingers en de energie die elke show nodig heeft. Bel of mail voor beschikbaarheid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boek-ons" className="font-poster uppercase text-lg tracking-wider px-8 py-3.5 bg-brand-gold text-brand-ink border-2 border-brand-ink shadow-[5px_5px_0_0_#191319] hover:-translate-y-0.5 transition-all">
              Vrijblijvend boeken
            </Link>
            <a href="mailto:Ruben_beukers@outlook.com" className="font-poster uppercase text-lg tracking-wider px-8 py-3.5 bg-transparent text-brand-crm border-2 border-brand-crm shadow-[5px_5px_0_0_#3c1138] hover:-translate-y-0.5 transition-all">
              Stuur direct mail
            </a>
          </div>
          <div className="mt-6 font-stamp text-xs tracking-wide text-brand-crm/80">
            Of bel direct met Ruben Beukers op: <span className="text-brand-gold font-semibold">+31 6 40 42 00 54</span>
          </div>
        </div>
      </section>
    </div>
  );
}
