export interface Member {
  name: string;
  role: string;
  avatar: string; // poster image, used as fallback and video poster
  video: string;  // autoplay muted loop portrait video
  bio: string;
  funFact: string;
  instagram: string;
  gear: string[];
}

export interface Show {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO format or human readable
  time: string;
  location: string;
  address: string;
  city: string;
  description: string;
  ticketLink?: string;
  status: 'upcoming' | 'past';
  image: string;
  highlights?: string[];
}

export interface Song {
  id: string;
  title: string;
  originalArtist: string;
  set: 1 | 2;
  position: number; // volgorde binnen de set
  roles?: string;   // bv. "Ruben rhythm · Joel bass"
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface LiveMoment {
  id: string;
  title: string;
  video: string;
  poster: string;
  showSlug?: string; // links to a Show entry when applicable
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  summary: string;
  content: string; // HTML format for easy rendering
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

// Copy locked to https://quarterlifecrisis.nl — do not paraphrase. See CONTENT.md at repo root for tone rules.
export const members: Member[] = [
  {
    name: "Tristan Muijs",
    role: "Gitaar",
    avatar: "/images/members/tristan.png",
    video: "/videos/members/tristan.mp4",
    bio: "Tristan laat al jaren zijn funky grooves door elke zaal knallen. Zijn grote held? Billie Joe Armstrong van Green Day. Maar vergis je niet, als hij geen riffs staat te spelen, is hij bezig om Nederlands kampioen armworstelen te worden. Ja, echt.",
    funFact: "Traint in het geheim voor Nederlands kampioen armworstelen.",
    instagram: "https://instagram.com/tristanmuys",
    gear: []
  },
  {
    name: "Ruben Beukers",
    role: "Gitaar",
    avatar: "/images/members/ruben.png",
    video: "/videos/members/ruben.mp4",
    bio: "Elektrisch, akoestisch, bas. Geef Ruben een instrument en hij speelt het. Een echte avonturier waar niks te gek voor is. Hij brengt de energie die elke show nodig heeft en stopt pas als de versterker het begeeft.",
    funFact: "Stopt pas als de versterker het begeeft.",
    instagram: "https://instagram.com/rubenbeukers",
    gear: []
  },
  {
    name: "Peter Baas",
    role: "Drums",
    avatar: "/images/members/peter.png",
    video: "/videos/members/peter.mp4",
    bio: "Nog nooit een drumles gehad. Slaat ze toch allemaal raak. Peter is een alleskunner: voormalig Nederlands kampioen skiën, tegenwoordig timmerman, en achter het drumstel een beest met Metallica in zijn bloed.",
    funFact: "Voormalig Nederlands kampioen skiën. Nooit een drumles gehad.",
    instagram: "https://instagram.com/peterrrbaas",
    gear: []
  },
  {
    name: "Niels Verburg",
    role: "Zang",
    avatar: "/images/members/niels.png",
    video: "/videos/members/niels.mp4",
    bio: "Ooit zong hij alleen Psalmen en Gezangen. Nu staat hij vooraan het podium als de frontman van QLC. Van kerkbank naar rockpodium. Niels is onze echte ster en een stiekeme country-fanaat.",
    funFact: "Van kerkbank naar rockpodium. Stiekeme country-fanaat.",
    instagram: "https://instagram.com/nielsverburg",
    gear: []
  },
  {
    name: "Joel van de Groep",
    role: "Gitaar",
    avatar: "/images/members/joel.png",
    video: "/videos/members/joel.mp4",
    bio: "Joel ademt rock. Van jongs af aan stonden de gillende metal gitaren door zijn stereo te knallen. Van basist tot sologitarist, hij kan het allemaal (als hij wil). Net terug uit de Down Under en klaar om iedereen te laten zien hoe goed hij is.",
    funFact: "Net terug uit de Down Under.",
    instagram: "https://instagram.com/joelvandegroep",
    gear: []
  },
  {
    name: "Julian Hugenholtz",
    role: "Piano",
    avatar: "/images/members/julian.png",
    video: "/videos/members/julian.mp4",
    bio: "Julian Hugenholtz, beter bekend als Buugenholtz, laat de piano al van jongs af aan klinken en op elk feestje hoor je hem als eerste. Hij schrijft zijn eigen liedjes, maar Piano Man van Billy Joel blijft zijn favoriet.",
    funFact: "Ook bekend als Buugenholtz. Favoriet: Piano Man van Billy Joel.",
    instagram: "https://instagram.com/julianhh_",
    gear: []
  }
];

export const shows: Show[] = [
  {
    id: "backyard-sessions-1",
    slug: "backyard-sessions-1",
    title: "QLC Backyard Sessions #1",
    date: "2026-08-01",
    time: "19:00 - 23:00",
    location: "Scholekster 57",
    address: "Scholekster 57",
    city: "Bunschoten-Spakenburg",
    description: "Na ons spetterende debuut van maar liefst twee optredens vinden we het tijd voor de volgende stap: een tuinconcert. We spelen ongeveer een uur onze favoriete nummers en zorgen daarna samen voor een gezellige zomeravond. Statistisch gezien is de kans groot dat het prachtig weer wordt.",
    status: 'past',
    // Frame uit een eigen Backyard-video.
    image: "/videos/live-moments/backyard-2.jpg",
    highlights: ["Live QLC", "DJ Chesto", "Beer Pong", "Borrels", "BYOB"]
  },
  {
    id: "havenpop-2026",
    slug: "havenpop-2026",
    title: "Havenpop 2026",
    date: "2026-08-29",
    time: "Middag & avond",
    location: "Havenpop",
    address: "De Oude Haven",
    city: "Spakenburg",
    description: "QLC staat op Havenpop 2026! Het muziekfestival in de haven van Spakenburg. Wij brengen een set vol rockcovers en meezingers op een van de mooiste openluchtpodia van de regio. Kom langs, neem je vrienden mee en zing keihard mee.",
    status: 'upcoming',
    // Eigen Havenpop-foto (haven Spakenburg).
    image: "/images/havenpop.jpg",
    highlights: ["Live QLC", "Openluchtfestival", "Haven Spakenburg"]
  },
  {
    id: "bruiloft-te",
    slug: "bruiloft-te",
    title: "Bruiloft T&E",
    date: "2025-05-22",
    time: "Avond",
    location: "Bruiloft T&E",
    address: "",
    city: "",
    description: "Ons optreden op de bruiloft van T&E. Een avond vol live rock, dansende gasten en een setlist waar het bruidspaar zelf om had gevraagd. Van deze show komen ook onze live-videos van Narcotic, Angels en Seven Nation Army.",
    status: 'past',
    image: "/videos/live-moments/narcotic.jpg",
    highlights: ["Live QLC", "Dansende gasten", "Volle set"]
  }
];

// Live-video snippets, filmed on stage. Linked to a show via showSlug.
export const liveMoments: LiveMoment[] = [
  {
    id: "backyard-1",
    title: "Backyard #1",
    video: "/videos/live-moments/backyard-1.mp4",
    poster: "/videos/live-moments/backyard-1.jpg",
    showSlug: "backyard-sessions-1"
  },
  {
    id: "backyard-2",
    title: "Backyard #2",
    video: "/videos/live-moments/backyard-2.mp4",
    poster: "/videos/live-moments/backyard-2.jpg",
    showSlug: "backyard-sessions-1"
  },
  {
    id: "backyard-3",
    title: "Backyard #3",
    video: "/videos/live-moments/backyard-3.mp4",
    poster: "/videos/live-moments/backyard-3.jpg",
    showSlug: "backyard-sessions-1"
  },
  {
    id: "narcotic",
    title: "Narcotic",
    video: "/videos/live-moments/narcotic.mp4",
    poster: "/videos/live-moments/narcotic.jpg",
    showSlug: "bruiloft-te"
  },
  {
    id: "angels",
    title: "Angels",
    video: "/videos/live-moments/angels.mp4",
    poster: "/videos/live-moments/angels.jpg",
    showSlug: "bruiloft-te"
  },
  {
    id: "seven-nation-army",
    title: "Seven Nation Army",
    video: "/videos/live-moments/seven_nation_army.mp4",
    poster: "/videos/live-moments/seven_nation_army.jpg",
    showSlug: "bruiloft-te"
  }
];

// Setlist zoals we 'm live spelen. Twee sets, met wie welke rol pakt per nummer.
export const repertoire: Song[] = [
  // ─── SET 1 ───────────────────────────────────────────
  { id: "s1-1", set: 1, position: 1, title: "Piano Man", originalArtist: "Billy Joel", roles: "Ruben rhythm · Joel bass" },
  { id: "s1-2", set: 1, position: 2, title: "Knocking on Heaven's Door", originalArtist: "Bob Dylan / Guns N' Roses", roles: "Ruben rhythm · Joel bass" },
  { id: "s1-3", set: 1, position: 3, title: "Riptide", originalArtist: "Vance Joy", roles: "Tristan ukelele · Ruben bass" },
  { id: "s1-4", set: 1, position: 4, title: "Pink Skies", originalArtist: "Zach Bryan", roles: "Niels gitaar · Ruben bass · Tristan rhythm" },
  { id: "s1-5", set: 1, position: 5, title: "Iris", originalArtist: "Goo Goo Dolls", roles: "Ruben bass · Tristan rhythm · Joel lead" },
  { id: "s1-6", set: 1, position: 6, title: "End of Beginning", originalArtist: "Djo", roles: "Ruben bass · Joel lead · Tristan rhythm" },
  { id: "s1-7", set: 1, position: 7, title: "Three Little Birds", originalArtist: "Bob Marley", roles: "Ruben bass · Joel lead · Tristan rhythm" },
  { id: "s1-8", set: 1, position: 8, title: "Stil in Mij", originalArtist: "Van Dik Hout", roles: "Ruben bass · Joel lead · Tristan rhythm" },

  // ─── SET 2 ───────────────────────────────────────────
  { id: "s2-1", set: 2, position: 1, title: "Take Me Out", originalArtist: "Franz Ferdinand", roles: "Ruben rhythm · Tristan bass · Joel lead" },
  { id: "s2-2", set: 2, position: 2, title: "Valerie", originalArtist: "The Zutons / Amy Winehouse", roles: "Ruben rhythm · Tristan bass · Joel lead" },
  { id: "s2-3", set: 2, position: 3, title: "Chelsea Dagger", originalArtist: "The Fratellis", roles: "Ruben rhythm · Tristan bass · Joel lead" },
  { id: "s2-4", set: 2, position: 4, title: "Seven Nation Army", originalArtist: "The White Stripes", roles: "Ruben rhythm · Tristan bass · Joel lead" },
  { id: "s2-5", set: 2, position: 5, title: "Angels", originalArtist: "Robbie Williams", roles: "Ruben rhythm · Tristan bass · Joel lead" },
  { id: "s2-6", set: 2, position: 6, title: "Dani California", originalArtist: "Red Hot Chili Peppers", roles: "Ruben bass · Joel lead · Tristan rhythm" },
  { id: "s2-7", set: 2, position: 7, title: "Narcotic", originalArtist: "Liquido", roles: "Ruben bass · Joel lead · Tristan rhythm" },
  { id: "s2-8", set: 2, position: 8, title: "Mr Brightside", originalArtist: "The Killers", roles: "Ruben bass · Joel lead · Tristan rhythm" }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "waarom-we-op-ons-25e-een-band-begonnen",
    title: "Waarom we op ons 25e een band begonnen",
    date: "2026-06-25",
    category: "Band Life",
    author: "Quarter Life Crisis",
    summary: "Zes mannen midden twintig, één biertje in de tuin, en de vraag die maar bleef hangen: waarom zijn we eigenlijk gestopt met muziek maken? Dit is het verhaal achter Quarter Life Crisis.",
    metaDescription: "Het verhaal achter Quarter Life Crisis (QLC): waarom zes vrienden uit Spakenburg en Amersfoort besloten om op hun 25e een rockband op te richten.",
    faqs: [
      {
        question: "Waarom heet de band Quarter Life Crisis?",
        answer: "Op je 25e alles opzij zetten voor muziek is óf een crisis, óf het beste besluit dat je ooit hebt genomen. Wij denken het tweede. De naam bleef hangen op de avond dat we besloten om weer te gaan spelen."
      },
      {
        question: "Waar spelen jullie?",
        answer: "Onze basis is Bunschoten-Spakenburg en Amersfoort. We spelen in de regio Utrecht en willen daar de komende jaren ook buiten treden. Boek ons voor een feest, festival of bedrijfsevenement."
      }
    ],
    content: `
      <p class="mb-4 text-brand-text/90 leading-relaxed text-base md:text-lg">Het begon zoals de beste ideeën beginnen: met een biertje in de tuin. Zes mannen, midden twintig, en die ene vraag die maar bleef hangen, waarom zijn we eigenlijk gestopt met muziek maken?</p>

      <p class="mb-4 text-brand-text/90 leading-relaxed">Want dat was het ding. We deden het allemaal vroeger. Gitaren, drums, keyboards. Het zat er altijd al in. Maar ergens tussen studeren, werken en "volwassen worden" waren we het kwijtgeraakt. Tot die ene koude winteravond. Eén biertje werd er vijf, en voor we het wisten hadden we een bandnaam, een groepsapp en een afspraak om te repeteren.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Op onze 25e wat we op onze 15e het liefst deden</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Op onze 25e deden we wat we op onze 15e het allerliefst deden: herrie maken. En het voelde meteen weer als thuiskomen. De eerste repetitie was houterig, de tweede was al beter, en na een maand of drie stonden we voor het eerst op een podium.</p>

      <blockquote class="border-l-4 border-brand-red pl-4 my-6 italic text-brand-text-muted">
        "Play loud, grow up later."
      </blockquote>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">De naam</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Quarter Life Crisis. Want als je op je 25e besluit om alles opzij te zetten voor muziek, dan is dat óf een crisis, óf het beste besluit dat je ooit hebt genomen. Wij denken het tweede.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">En nu?</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">We hebben inmiddels twee shows staan, ons eigen tuinconcert (Backyard Sessions #1 op 1 augustus 2026) en steeds meer verzoeken voor optredens in de regio. Wil je ons boeken voor een feest, festival of bedrijfsevent? Bel Julian op 06 40 08 19 79.</p>
    `
  },
  {
    slug: "zo-organiseer-je-een-tuinconcert",
    title: "Zo organiseer je een tuinconcert (de Backyard Sessions handleiding)",
    date: "2026-07-02",
    category: "Gidsen",
    author: "Quarter Life Crisis",
    summary: "Een tuinconcert is de meest gezellige manier om de zomer te vieren. Ruben legt uit hoe we onze Backyard Sessions organiseren en wat jij nodig hebt om er zelf een te draaien.",
    metaDescription: "Wil je zelf een tuinconcert organiseren? In deze gids delen we hoe we onze Backyard Sessions in Spakenburg opzetten: geluid, sfeer, buren en drank.",
    faqs: [
      {
        question: "Heb ik een vergunning nodig voor een tuinconcert?",
        answer: "Voor een klein besloten feest in je eigen tuin heb je meestal geen vergunning nodig, mits je binnen de gemeentelijke geluidsnormen blijft en er geen commerciële verkoop is. Check even de APV van je gemeente."
      },
      {
        question: "Hoe voorkom je gedoe met de buren?",
        answer: "Nodig ze uit. Serieus. Buren die zelf met een biertje in je tuin staan, klagen niet over geluid. En communiceer vooraf duidelijk een eindtijd, bijvoorbeeld muziek stopt om 23:00 uur."
      }
    ],
    content: `
      <p class="mb-4 text-brand-text/90 leading-relaxed text-base md:text-lg">Een tuinconcert is de meest gezellige manier om de zomer te vieren. Bij QLC hebben we onze eigen concertreeks: de Backyard Sessions. Nummer 1 staat op 1 augustus 2026 aan de Scholekster 57 in Spakenburg. Maar hoe zet je zoiets zelf op zonder dat de politie na 10 minuten op de stoep staat?</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">1. Buren op tijd inlichten (of gewoon uitnodigen)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">De belangrijkste stap. Een band in een achtertuin maakt geluid, dat is nou eenmaal zo. Loop een week van tevoren even bij je buren langs. Beter nog: nodig ze uit. Buren met een biertje in de tuin klagen niet.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">2. Duidelijke eindtijd communiceren</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Livemuziek tot 23:00 uur, daarna eventueel nog wat achtergrondmuziek. Communiceer die tijd naar iedereen en houd je eraan. Dat is de deal met de buurt.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">3. Stroom regelen</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Zes muzikanten met versterkers, monitors en licht zuipen meer stroom dan één stopcontact aankan. Verdeel over minstens twee groepen. Eén groep voor gitaar- en basversterkers, één voor zang en licht. Anders vliegt de stop eruit bij de eerste refrein.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">4. Sfeer</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Prikkabel, oude picknickkleden, strobalen als bankjes, partytent voor als het toch regent. Het hoeft niet duur, het moet gezellig zijn. En zorg voor een koelbox vol bier op elke hoek van de tuin.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Zelf te veel gedoe?</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Wij nemen onze eigen geluidsinstallatie mee. Als je ons boekt voor een tuinconcert regelen we alles behalve de buren. Bel Julian op 06 40 08 19 79 of stuur een mail via de <a href="/boek-ons" class="text-brand-neon underline">boekingspagina</a>.</p>
    `
  },
  {
    slug: "venues-live-muziek-spakenburg-amersfoort",
    title: "Live muziek in Spakenburg en Amersfoort: waar moet je zijn?",
    date: "2026-07-05",
    category: "Local Scene",
    author: "Quarter Life Crisis",
    summary: "Op zoek naar een avondje uit met echte livemuziek in de regio Utrecht? Wij zetten de leukste podia, cafés en events in Bunschoten-Spakenburg en Amersfoort op een rij.",
    metaDescription: "Ontdek de beste plekken voor live muziek in Amersfoort en Spakenburg. Van rockcafés tot poppodia en dorpsfeesten in de regio Utrecht.",
    faqs: [
      {
        question: "Waar kan ik live rockmuziek horen in Amersfoort?",
        answer: "Poppodium Fluor in de Nieuwe Stad is de bekendste plek voor grotere shows. Voor intiemere avonden zijn er meerdere kroegen in het centrum met een live-agenda."
      },
      {
        question: "Zijn er livemuziek-evenementen in Spakenburg?",
        answer: "Ja. Naast de Spakenburgse Dagen in de zomer, is het jaarlijkse Dorpsfeest hét muziekhoogtepunt. En vanaf 2026 organiseren wij zelf de QLC Backyard Sessions in de tuin aan de Scholekster."
      }
    ],
    content: `
      <p class="mb-4 text-brand-text/90 leading-relaxed text-base md:text-lg">Zoek je een avondje uit met echte livemuziek in de regio Utrecht? Als band uit Bunschoten-Spakenburg en Amersfoort komen we op veel plekken. Dit zijn onze favoriete locaties voor livemuziek in de omgeving.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Poppodium Fluor (Amersfoort)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">In de Nieuwe Stad zit poppodium Fluor. Grote zaal, brede programmering, van bekende Nederlandse acts tot internationale bands en tribute-avonden. Als je van livemuziek houdt in Amersfoort, check hun agenda.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Het Spuiplein (Bunschoten-Spakenburg)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Doordeweeks een gewoon plein, tijdens de Spakenburgse Dagen en het Dorpsfeest een openluchtpodium met duizenden bezoekers. Het is de plek waar het hele dorp samenkomt voor muziek.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Kroegen met live-agenda in Amersfoort</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">In het centrum van Amersfoort zitten meerdere cafés die regelmatig lokale bands boeken. Kleine podia, dichtbij, gezellig. Volg de socials van je favoriete kroeg voor de agenda.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">De QLC Backyard Sessions (Spakenburg)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Vanaf 1 augustus 2026 organiseren we zelf tuinconcerten aan de Scholekster 57 in Spakenburg. Intiem, buiten, gezellig, met een uur live QLC en daarna borrels. <a href="/optredens/backyard-sessions-1" class="text-brand-neon underline">Meer info & RSVP</a>.</p>

      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Support je local scene</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Livemuziek in de regio bestaat alleen als er publiek is. Koop een kaartje, drink een biertje aan de bar, praat met de band na de show. Zonder jou geen livemuziek.</p>
    `
  }
];
