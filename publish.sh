#!/bin/bash

./compile.sh

(git add --all && git commit -m 'update tiddlywiki-production' && git pull)

(cd /usr/local/lib/node_modules/tiddlyserver/node_modules && git pull)

echo '
**************************

cd /usr/local/lib/node_modules/tiddlyserver/node_modules && ./update.sh

**************************
'

ssh zy "
cd /usr/local/lib/node_modules/tiddlyserver/node_modules
./update.sh
"