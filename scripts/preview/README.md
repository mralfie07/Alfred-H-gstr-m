# Lokal förhandsvisning

Butiken (`*.myshopify.com`) går inte att nå från molnmiljön. Det här renderar temat lokalt med liquidjs, riktiga produktdata (inskrivna i `server.mjs`, hämtade från Shopify 2026-10-08) och en fungerande varukorg, så att rörelsen kan testas i Chromium. Det är ingen fullständig Shopify: bara det temat använder.

```sh
cd scripts/preview && npm i
node server.mjs            # http://localhost:4321
mkdir -p shots
node scroll.mjs shots / 390 844 0 800 1600        # skärmbilder vid scrollpositioner
node timeline.mjs shots / 390 844 .cross 100 600  # bilder över tid efter scroll till ett element
node vt.mjs shots /collections/object-002 .object-card__link 390 844 0.1   # sidbyte i 1/10 fart
node intro.mjs shots 1440 900                     # introt
python3 sheet.py 'shots/tl-*.png' shots/ark.png 0.5 5   # kontaktark
```
Playwright använder Chromium i `/opt/pw-browsers` (molnmiljön). H.264 spelas inte där, så hero-filmen syns som stillbild.
