"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";
import SquiggleUnderline from "../SquiggleUnderline";

const EVENT_TYPES = [
  { value: "bruiloft", label: "Bruiloft / Jubileum" },
  { value: "verjaardag", label: "Verjaardag / Besloten feest" },
  { value: "tuinfeest", label: "Tuinfeest / Backyard" },
  { value: "kroeg", label: "Café / Rockkroeg" },
  { value: "bedrijf", label: "Bedrijfsfeest" },
  { value: "festival", label: "Festival / Dorpsfeest" },
  { value: "anders", label: "Anders (vertel in bericht)" },
];

const DURATIONS = [
  { value: "1x45", label: "1 set van 45 min" },
  { value: "1x60", label: "1 set van 60 min" },
  { value: "2x45", label: "2 sets van 45 min" },
  { value: "2x60", label: "2 sets van 60 min" },
  { value: "3x45", label: "3 sets van 45 min" },
  { value: "anders", label: "Anders / in overleg" },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  location: "",
  eventType: "bruiloft",
  guestCount: "",
  duration: "2x45",
  musicPref: "",
  paProvided: "unknown",
  indoorOutdoor: "onbekend",
  message: "",
};

export default function BoekOns() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError("Naam, e-mailadres en bericht zijn verplicht.");
      setLoading(false);
      return;
    }

    const eventLabel = EVENT_TYPES.find((t) => t.value === formData.eventType)?.label ?? formData.eventType;
    const durationLabel = DURATIONS.find((d) => d.value === formData.duration)?.label ?? formData.duration;
    const paLabel = formData.paProvided === "yes" ? "Ja, locatie heeft PA" : formData.paProvided === "no" ? "Nee, wij moeten PA regelen (extern)" : "Onbekend";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Boekingsaanvraag: ${eventLabel} — ${formData.date || "Geen datum"}`,
          message: [
            `Type evenement:  ${eventLabel}`,
            `Datum:           ${formData.date || "-"}`,
            `Locatie:         ${formData.location || "-"}`,
            `Indoor/outdoor:  ${formData.indoorOutdoor}`,
            `Aantal gasten:   ${formData.guestCount || "-"}`,
            `Gewenste speeltijd: ${durationLabel}`,
            `Geluidsinstallatie op locatie: ${paLabel}`,
            ``,
            `Muziek / stijl / verzoeknummers:`,
            formData.musicPref || "-",
            ``,
            `Verdere details:`,
            formData.message,
          ].join("\n"),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || "Bedankt! We hebben je aanvraag ontvangen en nemen snel contact met je op.");
        setFormData(initialForm);
      } else {
        setError(result.error || "Er is iets misgegaan. Probeer het later opnieuw.");
      }
    } catch (err) {
      setError("Netwerkfout. Controleer je verbinding en probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">BOEKINGEN & OFFERTES</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            BOEK QLC
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Bruiloft, tuinfeest, café of festival? Vul het intake-formulier in dan sturen we binnen 24 uur een vrijblijvende offerte terug. Hoe meer je invult, hoe scherper we de show kunnen afstemmen.
          </p>
        </div>

        {/* Form + Side Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Booking Form */}
          <div className="lg:col-span-7 bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-10 rounded-2xl hard-shadow-cream card-rotate-left">
            <h2 className="font-display text-3xl text-brand-cream uppercase tracking-wider mb-6">
              INTAKE
            </h2>

            {/* Feedback banners */}
            {success && (
              <div className="mb-6 p-4 bg-emerald-950/50 border-2 border-emerald-500 text-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Aanvraag verzonden!</p>
                  <p className="text-xs text-emerald-300/90 mt-1">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-brand-red/10 border-2 border-brand-red text-brand-text rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-brand-red mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Controleer het formulier</p>
                  <p className="text-xs text-brand-text-muted mt-1">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* --- Contact --- */}
              <Fieldset title="Contact">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Jouw naam *" name="name" required>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="bijv. Jan de Vries" className={inputClass} />
                  </Field>
                  <Field label="E-mailadres *" name="email" required>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jan@voorbeeld.nl" className={inputClass} />
                  </Field>
                </div>
                <Field label="Telefoonnummer" name="phone">
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78" className={inputClass} />
                </Field>
              </Fieldset>

              {/* --- Event --- */}
              <Fieldset title="Het evenement">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Type evenement" name="eventType">
                    <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} className={inputClass}>
                      {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Datum" name="date">
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Locatie (stad / adres)" name="location">
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="bijv. Spakenburg, Scholekster 57" className={inputClass} />
                  </Field>
                  <Field label="Aantal gasten" name="guestCount">
                    <input type="number" min={1} id="guestCount" name="guestCount" value={formData.guestCount} onChange={handleChange} placeholder="bijv. 80" className={inputClass} />
                  </Field>
                </div>
                <Field label="Speelplek" name="indoorOutdoor">
                  <div className="flex flex-wrap gap-3 mt-1">
                    {[
                      { v: "binnen", l: "Binnen" },
                      { v: "buiten", l: "Buiten (tuin/festival)" },
                      { v: "beide", l: "Beide" },
                      { v: "onbekend", l: "Weet ik nog niet" },
                    ].map((o) => (
                      <label key={o.v} className={`text-xs font-mono cursor-pointer px-3 py-2 border-2 rounded-lg transition-colors ${formData.indoorOutdoor === o.v ? "border-brand-neon text-brand-neon bg-brand-neon/10" : "border-brand-cream/20 text-brand-text-muted hover:border-brand-cream/40"}`}>
                        <input type="radio" name="indoorOutdoor" value={o.v} checked={formData.indoorOutdoor === o.v} onChange={handleChange} className="sr-only" />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </Field>
              </Fieldset>

              {/* --- Show --- */}
              <Fieldset title="De show">
                <Field label="Gewenste speeltijd" name="duration">
                  <select id="duration" name="duration" value={formData.duration} onChange={handleChange} className={inputClass}>
                    {DURATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </Field>
                <Field label="Muziekvoorkeur / stijl / verzoeknummers" name="musicPref">
                  <textarea id="musicPref" name="musicPref" rows={3} value={formData.musicPref} onChange={handleChange} placeholder="Bijv. veel meezingers, geen te harde metal, verzoeknummer 'Chelsea Dagger' voor de dansvloer" className={inputClass + " resize-y"} />
                </Field>
              </Fieldset>

              {/* --- Techniek --- */}
              <Fieldset title="Techniek op locatie">
                <div className="p-4 bg-brand-bg-3 border border-brand-amber/40 rounded-lg flex items-start gap-3">
                  <Info className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-text-muted leading-relaxed">
                    <strong className="text-brand-cream">Belangrijk:</strong> QLC brengt zelf gitaren, bas, drumstel, keys, mixer en in-ear monitoring mee.
                    Een <strong>PA / geluidsinstallatie voor het publiek</strong> regel je zelf (of we schakelen samen een externe partij in).
                  </p>
                </div>
                <Field label="Is er een PA / geluidsinstallatie op locatie?" name="paProvided">
                  <div className="flex flex-wrap gap-3 mt-1">
                    {[
                      { v: "yes", l: "Ja, aanwezig" },
                      { v: "no", l: "Nee, moet nog geregeld worden" },
                      { v: "unknown", l: "Weet ik niet zeker" },
                    ].map((o) => (
                      <label key={o.v} className={`text-xs font-mono cursor-pointer px-3 py-2 border-2 rounded-lg transition-colors ${formData.paProvided === o.v ? "border-brand-amber text-brand-amber bg-brand-amber/10" : "border-brand-cream/20 text-brand-text-muted hover:border-brand-cream/40"}`}>
                        <input type="radio" name="paProvided" value={o.v} checked={formData.paProvided === o.v} onChange={handleChange} className="sr-only" />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </Field>
              </Fieldset>

              {/* --- Bijzonderheden --- */}
              <Fieldset title="Verder nog iets?">
                <Field label="Bijzonderheden / vragen *" name="message" required>
                  <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Extra info over de gasten, de sfeer, de openingsdans, iets waar we rekening mee moeten houden..." className={inputClass + " resize-y"} />
                </Field>
              </Fieldset>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 font-display uppercase text-lg sm:text-xl tracking-widest py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce cursor-pointer flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> VERZENDEN...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> VERSTUUR AANVRAAG
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Side info */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Wat regelen wij vs jij */}
            <div className="bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden hard-shadow-red card-rotate-right">
              <img
                src="/images/band-live.jpg"
                alt="Quarter Life Crisis live"
                className="w-full h-56 object-cover border-b-2 border-brand-cream"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 flex flex-col gap-5">
                <div>
                  <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide">Wat brengt QLC mee?</h3>
                  <ul className="mt-3 space-y-2 text-xs text-brand-text-muted font-sans">
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Zes muzikanten: zang, gitaren, bas, drums, piano/keys</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Eigen instrumenten en backline</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Mixer en in-ear monitoring voor de band zelf</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Setlist, plus ruimte voor jouw verzoeknummers</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Pauze-muziek via de PA (rockplaylists)</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg text-brand-amber uppercase tracking-wide">Wat regel je zelf?</h3>
                  <ul className="mt-3 space-y-2 text-xs text-brand-text-muted font-sans">
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span><strong className="text-brand-cream">PA / geluidsinstallatie</strong> voor het publiek (of samen extern regelen)</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Podium of speelplek van min. ~4×3 m</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Stroom: minimaal 2 aparte groepen dichtbij het podium</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Verlichting (basis is genoeg, sfeer mag zelf)</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Bij buitenfeest: overkapping ivm regen</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Direct contact */}
            <div className="bg-brand-bg-2 border-2 border-brand-cream p-6 rounded-xl hard-shadow-cyan flex flex-col gap-4">
              <h3 className="font-display text-xl text-brand-amber uppercase tracking-wider">RECHTSTREEKS CONTACT</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Liever bellen of mailen? Ruben regelt de boekingen.
              </p>
              <div className="flex flex-col gap-3 font-mono text-xs mt-1">
                <a href="mailto:Ruben_beukers@outlook.com" className="flex items-center gap-2 text-brand-cream hover:text-brand-neon transition-colors">
                  <Mail className="w-4 h-4 text-brand-red" /> Ruben_beukers@outlook.com
                </a>
                <a href="tel:+31640420054" className="flex items-center gap-2 text-brand-cream hover:text-brand-neon transition-colors">
                  <Phone className="w-4 h-4 text-brand-amber" /> +31 6 40 42 00 54
                </a>
                <div className="flex items-center gap-2 text-brand-text-muted">
                  <MapPin className="w-4 h-4 text-brand-neon" /> Spakenburg / Amersfoort, NL
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="border border-brand-cream/10 p-5 rounded-lg bg-brand-bg-3 text-xs leading-relaxed">
              <h4 className="font-bold text-brand-cream mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-amber" /> Veelgestelde vragen
              </h4>
              <p className="text-brand-text-muted mb-3">
                <strong>Wat kost het om QLC te boeken?</strong><br/>
                Hangt af van speeltijd, reistijd en of we een PA moeten inhuren. Vraag een vrijblijvende offerte aan via het formulier.
              </p>
              <p className="text-brand-text-muted">
                <strong>Kan ik een verzoeknummer aanvragen?</strong><br/>
                Ja, geef het door in het intake-formulier. We nemen 'em graag mee in de repetitie.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

const inputClass = "bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors w-full";

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 pt-2 border-t border-brand-cream/10 first:border-t-0 first:pt-0">
      <legend className="font-display uppercase tracking-[0.25em] text-xs text-brand-neon mb-1">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, name, children }: { label: string; name: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
