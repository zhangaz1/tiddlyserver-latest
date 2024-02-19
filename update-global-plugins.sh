#!/bin/bash

GLOBAL="/Users/zhangaz1/workspace/myPrivate/zhangaz1-pro/tiddlywikis/global"

(cd $GLOBAL/plugins && rm -rf tiddlywiki)
cp -R tiddlywiki-production-server/plugins/tiddlywiki/ $GLOBAL/plugins/tiddlywiki
(cd $GLOBAL/themes && rm -rf tiddlywiki)
cp -R tiddlywiki-production-server/plugins/tiddlywiki/ $GLOBAL/themes/tiddlywiki

(cd $GLOBAL && git add --all && git commit -m 'update tiddlywiki-plugins' && git push)
