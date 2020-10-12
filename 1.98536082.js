exports.ids = [1];
exports.modules = {

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports.reportDebuggingInfo=function(_ref){var version=_ref.version,plugins=_ref.plugins,getContent=_ref.getContent,getConfig=_ref.getConfig,reporter=_ref.reporter;try{if("undefined"==typeof window||window.__RICOS_INFO__)return;window.__RICOS_INFO__={getContent:getContent,getConfig:getConfig},console.info("\n==============================================\n=       ===    ====     =====    =====      ==\n=  ====  ===  ====  ===  ===  ==  ===  ====  =\n=  ====  ===  ===  ========  ====  ==  ====  =\n=  ===   ===  ===  ========  ====  ===  ======\n=      =====  ===  ========  ====  =====  ====\n=  ====  ===  ===  ========  ====  =======  ==\n=  ====  ===  ===  ========  ====  ==  ====  =\n=  ====  ===  ====  ===  ===  ==  ===  ====  =\n=  ====  ==    ====     =====    =====      ==\n==============================================\n\n         "+reporter+" v"+version+"\n\n================ 🔌 PLUGINS ==================\n\n"+function(plugins){return plugins.reduce((function(result,plugin){return result+"\t"+plugin+"\n"}),"")}(plugins)+"\n\n\n================ 📜 CONTENT ==================\n\nPlease run\n    copy(window['__RICOS_INFO__'].getContent())\nat any time in this console to get the current\ncontent state into the clipboard.\n\n\n================ 🛠  CONFIG ===================\n\nPlease run\n    copy(window['__RICOS_INFO__'].getConfig())\nat any time in this console to get the config\ndata into the clipboard.")}catch(_){}};


/***/ })

};;