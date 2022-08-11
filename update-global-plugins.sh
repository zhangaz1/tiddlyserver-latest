#!/bin/bash

(cd ./../tw-plugins-global && rm -rf tiddlywiki)

cp -R tiddlywiki-production-server/plugins/tiddlywiki/ ./../tw-plugins-global/tiddlywiki

(cd ./../tw-plugins-global && git add --all && git commit -m 'update tiddlywiki-plugins' && git push)
