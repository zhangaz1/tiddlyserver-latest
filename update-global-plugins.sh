#!/bin/bash

GLOBAL="/Users/zhangaz1/workspace/myPrivate/zhangaz1-pro/tiddlywikis/global/plugins"

(cd $GLOBAL && rm -rf tiddlywiki)

cp -R tiddlywiki-production-server/plugins/tiddlywiki/ $GLOBAL/tiddlywiki

(cd $GLOBAL && git add --all && git commit -m 'update tiddlywiki-plugins' && git push)
