$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/github-fork-ribbon","name":"GitHub Fork Ribbon","description":"GitHub-inspired corner ribbon","author":"Simon Whitaker","list":"readme usage","stability":"STABILITY_2_STABLE","version":"5.3.6","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/github-fork-ribbon/readme\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/readme\",\"text\":\"This plugin provides a diagonal ribbon across the corner of the window. It resembles the design used by ~GitHub for their \\\"Fork me on ~GitHub\\\" ribbons.\\n\\nThe ribbon can be positioned over any corner, and can incorporate user defined text, colours and a link.\\n\\nThe CSS stylesheet is adapted from work by [[Simon Whitaker|https://github.com/simonwhitaker/github-fork-ribbon-css/]]\\n\\n[[Plugin source code|https://github.com/TiddlyWiki/TiddlyWiki5/blob/master/plugins/tiddlywiki/github-fork-ribbon]]\\n\"},\"$:/plugins/tiddlywiki/github-fork-ribbon/styles\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/styles\",\"text\":\"/* Left will inherit from right (so we don't need to duplicate code */\\n.github-fork-ribbon {\\n  /* The right and left lasses determine the side we attach our banner to */\\n  position: absolute;\\n\\n  /* Add a bit of padding to give some substance outside the \\\"stitching\\\" */\\n  padding: 2px 0;\\n\\n  /* Set the base colour */\\n  background-color: <<color>>;\\n\\n  /* Set a gradient: transparent black at the top to almost-transparent black at the bottom */\\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.00)), to(rgba(0, 0, 0, 0.15)));\\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#000000', EndColorStr='#000000');\\n\\n  /* Add a drop shadow */\\n  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);\\n  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);\\n\\n  z-index: 700;\\n  pointer-events: auto;\\n}\\n\\n.github-fork-ribbon a, .github-fork-ribbon a.tc-tiddlylink,\\n.github-fork-ribbon a:hover, .github-fork-ribbon a.tc-tiddlylink:hover  {\\n  /* Set the font */\\n  font-family: \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  font-size: 13px;\\n  font-weight: 700;\\n  color: white;\\n\\n  /* Set the text properties */\\n  text-decoration: none;\\n  text-shadow: 0 -1px rgba(0,0,0,0.5);\\n  text-align: center;\\n\\n  /* Set the geometry. If you fiddle with these you'll also need to tweak the top and right values in #github-fork-ribbon. */\\n  width: 200px;\\n  line-height: 20px;\\n\\n  /* Set the layout properties */\\n  display: inline-block;\\n  padding: 2px 0;\\n\\n  /* Add \\\"stitching\\\" effect */\\n  border-width: 1px 0;\\n  border-style: dotted;\\n  border-color: rgba(255,255,255,0.7);\\n}\\n\\n.github-fork-ribbon-wrapper {\\n  width: 150px;\\n  height: 150px;\\n  position: absolute;\\n  overflow: hidden;\\n  top: <<top>>;\\n  z-index: 700;\\n  pointer-events: none;\\n}\\n\\n.github-fork-ribbon-wrapper.fixed {\\n  position: fixed;\\n}\\n\\n.github-fork-ribbon-wrapper.left {\\n  left: <<left>>;\\n}\\n\\n.github-fork-ribbon-wrapper.right {\\n  right: <<right>>;\\n}\\n\\n.github-fork-ribbon-wrapper.left-bottom {\\n  position: fixed;\\n  top: inherit;\\n  bottom: <<bottom>>;\\n  left: <<left>>;\\n}\\n\\n.github-fork-ribbon-wrapper.right-bottom {\\n  position: fixed;\\n  top: inherit;\\n  bottom: <<bottom>>;\\n  right: <<right>>;\\n}\\n\\n.github-fork-ribbon-wrapper.right .github-fork-ribbon {\\n  top: 42px;\\n  right: -43px;\\n\\n  /* Rotate the banner 45 degrees */\\n  -webkit-transform: rotate(45deg);\\n  -moz-transform: rotate(45deg);\\n  -o-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n\\n.github-fork-ribbon-wrapper.left .github-fork-ribbon {\\n  top: 42px;\\n  left: -43px;\\n\\n  /* Rotate the banner -45 degrees */\\n  -webkit-transform: rotate(-45deg);\\n  -moz-transform: rotate(-45deg);\\n  -o-transform: rotate(-45deg);\\n  transform: rotate(-45deg);\\n}\\n\\n\\n.github-fork-ribbon-wrapper.left-bottom .github-fork-ribbon {\\n  top: 80px;\\n  left: -43px;\\n\\n  /* Rotate the banner -45 degrees */\\n  -webkit-transform: rotate(45deg);\\n  -moz-transform: rotate(45deg);\\n  -o-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n\\n.github-fork-ribbon-wrapper.right-bottom .github-fork-ribbon {\\n  top: 80px;\\n  right: -43px;\\n\\n  /* Rotate the banner -45 degrees */\\n  -webkit-transform: rotate(-45deg);\\n  -moz-transform: rotate(-45deg);\\n  -o-transform: rotate(-45deg);\\n  transform: rotate(-45deg);\\n}\\n\"},\"$:/plugins/tiddlywiki/github-fork-ribbon/template\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/template\",\"text\":\"<!-- Parameters:\\nposition: \\\"right\\\", \\\"left\\\", \\\"right-bottom\\\" and \\\"left-bottom\\\" \\nurl: link target\\ntext: ribbon text\\ncolor: defaults to \\\"#aa0000\\\" - dark red\\ntop: offset from the top in px - eg: \\\"30px\\\"\\nbottom: offset from the bottom in px - No ;\\nleft: offset from left in px - No ;\\nright: offset from right in px - No ;\\nfixed: \\\"fixed\\\" .. If ribbon is at the top, it can be \\\"fixed\\\". Bottom is always fixed\\n-->\\n\\\\parameters (position:\\\"right\\\", url:\\\"https://github.com/TiddlyWiki/TiddlyWiki5\\\", text:\\\"Fork me on ~GitHub\\\" color:\\\"#aa0000\\\" top:\\\"0\\\" bottom:\\\"0\\\" left:\\\"0\\\" right:\\\"0\\\" fixed:\\\"\\\")\\n\\n<style>\\n{{$:/plugins/tiddlywiki/github-fork-ribbon/styles}}\\n</style>\\n\\n<div class={{{ github-fork-ribbon-wrapper [<position>] [<fixed>] +[join[ ]] }}}>\\n\\t<div class=\\\"github-fork-ribbon\\\">\\n\\t\\t<a href=<<url>>>\\n\\t\\t\\t<<text>>\\n\\t\\t</a>\\n\\t</div>\\n</div>\\n\"},\"$:/plugins/tiddlywiki/github-fork-ribbon/usage\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/usage\",\"text\":\"\\\\procedure ribbonCode()\\n\\\\whitespace trim\\n<$transclude $tiddler=\\\"$:/plugins/tiddlywiki/github-fork-ribbon/template\\\" top=\\\"30px\\\" fixed=fixed color=\\\"green\\\"/>\\n\\\\end\\n\\n\\\\procedure ribbonCreateActions()\\n<%if [[$:/github-ribbon]!is[tiddler]] %>\\n\\t<$action-setfield $tiddler=\\\"$:/github-ribbon\\\" $field=\\\"text\\\" $value=<<ribbonCode>>\\n\\t\\ttags=\\\"$:/tags/PageTemplate\\\" \\n\\t\\tcode-body=\\\"yes\\\" />\\n<%endif%>\\n<$action-navigate $to=\\\"$:/github-ribbon\\\" />\\n\\\\end\\n\\n\\\\procedure createRibbon()\\n<$button actions=<<ribbonCreateActions>> >\\n<%if [[$:/github-ribbon]!is[tiddler]] %>\\nCreate\\n<%else%>\\nShow\\n<%endif%> ~$:/github-ribbon\\n</$button>\\n\\\\end\\n\\n\\\\procedure ribbonToggleTagActions()\\n<$action-listops $tiddler=\\\"$:/github-ribbon\\\" $field=\\\"tags\\\" $subfilter=\\\"+[toggle[$:/tags/PageTemplate]]\\\" />\\n\\\\end\\n\\n\\\\procedure ribbonToggleTag() <$button actions=<<ribbonToggleTagActions>> >Toggle Tag</$button>\\n\\n\\n`$:/plugins/tiddlywiki/github-fork-ribbon/template` is a template tiddler, that can be used with a transclusion and parameters.\\n\\n!! Usage\\n\\n* Create a new tiddler eg: $:/github-ribbon\\n* Tag it `$:/tags/PageTemplate`\\n* Copy the code below\\n\\n<pre><$text text=<<ribbonCode>>/></pre>\\n\\n<<createRibbon>> <<ribbonToggleTag>>\\n\\n!! Parameters\\n\\n; position\\n: \\\"right\\\" (default), \\\"left\\\", \\\"right-bottom\\\" and \\\"left-bottom\\\"\\n\\n; url\\n: Target URL, default: https://github.com/TiddlyWiki/TiddlyWiki5\\n\\n; text\\n: Ribbon text. default: `Fork me on ~GitHub`\\n\\n; color\\n: Ribbon background color: default: `#aa0000`\\n\\n; top\\n: Offset from the top if postion is top. default: `0` eg: `30px`, if the menu-toolbar plugin is installed\\n\\n; bottom\\n: Offset from the bottom in px\\n\\n; left\\n: Offset from the left in px\\n\\n; right\\n: Offset from the right in px\\n\\n; fixed\\n: If position is ''top'', the ribbon will scroll out of the viewport by default\\n: If the parameter `fixed=\\\"fixed\\\"` it will be fixed\\n\\n!! Remove the Ribbon\\n\\n* Disable the plugin\\n* ''Remove the tag'' from $:/github-ribbon tiddler\\n* Delete the $:/github-ribbon tiddler\\n* <<ribbonToggleTag>>\"}}}"});