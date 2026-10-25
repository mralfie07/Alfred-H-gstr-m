#!/usr/bin/env bash
# Bygger kö-temat (theme-ko/) ur theme/: bara kö-sidan, ingen butik.
# Varje mall (startsida, produkt, kollektion, varukorg …) visar kö-sidan,
# så man kan inte handla oavsett adress. Kör om efter ändringar i
# theme/sections/main-password.liquid eller dess filer.
#
#   scripts/build-ko-theme.sh       svenska  → theme-ko/
#   scripts/build-ko-theme.sh en    engelska → theme-ko-en/
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=theme
SPRAK=${1:-sv}
case "$SPRAK" in
  sv) OUT=theme-ko; NAMN="OBJECT 07 Kö" ;;
  en) OUT=theme-ko-en; NAMN="OBJECT 07 Kö (engelska)" ;;
  *) echo "Okänt språk: $SPRAK (sv eller en)" >&2; exit 1 ;;
esac

# Bygg i en tillfällig mapp och byt ut $OUT först när allt gått igenom.
DEST=$OUT
OUT=$(mktemp -d)
trap 'rm -rf "$OUT"' EXIT
mkdir -p "$OUT"/{assets,config,layout,locales,sections,snippets,templates}

cp "$SRC"/sections/main-password.liquid "$OUT"/sections/
cp "$SRC"/snippets/{icon,meta-tags,object-image,object-number}.liquid "$OUT"/snippets/
if [ "$SPRAK" = en ]; then
  # Bara engelska: utan svensk fil visar Shopify engelskan oavsett butikens språk.
  cp "$SRC"/locales/en.json "$OUT"/locales/en.default.json
else
  cp "$SRC"/locales/{sv.default,en}.json "$OUT"/locales/
fi
cp "$SRC"/config/settings_data.json "$OUT"/config/
cp "$SRC"/assets/{base.css,archivo-variable.woff2,concrete.webp,wordmark.png,hero-poster.webp,hero-720.mp4,hero-1080.mp4} "$OUT"/assets/
cp "$SRC"/assets/cutout-object-001-svart-camo-{bak,fram}.webp "$OUT"/assets/

# Temanamn så att det syns i temabiblioteket vad det är.
sed "s/\"theme_name\": \"OBJECT 07\"/\"theme_name\": \"$NAMN\"/" "$SRC"/config/settings_schema.json > "$OUT"/config/settings_schema.json

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

# Byter en exakt textbit i en fil och stoppar bygget om den inte finns (så att inget tyst blir kvar på svenska).
byt() {
  python3 - "$@" <<'PY'
import sys
path, old, new = sys.argv[1:]
text = open(path, encoding="utf-8").read()
if old not in text:
    sys.exit(f"Hittar inte {old!r} i {path}")
open(path, "w", encoding="utf-8").write(text.replace(old, new))
PY
}

if [ "$SPRAK" = en ]; then
  # Sidan är engelsk även om request.locale skulle vara svenska.
  byt "$OUT"/layout/theme.liquid '<html lang="{{ request.locale.iso_code }}">' '<html lang="en">'
  # "699 SEK" i stället för "699,00 kr". Ören som inte är noll står kvar.
  byt "$OUT"/sections/main-password.liquid '{{ product.price | money }}' "{{ product.price | money_with_currency | remove: ',00' }}"
fi

# Kö-sidans texter står på engelska i theme/templates/password.json (butikens språk sedan oktober 2026).
# Det svenska kö-temat översätter dem; allt annat (taggar, produkt, datum, film) är detsamma.
# Ändras en text i theme/ stoppar bygget, så att översättningen uppdateras också.
MALL="$OUT"/password-mall.json
python3 - "$SRC"/templates/password.json "$MALL" "$SPRAK" <<'PY'
import json, re, sys
src, out, sprak = sys.argv[1:]
template = json.load(open(src, encoding="utf-8"))
settings = template["sections"]["main"]["settings"]
swedish = {  # engelska → svenska
    "heading": ("Join the queue", "Ställ dig i kön"),
    "text": (
        "<p>The drop is limited. Leave your email and we'll let you know when it opens, before anyone else.</p>",
        "<p>Droppet är begränsat. Lämna din e-post så får du ett mejl när det öppnar, före alla andra.</p>",
    ),
    "button": ("Join the queue", "Ställ dig i kön"),
    "success": (
        "You're in the queue. We'll email you before the drop opens.",
        "Du står i kön. Vi mejlar dig innan droppet öppnar.",
    ),
}
for key, (english, translation) in swedish.items():
    if settings.get(key) != english:
        sys.exit(f"Kö-sidans {key!r} är ändrad i {src}: uppdatera översättningen i scripts/build-ko-theme.sh")
    if sprak == "sv":
        settings[key] = translation
if sprak == "en":
    left = [k for k, v in settings.items() if isinstance(v, str) and re.search("[åäöÅÄÖ]", v)]
    if left:
        sys.exit(f"Svensk text i kö-sidans inställningar: {left}")
json.dump(template, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
PY
cp "$OUT"/layout/theme.liquid "$OUT"/layout/password.liquid

# Alla mallar = kö-sidan, med samma inställningar som lösenordsmallen.
for t in index product collection list-collections cart page search 404 blog article password; do
  sed 's/"layout": "password"/"layout": "theme"/' "$MALL" > "$OUT"/templates/$t.json
done
sed -i 's/"layout": "theme"/"layout": "password"/' "$OUT"/templates/password.json
rm -f "$OUT"/password-mall.json

rm -rf "$DEST"
mv "$OUT" "$DEST"
chmod 755 "$DEST"
echo "Klart: $DEST ($(find "$DEST" -type f | wc -l) filer)"
