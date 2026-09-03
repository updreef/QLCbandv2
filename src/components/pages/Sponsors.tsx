import { Users, Image as ImageIcon, Megaphone, Percent, Check, Crown, Mail, Phone, ArrowRight } from "lucide-react";
import SquiggleUnderline from "../SquiggleUnderline";

const WAAROM = [
  { icon: Users, title: "Live voor de regio", text: "Zo'n tien optredens per jaar voor een paar honderd man in Spakenburg, Amersfoort en omstreken." },
  { icon: ImageIcon, title: "Op het podiumdoek", text: "Je logo op ons doek achter de band — en dus op elke foto en video van de avond." },
  { icon: Megaphone, title: "Socials & site", text: "Vermelding op onze actieve socials en op quarterlifecrisis.nl, het hele jaar door." },
  { icon: Percent, title: "Korting op een optreden", text: "Personeelsfeest? Als sponsor spelen we bij jullie met korting — of inbegrepen." },
];

type Tier = {
  name: string;
  plekken: string;
  looptijd: string;
  intro?: string;
  benefits: string[];
};

const TIERS: Tier[] = [
  {
    name: "Vriend",
    plekken: "onbeperkt",
    looptijd: "1 jaar",
    benefits: [
      "Naam op de sponsorpagina",
      "Vermelding in onze jaarlijkse bedankpost",
    ],
  },
  {
    name: "Brons",
    plekken: "max. 8",
    looptijd: "2 jaar",
    benefits: [
      "Alles van Vriend, plus:",
      "Logo mét link op de sponsorpagina",
      "1 eigen social post per jaar",
      "Uitnodiging per show",
    ],
  },
  {
    name: "Zilver",
    plekken: "max. 5",
    looptijd: "2 jaar",
    benefits: [
      "Alles van Brons, plus:",
      "Logo op het podiumdoek",
      "Logo op flyers & posters",
      "Naamsvermelding vanaf het podium",
      "2 social posts per jaar",
      "Korting op een optreden voor je personeel",
    ],
  },
  {
    name: "Goud",
    plekken: "max. 3",
    looptijd: "2 jaar",
    benefits: [
      "Alles van Zilver, plus:",
      "Logo in de footer van de site",
      "Groot logo op het doek",
      "Logo in onze videocontent",
      "Branche-exclusiviteit in de regio",
      "4 social posts per jaar & naamsvermelding elke show",
    ],
  },
];

const HOOFD_BENEFITS = [
  "Als enige groot bovenaan op het podiumdoek",
  "Naamskoppeling: “QLC powered by …”",
  "Logo in de footer, op flyers, posters en videocontent",
  "6 eigen social posts per jaar",
  "Één optreden inbegrepen",
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
            We verkopen geen goede wil, maar zichtbaarheid. Als sponsor hang je het hele jaar tussen
            een band die tien keer per jaar voor honderden mensen in de regio speelt &mdash; op het
            podiumdoek, op onze socials en op deze site. Lokaal, zichtbaar en met een knipoog.
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
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-poster uppercase text-brand-crm text-3xl sm:text-4xl tracking-[0.12em]">De pakketten</h2>
          <span className="flex-1 h-0.5 bg-gradient-to-r from-brand-pb to-transparent" />
        </div>

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
              <span className="font-stamp text-xs text-brand-crm/50 mt-1">Looptijd 2 jaar &middot; prijs op aanvraag</span>
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
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#3c1138] hover:shadow-[6px_6px_0_0_#1c857a] transition-shadow"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-poster uppercase text-brand-crm text-3xl tracking-wider leading-none">{tier.name}</h3>
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
                      <span className={isHeader ? "pl-0" : ""}>{b}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 pt-4 border-t border-brand-crm/10">
                <span className="font-stamp text-xs uppercase tracking-widest text-brand-crm/60">Prijs op aanvraag</span>
              </div>
            </div>
          ))}
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
              We stellen graag een voorstel op maat op, met een concrete tegenprestatie op papier.
              Neem contact op met Julian &mdash; dan kijken we samen welk pakket past.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="mailto:hugenholtzjulian@gmail.com?subject=Sponsoring%20QLC"
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
