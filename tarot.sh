#!/bin/bash



nodejs tarot.js > tarot.txt
node util.js "$( head -1 tarot.txt )" "$1" "Daily Tarot Card" "https://tarot.databox.me/profile/card#me" "https://tarot.databox.me/profile/thesun.jpg"

sleep 1
node util.js "$( tail -1 tarot.txt )" "$1" "Daily Tarot Card" "https://tarot.databox.me/profile/card#me" "https://tarot.databox.me/profile/thesun.jpg"
sleep 1
curl -X PUT -k "$1/$(date -u +"%Y-%m-%d")/,meta" -d "<> <> <> ."
