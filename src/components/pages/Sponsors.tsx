import { Users, Image as ImageIcon, Megaphone, Percent, Check, Crown, Mail, Phone, ArrowRight, CreditCard } from "lucide-react";
import SquiggleUnderline from "../SquiggleUnderline";

const SPONSOR_EMAIL = "hugenholtzjulian@gmail.com";

/**
 * Betaallinks per pakket — een JAARLIJKS ABONNEMENT (recurring) via Mollie of
 * Stripe: een Payment/Subscription Link die na de eerste iDEAL-betaling een
 * machtiging aanmaakt en daarna elk jaar automatisch afschrijft (opzegbaar).
 * Leeg = nog niet actief: de knop valt dan terug op aanmelden via e-mail.
 * Vul deze zodra de vereniging (KvK + zakelijke bankrekening) én het
 * Mollie/Stripe-account er zijn. Alleen Vriend & Brons zijn bedoeld voor
 * directe (abonnements)betaling; Zilver en hoger gaan via een aanvraag.
 */
const CHECKOUT: Record<string, string> = {
  Vriend: "", // Mollie/Stripe subscription link — €100/jaar, recurring
  Brons: "",  // Mollie/Stripe subscription link — €250/jaar, recurring
};

/**
 * Zichtbaarheid van tarieven.
 * false = alleen Vriend & Brons tonen een prijs; Zilver/Goud/Hoofdsponsor staan
 * op "prijs op aanvraag" (details + tarieven in de sponsor-flyer/voorstel).
 * true  = alle tarieven volledig transparant op de site.
 */
const SHOW_ALL_PRICES = false;

// Jaarbedrag hoofdsponsor (wordt alleen getoond als SHOW_ALL_PRICES = true).
const HOOFD_PRICE = "€2.500";

function sponsorMailto(pakket: string) {
  const subject = encodeURIComponent(`Sponsoring QLC — ${pakket}`);
  const body = encodeURIComponent(
    `Hoi Julian,\n\nWij willen graag sponsor worden van Quarter Life Crisis (pakket ${pakket}).\n\nBedrijf:\nContactpersoon:\nTelefoon:\nE-mail:\n\nGroet,`
  );
  return `mailto:${SPONSOR_EMAIL}?subject=${subject}&body=${body}`;
}

const WAAROM = [
  { icon: Users, title: "Live voor de regio", text: "Zo'n tien optredens per jaar voor een paar honderd man in Spakenburg, Amersfoort en omstreken." },
  { icon: ImageIcon, title: "Op het podiumdoek", text: "Je logo op ons doek achter de band — en dus op elke foto en video van de avond." },
  { icon: Megaphone, title: "Socials & site", text: "Vermelding op onze actieve socials en op quarterlifecrisis.nl, het hele jaar door." },
  { icon: Percent, title: "Korting op een optreden", text: "Personeelsfeest? Als sponsor spelen we bij jullie met korting — of inbegrepen." },
];

type Tier = {
  name: string;
  price: string;
  plekken: string;
  looptijd: string;
  direct: boolean; // true = direct online af te rekenen (lage pakketten)
  benefits: string[];
};

const TIERS: Tier[] = [
  {
    name: "Vriend",
    price: "€100",
    plekken: "onbeperkt",
    looptijd: "1 jaar",
    direct: true,
    benefits: [
      "Naam op de sponsorpagina",
      "Vermelding in onze jaarlijkse bedank-post & -video",
    ],
  },
  {
    name: "Brons",
    price: "€250",
    plekken: "max. 8",
    looptijd: "2 jaar",
    direct: true,
    benefits: [
      "Alles van Vriend, plus:",
      "Logo mét link op de sponsorpagina",
      "2 plekken op de gastenlijst bij een optreden in de regio",
      "Persoonlijke shout-out vanaf het podium (1× per jaar)",
    ],
  },
  {
    name: "Zilver",
    price: "€500",
    plekken: "max. 5",
    looptijd: "2 jaar",
    direct: false,
    benefits: [
      "Alles van Brons, plus:",
      "Je logo op ons podiumdoek — op elke foto & video",
      "Logo op flyers & posters",
      "Naamsvermelding bij elk optreden",
      "Korting op een optreden voor je personeelsfeest",
    ],
  },
  {
    name: "Goud",
    price: "€1.000",
    plekken: "max. 3",
    looptijd: "2 jaar",
    direct: false,
    benefits: [
      "Alles van Zilver, plus:",
      "Logo in de footer van de site",
      "Groot logo op het doek",
      "Logo in onze videocontent (aftermovies)",
      "Branche-exclusiviteit in de regio",
      "VIP: kijkje achter de schermen bij een show",
    ],
  },
];

