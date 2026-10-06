# Hero – Higgsfield-tillgångar

Logg över uppladdade referenser och genereringar, så att nästa session kan fortsätta utan att ladda upp igen.

## Så laddas bilder upp
Direktuppladdning (`media_upload` + curl PUT) blockeras av nätverket i molnmiljön. Använd i stället `media_import_url` med `https://raw.githubusercontent.com/mralfie07/Alfred-H-gstr-m/master/<sökväg>` (fungerar bara så länge repot är publikt). Resultat från Higgsfield (cloudfront) kan inte heller laddas ner hit; visa dem för användaren med `show_generation_by_ids`.

## Referenser i Higgsfield (media_id)
| Fil | media_id |
|---|---|
| products/svart-camo-kyss_bak.jpg | bf3c6b7e-54ea-4bf7-894e-b121ebc488e3 |
| products/svart-camo-kyss_fram.jpg | 03e19913-ac74-4098-9435-3d5231daa0f1 |
| prints/3_svart-camo_rygg.webp | b503f670-4250-4ebb-ac90-b7bde234bb2d |
| products/bla-sidtryck_fram.jpg | 546ec83d-7bf1-4df9-997f-6cbf794318d2 |
| products/bla-sidtryck_bak.jpg | 0eb6ace0-6e54-4e48-9d92-afb8926b150f |
| prints/5_bla-sidtryck_fram.webp | e55d3ffb-fec4-4942-863a-15ea93da8898 |
| prints/5_bla-sidtryck_bak.webp | 7a2e4eb8-992d-4cc3-afd3-1f380a10173f |
| products/svart-sidtryck_fram.jpg | e01e18cc-1e55-498a-81d9-fd9ee916ba1f |
| products/svart-sidtryck_bak.jpg | 05889a6a-53c7-459e-a857-315066df2386 |
| prints/4_svart-sidtryck_fram.webp | 9968a53a-2357-4061-a4e5-b9541550109c |
| prints/4_svart-sidtryck_bak.webp | dc31c264-f9f8-4820-a60c-3be31dfef642 |
| products/bla-kyss_fram.jpg | db0230f8-3b0f-40fd-a6cc-02390dddfe22 |
| products/bla-kyss_bak.jpg | 663a27ae-0285-4c8c-a5c4-dde219a86415 |
| prints/2_bla_brost.webp | f7e1d962-f954-4de2-b8c1-08c05c1dc42d |
| prints/2_bla_rygg.webp | 1b09ca2b-f4f5-46e4-b7d3-455ac739bb69 |
| references/model-001-man-concrete-WATERMARK.png (bara miljö/ljus) | a6a1aa08-e1e9-4c93-a79b-942115eba8f1 |

## Modellförslag (steg 1, 2026-10-04, ~6 krediter)
`nano_banana_pro` 2K 3:4 (backend rapporterar modellen som `nano_banana_2`).
| # | Modell | Tröja | job_id |
|---|---|---|---|
| 1 | Skandinavisk, mörkblont hår, mellanblå jeans, svarta derbyskor | #002 blå (bröst) | 5c8682a5-c67b-4f3e-8a7b-f1f6f61644ce |
| 2 | Medelhavsutseende, mörkt lockigt hår, ljusa jeans, vita canvasskor | #001 svart (sidtryck) | 0dec2c8e-a329-40c0-965c-39de126ca926 |
| 3 | Östafrikanskt utseende, kortklippt, mörka jeans, bruna mockakängor | #001 blå (sidtryck) | 4dfec545-0ffa-4eb3-8338-e7a3dd4dd15d |

Saldo efter steget: 594 krediter.

**Val (2026-10-04):** modell 1, med **navy loafers** i stället för derbyskor. En modell i alla klipp. Klipplistan godkänd.

## Referenselement i Higgsfield
**Obs:** beskrivningen i elementen `o07-001-bla` och `o07-001-svart` säger "single face", vilket är fel. Sidtrycket är delat över sidsömmen: ett ansikte på framsidan och ett på baksidan, som möts vid sömmen (se `docs/brief.md`). Skriv alltid ut det i prompten och skicka med tryckfilerna fram + bak som extra referenser.

