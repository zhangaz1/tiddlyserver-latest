#!/bin/bash

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