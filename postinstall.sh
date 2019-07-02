#!/bin/bash

date_today="$(date "+%d_%m_%Y")"

# create folder ~/.floyd/app/<date>
mkdir -p ~/.floyd/app/$(date_today)

# clone the app in the directory
git clone https://github.com/floyd-framework/app.git ~/.floyd/app/$(date_today)