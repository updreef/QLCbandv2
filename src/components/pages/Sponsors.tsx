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

function sponsorMailto(pakket: string) {
  const subject = encodeURIComponent(`Sponsoring QLC: ${pakket}`);
  const body = encodeURIComponent(
    `Hoi Julian,\n\nWij willen graag ${pakket === "algemeen" ? "sponsor" : pakket + "-sponsor"} worden van Quarter Life Crisis.\n\nBedrijf:\nContactpersoon:\nTelefoon:\nE-mail:\n\nGroet,`
  );
  return `mailto:${SPONSOR_EMAIL}?subject=${subject}&body=${body}`;
}

// Wat je ook nog terugkrijgt — de nuchtere reclamekant onder de gunfactor.
const WAAROM = [
  { icon: Users, title: "Live voor de regio", text: "±10 shows per jaar voor honderden mensen in Spakenburg, Amersfoort e.o." },
  { icon: ImageIcon, title: "Op het podiumdoek", text: "Je logo op ons doek, en dus op elke foto en video van de avond." },
  { icon: Megaphone, title: "Socials & site", text: "Vermelding op onze socials en op quarterlifecrisis.nl, het hele jaar door." },
  { icon: Percent, title: "Korting op een optreden", text: "Personeelsfeest? Als sponsor spelen we met korting, of zelfs inbegrepen." },
];

type Tier = {
  name: string;
  cta: string;
  plekken: string;
  looptijd: string;
  direct: boolean;
  pitch: string;   // vetgedrukte hoofdzin: waar helpt de bijdrage aan
  detail: string;  // ondersteunende zin eronder
  price: string;
  benefits: string[];
};

