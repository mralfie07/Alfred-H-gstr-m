# Hero-video – produktionsplan

Mål: en hero på 10–12 sekunder av snabba klipp (ca 1 s per klipp) med modeller i OBJECT 07-tröjorna. Så realistisk att ingen märker att den är AI. Klipplista och realismregler: `docs/brief.md` avsnitt 5.

Claude genererar via Higgsfield-kopplingen (kontot är Pro, 600 krediter, verifierat 2026-10-04). **Användaren godkänner efter varje steg innan nästa startar.** Generera aldrig mer än steget kräver.

## Priser (kontrollerade 2026-10-04)
| Vad | Modell | Krediter |
|---|---|---|
| Startbild 2K | `nano_banana_pro` (flera referensbilder, bäst för att hålla trycket exakt) | 2 |
| Startbild 2K | `soul_2` (fashion editorial, bara 1 referensbild) | ~0,1 |
| Videoklipp 5 s, utan ljud | `kling3_0` mode `pro` (start- och slutbild) | 8,75 |
| Videoklipp 5 s, utan ljud | `kling3_0` mode `4k` | 30 |

4K behövs inte: videon visas i högst 1080p på webben och klippen är 1 s långa. Kör `pro`.

## Beslut (användaren, 2026-10-04)
- **Fyra tröjor i heron:**
  1. OBJECT #002 svart-camo, **ryggtrycket** i fokus
  2. OBJECT #001 blå (sidtryck)
  3. OBJECT #001 svart (sidtryck)
  4. OBJECT #002 blå, både rygg- och brösttryck
- **Bara killar som modeller.** Nya modeller, inte de från de gamla Higgsfield-bilderna.
- **Styling:** jeans i stil med Nudie eller Levi's, lite urtvättade, raka eller avslappnade, inte tighta. Skor som passar samma stil (t.ex. enkla läder- eller canvasskor, inget flashigt). Inga synliga varumärken.
- Klipplistan i briefen ska anpassas: bara män, och de fyra tröjorna ovan fördelade över klippen.
- Alla tryckfiler och produktbilder finns (2026-10-04). **Starta inte genereringen förrän användaren säger till.**

## Steg

### 0. Underlag (0 krediter)
- Rätt produktbilder för #001 och #002, fram och bak. Hämta från Shopify (fråga vilka av dubbletterna som gäller) eller `brand/products/`.
- Modeller: nya killar (se Beslut). De gamla modellbilderna är bara stilreferens för miljö och ljus.
- Bekräfta klipplistan i briefen.

### 1. Referenser (0 krediter)
- Ladda upp produktbilder och modellbilder till Higgsfield.
- Skapa först 2–3 nya manliga modeller (visa användaren och låt hen välja), sedan referenselement med `manage_reference_elements`: en per vald modell (character), en per hero-tröja (prop: `o07-001-bla`, `o07-001-svart`, `o07-002-camo`, `o07-002-bla`), eventuellt `o07-concrete` (environment).

### 2. Startbilder (~70 krediter)
- En startbild per klipp, 3–4 varianter per klipp med `nano_banana_pro` 2K, 16:9.
- Referera alltid till karaktär och tröja via elementen, så att ansikte och tryck blir samma i alla bilder.
- Komponera med motivet centrerat och luft runt, så att samma klipp kan beskäras till 9:16 för mobilen.
- Visa varianterna för användaren och välj en per klipp. Kontrollera trycket noga mot produktbilden.

### 3. Videoklipp (~240 krediter)
- `kling3_0` mode `pro`, 5 s, `sound: off`, från vald startbild. Ca 3 tagningar per klipp.
- Rörelse: lugn kamera (långsam inzoomning, dolly, parallax), lite rörelse i kroppen, ingen snabb huvudvridning eller gestikulerande händer.
- Klipp 9 (loopen): använd startbilden från klipp 1 som `end_image` så att loopen blir sömlös.
- Bara 1–2 s av varje klipp används i redigeringen, så välj den bästa sekunden, inte hela klippet.

### 4. Mobilversion (0–60 krediter)
- Beskär 16:9-klippen till 9:16 i redigeringen.
- Generera bara om de klipp som inte fungerar beskurna.

### 5. Redigering (0 krediter, Claude med ffmpeg)
- Klipp i rytm (ca 1 s per klipp), färgkorrigera så att alla klipp matchar, lägg på filmkorn.
- Exportera för webben: dator 1920×1080 och mobil 1080×1920, MP4 (H.264) och WebM, ingen ljudspår, plus en stillbild som visas medan videon laddar.
- Användaren laddar upp till Shopify under Innehåll → Filer.

## Budget
| Steg | Krediter |
|---|---|
| Startbilder | ~70 |
| Videoklipp | ~240 |
| Mobilomtag | 0–60 |
| **Totalt** | **~310–370** |
| Kvar till omtag, produktbilder till OBJECT-väljaren m.m. | ~230–290 |

## Promptstil (gäller alla bilder och klipp)
Skriv på engelska. Grund att utgå från:
> 35mm film photograph, Kodak Portra 400, natural grain, harsh midday sun, deep hard shadows, brutalist raw concrete architecture, muted palette of concrete grey, faded denim blue and black, editorial fashion campaign, candid, no text, no logos, no watermark

- Beskriv tröjan via referenselementet, inte med egna ord om trycket (då hittar modellen på).
- Undvik: läsbar text, händer i fokus, leenden mot kameran, blank hud, perfekt symmetri.
- Samma ljus och tid på dagen i alla bilder.