const HOOFD_BENEFITS = [
  "Als enige groot bovenaan op het podiumdoek",
  "Naamskoppeling: “QLC powered by …”",
  "Logo in de footer, op flyers, posters en videocontent",
  "Genoemd in onze jaarlijkse bedank-post & -video",
  "Eén optreden inbegrepen (bijv. jullie bedrijfsfeest)",
  "Branche-exclusiviteit in de regio",
];

export default function Sponsors() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <p className="font-stamp text-brand-tlbr uppercase text-xs tracking-[0.28em]">
            Sponsoring &middot; Quarter Life Crisis
          </p>
          <h1 className="font-poster uppercase text-brand-crm text-6xl sm:text-7xl mt-2 leading-[0.85]">
            Word sponsor
          </h1>
          <SquiggleUnderline />
          <p className="text-brand-crm/70 mt-6 text-sm sm:text-base leading-relaxed">
            Zes man, versterkers open, zo&rsquo;n tien keer per jaar volle bak voor honderden mensen in
            de regio. Als sponsor sta je daar het hele jaar bij &mdash; je logo op ons podiumdoek, op
            onze socials en op deze site. Reclame op de leukste plek van de avond, en je houdt live
            muziek in de buurt levend.{" "}
            <span className="text-brand-crm">Vriend en Brons regel je direct online</span>; de grotere
            pakketten gaan via een korte aanvraag.
          </p>
        </div>

        {/* Waarom sponsoren */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {WAAROM.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 flex flex-col gap-3 shadow-[6px_6px_0_0_#5d2a58]">
              <div className="w-11 h-11 rounded-xl bg-brand-pd flex items-center justify-center border border-brand-crm/15">
                <Icon className="w-5 h-5 text-brand-tlbr" />
              </div>
              <h3 className="font-poster uppercase tracking-wider text-brand-crm text-xl leading-none">{title}</h3>
              <p className="text-xs text-brand-crm/60 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Pakketten */}
        <div className="flex items-center gap-4 mb-3">
          <h2 className="font-poster uppercase text-brand-crm text-3xl sm:text-4xl tracking-[0.12em]">De pakketten</h2>
          <span className="flex-1 h-0.5 bg-gradient-to-r from-brand-pb to-transparent" />
        </div>
        <p className="text-xs text-brand-crm/50 mb-8">Vriend &amp; Brons regel je direct online &mdash; tarief per jaar zichtbaar, loopt automatisch door en is <span className="text-brand-crm/70">altijd opzegbaar</span>. Zilver en hoger stemmen we op maat af (beperkte plekken &amp; branche-exclusiviteit); die tarieven bespreken we in een persoonlijk voorstel.</p>

        {/* Hoofdsponsor — flagship */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-tlbr/40 bg-gradient-to-br from-brand-pd to-brand-base2 shadow-[10px_10px_0_0_#1c857a] mb-6">
          <div className="qlc-halftone absolute inset-0 opacity-10 pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1fr_1.3fr] gap-6 p-7 sm:p-9">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-base3/60 flex items-center justify-center border border-brand-crm/20">
                  <Crown className="w-5 h-5 text-brand-green-light" />
                </div>
                <span className="font-stamp text-[10px] uppercase tracking-[0.2em] text-brand-crm/80 bg-brand-base3/60 border border-brand-crm/20 px-2 py-1 rounded">
                  Slechts 1 plek
                </span>
              </div>
              <h3 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl leading-[0.85] mt-1">Hoofdsponsor</h3>
              <p className="text-sm text-brand-crm/70 leading-relaxed">
                De meest zichtbare plek die we hebben. E&eacute;n bedrijf, twee jaar lang, overal aan
                QLC gekoppeld.
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                {SHOW_ALL_PRICES ? (
                  <>
                    <span className="font-poster text-4xl text-brand-crm leading-none">{HOOFD_PRICE}</span>
                    <span className="font-stamp text-[11px] uppercase tracking-wider text-brand-crm/60">/ jaar &middot; looptijd 2 jaar</span>
                  </>
                ) : (
                  <span className="font-stamp text-xs uppercase tracking-widest text-brand-crm/70">Prijs op aanvraag &middot; looptijd 2 jaar</span>
                )}
              </div>
              <a
                href={sponsorMailto("Hoofdsponsor")}
                className="mt-2 w-fit font-poster uppercase tracking-wider text-sm px-6 py-2.5 bg-brand-tlbr text-brand-base3 border-2 border-brand-tlbr hover:bg-transparent hover:text-brand-tlbr transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Hoofdsponsor aanvragen
              </a>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 self-center">
              {HOOFD_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-brand-crm/85">
                  <Check className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vier niveaus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => {
            const checkoutUrl = tier.direct ? CHECKOUT[tier.name] : "";
            return (
              <div
                key={tier.name}
                className="flex flex-col bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#3c1138] hover:shadow-[6px_6px_0_0_#1c857a] transition-shadow"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-poster uppercase text-brand-crm text-3xl tracking-wider leading-none">{tier.name}</h3>
                  {tier.direct && (
                    <span className="font-stamp text-[9px] uppercase tracking-wider text-brand-green-light border border-brand-green-light/40 rounded px-1.5 py-0.5">
                      Direct
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="font-stamp text-[10px] uppercase tracking-wider text-brand-tlbr border border-brand-tlbr/30 rounded px-2 py-0.5">
                    {tier.plekken}
                  </span>
                  <span className="font-stamp text-[10px] uppercase tracking-wider text-brand-crm/50 border border-brand-crm/15 rounded px-2 py-0.5">
                    {tier.looptijd}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.benefits.map((b, i) => {
                    const isHeader = b.endsWith("plus:");
                    return (
                      <li key={i} className={`flex items-start gap-2 text-sm ${isHeader ? "text-brand-crm/45 italic" : "text-brand-crm/80"}`}>
                        {!isHeader && <Check className="w-4 h-4 text-brand-pb shrink-0 mt-0.5" />}
                        <span>{b}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 pt-4 border-t border-brand-crm/10 flex flex-col gap-3">
                  {tier.direct || SHOW_ALL_PRICES ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-poster text-3xl text-brand-crm leading-none">{tier.price}</span>
                      <span className="font-stamp text-[10px] uppercase tracking-wider text-brand-crm/50">/ jaar</span>
                    </div>
                  ) : (
                    <span className="font-stamp text-xs uppercase tracking-widest text-brand-crm/60">Prijs op aanvraag</span>
                  )}
                  {tier.direct && checkoutUrl ? (
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-center font-poster uppercase tracking-wider text-sm py-2.5 bg-brand-tlbr text-brand-base3 border-2 border-brand-tlbr hover:bg-transparent hover:text-brand-tlbr transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" /> Direct sponsor worden
                    </a>
                  ) : (
                    <a
                      href={sponsorMailto(tier.name)}
                      className="text-center font-poster uppercase tracking-wider text-sm py-2.5 bg-brand-pm text-brand-crm border-2 border-brand-crm/25 hover:bg-brand-pd hover:border-brand-tlbr transition-colors"
                    >
                      {tier.direct ? "Word sponsor" : "Aanvragen"}
                    </a>
                  )}
                  {tier.direct && !checkoutUrl && (
                    <span className="font-stamp text-[10px] text-brand-crm/40 text-center">iDEAL-betaling volgt deze maand</span>
                  )}
                  {!tier.direct && (
                    <span className="font-stamp text-[10px] text-brand-crm/40 text-center">Beperkte plekken &mdash; op aanvraag</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* In natura */}
        <p className="text-xs text-brand-crm/50 mt-6 text-center leading-relaxed">
          Sponsoring in natura kan ook &mdash; denk aan drukwerk, transport, techniek of repetitieruimte.
          We waarderen dat tegen inkoopwaarde en leggen het netjes vast.
        </p>

        {/* CTA — Word sponsor */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-crm/15 bg-brand-base3 mt-16 p-8 sm:p-12 text-center">
          <div className="qlc-halftone absolute inset-0 opacity-[0.06] pointer-events-none" />
          <div className="relative">
            <p className="font-stamp text-brand-tlbr uppercase text-xs tracking-[0.28em]">Interesse?</p>
            <h2 className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl mt-2 leading-none">
              Word sponsor van QLC
            </h2>
            <p className="text-sm text-brand-crm/70 max-w-xl mx-auto mt-4 leading-relaxed">
              Vriend of Brons regel je zo online. Voor de grotere pakketten stellen we graag een
              voorstel op maat op, met een concrete tegenprestatie op papier. Bel of mail Julian.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href={sponsorMailto("algemeen")}
                className="font-poster uppercase text-lg tracking-wider px-8 py-3 bg-brand-pm text-brand-crm border-2 border-brand-crm/25 hover:bg-brand-pd hover:border-brand-tlbr transition-colors inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" /> Word sponsor
              </a>
              <a
                href="tel:+31640081979"
                className="font-poster uppercase text-lg tracking-wider px-8 py-3 border-2 border-brand-tlbr text-brand-tlbr hover:bg-brand-tlbr hover:text-brand-base3 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> 06 40 08 19 79
              </a>
            </div>
            <p className="font-stamp text-[11px] text-brand-crm/40 mt-6 flex items-center justify-center gap-1.5">
              <ArrowRight className="w-3 h-3 text-brand-pb" /> Julian Hugenholtz &middot; hugenholtzjulian@gmail.com
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
