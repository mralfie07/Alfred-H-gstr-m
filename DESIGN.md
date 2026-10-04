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
- **Anmälan:** "Få nästa droppet först", e-postfält med pilknapp i benvit ram.
- **Avisering:** benvit ruta nertill med miniatyr, objekt, färg, storlek och pris.

## Rörelse
- En kurva: `cubic-bezier(.16, 1, .3, 1)`.
- **Det enda iscensatta ögonblicket är rörelsen i korset:** färglistan glider så att vald färg hamnar under stjärnan (0,6 s). Vid byte av kollektion glider plagget in från svepets håll (110 px, längre än vid färgbyte), numret byts, stjärnan vrider sig 90° (0,7 s) och flikstapeln glider över (0,55 s).
- **Fram/bak:** plagget tonar direkt över till andra sidan (samma övertoning som vid färgbyte, ingen vändning), och blocket i växeln glider till vald sida (0,55 s). Användaren valde bort en 3D-vändning 2026-10-04.
- **Visa hur, en gång:** första gången plagget syns och ingen har rört korset kommer tre steg. Först lutar plagget sig som om någon svepte, och blocket i fram/bak-växeln sträcker sig mot andra sidan (1,4 s). Sedan lyser den andra kollektionens miniatyr upp och flikstapeln sträcker sig dit (1,3 s). Sist ger de ovalda tygrutorna en kort puls i tur och ordning. Det körs inte igen och hoppas över om man redan har tryckt.
- I vila svävar plagget svagt (7 px, 7 s) och golvskuggan andas med. Inga scrollanimationer utöver visningen ovan.
- `prefers-reduced-motion`: allt av, heron visas som stillbild.

## Bildspråk
- Kampanj: 35 mm-film, hårt middagsljus, brutalistisk betong, samma kille i alla bilder (Higgsfield-referenser i `docs/hero-assets.md`).
- Produkt: frilagda plagg (`brand/products/cutout/*.webp`), fram och bak. Svart, blå och camo fungerar alla mot betongen.
- Trycket ska alltid synas ordentligt och aldrig beskäras.

## Webbläsarytor
Markering är `--bone` mot `--ink`, fokusringen är 2 px `--bone` med 3 px avstånd, och `color-scheme: dark`. Piltangenter flyttar mellan färger och storlekar.
