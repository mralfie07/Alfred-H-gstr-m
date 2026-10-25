# Kassan – så gör du den klar (2026-10-25)

Butiken har planen **Basic**. Då kan kassans utseende bara ändras i Shopifys kassaredigerare, inte via API:t, och man kan inte lägga in egna textrutor mitt i kassan (det kräver Plus). Därför ligger "fri frakt, 14 dagars ångerrätt och 10 % på nästa order" i butiken, precis före kassan: under köpknappen och i varukorgen.

**Klart sedan tidigare (gjort av Claude):**
- Rabattkoden **OBJECT10**: 10 % på allt, en gång per kund. Den fungerar bara för kunder som redan har handlat minst en gång, så den är värdelös om den sprids. Ingen slutdag. Finns under Rabatter.
- Menyerna på engelska: Home, Shop, Contact och Search. Kontaktsidan heter Contact.
- Frakten var redan rätt. Inom Sverige blir "Normal" gratis från 470 kr, så t-shirten (699 kr) skickas alltid fritt. Express kostar 99 kr. EU och övriga länder kostar 299 kr.

Gör stegen nedan i ordning. Allt görs i Shopify-admin.

## 1. Utseendet (Inställningar → Kassa → Anpassa)
Mörkt som sajten. Under **Varumärke** (Branding):

| Inställning | Värde |
|---|---|
| Logotyp | `brand/checkout/logo-wordmark-white.png` (vitt ordmärke, samma som i headern). Storlek: liten eller medel. Placering: vänster. |
| Favicon | `brand/checkout/favicon-emblem.png` (emblemet på svart). Lägg samma bild under Webbshop → Teman → Anpassa → Temainställningar → Favicon. |
| Bakgrund, huvuddel | `#0C0C0B` (ink, som headern) |
| Bakgrund, ordersammanfattning | `#171615` (char) |
| Accent (länkar, markeringar) | `#ECE6DC` (benvitt) |
| Knappar | `#ECE6DC` (benvitt). Shopify väljer själv svart text på knappen. |
| Fel | Låt standardrött vara kvar, det syns bäst. |
| Typsnitt, rubriker och brödtext | **Archivo** (samma som sajten). Finns det inte i listan: välj det enklaste raka sans-serif-typsnittet. |
| Hörnradie | **Ingen**, om valet finns. Sajtens knappar och fält är fyrkantiga. |

Spara och titta i förhandsvisningen: mobil och dator, steget Information, Frakt och Betalning, och Tack-sidan.

## 2. Kassans inställningar (Inställningar → Kassa)
- **Kundkontakt:** e-post.
- **Marknadsföring:** visa rutan "Email me with news and offers" men **förbocka den inte** (krävs enligt GDPR).
- **Företagsnamn:** dölj. **Adressrad 2:** valfri. **Telefon:** valfri. Färre fält ger fler slutförda köp.
- **Adressautofyll:** på. **Dricks:** av.

## 3. Betalsätt (Inställningar → Betalningar)
Det här påverkar köpen mest i Sverige. Shop Pay och PayPal finns redan.
- Slå på **Klarna** (via Shopify Payments).
- Slå på **Apple Pay** och **Google Pay** (via Shopify Payments).
- **Swish** går inte via Shopify Payments. Det kräver en betalapp under Betalningar (sök "Swish").

## 4. Koden i orderbekräftelsen
Inställningar → Aviseringar → Kundaviseringar → **Orderbekräftelse** → Redigera kod. Klistra in rutan nedan **precis ovanför** raden `<table class="row footer">` (nära slutet). Spara och skicka ett testmejl till dig själv.

```html
{% comment %} OBJECT 07: 10 % på nästa order, rabattkoden OBJECT10 (docs/kassa.md) {% endcomment %}
<table class="row section">
  <tr>
    <td class="section__cell">
      <center>
        <table class="container">
          <tr>
            <td>
              <table class="row" style="border: 1px solid #0c0c0b;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #777777;">Thank you for your order</p>
                    <p style="margin: 0 0 14px; font-size: 18px; color: #0c0c0b;">10% off your next object</p>
                    <p style="margin: 0 0 14px; font-size: 22px; font-weight: bold; letter-spacing: 0.2em; color: #0c0c0b;">OBJECT10</p>
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #777777;">Enter the code at checkout with the same email address. One use per customer.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
    </td>
  </tr>
</table>
```

## 5. Villkor (Inställningar → Policyer)
Länkarna hamnar längst ner i kassan och bygger förtroende. Ångerrätten måste stå med enligt lag. Shopify-kopplingen får inte skriva policyer, så klistra in texterna själv.

**Återbetalningspolicy (Refund policy).** Texten bygger på ditt val: 14 dagar, kunden betalar returen. Läs igenom den. Byten görs genom retur och ny order eftersom droppen är begränsade; ändra det om du vill.

> You have 14 days to change your mind.
>
> **Right of withdrawal**
> You may cancel your purchase within 14 days of the day you receive your order, without giving a reason. To do so, email us at alfredhogstrom@outlook.com with your order number and the item you want to return. We will reply with the return address.
>
> **Sending it back**
> - Send the item back within 14 days of telling us you want to return it.
> - You pay for the return shipping.
> - Try the garment on the way you would in a store. If it has been worn, washed or damaged beyond that, we may deduct for the reduced value.
>
> **Your refund**
> We refund the price of the item and the original shipping cost (up to the price of our cheapest standard shipping) within 14 days of receiving your notice, to the payment method you used. We may wait with the refund until the item is back with us or you have shown that it has been sent.
>
> **Exchanges**
> We don't swap items directly. Return the item for a refund and place a new order while your size is in stock.
>
> **Faulty items**
> If something is wrong with your item, contact us. You have the right to complain about faults for three years under the Swedish Consumer Sales Act, and we pay the return shipping for faulty items.

**Fraktpolicy (Shipping policy).** Priserna är butikens fraktinställningar i dag.

> **Sweden:** Normal shipping is free on orders from 470 kr (65 kr below that). Express: 99 kr.
>
> **EU:** 299 kr.
>
> **International** (Australia, Canada, Hong Kong, Israel, Japan, Malaysia, New Zealand, Norway, Singapore, South Korea, Switzerland, the UAE, the UK and the US): 299 kr.
>
> You get an email with tracking when your order ships. Prices include Swedish VAT. Orders outside the EU may be charged import duties and taxes, paid by the recipient.

**Kontaktinformation (Contact information):** fyll i företagsnamn (eller ditt namn som enskild firma), organisationsnummer, adress och e-post. Det måste finnas med enligt EU:s regler för e-handel.

**Användarvillkor (Terms of service):** Shopify har en mall under samma sida ("Skapa från mall").

## 6. Valfritt
- Leveranstid i fraktnamnet, till exempel "Normal (2–4 business days)", under Inställningar → Frakt. Skriv bara det du vet att fraktbolaget håller.
- En app som visar OBJECT10 på Tack-sidan direkt efter köpet. Tack-sidan får ha appblock även på Basic.
