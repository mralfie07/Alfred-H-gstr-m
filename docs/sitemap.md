# Sidstruktur – OBJECT 07 (fas 1, utkast)

Riktning: klassisk premium mörk streetwear-dropbutik (ribba Aimé Leon Dore / Kith, Palace / Stüssy). Svenska och engelska. Mobilen först. Allt byggs som sektioner och block som kan redigeras i Shopifys temaredigerare.

## Globalt
- **Annonsrad:** droppstatus ("DROP 01 · NU UTE" / nedräkning till nästa drop). Redigerbar.
- **Header:** meny (vänster), ordmärket (mitten), sök + konto + varukorg (höger). Transparent över heron, solid vid scroll. Språkväljare SV/EN i menyn.
- **Meny (mobil):** helskärm. Shoppa droppet, Arkivet, Om OBJECT 07, Kontakt, FAQ, språk.
- **Varukorg:** låda från höger med uppsälj till det andra objektet, fri frakt-gräns om sådan finns.
- **Sidfot:** nyhetsbrev, länkar (policyer, kontakt, FAQ), sociala kanaler, valuta/språk, © OBJECT 07 EST. 2007.

## Startsida `/`
1. **Hero:** hero-videon (`brand/hero/hero-*-v2.mp4`, stillbild som poster), ordmärket och kort droppkopia ovanpå, en tydlig knapp till droppet.
2. **Droppet:** produkterna i droppet (OBJECT #001, #002) med färgval direkt i kortet och snabbköp.
3. **Kampanj:** helbilder från kampanjen (stillbilder ur Higgsfield-serien) med kort text.
4. **Objektväljaren / produktfokus:** stort plagg, färgbyte, storlek, lägg i varukorgen (prototypen).
5. **Nästa drop:** nedräkning + anmälan (nyhetsbrev).
6. **Om märket (kort):** platshållare tills texten finns.

## Droppet / Arkivet `/collections/all`
- Rutnät av objekten, aktuella drop först, tidigare drops som "Slutsåld" eller "Arkiv".
- Filter: färg, storlek (bara när sortimentet växer).

## Produktsida `/products/object-001`, `/products/object-002`
- Bildgalleri (fram, bak, detaljer, kampanj), svep i mobilen.
- Namn, pris, färgval (svart / blå / svart-camo), storlek S–XL, lägg i varukorgen (fast längst ned i mobilen).
- Storleksguide (låda), material och skötsel, frakt och retur (dragspel).
- "Bärs med": det andra objektet.

## Övriga sidor (innehåll kommer senare)
- **Om OBJECT 07** `/pages/om`, **Kontakt** `/pages/kontakt`, **FAQ** `/pages/faq`.
- **Policyer:** frakt, retur, integritet, villkor (Shopify-mallar som grund).
- **404:** egen sida i samma stil.
- **Lösenordssida:** för perioden innan droppet öppnar (nedräkning + anmälan).

## Tillstånd att designa
- Slutsåld (per storlek och per färg), kommande drop, tom varukorg, laddning, fel i formulär.
- `prefers-reduced-motion`: heron visas som stillbild.
