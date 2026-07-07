import { motion } from "motion/react";
import { Calendar, Music, ArrowRight, Play, Star, MapPin } from "lucide-react";
import { shows, repertoire } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

export default function Home() {
  const upcomingShow = shows.find((s) => s.status === "upcoming");

  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-bg-3 overflow-hidden border-b-4 border-brand-cream">
        {/* Background video with dark overlay */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/videos/hero/hero-movie.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-brand-bg-3/60" />
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Stamp badge */}
            <div className="bg-brand-red text-white text-xs font-mono px-3 py-1 uppercase tracking-[0.2em] border-2 border-brand-cream hard-shadow-neon rotate-[-3deg] mb-6">
              ROCKBAND · SPAKENBURG / AMERSFOORT
            </div>

            {/* Title display */}
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl tracking-[0.05em] uppercase text-brand-cream leading-none">
              QUARTER <span className="text-brand-amber text-stroke">LIFE</span> <br/>
              CRISIS
            </h1>

            {/* Slogan */}
            <p className="font-display uppercase text-2xl sm:text-3xl tracking-[0.25em] text-brand-neon mt-4">
              Play loud, grow up later
            </p>

            <div className="w-48 h-1.5 bg-brand-red mt-4 border border-brand-cream rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

            {/* Paragraph Description */}
            <p className="text-brand-text-muted max-w-2xl mt-6 text-sm sm:text-base leading-relaxed font-sans">
              Zes mannen midden twintig uit Spakenburg en Amersfoort. Ooit gestopt met muziek, nu weer helemaal terug. Covers, eigen werk en de energie die elke show nodig heeft.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10">
              <a 
                href="#/boek-ons" 
                className="font-display uppercase text-lg sm:text-xl tracking-[0.15em] px-8 py-3 bg-brand-amber text-brand-bg-3 font-bold border-3 border-brand-cream hard-shadow-cream hover-bounce"
              >
                BOEK ONS DIRECT!
              </a>
              <a 
                href="#/optredens" 
                className="font-display uppercase text-lg sm:text-xl tracking-[0.15em] px-8 py-3 bg-transparent text-brand-cream font-bold border-3 border-brand-cream hover:border-brand-neon hover:text-brand-neon hover-bounce"
              >
                BEKIJK SHOWS
              </a>
            </div>
          </motion.div>
        </div>

        {/* Diagonal Ribbon styling */}
        <div className="absolute bottom-0 right-0 left-0 bg-brand-red border-y-3 border-brand-cream py-3 overflow-hidden select-none transform rotate-[1deg] translate-y-2 origin-bottom-right hidden md:block">
          <div className="whitespace-nowrap flex gap-8 font-display uppercase tracking-widest text-lg text-white">
            {Array(10).fill("+++ PLAY LOUD, GROW UP LATER +++ ROCKBAND UIT SPAKENBURG & AMERSFOORT +++").map((text, i) => (
              <span key={i} className="animate-marquee">{text}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Upcoming Show Spotlight Section */}
      {upcomingShow && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-bg relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center md:text-left mb-12">
              <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">KOMSTIGE OPTREDENS</p>
              <h2 className="font-display text-4xl sm:text-5xl text-brand-cream uppercase tracking-wide">
                VOLGENDE SHOW IN DE SCHIJNWERPERS
              </h2>
              <SquiggleUnderline className="mx-auto md:mx-0" />
            </div>

            {/* Spotlight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-10 rounded-2xl hard-shadow-red card-rotate-left">
              {/* Card Image */}
              <div className="lg:col-span-5 relative group overflow-hidden border-2 border-brand-cream rounded-xl">
                <img 
                  src={upcomingShow.image} 
                  alt={upcomingShow.title} 
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 border-2 border-brand-cream">
                  AANSTAANDE
                </div>
              </div>

              {/* Card Content */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-brand-amber font-mono uppercase bg-brand-bg-3 border border-brand-cream/10 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" /> {upcomingShow.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-brand-neon font-mono uppercase bg-brand-bg-3 border border-brand-cream/10 px-3 py-1 rounded-full">
                    <MapPin className="w-3.5 h-3.5" /> {upcomingShow.city}
                  </span>
                </div>

                <h3 className="font-display text-4xl text-brand-cream tracking-wide uppercase leading-tight">
                  {upcomingShow.title}
                </h3>
                
                <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed">
                  {upcomingShow.description}
                </p>

                {/* Highlights List */}
                {upcomingShow.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                    {upcomingShow.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 bg-brand-bg-3 border border-brand-cream/10 px-3 py-2 rounded-lg">
                        <Star className="w-4 h-4 text-brand-amber fill-brand-amber" />
                        <span className="text-xs font-semibold">{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action button inside card */}
                <div className="flex flex-wrap gap-4 mt-2">
                  <a 
                    href={`#/optredens/${upcomingShow.slug}`}
                    className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-cream text-brand-bg border-2 border-brand-cream hover:bg-transparent hover:text-brand-cream transition-colors duration-300"
                  >
                    MEER DETAILS & RSVP
                  </a>
                  <a 
                    href="#/optredens" 
                    className="flex items-center gap-1 text-sm text-brand-neon font-mono uppercase hover:underline py-2"
                  >
                    Al onze optredens <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. About Brief Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-bg-3 relative overflow-hidden border-t-4 border-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side: Photo with organic custom blob style */}
            <div className="relative justify-self-center lg:justify-self-start">
              <div className="absolute -inset-2 bg-brand-neon blob-about-photo border-3 border-brand-cream rotate-[2deg] -z-10" />
              <img
                src="/images/band-live.jpg"
                alt="Quarter Life Crisis live op het podium"
                className="w-full max-w-md object-cover blob-about-photo border-3 border-brand-cream hard-shadow-red"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right side: Story brief */}
            <div className="flex flex-col gap-6">
              <p className="text-brand-red font-mono uppercase text-xs tracking-[0.25em]">WIE WE ZIJN</p>
              <h2 className="font-display text-4xl sm:text-5xl text-brand-cream uppercase tracking-wider leading-tight">
                ZES MANNEN, EEN <span className="text-brand-amber">QUARTER LIFE CRISIS</span>
              </h2>
              <SquiggleUnderline />

              <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-4">
                Het begon zoals de beste ideeën beginnen: met een biertje in de tuin. Zes mannen, midden twintig, en die ene vraag die maar bleef hangen, waarom zijn we eigenlijk gestopt met muziek maken?
              </p>

              <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed">
                Op onze 25e deden we wat we op onze 15e het allerliefst deden: herrie maken. En het voelde meteen weer als thuiskomen.
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <a 
                  href="#/over-ons" 
                  className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-red text-white border-2 border-brand-cream hard-shadow-cream hover-bounce"
                >
                  ONS HELE VERHAAL
                </a>
                <a 
                  href="#/mannen" 
                  className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-bg-2 text-brand-cream border-2 border-brand-cream hover-bounce"
                >
                  DE MUZIKANTEN
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Live Audio/Video Teaser with Music tracks */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-bg relative overflow-hidden border-t-4 border-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">WAT SPELEN WIJ?</p>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-cream uppercase tracking-wider">
              REPERTOIRE HOOGTEPUNTEN
            </h2>
            <SquiggleUnderline className="mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Repertoire Tracklist */}
            <div className="bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-8 rounded-2xl hard-shadow-cream">
              <h3 className="font-display text-2xl text-brand-amber tracking-wider uppercase mb-6 flex items-center gap-2">
                <Music className="w-5 h-5" /> RECENT IN DE SETLIST
              </h3>
              <div className="divide-y divide-brand-cream/10">
                {repertoire.slice(0, 5).map((song, i) => (
                  <div key={song.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-brand-cream text-sm sm:text-base">{song.title}</h4>
                      <p className="text-xs text-brand-text-muted">{song.originalArtist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-brand-red bg-brand-bg-3 border border-brand-cream/10 px-2.5 py-1 uppercase rounded">
                        SETLIST #{i+1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-brand-cream/10 text-center">
                <a 
                  href="#/muziek" 
                  className="font-display uppercase text-sm tracking-wider text-brand-neon hover:underline inline-flex items-center gap-1"
                >
                  Bekijk volledige repertoirelijst & media <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Live Atmosphere Pitch Card */}
            <div className="bg-brand-bg-3 border-3 border-brand-cream p-6 sm:p-8 rounded-2xl hard-shadow-red card-rotate-right flex flex-col gap-6">
              <h3 className="font-display text-2xl text-brand-red tracking-wider uppercase flex items-center gap-2">
                LIVE OP HET PODIUM
              </h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                Elektrisch, akoestisch, bas, drums, piano, zang. Zes muzikanten die van jongs af aan altijd al muziek maakten en op hun 25e besloten dat ze er nooit meer mee zouden stoppen. Verwacht rockcovers met eigen kop, meezingers en een uur lang volle bak energie.
              </p>
              <div className="border border-brand-cream/10 rounded-lg p-4 bg-brand-bg-2/30 flex items-center gap-4">
                <div className="bg-brand-amber p-3 border-2 border-brand-cream text-brand-bg-3 shadow-[2px_2px_0_0_#f1f1f1]">
                  <Play className="w-5 h-5 fill-brand-bg-3" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Setlist & muziek</h4>
                  <p className="text-xs text-brand-text-muted">Bekijk het volledige repertoire op de muziekpagina.</p>
                </div>
              </div>
              <a
                href="#/muziek"
                className="font-display uppercase tracking-widest text-center text-sm py-3 bg-brand-cream text-brand-bg border-2 border-brand-cream font-bold hover:bg-transparent hover:text-brand-cream transition-colors"
              >
                BEKIJK DE SETLIST
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action section for Booking */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-bg-3 via-brand-bg-2 to-brand-bg border-t-4 border-brand-cream relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider mb-4">
            MAAK VAN JOUW EVENEMENT EEN <span className="text-brand-amber">ROCKFEEST</span>
          </h2>
          <p className="text-brand-text-muted max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Feest, festival, bruiloft of bedrijfsevent? QLC komt langs met een uur live rock, meezingers en de energie die elke show nodig heeft. Bel of mail voor beschikbaarheid.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a 
              href="#/boek-ons" 
              className="font-display uppercase text-lg sm:text-xl tracking-widest px-8 py-4 bg-brand-red text-white border-3 border-brand-cream hard-shadow-cream hover-bounce"
            >
              VRIJBLIJVEND BOEKEN!
            </a>
            <a 
              href="mailto:Ruben_beukers@outlook.com" 
              className="font-display uppercase text-lg sm:text-xl tracking-widest px-8 py-4 bg-brand-bg-3 text-brand-cream border-3 border-brand-cream hover-bounce"
            >
              STUUR DIRECT MAIL
            </a>
          </div>
          <div className="mt-8 text-xs font-mono text-brand-text-muted">
            Of bel direct met Ruben Beukers op: <span className="text-brand-neon font-bold">+31 6 40 42 00 54</span>
          </div>
        </div>
      </section>
    </div>
  );
}
