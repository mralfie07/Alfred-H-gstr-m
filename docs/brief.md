# OBJECT 07 – brief

Målet: en komplett Shopify-sajt som känns som den kostat 100 000 dollar. Unik, realistisk och utan AI-generisk känsla.

## 1. Märket
- **Namn:** OBJECT 07, est. 2007.
- **Emblem:** en oval där en fyruddig stjärna skär igenom som en horisont. "07" bryter ut till höger. Sliten ytstruktur som påminner om sten eller marmor. Y2K- och sci-fi-känsla.
- **Ordmärke:** brett geometriskt typsnitt där O:et ersatts av emblemet. Glest spärrat "EST. 2007" under.
- **Huvudlogga:** ordmärket med "EST. 2007" (`brand/logo/wordmark-raster.png`) används på hemsidan (header) och på nacketiketten i tröjorna. Emblemet ensamt (`emblem-raster.png`) används där det är trångt, till exempel favicon och mobilmeny.
- **Favicon:** emblemet, bekräftat av användaren. Beskär tätt runt ovalen (emblemet tar bara ca halva bilden nu). Testa i 16–32 px: stenstrukturen och "07" syns knappt i den storleken, så en förenklad version (ren vit oval och stjärna) kan behövas för de minsta storlekarna. Visa användaren innan.
- Loggorna finns bara som raster (PNG, ca 1254 × 1254 px). Vektor (SVG) behövs för en skarp header; finns ingen kan den ritas om som SVG i fas 1 och godkännas av användaren.
- **Färger:** svart och benvitt/sten. Accent: den orange pricken från trycken. Inga fler färger utan att fråga.
- **Känsla:** mer konst och arkiv än streetwear-merch. Lugnt, tungt, genomtänkt.

