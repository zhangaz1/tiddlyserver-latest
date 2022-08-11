#!/bin/bash

# ./compile.sh

(git add --all && git commit -m 'update tiddlywiki-production' && git push)

./update-global-plugins.sh

(cd /usr/local/lib/node_modules/tiddlyserver/node_modules && git pull)
(cd /usr/local/lib/node_modules/tiddlyserver/node_modules/tiddlywiki-production-server/plugins && git pull)

echo '
**************************

updae zy server

**************************
'

ssh zy "
(cd /usr/local/lib/node_modules/tiddlyserver/node_modules && /usr/local/git/bin/git pull)
(cd /usr/local/lib/node_modules/tiddlyserver/node_modules/tiddlywiki-production-server/plugins && /usr/local/git/bin/git pull pull)
pm2 restart wikis
"