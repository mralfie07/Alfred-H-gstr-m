#!/bin/bash
# Klipper ihop heron av Higgsfield-klippen. Kör från en mapp med clips/clip1.mp4 … clip9.mp4
# (ladda ner från URL:erna i docs/hero-assets.md). Kräver ffmpeg.
# SEG: klipp, start (s), längd (s), mittpunkt x för mobilbeskärningen (källan är 1928 px bred).
set -e
mkdir -p out
# v1 (1,2 s per klipp): "1 0.0 1.2 964" "2 2.0 1.2 964" "3 3.6 1.2 964" "4 1.5 1.2 1054" "5 2.0 1.2 964" "6 3.0 1.6 964" "7 1.5 1.2 964" "8 3.6 1.2 964" "9 3.8 1.2 964"
# v2 (0,7 s per klipp, huvudbilden 1,0 s):
SEG=( "1 0.0 0.7 964" "2 2.3 0.7 964" "3 4.0 0.7 964" "4 1.8 0.7 1054" "5 2.3 0.7 964" "6 3.4 1.0 964" "7 1.8 0.7 964" "8 4.0 0.7 964" "9 4.3 0.7 964" )
INPUTS=(); FD=""; FM=""; n=0
# Filmkorn läggs på i webbläsaren (CSS) för att hålla filerna små.
GRADE="eq=contrast=1.05:saturation=0.9:gamma=0.98"
for s in "${SEG[@]}"; do set -- $s
  INPUTS+=( -ss $2 -t $3 -i clips/clip$1.mp4 )
  FD+="[$n:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=24,format=yuv420p,$GRADE[d$n];"
  X=$(( $4 - 302 ))
  FM+="[$n:v]crop=605:1076:$X:0,scale=1080:1920,setsar=1,fps=24,format=yuv420p,$GRADE[m$n];"
  n=$((n+1))
done
CD=""; CM=""; for i in $(seq 0 $((n-1))); do CD+="[d$i]"; CM+="[m$i]"; done
ffmpeg -v error -y "${INPUTS[@]}" -filter_complex "${FD}${CD}concat=n=$n:v=1:a=0[vd]" -map "[vd]" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart out/hero-desktop.mp4
ffmpeg -v error -y "${INPUTS[@]}" -filter_complex "${FM}${CM}concat=n=$n:v=1:a=0[vm]" -map "[vm]" -an -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart out/hero-mobile.mp4
ffmpeg -v error -y -i out/hero-desktop.mp4 -frames:v 1 -q:v 3 out/hero-desktop-poster.jpg
ffmpeg -v error -y -i out/hero-mobile.mp4 -frames:v 1 -q:v 3 out/hero-mobile-poster.jpg