Används i prompter som `<<<element_id>>>`.
| Namn | Typ | element_id |
|---|---|---|
| o07-model | character | 72d27228-4783-4d20-80c9-1151f5323e40 |
| o07-002-camo | prop | 7c5e9101-d2fe-4440-93a5-45e3bb7cd728 |
| o07-001-bla | prop | ca7723a6-f7ba-4c6e-8be7-34808d5801f6 |
| o07-001-svart | prop | 8d2f71fa-b975-4da7-bb58-5abcaeeca08f |
| o07-002-bla | prop | 83c48cb1-8d5f-4f4a-bae4-f0316c0b89a0 |

## Godkänd klipplista
| # | Bild | Tröja |
|---|---|---|
| 1 | Närbild på tyget i solljus, kanten på ryggtrycket syns | #002 camo |
| 2 | Vidbild, går mellan betongpelare, liten i bild | #001 svart |
| 3 | Halvbild, vrider huvudet mot kameran, brösttryck synligt | #002 blå |
| 4 | Pelarskuggor glider över sidtrycket | #001 blå |
| 5 | Underifrån, långsam inzoomning | #001 blå |
| 6 | Vänder sig om, ryggtrycket (huvudbilden) | #002 camo |
| 7 | Går ifrån kameran, ryggtryck | #002 blå |
| 8 | Närbild ansikte, blick in i kameran | #001 svart |
| 9 | Tyget igen, loopar till klipp 1 | #002 camo |

## Startbilder (steg 2, `nano_banana_pro` 2K 16:9, 3 varianter per klipp, ~54 krediter)
| Klipp | job_id variant A | B | C |
|---|---|---|---|
| 1 | 000e0ea0-f25b-446e-b7e5-f26ad1c1ed9d | fa1adcc3-fa91-4b73-a96a-64a806828b37 | 56800952-db5b-4e6e-a86c-9fbe27cc39ff |
| 2 | c9872805-6587-4be7-aa4b-2fb7662842ed | 84e888df-79e5-4f99-a6a2-021b4610b0f9 | 1b06fd4b-3e2c-488d-9322-c91f100cc0b9 |
| 3 | c6830aab-9721-42a2-bcaf-3a326211bcb8 | 71f185da-ddc2-4794-a9b5-30afd81e4fa5 | 65a96b5c-b2f1-46b3-8f15-e4de07decc05 |
| 4 | f8dedf29-a4bb-40be-a66c-867ddfa34ae6 | cdd68363-e293-460d-b69c-0e5bf552b169 | 741d4c42-8732-4041-99b9-6b69bcc22779 |
| 5 | 5bfed15e-8e5c-4804-9e07-a286eea00971 | fc212a6f-11ad-4df9-92cd-55b614aeae1a | feb49195-9229-4bad-b46e-279f9ba916ca |
| 6 | 465e234d-13f9-4c56-bdd3-2ebc48b54ddd | 19dba6ed-d174-41cd-a105-4a9b1c100e03 | 4804df59-4a2c-419b-bc2f-8b0c196c49fe |
| 7 | dde1876b-f7cf-4cf9-8a66-9272bfacdcb5 | c424c7aa-51b7-4069-9308-941b23f191e4 | f50ea736-d1ea-4d50-9a13-659221240b56 |
| 8 | 7f0127f2-7964-4a94-bdfd-c2beba3e3a45 | ff8ebc2f-7216-4e44-9533-0b3db7e0fea8 | 73c979a5-f0ed-4cde-98ef-c9b5602a2671 |
| 9 | d7c8f039-74e1-4fe9-b431-a94b262f4288 | b9777398-1431-4197-a3ae-04ab7626a943 | 4fd9f246-c550-44d3-9fea-401b11470e14 |


