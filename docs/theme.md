# Temat – OBJECT 07 (fas 2)

Eget Shopify-tema i `theme/`. Byggt efter `DESIGN.md` (riktningen Korset) och godkänt av Shopifys temakontroll (`shopify theme check`, inga anmärkningar).

## Vad som finns

| Sida | Fil | Innehåll |
|---|---|---|
| Alla sidor | `layout/theme.liquid`, `sections/header.liquid`, `sections/footer.liquid` | Svart header som ligger kvar i toppen: ordmärket till vänster, meny (helskärm i mobilen, med emblemet) och varukorg till höger. Sidfot med text, meny, policyer, Instagram/TikTok och språk-/landväljare. |
| Startsida | `templates/index.json` | **Hero** (`hero.liquid`), **Korset** (`object-cross.liquid`), **Drop-anmälan** (`drop-signup.liquid`) |
| Kollektion #001 / #002 | `sections/main-collection.liquid` | Stort arkivnummer på betong, en ruta per färg med frilagt plagg, pris och storlekar i lager, länk till de andra kollektionerna. #002 visar ryggen. |
| Produkt | `sections/main-product.liquid` | Plagget på betong med Framsida/Baksida, färgerna i samma kollektion som länkar, storlek S–XL, köpknapp som ligger kvar nertill i mobilen, dragspel (beskrivning, storlek, material, frakt) och Shopifys produktbilder i ett svepbart band. |
| Varukorg | `sections/cart-drawer.liquid`, `sections/main-cart.liquid` | Låda från höger (öppnas från väskan och från aviseringen efter köp) och en vanlig varukorgssida. |
| Övrigt | `main-page`, `main-404`, `main-search`, `main-list-collections`, `main-password` | Enkla sidor i samma stil. Lösenordssidan har drop-anmälan. |

Allt fungerar utan JavaScript (formulär och länkar), skriptet gör det snabbare och mjukare. `prefers-reduced-motion` stänger av rörelsen och visar heron som stillbild.

## Hur produktdatan läses
- **Korset** har ett block per kollektion. Varje produkt i kollektionen är en färg. Färgen läses från webbadressen efter numret: `object-001-svart-camo` → `svart-camo`. Därför ligger samma färg på samma rad i båda kollektionerna. Ordningen och startfärgen ställs in i temaredigeraren.
- Pris, storlekar och lager kommer direkt från Shopify. Slutsålda storlekar är överstrukna och går inte att välja.
- **Frilagda plagg** ligger i temat: `assets/cutout-<produktens webbadress>-<fram|bak>.webp` (1200 px), tygrutor i `assets/swatch-<webbadress>.webp`. Saknas en fil visas produktens första bild från Shopify i stället. En ny produkt behöver alltså två frilagda bilder och en tygruta med samma namnmönster.
- Typsnittet Archivo (variabelt, OFL) ligger i temat: `assets/archivo-variable.woff2`.

## I butiken
- **"OBJECT 07 – fas 2 med film"** (id `205740474716`) är butikens publicerade tema sedan 2026-10-04. Det första uppladdade temat (utan film) är borttaget.
- **Så kommer ändringar ut (gäller tills vidare):** Shopify-kopplingen får inte skriva till ett publicerat tema, och användaren hittar inte "Anslut från GitHub" i sin Shopify (troligen avstängt under provperioden). Därför laddar Claude upp varje ny version som ett **opublicerat** tema (zip via `stagedUploadsCreate` + `themeCreate`), skickar förhandsvisningslänken, och användaren publicerar själv under Online Store → Teman. Testa GitHub-kopplingen igen efter uppgraderingen.

## Att göra i Shopify innan temat visas
1. **Koppla temat (när det går).** Shopifys GitHub-koppling kräver en gren som bara innehåller temat. Grenen `shopify-theme` är skapad för det (`git subtree split --prefix theme`). Online Store → Teman → Lägg till tema → Anslut från GitHub → grenen `shopify-theme`. Den ska uppdateras efter varje ändring i `theme/` (Claude gör det).
2. **Heron:** filmen följer med temat (`assets/hero-1080.mp4` 3,1 MB och `hero-720.mp4` 1,4 MB för mobil, komprimerade från `hero-v2-original.mp4`), eftersom Shopify inte tillåter uppladdade filmer på provkonton. Efter uppgradering kan en film väljas i temaredigeraren (Hero-film → Film) i stället.
3. **Lager:** fyll på lagersaldot per storlek. Nu står allt på 0, så allt visas som slutsålt.
4. **Menyer:** `main-menu` (header) och `footer` (sidfot) under Innehåll → Menyer.
5. **Engelska:** lägg till engelska under Inställningar → Språk och publicera. Då syns språkväljaren. Produktnamn och färger översätts i Translate & Adapt.
6. **Favicon:** emblemet behöver beskäras tätt och testas i 16–32 px (se briefen). Läggs in under Temainställningar → Favicon.

## Kvar till senare faser
- Fas 3: motion i hela sajten (sidövergångar, fler iscensatta ögonblick), heron i full kvalitet.
- Fas 4: test på riktiga telefoner, tillgänglighetsgenomgång, prestanda.
- Innehåll som användaren återkommer med: produktinfo, märkets historia, frakt/retur, kontakt, sociala länkar.
