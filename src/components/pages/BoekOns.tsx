import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, Calendar, MapPin, Send, HelpCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import SquiggleUnderline from "../SquiggleUnderline";

export default function BoekOns() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    eventType: "kroeg",
    message: "",
  });

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
          subject: `Boekingsaanvraag: ${formData.eventType.toUpperCase()} - ${formData.date || 'Geen datum'}`,
          message: `Locatie: ${formData.location || 'Niet ingevuld'}\nDatum: ${formData.date || 'Niet ingevuld'}\nType Evenement: ${formData.eventType}\n\nBericht:\n${formData.message}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || "Bedankt! We hebben je aanvraag ontvangen en nemen snel contact met je op.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          location: "",
          eventType: "kroeg",
          message: "",
        });
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
            ROCKBAND BOEKEN
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Wil je de ultieme gitaarrock-ervaring op jouw feest, in je café of op je festival? Vul het formulier in voor een vrijblijvende offerte. We antwoorden binnen 24 uur!
          </p>
        </div>

        {/* Form and Side Info Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Booking Form (Left Side) */}
          <div className="lg:col-span-7 bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-10 rounded-2xl hard-shadow-cream card-rotate-left">
            <h2 className="font-display text-3xl text-brand-cream uppercase tracking-wider mb-6">
              AANVRAAGFORMULIER
            </h2>

            {/* Error & Success Feedback banners */}
            {success && (
              <div className="mb-6 p-4 bg-emerald-950/50 border-2 border-emerald-500 text-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Aanvraag succesvol verzonden!</p>
                  <p className="text-xs text-emerald-300/90 mt-1">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-brand-red/10 border-2 border-brand-red text-brand-text rounded-lg flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-brand-red mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Controleer het formulier</p>
                  <p className="text-xs text-brand-text-muted mt-1">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Jouw Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="bijv. Jan de Vries"
                    className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="bijv. jan@outlook.com"
                    className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="bijv. +31 6 12345678"
                    className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Datum van Evenement
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Event Location and Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Locatie (Stad / Adres)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="bijv. Spakenburg, Dorpsplein"
                    className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="eventType" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Type Evenement
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors"
                  >
                    <option value="kroeg">Café / Rockkroeg</option>
                    <option value="dorpsfeest">Dorpsfeest / Festival</option>
                    <option value="bruiloft">Bruiloft / Jubileum</option>
                    <option value="verjaardag">Verjaardag / Besloten feest</option>
                    <option value="tuinfeest">Tuinfeest / Backyard Session</option>
                    <option value="bedrijf">Bedrijfsfeest</option>
                    <option value="anders">Anders (geef details)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message / Description */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                  Details & Wensen *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Vertel ons meer over je evenement! Hoeveel gasten verwacht je? Wat is de geschatte speeltijd? Heb je specifieke verzoeknummers uit onze repertoirelijst?"
                  className="bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-4 py-2.5 rounded-lg text-sm text-brand-cream font-sans transition-colors resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 font-display uppercase text-lg sm:text-xl tracking-widest py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce cursor-pointer flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> VERZENDEN...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> VERZEND BOEKINGSAANVRAAG
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Quick Contact & Details (Right Side) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Rock-and-roll guitar cover image */}
            <div className="bg-brand-bg-3 border-3 border-brand-cream rounded-2xl overflow-hidden hard-shadow-red card-rotate-right">
              <img 
                src="/src/assets/images/booking_lead_1783405090426.jpg" 
                alt="QLC Electric Guitar Fender" 
                className="w-full h-56 object-cover border-b-2 border-brand-cream"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide">
                  WAT REGELLEN WIJ?
                </h3>
                <ul className="space-y-2 text-xs text-brand-text-muted font-sans pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-neon font-bold">•</span>
                    <span><strong>Geluidsinstallatie (PA):</strong> Inclusief hoogwaardige monitors en speakers voor tot 300 personen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-neon font-bold">•</span>
                    <span><strong>Lichtshow:</strong> Sfeervolle LED spots en rookmachine om de stage tot leven te wekken.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-neon font-bold">•</span>
                    <span><strong>Speeltijd:</strong> Standaard 2 sets van 60 min of 3 sets van 45 min, volledig flexibel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-neon font-bold">•</span>
                    <span><strong>Pauze-muziek:</strong> We draaien passende rock-playlists voor en na onze sets en in de pauzes.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Contact fallback info block */}
            <div className="bg-brand-bg-2 border-2 border-brand-cream p-6 rounded-xl hard-shadow-neon flex flex-col gap-4">
              <h3 className="font-display text-xl text-brand-amber uppercase tracking-wider">
                RECHTSTREEKS CONTACT
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Wil je liever meteen bellen of direct een e-mail sturen naar onze boekingcoördinator? Geen probleem!
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

            {/* FAQ Helper inside Booking */}
            <div className="border border-brand-cream/10 p-5 rounded-lg bg-brand-bg-3 text-xs leading-relaxed">
              <h4 className="font-bold text-brand-cream mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-amber" /> Veelgestelde boekingvragen:
              </h4>
              <p className="text-brand-text-muted mb-2">
                <strong>Hoeveel kost het om QLC te boeken?</strong><br/>
                De prijs hangt af van de reistijd, speelduur, de benodigde geluidsinstallatie en lichten. Neem contact op voor een op-maat-gemaakte offerte!
              </p>
              <p className="text-brand-text-muted">
                <strong>Kunnen we een specifiek nummer aanvragen?</strong><br/>
                Ja! We studeren met plezier een speciaal gitaarnummer in (bijvoorbeeld voor een openingsdans op een bruiloft). Geef dit tijdig aan.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
