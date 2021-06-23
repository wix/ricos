exports.ids = [0];
exports.modules = {

/***/ 1188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportDebuggingInfo", function() { return reportDebuggingInfo; });
function reportDebuggingInfo(_a){var version=_a.version,plugins=_a.plugins,getContent=_a.getContent,getConfig=_a.getConfig,reporter=_a.reporter;try{if("undefined"==typeof window||window.__RICOS_INFO__)return;window.__RICOS_INFO__={getContent:getContent,getConfig:getConfig},console.info("\n==============================================\n=       ===    ====     =====    =====      ==\n=  ====  ===  ====  ===  ===  ==  ===  ====  =\n=  ====  ===  ===  ========  ====  ==  ====  =\n=  ===   ===  ===  ========  ====  ===  ======\n=      =====  ===  ========  ====  =====  ====\n=  ====  ===  ===  ========  ====  =======  ==\n=  ====  ===  ===  ========  ====  ==  ====  =\n=  ====  ===  ====  ===  ===  ==  ===  ====  =\n=  ====  ==    ====     =====    =====      ==\n==============================================\n\n         "+reporter+" v"+version+"\n\n================ 🔌 PLUGINS ==================\n\n"+function(plugins){return plugins&&0!==plugins.length?plugins.reduce((function(result,plugin){return result+"\t"+plugin+"\n"}),""):"\tNo plugins installed this time\n"}(plugins)+"\n\n\n================ 📜 CONTENT ==================\n\nPlease run\n    copy(window['__RICOS_INFO__'].getContent())\nat any time in this console to get the current\ncontent state into the clipboard.\n\n\n================ 🛠  CONFIG ===================\n\nPlease run\n    copy(window['__RICOS_INFO__'].getConfig())\nat any time in this console to get the config\ndata into the clipboard.")}catch(_){}}


/***/ })

};;