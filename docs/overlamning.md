# Överlämning – läget 2026-10-25

Läs detta först i en ny session. Därefter `CLAUDE.md` och `docs/brief.md` (särskilt avsnitt 13–16). Allt arbete ligger på grenen **`claude/fas-2-tema`** (ingen PR gjord, inte ihopslagen med `master`).

## Var vi är
- **Fas 1** (koncept, designsystem, prototyp), **fas 2** (temats grund i Liquid) och **fas 3** (motion i hela sajten, 2026-10-08) är klara.
- Efter fas 2 ändrade användaren upplägget till **första droppet**, och sajten och heron är omgjorda efter det.
- **Fas 3:** användaren ville ha rörelse fullt ut, inte lugnt (brief avsnitt 16). Systemet beskrivs i `DESIGN.md` (Rörelse) och `docs/theme.md` (Rörelse). Levererat som ett **nytt opublicerat tema**, se tabellen nedan.
- **Nästa fas: fas 4**, mobil, finslipning, tillgänglighet och prestanda. Testa fas 3 på riktiga telefoner (iPhone med Safari och Android med Chrome): svep på plaggen, kampanjbandet, sidbytena och filmkornets prestanda.

## Kö-sidan (2026-10-11)
Användaren ska köpa domänen. Besökare ska då komma till en **kö-sida** för droppet och inte kunna handla. Kö-sidan är `sections/main-password.liquid` (brief avsnitt 18). Ett eget tema, **"Kö (bara e-post)"**, visar den på alla adresser; samma sektion är också lösenordssida i butikstemat. Den som skriver in sin e-post blir kund med taggen `drop-01-ko`. Nedräkning visas om Släppdatum fylls i i temaredigeraren. Sidan syns bara när lösenordsskyddet är på och temat som har den är publicerat. Lokalt: `/password` i `scripts/preview`.

## Första droppet (beslut 2026-10-06)
- En färgställning i taget. Nu: **svart acid wash med kyssmotivet i camo**, litet på bröstet och stort på ryggen. Camon sitter i trycket, inte i tyget.
- **Bara OBJECT #001 = t-shirt, 699 kr, säljs** (beslut 2026-10-11, brief avsnitt 17). OBJECT #002, den långärmade (999 kr), är **utkast** i Shopify och borttagen från sajten. Storlek S–XL.
- **Ingen färg ska synas** på sajten: inga "Färg"-etiketter, inget "Svart-camo" (användarens beslut).
- Senare drops: samma plagg i svart och blå, och sidtrycket (motiv över sidsömmen).

## Kassan och språket (2026-10-25)
- **Butikens huvudspråk är engelska** (användaren bytte), så kassan är engelsk. Butikstemat är helt engelskt, och menyerna heter Home, Shop, Contact och Search. Kontaktsidan heter Contact.
- **Planen är Basic.** Kassans utseende ställs in för hand i kassaredigeraren. Guide med värden, inställningar, betalsätt, rutan till orderbekräftelsen och villkorstexter: `docs/kassa.md`. Logga och favicon: `brand/checkout/`.
- **Rabattkoden OBJECT10** (10 %, en gång per kund, bara för kunder som handlat minst en gång, segmentet "Kunder som har handlat minst en gång"). Den skickas i orderbekräftelsen när användaren har klistrat in rutan.
- Shopify-kopplingen saknar behörighet att skriva policyer (`write_legal_policies`); användaren klistrar in dem. Frakt: "Normal" i Sverige blir gratis från 470 kr (en och samma fraktmetod, inte två).

