#!/usr/bin/env bash
# Bygger kö-temat (theme-ko/) ur theme/: bara kö-sidan, ingen butik.
# Varje mall (startsida, produkt, kollektion, varukorg …) visar kö-sidan,
# så man kan inte handla oavsett adress. Kör om efter ändringar i
# theme/sections/main-password.liquid eller dess filer.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=theme
OUT=theme-ko

rm -rf "$OUT"
mkdir -p "$OUT"/{assets,config,layout,locales,sections,snippets,templates}

cp "$SRC"/sections/main-password.liquid "$OUT"/sections/
cp "$SRC"/snippets/{icon,meta-tags,object-image,object-number}.liquid "$OUT"/snippets/
cp "$SRC"/locales/{sv.default,en}.json "$OUT"/locales/
cp "$SRC"/config/settings_data.json "$OUT"/config/
cp "$SRC"/assets/{base.css,archivo-variable.woff2,concrete.webp,wordmark.png,hero-poster.webp,hero-720.mp4,hero-1080.mp4} "$OUT"/assets/
cp "$SRC"/assets/cutout-object-001-svart-camo-{bak,fram}.webp "$OUT"/assets/

# Temanamn så att det syns i temabiblioteket vad det är.
sed 's/"theme_name": "OBJECT 07"/"theme_name": "OBJECT 07 Kö"/' "$SRC"/config/settings_schema.json > "$OUT"/config/settings_schema.json

# Samma layout som lösenordssidan (ingen header, sidfot eller varukorg) + favicon.
cp "$SRC"/layout/password.liquid "$OUT"/layout/password.liquid
awk '
  { print }
  /<title>/ {
    print "    {%- if settings.favicon != blank -%}"
    print "      <link rel=\"icon\" type=\"image/png\" href=\"{{ settings.favicon | image_url: width: 64, height: 64 }}\">"
    print "    {%- endif -%}"
  }
' "$SRC"/layout/password.liquid > "$OUT"/layout/theme.liquid
cp "$OUT"/layout/theme.liquid "$OUT"/layout/password.liquid

# Alla mallar = kö-sidan, med samma inställningar som lösenordsmallen.
for t in index product collection list-collections cart page search 404 blog article password; do
  sed 's/"layout": "password"/"layout": "theme"/' "$SRC"/templates/password.json > "$OUT"/templates/$t.json
done
sed -i 's/"layout": "theme"/"layout": "password"/' "$OUT"/templates/password.json

echo "Klart: $OUT ($(find "$OUT" -type f | wc -l) filer)"
