$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-trailingspace","name":"CodeMirror Show Trailing Space","description":"Show trailing space in CodeMirror","parent-plugin":"$:/plugins/tiddlywiki/codemirror","list":"readme","stability":"STABILITY_2_STABLE","version":"5.3.6","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/config/codemirror/showTrailingSpace\":{\"title\":\"$:/config/codemirror/showTrailingSpace\",\"type\":\"bool\",\"text\":\"true\"},\"$:/language/codemirror/showTrailingSpace/hint\":{\"title\":\"$:/language/codemirror/showTrailingSpace/hint\",\"text\":\"Show trailing space\"},\"$:/language/codemirror/showTrailingSpace/info\":{\"title\":\"$:/language/codemirror/showTrailingSpace/info\",\"text\":\"Trailing space on each line will be decorated as per theme CSS.\"},\"$:/plugins/tiddlywiki/codemirror/addon/edit/trailingspace.css\":{\"text\":\".cm-trailingspace {\\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUXCToH00Y1UgAAACFJREFUCNdjPMDBUc/AwNDAAAFMTAwMDA0OP34wQgX/AQBYgwYEx4f9lQAAAABJRU5ErkJggg==);\\n  background-position: bottom left;\\n  background-repeat: repeat-x;\\n}\\n\",\"type\":\"text/css\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/edit/trailingspace.css\",\"tags\":\"[[$:/tags/Stylesheet]]\"},\"$:/plugins/tiddlywiki/codemirror/addon/edit/trailingspace.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: https://codemirror.net/5/LICENSE\\n\\n(function(mod) {\\n  if (typeof exports == \\\"object\\\" && typeof module == \\\"object\\\") // CommonJS\\n    mod(require(\\\"../../lib/codemirror\\\"));\\n  else if (typeof define == \\\"function\\\" && define.amd) // AMD\\n    define([\\\"../../lib/codemirror\\\"], mod);\\n  else // Plain browser env\\n    mod(CodeMirror);\\n})(function(CodeMirror) {\\n  CodeMirror.defineOption(\\\"showTrailingSpace\\\", false, function(cm, val, prev) {\\n    if (prev == CodeMirror.Init) prev = false;\\n    if (prev && !val)\\n      cm.removeOverlay(\\\"trailingspace\\\");\\n    else if (!prev && val)\\n      cm.addOverlay({\\n        token: function(stream) {\\n          for (var l = stream.string.length, i = l; i && /\\\\s/.test(stream.string.charAt(i - 1)); --i) {}\\n          if (i > stream.pos) { stream.pos = i; return null; }\\n          stream.pos = l;\\n          return \\\"trailingspace\\\";\\n        },\\n        name: \\\"trailingspace\\\"\\n      });\\n  });\\n});\\n\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/edit/trailingspace.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror-trailingspace/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-trailingspace/readme\",\"text\":\"This plugin contains the [[trailingspace|https://codemirror.net/5/doc/manual.html#addon_trailingspace]]\\naddon for CodeMirror, and provides a default style (red squiggles).\\n\\nFirst install the [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]].\\n\\n\"},\"$:/core/ui/ControlPanel/Settings/codemirror/showTrailingSpace\":{\"title\":\"$:/core/ui/ControlPanel/Settings/codemirror/showTrailingSpace\",\"tags\":\"$:/tags/ControlPanel/Settings/CodeMirror\",\"caption\":\"{{$:/language/codemirror/showTrailingSpace/hint}}\",\"text\":\"\\\\define lingo-base() $:/language/codemirror/showTrailingSpace/\\n<<lingo hint>>\\n\\n<$checkbox tiddler=\\\"$:/config/codemirror/showTrailingSpace\\\" field=\\\"text\\\" checked=\\\"true\\\" unchecked=\\\"false\\\" default=\\\"true\\\">\\n  <$link to=\\\"$:/config/codemirror/showTrailingSpace\\\"><<lingo info>></$link>\\n</$checkbox>\\n\\n\"}}}"});