## Rättelser
| Klipp | Från | Ny job_id | Modell | Ändring |
|---|---|---|---|---|
| 4 | 741d4c42 (C) | 0a0dd53a-ff26-4089-bb79-2a97912a5757 | nano_banana_2 (backend: nano_banana_flash) | Sidtrycket delat över sidsömmen (användarens test, inte vald) |
| 2 | c9872805 (A) | 5d699e38-7c2a-464b-8cfb-17ff22b36213 | nano_banana_pro | Sidtrycket delat över sidsömmen (förkastad) |
| 4 | f8dedf29 (A) | ae679148-ca09-428c-ad60-c38b6c899ae1 | nano_banana_pro | Sidtrycket delat över sidsömmen (förkastad) |
| 5 | 5bfed15e (A) | 4bdfa6de-d65c-438b-bbb6-d5e6a8507aa6 | nano_banana_pro | Sidtrycket delat över sidsömmen (förkastad) |

## Valda startbilder (användaren, 2026-10-04)
Val: 1B, 2A, 3B, 4A, 5A, 6B, 7C, 8C, 9A. Rättelserna av klipp 2, 4 och 5 **förkastades** av användaren (originalen var bättre). Använd originalen.
| Klipp | Vald | job_id att använda som startbild |
|---|---|---|
| 1 | B | fa1adcc3-fa91-4b73-a96a-64a806828b37 |
| 2 | A | c9872805-6587-4be7-aa4b-2fb7662842ed |
| 3 | B | 71f185da-ddc2-4794-a9b5-30afd81e4fa5 |
| 4 | A | f8dedf29-a4bb-40be-a66c-867ddfa34ae6 |
| 5 | A | 5bfed15e-8e5c-4804-9e07-a286eea00971 |
| 6 | B | 19dba6ed-d174-41cd-a105-4a9b1c100e03 |
| 7 | C | f50ea736-d1ea-4d50-9a13-659221240b56 |
| 8 | C | 73c979a5-f0ed-4cde-98ef-c9b5602a2671 |
| 9 | A | d7c8f039-74e1-4fe9-b431-a94b262f4288 |

## Videoklipp, tagning 1 (steg 3, `kling3_0` pro, 5 s, utan ljud, 1920×1080, ~79 krediter)
Alla nio klara 2026-10-04. Saldo efter: 453,75 krediter. Resultat-URL: `https://d8j0ntlcm91z4.cloudfront.net/user_3K2qtcUSxMiqVA6BlJ8cAyRxYHB/hf_20261004_1329xx_<job_id>.mp4` (se `jobs_wait`). Väntar på användarens granskning.
Klipp 9 har startbilden från klipp 1 som `end_image` för sömlös loop.
| Klipp | job_id | Rörelse |
|---|---|---|
| 1 | 2845a30a-1b07-481f-86e2-af74197a5ebd | Långsam makro-inzoomning på tyget |
| 2 | 6a0478b5-9d4a-480b-b809-aa683bf927fe | Går mellan pelare, kameran följer i sidled |
| 3 | 6e59f77a-d94a-47ca-8da0-ae2a464e63f3 | Vrider huvudet mot kameran, långsam inzoomning |
| 4 | 281a795f-4ba7-46ac-8e20-490899a31ec2 | Pelarskuggor glider över trycket |
| 5 | 297ba8e8-800f-4521-81f0-363a2d49e1ca | Inzoomning underifrån, står still |
| 6 | a4ff9498-1eaa-4350-b42c-f1244b16cf63 | Vrider huvudet över axeln, ryggtrycket syns |
| 7 | a9caa7dd-cd5a-4a5e-becf-da26a1c28d5c | Går ifrån kameran, kameran följer |
| 8 | 661e9cae-e954-44db-b42e-ed6ede365dd8 | Långsam inzoomning på ansiktet |
| 9 | d78fb326-e73d-49ac-a4b6-e5ba21361cfa | Drift över tyget, slutar på klipp 1:s startbild |

## Redigering (steg 5): nätverksproblem
Molnmiljön blockerar `d8j0ntlcm91z4.cloudfront.net` (Higgsfields resultatfiler), så klippen kan inte laddas ner hit för ffmpeg. Lösningar: (1) användaren lägger till domänen under Allowed domains i miljöns nätverksinställningar, eller (2) redigeringen görs i Higgsfield med workflowet `video-montage`.