const TIERS: Tier[] = [
  {
    name: "Vriend",
    cta: "Word vriend",
    price: "€100 / jaar",
    plekken: "onbeperkt",
    looptijd: "1 jaar",
    direct: true,
    pitch: "Voor €100 help je ons onze techniek en volgende repetities te betalen.",
    detail: "Daarmee kunnen we blijven repeteren, nieuwe nummers leren en samen beter worden.",
    benefits: [
      "Naam op de sponsorpagina",
      "Vermelding in onze jaarlijkse bedank-post & -video",
    ],
  },
  {
    name: "Brons",
    cta: "Word sponsor",
    price: "€250 / jaar",
    plekken: "max. 8",
    looptijd: "2 jaar",
    direct: true,
    pitch: "Met €250 help je een heel optreden mogelijk te maken.",
    detail: "Van repetitieruimte en apparatuur tot vervoer: alles wat nodig is om een goede show neer te zetten.",
    benefits: [
      "Alles van Vriend, plus:",
      "Logo mét link op de sponsorpagina",
      "Shout-out vanaf het podium (1× per jaar)",
    ],
  },
  {
    name: "Zilver",
    cta: "Aanvragen",
    price: "€500 / jaar",
    plekken: "max. 5",
    looptijd: "2 jaar",
    direct: false,
    pitch: "Met jouw bijdrage investeren we in betere shows.",
    detail: "Denk aan apparatuur, techniek en repetities waarmee we QLC naar een hoger niveau tillen.",
    benefits: [
      "Alles van Brons, plus:",
      "Je logo op ons podiumdoek, op elke foto & video",
      "Logo op flyers & posters",
      "Naamsvermelding bij elk optreden",
      "Korting op een optreden voor je personeelsfeest",
    ],
  },
  {
    name: "Goud",
    cta: "Aanvragen",
    price: "€1.000 / jaar",
    plekken: "max. 3",
    looptijd: "2 jaar",
    direct: false,
    pitch: "Jouw bijdrage helpt ons eigen muziek te maken.",
    detail: "Van opname en productie tot repetities: je helpt ons de stap zetten van coverband naar een band met eigen werk.",
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

const HOOFD_PITCH = "Jij helpt ons onze droom werkelijkheid te maken.";
const HOOFD_DETAIL = "Van lokale optredens naar grotere podia en festivals, eigen muziek, en een band die steeds verder groeit.";
const HOOFD_BENEFITS = [
  "Als enige groot bovenaan op het podiumdoek",
  "Naamskoppeling: “QLC powered by …”",
  "Logo in footer, op flyers, posters & videocontent",
  "Genoemd in onze jaarlijkse bedank-post & -video",
  "Eén optreden inbegrepen (bijv. jullie bedrijfsfeest)",
  "Branche-exclusiviteit in de regio",
];

function TierCTA({ name, direct, cta }: { name: string; direct: boolean; cta: string }) {
  const url = direct ? CHECKOUT[name] : "";
  if (direct && url) {
    return (
      <a href={url} target="_blank" rel="noopener" className="text-center font-poster uppercase tracking-wider text-sm py-2.5 bg-brand-tlbr text-brand-base3 border-2 border-brand-tlbr hover:bg-transparent hover:text-brand-tlbr transition-colors inline-flex items-center justify-center gap-2">
        <CreditCard className="w-4 h-4" /> {cta}
      </a>
    );
  }
  return (
    <a href={sponsorMailto(name)} className={`text-center font-poster uppercase tracking-wider text-sm py-2.5 border-2 transition-colors ${direct ? "bg-brand-pm text-brand-crm border-brand-crm/25 hover:bg-brand-pd hover:border-brand-tlbr" : "bg-transparent text-brand-tlbr border-brand-tlbr hover:bg-brand-tlbr hover:text-brand-base3"}`}>
      {cta}
    </a>
  );
}

export default function Sponsors() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header — emotioneel */}
        <div className="mb-14 max-w-3xl">
          <p className="font-stamp text-brand-tlbr uppercase text-xs tracking-[0.28em]">
            Steun de band &middot; Quarter Life Crisis
          </p>
          <h1 className="font-poster uppercase text-brand-crm text-6xl sm:text-7xl mt-2 leading-[0.85]">
            Zes vrienden.<br />Eén droom.
          </h1>
          <p className="font-serif italic text-brand-tlbr text-xl sm:text-2xl mt-3">Help ons die droom groter te maken.</p>
          <SquiggleUnderline />
          <p className="text-brand-crm/75 mt-6 text-sm sm:text-base leading-relaxed">
            Zes vrienden uit Spakenburg en Amersfoort, één droom: QLC laten groeien tot een band die mensen
            samenbrengt op podia, feesten en festivals. We spelen met hart en ziel, maar snaren,
            versterkers en studiotijd kosten nou eenmaal geld. Sponsor je ons, dan help je heel concreet mee:
            <span className="text-brand-crm"> van nieuwe snaren tot onze eerste opname</span>.
          </p>
        </div>

        {/* Pakketten */}
        <div className="flex items-center gap-4 mb-3">
          <h2 className="font-poster uppercase text-brand-crm text-3xl sm:text-4xl tracking-[0.12em]">Kies wat je wilt</h2>
          <span className="flex-1 h-0.5 bg-gradient-to-r from-brand-pb to-transparent" />
        </div>
        <p className="text-xs text-brand-crm/50 mb-8">Elk pakket helpt heel concreet. Vriend &amp; Brons regel je direct online (jaarlijks, altijd opzegbaar); Zilver en hoger via een korte aanvraag.</p>

        {/* Hoofdsponsor — flagship */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-tlbr/40 bg-gradient-to-br from-brand-pd to-brand-base2 shadow-[10px_10px_0_0_#1c857a] mb-6">
          <div className="qlc-halftone absolute inset-0 opacity-10 pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1fr_1.15fr] gap-6 p-7 sm:p-9">
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
              <p className="text-brand-crm text-lg sm:text-xl leading-snug font-semibold">{HOOFD_PITCH}</p>
              <p className="text-brand-crm/70 text-sm leading-relaxed">{HOOFD_DETAIL}</p>
              <a
                href={sponsorMailto("Hoofdsponsor")}
                className="mt-2 w-fit font-poster uppercase tracking-wider text-sm px-6 py-2.5 bg-brand-tlbr text-brand-base3 border-2 border-brand-tlbr hover:bg-transparent hover:text-brand-tlbr transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Hoofdsponsor worden
              </a>
              <span className="font-stamp text-[11px] text-brand-crm/50">Looptijd 2 jaar &middot; op aanvraag</span>
            </div>
            <div className="self-center">
              <span className="font-stamp text-[10px] uppercase tracking-wider text-brand-crm/50">Je krijgt ook</span>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
                {HOOFD_BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-brand-crm/80">
                    <Check className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vier niveaus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#3c1138] hover:shadow-[6px_6px_0_0_#1c857a] transition-shadow"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-poster uppercase text-brand-crm text-2xl tracking-wider leading-none">{tier.name}</h3>
                <div className="flex gap-1.5">
                  {tier.direct && (
                    <span className="font-stamp text-[9px] uppercase tracking-wider text-brand-green-light border border-brand-green-light/40 rounded px-1.5 py-0.5">Direct</span>
                  )}
                  <span className="font-stamp text-[9px] uppercase tracking-wider text-brand-tlbr border border-brand-tlbr/30 rounded px-1.5 py-0.5">{tier.plekken}</span>
                </div>
              </div>

              {/* De hoofdzin — voorop, met detail eronder */}
              <p className="text-brand-crm text-base sm:text-lg leading-snug mt-3 font-semibold">{tier.pitch}</p>
              <p className="text-brand-crm/60 text-sm leading-relaxed mt-1.5 mb-4">{tier.detail}</p>

              {/* Voordelen — secundair */}
              <div className="mt-auto">
                <span className="font-stamp text-[10px] uppercase tracking-wider text-brand-crm/45">Je krijgt ook</span>
                <ul className="flex flex-col gap-1.5 mt-1.5">
                  {tier.benefits.map((b, i) => {
                    const isHeader = b.endsWith("plus:");
                    return (
                      <li key={i} className={`flex items-start gap-2 text-xs ${isHeader ? "text-brand-crm/40 italic" : "text-brand-crm/65"}`}>
                        {!isHeader && <Check className="w-3.5 h-3.5 text-brand-pb shrink-0 mt-0.5" />}
                        <span>{b}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-5 pt-4 border-t border-brand-crm/10 flex flex-col gap-2">
                <TierCTA name={tier.name} direct={tier.direct} cta={tier.cta} />
                <span className="font-stamp text-[10px] text-brand-crm/40 text-center">
                  {tier.direct
                    ? `${tier.price} · jaarlijks, opzegbaar${CHECKOUT[tier.name] ? "" : " · iDEAL volgt deze maand"}`
                    : "Op aanvraag"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* En het is nog echte reclame ook */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-poster uppercase text-brand-crm text-2xl sm:text-3xl tracking-[0.12em]">En het is nog echte reclame ook</h2>
            <span className="flex-1 h-0.5 bg-gradient-to-r from-brand-tlbr to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WAAROM.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-brand-base2/70 border border-brand-crm/12 rounded-xl p-5 flex flex-col gap-2">
                <Icon className="w-5 h-5 text-brand-tlbr" />
                <h3 className="font-poster uppercase tracking-wider text-brand-crm text-lg leading-none">{title}</h3>
                <p className="text-xs text-brand-crm/55 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-crm/50 mt-6 text-center leading-relaxed">
            Sponsoring in natura kan ook: denk aan drukwerk, transport, techniek of repetitieruimte.
            We waarderen dat tegen inkoopwaarde en leggen het netjes vast op één A4, zodat je het als reclamekosten kunt boeken.
          </p>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-crm/15 bg-brand-base3 mt-16 p-8 sm:p-12 text-center">
          <div className="qlc-halftone absolute inset-0 opacity-[0.06] pointer-events-none" />
          <div className="relative">
            <p className="font-stamp text-brand-tlbr uppercase text-xs tracking-[0.28em]">Doe je mee?</p>
            <h2 className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl mt-2 leading-none">
              Help de droom groeien
            </h2>
            <p className="text-sm text-brand-crm/70 max-w-xl mx-auto mt-4 leading-relaxed">
              Vriend of Brons regel je zo online. Twijfel je of wil je een groter pakket? Bel of mail Julian,
              dan kijken we samen wat past.
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
