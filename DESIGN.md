# DESIGN.md – OBJECT 07

Designsystemet för OBJECT 07:s Shopify-tema. Skrivet från den byggda prototypen (`prototypes/objekt-valjaren/index.html`, fas 1, 2026-10-04). Produktfakta finns i `PRODUCT.md`, konceptet i `docs/brief.md` och sidstrukturen i `docs/sitemap.md`.

## Riktning
En klassisk premium mörk streetwear-dropbutik, rakt utförd. Kampanjfilmen och kampanjbilderna leder i ett lugnt, lyxigt tempo (ribba Aimé Leon Dore / Kith). Produkterna visas grafiskt och självklart: plagget svävar på ett färgblock med sitt objektnummer jättestort bakom (ribba Palace / Stüssy). Godkänd skiss: kombination av `.impeccable/mocks/comp-2-editorial.jpg` och `comp-3-grafisk.jpg`.

Varför mörkt: kunden handlar i mobilen, ofta på kvällen via en länk i bio, och produktfotona är tagna på mörk studiobakgrund. Sajten ska smälta ihop med fotona.

## Färg
Strategi: återhållsam. Mörk grund, benvitt för text, ett färgblock per färgställning som enda stora färgfält, terrakotta en gång per vy.

| Token | Värde | Roll |
|---|---|---|
| `--ink` | `#0c0c0b` | Sidans grund (varm nästan-svart, som studiobakgrunden) |
| `--char` | `#171615` | Upphöjda ytor, bakom video |
| `--rule` | `#2c2a27` | Hårlinjer, kantlinjer på knappar |
| `--bone` | `#ece6dc` | Primär text, primära knappar, vald status (trycks gräddvita färg) |
| `--stone` | `#a6a097` | Sekundär text (7:1 mot `--ink`) |
| `--terra` | `#c2714f` | Den orange pricken ur trycken. Högst en gång per vy |
| `--block-svart` | `#9d978d` | Färgblock bakom svart plagg (betong) |
| `--block-bla` | `#cdbfa6` | Färgblock bakom blått plagg (sand, så denimen syns) |
| `--block-camo` | `#6f7257` | Färgblock bakom camo-plagg (oliv) |

Text på färgblock är alltid `--ink`. Inga gradienter utom den mörka tonen nertill på heron, som gör texten läsbar.

## Typografi
En familj, **Archivo** (variabel, axlarna `wdth` 62–125 och `wght` 100–900, OFL). Self-hostas i temat. Bredden ger släktskapen med det breda geometriska ordmärket.

| Roll | Inställning | Används till |
|---|---|---|
| Display | `wdth` 125, vikt 800–900, versaler, `letter-spacing` −0.02 till −0.04em, `line-height` 0.8–1 | Rubriker, objektnummer, objektväljarens flikar |
| UI | `wdth` 112, vikt 500–700, versaler, 11–13 px, `letter-spacing` 0.08–0.14em | Etiketter, knappar, annonsrad, meny |
| Brödtext | `wdth` 100, vikt 400, 16 px, `line-height` 1.5, max 65 tecken | Beskrivningar, formulär |

Skala: 11 / 12 / 14 / 16 / 18 / 24–34 (produktnamn) / 28–52 (sektionsrubrik) / 30–72 (anmälan) px. Det jättestora objektnumret bakom plagget är `min(46vw, 330px)` i `--ink` med 16 % opacitet. Rubriker har `text-wrap: balance`. Siffror i priser och antal är `tabular-nums`.

## Avstånd och form
- Skala på 4 px: 4, 8, 12, 16, 24, 32, 48, 72.
- Sidmarginal: `clamp(16px, 4vw, 40px)`. Innehållsbredd högst 1240 px.
- **Skarpa hörn överallt.** Ingen rundning på knappar, kort eller bilder. Enda undantaget är räknarbubblan på varukorgen.
- Knappar och val är 52–58 px höga (tumvänliga). Vald status: `--bone`-fyllning med `--ink`-text. Ovald status: 1 px `--rule`-kant.
- Skuggor bara där något svävar: plaggets `drop-shadow(0 28px 22px)` och aviseringens skugga. Inga kortskuggor.

## Komponenter
- **Annonsrad:** benvit list med droppstatus i UI-stil.
- **Header:** sticky, meny till vänster, ordmärket i mitten och varukorg med räknare till höger. Halvgenomskinlig `--ink` med oskärpa bakom.
- **Hero:** kampanjfilmen (9:16 i mobil, 16:9 på dator, max 78–82 % av höjden) med en kort rad och en understruken länk nere till vänster. Stillbild när rörelse är avstängd.
- **Objektväljaren:** flikar för objekten (#001, #002), scen med färgblock, jättenummer, plagg och "Visa fram/bak"-knapp, sedan namn, pris, färgrutor (camo-rutan visar själva camotrycket), storlekar S–XL och knappen "Lägg i varukorgen". Svep på scenen byter färg. På dator: scen till vänster (7/12), info till höger (5/12, sticky).
- **Anmälan:** jättestor rubrik "Få nästa droppet först", e-postfält med pilknapp i benvit ram.
- **Avisering:** benvit ruta nertill med miniatyr på färgblock, objekt, färg, storlek och pris.

## Rörelse
- En kurva: `cubic-bezier(.16, 1, .3, 1)` (exponentiellt avtagande).
- **Det enda iscensatta ögonblicket är färg- och objektbytet:** blocket glider till ny färg (0,6 s), plagget tonar in med ett litet lyft (0,45–0,7 s) och numret byts med en glidning uppåt.
- Plagget svävar mycket svagt i vila (6 px, 7 s). Inga scrollanimationer på varje sektion.
- `prefers-reduced-motion`: alla animationer av, heron visas som stillbild.

## Bildspråk
- Kampanj: 35 mm-film, hårt middagsljus, brutalistisk betong, samma kille i alla bilder (Higgsfield-referenser i `docs/hero-assets.md`).
- Produkt: frilagda plagg (`brand/products/cutout/*.webp`) på färgblock, fram och bak.
- Trycket ska alltid synas ordentligt och aldrig beskäras bort.

## Webbläsarytor
Markering är `--bone` mot `--ink`, fokusringen är 2 px `--bone` med 3 px avstånd, och `color-scheme: dark` ger mörka formulärkontroller.
