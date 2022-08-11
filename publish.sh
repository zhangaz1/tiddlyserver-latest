#!/bin/bash

# ./compile.sh

(git add --all && git commit -m 'update tiddlywiki-production' && git push)

./update-global-plugins.sh

./update.sh

echo '
**************************

updae zy server

**************************
'

ssh zy 'cd /usr/local/lib/node_modules/tiddlyserver/node_modules && ./update.sh'