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

Väntar på att användaren väljer en variant per klipp.

## Rättelser
| Klipp | Från | Ny job_id | Modell | Ändring |
|---|---|---|---|---|
| 4 | 741d4c42 (C) | 0a0dd53a-ff26-4089-bb79-2a97912a5757 | nano_banana_2 (backend: nano_banana_flash) | Sidtrycket delat över sidsömmen, ett ansikte fram och ett bak |