**Uppdatering:** användaren har lagt till `d8j0ntlcm91z4.cloudfront.net` i miljöns nätverksinställningar. Nedladdning fungerar nu. ffmpeg installeras med `pip install imageio-ffmpeg` (binären hamnar under `imageio_ffmpeg/binaries/`).

## Granskning av tagning 1 (Claude, bildruta för bildruta)
- 1, 2, 3, 4, 5, 7, 9: bra. Trycken stabila, inga synliga AI-fel vid 1 bild/s. Klipp 9 slutar nära klipp 1:s första bildruta, loopen fungerar.
- 6 (camo-ryggen): trycket är stabilt men stämmer inte helt med originalet. Vänster halva blir mest cremefärgad, medan båda ansiktena ska vara camo-fyllda med cremefärgad kant. Troligen för att startbilden blandade fram- och bakbilden.
- 8 (ansiktet): ett litet brösttryck syns på den svarta tröjan i början (#001 ska inte ha det). Löst i redigeringen genom att använda slutet av klippet, där trycket är utanför bild.

## Redigering v1 (2026-10-04)
`scripts/hero-cut.sh`. 9 klipp, hårda klipp, 11,4 s, 24 fps, lätt färgkorrigering, inget ljud.
| Fil | Storlek |
|---|---|
| `brand/hero/hero-desktop-v1.mp4` (1920×1080) | 3,6 MB |
| `brand/hero/hero-mobile-v1.mp4` (1080×1920) | 3,1 MB |
| `brand/hero/hero-*-v1-poster.jpg` | stillbild medan videon laddar |

## Redigering v2 (2026-10-04)
Användaren ville ha mer fart. 0,7 s per klipp, huvudbilden (klipp 6) 1,0 s, totalt 6,9 s. SEG-värden i `scripts/hero-cut.sh`.
| Fil | Storlek |
|---|---|
| `brand/hero/hero-desktop-v2.mp4` (1920×1080) | 2,4 MB |
| `brand/hero/hero-mobile-v2.mp4` (1080×1920) | 2,0 MB |

## Originalformat (2026-10-04, gäller)
Användaren tyckte att heron var för inzoomad. Orsak: mobilversionen var ett utsnitt på 605 px bredd ur 16:9-klippen, förstorat 1,8 gånger till 1080×1920. Båda versionerna var dessutom hårt komprimerade (CRF 26–27, ca 2,7 Mbit/s mot källans 13–35 Mbit/s).
Ny export med samma klippning som v2: källans egen upplösning 1928×1076 (16:9), utan skalning eller beskärning, H.264 CRF 18 med `tune film` (ca 10,5 Mbit/s). **Samma fil används i mobil och på dator.** På dator visas hela bilden. I mobil visas en centrerad kvadrat ur samma fil, eftersom hela 16:9-bilden kändes för smal (användaren, 2026-10-04). Alla nio klipp är kontrollerade och modellen och trycken hålls i bild i kvadraten.
| Fil | Storlek |
|---|---|
| `brand/hero/hero-v2-original.mp4` (1928×1076) | 9,0 MB |
| `brand/hero/hero-v2-original-poster.jpg` | stillbild medan videon laddar |
De äldre `hero-desktop-*` och `hero-mobile-*` sparas bara som historik.

## Hero v3 – första droppet (2026-10-06)
Användaren: heron ska bara visa första droppets plagg, **t-shirten och den långärmade t-shirten**, båda svart acid wash med kyssmotivet i camo (bröst + rygg). Samma film i övrigt.
- Klipp 1, 6 och 9 visar redan camo-t-shirten och behålls (gamla videoklipp).
- Klipp 2, 3, 4, 5, 7 och 8 görs om: den gamla startbilden redigeras med `nano_banana_pro` 2K 16:9 så att bara tröjan byts (samma modell, pose, ljus och bildutsnitt).
- Fördelning: långärmad i 2, 3, 4, 7. T-shirt i 1, 5, 6, 8, 9.

Nya referenser (media_id):
| Fil | media_id |
|---|---|
| products/langarmad/langarmad_fram.jpg | 9d1b5671-6033-4d1f-b3bd-e724e4eaa696 |
| products/langarmad/langarmad_bak.jpg | a075e8cb-ee46-4b82-8907-5ed0b91ac8c7 |
| prints/3_svart-camo_brost.webp | 436ee3a3-6d99-4d71-add0-e7488353462e |
| Shopify-bild t-shirt camo fram (object-002-svart-camo) | 953a2744-e7a3-4ec1-ada9-455af1bd7045 |
| Shopify-bild t-shirt camo bak | 83fc9b8a-2d7a-4cb1-ad87-74c9fb53b3e0 |

Nya startbilder (två varianter per klipp, ~24 krediter). **Förslag** markerat med *, väntar på användarens godkännande:
| Klipp | Plagg | Variant A | Variant B |
|---|---|---|---|
| 2 | långärmad, fram | 96df414a-12ea-4d21-a1f0-420c78ab5547 * | 8e618cff-34ab-41b5-b396-c4e393066e62 |
| 3 | långärmad, fram | b40b32cc-1697-4af1-b1a9-561e384c332b * | 3a286628-df11-493a-a001-0d91117a82ec |
| 4 | långärmad, fram (skuggor) | 21492a7f-d441-47f5-9d36-481dde3d0313 | 8a68cfe7-7d2c-48fc-a563-a1877bb8737e * |
| 5 | t-shirt, fram | 0ab3dd65-041b-40aa-82c8-2eef27a37f29 * | 0f529029-5f24-4714-8d59-a56f7f68df24 |
| 7 | långärmad, rygg | 2e514c52-56e8-4903-bd69-f85c0ccc51fd | d2979c29-0250-4a63-9f8b-4871f506702d * |
| 8 | t-shirt, fram (ansikte) | 0527dcb2-de40-42c2-92c5-059aeaa16684 | bec7ae0d-d5ee-4990-913b-5d1b5f2e97d3 |
Trycken är kontrollerade mot `brand/prints/3_svart-camo_brost.webp` och `_rygg.webp` i närbild: stämmer i alla förslag.

**Klipp 8 omgjord (användaren: trycket såg inte äkta ut).** Trycket låg i skuggan men var lika ljust som i solen, alltså inklistrat. Ny redigering av 8B med trycket i skuggan, tygets veck och struktur igenom och samma spruckna tryckyta som i klipp 1 (~4 krediter):
| Variant | job_id |
|---|---|
| 8C (för blek och sliten) | 4a547bc4-3043-43e0-a280-8bc318c9a003 |
| **8D (förslag)** | 155b9ad2-66c6-4b71-8e9c-7d07ba1462ad |

**Valda startbilder v3 (användaren godkände 2026-10-06):** 2A, 3A, 4B, 5A, 7B, 8D.

Videoklipp v3 (`kling3_0` pro, 5 s, utan ljud, 16:9, ~53 krediter). Higgsfield föreslog stilpresetet "IN THE DARK" i stället för att köra klippen; det avböjdes (`declined_preset_id` 24bae836-2c4a-48e0-89b6-49fcc0b21612) så att filmens utseende inte ändras.
| Klipp | Startbild | job_id | Rörelse |
|---|---|---|---|
| 2 | 96df414a | d331c6e0-69c6-4782-a17b-69f9b8673216 | Går mot kameran mellan pelare, kameran följer i sidled |
| 3 | b40b32cc | 15dd0361-5ec1-48c7-8331-1e5288bb5711 | Liten huvudvridning mot kameran, långsam inzoomning |
| 4 | 8a68cfe7 | 54e7ef1d-eec2-4569-8857-54086755dc76 | Pelarskuggor glider över bröstet |
| 5 | 0ab3dd65 | a97f39ff-97e6-45d6-a6c7-ffa7d7c8231e | Underifrån, står still, långsam inzoomning |
| 7 | d2979c29 | ef0e4be2-5030-4a76-bc92-3434e2470674 | Går ifrån kameran, kameran följer |
| 8 | 155b9ad2 | 487de62a-c2c3-4057-9835-543bffa16864 | Långsam inzoomning på ansiktet |
Klipp 1, 6 och 9 återanvänds från tagning 1 (2845a30a, a4ff9498, d78fb326).
