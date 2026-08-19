"use client";

import { useRef } from "react";
import Link from "next/link";
import { Calendar, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { liveMoments, type Show } from "../../data";
import LazyVideo from "../LazyVideo";

const WEEKDAYS = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
const MONTHS = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
const SHOW_LABELS: Record<string, string> = { "bruiloft-te": "Bruiloft T&E", "backyard-sessions-1": "Backyard Sessions #1" };

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
      {/* 1. HERO — full-bleed video, rustige donkere overlay */}
      <section className="relative min-h-[86vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover object-[50%_35%]"
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
          {/* Donkere, rustige overlay zodat de tekst leesbaar blijft */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-base3/80 via-brand-base/60 to-brand-base3/90" />
          <div className="absolute inset-0 bg-brand-pd/20" />
          <div className="qlc-halftone absolute inset-0 opacity-20 mix-blend-soft-light" />
        </div>

        <div className="absolute top-4 right-4 z-20 font-stamp text-[10px] tracking-[0.16em] text-brand-crm/80 bg-brand-base3/70 border border-brand-crm/20 px-2 py-1">
          &#9654; LIVE
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-5xl mx-auto">
            <span className="qlc-stamp text-brand-tlbr -rotate-2 inline-block">
              Band &middot; Spakenburg / Amersfoort
            </span>
            <h1 className="font-poster uppercase text-brand-crm leading-[0.82] mt-5 mb-3 text-[clamp(3rem,10vw,7.5rem)] drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)]">
              <span className="block">Quarter</span>
              <span className="block">Life</span>
              <span className="block">Crisis</span>
            </h1>
            <p className="font-serif italic text-brand-tlbr text-xl sm:text-2xl">
              &ldquo;Play loud, grow up later&rdquo;
            </p>
            <div className="w-40 h-2 bg-brand-pb my-5" />
            <p className="text-brand-crm/80 max-w-xl text-sm sm:text-base leading-relaxed">
              Zes mannen midden twintig uit Spakenburg en Amersfoort. Ooit gestopt met muziek, nu weer helemaal terug. Covers, eigen werk en de energie die elke show nodig heeft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/boek-ons"
                className="font-poster uppercase text-lg tracking-wider px-8 py-3 bg-brand-pm text-brand-crm border-2 border-brand-crm/25 hover:bg-brand-pd hover:border-brand-tlbr transition-colors text-center"
              >
                Boek ons direct
              </Link>
              <Link
                href="/optredens"
                className="font-poster uppercase text-lg tracking-wider px-8 py-3 bg-transparent text-brand-tlbr border-2 border-brand-tlbr hover:bg-brand-tlbr hover:text-brand-base3 transition-colors text-center"
              >
                Bekijk shows
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee-lint (teal) */}
        <div className="absolute bottom-0 inset-x-0 z-10 bg-brand-tl border-t border-brand-base3 overflow-hidden">
          <div className="whitespace-nowrap flex gap-8 py-2 font-poster uppercase tracking-wider text-brand-crm">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-base">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="qlc-stamp text-brand-tlbr -rotate-2 inline-block">Aankomend optreden</span>
              <h2 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl mt-3">
                Volgende show in de <span className="text-brand-tlbr">schijnwerpers</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-[1fr_290px] bg-brand-base2 border border-brand-crm/15 shadow-[12px_12px_0_0_#1c857a]">
              {/* Havenpop: poster op de plek van de datum-stub. Andere shows: gewone stub. */}
              {upcomingShow.slug === "havenpop-2026" ? (
                <div className="overflow-hidden bg-brand-base3 lg:order-2">
                  <img
                    src="/images/havenpop-poster.jpg"
                    alt={upcomingShow.title}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              ) : (
                <div className="bg-brand-pd text-brand-crm p-7 flex flex-col justify-center gap-1 lg:order-2">
                  <span className="font-stamp text-sm tracking-[0.2em]">{WEEKDAYS[showDate.getDay()]}</span>
                  <span className="font-poster text-7xl leading-none text-brand-tlbr">{showDate.getDate()}</span>
                  <span className="font-stamp text-sm tracking-[0.2em]">{MONTHS[showDate.getMonth()]}</span>
                  <span className="font-stamp text-xs tracking-[0.2em] opacity-75">{showDate.getFullYear()}</span>
                  <span className="font-stamp text-xs tracking-[0.14em] opacity-80 mt-3">{upcomingShow.time}</span>
                </div>
              )}

              {/* Main */}
              <div className="relative p-7 border-t lg:border-t-0 lg:border-r border-dashed border-brand-crm/25 lg:order-1 lg:flex lg:flex-col lg:justify-center">
                <span className="absolute right-5 top-5 w-[70px] h-[70px] rounded-full border-2 border-brand-tlbr text-brand-tlbr -rotate-12 hidden sm:flex items-center justify-center text-center font-stamp text-[11px] leading-tight">
                  RSVP<br />NU
                </span>
                <h3 className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl pr-16">{upcomingShow.title}</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 my-2 font-stamp text-xs tracking-wide text-brand-tlbr">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{upcomingShow.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{upcomingShow.city}</span>
                </div>
                <p className="text-brand-crm/70 text-sm sm:text-base leading-relaxed max-w-2xl">{upcomingShow.description}</p>
                {upcomingShow.highlights && (
                  <div className="flex flex-wrap gap-2 my-4">
                    {upcomingShow.highlights.map((h, i) => (
                      <span key={i} className="font-stamp text-[11px] tracking-wide uppercase border border-dashed border-brand-crm/30 text-brand-crm/80 px-2.5 py-1.5 inline-flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-brand-tlbr" />{h}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/optredens/${upcomingShow.slug}`}
                  className="inline-block mt-1 font-poster uppercase tracking-wider text-base px-6 py-2.5 bg-brand-tlbr text-brand-base3 border-2 border-brand-tlbr hover:bg-transparent hover:text-brand-tlbr transition-colors"
                >
                  Meer details &amp; RSVP
                </Link>
              </div>
            </div>

            <div className="mt-5 font-stamp text-xs tracking-wide text-brand-crm/60 flex flex-wrap items-center gap-3">
              <span>Net gespeeld:</span>
              <span className="border border-brand-pb text-brand-pb px-2.5 py-1">Backyard Sessions #1 &mdash; bekijk de video&rsquo;s</span>
              <Link href="/optredens" className="border border-brand-tlbr text-brand-tlbr px-2.5 py-1 hover:bg-brand-tlbr hover:text-brand-base3 transition-colors">
                Alle optredens &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. OVER DE BAND (kort) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-base2 border-y border-brand-crm/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative justify-self-center lg:justify-self-start w-full max-w-md">
            <span className="absolute -top-3 right-10 z-10 w-24 h-6 bg-brand-tlbr/40 border border-brand-crm/20 rotate-6" />
            <img
              src="/images/band-live.jpg"
              alt="Quarter Life Crisis live op het podium"
              className="w-full object-cover border border-brand-crm/20 shadow-[12px_12px_0_0_#5d2a58] -rotate-2"
            />
          </div>
          <div>
            <span className="qlc-stamp text-brand-pb -rotate-2 inline-block">Wie we zijn</span>
            <h2 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl mt-3 leading-[0.9]">
              Zes mannen, een <span className="text-brand-tlbr">quarter life crisis</span>
            </h2>
            <p className="text-brand-crm/75 mt-4 leading-relaxed max-w-lg">
              Het begon zoals de beste ideeën beginnen: met een biertje in de tuin. Zes mannen, midden twintig, en die ene vraag die maar bleef hangen, waarom zijn we eigenlijk gestopt met muziek maken?
            </p>
            <blockquote className="font-serif italic text-brand-tlbr border-l-4 border-brand-pb pl-4 my-4 text-lg">
              Op onze 25e deden we wat we op onze 15e het allerliefst deden: herrie maken.
            </blockquote>
            <p className="text-brand-crm/75 leading-relaxed">En het voelde meteen weer als thuiskomen.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/over-ons" className="font-poster uppercase tracking-wider text-base px-6 py-2.5 bg-brand-pm text-brand-crm border-2 border-brand-crm/20 hover:bg-brand-pd hover:border-brand-tlbr transition-colors">
                Ons hele verhaal
              </Link>
              <Link href="/mannen" className="font-poster uppercase tracking-wider text-base px-6 py-2.5 bg-transparent text-brand-tlbr border-2 border-brand-tlbr hover:bg-brand-tlbr hover:text-brand-base3 transition-colors">
                De muzikanten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE IN BEELD — video-slider */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-base">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <span className="qlc-stamp text-brand-tlbr -rotate-2 inline-block">Van het podium</span>
          <h2 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl mt-3">
            QLC <span className="text-brand-tlbr">live in beeld</span>
          </h2>
          <p className="text-brand-crm/70 mt-2 max-w-xl mx-auto">Beelden van onze optredens &mdash; swipe erdoorheen.</p>
        </div>

        <div className="max-w-[1800px] mx-auto relative">
          <button
            onClick={() => scrollSlider(-1)}
            aria-label="Vorige"
            className="hidden md:flex absolute -left-3 top-[45%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-brand-crm/25 bg-brand-base2 text-brand-crm items-center justify-center hover:bg-brand-tlbr hover:text-brand-base3 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollSlider(1)}
            aria-label="Volgende"
            className="hidden md:flex absolute -right-3 top-[45%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-brand-crm/25 bg-brand-base2 text-brand-crm items-center justify-center hover:bg-brand-tlbr hover:text-brand-base3 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={sliderRef} className="flex gap-5 overflow-x-auto snap-x snap-proximity pb-5 px-1">
            {liveMoments.map((m) => (
              <div key={m.id} className="snap-center shrink-0 w-[88%] sm:w-[560px]">
                <div className="relative border border-brand-crm/20 shadow-[8px_8px_0_0_#5d2a58] overflow-hidden bg-brand-base3">
                  <LazyVideo src={m.video} poster={m.poster} className="w-full h-80 sm:h-96 object-cover" />
                  <span className="absolute left-3 bottom-3 font-stamp text-[11px] tracking-wide uppercase text-brand-crm bg-brand-base3/80 border border-brand-crm/25 px-2 py-1">
                    {m.title}
                    {m.showSlug && SHOW_LABELS[m.showSlug] ? ` · ${SHOW_LABELS[m.showSlug]}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-3 font-stamp text-xs tracking-wide text-brand-tlbr">
            &rarr; Meer beelden op{" "}
            <Link href="/optredens" className="underline">optredens</Link>
          </p>
        </div>
      </section>

      {/* 5. CTA — boeken (diep-paars accentmoment) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-pd text-brand-crm relative overflow-hidden">
        <div className="qlc-halftone absolute inset-0 opacity-15 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-poster uppercase text-brand-crm text-6xl sm:text-7xl leading-[0.9]">
            Maak van jouw evenement een <span className="text-brand-tlbr">knalfeest</span>
          </h2>
          <p className="text-brand-crm/80 max-w-xl mx-auto my-5 leading-relaxed">
            Feest, festival, bruiloft of bedrijfsevent? QLC komt langs met een uur live muziek, meezingers en de energie die elke show nodig heeft. Bel of mail voor beschikbaarheid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boek-ons" className="font-poster uppercase text-lg tracking-wider px-8 py-3.5 bg-brand-tlbr text-brand-base3 border-2 border-brand-tlbr hover:bg-transparent hover:text-brand-tlbr transition-colors">
              Vrijblijvend boeken
            </Link>
            <a href="tel:+31640081979" className="font-poster uppercase text-lg tracking-wider px-8 py-3.5 bg-transparent text-brand-crm border-2 border-brand-crm/60 hover:border-brand-crm transition-colors">
              Bel Julian
            </a>
          </div>
          <div className="mt-6 font-stamp text-xs tracking-wide text-brand-crm/70">
            Boekingen via Julian Hugenholtz: <span className="text-brand-tlbr font-semibold">+31 6 40 08 19 79</span>
          </div>
        </div>
      </section>
    </div>
  );
}
