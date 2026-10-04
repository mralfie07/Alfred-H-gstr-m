#!/bin/bash
# Klipper ihop heron av Higgsfield-klippen. Kör från en mapp med clips/clip1.mp4 … clip9.mp4
# (ladda ner från URL:erna i docs/hero-assets.md). Kräver ffmpeg.
# Originalformat (beslut 2026-10-04): källans 1928×1076 (16:9) utan skalning eller beskärning, samma fil
# i mobil och på dator. Det tidigare 9:16-utsnittet för mobil var för inzoomat och togs bort.
# SEG: klipp, start (s), längd (s).
set -e
mkdir -p out
# v1 (1,2 s per klipp): "1 0.0 1.2" "2 2.0 1.2" "3 3.6 1.2" "4 1.5 1.2" "5 2.0 1.2" "6 3.0 1.6" "7 1.5 1.2" "8 3.6 1.2" "9 3.8 1.2"
# v2 (0,7 s per klipp, huvudbilden 1,0 s):
SEG=( "1 0.0 0.7" "2 2.3 0.7" "3 4.0 0.7" "4 1.8 0.7" "5 2.3 0.7" "6 3.4 1.0" "7 1.8 0.7" "8 4.0 0.7" "9 4.3 0.7" )
INPUTS=(); F=""; n=0
GRADE="eq=contrast=1.05:saturation=0.9:gamma=0.98"
for s in "${SEG[@]}"; do set -- $s
  INPUTS+=( -ss $2 -t $3 -i clips/clip$1.mp4 )
  F+="[$n:v]setsar=1,fps=24,format=yuv420p,$GRADE[v$n];"
  n=$((n+1))
done
C=""; for i in $(seq 0 $((n-1))); do C+="[v$i]"; done
# CRF 18 med tune film: visuellt förlustfritt och kornet i bilden behålls.
ffmpeg -v error -y "${INPUTS[@]}" -filter_complex "${F}${C}concat=n=$n:v=1:a=0[v]" -map "[v]" -an \
  -c:v libx264 -preset slower -tune film -crf 18 -profile:v high -pix_fmt yuv420p -movflags +faststart out/hero.mp4
ffmpeg -v error -y -i out/hero.mp4 -frames:v 1 -q:v 2 out/hero-poster.jpg
