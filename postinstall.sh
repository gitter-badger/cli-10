#!/bin/bash

date_today="$(date "+%d_%m_%Y")"

# create folder ~/.floyd/app/<date>
DIRECTORY="$HOME/.floyd/app/$date_today"

# clone the app in the directory
if [ ! -d "$DIRECTORY" ]; then
    mkdir -p "$DIRECTORY"
    git clone https://github.com/floyd-framework/app.git "$DIRECTORY"
fi