## 2. Produkter
- Oversized, tunga t-shirts i acid wash, med vävd nacketikett och ärmlapp med "OBJECT 07".
- **OBJECT #001:** svart/kolgrå acid wash. Linjeansikte som går runt kanten nertill på framsidan.
- **OBJECT #002:** blå acid wash. Två ansikten som kysser varandra och bildar ett hjärta, stort på ryggen och litet på bröstet.
- **Tryckfiler (original, från användaren 2026-10-04):** översikt i `brand/prints/print-overview.png`. Två motiv i tre färgställningar (svart, blå, svart-camo):
  - **Kyssmotivet** (två ansikten som bildar ett hjärta): bröst + rygg. Filer `1_svart_brost/rygg`, `2_bla_brost/rygg`, `3_svart-camo_brost/rygg`.
  - **Sidtrycket** (#001): kyssmotivet delat över sidsömmen. Ett ansikte i profil på **framsidan** precis intill sidsömmen, det andra ansiktet på **baksidan** på andra sidan sömmen. Sömmen går lodrätt genom mitten av motivet och ansiktena möts där, som en kyss över sömmen. Sitter lågt på sidan. Filer `4_svart-sidtryck_fram/bak`, `5_bla-sidtryck_fram/bak`, `6_svart-camo-sidtryck_fram/bak`.
  - **Numrering (bekräftad av användaren 2026-10-04):** **OBJECT #001 = sidtrycket**, **OBJECT #002 = kyssmotivet** (bröst + rygg). Varje nummer finns i tre färger: svart, blå, svart-camo. Totalt sex plagg, i Shopify som sex produkter (städat i fas 2, se avsnitt 12).
  - Enskilda tryckfiler i full storlek ligger i `brand/prints/` (`1_svart_brost.webp` osv.). Alla tolv tryckfiler finns (komplett 2026-10-04).
  - **Produktbilder (fram + bak) för alla sex finns i `brand/products/`**, namngivna `<färg>-<motiv>_<fram|bak>.jpg` (färg: `svart`, `bla`, `svart-camo`; motiv: `kyss`, `sidtryck`). Camo-bilderna är ca 1600–1800 px, övriga ca 750–900 px (be om större till sajten). `object-002-sheet.png` visar nacketikett och ärmlapp i närbild.
  - Översikten är för liten som AI-referens. Använd de enskilda PNG-filerna i full upplösning när de finns i `brand/prints/`.
- Numreringen "OBJECT #00X" är märkets starkaste idé. Varje plagg presenteras som ett katalogiserat föremål.
- Priser, storlekar, material och måttguide hämtas från Shopify (läggs in av användaren).

## 3. Koncept: ~~mörkt galleri/arkiv~~ ersatt 2026-10-04
**Användaren valde i fas 1 riktningen Korset (se PRODUCT.md, DESIGN.md, docs/concept-round.md). Ribba för finish: Aimé Leon Dore / Kith och Palace / Stüssy. Texten nedan är det ursprungliga konceptet, kvar som historik; numreringen och märkets element används fortfarande som innehåll.**

- Svart bakgrund som smälter ihop med produktfotona.
- Varje plagg visas som ett utställt föremål med katalognummer och "objektdata" (material, vikt, upplaga).
- Typografin följer ordmärket: brett och geometriskt, med glest spärrade små versaler.
- Stjärnan ur emblemet är ett återkommande motiv: laddning, hover, avdelare, markör.
- Stenstrukturen ur loggan kan bli en yta eller ett landskap (jämför stenlandskapet i Zero Point-referensen).

## 4. Startsidans struktur (förslag, kan ändras i fas 1)
1. **Hero-video** (se 5) med logga och kort rad i kod ovanpå.
2. **OBJECT-väljaren** (se 6), som man landar i när man scrollar.
3. Arkivet/kollektionen: alla plagg som numrerade föremål.
4. Märkets berättelse: vad "07" och "est. 2007" står för.
5. Nyhetsbrev eller anmälan till nästa drop.
6. Sidfot med policyer, sociala kanaler och eventuell AI-märkning (se 9).

## 5. Hero: snabba klipp av modeller
- Snabba klipp, ungefär 1 sekund per klipp, 10–12 sekunder totalt, sömlös loop.
- Miljö: brutalistisk betong, hårt solljus, filmkänsla (som modellbilderna i `brand/references/`).
- Ingen text eller logga i själva videon. Det läggs i kod ovanpå så att det blir skarpt och kan animeras.
- ~~En version för dator (16:9) och en för mobil (9:16).~~ Ändrat 2026-10-04: en version i originalformat (16:9) för både mobil och dator.
- Föreslagen klipplista:
  1. Extrem närbild på acid wash-tyget i solljus
  2. Vidbild: modell går mellan betongpelare, liten i bild
  3. Kvinnan vrider huvudet mot kameran
  4. Pelarnas skuggor glider över trycket
  5. Mannen underifrån, långsam inzoomning
  6. Modell vänder sig om och visar ryggtrycket (#002)
  7. #001 i svart, ny vinkel
  8. Närbild på ett ansikte, blicken mot kameran
  9. Tillbaka till tyget, loopar till klipp 1
- **Realism:** utgå alltid från en startbild där trycket är rätt, korta klipp, låt kameran röra sig mer än kroppen, samma modeller i alla klipp, inga läsbara texter i AI-bilder (använd riktiga produktbilder för etiketter), inga händer i fokus, inget vattenmärke.
- **Bearbetning (Claude):** klipp ihop i rytm, färgkorrigera så klippen matchar, lägg på filmkorn, komprimera för webben (två format), stillbild som visas medan videon laddar. Använd ffmpeg (installera vid behov).

## 6. OBJECT-väljaren (interaktiv produktsektion)
Inspiration: `brand/references/ref-zero-point-product-switcher.jpg` och `ref-nike-floating-product.png`. Översätt idéerna, kopiera inte layouten.
- Plagget svävar i mitten med mjuk skugga och lite rörelse i tyget, så att det inte ser ut som en platt utklippt bild.
- Jättetext bakom plagget ("OBJECT" eller "#001") i ordmärkets typsnitt, delvis dold.
- Väljare #001 → #002 → … som byter plagg, text och färgton med en animerad övergång.
- Detaljer som svävar runt plagget: nacketikett, ärmlapp, tryck i närbild.
- Storlek och "lägg i varukorgen" direkt i sektionen.
- Egen layout för mobil, inte en nedskalad datorversion.
- Kräver frilagda produktbilder (PNG med genomskinlig bakgrund).

## 7. Teknik
- Eget Shopify-tema i det här repot. Sektioner och block ska gå att redigera i Shopifys temaredigerare.
- Publicering via Shopifys GitHub-integration (kopplas in av användaren när det är dags).
- Produktdata via Shopify-kopplingen.
- Prestanda: komprimerad video med stillbild, lazy loading, `prefers-reduced-motion` respekteras, snabb första visning i mobilen.
- Kassan styrs av Shopify och kan inte designas om utan Shopify Plus.
- **Butiken:** OBJECT 07, `egkwr4-wr.myshopify.com`, valuta SEK, land Sverige. Är kopplad via Shopify-kopplingen (verifierat 2026-10-03).
- **Plan:** provperiod (trial). Temat kan byggas och förhandsgranskas, men butiken måste uppgraderas innan försäljning.

## 8. Faser och effort

| Fas | Innehåll | Effort |
|---|---|---|
| 1 | Koncept, `DESIGN.md` (färger, typsnitt, avstånd, rörelseprinciper), sidstruktur, gärna en prototyp av OBJECT-väljaren | high + `ultrathink` |
| 2 | Temats grund: layout, header, sidfot, kollektion, produktsida, varukorg | medium |
| 3 | Hero-video och motion i hela sajten | high |
| 4 | Mobil, finslipning, tillgänglighet, prestanda | low–medium |

Varje fas i en egen session. Användaren godkänner fas 1 innan kodningen börjar.

## 9. Öppna frågor
- **AI-märkning:** användaren har valt bort märkning i sidfoten (se avsnitt 13). Bakgrund: EU:s AI-förordning kan kräva att realistiskt AI-genererat innehåll märks ut. Kontrollera vad som gäller. Förslag: en diskret rad i sidfoten, till exempel "Kampanjbilder skapade med AI".
- Språk (svenska, engelska eller båda) och vilka länder butiken säljer till.
- Vilka sidor som ska finnas utöver startsida, kollektion och produktsida.
- Shopify-plan, domän och lanseringsdatum.
- Typsnittet i ordmärket och om det finns licens för webben.

## 10. Higgsfield: arbetsflöde och budget
- Användaren har köpt Higgsfield **Pro, 29 dollar per månad, 600 krediter** (verifierat via kopplingen 2026-10-04). Säg upp förnyelsen när heron är klar.
- **Produktionsplan för heron: `docs/hero-plan.md`.** Den ersätter uppskattningarna nedan.
- Uppskattad åtgång för heron: ~400 krediter (startbilder ~20, ~20 testklipp ~280, slutversion i 4K i två format ~96).
- Priser per 8-sekundersklipp (kontrollerade okt 2026): Kling 3.0 Pro utan ljud 14 krediter, MiniMax H3 2K 16, Kling 3.0 4K 48, Seedance 2.5 1080p 96 (utkast i 480p 24).
- Testa billigt (Kling 3.0 Pro eller Seedance-utkast, gärna i Higgsfields webbapp). Kör 4K först när rörelse och stil sitter, en gång per format.
- Spara modellerna som referenskaraktärer i Higgsfield så att ansiktena är samma i alla klipp.
- Kontrollera om Pro-planen fungerar via MCP. Om inte genererar användaren i webbappen och skickar filerna.
- Färdig video laddas upp i Shopify under Innehåll → Filer (Shopifys CDN).

## 11. Användarens önskemål
- Ska kännas som en sajt för 100 000 dollar: video-hero, motion som av en riktig motion designer, helt komplett.
- Ingen AI-generisk känsla. Bilderna och videon ska vara så realistiska att ingen märker att de är AI.
- Gillar referenserna i `brand/references/` (svävande produkt, jättetext bakom, väljare som byter scen).
- Vill inte göra av med sin usage i onödan: en fas per session, ny session för varje fas, samla feedback. Grundnivå medium effort, high för koncept och motion.
- Vill bli tillfrågad innan något byggs eller publiceras som inte ingår i den fas som körs.

## 12. Att rätta i nuvarande butik
- Annonsraden säger "Welcome to our store".
- Headern visar "OBJECT 07" som vanlig text i stället för loggan.
- ~~Priserna står på 0,00 kr.~~ Fixat: alla produkter kostar 799 kr (2026-10-03).
- Standardtemat är vitt och krockar med de mörka produktbilderna.

Produktstatus 2026-10-04 (efter fas 2, ändrat med användarens godkännande): sex produkter, en per färg, alla 799 kr med storlekarna S–XL.

| Kollektion | Produkt | Webbadress (gammal) |
|---|---|---|
| OBJECT #001 (`object-001`) | OBJECT #001 – Svart | `object-001-svart` (`object-1`) |
| | OBJECT #001 – Blå | `object-001-bla` (`object-001`) |
| | OBJECT #001 – Svart-camo | `object-001-svart-camo` (`object-4`, stod på 0 kr) |
| OBJECT #002 (`object-002`) | OBJECT #002 – Svart | `object-002-svart` (`object-2`) |
| | OBJECT #002 – Blå | `object-002-bla` (`object-002`) |
| | OBJECT #002 – Svart-camo | `object-002-svart-camo` (`object-3`) |

- Tillvalen är **Färg** (ett värde per produkt) och **Storlek** (S, M, L, XL). Gamla adresser omdirigeras automatiskt.
- Lagersaldo är 0 överallt utom #001 Blå S (1). Allt visas som slutsålt tills användaren fyller på lagret.
- Beskrivningar (material, passform, tvättråd) saknas fortfarande.

## 13. Beslut om butik och innehåll (användaren, 2026-10-04)
- **Produktupplägg:** två produkter, **OBJECT #001** (sidtryck) och **OBJECT #002** (kyssmotiv), var och en med färgval svart / blå / svart-camo. Dubbletterna i Shopify ska slås ihop till dessa två (fråga innan något raderas).
- **Två separata kollektioner:** #001 och #002 ska upplevas och visas som två separata kollektioner, inte bara som två varianter i samma väljare. **Beslut fas 2:** varje kollektion är en egen Shopify-kollektion och varje färg en egen produkt.
- **Storlekar:** S, M, L, XL. **Pris:** 799 kr.
- **Språk:** svenska och engelska (Shopify Markets / översättningar, språkväljare i headern).
- **Nyhetsbrev / drop-anmälan:** ja.
- **AI-märkning i sidfoten:** nej (användarens beslut).
- **Sidor, märkets historia, frakt/retur, kontakt:** användaren återkommer. Bygg med tydliga platshållare som kan redigeras i temaredigeraren.
- **Produktinfo** (material, passform, tvätt, mått): saknas än.

## 14. Beslut i fas 2 (användaren, 2026-10-04)
- En produkt per färg (sex produkter i två kollektioner), städade enligt tabellen i avsnitt 12.
- Header enligt DESIGN.md: svart och fast i toppen, ordmärket till vänster, meny och varukorg till höger.
- Startsidan i fas 2: hero, korset och drop-anmälan. Kampanjbild, arkivrutnät och "om märket" byggs inte nu.
- Temat ligger i `theme/`. Hur det är uppbyggt och vad som återstår: `docs/theme.md`.

## 15. Första droppet (användaren, 2026-10-06)
- **En färgställning i taget.** Första droppet är bara **svart-camo**: svart/kolgrå acid wash-plagg med kyssmotivet i camo-utförande (camon sitter i trycket, inte i tyget). Fler färgställningar släpps senare som egna drops.
- **Två plagg:** en **t-shirt** och en **långärmad t-shirt**, i samma tyg och samma färg.
- **Tryck på båda: kyssmotivet**, litet på bröstet och stort på ryggen (filerna `3_svart-camo_brost` och `3_svart-camo_rygg`).
- Sidtrycket (#001) och färgerna svart och blå ingår inte i första droppet.
- **Beslut (2026-10-06):** **OBJECT #001 = t-shirten, 699 kr. OBJECT #002 = långärmad t-shirt, 999 kr.** Storlek S–XL. Öppet: måttguide för båda.
- **Shopify (ändrat med användarens godkännande 2026-10-06):** `object-001-svart-camo` = t-shirten (typ T-shirt, i kollektionen OBJECT #001), `object-002-svart-camo` = den långärmade (typ Långärmad t-shirt, ny produkt, i kollektionen OBJECT #002, bilder från `brand/products/langarmad/`). De fem gamla produkterna är **utkast** och omdöpta efter motiv: Sidtryck – Svart / Blå / Svart-camo, Kyss – Svart / Blå (handles `sidtryck-*`, `kyss-*`).
- **Ingen färg visas (användaren, 2026-10-06):** produkterna heter bara "OBJECT #001" och "OBJECT #002", tillvalet Färg är borttaget (bara Storlek) och korset döljer färgaxeln (etiketten "Färg" och "Svart-camo"). Axeln kommer tillbaka av sig själv när en kollektion får fler än en färg; färgen läses då från tillvalet Färg eller från titeln ("OBJECT #001 – Blå").
- **Sajten:** korsets flikar är de två objekten. Ryggtrycket visas först överallt. Plaggtypen syns i korset, på produktsidan och på kollektionskorten.
- Tillverkarunderlag: `docs/leverantor-underlag.md`.

## 16. Fas 3: motion (användaren, 2026-10-08)
- **Rörelse fullt ut.** Först valdes "lugnt + några ögonblick", men under sessionen ändrade användaren sig: inte lika simpelt som förut, "helt sjuka animationer", "den ultimata hemsidan", som med en budget på en miljon dollar. Det som står om lugn rörelse i avsnitt 3 och i äldre versioner av DESIGN.md gäller inte längre. Märkets element bär fortfarande rörelsen.
- **Sidbyten:** plagget följer med mellan sidorna. **Hero:** stjärnan, horisonten och att sidan klyvs vid första besöket. **Hero-filmen** görs inte om nu (den långärmade har kvar den äldre trycklooken).
- **Higgsfield:** inget nytt får skapas, men befintliga bilder och klipp får användas. Kampanjbandet, kollektionernas bakgrunder och anmälans porträtt är de godkända startbilderna v3 samt 1B, 6B och 9A (se `docs/hero-assets.md`).
- **Leverans:** som ett **nytt opublicerat tema**. Befintliga teman i butiken (publicerat och Drop 01) rörs inte.
- Tillkom på startsidan: arkivband och kampanjband. Tillkom i sidfoten: ordmärket stort. Allt kan tas bort i temaredigeraren.
