# OBJECT 07 – brief

Målet: en komplett Shopify-sajt som känns som den kostat 100 000 dollar. Unik, realistisk och utan AI-generisk känsla.

## 1. Märket
- **Namn:** OBJECT 07, est. 2007.
- **Emblem:** en oval där en fyruddig stjärna skär igenom som en horisont. "07" bryter ut till höger. Sliten ytstruktur som påminner om sten eller marmor. Y2K- och sci-fi-känsla.
- **Ordmärke:** brett geometriskt typsnitt där O:et ersatts av emblemet. Glest spärrat "EST. 2007" under.
- **Färger:** svart och benvitt/sten. Accent: den orange pricken från trycken. Inga fler färger utan att fråga.
- **Känsla:** mer konst och arkiv än streetwear-merch. Lugnt, tungt, genomtänkt.

## 2. Produkter
- Oversized, tunga t-shirts i acid wash, med vävd nacketikett och ärmlapp med "OBJECT 07".
- **OBJECT #001:** svart/kolgrå acid wash. Linjeansikte som går runt kanten nertill på framsidan.
- **OBJECT #002:** blå acid wash. Två ansikten som kysser varandra och bildar ett hjärta, stort på ryggen och litet på bröstet.
- Numreringen "OBJECT #00X" är märkets starkaste idé. Varje plagg presenteras som ett katalogiserat föremål.
- Priser, storlekar, material och måttguide hämtas från Shopify (läggs in av användaren).

## 3. Koncept: mörkt galleri/arkiv
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
- En version för dator (16:9) och en för mobil (9:16).
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
- **AI-märkning:** EU:s AI-förordning kan kräva att realistiskt AI-genererat innehåll märks ut. Kontrollera vad som gäller. Förslag: en diskret rad i sidfoten, till exempel "Kampanjbilder skapade med AI".
- Språk (svenska, engelska eller båda) och vilka länder butiken säljer till.
- Vilka sidor som ska finnas utöver startsida, kollektion och produktsida.
- Shopify-plan, domän och lanseringsdatum.
- Typsnittet i ordmärket och om det finns licens för webben.

## 10. Higgsfield: arbetsflöde och budget
- Användaren har (eller köper) Higgsfield **Pro, 29 dollar per månad, 600 krediter**. Köp månadsvis och säg upp när heron är klar.
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

Produktstatus 2026-10-03 (5 produkter, alla aktiva, 799 kr):
- OBJECT #001 finns två gånger (`object-001`, `object-1`) och OBJECT #002 tre gånger (`object-002`, `object-2`, `object-3`). Fråga användaren om det är olika färger eller dubbletter innan något ändras.
- Inga storlekar: varje produkt har bara varianten "Default Title". Storlekar ska läggas till som varianter.
- Lagersaldo 0 på alla.
- Inga beskrivningar (material, passform, tvättråd saknas).
