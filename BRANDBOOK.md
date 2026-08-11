# Quarter Life Crisis — Brandbook

> Bron: officieel merkdocument *QLC branding.pdf* + logo-voorkeur van de band
> (grungy rock-wordmark). Dit is het werkbestand voor de website. Assets staan in
> `public/images/brand/`.

---

## Merkverhaal

Quarter Life Crisis (QLC) is een zeskoppige rockband uit Bunschoten-Spakenburg &
Amersfoort. Een vriendengroep die al jaren samen muziek maakt en op hun 25e
besloot er nooit meer mee te stoppen. Het merk voelt als de band zelf: een groep
die samensmelt tot één geheel zodra ze samen spelen.

**Payoff:** *Play loud, grow up later.*

### Kernwoorden

| Kernwoord | Betekenis |
|---|---|
| **Verbinding** | De vriendengroep die samensmelt tot één band |
| **Speelsheid** | Energiek en zelfspottend, nooit te serieus |
| **Nostalgie** | Vloeiend, imperfect, vertrouwd |
| **Meebewegen** | Het merk past zich aan de gelegenheid aan, net als de sets die gespeeld worden |

---

## Beeldmerk

De vloeiende **QLC**-vorm: de letters Q, L en C lopen in elkaar over en vormen
samen één organische vorm. Symbool voor de band — geen losse personen, maar één
geheel zodra ze samen spelen. Gebruik als compact icoon (header, favicon, sticker,
social avatar).

- Asset: `public/images/brand/qlc-beeldmerk-white.png` (wit, transparant)

## Logo (wordmark)

De gestapelde belettering **QUARTER LIFE CRISIS©** in een ruwe, verweerde
condensed rockletter. De woorden lopen in elkaar over en vormen samen één geheel,
net als het beeldmerk. Compact, dynamisch, allesbehalve statisch — net als de
energie op het podium. Dit is de door de band gekozen rock-variant (i.p.v. de
rondere "groovy" letters uit de PDF).

- Asset: `public/images/brand/qlc-wordmark-white.png` (wit, transparant, grunge-textuur)
- Gekleurde lockups: `qlc-lockup-purple.png`, `qlc-lockup-red.png`

Gebruik de wordmark waar ruimte is (hero, footer, backdrop, poster, merch). Gebruik
het beeldmerk waar het klein/vierkant moet (header, favicon).

---

## Kleuren

**Rood is de hoofdkleur.** Aangevuld met een flexibel palet zodat de uitstraling
per gelegenheid kan meebewegen (feest, kroeg, festival). Favoriete combinatie van
de band: **rood + paars**.

### Primair

| Rol | Hex | Token |
|---|---|---|
| Hoofdrood | `#DF151F` | `--color-brand-red` |
| Donkerrood | `#580000` | `--color-brand-red-dark` |
| Wit / cream | `#FFFFFF` / `#F1F1F1` | `--color-brand-cream` |
| Donker (bg) | `#1A1A1C` / `#222222` | `--color-brand-bg` |

### Flexibel palet (accenten)

| Kleur | Hex | Token |
|---|---|---|
| Paars donker | `#4B113D` | `--color-brand-purple` |
| Paars licht | `#926BA3` | `--color-brand-purple-light` |
| Teal donker | `#183842` | `--color-brand-teal` |
| Sage / licht teal | `#7DB4B0` | `--color-brand-teal-light` |
| Groen donker | `#184239` | `--color-brand-green` |
| Mint / groen | `#4DCD83` | `--color-brand-green-light` |

**Regel:** rood voert de boventoon; kies per sectie/gelegenheid één accent uit het
flexibele palet. Combineer nooit een rood logo op een rode achtergrond — kies daar
een contrastkleur (wit of paars).

---

## Typografie

| Gebruik | Font | Notitie |
|---|---|---|
| Logo / wordmark | Verweerde condensed rockletter (in het logo-asset) | Vaste asset, niet als webfont nodig |
| Koppen (UI) | **Bebas Neue** | Condensed display, hoofdletters, tracking |
| Body | **Inter** | 400 / 600 / 700 |

Schaal: display groot en brutaal, body rustig en leesbaar (het "stabiele grid,
wilde decoratie"-principe).

---

## Toepassing & do's / don'ts

- ✅ Beeldmerk klein/vierkant (header, favicon, avatar); wordmark groot (hero, footer, poster, backdrop).
- ✅ Rood als hoofd­kleur; per sectie één accent (rood + paars is de favoriet).
- ✅ Wit logo op donkere of gekleurde achtergrond — hoog contrast.
- ❌ Geen rood logo op een rode achtergrond.
- ❌ Wordmark niet zo klein dat de gestapelde letters onleesbaar worden — gebruik dan het beeldmerk.
- ❌ Kleuren van het logo niet aanpassen buiten wit / de palet-kleuren.

---

*Assets: `public/images/brand/` · Kleur-tokens: `src/index.css` (`@theme`).*
