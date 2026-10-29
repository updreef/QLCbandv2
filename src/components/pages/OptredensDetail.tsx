import { ArrowLeft, Calendar, MapPin, Clock, Star, Film } from "lucide-react";
import { liveMoments, type Show } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";
import EventRSVP from "../EventRSVP";

const DAYS = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const MONTHS = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

interface OptredensDetailProps {
  show: Show;
}

export default function OptredensDetail({ show }: OptredensDetailProps) {
  if (!show) {
    return (
      <div className="pt-36 pb-24 px-4 text-center min-h-screen">
        <h2 className="font-poster text-5xl text-brand-crm uppercase mb-4">Optreden niet gevonden</h2>
        <p className="text-brand-crm/60 mb-8">We konden het gevraagde optreden niet vinden.</p>
        <a
          href="/optredens"
          className="font-poster uppercase tracking-widest text-sm px-6 py-3 bg-brand-tlbr text-brand-base3 rounded-lg"
        >
          Terug naar optredens
        </a>
      </div>
    );
  }

  const showMoments = liveMoments.filter((m) => m.showSlug === show.slug);
  const isUpcoming = show.status === "upcoming";
  const d = new Date(show.date + "T00:00:00");
  const validDate = !isNaN(d.getTime());
  const dateLong = validDate ? `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : show.date;
  const rsvpDate = validDate ? `${d.getDate()} ${MONTHS[d.getMonth()]}` : "het feest";

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Terug */}
        <a
          href="/optredens"
          className="inline-flex items-center gap-2 font-stamp text-xs uppercase tracking-[0.18em] text-brand-tlbr mb-8 hover:text-brand-crm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Terug naar alle optredens
        </a>

        {/* Poster (full-width banner) */}
        {show.poster && (
          <img
            src={show.poster}
            alt={show.title}
            className="w-full rounded-2xl border border-brand-crm/15 mb-10 shadow-[10px_10px_0_0_#5d2a58]"
          />
        )}

        {/* Kop */}
        <span
          className={`font-stamp text-[11px] uppercase tracking-[0.2em] inline-block px-3 py-1.5 rounded ${
            isUpcoming ? "bg-brand-tlbr text-brand-base3" : "border border-brand-crm/25 text-brand-crm/70"
          }`}
        >
          {isUpcoming ? "Aankomend" : "Archief"}
        </span>
        <h1 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl md:text-7xl leading-[0.85] mt-4">
          {show.title}
        </h1>
        <SquiggleUnderline />

        {/* Info-chips */}
        <div className="flex flex-wrap gap-2.5 mt-5">
          <span className="inline-flex items-center gap-1.5 bg-brand-base2 border border-brand-crm/15 rounded-lg px-3 py-2 text-sm text-brand-crm">
            <Calendar className="w-4 h-4 text-brand-tlbr shrink-0" /> {dateLong}
          </span>
          {show.time && (
            <span className="inline-flex items-center gap-1.5 bg-brand-base2 border border-brand-crm/15 rounded-lg px-3 py-2 text-sm text-brand-crm">
              <Clock className="w-4 h-4 text-brand-tlbr shrink-0" /> {show.time}
            </span>
          )}
          {show.location && (
            <span className="inline-flex items-center gap-1.5 bg-brand-base2 border border-brand-crm/15 rounded-lg px-3 py-2 text-sm text-brand-crm">
              <MapPin className="w-4 h-4 text-brand-tlbr shrink-0" /> {show.location}
              {show.city ? `, ${show.city}` : ""}
            </span>
          )}
        </div>

        {/* Omschrijving */}
        <p className="text-brand-crm/75 leading-relaxed text-sm sm:text-base max-w-3xl mt-7">{show.description}</p>

        {/* Aanmelden + teller */}
        {show.rsvp && isUpcoming && (
          <div className="mt-8">
            <EventRSVP eventSlug={show.slug} dateLabel={rsvpDate} baseCount={show.slug === "feest-de-kuil" ? 28 : 0} />
          </div>
        )}

        {/* Highlights + praktisch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {show.highlights && (
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#5d2a58]">
              <h3 className="font-poster uppercase tracking-wider text-brand-crm text-2xl flex items-center gap-2">
                <Star className="w-5 h-5 text-brand-tlbr" /> {isUpcoming ? "Wat je kunt verwachten" : "Hoogtepunten"}
              </h3>
              <ul className="flex flex-col gap-2.5 mt-4">
                {show.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-brand-crm/80">
                    <span className="text-brand-pb font-bold leading-none mt-0.5">&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#1c857a] flex flex-col gap-4">
            <h3 className="font-poster uppercase tracking-wider text-brand-crm text-2xl">Praktisch</h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-brand-tlbr shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-crm">{show.location || "Locatie volgt"}</p>
                {show.address && <p className="text-xs text-brand-crm/55">{show.address}</p>}
                {show.city && <p className="text-xs text-brand-crm/55">{show.city}</p>}
              </div>
            </div>
            {show.time && (
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-brand-tlbr shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-crm">Tijd</p>
                  <p className="text-xs text-brand-crm/55">{show.time}</p>
                </div>
              </div>
            )}
            {isUpcoming && !show.rsvp && (
              <a
                href="/boek-ons"
                className="mt-1 text-center font-poster uppercase tracking-wider text-sm py-2.5 bg-brand-tlbr text-brand-base3 rounded-lg hover:bg-brand-crm transition-colors"
              >
                Boek ons voor jouw feest
              </a>
            )}
            {isUpcoming && show.rsvp && (
              <a
                href="#aanmelden"
                className="mt-1 text-center font-poster uppercase tracking-wider text-sm py-2.5 bg-brand-tlbr text-brand-base3 rounded-lg hover:bg-brand-crm transition-colors"
              >
                Meld je aan
              </a>
            )}
          </div>
        </div>

        {/* Live Moments */}
        {showMoments.length > 0 && (
          <div className="mt-12">
            <h3 className="font-poster uppercase tracking-wider text-brand-crm text-2xl flex items-center gap-2 mb-5">
              <Film className="w-5 h-5 text-brand-tlbr" /> Live moments
            </h3>
            <div className="flex flex-wrap gap-4">
              {showMoments.map((m) => (
                <figure
                  key={m.id}
                  className={`bg-brand-base3 border border-brand-crm/15 rounded-xl overflow-hidden shadow-[6px_6px_0_0_#5d2a58] ${
                    m.portrait ? "w-[calc(50%-0.5rem)] sm:w-[220px]" : "w-full sm:w-[380px]"
                  }`}
                >
                  <video
                    src={m.video}
                    poster={m.poster}
                    controls
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={`Quarter Life Crisis spelen ${m.title} live`}
                    className={`w-full ${m.portrait ? "aspect-[9/16]" : "aspect-video"} object-cover bg-brand-base3`}
                  />
                  <figcaption className="px-3 py-2 text-xs font-stamp uppercase tracking-widest text-brand-crm/80 border-t border-brand-crm/10">
                    {m.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
