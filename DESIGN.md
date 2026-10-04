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
| UI | `font-stretch` 112 %, vikt 500, 10–12 px, versaler, `letter-spacing` 0.14em | Axeletiketter, pilspetsar, fram/bak-växeln, datarad, header |
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
- **Hero:** kampanjfilmen (9:16 i mobil, 16:9 på dator, högst 76–80 % av höjden) med en kort rad och en understruken länk nere till vänster. Stillbild när rörelse är avstängd.
- **Korset (objektväljaren):** varje kontroll ska synas utan förklaring. Axlarna har små etiketter, "FÄRG" vid den lodräta och "OBJEKT" vid den vågräta.
  - Vågrät axel: armarna slutar i pilspetsar, som på en koordinataxel. Vänster arm visar "‹ #001", höger "#002 ›". Efter sista objektet står "Nästa drop ›", som leder till anmälan.
  - Lodrät axel: färgnamnen, var och en med en ruta av det riktiga tyget (15 px, utskuren ur produktbilderna, `img/swatch-*.webp`; camo är delad diagonalt i tyg och tryck). Den valda glider in under stjärnan med terrakottaprick och benvit ram runt tygrutan. Ovalda färger har benvitt 62 %.
  - Plagget stort i mitten med objektnumret bakom. Svep i sidled byter objekt, tryck på plagget vänder det.
  - Under plagget: en växel **Framsida | Baksida** (1 px ram, benvitt block under vald sida).
  - Sedan datarad (objekt · färg · pris), storlekar S–XL och köpknapp.
- **Anmälan:** "Få nästa droppet först", e-postfält med pilknapp i benvit ram.
- **Avisering:** benvit ruta nertill med miniatyr, objekt, färg, storlek och pris.

## Rörelse
- En kurva: `cubic-bezier(.16, 1, .3, 1)`.
- **Det enda iscensatta ögonblicket är rörelsen i korset:** färglistan glider så att vald färg hamnar under stjärnan (0,6 s). Vid objektbyte glider plagget in från svepets håll, numret byts och stjärnan vrider sig 90° (0,7 s).
- **Fram/bak:** plagget vänder sig runt sin lodräta axel som på en galge (ut 0,25 s, in 0,68 s med samma kurva), och blocket i växeln glider till vald sida (0,55 s).
- **Visa hur, en gång:** första gången plagget syns och ingen har rört korset lutar det sig mot nästa objekt som om någon svepte (1,4 s). Samtidigt pekar pilspetsen åt höger, och sedan ger de ovalda tygrutorna en kort puls i tur och ordning. Det körs inte igen och hoppas över om man redan har tryckt.
- I vila svävar plagget svagt (7 px, 7 s) och golvskuggan andas med. Inga scrollanimationer utöver visningen ovan.
- `prefers-reduced-motion`: allt av, heron visas som stillbild.

## Bildspråk
- Kampanj: 35 mm-film, hårt middagsljus, brutalistisk betong, samma kille i alla bilder (Higgsfield-referenser i `docs/hero-assets.md`).
- Produkt: frilagda plagg (`brand/products/cutout/*.webp`), fram och bak. Svart, blå och camo fungerar alla mot betongen.
- Trycket ska alltid synas ordentligt och aldrig beskäras.

## Webbläsarytor
Markering är `--bone` mot `--ink`, fokusringen är 2 px `--bone` med 3 px avstånd, och `color-scheme: dark`. Piltangenter flyttar mellan färger och storlekar.