## Shopify (`egkwr4-wr.myshopify.com`, provperiod, SEK)
| Produkt | id | Handle | Typ | Pris | Kollektion |
|---|---|---|---|---|---|
| OBJECT #001 | 15864364237148 | `object-001-svart-camo` | T-shirt | 699 kr | OBJECT #001 (701028172124) |
| OBJECT #002 (utkast) | 15871757517148 | `object-002-svart-camo` | Långärmad t-shirt | 999 kr | OBJECT #002 (701028237660, tom på sajten) |
- Båda har bara tillvalet **Storlek** (Färg-tillvalet är borttaget). Lagret är 0 överallt, så allt visas som slutsålt tills användaren fyller på.
- Fem gamla produkter är **utkast**: Sidtryck – Svart / Blå / Svart-camo, Kyss – Svart / Blå (handles `sidtryck-*`, `kyss-*`).
- Publiceringskanaler: Webbshop `gid://shopify/Publication/371235684700`, Shop `…371235717468`.

## Teman i butiken
| Tema | id | Roll |
|---|---|---|
| OBJECT 07 – fas 2 med film | 205740474716 | Opublicerat, gammalt (tre färger, gamla heron), kan tas bort |
| OBJECT 07 – hero v3 (första droppet) | 205884195164 | Opublicerat, ersatt, kan tas bort |
| OBJECT 07 – Drop 01 (bara #001) | 205885768028 | Opublicerat. Fas 2 utan fas 3-rörelse. Uppdaterat på plats 2026-10-11: bara #001 i korset, hero v4, kollektionssidor hoppar över tomma kollektioner (ändrade filer från commit 4ef5caf, uppladdade via staged upload). Har kvar köpfelet i `updateCount` som rättades i fas 3. |
| OBJECT 07 – Fas 3 (bara #001) | 206036402524 | Opublicerat, ersatt av "Kö till Drop 01" (samma innehåll, kö-sidan uppladdad på plats 2026-10-11). Kampanjbandet, arkivbandet och markören uppdaterade på plats 2026-10-12 (samma som butikstemat nedan). Innehåller oanvända filer från den långärmade (cutout/swatch object-002, campaign-02/03/05/08), eftersom `themeFilesDelete` är blockerad; de används inte. |
| OBJECT 07 - Drop #001 (hette "Butik Drop 01 (till släppet)") | 206211711324 | Opublicerat. Hela butiken (fas 3 + bara t-shirten + kö-sidan som lösenordssida), skapat rent från commit af588b1. Uppdaterat på plats 2026-10-12 med commit 9c467c2: arkivbandet borttaget, kampanjbandet scrollas förbi, ingen rund markör (10 filer, checksummor kontrollerade). Introt borttaget på plats 2026-10-25 (commit f494afb). Samma dag: allt på engelska och trygghetsraderna under köpknappen och i varukorgen (16 filer från commit 3699fd3, checksummor kontrollerade). `sections/archive-ticker.liquid` finns kvar som tom fil eftersom `themeFilesDelete` är blockerad; den visar inget och kan raderas under Redigera kod. **Publiceras när droppet öppnar.** |
| OBJECT 07 – Kö (bara e-post) | 206212039004 | Opublicerat (var publicerat 2026-10-11 till 2026-10-13, ersatt av den engelska kön). Bara kö-sidan: varje adress (startsida, produkt, kollektion, varukorg …) visar kön, man kan inte handla. Byggs ur `theme/` med `scripts/build-ko-theme.sh` till `theme-ko/` (31 filer). |
| OBJECT 07 – Kö (engelska) | 206337474908 | Opublicerat sedan 2026-10-25 (var publicerat 2026-10-13 till 2026-10-25). Samma kö-sida på engelska ("Join the queue", pris "699 SEK"), samma taggar `newsletter,drop-01-ko`. Byggs med `scripts/build-ko-theme.sh en` till `theme-ko-en/` (30 filer, bara `en.default.json`: butikens enda språk är svenska och utan svensk fil använder Shopify standardfilen). Checksummor kontrollerade. |
| OBJECT 07 – Drop #001 + konvertering (ny varukorg) | 207283257692 | Opublicerat sedan 2026-10-31 (var publicerat före Startsida helskärm). Gjort i en annan session, ny varukorg; filerna finns inte i repot. |
| OBJECT 07 – Startsida (utan linjen) | 207711240540 | Opublicerat (2026-10-31). Kopia av "Startsida helskärm" med `assets/motion.js` från commit 552e0da: laddlinjen under headern fastnade efter att man öppnat väskan. Användaren publicerar. |
| **OBJECT 07 – Startsida helskärm** | **207709864284** | **Publicerat 2026-10-31 (av användaren).** Kopia av det publicerade temat (`themeDuplicate`) med ny header och hero från commit 435b7f3 (9 filer, checksummor kontrollerade): headern ligger på filmen utan bakgrund och blir svart vid scroll, Meny + Sök | ordmärket | Kontakt + Konto + Väska, filmen i helskärm på dator, centrerad text och pausknapp. Användaren publicerar själv. Förhandsvisning `?preview_theme_id=207709864284`. |
| OBJECT 07 – Drop #001 + konvertering | 207245574492 | Opublicerat sedan 2026-10-31 (var publicerat 2026-10-25). Skapat 2026-10-25 i en annan session ur "Drop #001". Skapat 2026-10-25 i en annan session ur "Drop #001" plus egna ändringar som **inte finns i repot**: `assets/conversion.css`, `conversion.js`, `snippets/next-drop-form`, `payment-icons`, `stock-data`, `stock-note`, och ändrade `layout/theme.liquid`, `locales/*`, `config/settings_schema.json`, `cart-drawer`, `main-cart`, `main-product`, `main-password`, `cart-lines`, `perks`. Hämta in dem i `theme/` innan något laddas upp igen, annars skrivs de över. Shopify-kopplingen kan inte skriva till det publicerade temat. |
Förhandsvisning kö: `https://egkwr4-wr.myshopify.com/?preview_theme_id=206212039004` · kö på engelska: `?preview_theme_id=206337474908` · butik: `?preview_theme_id=206211711324`

**Så kommer ändringar ut** (GitHub-kopplingen hittas inte i användarens Shopify, troligen avstängd under provperioden):
1. Ändra i `theme/`, kör `shopify theme check` (CLI installeras med `npm i @shopify/cli` i scratchpad).
2. Uppdatera grenen som bara innehåller temat: `git branch -f shopify-theme $(git subtree split --prefix theme)` och `git push -f origin shopify-theme`. **Obs:** fråga användaren först, eftersom sessionen bara får pusha till sin egen gren. Uppdaterad 2026-10-11 (fas 3 + bara t-shirten). **Inte** uppdaterad med ändringarna 2026-10-12; de laddades upp med URL:er mot commit 9c467c2 på `claude/fas-2-tema` (`raw.githubusercontent.com/mralfie07/Alfred-H-gstr-m/<commit>/theme/<fil>`), vilket fungerar lika bra.
3. **Opublicerat tema:** `themeFilesUpsert` med `body: {type: URL, value: "https://raw.githubusercontent.com/mralfie07/Alfred-H-gstr-m/shopify-theme/<fil>"}`, jämför sedan `checksumMd5` med `md5sum` lokalt.
4. **Nytt tema** (om det senaste är publicerat): zippa `theme/`, `stagedUploadsCreate` (resource FILE, PUT), `curl -X PUT` zipen, sedan `themeCreate(role: UNPUBLISHED)`.
5. Shopify-kopplingen får **inte** skriva till det publicerade temat. Användaren publicerar själv. Fråga alltid innan något publiceras.

## Testa utan butiken
`scripts/preview/` renderar temat lokalt (liquidjs, riktiga produktdata, fungerande varukorg) och innehåller Playwright-skript för skärmbilder, tidslinjer och sidbyten i låg fart. Se `scripts/preview/README.md`. Allt i fas 3 är testat så, i Chromium 141 i mobil- och datorformat.

## Temat (`theme/`, guide i `docs/theme.md`)
- Header, sidfot, varukorgslåda och varukorgssida, startsida (hero-film, korset, drop-anmälan), kollektions- och produktsidor, 404, sök, lösenordssida. Svenska och engelska. Temakontrollen visar inga fel.
- **Korset** (`sections/object-cross.liquid`): flikar = kollektionerna, nu bara #001. Kollektionssidornas länkar till andra kollektioner hoppar över tomma kollektioner. Färgaxeln döljs när droppet har en färg. Datarad: "OBJECT #001 · T-shirt · 699 kr". Ryggen visas först.
- **Färg** läses av `snippets/object-color.liquid`, **plaggtyp** = Shopifys produkttyp.
- **Frilagda plagg** i `theme/assets/cutout-<handle>-<fram|bak>.webp` (1200 px, plagget ca 911–941 px högt så att båda tröjorna blir lika stora).
- **Hero-filmen** följer med temat (`assets/hero-1080.mp4`, `hero-720.mp4`), eftersom provkonton inte får ladda upp filmer.
- **Fas 3:** `assets/motion.css`, `motion.js`, `snippets/motion-head.liquid`, `numeral-roll.liquid`, ny sektion `campaign-reel` (kampanjbandet, scrollas i sidled; arkivbandet och den runda markören togs bort 2026-10-11, brief avsnitt 19), kampanjbilder `assets/campaign-01…09` (befintliga Higgsfield-startbilder, logg i `docs/hero-assets.md`).
- **Rättat i fas 3:** efter ett köp ersattes varukorgslådans innehåll med antalet (fel i `updateCount`). Finns kvar i de äldre temana i butiken.

## Bilder och film
- Hero v4 (gäller): `brand/hero/hero-v4-original.mp4`, bara t-shirten (klipp 1, 5, 6, 8, 9). v3 med den långärmade finns kvar som historik. Klipp, job_id och val loggas i `docs/hero-assets.md`, klippningen i `scripts/hero-cut.sh`.
- Den långärmade: `brand/products/langarmad/` (AI-genererat plagg, trycket överfört från t-shirtens foton med `scripts/transfer-print.py`). Frilagda: `brand/products/cutout/langarmad-kyss_*.webp`.

## Tillverkare
Görs i en separat chatt. Underlaget finns i `docs/leverantor-underlag.md` (zip: `OBJECT07-tillverkare.zip` i repots rot, ignoreras av git).

## Verktyg och nätverk
- **Higgsfield** (Pro, cirka 340 krediter kvar): direktuppladdning blockeras. Importera med `media_import_url` från `raw.githubusercontent.com/...` eller Shopifys CDN. Resultat hämtas från `d8j0ntlcm91z4.cloudfront.net` (tillåten). Avböj stilpreset med `declined_preset_id` om den dyker upp.
- **Butiken och Shopifys CDN** (`*.myshopify.com`, `cdn.shopify.com`) går inte att nå härifrån. Sidorna kan alltså inte ses i webbläsare, och användaren får förhandsgranska.
- ffmpeg och ImageMagick finns. Pillow, numpy och scipy installeras med pip.

## Att göra (användaren)
1. ~~Publicera "Kö (bara e-post)"~~ (klart 2026-10-11). Koppla domänen (Inställningar → Domäner). **När droppet öppnar:** publicera **"Drop #001"** (id 206211711324) och stäng av lösenordsskyddet. Ta bort de äldre OBJECT-temana (fas 2 med film, hero v3, Drop 01, Fas 3). Drop 01 har köpfelet ovan.
2. Fyll på **lager**.
3. **Menyer** (`main-menu`, `footer`), **engelska** under Språk, **favicon** (emblemet).
4. Uppgradera planen innan försäljning.

## Kvar att bestämma eller ta fram
- Måttguide, material/gsm och tvättråd (kommer från tillverkaren).
- Märkets historia, frakt/retur, kontakt, sociala länkar.
- Om heron ska uppdateras med den nya trycklooken på den långärmade.
