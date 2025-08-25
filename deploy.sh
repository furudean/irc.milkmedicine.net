#!/usr/bin/env bash

set -e
cd "$(dirname "$0")"

npm run build

rsync -zhave ssh --progress build irc.milkmedicine.net:/home/node
ssh irc.milkmedicine.net "
    cd /home/node && \
    rm -rf irc.milkmedicine.net && \
    mv build irc.milkmedicine.net && \
    chown -R node:node irc.milkmedicine.net && \
    systemctl restart milkweb.service
"
