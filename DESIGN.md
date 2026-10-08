# DESIGN.md – OBJECT 07

Designsystemet för OBJECT 07:s Shopify-tema. Skrivet från den byggda prototypen (`prototypes/objekt-valjaren/index.html`, fas 1, 2026-10-04). Produktfakta finns i `PRODUCT.md`, konceptet i `docs/brief.md` och sidstrukturen i `docs/sitemap.md`.

## Riktning: Korset
Droppet visas som ett kors på kampanjens egen betong. **Objekten** (#001, #002, nästa drop) ligger längs den vågräta axeln och **färgställningarna** (svart, blå, svart-camo) längs den lodräta. Emblemets fyruddiga stjärna sitter där axlarna möts, och den valda färgen glider in under stjärnan. Grammatiken kommer från 2007 års korsmenyer, översatt till märkets material: betong, benvitt och en terrakottaprick. Inget blått sken, inga vågor. Godkänd skiss: `.impeccable/mocks/decision/a-korset.jpg`. Ribban för finish är Aimé Leon Dore / Kith och Palace / Stüssy.

Varför betong och mörkt: kunden handlar i mobilen, ofta på kvällen via en länk i bio. Betongen är samma vägg som i kampanjfilmen, så filmen och butiken blir samma plats.

## Färg
Strategi: återhållsam. Betongytan är det enda stora fältet. Allt annat är benvitt på mörkt, och terrakottan används bara för att markera vald färg.

| Token | Värde | Roll |
|---|---|---|
| `--ink` | `#0c0c0b` | Header, filmens bakgrund, anmälan, sidfot |
| `--char` | `#171615` | Bakom video medan den laddar |
| `--rule` | `#2c2a27` | Hårlinjer på mörk grund |
| `--bone` | `#ece6dc` | Text, korsets stjärna, primärknapp, vald storlek (trycks gräddvita färg) |
| `--bone-dim` | benvitt 50 % | Korsets linjer, objektnumret, sekundär text på betong |
| `--bone-faint` | benvitt 28 % | Ramen runt ovalda tygrutor |
| `--stone` | `#b3ada3` | Sekundär text på mörk grund |
| `--terra` | `#c2714f` | Pricken vid vald färg (ur trycken). Ingen annan användning |
| `--concrete-veil` | `#0c0c0b` 40 % | Mörk slöja över betongen, så benvit text klarar 4,5:1 |

Betongtexturen är `img/concrete.webp`, en bild av väggen och golvet ur kampanjklipp 6, avfärgad och varmtonad. Den läggs `center bottom / cover` så att golvet hamnar under plagget.

## Typografi
En familj, **Archivo** (variabel, `wdth` 62–125, `wght` 100–900, OFL). Self-hostas i temat. Bredden ger släktskapen med det breda geometriska ordmärket. Korset använder lätta vikter, som ordmärket.

| Roll | Inställning | Används till |
|---|---|---|
| Objektnummer | `font-stretch` 125 %, vikt 300, `min(52vw, 300px)`, `--bone-dim` | Jättenumret bakom plagget |
| Axel-etiketter | `font-stretch` 112 %, vikt 400, 16–20 px, versaler, `letter-spacing` 0.06em | Färgnamnen på den lodräta axeln |
| UI | `font-stretch` 112 %, vikt 500, 10–12 px, versaler, `letter-spacing` 0.14em | Axeletiketter, fram/bak-växeln, datarad, header |
| Rubrik | `font-stretch` 125 %, vikt 400, 26–44 px, versaler | Anmälans rubrik |
| Brödtext | `font-stretch` 100 %, vikt 400, 16 px, `line-height` 1.5, max 65 tecken | Beskrivningar, formulär |

Rubriker har `text-wrap: balance`. Priser och räknare är `tabular-nums`.

## Avstånd och form
- Skala på 4 px: 4, 8, 12, 16, 24, 32, 48, 72. Sidmarginal `clamp(16px, 4vw, 40px)`. Korset är högst 560 px brett och centrerat, betongen går kant i kant.
- **Skarpa hörn överallt.** Enda undantagen är räknarbubblan på varukorgen och terrakottapricken.
- Korsets mått: vågrät axel på 104 px höjd, en färgrad är 34 px, linjerna är 1 px `--bone-dim` med ett glapp på 28 px runt stjärnan (40 px).
- Storleksknappar 56 × 56 px med 1 px kant, köpknappen 58 px hög i full bredd.
- Skuggor bara där något svävar: plaggets `drop-shadow` och en suddig golvskugga under det.

## Komponenter
- **Header:** svart, sticky, ordmärket till vänster, meny och varukorg med räknare till höger. Räknaren syns först när något ligger i korgen.
- **Hero:** kampanjfilmen i full bredd från en och samma fil i källans upplösning (`brand/hero/hero-v2-original.mp4`, 16:9). På dator visas hela bilden. I mobil och på surfplatta visas en centrerad kvadrat (ca 56 % av bredden, högst 72 % av skärmhöjden), så att filmen får tyngd utan den kraftiga inzoomningen från det gamla 9:16-utsnittet (användarens beslut 2026-10-04). Raden och den understrukna länken står nere till vänster i bilden, ovanpå en mörk toning (även i mobil, aldrig i ett svart fält under filmen). Stillbild när rörelse är avstängd.
- **Korset (objektväljaren):** varje kontroll ska synas utan förklaring.
  - **Två separata kollektioner** (användarens beslut 2026-10-04): överst en flikrad, "DROP 01 · TVÅ KOLLEKTIONER", med en flik per objekt. Varje flik har en miniatyr av tröjan i vald färg, och bara numret, stort (`#001`, `#002`, bredd 125 %, vikt 300). Inga beskrivande ord som "sidtryck" eller "kyssmotiv" (användarens beslut). En benvit stapel på 2 px glider under den öppna kollektionen. Den andra fliken börjar på korsets lodräta axel. Sidan öppnar på #001.
  - Den lodräta axeln har etiketten "FÄRG".
  - Vågrät axel: två rena hårlinjer med glapp runt stjärnan, utan knappar (användaren tog bort pilarna 2026-10-04).
  - Lodrät axel: färgnamnen, var och en med en ruta av det riktiga tyget (15 px, utskuren ur produktbilderna, `img/swatch-*.webp`; camo är delad diagonalt i tyg och tryck). Den valda glider in under stjärnan med terrakottaprick och benvit ram runt tygrutan. Ovalda färger har benvitt 62 %.
  - Plagget stort i mitten med objektnumret bakom. **Svep i sidled vänder plagget** mellan fram och bak, och den andra sidan glider in från svepets håll (60 px). Tryck på plagget vänder det också. Kollektion byts **bara** med flikarna #001 och #002, aldrig med svep (användarens beslut 2026-10-04). Axeln ligger ovanför plagget, så att den nedersta färgen alltid går att trycka på.
  - Under plagget: en växel **Framsida | Baksida** (1 px ram, benvitt block under vald sida).
  - Sedan datarad (objekt · färg · pris), storlekar S–XL och köpknapp.
- **Anmälan:** "Få nästa droppet först", e-postfält med pilknapp i benvit ram. Kampanjporträttet (campaign-07) mörkt bakom, valbart.
- **Arkivband** (`archive-ticker`), **kampanjband** (`campaign-reel`), **ordmärket stort i sidfoten** och **kampanjfoto bakom kollektionsnumret**: tillkom i fas 3, se Rörelse. Alla kan stängas av eller bytas i temaredigeraren.
- **Avisering:** benvit ruta nertill med miniatyr, objekt, färg, storlek och pris.

## Rörelse
**Fas 3 (2026-10-08):** användaren valde bort "lugnt" och vill ha rörelse fullt ut ("helt sjuka animationer", den ultimata sajten). Allt utgår ändå från märkets egna element: stjärnan, horisonten den skär genom ovalen, arkivnumren och betongen. Byggt i `theme/assets/motion.css`, `motion.js`, `snippets/motion-head.liquid` och i varje sektions egen stylesheet/javascript.

### Kurvor och regler
- `--ease-out` `cubic-bezier(.16, 1, .3, 1)`: det mesta (in, ut, tillstånd).
- `--ease-in-out` `cubic-bezier(.77, 0, .175, 1)`: rörelse över skärmen (ridåer, horisonten, plagg som flyger mellan sidor).
- `--ease-spring` (`linear()`, dämpad fjäder ζ 0,55, ca 12 % översving): sådant som landar (plagg, stjärnan).
- Bara `transform`, `translate`, `scale`, `rotate`, `opacity` och `clip-path`. Hover-rörelse bara för mus (`hover: hover` och `pointer: fine`).
- `<html class="motion">` sätts före första bildrutan när besökaren tillåter rörelse. All rörelse hänger på den. Utan (avstängd rörelse, inget JS, eller om `motion.js` inte laddas inom 6 s) står allt stilla och synligt. `prefers-reduced-motion`: allt av, heron som stillbild, kampanjbandet blir en remsa att svepa i.

### Iscensatta ögonblick
- **Intro (första besöket på startsidan per session):** svart skärm, stjärnan vrider sig ett kvarts varv i taget och "EST. 2007" rullar fram som ett räkneverk medan filmen laddar (minst 1,9 s, högst 3,6 s, klick eller tangent hoppar över). Stjärnan sträcks ut till en horisontlinje, skärmen klyvs längs den och halvorna glider isär (1,3 s), filmen zoomar ut från 1,18, headern glider ner och raden avkodas. Hoppas över i temaredigeraren.
- **Sidbyten (View Transitions, Chrome och Safari 18.2+):** nästa sida öppnar sig från en horisontlinje mitt på skärmen (0,85 s) medan den gamla sjunker bakåt och mörknar. Headern står still. Plagget och arkivnumret flyger mellan kort/kors och produktsida åt båda hållen och lyfter lite på vägen (0,9 s). Produktsidan öppnar på samma sida (fram/bak) som visades i korset.
- **Korset byggs i två steg:** när korset kommer in stiger flikarna, axlarna ritas ut från stjärnan och stjärnan snurrar in med fjäder. När plaggytan kommer in rullar numret fram och plagget faller ner på sitt golv. Sedan "visa hur" som förut.
- **Kampanjbandet:** nio kampanjbilder som filmremsa. Sidan scrollar nedåt, rutorna åker i sidled under en fast rubrik, varje bild glider inuti sitt fönster, rutan i mitten är skarp och de andra dämpade, ett jätteord ("OBJECT 07") glider bakom i en tredjedels fart och rutnumret rullar.
- **Arkivbandet:** jättetext med riktiga produktdata som löper. Scroll gör det snabbare och lutar det, scroll uppåt vänder det.

### Arkivnummer
Siffrorna rullar på plats som ett räkneverk (`snippets/numeral-roll.liquid`, `theme.rollTo`): kollektionens #001, produktsidans nummer, korsets nummer (rullar framåt eller bakåt vid flikbyte), introts år, 404 och kampanjbandets räknare.

### Plagget
- Svävar i vila (7–8 px, 7 s) med golvskugga, i korset och på produktsidan.
- **Dra i sidled:** plagget följer fingret med motstånd och vänds när man släpper långt eller snabbt nog, annars fjädrar det tillbaka. Tryck vänder också.
- **Mus:** plagget lutar i 3D mot pekaren (högst ca 11°), numret glider åt andra hållet för djup. En benvit markör säger "VÄND" (och "ÖPPNA" på kollektionskorten).
- **Köp:** knappens text ger plats åt stjärnan som vrider sig medan korgen svarar. Sedan flyger en kopia av plagget i en båge in i väskan, som gungar till.
- Fram/bak: framsidan ligger till vänster om baksidan, som i växeln. Det nya glider in från rätt håll (56 px), och blocket i växeln glider under vald sida.

### Scroll
- Heron zoomar in (1,16) och sjunker i svart när man scrollar förbi, och raden lyfter bort fortare.
- Kollektionens kampanjfoto glider ner bakom numret, plaggen svävar på eget djup i korten och numret i korset ligger djupare än plagget.
- Saker under vikningen glider in en gång när de kommer i bild (rubriker maskas fram underifrån, fältet i anmälan ritas ut från vänster). Det som syns vid laddning rörs aldrig.
- Ordmärket stiger upp ur sidfotens nederkant.

### Små saker
Filmkorn över hela sajten (35 mm, 0,07). Etiketter avkodas från arkivtecken (`0–9 # * + / < >`) och behåller bredden. Länkar: strecket går ut åt höger och ritas in igen från vänster. Headerlänkar rullar upp. Storleksrutan fylls nerifrån. Dragspel öppnas mjukt. Menyn faller ner som en ridå och raderna stiger fram en i taget. Varukorgsrader glider in, och en borttagen rad glider ut medan resten flyttar upp. Anmälans pilknapp och kollektionslänkarna dras mot pekaren. Varukorgsbubblan studsar.

## Bildspråk
- Kampanj: 35 mm-film, hårt middagsljus, brutalistisk betong, samma kille i alla bilder (Higgsfield-referenser i `docs/hero-assets.md`).
- Produkt: frilagda plagg (`brand/products/cutout/*.webp`), fram och bak. Svart, blå och camo fungerar alla mot betongen.
- Trycket ska alltid synas ordentligt och aldrig beskäras.

## Webbläsarytor
Markering är `--bone` mot `--ink`, fokusringen är 2 px `--bone` med 3 px avstånd, och `color-scheme: dark`. Piltangenter flyttar mellan färger och storlekar.
