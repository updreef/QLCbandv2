export interface Member {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  funFact: string;
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
  spotifyUrl?: string;
  youtubeUrl?: string;
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

export const members: Member[] = [
  {
    name: "Ruben Beukers",
    role: "Zang & Slaggitaar",
    avatar: "https://picsum.photos/seed/ruben/400/400",
    bio: "Als de frontman van Quarter Life Crisis zorgt Ruben dat elk optreden een feest wordt. Met zijn rauwe rockstem en energieke podiumpresentatie trekt hij het publiek direct mee. Naast zingen neemt hij ook de slaggitaar en alle boekingen voor zijn rekening. Vraag hem gerust om een biertje of een boeking!",
    funFact: "Kan de songtekst van 'Bohemian Rhapsody' achterstevoren opnoemen na twee biertjes.",
    gear: ["Fender Telecaster", "Marshall DSL40", "Shure SM58"]
  },
  {
    name: "Daan de Graaf",
    role: "Leadgitaar",
    avatar: "https://picsum.photos/seed/daan/400/400",
    bio: "Daan leeft voor gitaarsolo's. Of het nu gaat om de scheurende riffs van Guns N' Roses of de melodische lijnen van Pink Floyd, Daan perst er elke solo met passie uit. Hij is de klankmeester van de band en weet altijd exact de juiste rock-tone te vinden.",
    funFact: "Heeft meer gitaarpedalen in zijn woonkamer liggen dan meubelstukken.",
    gear: ["Gibson Les Paul Standard", "Mesa Boogie Dual Rectifier", "Strymon Timeline Delay"]
  },
  {
    name: "Thijs Hopman",
    role: "Toetsen & Synths",
    avatar: "https://picsum.photos/seed/thijs/400/400",
    bio: "Met zijn synthesizers en piano-klanken brengt Thijs de rijke 80s sfeer en atmosferische diepte in de muziek van QLC. Van pompende orgels tot zwevende synth-pads, Thijs lijmt de gitaargrooves en de ritmesectie perfect aan elkaar.",
    funFact: "Is stiekem de grootste ABBA-fan in de band, al zal hij dat nooit toegeven op een rock-podium.",
    gear: ["Nord Stage 3", "Roland Juno-DS", "Korg Minilogue XD"]
  },
  {
    name: "Jesse van de Groep",
    role: "Basgitaar",
    avatar: "https://picsum.photos/seed/jesse/400/400",
    bio: "Jesse vormt samen met Thomas de onbreekbare fundering van QLC. Zijn diepe basslines rammelen door je borstkas en dwingen je voeten om te bewegen. Jesse houdt van vette funkrock grooves en strakke tempowisselingen.",
    funFact: "Zijn basgitaar stemmen duurt meestal langer dan zijn hele warming-up.",
    gear: ["Fender Jazz Bass", "Ampeg SVT-CL Classic", "Darkglass Microtubes B7K Ultra"]
  },
  {
    name: "Thomas Koelewijn",
    role: "Drums & Percussie",
    avatar: "https://picsum.photos/seed/thomas/400/400",
    bio: "Thomas is de ritmische motor. Met zijn meedogenloze power en strakke drumfills drijft hij de dynamiek van de band tot het kookpunt. Hij zorgt dat de rock nummers de harde klappen krijgen die ze verdienen.",
    funFact: "Verslijt gemiddeld drie paar drumstokken per repetitie.",
    gear: ["Pearl Decade Maple Drum Kit", "Zildjian K Custom Cymbals", "Evans Drumheads"]
  },
  {
    name: "Sophie van Diermen",
    role: "Backing Vocals & Percussie",
    avatar: "https://picsum.photos/seed/sophie/400/400",
    bio: "Sophie is het geheime wapen van QLC. Haar kraakheldere backing vocals en loepzuivere harmonieën tillen de zang naar een professioneel niveau. Daarnaast voegt ze met haar percussie extra pit en energie toe aan de liveshow.",
    funFact: "Heeft nog nooit een valse noot gezongen, zelfs niet tijdens het headbangen.",
    gear: ["Sennheiser e945 Microphone", "LP Tambourine & Shakers"]
  }
];

export const shows: Show[] = [
  {
    id: "backyard-sessions-1",
    slug: "backyard-sessions-1",
    title: "Backyard Sessions #1",
    date: "2026-08-01",
    time: "19:30 - 23:30",
    location: "Achtertuin Scholekster",
    address: "Scholekster 57",
    city: "Spakenburg",
    description: "Onze legendarische Backyard Sessions zijn terug! We toveren een prachtige Spakenburgse achtertuin om tot een intiem rockpodium. Verwacht een avond vol scheurende rockcovers, gezellige sfeer, koude drankjes en goed gezelschap. Kom vroeg, want de capaciteit is beperkt!",
    status: 'upcoming',
    image: "/src/assets/images/backyard_sessions_1783405076708.jpg",
    highlights: ["Volledige 3-uurs liveshow", "Speciaalbier & BBQ aanwezig", "Intieme festivalsfeer"]
  },
  {
    id: "dorpsfeest-spakenburg",
    slug: "dorpsfeest-spakenburg",
    title: "Dorpsfeest Bunschoten-Spakenburg",
    date: "2025-06-14",
    time: "21:00 - 00:00",
    location: "Spuiplein Hoofdpodium",
    address: "Spuiplein 1",
    city: "Bunschoten-Spakenburg",
    description: "Een kolkende massa op het Spuiplein! QLC mocht de zaterdagavond van het Dorpsfeest afsluiten. Het hele plein zong uit volle borst mee met rockklassiekers van AC/DC, Queen en Golden Earring. Een onvergetelijke avond!",
    status: 'past',
    image: "/src/assets/images/qlc_band_stage_1783405063846.jpg",
    highlights: ["Uitverkocht plein met 2000+ bezoekers", "Massa-singalong bij 'Radar Love'", "Gastoptredens van lokale artiesten"]
  },
  {
    id: "rock-cafe-de-kei",
    slug: "rock-cafe-de-kei",
    title: "Live bij Rockcafé De Kei",
    date: "2025-04-12",
    time: "22:00 - 01:30",
    location: "Rockcafé De Kei",
    address: "Keistraat 18",
    city: "Amersfoort",
    description: "Een dampende, zwetende rockkroeg vol energie! We speelden drie sets lang het dak eraf in Amersfoort. Bier vloog door de lucht, gitaren gierden door de speakers, en het publiek weigerde ons naar huis te laten gaan zonder drie toegiften.",
    status: 'past',
    image: "/src/assets/images/booking_lead_1783405090426.jpg",
    highlights: ["Drie energieke rock sets", "Volledig volgepakt café", "Gitaarduels tussen Daan en Ruben"]
  }
];

export const repertoire: Song[] = [
  { id: "1", title: "Radar Love", originalArtist: "Golden Earring", spotifyUrl: "https://open.spotify.com/track/1Z8gU9vV2Lw00BvLqH0b6z" },
  { id: "2", title: "Highway to Hell", originalArtist: "AC/DC" },
  { id: "3", title: "Keep On Rockin' in the Free World", originalArtist: "Neil Young" },
  { id: "4", title: "Sex on Fire", originalArtist: "Kings of Leon" },
  { id: "5", title: "Zombie", originalArtist: "The Cranberries" },
  { id: "6", title: "Sweet Child O' Mine", originalArtist: "Guns N' Roses" },
  { id: "7", title: "Don't Stop Believin'", originalArtist: "Journey" },
  { id: "8", title: "Stil In Mij", originalArtist: "Van Dik Hout" },
  { id: "9", title: "Uprising", originalArtist: "Muse" },
  { id: "10", title: "Basket Case", originalArtist: "Green Day" }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "waarom-we-op-ons-25e-een-band-begonnen",
    title: "Waarom we op ons 25e besloten een rockband te beginnen (De Quarter Life Crisis)",
    date: "2026-06-25",
    category: "Band Life",
    author: "Ruben Beukers",
    summary: "Rond je 25e komt de realiteit hard binnen: vaste banen, hypotheken en volwassen verantwoordelijkheden. Onze reactie? Een snoeiharde rockcoverband oprichten genaamd 'Quarter Life Crisis'. Dit is ons verhaal.",
    metaDescription: "Benieuwd waarom we op onze 25e een rockband begonnen? Lees het verhaal achter Quarter Life Crisis (QLC), over gitaarsolo's, volwassenheid en rock-'n-roll in Spakenburg.",
    faqs: [
      {
        question: "Waarom heet de band Quarter Life Crisis?",
        answer: "Omdat we allemaal rond de 25 jaar oud zijn en de welbekende 'crisis' van volwassen worden voelden opkomen. In plaats van een dure sportwagen te kopen, besloten we om samen lawaai te maken op een podium!"
      },
      {
        question: "Spelen jullie alleen in de regio Bunschoten-Spakenburg?",
        answer: "Nee, we treden op in heel Utrecht, Gelderland en Noord-Holland. Amersfoort, Utrecht, Spakenburg en Hilversum behoren tot ons vaste speelveld, maar we reizen graag verder voor een vette show."
      }
    ],
    content: `
      <p class="mb-4 text-brand-text/90 leading-relaxed text-base md:text-lg">Het begint allemaal met dat ene gevoel rond je 25e. Je studietijd is officieel voorbij, je eerste serieuze baan is een feit, en opeens gaan gesprekken op verjaardagen over hypotheekrentes, pensioenopbouw en verbouwingen. Je kijkt in de spiegel en vraagt je af: <em>Is dit het nou? Moet ik nu echt volwassen worden?</em></p>
      
      <p class="mb-4 text-brand-text/90 leading-relaxed">Onze reactie op deze existentiële crisis? Geen dure sportwagen kopen of een spirituele reis naar Bali boeken. Nee, wij deden wat elke verstandige groep twintigers met een passie voor muziek zou doen: we richtten een snoeiharde rockcoverband op. De naam lag voor de hand: <strong>Quarter Life Crisis (QLC)</strong>. Ons motto? <em>"Play loud, grow up later."</em></p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">De geboorte van de herrie</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Het idee ontstond aan de bar in Spakenburg. Ruben (zang/gitaar) en Daan (leadgitaar) bespraken hun gedeelde nostalgie naar de gouden tijden van de gitaarrock. Waar waren de scheurende solo's op de lokale feesten gebleven? Waarom hoor je in de kroeg alleen nog maar computergestuurde beats? Binnen een week waren Jesse (bas), Thomas (drums), Thijs (toetsen) en Sophie (backing vocals) overgehaald om zich aan te sluiten.</p>
      
      <blockquote class="border-l-4 border-brand-red pl-4 my-6 italic text-brand-text-muted">
        "We wilden de pure energie van een live rockband terugbrengen naar de regio. Geen backing tracks, geen autotune, gewoon zes muzikanten, versterkers op tien en gaan."
      </blockquote>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">De Crisis overwinnen op het podium</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Samen muziek maken bleek de perfecte therapie. De wekelijkse repetities in Bunschoten werden de uitlaatklep van onze week. Al snel merkten we dat de chemie werkte. Ons repertoire werd een eclectische mix van legendarische rockhits van AC/DC, Golden Earring en Guns N' Roses, gecombineerd met moderne anthems van Muse en Kings of Leon. </p>
      
      <p class="mb-4 text-brand-text/90 leading-relaxed">Toen we voor het eerst het podium opstapten, viel alles op zijn plek. De energie die vrijkomt als je samen een volle zaal plat speelt, is onbeschrijfelijk. Het publiek voelt dat we er zelf met 200% plezier staan. Die crisis? Die lossen we wel op met een snoeiharde gitaarsolo en een springend publiek.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Conclusie: Groei later maar op</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Dus, ben je ook rond de 25 en voel je de druk van het burgerlijke leven? Onthoud dat je altijd een keuze hebt. Je kunt thuis op de bank gaan zitten piekeren over je carrière, óf je kunt naar een liveshow van QLC komen en al je zorgen wegschreeuwen bij 'Radar Love'. Wij weten het wel. Tot de volgende show!</p>
    `
  },
  {
    slug: "zo-organiseer-je-een-tuinconcert",
    title: "Zo organiseer je het ultieme tuinconcert (De Backyard Sessions handleiding)",
    date: "2026-07-02",
    category: "Gidsen",
    author: "Daan de Graaf",
    summary: "Droom je van een eigen festival in je achtertuin? Een tuinconcert organiseren is de ultieme manier om de zomer te vieren. In deze gids leggen we je stap-voor-stap uit hoe je dit aanpakt.",
    metaDescription: "Wil je zelf een tuinconcert organiseren? Met onze ultieme Backyard Sessions handleiding regel je geluid, buren en sfeer voor een geslaagd liveoptreden.",
    faqs: [
      {
        question: "Heb ik een vergunning nodig voor een tuinconcert?",
        answer: "Voor een klein besloten feest in je eigen tuin is meestal geen vergunning nodig, mits het geluidsniveau binnen de perken blijft en er geen commerciële verkoop plaatsvindt. Check altijd de APV van jouw gemeente om verrassingen te voorkomen."
      },
      {
        question: "Hoe voorkom ik geluidsoverlast voor de buren?",
        answer: "De gouden regel is: betrek de buren! Nodig ze uit voor het concert, geef van tevoren duidelijk de begin- en eindtijden aan (bijvoorbeeld stoppen met livemuziek om 23:00 uur), en houd rekening met de richting van de speakers."
      }
    ],
    content: `
      <p class="mb-4 text-brand-text/90 leading-relaxed text-base md:text-lg">Niets slaat de sfeer van livemuziek in de buitenlucht op een warme zomeravond. Bij QLC zijn we zo dol op deze intieme sfeer dat we onze eigen concertreeks hebben opgericht: de <strong>Backyard Sessions</strong>. Maar hoe transformeer je een gewone achtertuin in een sfeervol minifestival zonder dat de politie binnen tien minuten op de stoep staat?</p>
      
      <p class="mb-4 text-brand-text/90 leading-relaxed">In deze gids delen we onze belangrijkste lessen en tips, zodat jij thuis ook het perfecte tuinconcert kunt organiseren.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">1. De Gouden Regel: Communiceer met de buren</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Laten we eerlijk zijn: een rockband in een achtertuin produceert aardig wat decibels. De allerbelangrijkste stap is daarom de buren op tijd informeren. Of nog beter: <strong>nodig ze uit!</strong> Mensen die zelf met een koud biertje in de tuin meezingen, zullen niet snel de politie bellen voor geluidsoverlast. Geef daarnaast een duidelijke eindtijd aan (bijvoorbeeld: livemuziek stopt uiterlijk om 23:00 uur) en houd je hier ook strikt aan.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">2. De Techniek & Stroomvoorziening</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Een complete band heeft stroom nodig. Gitaren, bas, toetsen, zangversterking en lichten verbruiken aardig wat Watt. Sluit niet alles aan op één enkele verlengkabel vanuit de keuken; de kans is groot dat de stoppen eruit vliegen zodra de gitarist zijn versterker aanzet. Verdeel de stroomgroepen. Gebruik bijvoorbeeld één groep voor de gitaar- en basversterkers, en een andere groep (uit een ander deel van het huis) voor de zanginstallatie en de verlichting.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">3. Sfeer en Inrichting</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">De charme van een tuinconcert zit in de gezelligheid. Maak gebruik van:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 text-brand-text/90 pl-4">
        <li><strong>Prikkabels & lampionnen:</strong> Warm, indirect licht creëert direct een knusse festivalsfeer.</li>
        <li><strong>Verschillende zithoeken:</strong> Leg picknickkleden neer, zet houten bankjes neer of gebruik strobalen als stoere zitjes.</li>
        <li><strong>Beschutting:</strong> Het blijft Nederland; zorg voor een partytent of overkapping voor het geval er een zomers buitje overtrekt. Dit beschermt ook direct de kostbare instrumenten van de band!</li>
      </ul>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">4. Hapjes en Drankjes</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Houd het simpel. Een grote koelbox (of een kruiwagen!) vol ijs en bier, een paar flessen wijn en wat fris. Een self-service bar werkt het best, zodat jij als gastheer of gastvrouw ook kunt genieten van de muziek. Gooi de barbecue aan of huur een lokale foodtruck om de festivalsfeer helemaal compleet te maken.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Zelf een concert organiseren? Boek QLC!</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Wil je de organisatie van de muziek liever overlaten aan professionals? Wij nemen onze eigen compacte, hoogwaardige geluidsinstallatie mee die perfect is af te stemmen op achtertuinen. Neem contact met ons op via de boekingspagina en we maken er samen een onvergetelijke Backyard Session van!</p>
    `
  },
  {
    slug: "venues-live-muziek-spakenburg-amersfoort",
    title: "De beste live muziek locaties in Spakenburg en Amersfoort",
    date: "2026-07-05",
    category: "Local Scene",
    author: "Thijs Hopman",
    summary: "Op zoek naar een avondje uit met steengoeie livemuziek? Wij hebben de leukste podia, cafés en feestlocaties in Bunschoten-Spakenburg en Amersfoort op een rij gezet.",
    metaDescription: "Ontdek de leukste locaties voor live muziek in Amersfoort en Spakenburg. Van intieme rockcafés tot grote podia in de regio Utrecht.",
    faqs: [
      {
        question: "Waar kan ik live rockmuziek horen in Amersfoort?",
        answer: "Rockcafé De Kei in Amersfoort is veruit de bekendste en gezelligste plek voor live rockmuziek. Daarnaast organiseert poppodium Fluor regelmatig fantastische tribute-avonden en clubconcerten."
      },
      {
        question: "Zijn er livemuziek evenementen in Spakenburg?",
        answer: "Ja! Naast de legendarische Spakenburgse Dagen in de zomer, organiseren lokale cafés zoals Café de Harbour liveoptredens en is het jaarlijkse Dorpsfeest op het Spuiplein hét livemuziek-hoogtepunt van het jaar."
      }
    ],
    content: `
      <p class="mb-4 text-brand-text/90 leading-relaxed text-base md:text-lg">Als band zijn we diep geworteld in de regio Bunschoten-Spakenburg en Amersfoort. We hebben het geluk dat we omringd zijn door een levendige muziekscene met geweldige locaties waar muzikanten en muziekliefhebbers samenkomen. Of je nu houdt van een intieme akoestische set of een dampende rockshow; dit zijn onze favoriete live muziek locaties in de regio.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">1. Rockcafé De Kei (Amersfoort)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Voor de echte rockliefhebber is er in Amersfoort maar één logisch startpunt: <strong>Rockcafé De Kei</strong>. Al decennia lang is dit dé ontmoetingsplek voor liefhebbers van gitaargeweld, koud bier en een ongedwongen sfeer. Er treden regelmatig livebands op, variërend van lokale talenten tot gerenommeerde tributebands. De sfeer is er altijd energiek, intiem en lekker ruig. Het is niet voor niets een van onze favoriete plekken om zelf te spelen!</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">2. Poppodium FLUOR (Amersfoort)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Wil je grotere producties zien? Dan is <strong>FLUOR</strong> in de Nieuwe Stad van Amersfoort the place to be. Dit professionele poppodium biedt plaats aan honderden bezoekers en beschikt over een uitstekende akoestiek en indrukwekkende lichtshows. Van bekende Nederlandse artiesten tot internationale tours en dansavonden; het programma is ontzettend divers.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">3. Het Spuiplein (Bunschoten-Spakenburg)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Het Spuiplein is het kloppende hart van Spakenburg. Hoewel het normaal gesproken een gezellig plein is omringd door terrassen, verandert het tijdens grote evenementen in een gigantisch openluchtpodium. Tijdens de <strong>Spakenburgse Dagen</strong> en het jaarlijkse <strong>Dorpsfeest</strong> treden hier geweldige coverbands op voor duizenden enthousiaste bezoekers. De saamhorigheid en de feeststemming die hier dan heersen zijn werkelijk uniek.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">4. Café de Harbour (Spakenburg)</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Gelegen aan de historische haven van Spakenburg, is Café de Harbour een fantastische plek voor een gezellige avond. Naast lekker borrelen organiseren ze regelmatig live-avonden waarbij lokale bands de kans krijgen om het publiek op te zwepen. De combinatie van het historische decor en de livemuziek zorgt voor een fantastische sfeer.</p>
      
      <h3 class="text-2xl font-display text-brand-amber tracking-wider mt-8 mb-4">Support your local scene!</h3>
      <p class="mb-4 text-brand-text/90 leading-relaxed">Livemuziek kan alleen blijven bestaan dankzij de support van het publiek. Bezoek deze locaties, koop een kaartje voor een show en drink een biertje aan de bar. En mocht je binnenkort een feest of evenement organiseren op een van deze prachtige locaties (of in je eigen achtertuin)? Denk dan aan QLC! Wij komen graag de boel op stelten zetten.</p>
    `
  }
];
