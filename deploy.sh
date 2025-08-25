#!/usr/bin/env bash

set -e
cd "$(dirname "$0")"

npm run build

scp -r build irc.milkmedicine.net:/home/node
ssh irc.milkmedicine.net "
    rm -rf /home/node/irc.milkmedicine.net/ && \
    mv /home/node/build/ /home/node/irc.milkmedicine.net/ && \
    chown -R node:node /home/node/irc.milkmedicine.net && \
    systemctl restart milkweb.service
"
