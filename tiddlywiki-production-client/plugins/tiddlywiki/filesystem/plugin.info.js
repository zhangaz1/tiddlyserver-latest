$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/filesystem","name":"Filesystem","description":"Synchronize changes from the node.js server to the local filesystem","list":"readme","version":"5.2.0","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/filesystem/filesystemadaptor.js\":{\"title\":\"$:/plugins/tiddlywiki/filesystem/filesystemadaptor.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/filesystem/filesystemadaptor.js\\ntype: application/javascript\\nmodule-type: syncadaptor\\n\\nA sync adaptor module for synchronising with the local filesystem via node.js APIs\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\n// Get a reference to the file system\\nvar fs = $tw.node ? require(\\\"fs\\\") : null,\\n\\tpath = $tw.node ? require(\\\"path\\\") : null;\\n\\nfunction FileSystemAdaptor(options) {\\n\\tvar self = this;\\n\\tthis.wiki = options.wiki;\\n\\tthis.boot = options.boot || $tw.boot;\\n\\tthis.logger = new $tw.utils.Logger(\\\"filesystem\\\",{colour: \\\"blue\\\"});\\n\\t// Create the <wiki>/tiddlers folder if it doesn't exist\\n\\t$tw.utils.createDirectory(this.boot.wikiTiddlersPath);\\n}\\n\\nFileSystemAdaptor.prototype.name = \\\"filesystem\\\";\\n\\nFileSystemAdaptor.prototype.supportsLazyLoading = false;\\n\\nFileSystemAdaptor.prototype.isReady = function() {\\n\\t// The file system adaptor is always ready\\n\\treturn true;\\n};\\n\\nFileSystemAdaptor.prototype.getTiddlerInfo = function(tiddler) {\\n\\t//Returns the existing fileInfo for the tiddler. To regenerate, call getTiddlerFileInfo().\\n\\tvar title = tiddler.fields.title;\\n\\treturn this.boot.files[title];\\n};\\n\\n/*\\nReturn a fileInfo object for a tiddler, creating it if necessary:\\n  filepath: the absolute path to the file containing the tiddler\\n  type: the type of the tiddler file (NOT the type of the tiddler -- see below)\\n  hasMetaFile: true if the file also has a companion .meta file\\n\\nThe boot process populates this.boot.files for each of the tiddler files that it loads.\\nThe type is found by looking up the extension in $tw.config.fileExtensionInfo (eg \\\"application/x-tiddler\\\" for \\\".tid\\\" files).\\n\\nIt is the responsibility of the filesystem adaptor to update this.boot.files for new files that are created.\\n*/\\nFileSystemAdaptor.prototype.getTiddlerFileInfo = function(tiddler,callback) {\\n\\t// Always generate a fileInfo object when this fuction is called\\n\\tvar title = tiddler.fields.title, newInfo, pathFilters, extFilters,\\n\\t\\tfileInfo = this.boot.files[title];\\n\\tif(this.wiki.tiddlerExists(\\\"$:/config/FileSystemPaths\\\")) {\\n\\t\\tpathFilters = this.wiki.getTiddlerText(\\\"$:/config/FileSystemPaths\\\",\\\"\\\").split(\\\"\\\\n\\\");\\n\\t}\\n\\tif(this.wiki.tiddlerExists(\\\"$:/config/FileSystemExtensions\\\")) {\\n\\t\\textFilters = this.wiki.getTiddlerText(\\\"$:/config/FileSystemExtensions\\\",\\\"\\\").split(\\\"\\\\n\\\");\\n\\t}\\n\\tnewInfo = $tw.utils.generateTiddlerFileInfo(tiddler,{\\n\\t\\tdirectory: this.boot.wikiTiddlersPath,\\n\\t\\tpathFilters: pathFilters,\\n\\t\\textFilters: extFilters,\\n\\t\\twiki: this.wiki,\\n\\t\\tfileInfo: fileInfo\\n\\t});\\n\\tcallback(null,newInfo);\\n};\\n\\n\\n/*\\nSave a tiddler and invoke the callback with (err,adaptorInfo,revision)\\n*/\\nFileSystemAdaptor.prototype.saveTiddler = function(tiddler,callback,options) {\\n\\tvar self = this;\\n\\tvar syncerInfo = options.tiddlerInfo || {};\\n\\tthis.getTiddlerFileInfo(tiddler,function(err,fileInfo) {\\n\\t\\tif(err) {\\n\\t\\t\\treturn callback(err);\\n\\t\\t}\\n\\t\\t$tw.utils.saveTiddlerToFile(tiddler,fileInfo,function(err,fileInfo) {\\n\\t\\t\\tif(err) {\\n\\t\\t\\t\\tif ((err.code == \\\"EPERM\\\" || err.code == \\\"EACCES\\\") && err.syscall == \\\"open\\\") {\\n\\t\\t\\t\\t\\tfileInfo = fileInfo || self.boot.files[tiddler.fields.title];\\n\\t\\t\\t\\t\\tfileInfo.writeError = true;\\n\\t\\t\\t\\t\\tself.boot.files[tiddler.fields.title] = fileInfo;\\n\\t\\t\\t\\t\\t$tw.syncer.logger.log(\\\"Sync failed for \\\\\\\"\\\"+tiddler.fields.title+\\\"\\\\\\\" and will be retried with encoded filepath\\\",encodeURIComponent(fileInfo.filepath));\\n\\t\\t\\t\\t\\treturn callback(err);\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\treturn callback(err);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\t// Store new boot info only after successful writes\\n\\t\\t\\tself.boot.files[tiddler.fields.title] = fileInfo;\\n\\t\\t\\t// Cleanup duplicates if the file moved or changed extensions\\n\\t\\t\\tvar options = {\\n\\t\\t\\t\\tadaptorInfo: syncerInfo.adaptorInfo || {},\\n\\t\\t\\t\\tbootInfo: fileInfo || {},\\n\\t\\t\\t\\ttitle: tiddler.fields.title\\n\\t\\t\\t};\\n\\t\\t\\t$tw.utils.cleanupTiddlerFiles(options,function(err,fileInfo) {\\n\\t\\t\\t\\tif(err) {\\n\\t\\t\\t\\t\\treturn callback(err);\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\treturn callback(null,fileInfo);\\n\\t\\t\\t});\\n\\t\\t});\\n\\t});\\n};\\n\\n/*\\nLoad a tiddler and invoke the callback with (err,tiddlerFields)\\n\\nWe don't need to implement loading for the file system adaptor, because all the tiddler files will have been loaded during the boot process.\\n*/\\nFileSystemAdaptor.prototype.loadTiddler = function(title,callback) {\\n\\tcallback(null,null);\\n};\\n\\n/*\\nDelete a tiddler and invoke the callback with (err)\\n*/\\nFileSystemAdaptor.prototype.deleteTiddler = function(title,callback,options) {\\n\\tvar self = this,\\n\\t\\tfileInfo = this.boot.files[title];\\n\\t// Only delete the tiddler if we have writable information for the file\\n\\tif(fileInfo) {\\n\\t\\t$tw.utils.deleteTiddlerFile(fileInfo,function(err,fileInfo) {\\n\\t\\t\\tif(err) {\\n\\t\\t\\t\\tif ((err.code == \\\"EPERM\\\" || err.code == \\\"EACCES\\\") && err.syscall == \\\"unlink\\\") {\\n\\t\\t\\t\\t\\t// Error deleting the file on disk, should fail gracefully\\n\\t\\t\\t\\t\\t$tw.syncer.displayError(\\\"Server desynchronized. Error deleting file for deleted tiddler \\\\\\\"\\\" + title + \\\"\\\\\\\"\\\",err);\\n\\t\\t\\t\\t\\treturn callback(null,fileInfo);\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\treturn callback(err);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\t// Remove the tiddler from self.boot.files & return null adaptorInfo\\n\\t\\t\\tdelete self.boot.files[title];\\n\\t\\t\\treturn callback(null,null);\\n\\t\\t});\\n\\t} else {\\n\\t\\tcallback(null,null);\\n\\t}\\n};\\n\\nif(fs) {\\n\\texports.adaptorClass = FileSystemAdaptor;\\n}\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"syncadaptor\"},\"$:/plugins/tiddlywiki/filesystem/readme\":{\"title\":\"$:/plugins/tiddlywiki/filesystem/readme\",\"text\":\"The filesystem plugin is used under Node.js to synchronise tiddler changes back to the file system. It is inert when used in the browser.\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/filesystem]]\\n\"}}}"});