#!/bin/bash

(cd /usr/local/lib/node_modules/tiddlyserver/node_modules && /usr/local/git/bin/git pull)
(cd /usr/local/lib/node_modules/tiddlyserver/node_modules/tiddlywiki-production-server/plugins && /usr/local/git/bin/git pull)
pm2 restart wikis