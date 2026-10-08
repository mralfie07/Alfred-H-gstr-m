# Överlämning – läget 2026-10-08

Läs detta först i en ny session. Därefter `CLAUDE.md` och `docs/brief.md` (särskilt avsnitt 13–15). Allt arbete ligger på grenen **`claude/fas-2-tema`** (ingen PR gjord, inte ihopslagen med `master`).

## Var vi är
- **Fas 1** (koncept, designsystem, prototyp) och **fas 2** (temats grund i Liquid) är klara.
- Efter fas 2 ändrade användaren upplägget till **första droppet**, och sajten och heron är omgjorda efter det.
- **Nästa fas: fas 3, motion i hela sajten** (se `docs/brief.md` avsnitt 8 och `DESIGN.md`, Rörelse). Ingenting av fas 3 är påbörjat.

## Första droppet (beslut 2026-10-06)
- En färgställning i taget. Nu: **svart acid wash med kyssmotivet i camo**, litet på bröstet och stort på ryggen. Camon sitter i trycket, inte i tyget.
- **OBJECT #001 = t-shirt, 699 kr. OBJECT #002 = långärmad t-shirt, 999 kr.** Storlek S–XL.
- **Ingen färg ska synas** på sajten: inga "Färg"-etiketter, inget "Svart-camo" (användarens beslut).
- Senare drops: samma plagg i svart och blå, och sidtrycket (motiv över sidsömmen).

## Shopify (`egkwr4-wr.myshopify.com`, provperiod, SEK)
| Produkt | id | Handle | Typ | Pris | Kollektion |
|---|---|---|---|---|---|
| OBJECT #001 | 15864364237148 | `object-001-svart-camo` | T-shirt | 699 kr | OBJECT #001 (701028172124) |
| OBJECT #002 | 15871757517148 | `object-002-svart-camo` | Långärmad t-shirt | 999 kr | OBJECT #002 (701028237660) |
- Båda har bara tillvalet **Storlek** (Färg-tillvalet är borttaget). Lagret är 0 överallt, så allt visas som slutsålt tills användaren fyller på.
- Fem gamla produkter är **utkast**: Sidtryck – Svart / Blå / Svart-camo, Kyss – Svart / Blå (handles `sidtryck-*`, `kyss-*`).
- Publiceringskanaler: Webbshop `gid://shopify/Publication/371235684700`, Shop `…371235717468`.

## Teman i butiken
| Tema | id | Roll |
|---|---|---|
| OBJECT 07 – fas 2 med film | 205740474716 | **Publicerat** (gammalt: tre färger, gamla heron) |
| OBJECT 07 – hero v3 (första droppet) | 205884195164 | Opublicerat, ersatt, kan tas bort |
| **OBJECT 07 – Drop 01 (t-shirt + långärmad)** | **205885768028** | **Opublicerat, det senaste. Ska publiceras av användaren.** |
Förhandsvisning: `https://egkwr4-wr.myshopify.com/?preview_theme_id=205885768028`

**Så kommer ändringar ut** (GitHub-kopplingen hittas inte i användarens Shopify, troligen avstängd under provperioden):
1. Ändra i `theme/`, kör `shopify theme check` (CLI installeras med `npm i @shopify/cli` i scratchpad).
2. Uppdatera grenen som bara innehåller temat: `git branch -f shopify-theme $(git subtree split --prefix theme)` och `git push -f origin shopify-theme`.
3. **Opublicerat tema:** `themeFilesUpsert` med `body: {type: URL, value: "https://raw.githubusercontent.com/mralfie07/Alfred-H-gstr-m/shopify-theme/<fil>"}`, jämför sedan `checksumMd5` med `md5sum` lokalt.
4. **Nytt tema** (om det senaste är publicerat): zippa `theme/`, `stagedUploadsCreate` (resource FILE, PUT), `curl -X PUT` zipen, sedan `themeCreate(role: UNPUBLISHED)`.
5. Shopify-kopplingen får **inte** skriva till det publicerade temat. Användaren publicerar själv. Fråga alltid innan något publiceras.

## Temat (`theme/`, guide i `docs/theme.md`)
- Header, sidfot, varukorgslåda och varukorgssida, startsida (hero-film, korset, drop-anmälan), kollektions- och produktsidor, 404, sök, lösenordssida. Svenska och engelska. Temakontrollen visar inga fel.
- **Korset** (`sections/object-cross.liquid`): flikar = kollektionerna #001 och #002. Färgaxeln döljs när droppet har en färg. Datarad: "OBJECT #001 · T-shirt · 699 kr". Ryggen visas först.
- **Färg** läses av `snippets/object-color.liquid`, **plaggtyp** = Shopifys produkttyp.
- **Frilagda plagg** i `theme/assets/cutout-<handle>-<fram|bak>.webp` (1200 px, plagget ca 911–941 px högt så att båda tröjorna blir lika stora).
- **Hero-filmen** följer med temat (`assets/hero-1080.mp4`, `hero-720.mp4`), eftersom provkonton inte får ladda upp filmer.

## Bilder och film
- Hero v3: `brand/hero/hero-v3-original.mp4`. Bara t-shirten och den långärmade. Klipp, job_id och val loggas i `docs/hero-assets.md`, klippningen i `scripts/hero-cut.sh`.
- Den långärmade: `brand/products/langarmad/` (AI-genererat plagg, trycket överfört från t-shirtens foton med `scripts/transfer-print.py`). Frilagda: `brand/products/cutout/langarmad-kyss_*.webp`.
- **Obs:** i hero-filmen har den långärmade fortfarande den äldre trycklooken (ren tryckfil, före överföringen). Om användaren vill ha den uppdaterad måste klipp 2, 3, 4 och 7 göras om (kostar krediter, fråga först).

## Tillverkare
Görs i en separat chatt. Underlaget finns i `docs/leverantor-underlag.md` (zip: `OBJECT07-tillverkare.zip` i repots rot, ignoreras av git).

## Verktyg och nätverk
- **Higgsfield** (Pro, cirka 340 krediter kvar): direktuppladdning blockeras. Importera med `media_import_url` från `raw.githubusercontent.com/...` eller Shopifys CDN. Resultat hämtas från `d8j0ntlcm91z4.cloudfront.net` (tillåten). Avböj stilpreset med `declined_preset_id` om den dyker upp.
- **Butiken och Shopifys CDN** (`*.myshopify.com`, `cdn.shopify.com`) går inte att nå härifrån. Sidorna kan alltså inte ses i webbläsare, och användaren får förhandsgranska.
- ffmpeg och ImageMagick finns. Pillow, numpy och scipy installeras med pip.

## Att göra (användaren)
1. Förhandsgranska och **publicera "Drop 01"**, ta bort de två gamla OBJECT-temana.
2. Fyll på **lager**.
3. **Menyer** (`main-menu`, `footer`), **engelska** under Språk, **favicon** (emblemet).
4. Uppgradera planen innan försäljning.

## Kvar att bestämma eller ta fram
- Måttguide, material/gsm och tvättråd (kommer från tillverkaren).
- Märkets historia, frakt/retur, kontakt, sociala länkar.
- Om heron ska uppdateras med den nya trycklooken på den långärmade.
