#!/bin/bash

shebang='#!/usr/bin/env node'

# sed -i "1s;^;$shebang\n;" build/cli.js
# OR
echo "$shebang\n$(cat build/cli.js)" > build/cli.js

chmod +x build/cli.js