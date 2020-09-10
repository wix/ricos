exports.ids = [8];
exports.modules = {

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_ae73d45f_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);
/* harmony import */ var wix_rich_content_viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(139);
/* harmony import */ var wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
function imageEntryToGallery(data,index){var src=data.src,url=src.file_name,metadata=data.metadata;return{metadata:{height:src.height,width:src.width,title:metadata&&metadata.caption||"",altText:metadata&&metadata.alt||""},itemId:src.id||url+index,url:url}}function convertEntryToGalleryItems(entry,index){switch(entry.type){case"wix-draft-plugin-image":case"IMAGE":return entry.data.src?[imageEntryToGallery(entry.data,index)]:[];case"wix-draft-plugin-gallery":return entry.data.items;default:return[]}}var getImagesData_cjs=function(_ref){var entityMap=_ref.entityMap,sum=0,imageMap={};return{images:Object.values(entityMap).map(convertEntryToGalleryItems).reduce((function(urls,entryUrls,i){return entryUrls.length>0&&(imageMap[i]=sum),sum+=entryUrls.length,urls.concat(entryUrls)}),[]),imageMap:imageMap}};function createCommonjsModule(fn,module){return fn(module={exports:{}},module.exports),module.exports}var _extends_1=createCommonjsModule((function(module){function _extends(){return module.exports=_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}module.exports=_extends}));function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var _ref=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g",{fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{fill:"#FFF",d:"M0 0h60v60H0z"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{fill:"#000",d:"M42.188 17l.812.813L30.812 30 43 42.188l-.813.812L30 30.812 17.812 43 17 42.187 29.187 30 17 17.812l.813-.812L30 29.187 42.188 17z"}));function _extends$1(){return(_extends$1=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var _ref$1=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g",{fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{fill:"#FFF",d:"M0 0h60v60H0z"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g",{fill:"#1B1B1B"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{d:"M25.704 33.53l.764.764-8.427 8.426-.763-.763zM43 25h-1v-7h-7v-1h8v8z"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{d:"M41.955 17.279l.765.766-8.426 8.426-.766-.766zM17 43v-8h1v7h7v1h-8z"}))),SvgExpand=function(props){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg",_extends$1({width:60,height:60,viewBox:"0 0 60 60",style:{background:"#fff"}},props),_ref$1)};function _extends$2(){return(_extends$2=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var x,module,_ref$2=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g",{fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{fill:"#FFF",d:"M0 0h60v60H0z"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g",{fill:"#1B1B1B"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{d:"M17.764 43L17 42.236l8.427-8.426.763.763zM33 18.833h1v7h7v1h-8v-8z"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{d:"M34.045 26.554l-.765-.766 8.426-8.426.766.766zM26.468 33.53v8h-1v-7h-7v-1h8z"}))),SvgShrink=function(props){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg",_extends$2({width:60,height:60,viewBox:"0 0 60 60"},props),_ref$2)},layouts=[{showArrows:!1,cubeImages:!1,groupSize:3,groupTypes:"1,2h,2v,3t,3b,3l,3r",fixedColumns:0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,isVertical:!0,cropOnlyFill:!1,oneRow:!1,galleryType:"Columns",imageMargin:20,gallerySizePx:"300"},{showArrows:!1,cubeImages:!1,groupSize:1,groupTypes:"1",fixedColumns:0,numberOfImagesPerRow:0,imageMargin:20,gallerySizePx:"300",gridStyle:0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,cropOnlyFill:!1,oneRow:!1},{showArrows:!1,cubeImages:!0,smartCrop:!1,imageResize:!1,galleryImageRatio:2,numberOfImagesPerRow:3,imageMargin:20,cubeType:"fill",cubeRatio:1,isVertical:!0,galleryType:"Columns",groupSize:1,groupTypes:"1",fixedColumns:void 0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,cropOnlyFill:!1,isSlider:!1,isColumns:!1,isGrid:!0,isSlideshow:!1,minItemSize:50,oneRow:!1},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeType:"fill",cubeRatio:1,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",oneRow:!0,hasThumbnails:!0,galleryThumbnailsAlignment:"bottom",enableScroll:!1,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,cropOnlyFill:!1,floatingImages:0,thumbnailSpacings:0,galleryMargin:0},{showArrows:!0,cubeImages:!0,smartCrop:!1,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",oneRow:!0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isSlider:!0,isColumns:!1,isSlideshow:!1,cropOnlyFill:!0,imageMargin:20,cubeType:"fit",cubeRatio:"16/9"},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeRatio:1,cubeType:"fit",isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",fixedColumns:1,oneRow:!0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!1,isGrid:!1,isColumns:!1,isSlider:!1,isSlideshow:!0,cropOnlyFill:!1,floatingImages:0,galleryMargin:0,imageMargin:0,slideShowInfoSize:0},{showArrows:!1,cubeImages:!1,isVertical:!0,galleryType:"Columns",groupSize:1,groupTypes:"1",oneRow:!1,fixedColumns:1,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isColumns:!1,isSlider:!1,isSlideshow:!1,cropOnlyFill:!1,imageMargin:20},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeType:"fill",cubeRatio:.35,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",fixedColumns:0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",oneRow:!0,enableScroll:!0,isGrid:!1,isColumns:!0,isSlider:!1,isSlideshow:!1,cropOnlyFill:!1,imageMargin:20},{},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeType:"fill",cubeRatio:1,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",oneRow:!0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!1,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,cropOnlyFill:!1,floatingImages:0,galleryMargin:0,imageMargin:0}],imageClientSDK=(function(module,exports){module.exports=function(e){var t={};function a(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(i,r,function(t){return e[t]}.bind(null,r));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=15)}([function(e,t,a){var i={JPG:"jpg",JPEG:"jpeg",PNG:"png",WEBP:"webp",WIX_ICO_MP:"wix_ico_mp",WIX_MP:"wix_mp",GIF:"gif",SVG:"svg",UNRECOGNIZED:"unrecognized"},r=[i.JPG,i.JPEG,i.PNG,i.GIF,i.WEBP];e.exports={alignTypes:{CENTER:"center",TOP:"top",TOP_LEFT:"top_left",TOP_RIGHT:"top_right",BOTTOM:"bottom",BOTTOM_LEFT:"bottom_left",BOTTOM_RIGHT:"bottom_right",LEFT:"left",RIGHT:"right"},alignTypesMap:{center:"c",top:"t",top_left:"tl",top_right:"tr",bottom:"b",bottom_left:"bl",bottom_right:"br",left:"l",right:"r"},transformTypes:{FIT:"fit",FILL:"fill",FILL_FOCAL:"fill_focal",CROP:"crop",LEGACY_CROP:"legacy_crop",LEGACY_FILL:"legacy_fill"},fittingTypes:{SCALE_TO_FILL:"fill",SCALE_TO_FIT:"fit",STRETCH:"stretch",ORIGINAL_SIZE:"original_size",TILE:"tile",TILE_HORIZONTAL:"tile_horizontal",TILE_VERTICAL:"tile_vertical",FIT_AND_TILE:"fit_and_tile",LEGACY_STRIP_TILE:"legacy_strip_tile",LEGACY_STRIP_TILE_HORIZONTAL:"legacy_strip_tile_horizontal",LEGACY_STRIP_TILE_VERTICAL:"legacy_strip_tile_vertical",LEGACY_STRIP_SCALE_TO_FILL:"legacy_strip_fill",LEGACY_STRIP_SCALE_TO_FIT:"legacy_strip_fit",LEGACY_STRIP_FIT_AND_TILE:"legacy_strip_fit_and_tile",LEGACY_STRIP_ORIGINAL_SIZE:"legacy_strip_original_size",LEGACY_ORIGINAL_SIZE:"actual_size",LEGACY_FIT_WIDTH:"fitWidth",LEGACY_FIT_HEIGHT:"fitHeight",LEGACY_FULL:"full",LEGACY_BG_FIT_AND_TILE:"legacy_tile",LEGACY_BG_FIT_AND_TILE_HORIZONTAL:"legacy_tile_horizontal",LEGACY_BG_FIT_AND_TILE_VERTICAL:"legacy_tile_vertical",LEGACY_BG_NORMAL:"legacy_normal"},htmlTag:{BG:"bg",IMG:"img",SVG:"svg"},upscaleMethods:{AUTO:"auto",CLASSIC:"classic",SUPER:"super"},upscaleMethodsValues:{classic:1,super:2},defaultUSM:{radius:.66,amount:1,threshold:.01},emptyData:{uri:"",css:{img:{},container:{}},attr:{img:{},container:{}}},imageQuality:{HIGH:"HIGH",MEDIUM:"MEDIUM",LOW:"LOW",TINY:"TINY"},imageFilters:{CONTRAST:"contrast",BRIGHTNESS:"brightness",SATURATION:"saturation",HUE:"hue",BLUR:"blur"},imageScaleDefaults:{HIGH:{size:196e4,quality:90,maxUpscale:1},MEDIUM:{size:36e4,quality:85,maxUpscale:1},LOW:{size:16e4,quality:80,maxUpscale:1.2},TINY:{size:0,quality:80,maxUpscale:1.4}},fileType:i,supportedExtensions:r,webp:{LOSSLESS:"lossless",LOSSY:"lossy",ALPHA:"alpha",ANIMATION:"animation"},SAFE_TRANSFORMED_AREA:25e6,SUPER_UPSCALE_MODELS:[1.5,2,4],MAX_DEVICE_PIXEL_RATIO:2,API_VERSION:"v1"}},function(e,t,a){var i=a(2),r=a(0),n=a(4);function s(e){var t=new window.Image;t.onload=function(){var a=n.getFeature("isWEBP");a[e]=t.width>0&&t.height>0,n.setFeature("isWEBP",a)},t.src="data:image/webp;base64,"+{lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"}[e]}function o(e){var t=[r.fileType.PNG,r.fileType.JPEG,r.fileType.JPG,r.fileType.WIX_ICO_MP,r.fileType.WIX_MP];return i.includes(t,u(e))}function l(e){return i.includes(["webp"],u(e))}function c(e){return/(^https?)|(^data)|(^\/\/)/.test(e)}function u(e){return(/[.]([^.]+)$/.exec(e)&&/[.]([^.]+)$/.exec(e)[1]||"").toLowerCase()}function p(e,t,a,i,n){return n===r.transformTypes.FILL?function(e,t,a,i){return Math.max(a/e,i/t)}(e,t,a,i):n===r.transformTypes.FIT?function(e,t,a,i){return Math.min(a/e,i/t)}(e,t,a,i):1}function h(e,t){var a=T(e,t);return{optimizedScaleFactor:r.imageScaleDefaults[a].maxUpscale,upscaleMethodValue:r.upscaleMethodsValues.classic,forceUSM:!1}}function f(e,t){var a=T(e,t);return{optimizedScaleFactor:r.imageScaleDefaults[a].maxUpscale,upscaleMethodValue:r.upscaleMethodsValues.classic,forceUSM:!1}}function g(e,t,a){return{optimizedScaleFactor:i.last(r.SUPER_UPSCALE_MODELS),upscaleMethodValue:r.upscaleMethodsValues.super,forceUSM:!(r.SUPER_UPSCALE_MODELS.includes(a)||a>i.last(r.SUPER_UPSCALE_MODELS))}}function T(e,t){var a=e*t;return a>r.imageScaleDefaults[r.imageQuality.HIGH].size?r.imageQuality.HIGH:a>r.imageScaleDefaults[r.imageQuality.MEDIUM].size?r.imageQuality.MEDIUM:a>r.imageScaleDefaults[r.imageQuality.LOW].size?r.imageQuality.LOW:r.imageQuality.TINY}function A(e,t){var a=Math.pow(10,t||0);return(e*a/a).toFixed(parseInt(t,10))}e.exports={populateGlobalFeatureSupport:function(){"undefined"!=typeof window&&(s(r.webp.LOSSY),s(r.webp.LOSSLESS),s(r.webp.ALPHA),s(r.webp.ANIMATION),n.setFeature("isObjectFitBrowser","objectFit"in window.document.documentElement.style))},isWEBPBrowserSupport:function(e){var t=n.getFeature("isWEBP"),a=e===r.fileType.JPG&&t[r.webp.LOSSY],i=e===r.fileType.PNG&&t[r.webp.LOSSLESS],s=e===r.fileType.PNG&&t[r.webp.ALPHA];return a||i&&s},isObjectFitBrowserSupport:function(){return n.getFeature("isObjectFitBrowser")},isImageTransformApplicable:function(e){return o(e)&&!c(e)},isValidRequest:function(e,t,a){return a&&t&&!(!(n=t.id)||!n.trim()||"none"===n.toLowerCase())&&i.includes(r.fittingTypes,e);var n},isImageTypeSupported:o,isExternalUrl:c,isWEBP:l,getFileType:function(e){return function(e){return i.includes(["jpg","jpeg"],u(e))}(e)?r.fileType.JPG:function(e){return i.includes(["png"],u(e))}(e)?r.fileType.PNG:l(e)?r.fileType.WEBP:r.fileType.UNRECOGNIZED},getFileExtension:u,getFileName:function(e,t){var a=/\.([^.]*)$/;if("string"==typeof t&&t.length){var n=["/","\\","?","<",">","|","“",":",'"'].map(encodeURIComponent),s=new RegExp("("+n.concat(["\\.","\\*"]).join("|")+")","g"),o=t,l=t.match(a);return l&&i.includes(r.supportedExtensions,l[1])&&(o=t.replace(a,"")),encodeURIComponent(o).replace(s,"_")}var c=e.match(/\/(.*?)$/);return(c?c[1]:e).replace(a,"")},getAlignedRect:function(e,t,a){var i=void 0,n=void 0;switch(a){case r.alignTypes.CENTER:i=Math.max(0,(e.width-t.width)/2),n=Math.max(0,(e.height-t.height)/2);break;case r.alignTypes.TOP:i=Math.max(0,(e.width-t.width)/2),n=0;break;case r.alignTypes.TOP_LEFT:i=0,n=0;break;case r.alignTypes.TOP_RIGHT:i=Math.max(0,e.width-t.width),n=0;break;case r.alignTypes.BOTTOM:i=Math.max(0,(e.width-t.width)/2),n=Math.max(0,e.height-t.height);break;case r.alignTypes.BOTTOM_LEFT:i=0,n=Math.max(0,e.height-t.height);break;case r.alignTypes.BOTTOM_RIGHT:i=Math.max(0,e.width-t.width),n=Math.max(0,e.height-t.height);break;case r.alignTypes.LEFT:i=0,n=Math.max(0,(e.height-t.height)/2);break;case r.alignTypes.RIGHT:i=Math.max(0,e.width-t.width),n=Math.max(0,(e.height-t.height)/2)}return{x:e.x?e.x+i:i,y:e.y?e.y+n:n,width:Math.min(e.width,t.width),height:Math.min(e.height,t.height)}},getOverlappingRect:function(e,t){var a=Math.max(0,Math.min(e.width,t.x+t.width)-Math.max(0,t.x)),i=Math.max(0,Math.min(e.height,t.y+t.height)-Math.max(0,t.y));return a&&i&&(e.width!==a||e.height!==i)?{x:Math.max(0,t.x),y:Math.max(0,t.y),width:a,height:i}:null},getScaleFactor:p,getTransformData:function(e,t,a,i,n){e=e||a.width,t=t||a.height;var s=function(e){return Math.min(e.pixelAspectRatio||1,r.MAX_DEVICE_PIXEL_RATIO)}(a),o=function(e,t,a,i,n){var s=void 0,o=void 0,l=void 0;if(s=p(e,t,a,i,n),n===r.transformTypes.FILL?(o=a,l=i):n===r.transformTypes.FIT&&(o=e*s,l=t*s),o*l>r.SAFE_TRANSFORMED_AREA){var c=Math.sqrt(r.SAFE_TRANSFORMED_AREA/(o*l));s=p(e,t,o*=c,l*=c,n)}return{scaleFactor:s,width:o,height:l}}(e,t,a.width*s,a.height*s,i),l=o.scaleFactor;return function(e,t,a,i,n,s,o){var l=function(e,t,a,i){return{classic:h,auto:f,super:g}[i](e,t,a)}(e,t,s,n),c=l.optimizedScaleFactor,u=l.upscaleMethodValue,p=l.forceUSM;if(s<=c)return{width:a,height:i,scaleFactor:s,upscaleMethodValue:u,forceUSM:p,cssUpscaleNeeded:!1};var T=void 0,A=void 0;switch(o){case r.transformTypes.FILL:T=a*(c/s),A=i*(c/s);break;case r.transformTypes.FIT:T=e*c,A=t*c}return{width:T,height:A,scaleFactor:c,upscaleMethodValue:u,forceUSM:p,cssUpscaleNeeded:!0}}(e,t,o.width,o.height,n,l,i)},getAlignment:function(e){return r.alignTypesMap[e.alignment]||r.alignTypesMap[r.alignTypes.CENTER]},getPreferredImageQuality:function(e,t){return r.imageScaleDefaults[T(e,t)].quality},getDimension:function(e,t,a,i,r){var n=p(e,t,a,i,r);return{width:Math.round(e*n),height:Math.round(t*n)}},getFocalPoint:function(e){var t=null;return"number"!=typeof e.x||isNaN(e.x)||"number"!=typeof e.y||isNaN(e.y)||(t={x:A(Math.max(0,Math.min(100,e.x))/100,2),y:A(Math.max(0,Math.min(100,e.y))/100,2)}),t},getUpscaleString:function(e){return e&&e.upscaleMethod&&"string"==typeof e.upscaleMethod&&r.upscaleMethods[e.upscaleMethod.toUpperCase()]||r.upscaleMethods.AUTO},roundToFixed:A}},function(e,t,a){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports={assign:function(){for(var e=arguments[0]||{},t=Array.prototype.slice.call(arguments,1,arguments.length),a=0;a<t.length;a++){var i=t[a];for(var r in i)i.hasOwnProperty(r)&&(e[r]=i[r])}return e},includes:function(e,t){return e.indexOf?e.indexOf(t)>-1:!(!e||"object"!==(void 0===e?"undefined":i(e)))&&Object.keys(e).some((function(a){return e[a]===t}))},last:function(e){return e[e.length-1]},template:function(e){return function(t){var a=e;for(var i in t)t.hasOwnProperty(i)&&(a=a.replace(new RegExp("\\${"+i+"}","g"),t[i]));return a}}}},function(e,t,a){var i=a(1),r=a(5),n=a(6);e.exports=function(e,t,a,s){var o=i.getFileType(t.id),l={fileName:i.getFileName(t.id,t.name),fileExtension:i.getFileExtension(t.id),fileType:o,isWEBPSupport:i.isWEBPBrowserSupport(o),fittingType:e,src:{id:t.id,width:t.width,height:t.height,isCropped:!1},focalPoint:{x:t.focalPoint&&t.focalPoint.x,y:t.focalPoint&&t.focalPoint.y},parts:[],quality:0,upscaleMethod:i.getUpscaleString(s),progressive:!0,watermark:"",unsharpMask:{},filters:{}};return i.isImageTransformApplicable(t.id)&&(r.setTransformParts(l,t,a),n.setTransformOptions(l,s)),l}},function(e,t,a){var i={isWEBP:{lossless:!1,lossy:!1,alpha:!1,animation:!1},isObjectFitBrowser:!0};e.exports={getFeature:function(e){return i[e]},setFeature:function(e,t){i[e]=t}}},function(e,t,a){var i=a(2),r=a(0),n=a(1);function s(e,t){var a=n.getTransformData(e.src.width,e.src.height,t,r.transformTypes.FIT,e.upscaleMethod);return{transformType:r.transformTypes.FILL,width:Math.round(a.width),height:Math.round(a.height),alignment:r.alignTypesMap.center,upscale:a.scaleFactor>1,forceUSM:a.forceUSM,scaleFactor:a.scaleFactor,cssUpscaleNeeded:a.cssUpscaleNeeded,upscaleMethodValue:a.upscaleMethodValue}}function o(e){return{transformType:r.transformTypes.CROP,x:Math.round(e.x),y:Math.round(e.y),width:Math.round(e.width),height:Math.round(e.height),upscale:!1,forceUSM:!1,scaleFactor:1,cssUpscaleNeeded:!1}}e.exports={setTransformParts:function(e,t,a){var l=void 0;switch(t.crop&&(l=n.getOverlappingRect(t,t.crop))&&(e.src.width=l.width,e.src.height=l.height,e.src.cropped=!0,e.parts.push(o(l))),e.fittingType){case r.fittingTypes.SCALE_TO_FIT:case r.fittingTypes.LEGACY_FIT_WIDTH:case r.fittingTypes.LEGACY_FIT_HEIGHT:case r.fittingTypes.LEGACY_FULL:case r.fittingTypes.FIT_AND_TILE:case r.fittingTypes.LEGACY_BG_FIT_AND_TILE:case r.fittingTypes.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:case r.fittingTypes.LEGACY_BG_FIT_AND_TILE_VERTICAL:case r.fittingTypes.LEGACY_BG_NORMAL:e.parts.push(s(e,a));break;case r.fittingTypes.SCALE_TO_FILL:e.parts.push(function(e,t){var a=n.getTransformData(e.src.width,e.src.height,t,r.transformTypes.FILL,e.upscaleMethod),i=n.getFocalPoint(e.focalPoint);return{transformType:i?r.transformTypes.FILL_FOCAL:r.transformTypes.FILL,width:Math.round(a.width),height:Math.round(a.height),alignment:n.getAlignment(t),focalPointX:i&&i.x,focalPointY:i&&i.y,upscale:a.scaleFactor>1,forceUSM:a.forceUSM,scaleFactor:a.scaleFactor,cssUpscaleNeeded:a.cssUpscaleNeeded,upscaleMethodValue:a.upscaleMethodValue}}(e,a));break;case r.fittingTypes.STRETCH:e.parts.push(function(e,t){var a=n.getScaleFactor(e.src.width,e.src.height,t.width,t.height,r.transformTypes.FILL),o=i.assign({},t);return o.width=e.src.width*a,o.height=e.src.height*a,s(e,o)}(e,a));break;case r.fittingTypes.TILE_HORIZONTAL:case r.fittingTypes.TILE_VERTICAL:case r.fittingTypes.TILE:case r.fittingTypes.LEGACY_ORIGINAL_SIZE:case r.fittingTypes.ORIGINAL_SIZE:l=n.getAlignedRect(e.src,a,a.alignment),e.src.isCropped?(i.assign(e.parts[0],l),e.src.width=l.width,e.src.height=l.height):e.parts.push(o(l));break;case r.fittingTypes.LEGACY_STRIP_TILE_HORIZONTAL:case r.fittingTypes.LEGACY_STRIP_TILE_VERTICAL:case r.fittingTypes.LEGACY_STRIP_TILE:case r.fittingTypes.LEGACY_STRIP_ORIGINAL_SIZE:e.parts.push(function(e){return{transformType:r.transformTypes.LEGACY_CROP,width:Math.round(e.width),height:Math.round(e.height),alignment:n.getAlignment(e),upscale:!1,forceUSM:!1,scaleFactor:1,cssUpscaleNeeded:!1}}(a));break;case r.fittingTypes.LEGACY_STRIP_SCALE_TO_FIT:case r.fittingTypes.LEGACY_STRIP_FIT_AND_TILE:e.parts.push(function(e){return{transformType:r.transformTypes.FIT,width:Math.round(e.width),height:Math.round(e.height),upscale:!1,forceUSM:!0,scaleFactor:1,cssUpscaleNeeded:!1}}(a));break;case r.fittingTypes.LEGACY_STRIP_SCALE_TO_FILL:e.parts.push(function(e){return{transformType:r.transformTypes.LEGACY_FILL,width:Math.round(e.width),height:Math.round(e.height),alignment:n.getAlignment(e),upscale:!1,forceUSM:!0,scaleFactor:1,cssUpscaleNeeded:!1}}(a))}}}},function(e,t,a){var i=a(2),r=a(0),n=a(1);function s(e,t,a){return!isNaN(e)&&"number"==typeof e&&0!==e&&e>=t&&e<=a}e.exports={setTransformOptions:function(e,t){t=t||{},e.quality=function(e,t){var a=i.last(e.parts),r=n.getPreferredImageQuality(a.width,a.height),s=t.quality&&t.quality>=5&&t.quality<=90?t.quality:r;return parseInt(s,10)}(e,t),e.progressive=function(e){return!1!==e.progressive}(t),e.watermark=function(e){return e.watermark}(t),e.unsharpMask=function(e,t){var a=void 0;return function(e){e=e||{};var t=!isNaN(e.radius)&&"number"==typeof e.radius&&e.radius>=.1&&e.radius<=500,a=!isNaN(e.amount)&&"number"==typeof e.amount&&e.amount>=0&&e.amount<=10,i=!isNaN(e.threshold)&&"number"==typeof e.threshold&&e.threshold>=0&&e.threshold<=255;return t&&a&&i}(t.unsharpMask)?a={radius:t.unsharpMask.radius,amount:t.unsharpMask.amount,threshold:t.unsharpMask.threshold}:function(e){return e=e||{},!isNaN(e.radius)&&"number"==typeof e.radius&&0===e.radius&&!isNaN(e.amount)&&"number"==typeof e.amount&&0===e.amount&&!isNaN(e.threshold)&&"number"==typeof e.threshold&&0===e.threshold}(t.unsharpMask)||function(e){var t=i.last(e.parts);return!(t.scaleFactor>=1)||t.forceUSM}(e)&&(a=r.defaultUSM),a&&(a.radius=n.roundToFixed(a.radius,2),a.amount=n.roundToFixed(a.amount,2),a.threshold=n.roundToFixed(a.threshold,2)),a}(e,t),e.filters=function(e){var t=e.filters||{},a={};return s(t[r.imageFilters.CONTRAST],-100,100)&&(a[r.imageFilters.CONTRAST]=t[r.imageFilters.CONTRAST]),s(t[r.imageFilters.BRIGHTNESS],-100,100)&&(a[r.imageFilters.BRIGHTNESS]=t[r.imageFilters.BRIGHTNESS]),s(t[r.imageFilters.SATURATION],-100,100)&&(a[r.imageFilters.SATURATION]=t[r.imageFilters.SATURATION]),s(t[r.imageFilters.HUE],-180,180)&&(a[r.imageFilters.HUE]=t[r.imageFilters.HUE]),s(t[r.imageFilters.BLUR],0,100)&&(a[r.imageFilters.BLUR]=t[r.imageFilters.BLUR]),a}(t)}}},function(e,t,a){var i=a(0),r=a(1),n=a(8),s=a(3);e.exports=function(e,t,a,o,l){var c=i.emptyData.uri;return r.isImageTransformApplicable(t.id)?(l=l||s(e,t,a,o,l),c=n.getImageURI(l)):c=t.id,c}},function(e,t,a){var i,r=a(2),n=a(0),s=r.template("fit/w_${width},h_${height}"),o=r.template("fill/w_${width},h_${height},al_${alignment}"),l=r.template("fill/w_${width},h_${height},fp_${focalPointX}_${focalPointY}"),c=r.template("crop/x_${x},y_${y},w_${width},h_${height}"),u=r.template("crop/w_${width},h_${height},al_${alignment}"),p=r.template("fill/w_${width},h_${height},al_${alignment}"),h=r.template(",lg_${upscaleMethodValue}"),f=r.template(",q_${quality}"),g=r.template(",usm_${radius}_${amount}_${threshold}"),T=r.template(",bl"),A=r.template(",wm_${watermark}"),m=((i={})[n.imageFilters.CONTRAST]=r.template(",con_${contrast}"),i[n.imageFilters.BRIGHTNESS]=r.template(",br_${brightness}"),i[n.imageFilters.SATURATION]=r.template(",sat_${saturation}"),i[n.imageFilters.HUE]=r.template(",hue_${hue}"),i[n.imageFilters.BLUR]=r.template(",blur_${blur}"),i);e.exports={getImageURI:function(e){var t=[];e.parts.forEach((function(e){switch(e.transformType){case n.transformTypes.CROP:t.push(c(e));break;case n.transformTypes.LEGACY_CROP:t.push(u(e));break;case n.transformTypes.LEGACY_FILL:var a=p(e);e.upscale&&(a+=h(e)),t.push(a);break;case n.transformTypes.FIT:var i=s(e);e.upscale&&(i+=h(e)),t.push(i);break;case n.transformTypes.FILL:var r=o(e);e.upscale&&(r+=h(e)),t.push(r);break;case n.transformTypes.FILL_FOCAL:var f=l(e);e.upscale&&(f+=h(e)),t.push(f)}}));var a=t.join("/");return(e.fileType===n.fileType.PNG&&e.isWEBPSupport||e.fileType===n.fileType.JPG)&&(a+=f(e)),e.unsharpMask&&(a+=g(e.unsharpMask)),e.progressive||(a+=T(e)),e.watermark&&(a+=A(e)),e.filters&&(a+=Object.keys(e.filters).map((function(t){return m[t](e.filters)})).join("")),e.src.id+"/"+n.API_VERSION+"/"+a+"/"+e.fileName+"."+(e.isWEBPSupport?"webp":e.fileExtension)}}},,,,,,,function(e,t,a){var i=a(16),r=a(0);i.populateGlobalFeatureSupport();var o=/^media\//i,l="undefined"!=typeof window?window.devicePixelRatio:1;function c(e){return o.test(e)?"https://static.wixstatic.com/"+e:"https://static.wixstatic.com/media/"+e}e.exports={getScaleToFitImageURL:function(e,t,a,n,s,o){return c(i.getData(r.fittingTypes.SCALE_TO_FIT,{id:e,width:t,height:a,name:o&&o.name},{width:n,height:s,htmlTag:i.htmlTag.IMG,alignment:i.alignTypes.CENTER,pixelAspectRatio:l},o).uri)},getScaleToFillImageURL:function(e,t,a,n,s,o){return c(i.getData(r.fittingTypes.SCALE_TO_FILL,{id:e,width:t,height:a,name:o&&o.name,focalPoint:{x:o&&o.focalPoint&&o.focalPoint.x,y:o&&o.focalPoint&&o.focalPoint.y}},{width:n,height:s,htmlTag:i.htmlTag.IMG,alignment:i.alignTypes.CENTER,pixelAspectRatio:l},o).uri)},getCropImageURL:function(e,t,a,n,s,o,u,p,h,f){return c(i.getData(r.fittingTypes.SCALE_TO_FILL,{id:e,width:t,height:a,name:f&&f.name,crop:{x:n,y:s,width:o,height:u}},{width:p,height:h,htmlTag:i.htmlTag.IMG,alignment:i.alignTypes.CENTER,pixelAspectRatio:l},f).uri)}}},function(e,t,a){var i=a(0),r=a(1),n=a(7);e.exports={populateGlobalFeatureSupport:r.populateGlobalFeatureSupport,getData:function(e,t,a,s){var o=i.emptyData.uri;return r.isValidRequest(e,t,a)&&(o=n(e,t,a,s)),{uri:o}},fittingTypes:i.fittingTypes,alignTypes:i.alignTypes,htmlTag:i.htmlTag,upscaleMethods:i.upscaleMethods}}])}(module={exports:{}}),module.exports),imageClientAPI=(x=imageClientSDK)&&x.__esModule&&Object.prototype.hasOwnProperty.call(x,"default")?x.default:x,isAbsoluteUrl=(imageClientSDK.getScaleToFillImageURL,imageClientSDK.getScaleToFitImageURL,imageClientSDK.imageClientSDK,function(url){return url.startsWith("http://")||url.startsWith("https://")}),getAbsoluteUrl=function(url,type){return isAbsoluteUrl(url)?url:("image"===type?(baseUrl="https://static.wixstatic.com/",baseFolder="media/"):(baseUrl="https://video.wixstatic.com/",baseFolder="video/"),baseUrl+(url.startsWith(baseFolder)?url:baseFolder+url));var baseUrl,baseFolder},fullscreenResizeMediaUrl=function(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,faces,allowWatermark,focalPoint){return void 0===faces&&(faces=!1),void 0===allowWatermark&&(allowWatermark=!1),resizeMediaUrl(item,originalUrl,resizeMethod,2*requiredWidth,2*requiredHeight,sharpParams,faces,allowWatermark,focalPoint)},resizeMediaUrl=function(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,faces,allowWatermark,focalPoint){return-1!==originalUrl.indexOf("base64")?originalUrl:(requiredWidth=Math.ceil(requiredWidth),requiredHeight=Math.ceil(requiredHeight),"video"===resizeMethod?getAbsoluteUrl(originalUrl,"video"):requiredWidth>=item.maxWidth&&requiredHeight>=item.maxHeight?getAbsoluteUrl(item.url,"image"):function(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,faces,allowWatermark,focalPoint){originalUrl=originalUrl||"",(sharpParams=sharpParams||{}).quality>0&&(sharpParams.quality=Math.min(90,sharpParams.quality));var focalPointObj={x:50,y:50};focalPoint&&focalPoint[0]>=0&&focalPoint[1]>=0&&(focalPointObj.x=Math.round(100*focalPoint[0]),focalPointObj.y=Math.round(100*focalPoint[1])),!0===sharpParams.allowUsm&&sharpParams.usm?(sharpParams.usm.usm_a=Math.min(5,Math.max(0,sharpParams.usm.usm_a||0)),sharpParams.usm.usm_r=Math.min(128,Math.max(0,sharpParams.usm.usm_r||0)),sharpParams.usm.usm_t=Math.min(1,Math.max(0,sharpParams.usm.usm_t||0))):sharpParams.usm={usm_a:0,usm_r:0,usm_t:0};var resizer=function(){};resizer="fit"===resizeMethod?imageClientAPI.getScaleToFitImageURL:imageClientAPI.getScaleToFillImageURL;var options={};return sharpParams.quality>0&&(options.quality=sharpParams.quality),sharpParams.blur>0&&(options.filters={blur:sharpParams.blur}),focalPointObj&&(options.focalPoint=focalPointObj),sharpParams&&sharpParams.usm&&(options.unsharpMask={radius:parseFloat(sharpParams.usm.usm_r),amount:parseFloat(sharpParams.usm.usm_a),threshold:parseFloat(sharpParams.usm.usm_t)}),isAbsoluteUrl(originalUrl)?originalUrl:resizer(originalUrl.replace("https://static.wixstatic.com/",""),item.maxWidth,item.maxHeight,requiredWidth,requiredHeight,options)}(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,0,0,focalPoint))},fscreen=function(x){return x&&x.__esModule&&Object.prototype.hasOwnProperty.call(x,"default")?x.default:x}(createCommonjsModule((function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var key={fullscreenEnabled:0,fullscreenElement:1,requestFullscreen:2,exitFullscreen:3,fullscreenchange:4,fullscreenerror:5},webkit=["webkitFullscreenEnabled","webkitFullscreenElement","webkitRequestFullscreen","webkitExitFullscreen","webkitfullscreenchange","webkitfullscreenerror"],moz=["mozFullScreenEnabled","mozFullScreenElement","mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozfullscreenerror"],ms=["msFullscreenEnabled","msFullscreenElement","msRequestFullscreen","msExitFullscreen","MSFullscreenChange","MSFullscreenError"],document="undefined"!=typeof window&&void 0!==window.document?window.document:{},vendor="fullscreenEnabled"in document&&Object.keys(key)||webkit[0]in document&&webkit||moz[0]in document&&moz||ms[0]in document&&ms||[];exports.default={requestFullscreen:function(element){return element[vendor[key.requestFullscreen]]()},requestFullscreenFunction:function(element){return element[vendor[key.requestFullscreen]]},get exitFullscreen(){return document[vendor[key.exitFullscreen]].bind(document)},addEventListener:function(type,handler,options){return document.addEventListener(vendor[key[type]],handler,options)},removeEventListener:function(type,handler,options){return document.removeEventListener(vendor[key[type]],handler,options)},get fullscreenEnabled(){return Boolean(document[vendor[key.fullscreenEnabled]])},set fullscreenEnabled(val){},get fullscreenElement(){return document[vendor[key.fullscreenElement]]},set fullscreenElement(val){},get onfullscreenchange(){return document[("on"+vendor[key.fullscreenchange]).toLowerCase()]},set onfullscreenchange(handler){return document[("on"+vendor[key.fullscreenchange]).toLowerCase()]=handler},get onfullscreenerror(){return document[("on"+vendor[key.fullscreenerror]).toLowerCase()]},set onfullscreenerror(handler){return document[("on"+vendor[key.fullscreenerror]).toLowerCase()]=handler}}}))),_extends_1$1=function(fn,module){return function(module){function _extends(){return module.exports=_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}module.exports=_extends}(module={exports:{}}),module.exports}(),ProGallery=__webpack_require__(872).ProGallery,Fullscreen=function(_Component){function Fullscreen(props){var _this;return(_this=_Component.call(this,props)||this).addFullscreenChangeListener=function(){fscreen.fullscreenEnabled&&fscreen.addEventListener("fullscreenchange",_this.onFullscreenChange)},_this.removeFullscreenChangeListener=function(){fscreen.fullscreenEnabled&&fscreen.removeEventListener("fullscreenchange",_this.onFullscreenChange)},_this.onWindowResize=function(){return _this.forceUpdate()},_this.onFullscreenChange=function(){return _this.setState({isInFullscreen:!!fscreen.fullscreenElement})},_this.onEsc=function(event){"Escape"===event.key&&_this.onClose()},_this.toggleFullscreenMode=function(){var isInFullscreen=_this.state.isInFullscreen;fscreen.fullscreenEnabled&&(isInFullscreen?fscreen.exitFullscreen():fscreen.requestFullscreen(document.body))},_this.getStyleParams=function(){var isInFullscreen=_this.state.isInFullscreen,arrowsPosition=0,slideshowInfoSize=0;return _this.props.isMobile?slideshowInfoSize=154:isInFullscreen||(arrowsPosition=1,slideshowInfoSize=142),{arrowsPosition:arrowsPosition,slideshowInfoSize:slideshowInfoSize}},_this.onClose=function(){_this.state.isInFullscreen&&_this.toggleFullscreenMode(),_this.currentIdx=-1,_this.props.onClose()},_this.renderCloseButton=function(){var foregroundColor=_this.props.foregroundColor;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{className:"_2zGgi",style:foregroundColor,onClick:function(){return _this.onClose()},"aria-label":"Close","data-hook":"fullscreen-close-button"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg",_extends({width:60,height:60,viewBox:"0 0 60 60"},void 0),_ref))},_this.renderFullscreenToggleButton=function(){var isInFullscreen=_this.state.isInFullscreen,foregroundColor=_this.props.foregroundColor,icon=isInFullscreen?SvgShrink:SvgExpand,ariaLabel=isInFullscreen?"Shrink":"Expand";return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{className:"_3PuAk",style:foregroundColor,onClick:_this.toggleFullscreenMode,"aria-label":ariaLabel,"data-hook":"fullscreen-toggle-button"},icon())},_this.handleGalleryEvents=function(name,data){if("CURRENT_ITEM_CHANGED"===name){var _this$props=_this.props,images=_this$props.images,index=_this$props.index;-1!==_this.currentIdx?_this.currentIdx>0&&images[_this.currentIdx-1].itemId===data.itemId?_this.currentIdx-=1:_this.currentIdx+=1:_this.currentIdx=index}},_this.state={isInFullscreen:!1},_this.currentIdx=-1,_this}var subClass,superClass;superClass=_Component,(subClass=Fullscreen).prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,subClass.__proto__=superClass;var _proto=Fullscreen.prototype;return _proto.componentDidMount=function(){document.addEventListener("keydown",this.onEsc),window.addEventListener("resize",this.onWindowResize),this.addFullscreenChangeListener()},_proto.componentWillUnmount=function(){document.removeEventListener("keydown",this.onEsc),window.removeEventListener("resize",this.onWindowResize),this.removeFullscreenChangeListener()},_proto.getItems=function(){return function(_ref){var anchorTarget=_ref.anchorTarget,relValue=_ref.relValue;return _ref.items.map((function(item){var metadata=item.metadata;if(item.metaData)return item;var url,convertedData={metaData:{link:{type:"none",target:"_blank"}},directLink:{}};if(metadata){if(convertedData.metaData=_extends_1$1({},metadata,{link:{type:"none",target:"_blank"}}),"video"===item.metadata.type){convertedData.metaData.link={target:"_blank",rel:"noopener",url:Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__["normalizeUrl"])(item.url||"")};var _convertedData$metaDa=convertedData.metaData.poster,pathname=_convertedData$metaDa.pathname,_convertedData$metaDa2=_convertedData$metaDa.thumbnail,thumbPathname=(_convertedData$metaDa2=void 0===_convertedData$metaDa2?{}:_convertedData$metaDa2).pathname;pathname&&thumbPathname&&(convertedData.metaData.poster=function(url){return url.startsWith("http://")||url.startsWith("https://")}(url=thumbPathname)?url:("media/","https://static.wixstatic.com/"+(url.startsWith("media/")?url:"media/"+url)))}convertedData.metaData.alt=metadata.altText,item.metadata.link&&(convertedData.metaData.link={type:"wix",target:item.metadata.link.target||anchorTarget||"_self",data:{type:"ExternalLink",target:item.metadata.link.target||anchorTarget||"_self",rel:item.metadata.link.rel||relValue||"noopener",url:Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__["normalizeUrl"])(item.metadata.link.url||"")}},convertedData.directLink={url:Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__["normalizeUrl"])(item.metadata.link.url||""),target:item.metadata.link.target||anchorTarget||"_self",rel:item.metadata.link.rel||relValue||"noopener"})}return _extends_1$1({},item,{metadata:void 0},convertedData)}))}({items:this.props.images})},_proto.render=function(){var _this$props2=this.props,isOpen=_this$props2.isOpen,target=_this$props2.target,backgroundColor=_this$props2.backgroundColor,topMargin=_this$props2.topMargin,isMobile=_this$props2.isMobile,index=_this$props2.index,isInFullscreen=this.state.isInFullscreen,_this$getStyleParams=this.getStyleParams(),arrowsPosition=_this$getStyleParams.arrowsPosition,slideshowInfoSize=_this$getStyleParams.slideshowInfoSize,width=isInFullscreen||isMobile?window.innerWidth:window.innerWidth-14,height=isInFullscreen?window.screen.height:window.innerHeight,items=this.getItems(),fullscreen=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{style:_extends_1({},backgroundColor,topMargin),dir:"ltr","data-hook":"fullscreen-root",className:isInFullscreen?"_1KpZG":"_3dmg8"},this.renderCloseButton(),!isMobile&&this.renderFullscreenToggleButton(),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ProGallery,{items:items,currentIdx:-1===this.currentIdx?index:this.currentIdx,eventsListener:this.handleGalleryEvents,resizeMediaUrl:fullscreenResizeMediaUrl,container:{width:width,height:height},styles:_extends_1({},layouts[5],{galleryLayout:5,cubeType:"fit",scrollSnap:!0,videoPlay:"auto",allowSocial:!1,loveButton:!1,allowTitle:!0,showArrows:!isMobile,arrowsPosition:arrowsPosition,slideshowInfoSize:slideshowInfoSize})}));return target&&(fullscreen=react_dom__WEBPACK_IMPORTED_MODULE_5___default.a.createPortal(fullscreen,target)),isOpen?fullscreen:null},Fullscreen}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]),ViewerModal=function(_super){function ViewerModal(props){var _this=_super.call(this,props)||this;return props.setExpandModeData(getImagesData_cjs(props.initialState)),_this.state={disabled:!1},_this}return Object(_index_ae73d45f_js__WEBPACK_IMPORTED_MODULE_2__[/* _ */ "b"])(ViewerModal,_super),ViewerModal.prototype.componentDidUpdate=function(prevProps){var initialState=this.props.initialState;prevProps.initialState!==initialState&&this.props.setExpandModeData(getImagesData_cjs(initialState))},ViewerModal.prototype.render=function(){var _a=this.props,index=_a.index,isOpen=_a.isOpen,images=_a.images,onClose=_a.onClose,isMobile=_a.isMobile;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Fullscreen,{isOpen:isOpen,images:images,onClose:onClose,isMobile:isMobile,index:index})},ViewerModal}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (ViewerModal);
//# sourceMappingURL=FullscreenModal-fb919755.js.map


/***/ }),

/***/ 822:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"gallery": "gallery_2nQG",
	"cell": "cell_2kQu",
	"imageWrapper": "imageWrapper_2W18",
	"image": "image_2bkb"
};


/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ProGallery", function() { return /* reexport */ gallery_BaseGallery; });
__webpack_require__.d(__webpack_exports__, "LoveButton", function() { return /* reexport */ loveButton_loveButton; });
__webpack_require__.d(__webpack_exports__, "gallerySettings", function() { return /* reexport */ merged; });
__webpack_require__.d(__webpack_exports__, "defaultStyles", function() { return /* reexport */ defaultStyles; });
__webpack_require__.d(__webpack_exports__, "LeanGallery", function() { return /* reexport */ leanGallery_LeanGallery; });
__webpack_require__.d(__webpack_exports__, "isEligibleForLeanGallery", function() { return /* reexport */ isEligible; });
__webpack_require__.d(__webpack_exports__, "notEligibleReasons", function() { return /* reexport */ isEligible_notEligibleReasons; });
__webpack_require__.d(__webpack_exports__, "ExpandableProGallery", function() { return /* reexport */ expandableGallery_ExpandableProGallery; });
__webpack_require__.d(__webpack_exports__, "cssScrollHelper", function() { return /* reexport */ cssScrollHelper; });
__webpack_require__.d(__webpack_exports__, "addPresetStyles", function() { return /* reexport */ presets_addPresetStyles; });
__webpack_require__.d(__webpack_exports__, "addLayoutStyles", function() { return /* reexport */ addLayoutStyles; });
__webpack_require__.d(__webpack_exports__, "GALLERY_CONSTS", function() { return /* reexport */ constants; });

// NAMESPACE OBJECT: ./node_modules/pro-gallery/dist/es/src/common/utils/lodash.js
var lodash_namespaceObject = {};
__webpack_require__.r(lodash_namespaceObject);
__webpack_require__.d(lodash_namespaceObject, "pick", function() { return pick; });
__webpack_require__.d(lodash_namespaceObject, "throttle", function() { return throttle; });
__webpack_require__.d(lodash_namespaceObject, "debounce", function() { return debounce; });
__webpack_require__.d(lodash_namespaceObject, "get", function() { return lodash_get; });
__webpack_require__.d(lodash_namespaceObject, "isFunction", function() { return isFunction; });
__webpack_require__.d(lodash_namespaceObject, "isEqual", function() { return isEqual; });
__webpack_require__.d(lodash_namespaceObject, "isNumber", function() { return isNumber; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/utils/lodash.js
var lodash_this = undefined;

var pick = function pick(obj, keys) {
  var res = {};
  Object.entries(obj || {}).forEach(function (_ref) {
    var key = _ref[0],
        val = _ref[1];

    if (keys.indexOf(key) >= 0) {
      res[key] = val;
    }
  });
  return res;
};
var throttle = function throttle(callback, limit) {
  var wait = false;
  var callAfterWait = false;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!wait) {
      callAfterWait = false;
      callback.apply(lodash_this, args);
      wait = true;
      setTimeout(function () {
        callAfterWait && callback.apply(lodash_this, args);
        wait = false;
      }, limit);
    } else {
      callAfterWait = true;
    }
  };
};
var debounce = function debounce(callback, wait) {
  var timeout;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(lodash_this, args);
    }, wait);
  };
};
var lodash_get = function get(obj, path, defaultValue) {
  var result = String.prototype.split.call(path, /[,[\].]+?/).filter(Boolean).reduce(function (res, key) {
    return res !== null && res !== undefined ? res[key] : res;
  }, obj);
  return result === undefined || result === obj ? defaultValue : result;
};
var isFunction = function isFunction(something) {
  return typeof something === 'function';
};
var isEqual = function isEqual(obj1, obj2) {
  try {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  } catch (e) {
    return false;
  }
};
var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/window/window.mock.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {
  return {};
};

var window_mock_width = 2560;
var window_mock_height = 1440;
var dims = {
  y: 0,
  x: 0,
  width: window_mock_width,
  height: window_mock_height,
  innerWidth: window_mock_width,
  innerHeight: window_mock_height,
  outerWidth: window_mock_width,
  outerHeight: window_mock_height,
  clientWidth: window_mock_width,
  clientHeight: window_mock_height
};

var elem = _objectSpread(_objectSpread({}, dims), {}, {
  getBoundingClientRect: function getBoundingClientRect() {
    return dims;
  }
});

var documentMock = _objectSpread({
  addEventListener: noop,
  removeEventListener: noop,
  createEvent: noop,
  getElementById: function getElementById() {
    return elem;
  },
  getElementsByClassName: function getElementsByClassName() {
    return [elem];
  },
  getElementsByTagName: function getElementsByTagName() {
    return [elem];
  },
  querySelector: function querySelector() {
    return [elem];
  },
  documentElement: elem,
  activeElement: elem,
  style: dims
}, dims);

documentMock.body = documentMock;
var locationMock = {
  href: 'http://mock.wix.com/',
  protocol: 'http:',
  host: 'mock.wix.com',
  hostname: 'mock.wix.com',
  port: '',
  pathname: '/',
  search: '',
  hash: ''
};

var windowMock = _objectSpread({
  isMock: true,
  isSSR: true,
  orientation: 0,
  devicePixelRatio: 1,
  scrollTop: 0,
  addEventListener: noop,
  removeEventListener: noop,
  createEvent: noop,
  CustomEvent: noop,
  screen: dims,
  open: noop,
  petri: {},
  search: {},
  location: locationMock,
  postMessage: noop,
  requestAnimationFrame: noop,
  dispatchEvent: noop,
  document: documentMock,
  getComputedStyle: noop,
  localStorage: {},
  frames: []
}, dims);

windowMock.parent = windowMock;
/* harmony default export */ var window_mock = (windowMock);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/window/windowWrapper.js


var windowWrapper_WindowWrapper = /*#__PURE__*/function () {
  function WindowWrapper() {
    this.reset();
  }

  var _proto = WindowWrapper.prototype;

  _proto.windowIsAvailable = function windowIsAvailable() {
    try {
      return typeof window !== 'undefined';
    } catch (e) {
      return false;
    }
  };

  _proto.reset = function reset() {
    this.isMock = !this.windowIsAvailable();
    this.window = this.isMock ? window_mock : window;

    if (this.isMock) {
      this.window.mockInstanceId = Math.floor(Math.random() * 100000);
    }
  };

  return WindowWrapper;
}();

var windowWrapper = new windowWrapper_WindowWrapper();
var _window = windowWrapper.window;
/* harmony default export */ var window_windowWrapper = (_window);

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/viewMode.js
var VIEW_MODE = {
  SITE: 'SITE',
  EDIT: 'EDIT',
  PREVIEW: 'PREVIEW',
  SEO: 'SEO'
};
/* harmony default export */ var viewMode = (VIEW_MODE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/formFactor.js
var FORM_FACTOR = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  TABLET: 'tablet'
};
/* harmony default export */ var formFactor = (FORM_FACTOR);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/window/viewModeWrapper.js



var viewModeWrapper_ViewModeWrapper = /*#__PURE__*/function () {
  function ViewModeWrapper() {
    this.setViewMode = this.setViewMode.bind(this);
    this.isSiteMode = this.isSiteMode.bind(this);
    this.isEditMode = this.isEditMode.bind(this);
    this.isPreviewMode = this.isPreviewMode.bind(this);
    this.isSEOMode = this.isSEOMode.bind(this);
    this.setFormFactor = this.setFormFactor.bind(this);
    this.isFormFactorDesktop = this.isFormFactorDesktop.bind(this);
    this.isFormFactorMobile = this.isFormFactorMobile.bind(this);
    this.isFormFactorTablet = this.isFormFactorTablet.bind(this);
    this.isFormFactorTouch = this.isFormFactorTouch.bind(this);
    this._viewMode = viewMode.SITE;
    this._formFactor = formFactor.DESKTOP;
  }

  var _proto = ViewModeWrapper.prototype;

  _proto.setViewMode = function setViewMode(viewMode) {
    this._viewMode = viewMode;
  };

  _proto.setFormFactor = function setFormFactor(forceVal) {
    this._formFactor = forceVal;
  };

  _proto.isFormFactorMobile = function isFormFactorMobile() {
    return this._formFactor === formFactor.MOBILE;
  };

  _proto.isFormFactorTablet = function isFormFactorTablet() {
    return this._formFactor === formFactor.TABLET;
  };

  _proto.isFormFactorDesktop = function isFormFactorDesktop() {
    return this._formFactor === formFactor.DESKTOP;
  };

  _proto.isFormFactorTouch = function isFormFactorTouch() {
    return this.isMobile() || this.isTablet();
  };

  _proto.isSiteMode = function isSiteMode() {
    return this._viewMode === viewMode.SITE;
  };

  _proto.isEditMode = function isEditMode() {
    return this._viewMode === viewMode.EDIT;
  };

  _proto.isPreviewMode = function isPreviewMode() {
    return this._viewMode === viewMode.PREVIEW;
  };

  _proto.isSEOMode = function isSEOMode() {
    return this._viewMode === viewMode.SEO;
  };

  return ViewModeWrapper;
}();

var viewModeWrapper = new viewModeWrapper_ViewModeWrapper();
var viewModeWrapper_isSiteMode = viewModeWrapper.isSiteMode;
var viewModeWrapper_isEditMode = viewModeWrapper.isEditMode;
var viewModeWrapper_isPreviewMode = viewModeWrapper.isPreviewMode;
var viewModeWrapper_isSEOMode = viewModeWrapper.isSEOMode;
var viewModeWrapper_isFormFactorMobile = viewModeWrapper.isFormFactorMobile;
var viewModeWrapper_isFormFactorTablet = viewModeWrapper.isFormFactorTablet;
var viewModeWrapper_isFormFactorDesktop = viewModeWrapper.isFormFactorDesktop;
var isFormFactorTouch = viewModeWrapper.isFormFactorTouch;

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/utils/index.js
function utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { utils_ownKeys(Object(source), true).forEach(function (key) { utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var utils_Utils = /*#__PURE__*/function () {
  function Utils() {
    this._cache = {};
    this._hash2int = {};
    this._params = {};
    Object.assign(this, lodash_namespaceObject);
  }

  var _proto = Utils.prototype;

  _proto.shouldUseCache = function shouldUseCache() {
    return !viewModeWrapper_isEditMode() && !viewModeWrapper_isPreviewMode();
  };

  _proto.isUndefined = function isUndefined(something) {
    return typeof something === 'undefined';
  };

  _proto.dumpCache = function dumpCache() {
    this._cache = {};
  };

  _proto.getOrPutFromCache = function getOrPutFromCache(fld, func) {
    //ignore cache in SSR (in ssr the module is kept alive between different renders) and in Editor and preview
    if (!this.shouldUseCache() || this.isSSR()) {
      return func();
    }

    if (this._cache[fld] !== undefined) {
      return this._cache[fld];
    }

    this._cache[fld] = func();
    return this._cache[fld];
  };

  _proto.hashToInt = function hashToInt(str, min, max) {
    var _int = 0;

    if (this.isUndefined(str) || str.length === 0) {
      return _int;
    }

    if (!this._hash2int[str]) {
      for (var i = 0; i < str.length; i++) {
        _int += str.charCodeAt(i);
      }

      this._hash2int[str] = _int;
    }

    if (this.isUndefined(min) || this.isUndefined(max)) {
      return this._hash2int[str];
    } else {
      return this._hash2int[str] % (max - min + 1) + min;
    }
  };

  _proto.parseGetParam = function parseGetParam(val, url) {
    try {
      if (!this.isUndefined(this._params[val])) {
        return this._params[val];
      }

      var result = '',
          tmp = [];
      var _location = location;

      if (url) {
        _location = {
          search: '?' + (url.split('?')[1] || ''),
          pathname: (url.split('?')[0] || '').split('/')[1] || ''
        };
      }

      _location.search //.replace ( "?", "" )
      // this is better, there might be a question mark inside
      .substr(1).split('&').forEach(function (item) {
        tmp = item.split('=');

        if (tmp[0] === val) {
          result = decodeURIComponent(tmp[1]);
        }
      });

      if (!result) {
        //if the param was not found in the search, try decoding the path
        var query = decodeURIComponent(_location.pathname).split('?')[1];

        if (!query) {
          return '';
        }

        query.split('&').forEach(function (item) {
          tmp = item.split('=');

          if (tmp[0] === val) {
            result = decodeURIComponent(tmp[1]);
          }
        });
      }

      this._params[val] = result;
      return result;
    } catch (e) {
      return false;
    }
  };

  _proto.stripSlashes = function stripSlashes(str) {
    var newStr = '';

    if (typeof str === 'string') {
      newStr = str.replace(/\\\//g, '/').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\0/g, '\0').replace(/\\\\/g, '\\');
    }

    return newStr;
  };

  _proto.parseStringObject = function parseStringObject(sObj) {
    if (typeof sObj !== 'string') {
      return sObj;
    }

    var stripedObj = this.stripSlashes(sObj);

    if (typeof sObj === 'string' && /^[\],:{}\s]*$/.test(stripedObj.replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      //this is a json
      try {
        return JSON.parse(stripedObj);
      } catch (e) {// console.error('Parse object error: Catched ', e);
      }
    }

    return stripedObj;
  };

  _proto.hashCode = function hashCode(str) {
    var hash = 0,
        i,
        chr;
    if (str.length === 0) return hash;

    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  };

  _proto.isMobileByProps = function isMobileByProps() {
    var _this = this;

    var _isMobileByProps = function _isMobileByProps() {
      var deviceType = _this.parseGetParam('deviceType') || window_windowWrapper.deviceType;
      var isMobileViewer = _this.parseGetParam('showMobileView') === 'true';
      var formFactorMobile = viewModeWrapper_isFormFactorMobile();

      if (isMobileViewer) {
        return true;
      } else if (deviceType) {
        return String(deviceType).toLowerCase().indexOf('mobile') >= 0;
      } else if (formFactorMobile) {
        return formFactorMobile;
      } else {
        return undefined;
      }
    };

    return this.getOrPutFromCache('isMobileByProps', _isMobileByProps);
  };

  _proto.isUserAgentMobile = function isUserAgentMobile() {
    try {
      var _isUserAgentMobile = function _isUserAgentMobile() {
        var check = false;

        (function (a) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|pixel|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) {
            check = true;
          }
        })(navigator.userAgent || navigator.vendor || window_windowWrapper.opera);

        return check;
      };

      return this.getOrPutFromCache('isUserAgentMobile', _isUserAgentMobile);
    } catch (e) {
      return false;
    }
  };

  _proto.isMobile = function isMobile() {
    var _this2 = this;

    var _isMobile = function _isMobile() {
      var isMobileByProps = _this2.isMobileByProps();

      var isUserAgentMobile = _this2.isUserAgentMobile();

      return _this2.isUndefined(isMobileByProps) ? isUserAgentMobile : isMobileByProps;
    };

    return this.getOrPutFromCache('isMobile', _isMobile);
  };

  _proto.isTest = function isTest() {
    try {
      return window_windowWrapper.isTest;
    } catch (e) {
      return false;
    }
  };

  _proto.isLocal = function isLocal() {
    try {
      var host = window_windowWrapper.location.hostname;

      if (host === 'local.wix.com') {
        return true;
      }

      if (host.indexOf('localhost') >= 0) {
        return true;
      }

      if (this.parseGetParam('debug') === 'true') {
        return true;
      }

      return false;
    } catch (E) {
      return false;
    }
  };

  _proto.isDev = function isDev() {
    var _this3 = this;

    return this.getOrPutFromCache('isDev', function () {
      return _this3.shouldDebug('ph_local') || _this3.isOOI() && "production" === 'development' || (_this3.safeLocalStorage() || {}).forceDevMode === 'true';
    });
  };

  _proto.isPlayground = function isPlayground() {
    var _this4 = this;

    return this.getOrPutFromCache('isPlayground', function () {
      try {
        return _this4.isLocal() || window_windowWrapper.location.origin.indexOf('pro-gallery.surge.sh') > -1;
      } catch (e) {
        return false;
      }
    });
  };

  _proto.isVerbose = function isVerbose() {
    return !this.isTest() && (this.safeLocalStorage() || {}).forceDevMode === 'true';
  };

  _proto.isStoreGallery = function isStoreGallery() {
    var _this5 = this;

    return this.getOrPutFromCache('isStoreGallery', function () {
      try {
        return window_windowWrapper.location.search.toLowerCase().indexOf('isstore') > -1;
      } catch (e) {
        if (_this5.isDev()) {
          console.error('cant find window', e);
        }

        return false;
      }
    });
  };

  _proto.isSSR = function isSSR() {
    return !!window_windowWrapper.isMock;
  };

  _proto.isOOI = function isOOI() {
    return this.isSSR() || typeof top !== 'undefined' && typeof self !== 'undefined' && (top === self || self.location.origin.includes('editor.wix.com'));
  };

  _proto.generateUUID = function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.floor(Math.random() * 16) || 0;
      return c === 'x' ? r.toString(16) : c;
    });
  };

  _proto.isExternalUrl = function isExternalUrl(url) {
    return /(^https?)|(^data)|(^blob)/.test(url);
  };

  _proto.isiOS = function isiOS() {
    return this.getOrPutFromCache('isiOS', function () {
      try {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window_windowWrapper.MSStream;
      } catch (e) {
        return false;
      }
    });
  };

  _proto.isiPhone = function isiPhone() {
    return this.getOrPutFromCache('isiPhone', function () {
      try {
        return /iPhone/.test(navigator.userAgent) && !window_windowWrapper.MSStream;
      } catch (e) {
        return false;
      }
    });
  };

  _proto.isLandscape = function isLandscape() {
    var _this6 = this;

    return this.getOrPutFromCache('isLandscape', function () {
      if (!_this6.isMobile()) {
        return false;
      }

      try {
        if (!_this6.isUndefined(window_windowWrapper.orientation)) {
          return window_windowWrapper.orientation === 90 || window_windowWrapper.orientation === -90;
        } else {
          var mql = window_windowWrapper.matchMedia('(orientation: landscape)');

          if (mql && mql.matches === true) {
            return true;
          } else {
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    });
  };

  _proto.safeLocalStorage = function safeLocalStorage() {
    try {
      return localStorage ? localStorage : window_windowWrapper; //TrackJS errors, function returning null
    } catch (e) {
      return window_windowWrapper;
    }
  };

  _proto.shouldDebug = function shouldDebug(str) {
    try {
      return !!this.safeLocalStorage()[str] || (window_windowWrapper.debugApp || '').indexOf(str) >= 0 || (this.parseGetParam('debugApp') || '').indexOf(str) >= 0;
    } catch (e) {
      return false;
    }
  };

  _proto.deviceHasMemoryIssues = function deviceHasMemoryIssues() {
    return this.isiOS();
  };

  _proto.getTabIndex = function getTabIndex(elementName) {
    var elementsArr = ['currentGalleryItem', 'loadMoreButton', 'slideshowNext', 'slideshowPrev', 'currentThumbnail', 'slideshowLove', 'slideshowShare', 'cartIcon', 'cartClose', 'cartFrame', 'fullscreenClose', 'fullscreenNext', 'fullscreenPrev', 'fullscreenInfo', // 'fullscreenTitle',
    // 'fullscreenDesc',
    'fullscreenLink', 'fullscreenProvider', 'fullscreenCartButton', 'fullscreenCheckout', 'fullscreenExpand', 'fullscreenVideoPlay', 'fullscreenVideoBar', 'fullscreenVideoMute', 'fullscreenVideoVolume', 'fullscreenCartIcon', 'fullscreenDownload', 'fullscreenLove', 'fullscreenShare'];
    var elementIdx = elementsArr.indexOf(elementName) + 1;

    if (elementIdx >= 0 && this.isOOI()) {
      return 0;
    }

    return elementIdx || -1; //no tabIndex (tab will not focus on this item)
  };

  _proto.setStateAndLog = function setStateAndLog(that, caller, state, callback) {
    var _this7 = this;

    if (this.isVerbose()) {
      console.log("State Change Called (" + caller + ")", state);

      var oldState = utils_objectSpread({}, that.state);

      that.setState(state, function () {
        var newState = utils_objectSpread({}, that.state);

        var change = _this7.printableObjectsDiff(oldState, newState, 'state');

        if (Object.keys(change).length > 0) {
          console.log("State Change Completed (" + caller + ")", change);
        }

        if (_this7.isFunction(callback)) {
          callback.bind(that)();
        }
      });
    } else {
      that.setState(state, function () {
        if (_this7.isFunction(callback)) {
          callback.bind(that)();
        }
      });
    }
  };

  _proto.printableObjectsDiff = function printableObjectsDiff(obj1, obj2, prefix) {
    var _this8 = this;

    if (prefix === void 0) {
      prefix = '';
    }

    var _toString = function _toString(v) {
      if (v === '') {
        v = "''";
      } else if (_this8.isUndefined(v)) {
        v = 'undefined';
      }

      return String(v);
    };

    var getInnerDiff = function getInnerDiff(_obj1, _obj2, _prefix, depth) {
      if (depth === void 0) {
        depth = 1;
      }

      if (depth > 3) {
        return {};
      }

      var innerDiff = Object.entries(_obj1).reduce(function (res, _ref) {
        var k = _ref[0],
            v = _ref[1];

        if (!_this8.isEqual(v, _obj2[k])) {
          if (Array.isArray(_obj2[k])) {
            if (v.length !== _obj2[k].length) {
              res[k + '.length'] = '[' + v.length + '] => [' + _obj2[k].length + ']';
            }

            res = Object.assign(res, getInnerDiff(v, _obj2[k], (_prefix ? _prefix + '.' : '') + k, depth + 1));
          } else if (typeof _obj2[k] === 'object') {
            res = Object.assign(res, getInnerDiff(v, _obj2[k], (_prefix ? _prefix + '.' : '') + k, depth + 1));
          } else {
            res[(_prefix ? _prefix + '.' : '') + k] = _toString(v) + ' => ' + _toString(_obj2[k]);
          }
        }

        return res;
      }, {});
      return innerDiff;
    };

    return getInnerDiff(obj1, obj2, prefix, 1);
  };

  _proto.getScreenWidth = function getScreenWidth() {
    if (viewModeWrapper_isPreviewMode() && this.isMobile()) {
      // In editor preview-mode, the screen is still a desktop, but the viewport in which the preview mode renders us is only 320, so 'window.screen.width' returns a wrong value.
      return 320;
    }

    if (this.isTest()) {
      return 1920;
    }

    try {
      if (this.isLandscape()) {
        return Math.max(window_windowWrapper.screen.width, window_windowWrapper.screen.height);
      } else {
        return window_windowWrapper.screen.width;
      }
    } catch (e) {
      return 1920;
    }
  };

  _proto.getScreenHeight = function getScreenHeight() {
    if (this.isTest()) {
      return 1200;
    }

    try {
      if (this.isLandscape()) {
        return Math.min(window_windowWrapper.screen.width, window_windowWrapper.screen.height);
      } else {
        return window_windowWrapper.screen.height;
      }
    } catch (e) {
      return 1200;
    }
  };

  _proto.fixViewport = function fixViewport() {
    if (this.isOOI()) {
      return;
    }

    try {
      this._cache.isLandscape = undefined;

      if ((viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode()) && this.isMobile() && !this.isMobileViewer()) {
        //using isUserAgentMobile creates a bug in mobile view when configured to show desktop on mobile (so isWixMobile is false)
        var viewportAspectRatio = this.getViewportScaleRatio();
        window_windowWrapper.document.body.style.transform = 'scale(' + viewportAspectRatio + ')';
        window_windowWrapper.document.body.style.transformOrigin = '0 0';
        window_windowWrapper.document.body.style.width = 100 / viewportAspectRatio + '%';
        window_windowWrapper.document.body.style.height = 100 / viewportAspectRatio + '%';
      }
    } catch (e) {
      return false;
    }
  };

  _proto.getDevicePixelRatio = function getDevicePixelRatio() {
    try {
      return window_windowWrapper.devicePixelRatio || window_windowWrapper.screen.deviceXDPI / window_windowWrapper.screen.logicalXDPI; // Support for IE10
    } catch (e) {
      return 1;
    }
  };

  _proto.getWindowWidth = function getWindowWidth() {
    try {
      return window_windowWrapper.innerWidth || 980;
    } catch (e) {
      return 980;
    }
  };

  _proto.getViewportScaleRatio = function getViewportScaleRatio() {
    //320 is a hack for wix - they have fixed viewport of 320 pixels regardlessof phone type
    var isGallery = typeof window_windowWrapper !== 'undefined' && window_windowWrapper.isGallery;
    var shouldIgnoreRatio = this.isiOS() && isGallery; // PHOT 917, this is a hack to get galleries back to their normal placement on iOS, w/o this galleries on iOS are smaller by the ratio returned here.

    if (!this.isOOI() && this.isMobile() && !this.isMobileViewer() && (viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode()) && !shouldIgnoreRatio) {
      return 320 / this.getScreenWidth();
    } else {
      return 1;
    }
  };

  _proto.getMobileEnabledClick = function getMobileEnabledClick(action) {
    //todo: bring back this line before pushing to master
    return this.isMobile() ? {
      onTouchEnd: action
    } : {
      onClick: action
    }; // return {onClick: action};
  };

  _proto.getTopUrlParam = function getTopUrlParam(name) {
    if (this.isUndefined(this._cache.params)) {
      this._cache.params = {};
    }

    if (this.isUndefined(this._cache.params[name])) {
      try {
        this._cache.params[name] = top.location.search.replace('?', '').split('&').map(function (ele) {
          var arr = ele.split('=');
          return arr[0] === name ? arr[1] || '' : '';
        }).join('');
      } catch (e) {
        this._cache.params[name] = false; // console.log('caught cross origin error');
        //comment to avoid 'block is empty' from linter
      }
    }

    return this._cache.params[name];
  };

  _proto.scrollTo = function scrollTo(element, to, duration, isHorizontal, callback) {
    if (this.isMobile()) {
      duration = 0; //do not animate scroll on mobile (looks jumpy and buggy)
    }

    var easeInOutQuad = function easeInOutQuad(currentTime, start, change, _duration) {
      //t = current time
      //b = start value
      //c = change in value
      //d = _duration
      if (_duration === 0) {
        return change + start;
      }

      currentTime /= _duration / 2;

      if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
      }

      currentTime--;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    };

    var start = isHorizontal ? element.scrollLeft : element.scrollTop;
    var change = to - start;
    var currentTime = 0;
    var increment = 20;

    var animateScroll = function animateScroll() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else {
        element.setAttribute('data-scrolling', '');

        if (typeof callback === 'function') {
          callback();
        }
      }

      if (isHorizontal) {
        element.scrollLeft = val;
      } else {
        element.scrollTop = val;
      }
    };

    element.setAttribute('data-scrolling', 'true');
    animateScroll();
  } // isVerbose() {
  //   return window.isMock || (!this.isTest() && ((this.safeLocalStorage() || {}).forceDevMode === 'true'));
  // }
  ;

  _proto.getTitleOrFilename = function getTitleOrFilename(title, filename) {
    var shouldShowTitle = typeof title === typeof '';
    return shouldShowTitle ? title : filename;
  };

  _proto.isSmallScreen = function isSmallScreen() {
    try {
      return (window_windowWrapper.innerWidth || window_windowWrapper.outerWidth) < 640 || this.isMobile();
    } catch (e) {
      return false;
    }
  };

  _proto.isTouch = function isTouch() {
    var _this9 = this;

    return this.getOrPutFromCache('isTouch', function () {
      try {
        return _this9.isMobile() || 'ontouchstart' in window_windowWrapper.document.documentElement;
      } catch (e) {
        return false;
      }
    });
  };

  _proto.browserIs = function browserIs(browserName) {
    var _browsers = this.getOrPutFromCache('browsers', function () {
      var browsers = {
        chrome: false,
        chromeIos: false,
        explorer: false,
        firefox: false,
        safari: false,
        opera: false
      };

      try {
        browsers.chrome = navigator.userAgent.indexOf('Chrome') > -1;
        browsers.chromeIos = navigator.userAgent.indexOf('CriOS') > -1;
        browsers.explorer = navigator.userAgent.indexOf('MSIE') > -1 || !!navigator.userAgent.match(/Trident.*rv:11\./); // support for edge

        browsers.firefox = navigator.userAgent.indexOf('Firefox') > -1;
        browsers.safari = navigator.userAgent.indexOf('Safari') > -1;
        browsers.opera = navigator.userAgent.toLowerCase().indexOf('op') > -1;

        if (browsers.chrome && browsers.safari) {
          browsers.safari = false;
        }

        if (browsers.chrome && browsers.opera) {
          browsers.chrome = false;
        }

        return browsers;
      } catch (e) {
        return browsers;
      }
    });

    return _browsers[browserName];
  };

  _proto.colorStringToObject = function colorStringToObject(colorString) {
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    try {
      var returnValue = null;

      if (typeof colorString === 'string') {
        if (colorString.trim().indexOf('rgb') === 0) {
          // rgb(1,2,3) | rgba(4,5,6,0.7)
          var values = colorString.match(/\d+/g);

          if (values && Array.isArray(values) && values.length >= 3) {
            returnValue = {
              r: values[0],
              g: values[1],
              b: values[2]
            };
          }
        } else {
          // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          colorString = colorString.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
          });
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorString);
          returnValue = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        }
      }

      return returnValue;
    } catch (error) {
      console.error('Error converting color string to object', error);
    }
  };

  _proto.hasNativeLazyLoadSupport = function hasNativeLazyLoadSupport() {
    try {
      return 'loading' in HTMLImageElement.prototype;
    } catch (error) {
      return false;
    }
  };

  return Utils;
}();

/* harmony default export */ var utils = (new utils_Utils());
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/context/GalleryContext.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


var GalleryContext;

try {
  GalleryContext = react_default.a.createContext({});
} catch (e) {
  GalleryContext = null;
}

var GALLERY_CONTEXT_FIELDS = ['isUnknownWidth'];
var extractContextFields = function extractContextFields(fields) {
  return GALLERY_CONTEXT_FIELDS.reduce(function (obj, field) {
    obj[field] = fields[field];
    return obj;
  }, {});
};
var GalleryContext_GalleryProvider = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(GalleryProvider, _React$Component);

  function GalleryProvider(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = extractContextFields(props);
    return _this;
  }

  var _proto = GalleryProvider.prototype;

  _proto.render = function render() {
    if (GalleryContext) {
      // const value = { ...this.value, ...this.state };
      return /*#__PURE__*/react_default.a.createElement(GalleryContext.Provider, {
        value: this.state
      }, this.props.children);
    } else {
      return this.props.children;
    }
  };

  return GalleryProvider;
}(react_default.a.Component);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/galleryComponent.js
function galleryComponent_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function galleryComponent_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { galleryComponent_ownKeys(Object(source), true).forEach(function (key) { galleryComponent_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { galleryComponent_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryComponent_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function galleryComponent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var galleryComponent_GalleryComponent = /*#__PURE__*/function (_React$Component) {
  galleryComponent_inheritsLoose(GalleryComponent, _React$Component);

  function GalleryComponent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    if (typeof _this.context !== 'object') {
      _this.context = {};
    }

    if (props && typeof props.context === 'object') {
      _this.context = galleryComponent_objectSpread(galleryComponent_objectSpread({}, _this.context), props.context);
    }

    return _this;
  }

  return GalleryComponent;
}(react_default.a.Component);

galleryComponent_defineProperty(galleryComponent_GalleryComponent, "contextType", GalleryContext);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryDebugMessage.js
function galleryDebugMessage_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






var galleryDebugMessage_GalleryDebugMessage = /*#__PURE__*/function (_GalleryComponent) {
  galleryDebugMessage_inheritsLoose(GalleryDebugMessage, _GalleryComponent);

  function GalleryDebugMessage() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = GalleryDebugMessage.prototype;

  _proto.render = function render() {
    if (utils.getTopUrlParam('pgdebug') !== 'true') {
      return false;
    }

    var version = /*#__PURE__*/react_default.a.createElement("div", {
      className: "version-header "
    }, "Pro Gallery Version #", window_windowWrapper.staticsVersion);
    var parentSize = '';

    try {
      parentSize = ' psw' + window_windowWrapper.top.screen.width + ' piw' + window_windowWrapper.top.innerWidth + ' pbw' + window_windowWrapper.top.document.body.clientWidth;
    } catch (e) {//not on the domain
    }

    var debugMsg = /*#__PURE__*/react_default.a.createElement("div", {
      className: "version-header "
    }, utils.isLandscape() ? 'land' : 'port', " sw", window_windowWrapper.screen.width, "sh", window_windowWrapper.screen.height, " iw", window_windowWrapper.innerWidth, " bw", window_windowWrapper.document.body.clientWidth, " sr", '1', "rc", this.props.resizeCount, " oc", this.props.orientationCount, " nh", this.props.newHeight, " lh", this.props.lastHeight, parentSize, "www", this.props.maxGalleryWidth);
    return /*#__PURE__*/react_default.a.createElement("div", null, version, debugMsg);
  };

  return GalleryDebugMessage;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var galleryDebugMessage = (galleryDebugMessage_GalleryDebugMessage);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/loadingMode.js
var LOADING_MODE = {
  BLUR: 'BLUR',
  COLOR: 'COLOR',
  MAIN_COLOR: 'MAIN_COLOR'
};
/* harmony default export */ var loadingMode = (LOADING_MODE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/lazyLoad.js
var LAZY_LOAD = {
  NATIVE: 'NATIVE',
  CSS: 'CSS'
};
/* harmony default export */ var constants_lazyLoad = (LAZY_LOAD);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/urlTypes.js
var URL_SIZES = {
  RESIZED: 'resized',
  PIXEL: 'pixel',
  THUMBNAIL: 'thumbnail',
  SQUARE: 'square',
  FULL: 'full',
  SAMPLE: 'sample',
  PRELOAD: 'preload',
  DOWNLOAD: 'download',
  DOWNLOAD_SAMPLE: 'download_sample'
};
var URL_TYPES = {
  HIGH_RES: 'img',
  LOW_RES: 'thumb',
  SEO: 'seoLink',
  VIDEO: 'video'
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/imageItem.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function imageItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function imageItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { imageItem_ownKeys(Object(source), true).forEach(function (key) { imageItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { imageItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function imageItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function imageItem_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var imageItem_ImageItem = /*#__PURE__*/function (_GalleryComponent) {
  imageItem_inheritsLoose(ImageItem, _GalleryComponent);

  function ImageItem() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = ImageItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    try {
      if (typeof this.props.actions.setItemLoaded === 'function') {
        this.props.actions.setItemLoaded();
      }
    } catch (e) {
      console.error(e);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        alt = _this$props.alt,
        displayed = _this$props.displayed,
        imageDimensions = _this$props.imageDimensions,
        createUrl = _this$props.createUrl,
        id = _this$props.id,
        actions = _this$props.actions,
        settings = _this$props.settings,
        lazyLoad = _this$props.lazyLoad,
        styleParams = _this$props.styleParams;
    var imageProps = settings && settings.imageProps && typeof settings.imageProps === 'function' ? settings.imageProps(id) : {};
    var backgroundStyle = {}; //remove this inline style if rendered padding (using css) is used

    var _ref = imageDimensions || {},
        marginLeft = _ref.marginLeft,
        marginTop = _ref.marginTop,
        restOfDimensions = _objectWithoutPropertiesLoose(_ref, ["marginLeft", "marginTop"]);

    var useImageTag = lazyLoad === constants_lazyLoad.NATIVE || viewModeWrapper_isSEOMode();
    var imageItemClassName = ['gallery-item-content', 'image-item', 'gallery-item-visible', 'gallery-item', 'gallery-item-preloaded', styleParams.cubeImages && styleParams.cubeType === 'fit' ? 'grid-fit' : '', styleParams.imageLoadingMode === loadingMode.COLOR ? 'load-with-color' : ''].join(' ');

    var imageContainer = function imageContainer(image) {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: imageItemClassName,
        onTouchStart: actions.handleItemMouseDown,
        onTouchEnd: actions.handleItemMouseUp,
        key: 'image_container-' + id,
        "data-hook": 'image-item',
        style: displayed ? imageDimensions.borderRadius ? {
          borderRadius: imageDimensions.borderRadius
        } : {} : imageItem_objectSpread(imageItem_objectSpread({}, backgroundStyle), restOfDimensions)
      }, image);
    };

    var image = /*#__PURE__*/react_default.a.createElement("img", _extends({
      key: (styleParams.cubeImages && styleParams.cubeType === 'fill' ? 'cubed-' : '') + 'image',
      className: 'gallery-item-visible gallery-item gallery-item-hidden gallery-item-preloaded',
      "data-hook": "gallery-item-image-img",
      alt: alt ? alt : 'untitled image',
      src: createUrl(URL_SIZES.RESIZED, viewModeWrapper_isSEOMode() ? URL_TYPES.SEO : URL_TYPES.HIGH_RES),
      loading: "lazy",
      style: restOfDimensions
    }, imageProps));
    var canvas = /*#__PURE__*/react_default.a.createElement("canvas", _extends({
      key: (styleParams.cubeImages && styleParams.cubeType === 'fill' ? 'cubed-' : '') + 'image',
      className: 'gallery-item-visible gallery-item gallery-item-hidden gallery-item-preloaded',
      "data-hook": "gallery-item-image-canvas",
      role: "img",
      alt: alt ? alt : 'untitled image',
      "data-src": createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES),
      style: restOfDimensions
    }, imageProps));
    var renderedItem = useImageTag ? imageContainer(image) : imageContainer(canvas);
    return renderedItem;
  };

  return ImageItem;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/events.js
var EVENTS = {
  APP_LOADED: 'APP_LOADED',
  ITEM_CREATED: 'ITEM_CREATED',
  ITEM_LOADED: 'ITEM_LOADED',
  GALLERY_CHANGE: 'GALLERY_CHANGE',
  ITEM_ACTION_TRIGGERED: 'ITEM_ACTION_TRIGGERED',
  CURRENT_ITEM_CHANGED: 'CURRENT_ITEM_CHANGED',
  NEED_MORE_ITEMS: 'NEED_MORE_ITEMS',
  VIDEO_ENDED: 'VIDEO_ENDED',
  HOVER_SET: 'HOVER_SET',
  LOAD_MORE_CLICKED: 'LOAD_MORE_CLICKED',
  SHARE_BUTTON_CLICKED: 'SHARE_BUTTON_CLICKED',
  TEXT_DOWNLOAD_BUTTON_CLICKED: 'TEXT_DOWNLOAD_BUTTON_CLICKED',
  LOVE_BUTTON_CLICKED: 'LOVE_BUTTON_CLICKED',
  ITEM_CLICKED: 'ITEM_CLICKED',
  DOWNLOAD_BUTTON_CLICKED: 'DOWNLOAD_BUTTON_CLICKED',
  BUY_NOW_CLICKED: 'BUY_NOW_CLICKED',
  THUMBNAIL_CLICKED: 'THUMBNAIL_CLICKED'
};
/* harmony default export */ var events = (EVENTS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/play_background.js
function play_background_extends() { play_background_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return play_background_extends.apply(this, arguments); }

function play_background_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var play_background_play_background = function play_background(_ref) {
  var size = _ref.size,
      props = play_background_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", play_background_extends({
    viewBox: "0 0 60 60",
    fill: "currentColor",
    width: size || "60",
    height: size || "60"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M30,0c16.6,0,30,13.4,30,30S46.6,60,30,60C13.4,60,0,46.6,0,30S13.4,0,30,0z",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
};

play_background_play_background.displayName = 'play_background';
/* harmony default export */ var components_play_background = (play_background_play_background);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/play_triangle.js
function play_triangle_extends() { play_triangle_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return play_triangle_extends.apply(this, arguments); }

function play_triangle_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var play_triangle_play_triangle = function play_triangle(_ref) {
  var size = _ref.size,
      props = play_triangle_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", play_triangle_extends({
    viewBox: "0 0 60 60",
    fill: "currentColor",
    width: size || "60",
    height: size || "60"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M41.5,30l-17,10V20L41.5,30z"
  }));
};

play_triangle_play_triangle.displayName = 'play_triangle';
/* harmony default export */ var components_play_triangle = (play_triangle_play_triangle);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/videos/videoItemPlaceholder.js
function videoItemPlaceholder_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function videoItemPlaceholder_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { videoItemPlaceholder_ownKeys(Object(source), true).forEach(function (key) { videoItemPlaceholder_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { videoItemPlaceholder_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function videoItemPlaceholder_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function videoItemPlaceholder_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function videoItemPlaceholder_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }









var videoItemPlaceholder_VideoItemPlaceholder = /*#__PURE__*/function (_GalleryComponent) {
  videoItemPlaceholder_inheritsLoose(VideoItemPlaceholder, _GalleryComponent);

  function VideoItemPlaceholder() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = VideoItemPlaceholder.prototype;

  _proto.createImageElement = function createImageElement() {
    var _this$props = this.props,
        alt = _this$props.alt,
        loadingStatus = _this$props.loadingStatus,
        createUrl = _this$props.createUrl,
        id = _this$props.id,
        lazyLoad = _this$props.lazyLoad,
        styleParams = _this$props.styleParams;
    var url = createUrl(URL_SIZES.RESIZED, viewModeWrapper_isSEOMode() ? URL_TYPES.SEO : URL_TYPES.HIGH_RES);
    var image = /*#__PURE__*/react_default.a.createElement("img", {
      key: (styleParams.cubeImages && styleParams.cubeType === 'fill' ? 'cubed-' : '') + 'image',
      className: 'gallery-item-visible gallery-item gallery-item-preloaded',
      alt: alt ? alt : 'untitled image',
      src: url,
      loading: "lazy"
    });
    var canvas = /*#__PURE__*/react_default.a.createElement("canvas", {
      key: 'image-' + id,
      alt: alt ? alt : 'untitled video',
      className: 'gallery-item-hidden gallery-item-visible gallery-item gallery-item-preloaded ' + (loadingStatus.loaded ? ' gallery-item-loaded ' : '') + (loadingStatus.failed ? ' failed ' : ''),
      "data-src": url
    });
    var useImageTag = lazyLoad === constants_lazyLoad.NATIVE || viewModeWrapper_isSEOMode();
    return useImageTag ? image : canvas;
  };

  _proto.render = function render() {
    var _ref = this.props.imageDimensions || {},
        marginLeft = _ref.marginLeft,
        marginTop = _ref.marginTop,
        restOfDimensions = videoItemPlaceholder_objectWithoutPropertiesLoose(_ref, ["marginLeft", "marginTop"]);

    var showVideoControls = this.props.hidePlay ? false : this.props.styleParams.showVideoPlayButton;
    var videoControls = !showVideoControls ? false : [/*#__PURE__*/react_default.a.createElement("i", {
      key: "play-triangle",
      "data-hook": "play-triangle",
      className: 'gallery-item-video-play-triangle play-triangle '
    }, /*#__PURE__*/react_default.a.createElement(components_play_triangle, null)), /*#__PURE__*/react_default.a.createElement("i", {
      key: "play-bg",
      "data-hook": "play-background",
      className: 'gallery-item-video-play-background play-background '
    }, /*#__PURE__*/react_default.a.createElement(components_play_background, null))];
    var baseClassName = 'gallery-item-content gallery-item-visible gallery-item-preloaded gallery-item-video gallery-item video-item';
    var placeHolder = /*#__PURE__*/react_default.a.createElement("div", {
      className: baseClassName,
      "data-hook": "video-placeholder_container-image-element",
      key: 'video-and-hover-container' + this.props.id,
      style: videoItemPlaceholder_objectSpread({
        backgroundImage: "url(" + this.props.createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES) + ")"
      }, restOfDimensions)
    }, this.createImageElement(), videoControls);
    var hover = this.props.hover;
    return /*#__PURE__*/react_default.a.createElement("div", {
      key: 'video-and-hover-container' + this.props.idx
    }, [placeHolder, hover]);
  };

  return VideoItemPlaceholder;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var videoItemPlaceholder = (videoItemPlaceholder_VideoItemPlaceholder);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/videos/videoItem.js
function videoItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function videoItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { videoItem_ownKeys(Object(source), true).forEach(function (key) { videoItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { videoItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function videoItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function videoItem_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function videoItem_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }












var videoItem_VideoItem = /*#__PURE__*/function (_GalleryComponent) {
  videoItem_inheritsLoose(VideoItem, _GalleryComponent);

  function VideoItem(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.pause = _this.pause.bind(_assertThisInitialized(_this));
    _this.play = _this.play.bind(_assertThisInitialized(_this));
    _this.playVideoIfNeeded = _this.playVideoIfNeeded.bind(_assertThisInitialized(_this));
    _this.state = {
      playedOnce: false,
      playing: false,
      reactPlayerLoaded: false,
      vimeoPlayerLoaded: false,
      hlsPlayerLoaded: false
    };
    return _this;
  }

  var _proto = VideoItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.dynamiclyImportVideoPlayers();
  };

  _proto.dynamiclyImportVideoPlayers = function dynamiclyImportVideoPlayers() {
    var _this2 = this;

    if (!(window_windowWrapper && window_windowWrapper.ReactPlayer)) {
      __webpack_require__.e(/* import() | reactPlayer */ 4).then(__webpack_require__.t.bind(null, 877, 7)).then(function (ReactPlayer) {
        window_windowWrapper.ReactPlayer = ReactPlayer["default"];

        _this2.setState({
          reactPlayerLoaded: true
        });

        _this2.playVideoIfNeeded();
      });
    }

    if ( //Vimeo player must be loaded by us, problem with requireJS
    !(window_windowWrapper && window_windowWrapper.Vimeo) && this.props.videoUrl && this.props.videoUrl.includes('vimeo.com')) {
      __webpack_require__.e(/* import() | vimeoPlayer */ 5).then(__webpack_require__.bind(null, 878)).then(function (Player) {
        window_windowWrapper.Vimeo = {
          Player: Player["default"]
        };

        _this2.setState({
          vimeoPlayerLoaded: true
        });

        _this2.playVideoIfNeeded();
      });
    }

    if ( //Hls player must be loaded by us, problem with requireJS
    !(window_windowWrapper && window_windowWrapper.Hls) && this.isHLSVideo()) {
      __webpack_require__.e(/* import() | HlsPlayer */ 2).then(__webpack_require__.t.bind(null, 879, 7)).then(function (Player) {
        window_windowWrapper.Hls = Player["default"];

        _this2.setState({
          hlsPlayerLoaded: true
        });

        _this2.playVideoIfNeeded();
      });
    }
  };

  _proto.isHLSVideo = function isHLSVideo() {
    return this.props.videoUrl && (this.props.videoUrl.includes('/hls') || this.props.videoUrl.includes('.m3u8'));
  };

  _proto.shouldUseHlsPlayer = function shouldUseHlsPlayer() {
    return this.isHLSVideo() && !utils.isiOS();
  };

  _proto.shouldForceVideoForHLS = function shouldForceVideoForHLS() {
    return this.isHLSVideo() && utils.isiOS();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.playing) {
      this.setState({
        playedOnce: true
      });
    }

    this.playVideoIfNeeded(nextProps);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.currentIdx !== this.props.currentIdx) {
      this.fixIFrameTabIndexIfNeeded();
    }

    this.playVideoIfNeeded();
  };

  _proto.play = function play() {
    this.props.playVideo(this.props.idx);
  };

  _proto.pause = function pause() {
    this.props.pauseVideo();
  };

  _proto.playVideoIfNeeded = function playVideoIfNeeded(props) {
    if (props === void 0) {
      props = this.props;
    }

    try {
      var _props = props,
          playingVideoIdx = _props.playingVideoIdx;

      if (playingVideoIdx === this.props.idx && !this.isPlaying) {
        this.videoElement = this.videoElement || window_windowWrapper.document.querySelector("#video-" + this.props.id + " video");

        if (this.videoElement) {
          this.isPlaying = true;
          this.videoElement.play();
          utils.isVerbose() && console.log('[VIDEO] Playing video #' + this.props.idx, this.videoElement);
        }
      }
    } catch (e) {
      console.error('[VIDEO] Could not play video #' + this.props.idx, this.videoElement, e);
    }
  } //-----------------------------------------| UTILS |--------------------------------------------//
  ;

  _proto.createPlayerElement = function createPlayerElement() {
    var _this3 = this;

    //video dimensions are for videos in grid fill - placing the video with negative margins to crop into a square
    if (!(window_windowWrapper && window_windowWrapper.ReactPlayer)) {
      return null;
    }

    var PlayerElement = window_windowWrapper.ReactPlayer;
    var isWiderThenContainer = this.props.style.ratio >= this.props.cubeRatio;
    var videoDimensionsCss = {
      width: isWiderThenContainer ? '100%' : 'auto',
      height: isWiderThenContainer ? 'auto' : '100%',
      opacity: this.props.loadingStatus ? '1' : '0'
    };

    if (this.props.styleParams.cubeImages && this.props.styleParams.cubeType === 'fill') {
      //grid crop mode
      var _ref = [videoDimensionsCss.height, videoDimensionsCss.width];
      videoDimensionsCss.width = _ref[0];
      videoDimensionsCss.height = _ref[1];
      videoDimensionsCss.position = 'absolute';
      videoDimensionsCss.margin = 'auto';
      videoDimensionsCss.minHeight = '100%';
      videoDimensionsCss.minWidth = '100%';
      videoDimensionsCss.left = '-100%';
      videoDimensionsCss.right = '-100%';
      videoDimensionsCss.top = '-100%';
      videoDimensionsCss.bottom = '-100%';
    }

    var url = this.props.videoUrl ? this.props.videoUrl : this.props.createUrl(URL_SIZES.RESIZED, URL_TYPES.VIDEO);
    return /*#__PURE__*/react_default.a.createElement(PlayerElement, {
      className: 'gallery-item-visible video gallery-item',
      id: "video-" + this.props.id,
      width: "100%",
      height: "100%",
      url: url,
      alt: this.props.alt ? this.props.alt : 'untitled video',
      loop: !!this.props.styleParams.videoLoop,
      ref: function ref(player) {
        return _this3.video = player;
      },
      volume: this.props.styleParams.videoSound ? 0.8 : 0,
      playing: this.props.playing,
      onEnded: function onEnded() {
        _this3.setState({
          playing: false
        });

        _this3.props.actions.eventsListener(events.VIDEO_ENDED, _this3.props);
      },
      onPause: function onPause() {
        _this3.setState({
          playing: false
        });
      },
      playbackRate: Number(this.props.styleParams.videoSpeed) || 1,
      onPlay: function onPlay() {
        _this3.setState({
          playing: true
        });
      },
      onReady: function onReady() {
        _this3.playVideoIfNeeded();

        _this3.fixIFrameTabIndexIfNeeded();

        _this3.props.actions.setItemLoaded();

        _this3.setState({
          ready: true
        });
      },
      config: {
        file: {
          attributes: {
            muted: !this.props.styleParams.videoSound,
            preload: 'metadata',
            poster: this.props.createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES),
            style: videoDimensionsCss,
            type: 'video/mp4'
          },
          forceHLS: this.shouldUseHlsPlayer(),
          forceVideo: this.shouldForceVideoForHLS()
        }
      },
      key: 'video-' + this.props.id
    });
  };

  _proto.fixIFrameTabIndexIfNeeded = function fixIFrameTabIndexIfNeeded() {
    if (this.props.isExternalVideo) {
      var videoGalleryItem = window_windowWrapper.document && window_windowWrapper.document.getElementById("video-" + this.props.id);
      var videoIFrames = videoGalleryItem && videoGalleryItem.getElementsByTagName('iframe');
      var videoIFrame = videoIFrames && videoIFrames[0];

      if (videoIFrame) {
        if (this.props.currentIdx === this.props.idx) {
          videoIFrame.setAttribute('tabIndex', '0');
        } else {
          videoIFrame.setAttribute('tabIndex', '-1');
        }
      }
    }
  };

  _proto.createImageElement = function createImageElement() {
    var _this$props = this.props,
        alt = _this$props.alt,
        loadingStatus = _this$props.loadingStatus,
        imageDimensions = _this$props.imageDimensions,
        createUrl = _this$props.createUrl,
        id = _this$props.id,
        lazyLoad = _this$props.lazyLoad,
        styleParams = _this$props.styleParams;
    return lazyLoad === constants_lazyLoad.NATIVE ? /*#__PURE__*/react_default.a.createElement("img", {
      key: (styleParams.cubeImages && styleParams.cubeType === 'fill' ? 'cubed-' : '') + 'image',
      className: 'gallery-item-visible gallery-item gallery-item-preloaded',
      alt: alt ? alt : 'untitled image',
      src: createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES),
      loading: "lazy",
      style: imageDimensions
    }) : /*#__PURE__*/react_default.a.createElement("canvas", {
      key: 'image-' + id,
      alt: alt ? alt : 'untitled video',
      className: 'gallery-item-hidden gallery-item-visible gallery-item ' + (loadingStatus.loaded ? ' gallery-item-loaded ' : '') + (loadingStatus.failed ? ' failed ' : ''),
      "data-src": createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES)
    });
  };

  _proto.canVideoPlayInGallery = function canVideoPlayInGallery(itemClick, videoPlay, hasLink) {
    if (videoPlay === 'hover' || videoPlay === 'auto') {
      return true;
    } else if (itemClick === 'nothing') {
      return true;
    } else if (itemClick === 'link' && !hasLink) {
      return true;
    }

    return false;
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    var baseClassName = 'gallery-item-content gallery-item-visible gallery-item-preloaded gallery-item-video gallery-item video-item' + (utils.isiPhone() ? ' ios' : '') + (this.props.loadingStatus.loaded ? ' gallery-item-loaded ' : '');

    if (this.state.playing) {
      baseClassName += ' playing';
    }

    var showVideoControls = this.props.hidePlay ? false : this.props.styleParams.showVideoPlayButton;
    var videoControls = !showVideoControls ? false : [/*#__PURE__*/react_default.a.createElement("i", {
      key: "play-triangle",
      "data-hook": "play-triangle",
      className: 'gallery-item-video-play-triangle play-triangle '
    }, /*#__PURE__*/react_default.a.createElement(components_play_triangle, null)), /*#__PURE__*/react_default.a.createElement("i", {
      key: "play-bg",
      "data-hook": "play-background",
      className: 'gallery-item-video-play-background play-background '
    }, /*#__PURE__*/react_default.a.createElement(components_play_background, null))];
    var videoPreloader = /*#__PURE__*/react_default.a.createElement("div", {
      className: "pro-circle-preloader",
      key: 'video-preloader-' + this.props.idx
    });

    var _ref2 = this.props.imageDimensions || {},
        marginLeft = _ref2.marginLeft,
        marginTop = _ref2.marginTop,
        restOfDimensions = videoItem_objectWithoutPropertiesLoose(_ref2, ["marginLeft", "marginTop"]);

    var _this$props$stylePara = this.props.styleParams,
        videoPlay = _this$props$stylePara.videoPlay,
        itemClick = _this$props$stylePara.itemClick;
    var hasLink = this.props.hasLink;
    var video = /*#__PURE__*/react_default.a.createElement("div", {
      className: baseClassName + ' animated fadeIn ',
      "data-hook": "video_container-video-player-element",
      key: 'video_container-' + this.props.id,
      style: utils.deviceHasMemoryIssues() || this.state.ready ? {
        backgroundColor: 'black'
      } : videoItem_objectSpread({
        backgroundImage: "url(" + this.props.createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES) + ")"
      }, restOfDimensions)
    }, this.createPlayerElement(), videoControls, videoPreloader);
    var hover = this.props.hover;
    return this.canVideoPlayInGallery(itemClick, videoPlay, hasLink) ? /*#__PURE__*/react_default.a.createElement("div", {
      key: 'video-and-hover-container' + this.props.idx
    }, [video, hover]) : /*#__PURE__*/react_default.a.createElement(videoItemPlaceholder, this.props);
  };

  return VideoItem;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var videoItem = (videoItem_VideoItem);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/textItem.js
function textItem_extends() { textItem_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return textItem_extends.apply(this, arguments); }

function textItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function textItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { textItem_ownKeys(Object(source), true).forEach(function (key) { textItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { textItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function textItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function textItem_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var textItem_TextItem = /*#__PURE__*/function (_GalleryComponent) {
  textItem_inheritsLoose(TextItem, _GalleryComponent);

  function TextItem() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = TextItem.prototype;

  _proto.getTextDimensions = function getTextDimensions() {
    var _this$props = this.props,
        style = _this$props.style,
        styleParams = _this$props.styleParams,
        cubeRatio = _this$props.cubeRatio;
    var isVerticalItem = style.ratio < cubeRatio - 0.01; //text dimensions include scaling

    var textHeight = (isVerticalItem ? style.height / style.maxHeight : style.width / style.maxWidth) * style.maxHeight;
    var marginTop = styleParams.cubeType === 'fit' ? 0 : (style.height - textHeight) / 2;
    var transform = 'translate(0, 0) scale(' + (isVerticalItem ? style.height / style.maxHeight : style.width / style.maxWidth) + ')';
    return {
      marginTop: marginTop,
      width: style.maxWidth + 'px',
      height: style.maxHeight + 'px',
      transformOrigin: '0 0',
      WebkitTransform: transform,
      MsTransform: transform,
      OTransform: transform,
      transform: transform
    };
  };

  _proto.componentWillMount = function componentWillMount() {
    this.props.actions.setItemLoaded();
  };

  _proto.processInnerhtml = function processInnerhtml(html) {
    // Remove html class name from inner html elements
    // In older version of the text editor we used font themes (set as classes). Without the iframe it clashes with Santa's css
    try {
      return html.replace(/class="font_\d+"/gm, '');
    } catch (e) {
      return html;
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        styleParams = _this$props2.styleParams,
        html = _this$props2.html,
        style = _this$props2.style,
        actions = _this$props2.actions,
        imageDimensions = _this$props2.imageDimensions;
    var processedHtml = this.processInnerhtml(html);
    var dimensions = this.getTextDimensions();
    var htmlParam = {
      dangerouslySetInnerHTML: {
        __html: processedHtml
      }
    };
    var changeBgColor = {
      style: Object.assign(dimensions, styleParams.cubeType === 'fit' ? {
        backgroundColor: style.bgColor
      } : {})
    };

    var attributes = textItem_objectSpread(textItem_objectSpread({}, htmlParam), changeBgColor);

    var itemContentStyle = {
      height: imageDimensions ? imageDimensions.height : 'inherit',
      backgroundColor: styleParams.cubeType !== 'fit' ? style.bgColor : 'inherit'
    };

    if (imageDimensions && imageDimensions.borderRadius) {
      itemContentStyle.borderRadius = imageDimensions.borderRadius;
    }

    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'gallery-item-content',
      style: itemContentStyle
    }, /*#__PURE__*/react_default.a.createElement("div", textItem_extends({
      className: 'gallery-item-visible gallery-item gallery-item-loaded text-item',
      key: 'item-text-' + id,
      onTouchStart: actions.handleItemMouseDown,
      onTouchEnd: actions.handleItemMouseUp,
      "data-hook": "text-item"
    }, attributes)));
  };

  return TextItem;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemHoverStyleProvider.js
function getHoverStyle(styleParams) {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    boxSizing: 'border-box',
    paddingLeft: styleParams.textsHorizontalPadding + 'px',
    paddingRight: styleParams.textsHorizontalPadding + 'px',
    paddingTop: (styleParams.galleryVerticalAlign !== 'center' ? styleParams.textsVerticalPadding : 0) + 'px',
    paddingBottom: (styleParams.galleryVerticalAlign !== 'center' ? styleParams.textsVerticalPadding : 0) + 'px'
  };
}
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemHover.js
function itemHover_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function itemHover_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { itemHover_ownKeys(Object(source), true).forEach(function (key) { itemHover_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { itemHover_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function itemHover_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function itemHover_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function itemHover_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






var itemHover_ItemHover = /*#__PURE__*/function (_GalleryComponent) {
  itemHover_inheritsLoose(ItemHover, _GalleryComponent);

  function ItemHover() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = ItemHover.prototype;

  _proto.getHoverClass = function getHoverClass() {
    var _this$props = this.props,
        styleParams = _this$props.styleParams,
        forceShowHover = _this$props.forceShowHover;
    var hoverClass = ['gallery-item-hover'];

    if (styleParams.isSlider || styleParams.isSlideshow || styleParams.hasThumbnails) {
      hoverClass.push(styleParams.galleryVerticalAlign);
    }

    hoverClass.push('fullscreen-' + (styleParams.fullscreen ? 'enabled' : 'disabled'));

    if (utils.isUndefined(styleParams.itemOpacity)) {
      //if gallery was just added to the page, and it's settings were never opened,
      //the styles of opacity and background were not set (are undefined),
      //so we are using the default background & opacity (is scss under .gallery-item-hover.default)
      hoverClass.push('default');
    }

    if (forceShowHover) {
      //in mobile, when item is hovered (tapped, with all the right configurations), forceShowHover is true
      hoverClass.push('force-hover');
    } else if (utils.isMobile()) {
      hoverClass.push('hide-hover');
    }

    return hoverClass.join(' ');
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        shouldHover = _this$props2.shouldHover,
        imageDimensions = _this$props2.imageDimensions,
        actions = _this$props2.actions,
        idx = _this$props2.idx,
        styleParams = _this$props2.styleParams;

    if (!shouldHover) {
      return null;
    }

    var hoverClass = this.getHoverClass();

    var _ref = imageDimensions || {},
        marginLeft = _ref.marginLeft,
        marginTop = _ref.marginTop,
        width = _ref.width,
        height = _ref.height,
        restOfDimensions = itemHover_objectWithoutPropertiesLoose(_ref, ["marginLeft", "marginTop", "width", "height"]); //width and height will be taken from the gallery.scss and not be inline


    return /*#__PURE__*/react_default.a.createElement("div", {
      className: hoverClass,
      key: 'item-hover-' + idx,
      "data-hook": 'item-hover-' + idx,
      "aria-hidden": true,
      style: imageDimensions && imageDimensions.borderRadius ? {
        borderRadius: imageDimensions.borderRadius
      } : {}
    }, /*#__PURE__*/react_default.a.createElement("div", {
      style: itemHover_objectSpread(itemHover_objectSpread({}, restOfDimensions), getHoverStyle(styleParams)),
      onTouchStart: actions.handleItemMouseDown,
      onTouchEnd: actions.handleItemMouseUp
    }, this.props.render ? /*#__PURE__*/react_default.a.createElement("div", {
      className: "gallery-item-hover-inner"
    }, this.props.render()) : this.props.children));
  };

  return ItemHover;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/buttons/customButtonIcon.js

function CustomButtonIcon() {
  return /*#__PURE__*/react_default.a.createElement("svg", {
    className: "buy-icon",
    xmlns: "http://www.w3.org/2000/svg",
    width: "38",
    height: "34",
    viewBox: "0 0 38 34"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/react_default.a.createElement("path", {
    stroke: "currentColor",
    d: "M.7870039 2.59301758h6.9136797l3.7205137 22.89656932 22.3489443.012",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    stroke: "currentColor",
    d: "M28.0140389 4.49572754h9.017334L34.1188973 19.4727783H11.0089119",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    stroke: "currentColor",
    d: "M15.002193 28.5c1.3971616 0 2.502193 1.1042242 2.502193 2.5s-1.1050314 2.5-2.502193 2.5S12.5 32.3957758 12.5 31s1.1050314-2.5 2.502193-2.5zM27.5 31c0-1.3957758 1.1050314-2.5 2.502193-2.5s2.502193 1.1042242 2.502193 2.5-1.1050314 2.5-2.502193 2.5S27.5 32.3957758 27.5 31z"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M23 .50625185V11.4270815c0 .2795952-.2319336.5062518-.5.5062518-.2761424 0-.5-.2261351-.5-.5062518V.50625185C22 .22665667 22.2319336 0 22.5 0c.2761424 0 .5.2261351.5.50625185zM8 4h9v1H8z"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M25.53553353 8.0000001l.7071068.7071068-3.53553392 3.5355339-.70710676-.7071068z"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M19.0000001 8.70710647l.7071068-.7071068 3.5355339 3.53553392-.7071068.70710676z"
  })));
}
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/buttons/customButton.js
function customButton_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






var customButton_CustomButton = /*#__PURE__*/function (_GalleryComponent) {
  customButton_inheritsLoose(CustomButton, _GalleryComponent);

  function CustomButton() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = CustomButton.prototype;

  _proto.render = function render() {
    var _this = this;

    var styleParams = this.props.styleParams;
    var buttonText = styleParams.customButtonText || 'Click here';
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "custom-button-wrapper",
      style: {
        justifyContent: styleParams.galleryHorizontalAlign,
        zIndex: 17
      }
    }, this.props.small ? /*#__PURE__*/react_default.a.createElement(CustomButtonIcon, null) : /*#__PURE__*/react_default.a.createElement("button", {
      "data-hook": "custom-button-button",
      onClick: function onClick() {
        return _this.props.actions.eventsListener(events.BUY_NOW_CLICKED, _this.props);
      },
      tabIndex: -1
    }, buttonText, /*#__PURE__*/react_default.a.createElement("div", {
      className: "overlay"
    })));
  };

  return CustomButton;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/texts/itemTitle.js
function itemTitle_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var itemTitle_ItemTitle = /*#__PURE__*/function (_GalleryComponent) {
  itemTitle_inheritsLoose(ItemTitle, _GalleryComponent);

  function ItemTitle() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = ItemTitle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        title = _this$props.title,
        style = _this$props.style,
        spanStyle = _this$props.spanStyle;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "gallery-item-title",
      "data-hook": "item-title",
      style: style
    }, /*#__PURE__*/react_default.a.createElement("span", {
      style: spanStyle
    }, title));
  };

  return ItemTitle;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/texts/itemDescription.js
function itemDescription_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var itemDescription_ItemDescription = /*#__PURE__*/function (_GalleryComponent) {
  itemDescription_inheritsLoose(ItemDescription, _GalleryComponent);

  function ItemDescription() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = ItemDescription.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        description = _this$props.description,
        style = _this$props.style,
        spanStyle = _this$props.spanStyle;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'gallery-item-description',
      "data-hook": "item-description",
      style: style
    }, description.split('\n').map(function (i, key) {
      return /*#__PURE__*/react_default.a.createElement("span", {
        key: key,
        style: spanStyle
      }, i, /*#__PURE__*/react_default.a.createElement("br", null));
    }));
  };

  return ItemDescription;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/placements.js
var PLACEMENTS = {
  SHOW_ON_HOVER: 'SHOW_ON_HOVER',
  SHOW_BELOW: 'SHOW_BELOW',
  SHOW_ABOVE: 'SHOW_ABOVE',
  SHOW_ON_THE_RIGHT: 'SHOW_ON_THE_RIGHT',
  SHOW_ON_THE_LEFT: 'SHOW_ON_THE_LEFT'
};

var hasAbovePlacement = function hasAbovePlacement(placement) {
  return String(placement).indexOf(PLACEMENTS.SHOW_ABOVE) >= 0;
};

var hasBelowPlacement = function hasBelowPlacement(placement) {
  return String(placement).indexOf(PLACEMENTS.SHOW_BELOW) >= 0;
};

var hasHoverPlacement = function hasHoverPlacement(placement) {
  return String(placement).indexOf(PLACEMENTS.SHOW_ON_HOVER) >= 0;
};

var hasRightPlacement = function hasRightPlacement(placement) {
  return String(placement).indexOf(PLACEMENTS.SHOW_ON_THE_RIGHT) >= 0;
};

var hasLeftPlacement = function hasLeftPlacement(placement) {
  return String(placement).indexOf(PLACEMENTS.SHOW_ON_THE_LEFT) >= 0;
};

var hasVerticalPlacement = function hasVerticalPlacement(placement) {
  return hasAbovePlacement(placement) || hasBelowPlacement(placement);
};

var hasHorizontalPlacement = function hasHorizontalPlacement(placement) {
  return hasRightPlacement(placement) || hasLeftPlacement(placement);
};

var isVerticalPlacement = function isVerticalPlacement(placement) {
  return (hasAbovePlacement(placement) || hasBelowPlacement(placement)) && !hasHorizontalPlacement(placement) && !hasHoverPlacement(placement);
};

var isHorizontalPlacement = function isHorizontalPlacement(placement) {
  return (hasRightPlacement(placement) || hasLeftPlacement(placement)) && !hasVerticalPlacement(placement) && !hasHoverPlacement(placement);
};

var isAbovePlacement = function isAbovePlacement(placement) {
  return String(placement) === PLACEMENTS.SHOW_ABOVE;
};

var isBelowPlacement = function isBelowPlacement(placement) {
  return String(placement) === PLACEMENTS.SHOW_BELOW;
};

var isHoverPlacement = function isHoverPlacement(placement) {
  return String(placement) === PLACEMENTS.SHOW_ON_HOVER;
};

var isRightPlacement = function isRightPlacement(placement) {
  return String(placement) === PLACEMENTS.SHOW_ON_THE_RIGHT;
};

var isLeftPlacement = function isLeftPlacement(placement) {
  return String(placement) === PLACEMENTS.SHOW_ON_THE_LEFT;
};

/* harmony default export */ var placements = (PLACEMENTS);

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/infoType.js
var INFO_TYPE = {
  NO_BACKGROUND: 'NO_BACKGROUND',
  ATTACHED_BACKGROUND: 'ATTACHED_BACKGROUND',
  SEPARATED_BACKGROUND: 'SEPARATED_BACKGROUND',
  DONT_SHOW: 'DONT_SHOW'
};
/* harmony default export */ var infoType = (INFO_TYPE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/designConsts.js
/* harmony default export */ var designConsts = ({
  spaceBetweenElements: 16,
  spaceBetweenTitleAndDescription: 6
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/texts/lineHeightFixer.js
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var minWidthToShowContent = 135;
var minWithForNormalSizedItem = 190;

var lineHeightFixer_LineHeightFixer = /*#__PURE__*/function () {
  function LineHeightFixer() {}

  var _proto = LineHeightFixer.prototype;

  _proto.getDimensions = function getDimensions(element) {
    var cs = window_windowWrapper.getComputedStyle(element);
    var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    return {
      width: element.clientWidth - paddingX - borderX,
      height: element.clientHeight - paddingY - borderY
    };
  };

  _proto.saveCurrentDisplay = function saveCurrentDisplay(element) {
    element && element.setAttribute('data-display', this.getCss(element, 'display'));
  };

  _proto.getSavedDisplay = function getSavedDisplay(element) {
    return element && element.getAttribute('data-display') || '-webkit-box';
  };

  _proto.removeElement = function removeElement(element) {
    this.saveCurrentDisplay(element);
    this.setCss(element, {
      display: 'none'
    });
  };

  _proto.hideElement = function hideElement(element, shouldOverrideDisplay) {
    if (shouldOverrideDisplay === void 0) {
      shouldOverrideDisplay = true;
    }

    if (element) {
      if (shouldOverrideDisplay) {
        var display = this.getSavedDisplay(element);
        this.setCss(element, {
          visibility: 'hidden',
          display: display
        });
      } else {
        this.setCss(element, {
          visibility: 'hidden'
        });
      }
    }
  };

  _proto.showElement = function showElement(element, shouldOverrideDisplay) {
    if (shouldOverrideDisplay === void 0) {
      shouldOverrideDisplay = true;
    }

    if (shouldOverrideDisplay) {
      var display = this.getSavedDisplay(element);
      this.setCss(element, {
        visibility: 'inherit',
        display: display
      });
    } else {
      this.setCss(element, {
        visibility: 'inherit'
      });
    }
  };

  _proto.getCss = function getCss(element, rule, _default) {
    return window_windowWrapper.getComputedStyle(element)[rule] || _default;
  };

  _proto.setCss = function setCss(element, styles) {
    try {
      Object.assign(element.style, styles);
    } catch (e) {//
    }
  };

  _proto.shouldFix = function shouldFix(oldOptions, newOptions) {
    var styleParams = oldOptions.styleParams,
        title = oldOptions.title,
        description = oldOptions.description,
        style = oldOptions.style,
        externalTotalInfoHeight = oldOptions.externalTotalInfoHeight;
    var newStyleParams = newOptions.styleParams;
    var newTitle = newOptions.title;
    var newDescription = newOptions.description;
    var newStyle = newOptions.style;
    var newExternalTotalInfoHeight = newOptions.externalTotalInfoHeight;
    var newIsSocialPopulated = newStyleParams.allowSocial || newStyleParams.loveButton || newStyleParams.allowDownload;
    var oldIsSocialPopulated = styleParams.allowSocial || styleParams.loveButton || styleParams.allowDownload;
    return style.height !== newStyle.height || externalTotalInfoHeight !== newExternalTotalInfoHeight || style.width !== newStyle.width || styleParams.isSlideshow !== newStyleParams.isSlideshow || styleParams.allowTitle !== newStyleParams.allowTitle || styleParams.allowDescription !== newStyleParams.allowDescription || styleParams.slideshowInfoSize !== newStyleParams.slideshowInfoSize || styleParams.textImageSpace !== newStyleParams.textImageSpace || styleParams.textsVerticalPadding !== newStyleParams.textsVerticalPadding || styleParams.textsHorizontalPadding !== newStyleParams.textsHorizontalPadding || styleParams.titleDescriptionSpace !== newStyleParams.titleDescriptionSpace || styleParams.imageInfoType !== newStyleParams.imageInfoType || styleParams.itemDescriptionFont !== newStyleParams.itemDescriptionFont || styleParams.calculateTextBoxHeightMode !== newStyleParams.calculateTextBoxHeightMode || styleParams.itemFont !== newStyleParams.itemFont || oldIsSocialPopulated !== newIsSocialPopulated || title !== newTitle || description !== newDescription;
  };

  _proto.calcAvailableHeight = function calcAvailableHeight(options, textPlacementAboveOrBelow, textPlacementRightOrLeft, textsContainerHeight, placement) {
    var styleParams = options.styleParams,
        itemContainer = options.itemContainer;
    var availableHeight;

    if (styleParams.isSlideshow) {
      var socialElements = itemContainer.getElementsByClassName('gallery-item-social');
      var socialElement = socialElements.length > 0 && socialElements[0];
      var socialHeight = socialElement.clientHeight;
      var socialMarginBottom = parseInt(this.getCss(socialElement, 'margin-bottom', 0));
      var itemInfoChildDivPaddingTop = 24; //padding-top of the div inside gallery-item-info

      availableHeight = styleParams.slideshowInfoSize - itemInfoChildDivPaddingTop - socialHeight - socialMarginBottom;
    } else if (textPlacementAboveOrBelow || textPlacementRightOrLeft) {
      var _PLACEMENTS$SHOW_BELO;

      var className = (_PLACEMENTS$SHOW_BELO = {}, _PLACEMENTS$SHOW_BELO[placements.SHOW_BELOW] = 'gallery-item-bottom-info', _PLACEMENTS$SHOW_BELO[placements.SHOW_ABOVE] = 'gallery-item-top-info', _PLACEMENTS$SHOW_BELO[placements.SHOW_ON_THE_RIGHT] = 'gallery-item-right-info', _PLACEMENTS$SHOW_BELO[placements.SHOW_ON_THE_LEFT] = 'gallery-item-left-info', _PLACEMENTS$SHOW_BELO)[placement];
      var elements = itemContainer.getElementsByClassName(className);
      var element = elements.length > 0 && elements[0];

      if (typeof element !== 'undefined') {
        var elementPadding = parseInt(this.getCss(element, 'padding-top', 0)) + parseInt(this.getCss(element, 'padding-bottom', 0));
        var margin = styleParams.imageInfoType === infoType.SEPARATED_BACKGROUND && (styleParams.allowTitle || styleParams.allowDescription) && styleParams.textImageSpace ? styleParams.textImageSpace : 0;
        var availableHeightOfTheTextElement = textPlacementAboveOrBelow ? options.externalTotalInfoHeight : textsContainerHeight; //maybe can be textsContainerHeight for textPlacementAboveOrBelow as well

        availableHeight = availableHeightOfTheTextElement - elementPadding - margin;
      }
    } else {
      availableHeight = textsContainerHeight;
    }

    return availableHeight;
  };

  _proto.fix = function fix(options, container) {
    if (utils.isTest()) {
      return;
    }

    var styleParams = options.styleParams,
        title = options.title,
        description = options.description;

    for (var _iterator = _createForOfIteratorHelperLoose(styleParams.titlePlacement.split(',')), _step; !(_step = _iterator()).done;) {
      var placement = _step.value;
      var textPlacementRightOrLeft = hasHorizontalPlacement(placement);
      var textPlacementAboveOrBelow = hasVerticalPlacement(placement);

      if (!container || !(options && options.itemContainer)) {
        return;
      }

      var dimensions = this.getDimensions(container);
      var availableHeight = this.calcAvailableHeight(options, textPlacementAboveOrBelow, textPlacementRightOrLeft, dimensions.height, placement);
      var customButtonElements = container.getElementsByClassName('custom-button-wrapper');
      var titleElements = container.getElementsByClassName('gallery-item-title');
      var descriptionElements = container.getElementsByClassName('gallery-item-description');
      var customButtonExists = customButtonElements.length > 0;
      var customButtonElement = customButtonExists && customButtonElements[0];
      var titleElement = titleElements.length > 0 && titleElements[0];
      var descriptionElement = descriptionElements.length > 0 && descriptionElements[0];
      var isItemWidthToSmall = dimensions.width < minWidthToShowContent;
      this.hideElement(titleElement);
      this.hideElement(descriptionElement, !(textPlacementAboveOrBelow || textPlacementRightOrLeft)); //if textPlacementAboveOrBelow or textPlacementRightOrLeft, descriptionElement should not get 'display: -webkit-box'

      this.hideElement(customButtonElement, !(styleParams.isSlideshow || textPlacementAboveOrBelow || textPlacementRightOrLeft)); //if Slideshow or if textPlacementAboveOrBelow or if textPlacementRightOrLeft, customButtonElement should not get 'display: -webkit-box'

      if (customButtonExists) {
        this.showElement(customButtonElement, !(styleParams.isSlideshow || textPlacementAboveOrBelow || textPlacementRightOrLeft)); //if Slideshow or if textPlacementAboveOrBelow or if textPlacementRightOrLeft, customButtonElement should not get 'display: -webkit-box'

        var buttonHeight = this.getDimensions(customButtonElement).height;

        if (availableHeight + 30 < buttonHeight) {
          this.removeElement(customButtonElement);
          customButtonExists = false;
        } else if (isItemWidthToSmall) {
          this.setCss(customButtonElement.querySelector('button'), {
            'min-width': 0 + 'px',
            'max-width': minWidthToShowContent + 'px'
          });
        } else if (dimensions.width < minWithForNormalSizedItem) {
          this.setCss(customButtonElement.querySelector('button'), {
            'min-width': minWidthToShowContent + 'px',
            'max-width': dimensions.width + 'px'
          });
        }

        var isButtonHeightAvailable = !Number.isNaN(buttonHeight);

        if (isButtonHeightAvailable && customButtonExists) {
          availableHeight -= buttonHeight;
          availableHeight -= designConsts.spaceBetweenElements;

          if (availableHeight < 0) {
            availableHeight = 0;
          }
        }
      }

      var shouldDisplayTitle = title && styleParams.allowTitle;
      var titleNumOfAvailableLines = 0;

      if (shouldDisplayTitle) {
        this.showElement(titleElement);
        this.setCss(titleElement, {
          overflow: 'visible'
        });

        if (titleElements.length === 1) {
          var titleHeight = // when padding is large and the we decrease padding the clientHeight stay small
          parseInt(titleElement.children[0].offsetHeight) > parseInt(titleElement.clientHeight) ? parseInt(titleElement.children[0].offsetHeight) : parseInt(titleElement.clientHeight);
          var titleLineHeight = parseInt(this.getCss(titleElement, 'line-height', 1));
          var numOfTitleLines = 1;

          if (titleHeight >= titleLineHeight) {
            numOfTitleLines = Math.floor(titleHeight / titleLineHeight);
          }

          titleNumOfAvailableLines = Math.floor(availableHeight / titleLineHeight);

          if (titleNumOfAvailableLines === 0) {
            this.removeElement(titleElement);
          } else {
            this.setCss(titleElement, {
              overflow: 'hidden'
            });
            var isTitleFitInAvailableHeight = titleNumOfAvailableLines >= numOfTitleLines;

            if (isTitleFitInAvailableHeight) {
              this.setCss(titleElement, {
                '-webkit-line-clamp': 'none'
              });
              titleHeight = titleLineHeight * numOfTitleLines;
            } else {
              this.setCss(titleElement, {
                '-webkit-line-clamp': titleNumOfAvailableLines + ''
              });
              titleHeight = titleLineHeight * titleNumOfAvailableLines;
            }

            var isThereAnyAvailableHeightLeft = availableHeight > titleHeight;

            if (isThereAnyAvailableHeightLeft) {
              availableHeight -= titleHeight;
            } else {
              availableHeight = 0;
            }
          }
        }
      }

      var shouldDisplayDescription = descriptionElement && styleParams.allowDescription && description && availableHeight > 0 && (shouldDisplayTitle && titleNumOfAvailableLines > 0 || !shouldDisplayTitle); // when there s no place for title the description not suppose to be shown

      if (shouldDisplayDescription) {
        this.showElement(descriptionElement, !(textPlacementAboveOrBelow || textPlacementRightOrLeft)); //if textPlacementAboveOrBelow or textPlacementRightOrLeft, descriptionElement should not get 'display: -webkit-box'

        if (shouldDisplayTitle) {
          availableHeight -= styleParams.titleDescriptionSpace;
        }

        if (availableHeight < 0) {
          availableHeight = 0;
        }

        var lineHeight = parseInt(this.getCss(descriptionElement, 'line-height', 1));
        var numOfLines = Math.floor(availableHeight / lineHeight);

        if (numOfLines === 0) {
          this.removeElement(descriptionElement);
        } else {
          this.setCss(descriptionElement, {
            overflow: 'hidden',
            '-webkit-line-clamp': numOfLines + ''
          });
        }
      }
    }
  };

  return LineHeightFixer;
}();

/* harmony default export */ var lineHeightFixer = (new lineHeightFixer_LineHeightFixer());
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/versionsHelper.js
function versionsHelper_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function versionsHelper_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { versionsHelper_ownKeys(Object(source), true).forEach(function (key) { versionsHelper_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { versionsHelper_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function versionsHelper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FeatureManager = /*#__PURE__*/function () {
  function FeatureManager() {
    this.features = {
      fullscreenRedesign: {
        title: 'New fullscreen design',
        releaseDate: Date.parse('2017-09-25T12:00:00.000Z')
      },
      spacingCalculation: {
        title: 'Improve spacing calculation',
        releaseDate: Date.parse('2017-08-29T11:27:29.000Z')
      },
      fixedColumnsInMasonry: {
        title: 'Allow fixed number of columns in Masonry layout',
        releaseDate: Date.parse('2018-05-24T18:00:00.000Z')
      },
      mobileSettings: {
        title: 'Separate mobile and desktop setting',
        releaseDate: Date.parse('2018-12-18T12:00:50.054Z')
      }
    };
    this.freezeDate = new Date();
    this.updateFeatures();
  }

  var _proto = FeatureManager.prototype;

  _proto.updateFeatures = function updateFeatures() {
    var _this = this;

    this.supports = Object.entries(this.features).reduce(function (obj, _ref) {
      var _objectSpread2;

      var feature = _ref[0],
          releaseDate = _ref[1].releaseDate;
      return versionsHelper_objectSpread(versionsHelper_objectSpread({}, obj), {}, (_objectSpread2 = {}, _objectSpread2[feature] = _this.freezeDate >= releaseDate, _objectSpread2));
    });
  };

  _createClass(FeatureManager, [{
    key: "freezeDate",
    get: function get() {
      return this._dateCreated || new Date();
    },
    set: function set(date) {
      if (typeof date === 'object' && typeof date.getTime === 'function') {
        this._dateCreated = date;
        this.updateFeatures();
      }
    }
  }]);

  return FeatureManager;
}();

var featureManager = new FeatureManager();
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/infoBehaviourOnHover.js
var INFO_BEHAVIOUR_ON_HOVER = {
  APPEARS: 'APPEARS',
  DISAPPEARS: 'DISAPPEARS',
  NO_CHANGE: 'NO_CHANGE',
  //ALWAYS_SHOW
  NEVER_SHOW: 'NEVER_SHOW'
};
/* harmony default export */ var infoBehaviourOnHover = (INFO_BEHAVIOUR_ON_HOVER);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/texts/texts.js
function texts_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function texts_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }













var texts_Texts = /*#__PURE__*/function (_GalleryComponent) {
  texts_inheritsLoose(Texts, _GalleryComponent);

  function Texts(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.debouncedTryFixLineHeight = utils.debounce(_this.tryFixLineHeight.bind(texts_assertThisInitialized(_this)), 500).bind(texts_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Texts.prototype;

  _proto.getElementClassNames = function getElementClassNames() {
    var _this$props = this.props,
        showShare = _this$props.showShare,
        isNarrow = _this$props.isNarrow;
    var classNames = ['gallery-item-text'];

    if (showShare) {
      classNames.push('hidden');
    }

    if (isNarrow) {
      classNames.push('narrow-item');
    }

    return classNames.join(' ');
  };

  _proto.allowAnyAction = function allowAnyAction() {
    var styleParams = this.props.styleParams;
    return styleParams.loveButton || styleParams.allowSocial || styleParams.allowDownload;
  };

  _proto.getElementStyle = function getElementStyle() {
    var _this$props2 = this.props,
        styleParams = _this$props2.styleParams,
        style = _this$props2.style;
    var textsDisplayOnHover = !styleParams.isSlideshow && !styleParams.isSlider && !styleParams.hasThumbnails && hasHoverPlacement(styleParams.titlePlacement) && styleParams.hoveringBehaviour !== infoBehaviourOnHover.NEVER_SHOW;
    var isCentered = style.justifyContent === 'center';
    var elementStyle = {
      justifyContent: styleParams.galleryVerticalAlign,
      alignItems: styleParams.galleryHorizontalAlign,
      textAlign: styleParams.galleryTextAlign
    };
    var textPlacementRightOrLeft = hasHorizontalPlacement(styleParams.titlePlacement); //Set the texts fixed height considering the height of the love and share buttons which is about 100px;

    if (textsDisplayOnHover && this.allowAnyAction() && (styleParams.allowTitle || styleParams.allowDescription)) {
      elementStyle.paddingBottom = 70;
    }

    if (isCentered) {
      elementStyle.marginTop = style.height / 15;
    }

    if (styleParams.isRTL) {
      elementStyle.direction = 'rtl';
    } else {
      elementStyle.direction = 'ltr';
    }

    if (textPlacementRightOrLeft) {
      elementStyle.height = '100%';
    }

    return elementStyle;
  };

  _proto.getItemTexts = function getItemTexts() {
    var _this2 = this;

    var _this$props3 = this.props,
        title = _this$props3.title,
        description = _this$props3.description,
        id = _this$props3.id,
        styleParams = _this$props3.styleParams,
        style = _this$props3.style,
        isNarrow = _this$props3.isNarrow,
        shouldShowButton = _this$props3.shouldShowButton,
        container = _this$props3.container;
    var shouldShowTitle = title && styleParams.allowTitle;
    var shouldShowDescription = description && styleParams.allowDescription;
    var isNewMobileSettings = featureManager.supports.mobileSettings;
    var titleSpanStyle = {};
    var descSpanStyle = {};
    var titleStyle, descStyle;

    if (shouldShowDescription) {
      titleStyle = {
        marginBottom: styleParams.titleDescriptionSpace
      };
    } else if (shouldShowButton) {
      titleStyle = {
        marginBottom: designConsts.spaceBetweenElements
      };
    } else {
      titleStyle = {
        marginBottom: 0
      };
    }

    if (shouldShowButton) {
      descStyle = {
        marginBottom: designConsts.spaceBetweenElements
      };
    } else {
      descStyle = {
        marginBottom: 0
      };
    }

    if (utils.isMobile() && isNewMobileSettings) {
      // ovveride desktop color and fonts
      if (styleParams.isSlideshowFont) {
        if (typeof styleParams.itemFontSlideshow !== 'undefined') {
          titleStyle.font = styleParams.itemFontSlideshow.value;
          titleStyle.textDecoration = styleParams.textDecorationTitle;
        }

        if (typeof styleParams.itemDescriptionFontSlideshow !== 'undefined') {
          descStyle.font = styleParams.itemDescriptionFontSlideshow.value;
          descStyle.textDecoration = styleParams.textDecorationDesc;
        }

        if (typeof styleParams.itemFontColorSlideshow !== 'undefined') {
          titleStyle.color = styleParams.itemFontColorSlideshow.value;
          titleStyle.textDecorationColor = styleParams.itemFontColorSlideshow.value;
        }

        if (typeof styleParams.itemDescriptionFontColorSlideshow !== 'undefined') {
          descStyle.color = styleParams.itemDescriptionFontColorSlideshow.value;
          descStyle.textDecorationColor = styleParams.itemDescriptionFontColorSlideshow.value;
        }
      } else {
        if (typeof styleParams.itemFont !== 'undefined') {
          titleStyle.font = styleParams.itemFont.value;
          titleStyle.textDecoration = styleParams.textDecorationTitle;
        }

        if (typeof styleParams.itemDescriptionFont !== 'undefined') {
          descStyle.font = styleParams.itemDescriptionFont.value;
          descStyle.textDecoration = styleParams.textDecorationDesc;
        }

        if (typeof styleParams.itemFontColor !== 'undefined') {
          titleStyle.color = styleParams.itemFontColor.value;
          titleStyle.textDecorationColor = styleParams.itemFontColor.value;
        }

        if (typeof styleParams.itemDescriptionFontColor !== 'undefined') {
          descStyle.color = styleParams.itemDescriptionFontColor.value;
          descStyle.textDecorationColor = styleParams.itemDescriptionFontColor.value;
        }
      }
    }

    if (styleParams.isSlideshow && container && container.galleryWidth && container.galleryWidth < 800) {
      var maxWidth = container.galleryWidth;

      if (styleParams.allowSlideshowCounter) {
        maxWidth -= 30;
      }

      if (styleParams.playButtonForAutoSlideShow) {
        maxWidth -= 30;
      }

      titleStyle.maxWidth = maxWidth;
      descStyle.maxWidth = maxWidth;
    }

    var titleElem = shouldShowTitle && /*#__PURE__*/react_default.a.createElement(itemTitle_ItemTitle, {
      key: 'item-title-' + id,
      title: title,
      style: titleStyle,
      spanStyle: titleSpanStyle
    });
    var descriptionElem = shouldShowDescription && /*#__PURE__*/react_default.a.createElement(itemDescription_ItemDescription, {
      key: 'item-description-' + id,
      description: description,
      style: descStyle,
      spanStyle: descSpanStyle
    });
    var buttonElem = shouldShowButton && /*#__PURE__*/react_default.a.createElement(customButton_CustomButton, {
      type: "button",
      styleParams: styleParams,
      style: style,
      small: isNarrow,
      actions: {
        eventsListener: this.props.actions.eventsListener
      }
    });
    var shouldHideElement = !titleElem && !descriptionElem && !buttonElem;

    if (shouldHideElement) {
      return null;
    }

    var elementStyle = this.getElementStyle();
    var classNames = this.getElementClassNames();
    return /*#__PURE__*/react_default.a.createElement("div", {
      style: elementStyle,
      ref: function ref(x) {
        return _this2.container = x;
      },
      className: classNames,
      dir: "auto"
    }, titleElem, descriptionElem, buttonElem);
  };

  _proto.tryFixLineHeight = function tryFixLineHeight() {
    try {
      lineHeightFixer.fix(this.props, this.container);
    } catch (e) {
      if (utils.isVerbose()) {
        console.error('Error on componentDidUpdate', e);
      }
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (lineHeightFixer.shouldFix(prevProps, this.props)) {
      this.debouncedTryFixLineHeight();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this3 = this;

    this.tryFixLineHeight();
    setTimeout(function () {
      _this3.tryFixLineHeight(); //waiting for wix inline styles to take affect

    }, 1000);
  };

  _proto.render = function render() {
    return this.getItemTexts();
  };

  return Texts;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/love_full.js
function love_full_extends() { love_full_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return love_full_extends.apply(this, arguments); }

function love_full_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var love_full_love_full = function love_full(_ref) {
  var size = _ref.size,
      props = love_full_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", love_full_extends({
    viewBox: "0 0 18 15",
    fill: "currentColor",
    width: size || "18",
    height: size || "15"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M9,15c-0.1,0-0.2,0-0.3-0.1c-0.2-0.2-6-3.9-7.8-7C0,6.3-0.3,4.5,0.3,3C0.8,1.7,1.7,0.7,3,0.3\tC5.3-0.5,7.7,0.7,9,2.4c1.4-1.9,4-2.9,6.1-2.1c1.2,0.5,2.2,1.4,2.6,2.6c0.6,1.5,0.3,3.3-0.6,5c-1.8,3.3-7.5,6.8-7.8,7\tC9.2,15,9.1,15,9,15z"
  }));
};

love_full_love_full.displayName = 'love_full';
/* harmony default export */ var components_love_full = (love_full_love_full);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/love_empty.js
function love_empty_extends() { love_empty_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return love_empty_extends.apply(this, arguments); }

function love_empty_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var love_empty_love_empty = function love_empty(_ref) {
  var size = _ref.size,
      props = love_empty_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", love_empty_extends({
    viewBox: "0 0 18 15",
    fill: "currentColor",
    width: size || "18",
    height: size || "15"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M9,15c-0.1,0-0.2,0-0.3-0.1c-0.2-0.2-6-3.9-7.8-7C0,6.3-0.3,4.5,0.3,3C0.8,1.7,1.7,0.7,3,0.3\tC5.3-0.5,7.7,0.7,9,2.4c1.4-1.9,4-2.9,6.1-2.1c1.2,0.5,2.2,1.4,2.6,2.6c0.6,1.5,0.3,3.3-0.6,5c-1.8,3.3-7.5,6.8-7.8,7\tC9.2,15,9.1,15,9,15z M4.6,1.2c-0.4,0-0.8,0.1-1.2,0.2c-0.9,0.3-1.6,1-1.9,2C1,4.6,1.2,6,2,7.3c1.4,2.5,5.8,5.5,7.1,6.3\tc1.2-0.8,5.6-3.7,7-6.3c0.8-1.4,1-2.8,0.5-4c-0.3-0.9-1-1.6-1.9-1.9l0,0c-1.9-0.7-4.3,0.7-5.1,2.4c-0.2,0.4-0.9,0.4-1.1,0\tC7.8,2.4,6.3,1.2,4.6,1.2z"
  }));
};

love_empty_love_empty.displayName = 'love_empty';
/* harmony default export */ var components_love_empty = (love_empty_love_empty);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/loveButton/loveButton.js
function loveButton_extends() { loveButton_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return loveButton_extends.apply(this, arguments); }

function loveButton_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function loveButton_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }









var loveButton_LoveButton = /*#__PURE__*/function (_GalleryComponent) {
  loveButton_inheritsLoose(LoveButton, _GalleryComponent);

  function LoveButton(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.toggleLove = _this.toggleLove.bind(loveButton_assertThisInitialized(_this));
    _this.onKeyPress = _this.onKeyPress.bind(loveButton_assertThisInitialized(_this));
    _this.state = {
      animate: false
    };
    return _this;
  }

  var _proto = LoveButton.prototype;

  _proto.onKeyPress = function onKeyPress(e) {
    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.preventDefault();
        e.stopPropagation();
        this.toggleLove(e);
        return false;
    }
  };

  _proto.toggleLove = function toggleLove(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.actions.eventsListener(events.LOVE_BUTTON_CLICKED, this.props);
    this.setState({
      animate: !this.props.isLoved
    });
  };

  _proto.containerClassName = function containerClassName() {
    switch (this.props.layout) {
      case 'fullscreen':
        return 'fullscreen-social-love-container show-tooltip';

      default:
        return 'block-fullscreen gallery-item-social-love gallery-item-social-button show-tooltip';
    }
  };

  _proto.buttonClasssName = function buttonClasssName() {
    var className = [];

    switch (this.props.layout) {
      case 'fullscreen':
        className.push('fullscreen-social-love');
        break;

      default:
        className.push('gallery-item-social-love');

        if (!this.props.styleParams.isStoreGallery) {
          className.push('block-fullscreen');
        }

    }

    className.push(this.viewClassName());

    if (this.props.isLoved) {
      className.push('love_full pro-gallery-loved');
    } else {
      className.push('love_empty');
    }

    if (this.state.animate) {
      className.push('love-animation');
    }

    return className.join(' ');
  };

  _proto.viewClassName = function viewClassName() {
    switch (this.props.layout) {
      case 'fullscreen':
        return this.props.device === 'desktop' ? 'fullscreen-icon' : '';

      default:
        return '';
    }
  };

  _proto.counterClassName = function counterClassName() {
    switch (this.props.layout) {
      case 'fullscreen':
        return 'fullscreen-social-love-count pro-fullscreen-shown ' + this.viewClassName();

      default:
        return 'block-fullscreen gallery-item-social-love-count ' + this.viewClassName();
    }
  };

  _proto.createLoveCounter = function createLoveCounter() {
    var count = this.props.loveCount || 0;
    return !!this.props.showCounter && count > 0 ? /*#__PURE__*/react_default.a.createElement("i", {
      "data-hook": "love-counter",
      className: this.counterClassName()
    }, count) : null;
  };

  _proto.render = function render() {
    var loveCounter = this.createLoveCounter();
    var clickAction = viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode() ? utils.getMobileEnabledClick(this.toggleLove) : {
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    };
    var loveColor = this.props.isLoved ? {
      color: 'red'
    } : {};
    return /*#__PURE__*/react_default.a.createElement("span", loveButton_extends({
      "data-hook": "love-button",
      className: this.containerClassName()
    }, clickAction, {
      onKeyDown: this.onKeyPress,
      tabIndex: this.props.styleParams.isSlideshow && this.props.currentIdx === this.props.idx ? 0 : -1,
      role: "checkbox",
      "aria-checked": this.props.isLoved,
      "aria-label": 'Love'
    }), /*#__PURE__*/react_default.a.createElement("button", {
      "data-hook": "love-icon",
      className: this.buttonClasssName(),
      style: loveColor,
      tabIndex: -1
    }, this.props.isLoved ? /*#__PURE__*/react_default.a.createElement(components_love_full, {
      size: "21"
    }) : /*#__PURE__*/react_default.a.createElement(components_love_empty, {
      size: "21"
    })), loveCounter);
  };

  return LoveButton;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var loveButton_loveButton = (loveButton_LoveButton);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/download.js
function download_extends() { download_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return download_extends.apply(this, arguments); }

function download_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var download_download = function download(_ref) {
  var size = _ref.size,
      props = download_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", download_extends({
    viewBox: "0 0 16 15",
    fill: "currentColor",
    width: size || "16",
    height: size || "15"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M15.5,14H0.5C0.2,14,0,14.2,0,14.5C0,14.8,0.2,15,0.5,15h15.1c0.3,0,0.5-0.2,0.5-0.5C16,14.2,15.8,14,15.5,14z M8.1,10.9 C8.2,11,8.4,11,8.5,11c0.1,0,0.3,0,0.4-0.1l3.5-3.5c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L9,9.3V0.5C9,0.2,8.8,0,8.5,0 C8.2,0,8,0.2,8,0.5v8.8L5.3,6.6c-0.2-0.2-0.6-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7L8.1,10.9z"
  }));
};

download_download.displayName = 'download';
/* harmony default export */ var components_download = (download_download);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/share_store.js
function share_store_extends() { share_store_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return share_store_extends.apply(this, arguments); }

function share_store_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var share_store_share_store = function share_store(_ref) {
  var size = _ref.size,
      props = share_store_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", share_store_extends({
    viewBox: "0 0 18 17",
    fill: "currentColor",
    width: size || "18",
    height: size || "17"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M12.221 2.361l4.453 4.722-4.453 4.723v-1.7l-.758-.19a9.37 9.37 0 0 0-2.274-.283c-2.936 0-5.684 1.228-7.673 3.211 2.179-8.31 8.905-8.783 9.758-8.783h.947v-1.7zm-.947.756C9.189 3.21.664 4.627 0 17c1.516-3.778 5.116-6.328 9.19-6.328.663 0 1.326.095 2.084.19v3.305L18 7.083 11.274 0v3.117z"
  }));
};

share_store_share_store.displayName = 'share_store';
/* harmony default export */ var components_share_store = (share_store_share_store);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/social/social.js
function social_extends() { social_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return social_extends.apply(this, arguments); }

function social_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function social_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }













var social_Social = /*#__PURE__*/function (_GalleryComponent) {
  social_inheritsLoose(Social, _GalleryComponent);

  function Social(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.onDownloadKeyPress = _this.onDownloadKeyPress.bind(social_assertThisInitialized(_this));
    _this.onDownloadTextKeyPress = _this.onDownloadTextKeyPress.bind(social_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Social.prototype;

  _proto.getSocialShare = function getSocialShare() {
    var _this$props = this.props,
        styleParams = _this$props.styleParams,
        id = _this$props.id,
        actions = _this$props.actions;

    if (styleParams.allowSocial) {
      var slideshowShareButton = /*#__PURE__*/react_default.a.createElement("i", {
        className: 'block-fullscreen share-store'
      }, /*#__PURE__*/react_default.a.createElement(components_share_store, {
        size: "20"
      }));

      if (viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode()) {
        var slideshowShare = styleParams.isSlideshow ? actions.getShare() : '';
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: 'block-fullscreen gallery-item-social-share gallery-item-social-button',
          "data-hook": "gallery-item-social-button",
          key: 'item-social-share-' + id,
          onClick: function onClick(e) {
            return actions.toggleShare(e, true);
          }
        }, slideshowShareButton, slideshowShare);
      } else {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: 'show-tooltip block-fullscreen gallery-item-social-share gallery-item-social-button',
          "data-hook": "gallery-item-social-button",
          key: 'item-social-share-' + id,
          onClick: function onClick(e) {
            return e.stopPropagation();
          }
        }, slideshowShareButton);
      }
    }

    return '';
  };

  _proto.getLoveButton = function getLoveButton() {
    var _this$props2 = this.props,
        styleParams = _this$props2.styleParams,
        isNarrow = _this$props2.isNarrow,
        isSmallItem = _this$props2.isSmallItem;
    var props = utils.pick(this.props, ['id', 'item', 'idx', 'currentIdx', 'styleParams', 'hashtag', 'type', 'actions', 'loveCount', 'isLoved']);
    return styleParams.loveButton ? /*#__PURE__*/react_default.a.createElement(loveButton_loveButton, social_extends({}, props, {
      itemId: this.props.photoId,
      layout: styleParams.isSlideshow ? 'slideshow' : 'gallery',
      showCounter: styleParams.loveCounter && !isSmallItem && !isNarrow
    })) : '';
  };

  _proto.getDownload = function getDownload() {
    var _this2 = this;

    var _this$props3 = this.props,
        styleParams = _this$props3.styleParams,
        isDemo = _this$props3.isDemo,
        type = _this$props3.type,
        createUrl = _this$props3.createUrl,
        actions = _this$props3.actions;

    if (styleParams.allowDownload && !((viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode()) && isDemo)) {
      var className = 'block-fullscreen gallery-item-social-download ' + (styleParams.allowSocial ? '' : ' pull-right ') + ' gallery-item-social-button';
      var downloadIcon = /*#__PURE__*/react_default.a.createElement("i", {
        className: 'block-fullscreen ' + (isDemo ? ' inactive' : '')
      }, /*#__PURE__*/react_default.a.createElement(components_download, {
        size: "20"
      }));
      var genralProps = {
        className: className,
        'data-hook': 'item-download',
        'aria-label': 'Download',
        role: 'button',
        tabIndex: styleParams.isSlideshow && this.props.currentIdx === this.props.idx ? 0 : -1
      };
      var downloadUrl = styleParams.isStoreGallery ? URL_SIZES.DOWNLOAD_SAMPLE : URL_SIZES.DOWNLOAD;
      var downloadLink = createUrl(downloadUrl, URL_TYPES.VIDEO) || createUrl(downloadUrl, URL_TYPES.HIGH_RES);
      var itemProps = {
        target: '_blank',
        href: downloadLink,
        onClick: function onClick(e) {
          e.stopPropagation();
          e.preventDefault();
          window_windowWrapper.open(downloadLink, '_blank');

          _this2.props.actions.eventsListener(events.DOWNLOAD_BUTTON_CLICKED, _this2.props);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.onDownloadKeyPress(e, downloadLink);
        }
      };

      if (type === 'text') {
        return /*#__PURE__*/react_default.a.createElement("div", social_extends({}, genralProps, {
          onClick: function onClick(e) {
            e.stopPropagation();
            e.preventDefault();
            actions.eventsListener(events.TEXT_DOWNLOAD_BUTTON_CLICKED, _this2.props);
          },
          onKeyDown: function onKeyDown(e) {
            return _this2.onDownloadTextKeyPress(e);
          }
        }), downloadIcon);
      } else {
        if (!isDemo) {
          return /*#__PURE__*/react_default.a.createElement("div", social_extends({}, genralProps, {
            download: "download"
          }, itemProps), downloadIcon);
        } else {
          return /*#__PURE__*/react_default.a.createElement("div", social_extends({}, genralProps, {
            download: "download"
          }), downloadIcon);
        }
      }
    }

    return '';
  };

  _proto.onDownloadKeyPress = function onDownloadKeyPress(e, downloadLink) {
    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.stopPropagation();
        e.preventDefault();
        window_windowWrapper.open(downloadLink, '_blank');
        this.props.actions.eventsListener(events.DOWNLOAD_BUTTON_CLICKED, this.props);
        return false;
    }
  };

  _proto.onDownloadTextKeyPress = function onDownloadTextKeyPress(e) {
    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.stopPropagation();
        e.preventDefault();
        this.props.actions.eventsListener(events.TEXT_DOWNLOAD_BUTTON_CLICKED, this.props);
        return false;
    }
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        styleParams = _this$props4.styleParams,
        id = _this$props4.id,
        showShare = _this$props4.showShare,
        isSmallItem = _this$props4.isSmallItem,
        isNarrow = _this$props4.isNarrow,
        isShort = _this$props4.isShort,
        isVerticalContainer = _this$props4.isVerticalContainer;
    var socialShare = this.getSocialShare();
    var loveButton = this.getLoveButton();
    var download = this.getDownload(); //var shopIcons = this.getShopIcons();

    var isShowArrows = styleParams.hasThumbnails;
    var isPopulated = styleParams.allowSocial || styleParams.loveButton || styleParams.allowDownload;
    var textPlacementAboveOrBelowOrRightOrLeft = hasHorizontalPlacement(styleParams.titlePlacement) || hasVerticalPlacement(styleParams.titlePlacement);
    var classes = [[showShare, 'hidden'], [isSmallItem, 'small-item'], [isShort, 'short-item'], [isNarrow, 'narrow-item'], [isVerticalContainer, 'vertical-item'], [isShowArrows, 'with-arrows'], [isPopulated, 'populated-item'], [textPlacementAboveOrBelowOrRightOrLeft, 'text-external-item']].filter(function (x) {
      return x[0];
    }).map(function (x) {
      return x[1];
    }).join(' ');
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'gallery-item-social gallery-item-direction-' + styleParams.galleryTextAlign + ' ' + classes,
      key: 'item-social-' + id,
      "data-hook": "item-social"
    }, loveButton, download, socialShare);
  };

  return Social;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/socialNetworks.js
var SOCIAL_NETWORKS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  PINTEREST: 'pinterest',
  EMAIL: 'email',
  TUMBLR: 'tumblr'
};
/* harmony default export */ var socialNetworks = (SOCIAL_NETWORKS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/facebook.js
function facebook_extends() { facebook_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return facebook_extends.apply(this, arguments); }

function facebook_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var facebook_facebook = function facebook(_ref) {
  var size = _ref.size,
      props = facebook_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", facebook_extends({
    viewBox: "0 0 8 17",
    fill: "currentColor",
    width: size || "8",
    height: size || "17"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M 7.21 0.91C 7.21 1.79 7.21 3.38 7.21 3.38 7.21 3.38 5.38 3.19 4.92 3.89 4.67 4.27 4.82 5.39 4.8 6.19 5.6 6.19 6.42 6.19 7.22 6.19 7.02 7.12 6.87 7.76 6.72 8.57 6.03 8.57 4.79 8.57 4.79 8.57 4.79 8.57 4.79 16.23 4.79 16.23 4.79 16.23 2.5 16.23 1.43 16.23 1.43 13.87 1.43 11.11 1.43 8.6 0.9 8.6 0.52 8.6-0 8.6-0 7.71-0 7.07-0 6.19 0.5 6.19 0.9 6.19 1.41 6.19 1.48 4.42 1.51 2.68 2.39 1.79 3.38 0.79 4.32 0.91 7.21 0.91Z",
    fill: "currentColor"
  }));
};

facebook_facebook.displayName = 'facebook';
/* harmony default export */ var components_facebook = (facebook_facebook);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/pinterest.js
function pinterest_extends() { pinterest_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return pinterest_extends.apply(this, arguments); }

function pinterest_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var pinterest_pinterest = function pinterest(_ref) {
  var size = _ref.size,
      props = pinterest_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", pinterest_extends({
    viewBox: "0 0 15 15",
    fill: "currentColor",
    width: size || "15",
    height: size || "15"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M 7.5 0.01C 3.36 0.01 0 3.37 0 7.5 0 10.69 1.99 13.4 4.79 14.49 4.74 14.01 4.69 13.04 4.83 12.44 4.97 11.85 5.73 8.65 5.73 8.65 5.73 8.65 5.5 8.19 5.5 7.52 5.5 6.46 6.11 5.66 6.88 5.66 7.53 5.66 7.85 6.15 7.85 6.74 7.85 7.39 7.43 8.37 7.21 9.28 7.03 10.04 7.6 10.66 8.34 10.66 9.7 10.66 10.74 9.23 10.74 7.16 10.74 5.34 9.43 4.06 7.56 4.06 5.38 4.06 4.11 5.69 4.11 7.37 4.11 8.03 4.36 8.73 4.68 9.11 4.74 9.19 4.75 9.25 4.73 9.33 4.67 9.57 4.54 10.09 4.52 10.2 4.48 10.34 4.41 10.37 4.26 10.3 3.31 9.86 2.71 8.46 2.71 7.34 2.71 4.93 4.46 2.72 7.76 2.72 10.4 2.72 12.46 4.61 12.46 7.13 12.46 9.76 10.8 11.88 8.5 11.88 7.73 11.88 7 11.48 6.75 11 6.75 11 6.37 12.46 6.28 12.82 6.12 13.43 5.71 14.19 5.4 14.7 6.07 14.89 6.77 15 7.5 15 11.64 15 14.99 11.64 14.99 7.5 14.99 3.37 11.64 0.01 7.5 0.01Z",
    fill: "currentColor"
  }));
};

pinterest_pinterest.displayName = 'pinterest';
/* harmony default export */ var components_pinterest = (pinterest_pinterest);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/twitter.js
function twitter_extends() { twitter_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return twitter_extends.apply(this, arguments); }

function twitter_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var twitter_twitter = function twitter(_ref) {
  var size = _ref.size,
      props = twitter_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", twitter_extends({
    viewBox: "0 0 16 13",
    fill: "currentColor",
    width: size || "16",
    height: size || "13"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M 15.99 1.6C 15.91 2.19 15.04 2.79 14.51 3.23 15.03 10.77 6.33 15.48 0.01 11.66 1.78 11.67 3.78 11.19 4.83 10.21 3.3 9.96 2.21 9.28 1.79 7.94 2.24 7.9 2.87 8.04 3.17 7.85 1.77 7.33 0.66 6.52 0.59 4.68 1.09 4.73 1.35 5.02 1.97 4.95 1.06 4.38 0.03 2.21 0.96 0.61 2.61 2.4 4.66 3.79 7.87 4.05 7.08 0.72 11.57-1.34 13.59 1.06 14.38 0.89 15.04 0.61 15.71 0.33 15.44 1.09 14.88 1.57 14.33 2.06 14.92 1.95 15.55 1.87 15.99 1.6Z",
    fill: "currentColor"
  }));
};

twitter_twitter.displayName = 'twitter';
/* harmony default export */ var components_twitter = (twitter_twitter);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/email.js
function email_extends() { email_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return email_extends.apply(this, arguments); }

function email_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var email_email = function email(_ref) {
  var size = _ref.size,
      props = email_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", email_extends({
    viewBox: "0 0 17 13",
    fill: "currentColor",
    width: size || "17",
    height: size || "13"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M 16.48 0.01C 16.48 0.01 16.11 0.01 16.11 0.01 16.11 0.01 16.11-0 16.11-0 16.11-0 16.1 0.01 16.1 0.01 16.1 0.01 0.96 0.01 0.96 0.01 0.96 0.01 0.95-0 0.95-0 0.95-0 0.94 0.01 0.94 0.01 0.94 0.01 0.52 0.01 0.52 0.01 0.23 0.01 0 0.25 0 0.55 0 0.55 0 12.46 0 12.46 0 12.76 0.23 13 0.52 13 0.52 13 16.48 13 16.48 13 16.77 13 17 12.76 17 12.46 17 12.46 17 0.55 17 0.55 17 0.25 16.77 0.01 16.48 0.01ZM 6.23 5.83C 6.23 5.83 1.05 11.15 1.05 11.15 1.05 11.15 1.05 1.47 1.05 1.47 1.05 1.47 6.23 5.83 6.23 5.83ZM 7.05 6.51C 7.05 6.51 8.2 7.48 8.2 7.48 8.3 7.56 8.41 7.6 8.53 7.6 8.65 7.6 8.76 7.56 8.86 7.48 8.86 7.48 10.01 6.51 10.01 6.51 10.01 6.51 15.28 11.92 15.28 11.92 15.28 11.92 1.78 11.92 1.78 11.92 1.78 11.92 7.05 6.51 7.05 6.51ZM 10.83 5.83C 10.83 5.83 15.95 1.52 15.95 1.52 15.95 1.52 15.95 11.09 15.95 11.09 15.95 11.09 10.83 5.83 10.83 5.83ZM 14.81 1.09C 14.81 1.09 8.53 6.36 8.53 6.36 8.53 6.36 2.25 1.09 2.25 1.09 2.25 1.09 14.81 1.09 14.81 1.09Z",
    fill: "currentColor"
  }));
};

email_email.displayName = 'email';
/* harmony default export */ var components_email = (email_email);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/tumblr.js
function tumblr_extends() { tumblr_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return tumblr_extends.apply(this, arguments); }

function tumblr_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var tumblr_tumblr = function tumblr(_ref) {
  var size = _ref.size,
      props = tumblr_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", tumblr_extends({
    viewBox: "0 0 8 15",
    fill: "currentColor",
    width: size || "8",
    height: size || "15"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M 7.99 6.38C 7.99 6.38 5 6.38 5 6.38 5 6.38 5 10.53 5 10.53 5 11.28 5.09 11.7 6.09 11.7 6.09 11.7 7.99 11.7 7.99 11.7 7.99 11.7 7.99 14.89 7.99 14.89 7.99 14.89 6.99 15 5.89 15 3.3 15 2 13.29 2 11.38 2 11.38 2 6.38 2 6.38 2 6.38 0.01 6.38 0.01 6.38 0.01 6.38 0.01 3.41 0.01 3.41 2.4 3.2 2.6 1.28 2.8 0 2.8 0 5 0 5 0 5 0 5 3.2 5 3.2 5 3.2 7.99 3.2 7.99 3.2 7.99 3.2 7.99 6.38 7.99 6.38Z",
    fill: "currentColor"
  }));
};

tumblr_tumblr.displayName = 'tumblr';
/* harmony default export */ var components_tumblr = (tumblr_tumblr);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/share/share.js
function share_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function share_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }













var share_Share = /*#__PURE__*/function (_GalleryComponent) {
  share_inheritsLoose(Share, _GalleryComponent);

  function Share(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.handleKeyDown = _this.handleKeyDown.bind(share_assertThisInitialized(_this));
    _this.getShareArr = _this.getShareArr.bind(share_assertThisInitialized(_this));
    _this.buttons = [];
    _this.shareArr = _this.getShareArr(_this.props.type);
    _this.state = {
      showShare: false,
      focusedShareIcon: 0
    };
    return _this;
  }

  var _proto = Share.prototype;

  _proto.getShareArr = function getShareArr(type) {
    return type === 'text' ? ['facebook', 'twitter', 'tumblr', 'email'] : ['facebook', 'twitter', 'pinterest', 'tumblr', 'email'];
  };

  _proto.handleKeyDown = function handleKeyDown(e, type) {
    if (this.state.showShare) {
      switch (e.keyCode || e.charCode) {
        case 38: //up

        case 37: //left

        case 33:
          //page up
          e.preventDefault();
          e.stopPropagation();
          utils.setStateAndLog(this, 'Share Keypress', {
            focusedShareIcon: Math.max(1, this.state.focusedShareIcon - 1)
          });
          return false;

        case 39: //right

        case 40: //down

        case 34:
          //page down
          e.preventDefault();
          e.stopPropagation();
          utils.setStateAndLog(this, 'Share Keypress', {
            focusedShareIcon: Math.min(type === 'text' ? 4 : 5, this.state.focusedShareIcon + 1)
          });
          return false;

        case 9: //tab

        case 27:
          //esc
          e.preventDefault();
          e.stopPropagation();
          this.props.actions.toggleShare(e, false);
          utils.setStateAndLog(this, 'Share Keypress', {
            showShare: false,
            focusedShareIcon: 0
          });
          return false;
      }
    }

    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.preventDefault();
        e.stopPropagation();

        if (this.state.showShare) {
          var allProps = this.props.allProps;
          var shareData = {
            network: this.shareArr[this.state.focusedShareIcon - 1],
            shareProps: allProps
          };
          this.props.actions.eventsListener(events.SHARE_BUTTON_CLICKED, shareData);
          this.props.actions.toggleShare(e, false);
          utils.setStateAndLog(this, 'Share Keypress', {
            showShare: false,
            focusedShareIcon: 0
          });
        } else {
          this.props.actions.toggleShare(e, true);
          utils.setStateAndLog(this, 'Share Keypress', {
            showShare: true,
            focusedShareIcon: 1
          });
        }

        return false;
    }

    return true;
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.showShare && !this.state.showShare) {
      utils.setStateAndLog(this, 'props.showShare is true', {
        showShare: true
      });
    } else if (!this.props.showShare && this.state.showShare) {
      utils.setStateAndLog(this, 'props.showShare is false', {
        showShare: false
      });
    }

    try {
      if ((viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode()) && !utils.isMobile() && window.document && window.document.activeElement && window.document.activeElement.className) {
        var activeElement = window.document.activeElement;

        var isShareItemInFocus = function isShareItemInFocus() {
          return String(activeElement.className).indexOf('network-') >= 0;
        };

        if (!this.state.showShare && isShareItemInFocus()) {
          this.socialShareBox.focus();
          return;
        }
      }

      var focusedButton = this.state.focusedShareIcon;

      if (focusedButton > 0) {
        this.buttons[focusedButton - 1].focus();
      }
    } catch (e) {
      console.warn('Cannot focus on share icon', this.props.focus, e);
    }
  };

  _proto.getShareSvg = function getShareSvg(network) {
    switch (network.toLowerCase()) {
      case socialNetworks.FACEBOOK:
        return components_facebook;

      case socialNetworks.TWITTER:
        return components_twitter;

      case socialNetworks.PINTEREST:
        return components_pinterest;

      case socialNetworks.EMAIL:
        return components_email;

      default:
      case socialNetworks.TUMBLR:
        return components_tumblr;
    }
  };

  _proto.getShareItem = function getShareItem(network, idx) {
    var _this2 = this;

    var allProps = this.props.allProps;
    var shareIconsNumber = this.shareArr.length;
    var ShareIcon = this.getShareSvg(network);
    return /*#__PURE__*/react_default.a.createElement("button", {
      className: "block-fullscreen has-custom-focus network-" + (idx + 1) + (viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode() ? '' : ' inactive '),
      style: {
        top: this.props.isVerticalContainer ? "calc(100% / 6 * " + (idx + 1) + " + -10px " + (shareIconsNumber === 4 ? '+ 100% / 12' : '') + ")" : '',
        left: this.props.isVerticalContainer ? '' : "calc(100% / 6 * " + (idx + 1) + " + -10px " + (shareIconsNumber === 4 ? '+ 100% / 12' : '') + ")"
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        var shareData = {
          network: network,
          shareProps: allProps
        };

        _this2.props.actions.eventsListener(events.SHARE_BUTTON_CLICKED, shareData);
      },
      "data-hook": network + '-share-button',
      ref: function ref(button) {
        return _this2.buttons[idx] = button;
      },
      title: "Share on " + network,
      "aria-live": "assertive",
      role: "menuitem",
      tabIndex: -1,
      key: network + '-share-icon'
    }, /*#__PURE__*/react_default.a.createElement(ShareIcon, {
      size: "18"
    }));
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        styleParams = _this$props.styleParams,
        id = _this$props.id,
        isVerticalContainer = _this$props.isVerticalContainer,
        actions = _this$props.actions,
        style = _this$props.style,
        type = _this$props.type;

    if (styleParams.allowSocial) {
      var minDimension = 200;
      return /*#__PURE__*/react_default.a.createElement("div", {
        "data-hook": "social-share-box",
        className: 'block-fullscreen gallery-item-social-share-box ' + (this.props.showShare ? ' opened ' : ' hidden ') + (this.state.showShare ? ' hovered ' : '') + (isVerticalContainer ? ' vertical-item ' : ''),
        ref: function ref(e) {
          return _this3.socialShareBox = e;
        },
        onClick: function onClick(e) {
          return actions.toggleShare(e, false);
        },
        onMouseOut: function onMouseOut(e) {
          return actions.toggleShare(e, false);
        },
        style: {
          transform: isVerticalContainer ? 'translateY(-50%) ' + (style.height > minDimension ? '' : 'scale(' + style.height / minDimension + ')') : 'translateX(-50%) ' + (style.width > minDimension ? '' : 'scale(' + style.width / minDimension + ')')
        },
        tabIndex: styleParams.isSlideshow && this.props.currentIdx === this.props.idx ? 0 : -1,
        onKeyDown: function onKeyDown(e) {
          return _this3.handleKeyDown(e, type);
        },
        "aria-label": 'Share',
        role: "menu",
        key: 'item-social-share-container-' + id
      }, this.shareArr.map(function (network, i) {
        return _this3.getShareItem(network, i);
      }));
    }

    return false;
  };

  return Share;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/scrollAnimations.js
var SCROLL_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  FADE_IN: 'FADE_IN',
  GRAYSCALE: 'GRAYSCALE',
  SLIDE_UP: 'SLIDE_UP',
  EXPAND: 'EXPAND',
  SHRINK: 'SHRINK',
  ZOOM_OUT: 'ZOOM_OUT',
  ONE_COLOR: 'ONE_COLOR',
  MAIN_COLOR: 'MAIN_COLOR',
  BLUR: 'BLUR'
};
/* harmony default export */ var scrollAnimations = (SCROLL_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/cssScrollHelper.js






var cssScrollHelper_CssScrollHelper = /*#__PURE__*/function () {
  function CssScrollHelper() {
    this.pgScrollSteps = [40960, 20480, 10240, 5120, 2560, 1280, 640, 320, 160, 80, 40, 20, 10];
    this.pgScrollClassName = 'pgscl';
    this.screenSize = Math.max(window_windowWrapper.screen.width, window_windowWrapper.screen.height);
    this.scrollCss = [];
    this.scrollCssProps = [];
    this.calcScrollPaddings(false);
  }

  var _proto = CssScrollHelper.prototype;

  _proto.calcScrollPaddings = function calcScrollPaddings(allowPreloading) {
    var _this = this;

    if (allowPreloading === void 0) {
      allowPreloading = true;
    }

    //padding: [belowScreen, aboveScreen]
    //padding: [above images, below image]
    this.allPagePadding = function () {
      return [Infinity, Infinity];
    };

    this.inScreenPadding = function () {
      return [0, 0];
    };

    this.aboveScreenPadding = function () {
      return [0, Infinity];
    };

    this.justBelowScreenPadding = function (itemHeight) {
      return [Infinity, -1 * (itemHeight + _this.screenSize)];
    };

    this.justBelowAndAboveScreenPadding = function () {
      return [2560, Infinity];
    };

    this.justBelowAndInScreenPadding = function () {
      return [5120, 0];
    };

    this.belowScreenPadding = function () {
      return [Infinity, 0];
    };

    this.highResPadding = function () {
      return allowPreloading ? [5120, Infinity] : [0, 0];
    };

    this.lowResPadding = function () {
      return allowPreloading ? [10240, Infinity] : [0, 0];
    };
  };

  _proto.getSellectorDomId = function getSellectorDomId(_ref) {
    var id = _ref.id,
        idx = _ref.idx;
    var shortId = String(id).replace(/[\W]+/g, '');
    return "pgi" + shortId + "_" + idx;
  };

  _proto.buildScrollClassName = function buildScrollClassName(domId, idx, val) {
    var shortId = String(domId).replace(/[\W]+/g, '').slice(-8);
    return this.pgScrollClassName + "_" + shortId + "_" + val + "-" + (this.pgScrollSteps[idx] + Number(val));
  };

  _proto.calcScrollClasses = function calcScrollClasses(domId, scrollTop) {
    var _this2 = this;

    return this.pgScrollClassName + "-" + scrollTop + " " + this.pgScrollSteps.map(function (step, idx) {
      return _this2.buildScrollClassName(domId, idx, Math.floor(scrollTop / step) * step);
    }).join(' ');
  };

  _proto.calcScrollCss = function calcScrollCss(_ref2) {
    var _this3 = this;

    var domId = _ref2.domId,
        items = _ref2.items,
        styleParams = _ref2.styleParams,
        allowPreloading = _ref2.allowPreloading,
        isUnknownWidth = _ref2.isUnknownWidth;

    if (!(items && items.length)) {
      return [];
    }

    this.screenSize = styleParams.oneRow ? Math.min(window_windowWrapper.outerWidth, window_windowWrapper.screen.width) : Math.min(window_windowWrapper.outerHeight, window_windowWrapper.screen.height);

    if (!styleParams.oneRow && utils.isMobile()) {
      this.screenSize += 50;
    }

    this.calcScrollPaddings(allowPreloading);

    var _items$slice = items.slice(-1),
        lastItem = _items$slice[0];

    var _lastItem$offset = lastItem.offset,
        top = _lastItem$offset.top,
        right = _lastItem$offset.right;
    var maxStep = this.pgScrollSteps[0];
    this.minHeight = 0 - maxStep;
    this.maxHeight = (Math.ceil(((styleParams.oneRow ? right : top) + this.screenSize) / maxStep) + 1) * maxStep;
    return items.map(function (item) {
      return _this3.calcScrollCssForItem({
        domId: domId,
        item: item,
        styleParams: styleParams,
        isUnknownWidth: isUnknownWidth
      });
    });
  };

  _proto.shouldCalcScrollCss = function shouldCalcScrollCss(_ref3) {
    var type = _ref3.type;

    if (type === 'video' || type === 'text') {
      return false;
    }

    return true;
  };

  _proto.createScrollSelectorsFunction = function createScrollSelectorsFunction(_ref4) {
    var _this4 = this;

    var domId = _ref4.domId,
        item = _ref4.item,
        styleParams = _ref4.styleParams;
    var imageTop = styleParams.oneRow ? item.offset.left - this.screenSize : item.offset.top - this.screenSize;
    var imageBottom = styleParams.oneRow ? item.offset.left + item.width : item.offset.top + item.height;
    var minStep = this.pgScrollSteps[this.pgScrollSteps.length - 1];

    var ceil = function ceil(num, step) {
      return Math.ceil(Math.min(_this4.maxHeight, num) / step) * step;
    };

    var floor = function floor(num, step) {
      return Math.floor(Math.max(_this4.minHeight, num) / step) * step;
    };

    var sellectorDomId = this.getSellectorDomId(item);
    return function (padding, suffix) {
      var before = padding[0],
          after = padding[1];

      if (before === Infinity && after === Infinity) {
        return "#pro-gallery-" + domId + " #" + sellectorDomId + " " + suffix;
      }

      var from = floor(imageTop - before, minStep);
      var to = ceil(imageBottom + after, minStep); // if (utils.isVerbose()) {
      //   console.log(
      //     `CSS SCROLL - item #${item.idx} display range is: (${from} - ${to})`,
      //   );
      // }

      var scrollClasses = [];

      while (from < to) {
        var largestDividerIdx = _this4.pgScrollSteps.findIndex(function (step) {
          return from % step === 0 && from + step <= to;
        }); //eslint-disable-line


        if (largestDividerIdx === -1) {
          console.error("largestDividerIdx is -1. Couldn't find index in pgScrollSteps array.\nfrom =", from, '\nto =', to, '\npadding[0] =', padding[0], '\npadding[1] =', padding[1]);
          break;
        }

        scrollClasses.push("." + _this4.buildScrollClassName(domId, largestDividerIdx, from) + " ~ div #" + sellectorDomId + " " + suffix);
        from += _this4.pgScrollSteps[largestDividerIdx]; // console.count('pgScroll class created');
      }

      return scrollClasses.join(', ');
    };
  };

  _proto.calcScrollCssForItem = function calcScrollCssForItem(_ref5) {
    var domId = _ref5.domId,
        item = _ref5.item,
        styleParams = _ref5.styleParams,
        isUnknownWidth = _ref5.isUnknownWidth;
    var type = item.type,
        createUrl = item.createUrl,
        idx = item.idx;
    var itemTag = utils.hasNativeLazyLoadSupport() ? 'img' : 'canvas';
    var scrollCss = '';
    var createScrollSelectors = this.createScrollSelectorsFunction({
      domId: domId,
      item: item,
      styleParams: styleParams
    });

    if (type !== 'text') {
      //load hi-res image + loading transition
      if (!isUnknownWidth && !item.isDimensionless) {
        //FAKE SSR
        var selector = createScrollSelectors(this.highResPadding(), "." + type + "-item>" + itemTag);

        if (utils.hasNativeLazyLoadSupport()) {
          scrollCss += selector + "{opacity: 1; transition: opacity 1s linear;}";
        } else {
          scrollCss += selector + ("{opacity: 1; transition: opacity 1s linear; background-image: url(" + createUrl(URL_SIZES.RESIZED, URL_TYPES.HIGH_RES) + ")}");
        }
      } //add the blurry image/color


      if (!utils.deviceHasMemoryIssues() && styleParams.imageLoadingMode === loadingMode.BLUR && (!item.isTransparent || isUnknownWidth) && !item.isDimensionless) {
        scrollCss += createScrollSelectors(this.lowResPadding(), ".image-item") + ("{background-image: url(" + createUrl(URL_SIZES.RESIZED, URL_TYPES.LOW_RES) + ")}");
      }

      if (!utils.deviceHasMemoryIssues() && styleParams.imageLoadingMode === loadingMode.MAIN_COLOR && (!item.isTransparent || isUnknownWidth) && //FAKE SSR
      !item.isDimensionless) {
        scrollCss += createScrollSelectors(this.lowResPadding(), ' .image-item') + ("{background-size: 0.3px; background-repeat: repeat; background-image: url(" + createUrl(URL_SIZES.PIXEL, URL_TYPES.HIGH_RES) + ")}");
      }
    } //scrollAnimation


    scrollCss += this.createScrollAnimationsIfNeeded({
      idx: idx,
      item: item,
      styleParams: styleParams,
      createScrollSelectors: createScrollSelectors
    }); // if (utils.isVerbose()) {
    //   console.log(
    //     'CSS SCROLL - css calc for item #' + idx,
    //     item,
    //     this.scrollCss[idx],
    //   );
    // }

    this.scrollCss[idx] = scrollCss || this.scrollCss[idx];
    return this.scrollCss[idx]; // console.count('pgScroll item created');
  };

  _proto.createScrollAnimationsIfNeeded = function createScrollAnimationsIfNeeded(_ref6) {
    var idx = _ref6.idx,
        styleParams = _ref6.styleParams,
        createScrollSelectors = _ref6.createScrollSelectors;
    var scrollAnimation = styleParams.scrollAnimation;

    if (utils.isSSR()) {
      return '';
    }

    if (!scrollAnimation || scrollAnimation === scrollAnimations.NO_EFFECT) {
      return '';
    }

    var _randomTiming = (idx % 3 + 1) * 100; //100 - 300


    var animationPreparationPadding = this.allPagePadding();
    var animationActivePadding = this.aboveScreenPadding();
    var scrollAnimationCss = '';
    var itemTag = utils.hasNativeLazyLoadSupport() ? 'img' : 'canvas'; // notice: these 2 animations must have the blurry image

    if (scrollAnimation === scrollAnimations.MAIN_COLOR) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .image-item') + "{background-size: 1px; background-repeat: repeat;}";
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, " " + itemTag) + ("{filter: opacity(0); transition: filter 1." + _randomTiming + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, " " + itemTag) + "{filter: opacity(1) !important;}";
    }

    if (scrollAnimation === scrollAnimations.BLUR) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, " " + itemTag) + ("{filter: opacity(0); transition: filter 1." + _randomTiming + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, " " + itemTag) + "{filter: opacity(1) !important;}";
    }

    if (scrollAnimation === scrollAnimations.FADE_IN) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{filter: opacity(0); transition: filter 1." + _randomTiming + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{filter: opacity(1) !important;}";
    }

    if (scrollAnimation === scrollAnimations.GRAYSCALE) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{filter: grayscale(100%); transition: filter 1." + (200 + _randomTiming) + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{filter: grayscale(0) !important;}";
    }

    if (scrollAnimation === scrollAnimations.SLIDE_UP) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + "{transform: translateY(100px); transition: transform 0.8s cubic-bezier(.13,.78,.53,.92) !important;}";
      scrollAnimationCss += createScrollSelectors(animationActivePadding, '') + "{transform: translateY(0) !important;}";
    }

    if (scrollAnimation === scrollAnimations.EXPAND) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + "{transform: scale(0.95); transition: transform 1s cubic-bezier(.13,.78,.53,.92) !important;}";
      scrollAnimationCss += createScrollSelectors(animationActivePadding, '') + "{transform: scale(1) !important;}";
    }

    if (scrollAnimation === scrollAnimations.SHRINK) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + "{transform: scale(1.05); transition: transform 1s cubic-bezier(.13,.78,.53,.92) !important;}";
      scrollAnimationCss += createScrollSelectors(animationActivePadding, '') + "{transform: scale(1) !important;}";
    }

    if (scrollAnimation === scrollAnimations.ZOOM_OUT) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + "{transform: scale(1.1); transition: transform 1.2s cubic-bezier(.13,.78,.53,.92) !important;}";
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{transform: scale(1) !important;}";
    }

    if (scrollAnimation === scrollAnimations.ONE_COLOR) {
      var oneColorAnimationColor = styleParams.oneColorAnimationColor && styleParams.oneColorAnimationColor.value ? styleParams.oneColorAnimationColor.value : 'transparent';
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + ("{background-color: " + oneColorAnimationColor + ";}");
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{filter: opacity(0); transition: filter 0." + (600 + _randomTiming) + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{filter: opacity(1) !important;}";
    }

    return scrollAnimationCss;
  };

  return CssScrollHelper;
}();

var cssScrollHelper = new cssScrollHelper_CssScrollHelper(); // Testing the best combination of scroll steps (goal is to reduce the number of classe sper item to minimum)
// ----------------------------------------------------------------------------------------------------------
// pgScrollSteps = [1000, 100, 10]; -> 6759 / 354 = 19 classes per item
// pgScrollSteps = [2500, 500, 100, 20]; -> 4137 / 354 = 11.6 classes per item
// pgScrollSteps = [2560, 1280, 640, 320, 160, 80, 40, 20]; -> 2502 / 354 = 7 classes per item
// pgScrollSteps = [5120, 2560, 1280, 640, 320, 160, 80, 40, 20]; -> 2502 / 354 = 7 classes per item
// pgScrollSteps = [5120, 2560, 1280, 640, 320, 160, 80, 40, 20, 10]; -> 2772 / 354 = 7.8 classes per item
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/itemClick.js
var ITEM_CLICK = {
  EXPAND: 'expand',
  LINK: 'link',
  NOTHING: 'nothing',
  FULLSCREEN: 'fullscreen'
};
/* harmony default export */ var constants_itemClick = (ITEM_CLICK);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/overlayAnimations.js
var OVERLAY_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  FADE_IN: 'FADE_IN',
  EXPAND: 'EXPAND',
  SLIDE_UP: 'SLIDE_UP',
  SLIDE_RIGHT: 'SLIDE_RIGHT'
};
/* harmony default export */ var overlayAnimations = (OVERLAY_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/imageHoverAnimations.js
var IMAGE_HOVER_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  ZOOM_IN: 'ZOOM_IN',
  BLUR: 'BLUR',
  GRAYSCALE: 'GRAYSCALE',
  SHRINK: 'SHRINK',
  INVERT: 'INVERT',
  COLOR_IN: 'COLOR_IN',
  DARKENED: 'DARKENED'
};
/* harmony default export */ var imageHoverAnimations = (IMAGE_HOVER_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemViewStyleProvider.js
function itemViewStyleProvider_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function itemViewStyleProvider_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { itemViewStyleProvider_ownKeys(Object(source), true).forEach(function (key) { itemViewStyleProvider_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { itemViewStyleProvider_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function itemViewStyleProvider_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function getContainerStyle(styleParams) {
  return itemViewStyleProvider_objectSpread({}, (styleParams.imageInfoType === infoType.ATTACHED_BACKGROUND || hasHoverPlacement(styleParams.titlePlacement)) && itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, getBorderStyle(styleParams.itemBorderRadius, styleParams.itemBorderWidth, styleParams.itemBorderColor)), boxShadow(styleParams)));
}

function boxShadow(styleParams) {
  var _boxShadow = {};

  if (styleParams.itemEnableShadow) {
    var itemShadowBlur = styleParams.itemShadowBlur,
        itemShadowDirection = styleParams.itemShadowDirection,
        itemShadowSize = styleParams.itemShadowSize;
    var alpha = -1 * (Number(itemShadowDirection) - 90) / 360 * 2 * Math.PI;
    var shadowX = Math.round(itemShadowSize * Math.cos(alpha));
    var shadowY = Math.round(-1 * itemShadowSize * Math.sin(alpha));
    _boxShadow = {
      boxShadow: shadowX + "px " + shadowY + "px " + itemShadowBlur + "px " + styleParams.itemShadowOpacityAndColor.value
    };
  }

  return _boxShadow;
}

function getImageStyle(styleParams) {
  return itemViewStyleProvider_objectSpread({}, !hasHoverPlacement(styleParams.titlePlacement) && (styleParams.imageInfoType === infoType.NO_BACKGROUND || styleParams.imageInfoType === infoType.SEPARATED_BACKGROUND) && itemViewStyleProvider_objectSpread({}, getBorderStyle(styleParams.itemBorderRadius, styleParams.itemBorderWidth, styleParams.itemBorderColor)));
}

function getBorderStyle(borderRadius, borderWidth, borderColor) {
  return itemViewStyleProvider_objectSpread({
    overflow: 'hidden',
    borderRadius: borderRadius,
    borderWidth: borderWidth + 'px',
    borderColor: borderColor && borderColor.value
  }, borderWidth && {
    borderStyle: 'solid'
  });
}

function getOuterInfoStyle(placement, styleParams, mediaHeight, textBoxHeight) {
  var styles = itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, hasHorizontalPlacement(placement) && {
    height: mediaHeight,
    "float": isRightPlacement(placement) ? 'right' : 'left'
  }), hasVerticalPlacement(placement) && {
    height: textBoxHeight,
    boxSizing: 'content-box'
  });

  if (styleParams.imageInfoType === infoType.SEPARATED_BACKGROUND) {
    return itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, styles), getBorderStyle(styleParams.textBoxBorderRadius, styleParams.textBoxBorderWidth, styleParams.textBoxBorderColor)), hasAbovePlacement(placement) && {
      marginBottom: styleParams.textImageSpace
    }), hasBelowPlacement(placement) && {
      marginTop: styleParams.textImageSpace
    });
  }

  return styles;
}

function getInfoHorizontalPadding(styleParams) {
  if (styleParams.imageInfoType === infoType.SEPARATED_BACKGROUND || styleParams.imageInfoType === infoType.ATTACHED_BACKGROUND) {
    return styleParams.textsHorizontalPadding + 30;
  }

  return styleParams.textsHorizontalPadding;
}

function getInnerInfoStylesAboveOrBelow(styleParams, infoHeight) {
  return {
    width: '100%',
    height: infoHeight,
    paddingBottom: styleParams.textsVerticalPadding + 15 + 'px',
    paddingTop: styleParams.textsVerticalPadding + 15 + 'px',
    paddingRight: getInfoHorizontalPadding(styleParams) + 'px',
    paddingLeft: getInfoHorizontalPadding(styleParams) + 'px'
  };
}

function getInnerInfoStylesRightOrLeft(styleParams, infoWidth) {
  return {
    height: '100%',
    width: infoWidth
  };
}

function getInnerInfoStyle(placement, styleParams, infoHeight, infoWidth) {
  var commonStyles = itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, (styleParams.imageInfoType === infoType.SEPARATED_BACKGROUND || styleParams.imageInfoType === infoType.ATTACHED_BACKGROUND) && styleParams.textBoxFillColor && styleParams.textBoxFillColor.value && {
    backgroundColor: styleParams.textBoxFillColor.value
  }), {}, {
    textAlign: styleParams.galleryTextAlign,
    overflow: 'hidden',
    boxSizing: 'border-box'
  });

  var infoAboveOrBelow = hasVerticalPlacement(placement);
  var infoRightOrLeft = hasHorizontalPlacement(placement);
  return itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, commonStyles), infoAboveOrBelow && getInnerInfoStylesAboveOrBelow(styleParams, infoHeight)), infoRightOrLeft && getInnerInfoStylesRightOrLeft(styleParams, infoWidth));
}
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemView.js
function itemView_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function itemView_extends() { itemView_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return itemView_extends.apply(this, arguments); }

function itemView_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function itemView_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { itemView_ownKeys(Object(source), true).forEach(function (key) { itemView_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { itemView_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function itemView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function itemView_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function itemView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
























var itemView_ItemView = /*#__PURE__*/function (_GalleryComponent) {
  itemView_inheritsLoose(ItemView, _GalleryComponent);

  function ItemView(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;

    itemView_defineProperty(itemView_assertThisInitialized(_this), "shouldUseDirectLink", function () {
      var directLink = _this.props.directLink;

      var _ref = directLink || {},
          url = _ref.url,
          target = _ref.target;

      var useDirectLink = !!(url && target && _this.props.styleParams.itemClick === 'link');
      var shouldUseDirectLinkMobileSecondClick = _this.shouldShowHoverOnMobile() && _this.isClickOnCurrentHoveredItem() && useDirectLink;

      if (shouldUseDirectLinkMobileSecondClick) {
        _this.props.actions.eventsListener(events.HOVER_SET, -1);

        return true;
      }

      if (useDirectLink && !_this.shouldShowHoverOnMobile()) {
        return true;
      }

      return false;
    });

    itemView_defineProperty(itemView_assertThisInitialized(_this), "isClickOnCurrentHoveredItem", function () {
      return _this.state.isCurrentHover;
    });

    _this.props.actions.eventsListener(events.ITEM_CREATED, _this.props);

    _this.init();

    _this.state = {
      failed: false,
      loaded: false,
      displayed: false,
      retries: 0,
      showShare: false,
      isCurrentHover: false,
      itemWasHovered: false
    };
    _this.activeElement = '';
    return _this;
  } //-------------------------------------------| INIT |--------------------------------------------//


  var _proto = ItemView.prototype;

  _proto.init = function init() {
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemWrapperClick = this.onItemWrapperClick.bind(this);
    this.onItemInfoClick = this.onItemInfoClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleItemMouseDown = this.handleItemMouseDown.bind(this);
    this.handleItemMouseUp = this.handleItemMouseUp.bind(this);
    this.setItemLoaded = this.setItemLoaded.bind(this);
    this.setItemError = this.setItemError.bind(this);
    this.isVerticalContainer = this.isVerticalContainer.bind(this);
    this.isHighlight = this.isHighlight.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
    this.getShare = this.getShare.bind(this);
    this.getItemHover = this.getItemHover.bind(this);
    this.getImageItem = this.getImageItem.bind(this);
    this.getVideoItem = this.getVideoItem.bind(this);
    this.getVideoItemPlaceholder = this.getVideoItemPlaceholder.bind(this);
    this.getTextItem = this.getTextItem.bind(this);
    this.getItemInner = this.getItemInner.bind(this);
    this.getItemContainerStyles = this.getItemContainerStyles.bind(this);
    this.getItemWrapperStyles = this.getItemWrapperStyles.bind(this);
    this.getItemAriaLabel = this.getItemAriaLabel.bind(this);
    this.getItemContainerClass = this.getItemContainerClass.bind(this);
    this.getItemWrapperClass = this.getItemWrapperClass.bind(this);
    this.getItemContainerTabIndex = this.getItemContainerTabIndex.bind(this);
    this.isIconTag = this.isIconTag.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.changeActiveElementIfNeeded = this.changeActiveElementIfNeeded.bind(this);
    this.checkIfCurrentHoverChanged = this.checkIfCurrentHoverChanged.bind(this);
    this.getCustomInfoRendererProps = this.getCustomInfoRendererProps.bind(this);
  } //----------------------------------------| ACTIONS |-------------------------------------------//
  ;

  _proto.setItemError = function setItemError() {
    this.setState({
      retries: this.state.retries + 1,
      failed: this.state.retries >= 3
    });
  };

  _proto.setItemLoaded = function setItemLoaded() {
    var _this2 = this;

    this.props.actions.eventsListener(events.ITEM_LOADED, this.props);
    this.setState({
      failed: false,
      loaded: true
    });
    this.itemLoadedTimeout = setTimeout(function () {
      _this2.setState(function () {
        return {
          displayed: true
        };
      });
    }, 1500);
  };

  _proto.isIconTag = function isIconTag(tagName) {
    return ['button', 'i', 'a', 'svg', 'path'].indexOf(tagName.toLowerCase()) >= 0;
  };

  _proto.toggleShare = function toggleShare(event, forceVal) {
    event.stopPropagation();
    event.preventDefault();

    if (event.type === 'mouseout' && (this.isIconTag(event.target.tagName) || event.relatedTarget && this.isIconTag(event.relatedTarget.tagName))) {
      //mouseout event should not be fired if hovering over icons (tag name === I)
      return;
    }

    this.setState({
      showShare: typeof forceVal === 'undefined' ? !this.state.showShare : !!forceVal
    });
  };

  _proto.onMouseOver = function onMouseOver() {
    if (!utils.isMobile()) {
      this.props.actions.eventsListener(events.HOVER_SET, this.props.idx);
    }
  };

  _proto.onKeyPress = function onKeyPress(e) {
    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.preventDefault();
        e.stopPropagation();
        var clickTarget = 'item-container';
        this.onItemClick(e, clickTarget); //pressing enter or space always behaves as click on main image, even if the click is on a thumbnail

        if (this.shouldUseDirectLink()) {
          this.itemAnchor.click(); // when directLink, we want to simulate the 'enter' or 'space' press on an <a> element
        }

        return false;

      default:
        return true;
    }
  };

  _proto.handleGalleryItemAction = function handleGalleryItemAction(e) {
    this.props.actions.eventsListener(events.ITEM_ACTION_TRIGGERED, this.props, e);
  };

  _proto.onItemWrapperClick = function onItemWrapperClick(e) {
    var clickTarget = 'item-media';
    this.onItemClick(e, clickTarget);
  };

  _proto.onItemInfoClick = function onItemInfoClick(e) {
    var clickTarget = 'item-info';
    this.onItemClick(e, clickTarget);
  };

  _proto.onItemClick = function onItemClick(e, clickTarget) {
    if (utils.isFunction(utils.get(window_windowWrapper, 'galleryWixCodeApi.onItemClicked'))) {
      window_windowWrapper.galleryWixCodeApi.onItemClicked(this.props); //TODO remove after OOI is fully integrated
    }

    this.props.actions.eventsListener(events.ITEM_CLICKED, itemView_objectSpread(itemView_objectSpread({}, this.props), {}, {
      clickTarget: clickTarget
    }), e);

    if (this.shouldUseDirectLink()) {
      return;
    }

    e.preventDefault();

    if (this.shouldShowHoverOnMobile()) {
      this.handleHoverClickOnMobile(e);
    } else {
      this.handleGalleryItemAction(e);
    }
  };

  _proto.handleHoverClickOnMobile = function handleHoverClickOnMobile(e) {
    if (this.isClickOnCurrentHoveredItem()) {
      this.handleGalleryItemAction(e);
      this.props.actions.eventsListener(events.HOVER_SET, -1);
    } else {
      this.props.actions.eventsListener(events.HOVER_SET, this.props.idx);
    }
  };

  _proto.handleItemMouseDown = function handleItemMouseDown() {
    //check for long press
    // if (utils.isMobile()) {
    //   clearTimeout(this.longPressTimer);
    //   this.longPressTimer = setTimeout(() => {
    //     e.preventDefault(); //prevent default only after a long press (so that scroll will not break)
    //     //do something
    //   }, 500);
    // }
    return true; //make sure the default event behaviour continues
  };

  _proto.handleItemMouseUp = function handleItemMouseUp() {
    if (utils.isMobile() && this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }

    return true; //make sure the default event behaviour continues
  } //-----------------------------------------| UTILS |--------------------------------------------//
  ;

  _proto.isSmallItem = function isSmallItem() {
    if (this.props.styleParams.isSlideshow) {
      return false;
    }

    var isSmallItem;
    var maxWidth = 90;
    var maxHeight = 90;

    if (this.props.styleParams.cubeImages && this.props.styleParams.cubeType === 'fit') {
      if (this.props.style.orientation === 'landscape') {
        //wide image
        isSmallItem = this.props.style.width / this.props.style.ratio <= maxHeight;
      } else {
        //tall image
        isSmallItem = this.props.style.height * this.props.style.ratio <= maxWidth;
      }
    } else {
      isSmallItem = this.props.style.width <= maxWidth || this.props.style.height <= maxHeight;
    }

    return isSmallItem;
  };

  _proto.isNarrow = function isNarrow() {
    return this.props.style.width < 200;
  };

  _proto.isShort = function isShort() {
    return this.props.style.height < 150;
  };

  _proto.isVerticalContainer = function isVerticalContainer() {
    return this.props.style.width < this.props.style.height + 3; //at least in Grid, sometimes not all the columns are the same width (x), and a column can contain items that have height x and width x+1, so increased to 3.
  };

  _proto.shouldShowHoverOnMobile = function shouldShowHoverOnMobile() {
    if (utils.isMobile()) {
      var _this$props$stylePara = this.props.styleParams,
          allowDescription = _this$props$stylePara.allowDescription,
          allowTitle = _this$props$stylePara.allowTitle,
          titlePlacement = _this$props$stylePara.titlePlacement,
          hoveringBehaviour = _this$props$stylePara.hoveringBehaviour,
          itemClick = _this$props$stylePara.itemClick,
          alwaysShowHover = _this$props$stylePara.alwaysShowHover,
          previewHover = _this$props$stylePara.previewHover;
      var isNewMobileSettings = featureManager.supports.mobileSettings;

      if (hoveringBehaviour === infoBehaviourOnHover.NEVER_SHOW) {
        return false;
      }

      if (itemClick === 'nothing' && this.props.type !== 'video') {
        return true;
      } else if ((allowTitle || allowDescription) && hasHoverPlacement(titlePlacement) && hoveringBehaviour !== infoBehaviourOnHover.NEVER_SHOW && isNewMobileSettings) {
        return true;
      }

      if (alwaysShowHover) {
        return true;
      }

      if (viewModeWrapper_isEditMode() && previewHover) {
        return true;
      }
    }

    return false;
  };

  _proto.isHighlight = function isHighlight() {
    return this.props.thumbnailHighlightId && this.props.thumbnailHighlightId === this.props.id;
  };

  _proto.shouldHover = function shouldHover() {
    //see if this could be decided in the preset
    var styleParams = this.props.styleParams;
    var alwaysShowHover = styleParams.alwaysShowHover,
        previewHover = styleParams.previewHover,
        hoveringBehaviour = styleParams.hoveringBehaviour;
    var NEVER_SHOW = infoBehaviourOnHover.NEVER_SHOW,
        APPEARS = infoBehaviourOnHover.APPEARS;

    if (hoveringBehaviour === NEVER_SHOW) {
      return false;
    } else if (alwaysShowHover === true) {
      return true;
    } else if (viewModeWrapper_isEditMode() && previewHover) {
      return true;
    } else if (!this.state.itemWasHovered && hoveringBehaviour === APPEARS) {
      return false;
    } else if (utils.isMobile()) {
      return this.shouldShowHoverOnMobile();
    } else {
      return true;
    }
  } //---------------------------------------| COMPONENTS |-----------------------------------------//
  ;

  _proto.getImageDimensions = function getImageDimensions() {
    //image dimensions are for images in grid fit - placing the image with positive margins to show it within the square
    if (this.props.isUnknownWidth) {
      return {};
    }

    var _this$props = this.props,
        styleParams = _this$props.styleParams,
        cubeRatio = _this$props.cubeRatio,
        style = _this$props.style;
    var isLandscape = style.ratio >= cubeRatio; //relative to container size

    var imageMarginLeft = Math.round((style.height * style.ratio - style.width) / -2);
    var imageMarginTop = Math.round((style.width / style.ratio - style.height) / -2);
    var isGridFit = styleParams.cubeImages && styleParams.cubeType === 'fit';
    var dimensions = {};

    if (!isGridFit) {
      dimensions = {
        width: style.width,
        height: style.height
      };
    } else if (isGridFit && isLandscape) {
      dimensions = {
        //landscape
        height: style.height - 2 * imageMarginTop,
        width: style.width,
        margin: imageMarginTop + "px 0"
      };
    } else if (isGridFit && !isLandscape) {
      dimensions = {
        //portrait
        width: style.width - 2 * imageMarginLeft,
        height: style.height,
        margin: "0 " + imageMarginLeft + "px"
      };
    }

    if (styleParams.itemBorderRadius) {
      dimensions.borderRadius = styleParams.itemBorderRadius + 'px';
    }

    return dimensions;
  };

  _proto.getItemTextsDetails = function getItemTextsDetails(externalTotalInfoHeight) {
    if (externalTotalInfoHeight === void 0) {
      externalTotalInfoHeight = 0;
    }

    var props = utils.pick(this.props, ['title', 'description', 'id', 'styleParams', 'style', 'container']);
    var isImage = this.props.type === 'image' || this.props.type === 'picture';
    var useCustomButton = this.props.styleParams.useCustomButton === true;
    var shouldShowButton = (isImage || !this.props.styleParams.isStoreGallery) && useCustomButton;
    return /*#__PURE__*/react_default.a.createElement(texts_Texts, itemView_extends({}, props, {
      key: "item-texts-" + props.id,
      itemContainer: this.itemContainer,
      showShare: this.state.showShare,
      isSmallItem: this.isSmallItem(),
      isNarrow: this.isNarrow(),
      shouldShowButton: shouldShowButton,
      externalTotalInfoHeight: externalTotalInfoHeight,
      actions: {
        eventsListener: this.props.actions.eventsListener
      }
    }));
  };

  _proto.getSocial = function getSocial() {
    var props = utils.pick(this.props, ['html', 'hashtag', 'photoId', 'item', 'idx', 'currentIdx', 'id', 'styleParams', 'style', 'isDemo', 'type', 'createUrl', 'loveCount', 'isLoved']);
    return /*#__PURE__*/react_default.a.createElement(social_Social, itemView_extends({}, props, {
      showShare: this.state.showShare,
      isSmallItem: this.isSmallItem(),
      isNarrow: this.isNarrow(),
      isShort: this.isShort(),
      isVerticalContainer: this.isVerticalContainer(),
      key: "item-social-" + props.id,
      actions: {
        toggleShare: this.toggleShare,
        getShare: this.getShare,
        eventsListener: this.props.actions.eventsListener
      }
    }));
  };

  _proto.getShare = function getShare() {
    var props = utils.pick(this.props, ['styleParams', 'id', 'type', 'style', 'currentIdx', 'idx', 'actions']);
    return /*#__PURE__*/react_default.a.createElement(share_Share, itemView_extends({}, props, {
      allProps: this.props,
      key: "item-share-" + props.id,
      showShare: this.state.showShare,
      isVerticalContainer: this.isVerticalContainer(),
      actions: {
        toggleShare: this.toggleShare,
        eventsListener: this.props.actions.eventsListener
      }
    }));
  };

  _proto.getItemHover = function getItemHover(children, imageDimensions) {
    var _this3 = this;

    // const props = utils.pick(this.props, ['styleParams', 'type', 'idx', 'type']);
    var _this$props2 = this.props,
        customHoverRenderer = _this$props2.customHoverRenderer,
        props = itemView_objectWithoutPropertiesLoose(_this$props2, ["customHoverRenderer"]);

    var shouldHover = this.shouldHover() || null;
    return shouldHover && /*#__PURE__*/react_default.a.createElement(itemHover_ItemHover, itemView_extends({}, props, {
      forceShowHover: this.simulateOverlayHover(),
      shouldHover: shouldHover,
      imageDimensions: imageDimensions,
      key: "hover",
      actions: {
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp
      },
      render: customHoverRenderer ? function () {
        return customHoverRenderer(_this3.getCustomInfoRendererProps());
      } : null
    }), children);
  };

  _proto.getCustomInfoRendererProps = function getCustomInfoRendererProps() {
    return itemView_objectSpread(itemView_objectSpread({}, this.props), {
      itemContainer: this.itemContainer,
      isMobile: utils.isMobile()
    });
  };

  _proto.getImageItem = function getImageItem(imageDimensions) {
    var props = utils.pick(this.props, ['alt', 'title', 'description', 'id', 'idx', 'styleParams', 'createUrl', 'settings', 'lazyLoad']);
    return /*#__PURE__*/react_default.a.createElement(imageItem_ImageItem, itemView_extends({}, props, {
      key: "imageItem",
      loaded: this.state.loaded,
      displayed: this.state.displayed,
      imageDimensions: imageDimensions,
      isThumbnail: !!this.props.thumbnailHighlightId,
      actions: {
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp,
        setItemLoaded: this.setItemLoaded,
        setItemError: this.setItemError
      }
    }));
  };

  _proto.getVideoItem = function getVideoItem(imageDimensions, itemHover) {
    return /*#__PURE__*/react_default.a.createElement(videoItem, itemView_extends({}, this.props, {
      playing: this.props.idx === this.props.playingVideoIdx,
      key: 'video' + this.props.idx,
      hover: itemHover,
      imageDimensions: imageDimensions,
      hasLink: this.itemHasLink(),
      loadingStatus: {
        failed: this.state.failed,
        loaded: this.state.loaded
      },
      actions: itemView_objectSpread(itemView_objectSpread({}, this.props.actions), {}, {
        setItemLoaded: this.setItemLoaded,
        setItemError: this.setItemError,
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp
      })
    }));
  };

  _proto.getVideoItemPlaceholder = function getVideoItemPlaceholder(imageDimensions, itemHover) {
    var props = utils.pick(this.props, ['alt', 'title', 'description', 'id', 'idx', 'styleParams', 'createUrl', 'settings', 'lazyLoad']);
    return /*#__PURE__*/react_default.a.createElement(videoItemPlaceholder, itemView_extends({}, props, {
      loadingStatus: {
        failed: this.state.failed,
        loaded: this.state.loaded
      },
      key: "videoPlaceholder",
      loaded: this.state.loaded,
      displayed: this.state.displayed,
      imageDimensions: imageDimensions,
      isThumbnail: !!this.props.thumbnailHighlightId,
      actions: {
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp,
        setItemLoaded: this.setItemLoaded,
        setItemError: this.setItemError
      },
      id: this.props.idx,
      hover: itemHover
    }));
  };

  _proto.getTextItem = function getTextItem(imageDimensions) {
    var props = utils.pick(this.props, ['id', 'styleParams', 'style', 'html', 'cubeRatio']);
    return /*#__PURE__*/react_default.a.createElement(textItem_TextItem, itemView_extends({}, props, {
      key: "textItem",
      imageDimensions: imageDimensions,
      actions: {
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp,
        setItemLoaded: this.setItemLoaded
      }
    }));
  };

  _proto.getItemInner = function getItemInner() {
    var _this4 = this;

    var _this$props3 = this.props,
        styleParams = _this$props3.styleParams,
        type = _this$props3.type;
    var itemInner;

    var _this$getImageDimensi = this.getImageDimensions(),
        width = _this$getImageDimensi.width,
        height = _this$getImageDimensi.height;

    var imageDimensions = {
      width: width,
      height: height
    };
    var itemTexts;
    var social;
    var share;
    var itemHover = null;

    if (this.shouldHover() || styleParams.isSlideshow) {
      itemTexts = hasHoverPlacement(styleParams.titlePlacement) && styleParams.hoveringBehaviour !== infoBehaviourOnHover.NEVER_SHOW ? this.getItemTextsDetails() : null; //if titlePlacement (title & description) is BELOW or ABOVE, it is not part of the itemHover

      social = this.getSocial();
      share = this.getShare();
      itemHover = this.getItemHover([itemTexts, social, share], imageDimensions);
    }

    switch (type) {
      case 'dummy':
        itemInner = /*#__PURE__*/react_default.a.createElement("div", null);
        break;

      case 'video':
        if (this.props.idx === this.props.playingVideoIdx || this.props.idx === this.props.nextVideoIdx) {
          itemInner = this.getVideoItem(imageDimensions, itemHover);
        } else {
          itemInner = this.getVideoItemPlaceholder(imageDimensions, itemHover);
        }

        break;

      case 'text':
        itemInner = [this.getTextItem(imageDimensions), itemHover];
        break;

      case 'image':
      case 'picture':
      default:
        if (this.props.isVideoPlaceholder) {
          itemInner = this.getVideoItemPlaceholder(imageDimensions, itemHover);
        } else {
          itemInner = [this.getImageItem(imageDimensions), itemHover];
        }

    }

    if (styleParams.isSlideshow) {
      var customSlideshowInfoRenderer = this.props.customSlideshowInfoRenderer;
      itemTexts = this.getItemTextsDetails();
      var style = {
        height: styleParams.slideshowInfoSize + "px",
        bottom: "-" + styleParams.slideshowInfoSize + "px"
      };
      var slideshowInfo = customSlideshowInfoRenderer ? customSlideshowInfoRenderer(this.getCustomInfoRendererProps()) : /*#__PURE__*/react_default.a.createElement("div", {
        className: "gallery-item-info gallery-item-bottom-info",
        "data-hook": "gallery-item-info-buttons",
        style: style
      }, /*#__PURE__*/react_default.a.createElement("div", null, social, itemTexts));
      var _this$props4 = this.props,
          photoId = _this$props4.photoId,
          id = _this$props4.id,
          idx = _this$props4.idx;
      itemInner = /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("a", itemView_extends({
        ref: function ref(e) {
          return _this4.itemAnchor = e;
        },
        "data-id": photoId,
        "data-idx": idx,
        key: 'item-container-link-' + id
      }, this.getLinkParams(), {
        tabIndex: -1
      }), itemInner), slideshowInfo);
    }

    return itemInner;
  };

  _proto.getRightInfoElementIfNeeded = function getRightInfoElementIfNeeded() {
    if (hasRightPlacement(this.props.styleParams.titlePlacement)) {
      return this.getInfoElement(placements.SHOW_ON_THE_RIGHT, 'gallery-item-right-info');
    } else {
      return null;
    }
  };

  _proto.getLeftInfoElementIfNeeded = function getLeftInfoElementIfNeeded() {
    if (hasLeftPlacement(this.props.styleParams.titlePlacement)) {
      return this.getInfoElement(placements.SHOW_ON_THE_LEFT, 'gallery-item-left-info');
    } else {
      return null;
    }
  };

  _proto.getBottomInfoElementIfNeeded = function getBottomInfoElementIfNeeded() {
    if (hasBelowPlacement(this.props.styleParams.titlePlacement)) {
      return this.getInfoElement(placements.SHOW_BELOW, 'gallery-item-bottom-info');
    } else {
      return null;
    }
  };

  _proto.getTopInfoElementIfNeeded = function getTopInfoElementIfNeeded() {
    if (hasAbovePlacement(this.props.styleParams.titlePlacement)) {
      return this.getInfoElement(placements.SHOW_ABOVE, 'gallery-item-top-info');
    } else {
      return null;
    }
  };

  _proto.getInfoElement = function getInfoElement(placement, elementName) {
    var _this5 = this;

    var _this$props5 = this.props,
        styleParams = _this$props5.styleParams,
        customInfoRenderer = _this$props5.customInfoRenderer,
        style = _this$props5.style;

    if (!styleParams.allowTitle && !styleParams.allowDescription && !styleParams.useCustomButton) {
      return null;
    }

    var info = null; //if there is no url for videos and images, we will not render the itemWrapper
    //but will render the info element if exists, with the whole size of the item

    var infoHeight = styleParams.textBoxHeight + (this.hasRequiredMediaUrl ? 0 : style.height);
    var infoWidth = style.infoWidth + (this.hasRequiredMediaUrl ? 0 : style.width);
    var itemExternalInfo = customInfoRenderer ? customInfoRenderer(this.getCustomInfoRendererProps(), placement) : this.getItemTextsDetails(infoHeight); //TODO: move the creation of the functions that are passed to onMouseOver and onMouseOut outside

    if (itemExternalInfo) {
      info = /*#__PURE__*/react_default.a.createElement("div", {
        style: getOuterInfoStyle(placement, styleParams, style.height, styleParams.textBoxHeight)
      }, /*#__PURE__*/react_default.a.createElement("div", {
        style: getInnerInfoStyle(placement, styleParams, infoHeight, infoWidth),
        className: 'gallery-item-common-info ' + elementName,
        onMouseOver: function onMouseOver() {
          !utils.isMobile() && _this5.props.actions.eventsListener(events.HOVER_SET, _this5.props.idx);
        },
        "aria-hidden": true,
        onMouseOut: function onMouseOut() {
          !utils.isMobile() && _this5.props.actions.eventsListener(events.HOVER_SET, -1);
        },
        onClick: this.onItemInfoClick
      }, itemExternalInfo));
    }

    return info;
  };

  _proto.simulateHover = function simulateHover() {
    return this.state.isCurrentHover || this.props.styleParams.alwaysShowHover === true || viewModeWrapper_isEditMode() && this.props.styleParams.previewHover;
  };

  _proto.simulateOverlayHover = function simulateOverlayHover() {
    return this.simulateHover() || this.props.styleParams.hoveringBehaviour === infoBehaviourOnHover.NO_CHANGE;
  };

  _proto.itemHasLink = function itemHasLink() {
    var _this$props6 = this.props,
        linkData = _this$props6.linkData,
        linkUrl = _this$props6.linkUrl;
    var itemDoesntHaveLink = linkData.type === undefined && (linkUrl === undefined || linkUrl === ''); //when itemClick is 'link' but no link was added to this specific item

    return !itemDoesntHaveLink;
  };

  _proto.getItemContainerStyles = function getItemContainerStyles() {
    var styleParams = this.props.styleParams;
    var containerStyleByStyleParams = getContainerStyle(styleParams);
    var itemDoesntHaveLink = !this.itemHasLink(); //when itemClick is 'link' but no link was added to this specific item

    var itemStyles = {
      overflowY: styleParams.isSlideshow ? 'visible' : 'hidden',
      position: 'absolute',
      bottom: 'auto',
      margin: styleParams.oneRow ? styleParams.imageMargin + 'px' : 0,
      cursor: styleParams.itemClick === constants_itemClick.NOTHING || styleParams.itemClick === constants_itemClick.LINK && itemDoesntHaveLink ? 'default' : 'pointer'
    };
    return itemView_objectSpread(itemView_objectSpread({}, itemStyles), containerStyleByStyleParams);
  };

  _proto.getItemWrapperStyles = function getItemWrapperStyles() {
    var _this$props7 = this.props,
        styleParams = _this$props7.styleParams,
        style = _this$props7.style,
        type = _this$props7.type,
        isUnknownWidth = _this$props7.isUnknownWidth;
    var height = style.height;
    var styles = {};

    if (type === 'text') {
      styles.backgroundColor = styleParams.cubeType !== 'fit' ? 'transparent' : 'inherit';
    } else {
      styles.backgroundColor = (styleParams.cubeType !== 'fit' ? style.bgColor : 'inherit') || 'transparent';
    }

    styles.margin = -styleParams.itemBorderWidth + 'px';

    if (!isUnknownWidth) {
      styles.height = height + 'px';
    }

    var imageDimensions = this.getImageDimensions();

    var itemWrapperStyles = itemView_objectSpread(itemView_objectSpread({}, styles), imageDimensions);

    return itemWrapperStyles;
  };

  _proto.getItemAriaLabel = function getItemAriaLabel() {
    var _this$props8 = this.props,
        type = _this$props8.type,
        alt = _this$props8.alt,
        styleParams = _this$props8.styleParams;
    var label;

    switch (type) {
      case 'dummy':
        label = '';
        break;

      case 'text':
        label = 'Text item';
        break;

      case 'video':
        label = alt || 'Untitled video';
        break;

      default:
        label = alt || 'Untitled image';
        break;
    }

    return label + (styleParams.isStoreGallery ? ', Buy Now' : '');
  };

  _proto.getItemContainerClass = function getItemContainerClass() {
    var styleParams = this.props.styleParams;
    var isNOTslideshow = !styleParams.isSlideshow;
    var overlayAnimation = styleParams.overlayAnimation;
    var imageHoverAnimation = styleParams.imageHoverAnimation;
    var classNames = {
      'gallery-item-container': true,
      'visible': true,
      highlight: this.isHighlight(),
      clickable: styleParams.itemClick !== 'nothing',
      'simulate-hover': this.simulateHover(),
      'hide-hover': !this.simulateHover() && utils.isMobile(),
      'invert-hover': styleParams.hoveringBehaviour === infoBehaviourOnHover.DISAPPEARS,
      //overlay animations
      'hover-animation-fade-in': isNOTslideshow && overlayAnimation === overlayAnimations.FADE_IN,
      'hover-animation-expand': isNOTslideshow && overlayAnimation === overlayAnimations.EXPAND,
      'hover-animation-slide-up': isNOTslideshow && overlayAnimation === overlayAnimations.SLIDE_UP,
      'hover-animation-slide-right': isNOTslideshow && overlayAnimation === overlayAnimations.SLIDE_RIGHT,
      //image hover animations
      'zoom-in-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.ZOOM_IN,
      'blur-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.BLUR,
      'grayscale-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.GRAYSCALE,
      'shrink-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.SHRINK,
      'invert-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.INVERT,
      'color-in-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.COLOR_IN,
      'darkened-on-hover': isNOTslideshow && imageHoverAnimation === imageHoverAnimations.DARKENED,
      'pro-gallery-mobile-indicator': utils.isMobile()
    };
    var strClass = Object.entries(classNames).map(function (_ref2) {
      var classname = _ref2[0],
          isNeeded = _ref2[1];
      return isNeeded ? classname : false;
    }).filter(Boolean).join(' ');
    return strClass;
  };

  _proto.getItemWrapperClass = function getItemWrapperClass() {
    var _this$props9 = this.props,
        styleParams = _this$props9.styleParams,
        type = _this$props9.type;
    var classes = ['gallery-item-wrapper', 'visible'];

    if (styleParams.cubeImages) {
      classes.push('cube-type-' + styleParams.cubeType);
    }

    if (type === 'text') {
      classes.push('gallery-item-wrapper-text');
    }

    return classes.join(' ');
  };

  _proto.getItemContainerTabIndex = function getItemContainerTabIndex() {
    var tabIndex = this.isHighlight() ? utils.getTabIndex('currentThumbnail') : this.props.currentIdx === this.props.idx ? utils.getTabIndex('currentGalleryItem') : -1;
    return tabIndex;
  };

  _proto.changeActiveElementIfNeeded = function changeActiveElementIfNeeded(prevProps) {
    var _this6 = this;

    try {
      if ((viewModeWrapper_isSiteMode() || viewModeWrapper_isSEOMode()) && !utils.isMobile() && window_windowWrapper.document && window_windowWrapper.document.activeElement && window_windowWrapper.document.activeElement.className) {
        var activeElement = window_windowWrapper.document.activeElement; //check if focus is on 'gallery-item-container' in current gallery

        var isThisGalleryItemInFocus = function isThisGalleryItemInFocus() {
          return !!window_windowWrapper.document.querySelector("#pro-gallery-" + _this6.props.domId + " #" + String(activeElement.id));
        };

        var isGalleryItemInFocus = function isGalleryItemInFocus() {
          return String(activeElement.className).indexOf('gallery-item-container') >= 0;
        }; //check if focus is on 'load-more' in current gallery


        var isThisGalleryShowMoreInFocus = function isThisGalleryShowMoreInFocus() {
          return !!window_windowWrapper.document.querySelector("#pro-gallery-" + _this6.props.domId + " #" + String(activeElement.id));
        };

        var isShowMoreInFocus = function isShowMoreInFocus() {
          return String(activeElement.className).indexOf('show-more') >= 0;
        };

        if (isGalleryItemInFocus() && isThisGalleryItemInFocus() || isShowMoreInFocus() && isThisGalleryShowMoreInFocus()) {
          if (this.props.thumbnailHighlightId !== prevProps.thumbnailHighlightId && this.props.thumbnailHighlightId === this.props.id) {
            // if the highlighted thumbnail changed and it is the same as this itemview's
            this.itemContainer.focus();
          } else if (this.props.currentIdx !== prevProps.currentIdx && this.props.currentIdx === this.props.idx) {
            //check if currentIdx has changed to the current item
            this.itemContainer.focus();
          }
        }
      }
    } catch (e) {
      console.error('Could not set focus to active element', e);
    }
  } //-----------------------------------------| REACT |--------------------------------------------//
  ;

  _proto.componentDidMount = function componentDidMount() {
    if (utils.isMobile()) {
      try {
        react_default.a.initializeTouchEvents(true);
      } catch (e) {}
    }

    window_windowWrapper.addEventListener('current_hover_change', this.checkIfCurrentHoverChanged);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.itemLoadedTimeout);
    window_windowWrapper.removeEventListener('current_hover_change', this.checkIfCurrentHoverChanged);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.changeActiveElementIfNeeded(prevProps);
  };

  _proto.checkIfCurrentHoverChanged = function checkIfCurrentHoverChanged(e) {
    if (e.domId === this.props.domId) {
      if (!this.state.isCurrentHover && e.currentHoverIdx === this.props.idx) {
        this.setState({
          isCurrentHover: true,
          itemWasHovered: true
        });
      } else if (this.state.isCurrentHover && e.currentHoverIdx !== this.props.idx) {
        this.setState({
          isCurrentHover: false
        });
      }
    }
  };

  _proto.onContextMenu = function onContextMenu(e) {
    if (!utils.isDev()) {
      e.preventDefault(e);
    }
  };

  _proto.getItemAriaRole = function getItemAriaRole() {
    switch (this.props.styleParams.itemClick) {
      case 'expand':
      case 'fullscreen':
        return 'button';

      case 'link':
        return 'link';

      default:
        return '';
    }
  };

  _proto.getLinkParams = function getLinkParams() {
    var _this$props10 = this.props,
        directLink = _this$props10.directLink,
        styleParams = _this$props10.styleParams,
        directShareLink = _this$props10.directShareLink;
    var isSEO = viewModeWrapper_isSEOMode();

    if (styleParams.itemClick === constants_itemClick.LINK) {
      var _ref3 = directLink || {},
          url = _ref3.url,
          target = _ref3.target;

      var noFollowForSEO = this.props.noFollowForSEO;
      var shouldUseNofollow = isSEO && noFollowForSEO;
      var shouldUseDirectLink = !!(url && target);
      var seoLinkParams = shouldUseNofollow ? {
        rel: 'nofollow'
      } : {};
      var linkParams = shouldUseDirectLink ? itemView_objectSpread({
        href: url,
        target: target
      }, seoLinkParams) : {};
      return linkParams;
    } else if (styleParams.itemClick === constants_itemClick.FULLSCREEN || styleParams.itemClick === constants_itemClick.EXPAND) {
      // place share link as the navigation item
      var _url = directShareLink;
      var shouldUseDirectShareLink = !!_url;

      var _linkParams = shouldUseDirectShareLink ? {
        href: _url,
        "data-cancel-link": true
      } : {};

      return _linkParams;
    }
  };

  _proto.composeItem = function composeItem() {
    var _this7 = this;

    var _this$props11 = this.props,
        photoId = _this$props11.photoId,
        id = _this$props11.id,
        hash = _this$props11.hash,
        idx = _this$props11.idx,
        styleParams = _this$props11.styleParams,
        type = _this$props11.type,
        url = _this$props11.url; //if (there is an url for video items and image items) OR text item (text item do not use media url)

    this.hasRequiredMediaUrl = url || type === 'text'; //if titlePlacement !== SHOW_ON_HOVER and !this.hasRequiredMediaUrl, we will NOT render the itemWrapper (but will render the info element with the whole size of the item)

    var isItemWrapperEmpty = styleParams.titlePlacement !== placements.SHOW_ON_HOVER && !this.hasRequiredMediaUrl;
    var innerDiv = /*#__PURE__*/react_default.a.createElement("div", {
      className: this.getItemContainerClass(),
      onContextMenu: function onContextMenu(e) {
        return _this7.onContextMenu(e);
      },
      id: cssScrollHelper.getSellectorDomId(this.props),
      ref: function ref(e) {
        return _this7.itemContainer = e;
      },
      onMouseOver: this.onMouseOver,
      onMouseOut: function onMouseOut() {
        !utils.isMobile() && _this7.props.actions.eventsListener(events.HOVER_SET, -1);
      },
      onKeyDown: this.onKeyPress,
      tabIndex: this.getItemContainerTabIndex(),
      "aria-label": this.getItemAriaLabel(),
      "data-hash": hash,
      "data-id": photoId,
      "data-idx": idx,
      role: this.getItemAriaRole(),
      "data-hook": "item-container",
      key: 'item-container-' + id,
      style: this.getItemContainerStyles()
    }, this.getTopInfoElementIfNeeded(), this.getLeftInfoElementIfNeeded(), /*#__PURE__*/react_default.a.createElement("div", {
      style: itemView_objectSpread(itemView_objectSpread(itemView_objectSpread({}, !this.props.styleParams.isSlideshow && getImageStyle(this.props.styleParams)), hasRightPlacement(this.props.styleParams.titlePlacement) && {
        "float": 'left'
      }), hasLeftPlacement(this.props.styleParams.titlePlacement) && {
        "float": 'right'
      })
    }, !isItemWrapperEmpty && /*#__PURE__*/react_default.a.createElement("div", {
      "data-hook": "item-wrapper",
      className: this.getItemWrapperClass(),
      key: 'item-wrapper-' + id,
      style: this.getItemWrapperStyles(),
      onClick: this.onItemWrapperClick
    }, this.getItemInner())), this.getRightInfoElementIfNeeded(), this.getBottomInfoElementIfNeeded());

    if (styleParams.isSlideshow) {
      return innerDiv;
    } else {
      return /*#__PURE__*/react_default.a.createElement("a", itemView_extends({
        ref: function ref(e) {
          return _this7.itemAnchor = e;
        },
        "data-id": photoId,
        "data-idx": idx,
        key: 'item-container-link-' + id
      }, this.getLinkParams(), {
        tabIndex: -1
      }), innerDiv);
    }
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    return this.composeItem();
  };

  return ItemView;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var itemView = (itemView_ItemView);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryView.js
function galleryView_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function galleryView_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { galleryView_ownKeys(Object(source), true).forEach(function (key) { galleryView_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { galleryView_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function galleryView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function galleryView_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var galleryView_GalleryView = /*#__PURE__*/function (_GalleryComponent) {
  galleryView_inheritsLoose(GalleryView, _GalleryComponent);

  function GalleryView(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.handleArrowKeys = _this.handleArrowKeys.bind(galleryView_assertThisInitialized(_this));
    _this.showMoreItems = _this.showMoreItems.bind(galleryView_assertThisInitialized(_this));
    _this.createGalleryConfig = _this.createGalleryConfig.bind(galleryView_assertThisInitialized(_this));
    _this.screenLogs = _this.screenLogs.bind(galleryView_assertThisInitialized(_this));
    _this.createGallery = _this.createGallery.bind(galleryView_assertThisInitialized(_this));
    _this.id = Date.now() + '|' + Math.floor(Math.random() * 10000);
    _this.state = {
      currentIdx: 0
    };
    return _this;
  }

  var _proto = GalleryView.prototype;

  _proto.handleArrowKeys = function handleArrowKeys(e) {
    var activeItemIdx = window_windowWrapper.document.activeElement.getAttribute('data-idx');

    if (activeItemIdx) {
      var findNeighborItem = this.props.actions.findNeighborItem || this.props.galleryStructure.findNeighborItem || function () {}; //temp change for tests to pass


      var idx = Number(activeItemIdx);
      var newIdx = -1;

      switch (e.keyCode || e.charCode) {
        case 38:
          //up
          newIdx = findNeighborItem(idx, 'up');
          break;

        case 37:
          //left
          newIdx = findNeighborItem(idx, this.props.styleParams.isRTL ? 'right' : 'left');
          break;

        case 40:
          //down
          newIdx = findNeighborItem(idx, 'down');
          break;

        case 39:
          //right
          newIdx = findNeighborItem(idx, this.props.styleParams.isRTL ? 'left' : 'right');
          break;
      } //if nextIdx is below the lastVisibleItemIdx (higher idx), we will ignore the findNeighborItem answer and stay on the same item


      if (newIdx > this.lastVisibleItemIdx()) {
        newIdx = idx;
      }

      if (newIdx >= 0) {
        e.preventDefault();
        e.stopPropagation();
        utils.setStateAndLog(this, 'Set Gallery Current Item', {
          currentIdx: newIdx
        });
        return false;
      }
    }

    return true;
  };

  _proto.lastVisibleItemIdxInHeight = function lastVisibleItemIdxInHeight(height) {
    for (var i = this.props.galleryStructure.items.length - 1; i >= 0; i--) {
      var item = this.props.galleryStructure.items[i];
      var isVisible = item.offset.top < height;

      if (isVisible) {
        return i;
      }
    }

    return this.items.length - 1;
  };

  _proto.lastVisibleItemIdx = function lastVisibleItemIdx() {
    //the item must be visible and above the show more button
    return this.lastVisibleItemIdxInHeight(this.props.container.galleryHeight - 100);
  };

  _proto.showMoreItems = function showMoreItems() {
    var _this2 = this;

    if (this.props.styleParams.isAccessible) {
      // tal - I left this check since we do not want to focus the last item in non-accessibility mode
      //find the last visible item and focus on it
      try {
        var lastItemIdx = this.lastVisibleItemIdx();
        utils.setStateAndLog(this, 'Focus on Last Gallery Item', {
          currentIdx: lastItemIdx + 1
        }, function () {
          _this2.props.actions.toggleLoadMoreItems();
        });
      } catch (e) {
        console.warn('Cannot find item to focus', e);
      }
    } else {
      this.props.actions.toggleLoadMoreItems();
    }
  };

  _proto.createGallery = function createGallery(showMore) {
    var _this$props = this.props,
        itemsLoveData = _this$props.itemsLoveData,
        styleParams = _this$props.styleParams,
        container = _this$props.container,
        galleryStructure = _this$props.galleryStructure,
        isUnknownWidth = _this$props.isUnknownWidth;
    var galleryConfig = this.createGalleryConfig();
    var showMoreContainerHeight = 138; //according to the scss

    var debugMsg = /*#__PURE__*/react_default.a.createElement(galleryDebugMessage, this.props.debug);
    var galleryHeight;

    if (showMore) {
      galleryHeight = container.galleryHeight - showMoreContainerHeight;
    } else {
      galleryHeight = galleryStructure.height + 'px';
    }

    var layout = galleryStructure.galleryItems.map(function (item, index) {
      return /*#__PURE__*/react_default.a.createElement(itemView, item.renderProps(galleryView_objectSpread(galleryView_objectSpread(galleryView_objectSpread({}, galleryConfig), itemsLoveData[item.id]), {}, {
        visible: item.isVisible,
        key: "itemView-" + item.id + "-" + index,
        isUnknownWidth: isUnknownWidth
      })));
    });
    return /*#__PURE__*/react_default.a.createElement("div", {
      id: "pro-gallery-container",
      className: 'pro-gallery inline-styles ' + (styleParams.oneRow ? ' one-row slider hide-scrollbars ' : '') + (styleParams.isAccessible ? ' accessible ' : '') + (styleParams.isRTL ? ' rtl ' : ' ltr '),
      style: {
        height: galleryHeight,
        overflowX: 'hidden' //  width: this.props.container.galleryWidth,

      },
      onKeyDown: this.handleArrowKeys
    }, /*#__PURE__*/react_default.a.createElement("div", {
      id: "pro-gallery-margin-container",
      style: {
        margin: styleParams.galleryMargin + 'px',
        height: galleryHeight,
        width: this.props.isUnknownWidth ? '100%' : this.props.container.galleryWidth - styleParams.imageMargin * 2,
        overflow: 'visible',
        position: 'relative'
      }
    }, debugMsg, layout));
  };

  _proto.createGalleryConfig = function createGalleryConfig() {
    return {
      scrollingElement: this.props.scrollingElement,
      scroll: this.props.scroll,
      container: this.props.container,
      styleParams: this.props.styleParams,
      watermark: this.props.watermark,
      settings: this.props.settings,
      lazyLoad: this.props.lazyLoad,
      currentIdx: this.state.currentIdx,
      customHoverRenderer: this.props.customHoverRenderer,
      customInfoRenderer: this.props.customInfoRenderer,
      domId: this.props.domId,
      playingVideoIdx: this.props.playingVideoIdx,
      nextVideoIdx: this.props.nextVideoIdx,
      noFollowForSEO: this.props.noFollowForSEO,
      actions: {
        eventsListener: this.props.actions.eventsListener
      }
    };
  };

  _proto.screenLogs = function screenLogs() {
    return utils.shouldDebug('screenLogs') ? /*#__PURE__*/react_default.a.createElement("div", {
      className: "screen-logs"
    }, "URL width: ", utils.parseGetParam('width'), ", Container:", ' ', JSON.stringify(this.props.container.galleryWidth), ", window.document.body.clientWidth ", document.body.clientWidth, ", window.innerWidth ", window_windowWrapper.innerWidth, ", window.screen.width:", ' ', window_windowWrapper.screen.width) : '';
  };

  _proto.returnButtonStyle = function returnButtonStyle(styleParams) {
    var btnStyle = {};

    if (utils.isMobile()) {
      if (typeof styleParams.loadMoreButtonFont !== 'undefined') {
        btnStyle.font = styleParams.loadMoreButtonFont.value;
        btnStyle.textDecoration = styleParams.textDecorationLoadMore;
      }

      if (typeof styleParams.loadMoreButtonFontColor !== 'undefined') {
        btnStyle.color = styleParams.loadMoreButtonFontColor.value;
        btnStyle.textDecorationColor = styleParams.loadMoreButtonFontColor.value;
      }

      if (typeof styleParams.loadMoreButtonColor !== 'undefined') {
        btnStyle.background = styleParams.loadMoreButtonColor.value;
      }

      if (typeof styleParams.loadMoreButtonBorderColor !== 'undefined') {
        btnStyle.borderColor = styleParams.loadMoreButtonBorderColor.value;
      }

      if (typeof styleParams.loadMoreButtonBorderRadius !== 'undefined') {
        btnStyle.borderRadius = styleParams.loadMoreButtonBorderRadius;
      }

      if (typeof styleParams.loadMoreButtonBorderWidth !== 'undefined') {
        btnStyle.borderWidth = styleParams.loadMoreButtonBorderWidth;
      }
    }

    return btnStyle;
  };

  _proto.createShowMoreButton = function createShowMoreButton() {
    if (typeof this.props.customLoadMoreRenderer === 'function') {
      return /*#__PURE__*/react_default.a.createElement("div", {
        onClick: this.showMoreItems
      }, this.props.customLoadMoreRenderer(this.props));
    }

    var styleParams = this.props.styleParams;
    var showMoreButton = false;
    var buttonState = this.props.displayShowMore;
    var shouldShowButton = buttonState && this.props.galleryStructure.height > this.props.container.height;
    var btnStyle = this.returnButtonStyle(styleParams);

    if (shouldShowButton) {
      var buttonText = styleParams.loadMoreButtonText || 'Load More';
      showMoreButton = /*#__PURE__*/react_default.a.createElement("div", {
        className: 'show-more-container' + (utils.isMobile() ? ' pro-gallery-mobile-indicator' : '')
      }, /*#__PURE__*/react_default.a.createElement("button", {
        tabIndex: utils.getTabIndex('loadMoreButton'),
        id: 'show-more-' + this.props.domId,
        className: "show-more",
        onClick: this.showMoreItems,
        "data-hook": "show-more",
        "aria-label": buttonText,
        style: btnStyle
      }, buttonText));
    }

    return showMoreButton;
  };

  _proto.getStyles = function getStyles() {
    var marginExceptBottom = -1 * (this.props.styleParams.imageMargin - this.props.styleParams.galleryMargin);
    return {
      margin: marginExceptBottom + "px " + marginExceptBottom + "px 0 " + marginExceptBottom + "px"
    };
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    if (utils.isVerbose()) {
      console.count('galleryView render');
      console.time('Rendering Gallery took ');
      console.log('[DEBUG_RENDER] GalleryView styleParams', this.props.styleParams);
      console.log('[DEBUG_RENDER] GalleryView props changed', utils.printableObjectsDiff(this.lastProps || {}, this.props));
      this.lastProps = galleryView_objectSpread({}, this.props);
      console.log('[DEBUG_RENDER] GalleryView state changed', utils.printableObjectsDiff(this.lastState || {}, this.state));
      this.lastState = galleryView_objectSpread({}, this.state);
      this.renderCount = (this.renderCount || 0) + 1;
    }

    var showMore = this.createShowMoreButton();
    var gallery = this.createGallery(showMore);

    if (utils.isVerbose()) {
      console.timeEnd('Rendering Gallery took ');
    }

    var screenLogs = this.screenLogs();
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'pro-gallery-parent-container',
      key: "pro-gallery-" + this.id // style={this.getStyles()}
      ,
      role: "region",
      "aria-label": this.props.proGalleryRegionLabel
    }, screenLogs, gallery, showMore);
  };

  return GalleryView;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var galleryView = (galleryView_GalleryView);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/group/groupView.js
function groupView_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function groupView_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { groupView_ownKeys(Object(source), true).forEach(function (key) { groupView_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { groupView_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function groupView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function groupView_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var groupView_GroupView = /*#__PURE__*/function (_GalleryComponent) {
  groupView_inheritsLoose(GroupView, _GalleryComponent);

  function GroupView(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.displayName = 'GroupView';
    _this.dom = [];
    _this.state = {};
    return _this;
  }

  var _proto = GroupView.prototype;

  _proto.createDom = function createDom(visible) {
    var _this2 = this;

    return this.props.items.map(function (item) {
      return /*#__PURE__*/react_default.a.createElement(itemView, groupView_objectSpread(groupView_objectSpread({}, item.renderProps(groupView_objectSpread(groupView_objectSpread({}, _this2.props.galleryConfig), {}, {
        visible: visible
      }))), _this2.props.itemsLoveData[item.id]));
    });
  };

  _proto.shouldRender = function shouldRender() {
    var items = this.props.items;

    if (!items || !items.length || !items[0]) {
      return false;
    }

    return true;
  };

  _proto.isVisible = function isVisible() {
    var _this$props = this.props,
        items = _this$props.items,
        galleryConfig = _this$props.galleryConfig;

    if (this.props.allowLoop) {
      var idx = items[items.length - 1].idx;
      var currentIdx = galleryConfig.currentIdx,
          totalItemsCount = galleryConfig.totalItemsCount;
      var distance = currentIdx - idx;
      var padding = Math.floor(totalItemsCount / 2);
      return Math.abs(distance) <= padding;
    }

    return true;
  };

  _proto.render = function render() {
    return this.shouldRender() ? /*#__PURE__*/react_default.a.createElement("div", {
      key: "group_" + this.props.idx + "_" + this.props.items[0].id,
      "data-hook": 'group-view'
    }, this.createDom(this.isVisible())) : null;
  };

  return GroupView;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var groupView = (groupView_GroupView);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryHelpers.js

function isGalleryInViewport(container) {
  var haveAllVariablesForViewPortCalc = !!(container && Number.isInteger(container.scrollBase) && Number.isInteger(container.galleryHeight) && window_windowWrapper && window_windowWrapper.document && window_windowWrapper.document.documentElement && (Number.isInteger(window_windowWrapper.document.documentElement.scrollTop) || window_windowWrapper.document.scrollingElement && Number.isInteger(window_windowWrapper.document.scrollingElement.scrollTop)) && Number.isInteger(window_windowWrapper.document.documentElement.offsetHeight));
  var inTopViewPort = haveAllVariablesForViewPortCalc && container.scrollBase + container.galleryHeight > window_windowWrapper.document.documentElement.scrollTop;
  var inBottomViewPort = haveAllVariablesForViewPortCalc && container.scrollBase < (window_windowWrapper.document.documentElement.scrollTop || window_windowWrapper.document.scrollingElement.scrollTop) + window_windowWrapper.document.documentElement.offsetHeight;
  return inTopViewPort && inBottomViewPort || !haveAllVariablesForViewPortCalc; // if some parameters are missing (haveAllVariablesForViewPortCalc is false) we still want the used functionality to work
}
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/play.js
function play_extends() { play_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return play_extends.apply(this, arguments); }

function play_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var play_play = function play(_ref) {
  var size = _ref.size,
      props = play_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", play_extends({
    viewBox: "0 0 11 14",
    fill: "currentColor",
    width: size || "11",
    height: size || "14"
  }, props), /*#__PURE__*/react_default.a.createElement("g", {
    id: "final",
    stroke: "none",
    fill: "none",
    strokeWidth: "1",
    fillRule: "evenodd"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    id: "Pause",
    transform: "translate(-490 -763)",
    fill: "currentColor"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    id: "Group-2",
    transform: "translate(470 284)"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    id: "Group",
    transform: "translate(20 479)"
  }, /*#__PURE__*/react_default.a.createElement("path", {
    id: "play",
    d: "M0.0788076641 0L0 14 10.5 6.81856071z"
  }))))));
};

play_play.displayName = 'play';
/* harmony default export */ var components_play = (play_play);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/pause.js
function pause_extends() { pause_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return pause_extends.apply(this, arguments); }

function pause_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var pause_pause = function pause(_ref) {
  var size = _ref.size,
      props = pause_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", pause_extends({
    viewBox: "0 0 10 14",
    fill: "currentColor",
    width: size || "10",
    height: size || "14"
  }, props), /*#__PURE__*/react_default.a.createElement("g", {
    id: "final",
    stroke: "none",
    fill: "none",
    strokeWidth: "1",
    fillRule: "evenodd"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    id: "Play",
    transform: "translate(-490 -763)",
    fill: "currentColor"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    id: "Group-2",
    transform: "translate(470 284)"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    id: "Group",
    transform: "translate(20 479)"
  }, /*#__PURE__*/react_default.a.createElement("path", {
    d: "M7,0 L10,0 L10,14 L7,14 L7,0 Z M0,0 L3,0 L3,14 L0,14 L0,0 Z",
    id: "_copy_3"
  }))))));
};

pause_pause.displayName = 'pause';
/* harmony default export */ var components_pause = (pause_pause);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/slideshowView.js
function slideshowView_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function slideshowView_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { slideshowView_ownKeys(Object(source), true).forEach(function (key) { slideshowView_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { slideshowView_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function slideshowView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function slideshowView_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function slideshowView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var slideshowView_SlideshowView = /*#__PURE__*/function (_GalleryComponent) {
  slideshowView_inheritsLoose(SlideshowView, _GalleryComponent);

  function SlideshowView(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;

    slideshowView_defineProperty(slideshowView_assertThisInitialized(_this), "autoScrollToNextItem", function () {
      if (!viewModeWrapper_isEditMode() && (isGalleryInViewport(_this.props.container) || viewModeWrapper_isPreviewMode())) {
        _this._next({
          direction: 1,
          isAutoTrigger: true,
          scrollDuration: 800
        });
      }
    });

    _this.navigationOutHandler = _this.navigationOutHandler.bind(slideshowView_assertThisInitialized(_this));
    _this.navigationInHandler = _this.navigationInHandler.bind(slideshowView_assertThisInitialized(_this));
    _this.scrollToThumbnail = _this.scrollToThumbnail.bind(slideshowView_assertThisInitialized(_this));
    _this.stopAutoSlideshow = _this.stopAutoSlideshow.bind(slideshowView_assertThisInitialized(_this));
    _this.onAutoSlideShowButtonClick = _this.onAutoSlideShowButtonClick.bind(slideshowView_assertThisInitialized(_this));
    _this.startAutoSlideshowIfNeeded = _this.startAutoSlideshowIfNeeded.bind(slideshowView_assertThisInitialized(_this));
    _this.handleSlideshowKeyPress = _this.handleSlideshowKeyPress.bind(slideshowView_assertThisInitialized(_this));
    _this.onAutoSlideshowAutoPlayKeyPress = _this.onAutoSlideshowAutoPlayKeyPress.bind(slideshowView_assertThisInitialized(_this));
    _this.setCurrentItemByScroll = _this.setCurrentItemByScroll.bind(slideshowView_assertThisInitialized(_this));
    _this._setCurrentItemByScroll = utils.throttle(_this.setCurrentItemByScroll, 600).bind(slideshowView_assertThisInitialized(_this));
    _this._next = utils.throttle(_this.next.bind(slideshowView_assertThisInitialized(_this)), 400).bind(slideshowView_assertThisInitialized(_this));
    _this.state = {
      currentIdx: props.currentIdx || 0,
      isInView: true,
      shouldStopAutoSlideShow: false,
      hideLeftArrow: !props.isRTL,
      hideRightArrow: props.isRTL
    };
    _this.lastCurrentItem = undefined;
    _this.shouldCreateSlideShowPlayButton = false;
    _this.shouldCreateSlideShowNumbers = false;
    return _this;
  }

  var _proto = SlideshowView.prototype;

  _proto.isFirstItem = function isFirstItem() {
    return this.state.currentIdx === 0;
  };

  _proto.isScrollStart = function isScrollStart(isRTL) {
    if (isRTL === void 0) {
      isRTL = this.props.styleParams.isRTL;
    }

    if (this.container) {
      var _this$container = this.container,
          scrollLeft = _this$container.scrollLeft,
          scrollWidth = _this$container.scrollWidth,
          clientWidth = _this$container.clientWidth;

      if (isRTL) {
        return scrollLeft + clientWidth >= scrollWidth - 1;
      } else {
        return scrollLeft <= 1;
      }
    } else {
      return false;
    }
  };

  _proto.isScrollEnd = function isScrollEnd() {
    var _this$props$stylePara = this.props.styleParams,
        isRTL = _this$props$stylePara.isRTL,
        slideshowLoop = _this$props$stylePara.slideshowLoop;

    if (slideshowLoop) {
      return false;
    }

    return this.isScrollStart(!isRTL); //start and end are reversed by RTL
  };

  _proto.isFirstItemFullyVisible = function isFirstItemFullyVisible() {
    return !this.props.styleParams.slideshowLoop && this.isScrollStart();
  };

  _proto.isLastItemFullyVisible = function isLastItemFullyVisible() {
    return !this.props.styleParams.slideshowLoop && this.isScrollEnd();
  };

  _proto.isLastItem = function isLastItem() {
    return !this.props.styleParams.slideshowLoop && this.state.currentIdx >= this.props.galleryStructure.items.length - 1;
  } //__________________________________Slide show loop functions_____________________________________________
  ;

  _proto.createNewItemsForSlideshowLoopThumbnails = function createNewItemsForSlideshowLoopThumbnails() {
    var items = this.props.items;
    var biasedItems = [];
    var numOfThumbnails = Math.ceil(this.props.container.galleryWidth / this.props.styleParams.thumbnailSize); // need to create new item ! not just to copy the last once - the react view refferce one of them

    Object.keys(items).forEach(function (idx) {
      var _idx = Number(idx);

      var biasIdx; //bias all items idx by the number of added items

      biasIdx = _idx + numOfThumbnails;
      biasedItems[biasIdx] = slideshowView_objectSpread({}, items[idx]); //create the first copy of items

      if (_idx > items.length - numOfThumbnails - 1) {
        biasIdx = _idx - items.length + numOfThumbnails;
        biasedItems[biasIdx] = slideshowView_objectSpread({}, items[idx]);
      } //create the end items


      if (_idx < numOfThumbnails) {
        biasIdx = _idx + numOfThumbnails + items.length;
        biasedItems[biasIdx] = slideshowView_objectSpread({}, items[idx]);
      }
    });
    biasedItems.forEach(function (item, index) {
      item.loopIndex = index;
    });
    this.ItemsForSlideshowLoopThumbnails = biasedItems;
    this.numOfThumbnails = numOfThumbnails;
  } //__________________________________end of slide show loop functions__________________________
  ;

  _proto.next = function next(_ref) {
    var direction = _ref.direction,
        isAutoTrigger = _ref.isAutoTrigger,
        _ref$scrollDuration = _ref.scrollDuration,
        scrollDuration = _ref$scrollDuration === void 0 ? 400 : _ref$scrollDuration,
        _ref$isKeyboardNaviga = _ref.isKeyboardNavigation,
        isKeyboardNavigation = _ref$isKeyboardNaviga === void 0 ? false : _ref$isKeyboardNaviga;
    var activeElement = document.activeElement;
    var galleryItemIsFocused = activeElement.className && activeElement.className.includes('gallery-item-container');
    var avoidIndividualNavigation = !isKeyboardNavigation || !(this.props.styleParams.isAccessible && galleryItemIsFocused);

    if (avoidIndividualNavigation && this.props.styleParams.galleryLayout === 0) {
      this.nextGroup({
        direction: direction,
        isAutoTrigger: isAutoTrigger,
        scrollDuration: scrollDuration
      }); //if its not in accessibility that requieres individual nav and we are in a horizontal(this file) collage(layout 0) - use group navigation
    } else {
      if (avoidIndividualNavigation && this.props.styleParams.isGrid && this.props.styleParams.numberOfImagesPerCol) {
        direction *= this.props.styleParams.numberOfImagesPerCol;
      }

      this.nextItem({
        direction: direction,
        isAutoTrigger: isAutoTrigger,
        scrollDuration: scrollDuration,
        avoidIndividualNavigation: avoidIndividualNavigation
      });
    }

    this.removeArrowsIfNeeded();
  };

  _proto.nextItem = function nextItem(_ref2) {
    var _this2 = this;

    var direction = _ref2.direction,
        isAutoTrigger = _ref2.isAutoTrigger,
        scrollDuration = _ref2.scrollDuration,
        avoidIndividualNavigation = _ref2.avoidIndividualNavigation;

    if (this.isSliding) {
      return;
    }

    this.isSliding = true;
    direction *= this.props.styleParams.isRTL ? -1 : 1;
    var currentIdx;

    if (avoidIndividualNavigation && !(this.props.styleParams.galleryLayout === 0)) {
      currentIdx = this.getCenteredItemIdxByScroll();
    } else {
      currentIdx = isAutoTrigger ? this.setCurrentItemByScroll() : this.state.currentIdx;
    }

    var nextItem = currentIdx + direction;

    if (!this.props.styleParams.slideshowLoop) {
      nextItem = Math.min(this.props.galleryStructure.items.length - 1, nextItem);
      nextItem = Math.max(0, nextItem);
    }

    var scrollToItem = this.props.actions.scrollToItem;
    this.isAutoScrolling = true;

    if (isAutoTrigger) {
      // ---- Called by the Auto Slideshow ---- //
      if (this.isLastItem()) {
        // maybe this should be isLastItemFullyVisible now that we have both. product- do we allow autoSlideshow in other layouts ( those that could have more than one item displayed in the galleryWidth)
        nextItem = 0;
        scrollDuration = 0;
      }
    } else {
      // ---- Called by the user (arrows, keys etc.) ---- //
      this.startAutoSlideshowIfNeeded(this.props.styleParams);
      var scrollingPastLastItem = direction >= 1 && this.isLastItem() || direction <= -1 && this.isFirstItem();

      if (scrollingPastLastItem) {
        this.isSliding = false;
        return;
      }
    } // ---- navigate ---- //


    try {
      var isScrollingPastEdge = !isAutoTrigger && (direction >= 1 && this.isLastItemFullyVisible() || direction <= -1 && this.isFirstItemFullyVisible());
      var scrollMarginCorrection = this.getStyles().margin || 0;
      !isScrollingPastEdge && scrollToItem(nextItem, false, true, scrollDuration, scrollMarginCorrection);
      utils.setStateAndLog(this, 'Next Item', {
        currentIdx: nextItem
      }, function () {
        _this2.onCurrentItemChanged();

        _this2.isSliding = false;
      });
    } catch (e) {
      console.error('Cannot proceed to the next Item', e);
      this.stopAutoSlideshow();
      return;
    }
  };

  _proto.nextGroup = function nextGroup(_ref3) {
    var _this3 = this;

    var direction = _ref3.direction,
        isAutoTrigger = _ref3.isAutoTrigger,
        _ref3$scrollDuration = _ref3.scrollDuration,
        scrollDuration = _ref3$scrollDuration === void 0 ? 400 : _ref3$scrollDuration;

    if (this.isSliding) {
      return;
    }

    this.isSliding = true;
    direction *= this.props.styleParams.isRTL ? -1 : 1;
    var currentIdx = this.getCenteredGroupIdxByScroll();
    var currentGroup = currentIdx + direction;
    var scrollToGroup = this.props.actions.scrollToGroup;
    this.isAutoScrolling = true;

    if (isAutoTrigger) {
      // ---- Called by the Auto Slideshow ---- //
      if (this.isLastItem()) {
        // maybe this should be isLastItemFullyVisible now that we have both. product- do we allow autoSlideshow in other layouts ( those that could have more than one item displayed in the galleryWidth)
        currentGroup = 0;
        scrollDuration = 0;
      }
    } else {
      // ---- Called by the user (arrows, keys etc.) ---- //
      // this.startAutoSlideshowIfNeeded(this.props.styleParams);
      var scrollingPastLastItem = direction >= 1 && this.isLastItem() || direction <= -1 && this.isFirstItem();

      if (scrollingPastLastItem) {
        this.isSliding = false;
        return;
      }
    } // ---- navigate ---- //


    try {
      var isScrollingPastEdge = !isAutoTrigger && (direction >= 1 && this.isLastItemFullyVisible() || direction <= -1 && this.isFirstItemFullyVisible());
      var scrollMarginCorrection = this.getStyles().margin || 0;
      console.log(currentGroup, false, true, scrollDuration, scrollMarginCorrection);
      !isScrollingPastEdge && scrollToGroup(currentGroup, false, true, scrollDuration, scrollMarginCorrection);
      console.log('setting next item: ', this.getCenteredItemIdxByScroll());
      utils.setStateAndLog(this, 'Next Item', {
        currentIdx: this.getCenteredItemIdxByScroll() + direction
      }, function () {
        _this3.onCurrentItemChanged();

        _this3.isSliding = false;
      });
    } catch (e) {
      console.error('Cannot proceed to the next Group', e);
      this.stopAutoSlideshow();
      return;
    }
  };

  _proto.onCurrentItemChanged = function onCurrentItemChanged() {
    if (this.lastCurrentItem !== this.state.currentIdx) {
      this.lastCurrentItem = this.state.currentIdx; //this.props.actions.onCurrentItemChanged(this.state.currentIdx);

      this.props.actions.eventsListener(events.CURRENT_ITEM_CHANGED, this.props.items[this.state.currentIdx]);
    }

    this.removeArrowsIfNeeded();
  };

  _proto.stopAutoSlideshow = function stopAutoSlideshow() {
    clearInterval(this.autoSlideshowInterval);
  };

  _proto.startAutoSlideshowIfNeeded = function startAutoSlideshowIfNeeded(styleParams) {
    var isAutoSlideshow = styleParams.isAutoSlideshow,
        autoSlideshowInterval = styleParams.autoSlideshowInterval,
        oneRow = styleParams.oneRow;
    this.stopAutoSlideshow();
    if (!oneRow) return;
    if (!(isAutoSlideshow && autoSlideshowInterval > 0 && this.state.isInView && !this.state.shouldStopAutoSlideShow)) return;
    this.autoSlideshowInterval = setInterval(this.autoScrollToNextItem.bind(this), autoSlideshowInterval * 1000);
  };

  _proto.scrollToThumbnail = function scrollToThumbnail(itemIdx, scrollDuration) {
    var _this4 = this;

    if (scrollDuration === void 0) {
      scrollDuration = 400;
    }

    //not to confuse with this.props.actions.scrollToItem. this is used to replace it only for thumbnail items
    this.props.actions.eventsListener(events.THUMBNAIL_CLICKED, this.props);
    this.isAutoScrolling = true;
    this.startAutoSlideshowIfNeeded(this.props.styleParams);
    utils.setStateAndLog(this, 'Scroll to Item', {
      currentIdx: itemIdx
    }, function () {
      _this4.onCurrentItemChanged();
    });
    this.props.actions.scrollToItem(itemIdx, false, true, scrollDuration, 0);
  };

  _proto.handleSlideshowKeyPress = function handleSlideshowKeyPress(e) {
    switch (e.charCode || e.keyCode) {
      case 38: //up

      case 37: //left

      case 33:
        //page up
        e.preventDefault();

        this._next({
          direction: -1,
          isKeyboardNavigation: true
        });

        return false;

      case 39: //right

      case 40: //down

      case 32: //space

      case 34:
        //page down
        e.preventDefault();

        this._next({
          direction: 1,
          isKeyboardNavigation: true
        });

        return false;
    }

    return true; //continue handling the original keyboard event
  };

  _proto.createThumbnails = function createThumbnails(thumbnailPosition) {
    var _this5 = this;

    var items = this.props.items;
    var currentIdx = this.state.currentIdx;

    if (this.props.styleParams.slideshowLoop) {
      if (!this.ItemsForSlideshowLoopThumbnails) {
        this.createNewItemsForSlideshowLoopThumbnails();
      }

      currentIdx += this.numOfThumbnails;
      items = this.ItemsForSlideshowLoopThumbnails;
    }

    if (utils.isVerbose()) {
      console.log('creating thumbnails for idx', currentIdx);
    }

    var width = this.props.styleParams.thumbnailSize;
    var height = this.props.styleParams.thumbnailSize;
    var oneRow;
    var numOfThumbnails;
    var numOfWholeThumbnails;

    switch (thumbnailPosition) {
      case 'top':
      case 'bottom':
        width = this.props.container.galleryWidth + this.props.styleParams.thumbnailSpacings;
        height = this.props.styleParams.thumbnailSize + this.props.styleParams.thumbnailSpacings;
        oneRow = true;
        numOfThumbnails = Math.ceil(width / this.props.styleParams.thumbnailSize);
        numOfWholeThumbnails = Math.floor((width + this.props.styleParams.thumbnailSpacings) / (this.props.styleParams.thumbnailSize + this.props.styleParams.thumbnailSpacings * 2));
        break;

      case 'left':
      case 'right':
        height = this.props.container.galleryHeight + 2 * this.props.styleParams.thumbnailSpacings;
        width = this.props.styleParams.thumbnailSize + 2 * this.props.styleParams.thumbnailSpacings;
        oneRow = false;
        numOfThumbnails = Math.ceil(height / this.props.styleParams.thumbnailSize);
        numOfWholeThumbnails = Math.floor(height / (this.props.styleParams.thumbnailSize + this.props.styleParams.thumbnailSpacings * 2));
        break;
    }

    this.firstItemIdx = currentIdx - Math.floor(numOfThumbnails / 2) - 1;
    this.lastItemIdx = this.firstItemIdx + numOfThumbnails;

    if (this.firstItemIdx < 0) {
      this.lastItemIdx -= this.firstItemIdx;
      this.firstItemIdx = 0;
    }

    if (this.lastItemIdx > items.length - 1) {
      this.firstItemIdx -= this.lastItemIdx - (items.length - 1);

      if (this.firstItemIdx < 0) {
        this.firstItemIdx = 0;
      }

      this.lastItemIdx = items.length - 1;
    }

    numOfThumbnails = this.lastItemIdx - this.firstItemIdx + 1;

    if (numOfThumbnails % 2 === 0 && items.length > numOfThumbnails && this.lastItemIdx < items.length - 1) {
      // keep an odd number of thumbnails if there are more thumbnails than items and if the thumbnails haven't reach the last item yet
      numOfThumbnails += 1;
      this.lastItemIdx += 1;
    }

    var thumbnailsContainerSize = numOfThumbnails * this.props.styleParams.thumbnailSize + ((numOfThumbnails - 1) * 2 + 1) * this.props.styleParams.thumbnailSpacings;
    var thumbnailsStyle = {
      width: width,
      height: height
    };

    if (items.length <= numOfWholeThumbnails || currentIdx < numOfThumbnails / 2 - 1) {
      //there are less thumbnails than available thumbnails spots || one of the first thumbnails
      switch (thumbnailPosition) {
        case 'top':
        case 'bottom':
          thumbnailsStyle.width = thumbnailsContainerSize + 'px';
          thumbnailsStyle.left = 0;
          break;

        case 'left':
        case 'right':
          thumbnailsStyle.height = thumbnailsContainerSize + 'px';
          thumbnailsStyle.marginTop = 0;
          break;
      }
    } else if (currentIdx > numOfThumbnails / 2 - 1 && currentIdx < items.length - numOfThumbnails / 2) {
      //set selected to center only if neeeded
      switch (thumbnailPosition) {
        case 'top':
        case 'bottom':
          thumbnailsStyle.width = thumbnailsContainerSize + 'px';
          thumbnailsStyle.left = (width - thumbnailsContainerSize) / 2 + 'px';
          break;

        case 'left':
        case 'right':
          thumbnailsStyle.height = thumbnailsContainerSize + 'px';
          thumbnailsStyle.marginTop = (height - thumbnailsContainerSize) / 2 + 'px';
          break;
      }
    } else if (currentIdx >= items.length - numOfThumbnails / 2) {
      //one of the last thumbnails
      switch (thumbnailPosition) {
        case 'top':
        case 'bottom':
          thumbnailsStyle.left = width - thumbnailsContainerSize + 'px';
          thumbnailsStyle.overflow = 'visible';
          break;

        case 'left':
        case 'right':
          thumbnailsStyle.top = height - thumbnailsContainerSize + 'px';
          thumbnailsStyle.overflow = 'visible';
          break;
      }
    }

    if (this.props.styleParams.isRTL) {
      thumbnailsStyle.right = thumbnailsStyle.left;
      delete thumbnailsStyle.left;
    }

    var thumbnailsMargin;
    var thumbnailSpacings = this.props.styleParams.thumbnailSpacings;

    switch (this.props.styleParams.galleryThumbnailsAlignment) {
      case 'bottom':
        thumbnailsMargin = thumbnailSpacings + "px -" + thumbnailSpacings + "px 0 -" + thumbnailSpacings + "px";
        break;

      case 'left':
        thumbnailsMargin = "-" + thumbnailSpacings + "px " + thumbnailSpacings + "px -" + thumbnailSpacings + "px 0";
        break;

      case 'top':
        thumbnailsMargin = "0 -" + thumbnailSpacings + "px " + thumbnailSpacings + "px -" + thumbnailSpacings + "px";
        break;

      case 'right':
        thumbnailsMargin = "-" + thumbnailSpacings + "px 0 -" + thumbnailSpacings + "px " + thumbnailSpacings + "px";
        break;
    }

    var getThumbnailItemForSlideshowLoop = function getThumbnailItemForSlideshowLoop(itemId) {
      return _this5.props.galleryStructure.galleryItems.find(function (item) {
        return item.id === itemId;
      });
    };

    var highlighledIdxForSlideshowLoop = Math.floor(numOfThumbnails / 2);
    var thumbnailItems;

    if (this.props.styleParams.slideshowLoop) {
      thumbnailItems = items.slice(this.firstItemIdx, this.lastItemIdx + 1);
    } else {
      thumbnailItems = this.props.galleryStructure.galleryItems.slice(this.firstItemIdx, this.lastItemIdx + 1);
    }

    var thumbnailSize = this.props.styleParams.thumbnailSize;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'pro-gallery inline-styles thumbnails-gallery ' + (oneRow ? ' one-row hide-scrollbars ' : '') + (this.props.styleParams.isRTL ? ' rtl ' : ' ltr ') + (this.props.styleParams.isAccessible ? ' accessible ' : ''),
      style: {
        width: width,
        height: height,
        margin: thumbnailsMargin
      },
      "data-hook": "gallery-thumbnails"
    }, /*#__PURE__*/react_default.a.createElement("div", {
      "data-hook": "gallery-thumbnails-column",
      className: 'galleryColumn',
      key: 'thumbnails-column',
      style: Object.assign(thumbnailsStyle, {
        width: width,
        height: height
      })
    }, thumbnailItems.map(function (item, idx) {
      var _ref4;

      var thumbnailItem = _this5.props.styleParams.slideshowLoop ? getThumbnailItemForSlideshowLoop(item.itemId || item.photoId) : item;
      var highlighted = _this5.props.styleParams.slideshowLoop ? idx === highlighledIdxForSlideshowLoop : thumbnailItem.idx === currentIdx;
      var itemStyle = {
        width: thumbnailSize,
        height: thumbnailSize,
        margin: thumbnailSpacings,
        backgroundImage: "url(" + thumbnailItem.createUrl(URL_SIZES.THUMBNAIL, URL_TYPES.HIGH_RES) + ")"
      };
      var thumbnailOffset = oneRow ? (_ref4 = {}, _ref4[_this5.props.styleParams.isRTL ? 'right' : 'left'] = thumbnailSize * idx + 2 * idx * thumbnailSpacings, _ref4) : {
        top: thumbnailSize * idx + 2 * idx * thumbnailSpacings
      };
      Object.assign(itemStyle, thumbnailOffset);
      return /*#__PURE__*/react_default.a.createElement("div", {
        key: 'thumbnail-' + thumbnailItem.id + (Number.isInteger(item.loopIndex) ? '-' + item.loopIndex : ''),
        className: 'thumbnailItem' + (highlighted ? ' pro-gallery-thumbnails-highlighted gallery-item-container highlight' + (utils.isMobile() ? ' pro-gallery-mobile-indicator' : '') : ''),
        "data-key": thumbnailItem.id,
        style: itemStyle,
        onContextMenu: function onContextMenu(e) {
          return _this5.onContextMenu(e);
        },
        onClick: function onClick() {
          return _this5.scrollToThumbnail(thumbnailItem.idx);
        }
      });
    })));
  };

  _proto.onContextMenu = function onContextMenu(e) {
    if (!utils.isDev()) {
      e.preventDefault(e);
    }
  };

  _proto.getCenteredItemIdxByScroll = function getCenteredItemIdxByScroll() {
    var scrollLeft = this.container && this.container.scrollLeft || 0; // console.log('[RTL SCROLL] setCurrentItemByScroll: ', scrollLeft);

    var items = this.props.galleryStructure.galleryItems;
    var centeredIdx;
    var scrollPos = this.props.styleParams.isRTL ? this.props.galleryStructure.width - scrollLeft - this.props.container.galleryWidth / 2 : scrollLeft + this.props.container.galleryWidth / 2;

    if (scrollPos === 0) {
      centeredIdx = 0;
    } else {
      for (var item, i = 0; item = items[i]; i++) {
        if (item.offset.left > scrollPos) {
          centeredIdx = i - 1;
          break;
        }
      }
    }

    if (!(centeredIdx >= 0)) {
      centeredIdx = items.length - 1;
    }

    return centeredIdx;
  };

  _proto.getCenteredGroupIdxByScroll = function getCenteredGroupIdxByScroll() {
    var scrollLeft = this.container && this.container.scrollLeft || 0; // console.log('[RTL SCROLL] setCurrentItemByScroll: ', scrollLeft);

    var groups = this.props.galleryStructure.groups;
    var centeredGroupIdx;
    var scrollPos = this.props.styleParams.isRTL ? this.props.galleryStructure.width - scrollLeft - this.props.container.galleryWidth / 2 : scrollLeft + this.props.container.galleryWidth / 2;

    if (scrollPos === 0) {
      centeredGroupIdx = 0;
    } else {
      for (var group, i = 0; group = groups[i]; i++) {
        if (group.left > scrollPos) {
          centeredGroupIdx = i - 1;
          break;
        }
      }
    }

    if (!(centeredGroupIdx >= 0)) {
      centeredGroupIdx = groups.length - 1;
    }

    return centeredGroupIdx;
  };

  _proto.setCurrentItemByScroll = function setCurrentItemByScroll() {
    var _this6 = this;

    if (utils.isVerbose()) {
      console.log('Setting current Idx by scroll', this.isAutoScrolling);
    }

    if (this.isAutoScrolling) {
      //avoid this function if the scroll was originated by us (arrows or thumbnails)
      this.isAutoScrolling = false;
      return;
    }

    var isScrolling = (this.container && this.container.getAttribute('data-scrolling')) === 'true';

    if (isScrolling) {
      this.stopAutoSlideshow(); //while the scroll is animating, prevent the reaction to this event

      return;
    }

    this.startAutoSlideshowIfNeeded(this.props.styleParams);
    var currentIdx = this.getCenteredItemIdxByScroll();

    if (!utils.isUndefined(currentIdx)) {
      utils.setStateAndLog(this, 'Set Current Item', {
        currentIdx: currentIdx
      }, function () {
        _this6.onCurrentItemChanged();
      });
    }

    return currentIdx;
  };

  _proto.createDebugMsg = function createDebugMsg() {
    return /*#__PURE__*/react_default.a.createElement(galleryDebugMessage, this.props.debug);
  };

  _proto.createNavArrows = function createNavArrows() {
    var _this7 = this;

    var _this$props$stylePara2 = this.props.styleParams,
        isRTL = _this$props$stylePara2.isRTL,
        oneRow = _this$props$stylePara2.oneRow,
        arrowsColor = _this$props$stylePara2.arrowsColor,
        isSlideshow = _this$props$stylePara2.isSlideshow,
        slideshowInfoSize = _this$props$stylePara2.slideshowInfoSize,
        imageMargin = _this$props$stylePara2.imageMargin,
        arrowsSize = _this$props$stylePara2.arrowsSize,
        arrowsPosition = _this$props$stylePara2.arrowsPosition,
        showArrows = _this$props$stylePara2.showArrows;
    var shouldNotRenderNavArrows = !showArrows || this.props.galleryStructure.columns.some(function (column) {
      var allRenderedGroups = column.groups.filter(function (group) {
        return group.rendered;
      }) || [];
      var allGroupsWidth = allRenderedGroups.reduce(function (sum, group) {
        return sum + Math.max(0, group.width);
      }, 0);
      var isAllItemsFitsGalleryWidth = oneRow && _this7.props.container.galleryWidth >= allGroupsWidth;
      return isAllItemsFitsGalleryWidth;
    }); //remove navBars if no scroll is needed and is column layout

    if (shouldNotRenderNavArrows) {
      return null;
    }

    var arrowWidth = this.props.styleParams.arrowsSize;
    var arrowOrigWidth = 23; //arrow-right svg and arrow-left svg width

    var scalePercentage = arrowWidth / arrowOrigWidth;
    var imageStyle = {
      transform: "scale(" + scalePercentage + ")"
    };
    var svgStyle = {};

    if (utils.isMobile()) {
      if (typeof arrowsColor !== 'undefined') {
        svgStyle.fill = arrowsColor.value;
      }
    } // nav-arrows-container width is 100. arrowWidth + padding on each side should be 100


    var containerPadding = (100 - arrowWidth) / 2;
    var slideshowSpace = isSlideshow ? slideshowInfoSize : 0; // top: imageMargin effect the margin of the main div that SlideshowView is rendering, so the arrows should be places accordingly. 50% is the middle, 50px is half of nav-arrows-container height

    var containerStyle = {
      padding: "0 " + containerPadding + "px 0 " + containerPadding + "px",
      top: "calc(50% - 50px + " + imageMargin / 2 + "px - " + slideshowSpace / 2 + "px)"
    }; // Add negative positioning for external arrows. consists of arrow size, half of arrow container and padding

    var arrowsPos = oneRow && arrowsPosition ? "-" + (arrowsSize + 50 + 10) + "px" : imageMargin + "px"; // left & right: imageMargin effect the margin of the main div that SlideshowView is rendering, so the arrows should be places accordingly

    var prevContainerStyle = {
      left: arrowsPos
    };
    var nextContainerStyle = {
      right: arrowsPos
    };
    var _this$state = this.state,
        hideLeftArrow = _this$state.hideLeftArrow,
        hideRightArrow = _this$state.hideRightArrow;
    return [hideLeftArrow ? null : /*#__PURE__*/react_default.a.createElement("button", {
      className: 'nav-arrows-container prev ' + (utils.isMobile() ? 'pro-gallery-mobile-indicator ' : ''),
      onClick: function onClick() {
        return _this7._next({
          direction: -1
        });
      },
      "aria-label": (isRTL ? 'Next' : 'Previous') + " Item",
      tabIndex: utils.getTabIndex('slideshowPrev'),
      key: "nav-arrow-back",
      "data-hook": "nav-arrow-back",
      style: slideshowView_objectSpread(slideshowView_objectSpread({}, containerStyle), prevContainerStyle)
    }, /*#__PURE__*/react_default.a.createElement("svg", {
      width: "23",
      height: "39",
      viewBox: "0 0 23 39",
      style: imageStyle
    }, /*#__PURE__*/react_default.a.createElement("path", {
      className: "slideshow-arrow",
      style: svgStyle,
      d: "M154.994,259.522L153.477,261l-18.471-18,18.473-18,1.519,1.48L138.044,243Z",
      transform: "translate(-133 -225)"
    }))), hideRightArrow ? null : /*#__PURE__*/react_default.a.createElement("button", {
      className: 'nav-arrows-container next',
      onClick: function onClick() {
        return _this7._next({
          direction: 1
        });
      },
      "aria-label": (!isRTL ? 'Next' : 'Previous') + " Item",
      tabIndex: utils.getTabIndex('slideshowNext'),
      key: "nav-arrow-next",
      "data-hook": "nav-arrow-next",
      style: slideshowView_objectSpread(slideshowView_objectSpread({}, containerStyle), nextContainerStyle)
    }, /*#__PURE__*/react_default.a.createElement("svg", {
      width: "23",
      height: "39",
      viewBox: "0 0 23 39",
      style: imageStyle
    }, /*#__PURE__*/react_default.a.createElement("path", {
      className: "slideshow-arrow",
      style: svgStyle,
      d: "M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z",
      transform: "translate(-855 -230)"
    })))];
  };

  _proto.createLayout = function createLayout() {
    var _this8 = this;

    var itemsLoveData = this.props.itemsLoveData;
    var galleryConfig = {
      scrollingElement: this.props.scrollingElement,
      totalItemsCount: this.props.totalItemsCount,
      scroll: this.props.scroll,
      styleParams: this.props.styleParams,
      container: this.props.container,
      watermark: this.props.watermark,
      settings: this.props.settings,
      lazyLoad: this.props.lazyLoad,
      currentIdx: this.state.currentIdx,
      customHoverRenderer: this.props.customHoverRenderer,
      customInfoRenderer: this.props.customInfoRenderer,
      customSlideshowInfoRenderer: this.props.customSlideshowInfoRenderer,
      noFollowForSEO: this.props.noFollowForSEO,
      domId: this.props.domId,
      playingVideoIdx: this.props.playingVideoIdx,
      nextVideoIdx: this.props.nextVideoIdx,
      totalWidth: this.props.galleryStructure.width,
      actions: {
        eventsListener: this.props.actions.eventsListener
      }
    };
    return this.props.galleryStructure.columns.map(function (column, c) {
      var columnStyle = {
        width: column.width,
        height: _this8.props.container.galleryHeight
      };

      if (_this8.props.styleParams.isSlideshow) {
        Object.assign(columnStyle, {
          paddingBottom: _this8.props.styleParams.slideshowInfoSize
        });
      }

      return /*#__PURE__*/react_default.a.createElement("div", {
        "data-hook": "gallery-column",
        id: "gallery-horizontal-scroll",
        className: "gallery-horizontal-scroll gallery-column hide-scrollbars " + (_this8.props.styleParams.isRTL ? ' rtl ' : ' ltr ') + " " + (_this8.props.styleParams.scrollSnap ? ' scroll-snap ' : '') + " ",
        key: 'column' + c,
        style: columnStyle
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "gallery-horizontal-scroll-inner"
      }, !!column.galleryGroups.length && column.galleryGroups.map(function (group) {
        return group.rendered ? /*#__PURE__*/react_default.a.createElement(groupView, slideshowView_objectSpread({
          allowLoop: _this8.props.styleParams.slideshowLoop && _this8.props.galleryStructure.width > _this8.props.container.width,
          itemsLoveData: itemsLoveData
        }, group.renderProps(galleryConfig))) : false;
      })));
    });
  };

  _proto.createGallery = function createGallery() {
    // When arrows are set outside of the gallery, gallery is resized and needs to be positioned
    var galleryStyleForExternalArrows = this.props.styleParams.oneRow && this.props.styleParams.arrowsPosition ? {
      overflow: 'visible',
      left: this.props.styleParams.arrowsSize + 40 + this.props.styleParams.imageMargin
    } : {};

    var galleryStyle = slideshowView_objectSpread({
      height: this.props.container.galleryHeight,
      width: this.props.container.galleryWidth
    }, galleryStyleForExternalArrows);

    if (this.props.styleParams.isSlideshow) {
      Object.assign(galleryStyle, {
        paddingBottom: this.props.styleParams.slideshowInfoSize
      });
    }

    return /*#__PURE__*/react_default.a.createElement("div", {
      id: "pro-gallery-container",
      className: 'pro-gallery inline-styles one-row hide-scrollbars ' + (this.props.styleParams.enableScroll ? ' slider ' : '') + (this.props.styleParams.isAccessible ? ' accessible ' : '') + (this.props.styleParams.isRTL ? ' rtl ' : ' ltr '),
      style: galleryStyle
    }, this.createDebugMsg(), this.createNavArrows(), this.createLayout(), this.createAutoSlideShowPlayButton(), this.createSlideShowNumbers());
  };

  _proto.onAutoSlideShowButtonClick = function onAutoSlideShowButtonClick() {
    var _this9 = this;

    var currShouldStopAutoSlideShow = this.state.shouldStopAutoSlideShow;
    this.setState({
      shouldStopAutoSlideShow: !currShouldStopAutoSlideShow
    }, function () {
      _this9.startAutoSlideshowIfNeeded(_this9.props.styleParams);
    });
  };

  _proto.isFullWidthGallery = function isFullWidthGallery() {
    return this.props.container.galleryWidth >= utils.getWindowWidth() - 10;
  };

  _proto.onAutoSlideshowAutoPlayKeyPress = function onAutoSlideshowAutoPlayKeyPress(e) {
    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.preventDefault();
        e.stopPropagation();
        this.onAutoSlideShowButtonClick();
        return false;

      default:
        return true;
    }
  };

  _proto.calcSlideshowCounterWidth = function calcSlideshowCounterWidth() {
    var totalItemsCount = this.props.totalItemsCount;

    if (totalItemsCount < 10) {
      // x/x
      return 26;
    } else if (totalItemsCount < 100) {
      // xx/xx
      return 43;
    } else if (totalItemsCount < 1000) {
      // xxx/xxx
      return 60;
    } else {
      // xxxx/xxxx or more
      return 76;
    }
  };

  _proto.createAutoSlideShowPlayButton = function createAutoSlideShowPlayButton() {
    var _this10 = this;

    if (!this.shouldCreateSlideShowPlayButton) {
      return false;
    }

    var _this$props$stylePara3 = this.props.styleParams,
        galleryTextAlign = _this$props$stylePara3.galleryTextAlign,
        slideshowInfoSize = _this$props$stylePara3.slideshowInfoSize;
    var imageMargin = this.props.styleParams.imageMargin + (this.isFullWidthGallery() ? 50 : 0);
    var side = galleryTextAlign === 'right' ? {
      left: imageMargin + "px"
    } : {
      right: imageMargin + (this.shouldCreateSlideShowNumbers ? this.calcSlideshowCounterWidth() : 0) + "px"
    };
    return /*#__PURE__*/react_default.a.createElement("button", {
      className: 'auto-slideshow-button',
      onClick: function onClick() {
        _this10.onAutoSlideShowButtonClick();
      },
      onKeyDown: this.onAutoSlideshowAutoPlayKeyPress,
      "data-hook": "auto-slideshow-button",
      title: 'slideshow auto play',
      "aria-pressed": this.state.shouldStopAutoSlideShow,
      tabIndex: 0,
      style: slideshowView_objectSpread({
        top: "calc(100% - " + slideshowInfoSize + "px + 3px)"
      }, side)
    }, this.state.shouldStopAutoSlideShow ? /*#__PURE__*/react_default.a.createElement(components_play, {
      width: "10px",
      height: "100%"
    }) : /*#__PURE__*/react_default.a.createElement(components_pause, {
      width: "10px",
      height: "100%"
    }));
  };

  _proto.createSlideShowNumbers = function createSlideShowNumbers() {
    if (!this.shouldCreateSlideShowNumbers) {
      return false;
    }

    var _this$props = this.props,
        totalItemsCount = _this$props.totalItemsCount,
        _this$props$stylePara4 = _this$props.styleParams,
        galleryTextAlign = _this$props$stylePara4.galleryTextAlign,
        slideshowInfoSize = _this$props$stylePara4.slideshowInfoSize;
    var imageMargin = this.props.styleParams.imageMargin + (this.isFullWidthGallery() ? 50 : 0);
    var leftMargin = this.shouldCreateSlideShowPlayButton ? imageMargin + 25 : imageMargin;
    var side = galleryTextAlign === 'right' ? {
      left: leftMargin + "px"
    } : {
      right: imageMargin + "px"
    };
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'auto-slideshow-counter',
      "data-hook": "auto-slideshow-counter",
      style: slideshowView_objectSpread({
        top: "calc(100% - " + slideshowInfoSize + "px + 3px)"
      }, side)
    }, /*#__PURE__*/react_default.a.createElement("div", null, this.state.currentIdx % totalItemsCount + 1 + '/' + totalItemsCount));
  };

  _proto.getThumbnails = function getThumbnails() {
    var hasThumbnails = this.props.styleParams.hasThumbnails;
    var thumbnailsPosition = this.props.styleParams.galleryThumbnailsAlignment;
    var thumbnailsGallery = hasThumbnails ? this.createThumbnails(thumbnailsPosition) : false;
    var thumbnails = [];

    switch (thumbnailsPosition) {
      case 'top':
      case 'left':
        thumbnails[0] = thumbnailsGallery;
        thumbnails[1] = false;
        break;

      case 'right':
      case 'bottom':
        thumbnails[0] = false;
        thumbnails[1] = thumbnailsGallery;
        break;
    }

    return thumbnails;
  };

  _proto.getClassNames = function getClassNames() {
    var classNames = 'pro-gallery-parent-container';

    if (this.props.styleParams.isSlideshow) {
      classNames += ' gallery-slideshow';
    } else if (this.props.styleParams.isSlider) {
      classNames += ' gallery-slider';
    } else if (this.props.styleParams.hasThumbnails) {
      classNames += ' gallery-thumbnails';
    } else if (this.props.styleParams.isColumns) {
      classNames += ' gallery-columns';
    }

    if (this.isFullWidthGallery()) {
      classNames += ' streched';
    }

    return classNames;
  };

  _proto.getStyles = function getStyles() {
    return {
      margin: -1 * (this.props.styleParams.imageMargin - this.props.styleParams.galleryMargin)
    };
  } //-----------------------------------------| REACT |--------------------------------------------//
  ;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _this11 = this;

    if (props.items) {
      this.ItemsForSlideshowLoopThumbnails = false;
    }

    if (this.props.isInDisplay !== props.isInDisplay) {
      this.setState({
        isInView: props.isInDisplay
      }, function () {
        return _this11.startAutoSlideshowIfNeeded(props.styleParams);
      });
    }

    if (viewModeWrapper_isEditMode() || viewModeWrapper_isPreviewMode()) {
      if ( //check that the change is related to the slideshow settings
      this.props.styleParams.isAutoSlideshow !== props.styleParams.isAutoSlideshow || this.props.styleParams.autoSlideshowInterval !== props.styleParams.autoSlideshowInterval) {
        this.startAutoSlideshowIfNeeded(props.styleParams);
      }
    }

    var isAutoSlideShow = props.styleParams.galleryLayout === 5 && props.styleParams.isSlideshow && props.styleParams.isAutoSlideshow;
    this.shouldCreateSlideShowPlayButton = isAutoSlideShow && props.styleParams.playButtonForAutoSlideShow;
    this.shouldCreateSlideShowNumbers = isAutoSlideShow && props.styleParams.allowSlideshowCounter;
  };

  _proto.removeArrowsIfNeeded = function removeArrowsIfNeeded() {
    var _this12 = this;

    setTimeout(function () {
      var atStart = _this12.isScrollStart() || _this12.isFirstItem();

      var atEnd = _this12.isScrollEnd() || _this12.isLastItem();

      var isRTL = _this12.props.styleParams.isRTL;
      var _this12$state = _this12.state,
          hideLeftArrow = _this12$state.hideLeftArrow,
          hideRightArrow = _this12$state.hideRightArrow;
      var nextHideLeft = !isRTL && atStart || isRTL && atEnd;
      var nextHideRight = isRTL && atStart || !isRTL && atEnd;
      var isNew = nextHideLeft !== hideLeftArrow || nextHideRight !== hideRightArrow;

      if (isNew) {
        _this12.setState({
          hideLeftArrow: nextHideLeft,
          hideRightArrow: nextHideRight
        });
      }
    }, 500);
  };

  _proto.navigationOutHandler = function navigationOutHandler() {
    //TODO remove after full refactor release
    utils.setStateAndLog(this, 'Next Item', {
      isInView: false
    });
    this.stopAutoSlideshow();
  };

  _proto.navigationInHandler = function navigationInHandler() {
    //TODO remove after full refactor release
    utils.setStateAndLog(this, 'Next Item', {
      isInView: true
    });
    this.startAutoSlideshowIfNeeded(this.props.styleParams);
  };

  _proto.componentDidMount = function componentDidMount() {
    window_windowWrapper.addEventListener('gallery_navigation_out', this.navigationOutHandler);
    window_windowWrapper.addEventListener('gallery_navigation_in', this.navigationInHandler);
    this.container = window_windowWrapper.document.querySelector("#pro-gallery-" + this.props.domId + " #gallery-horizontal-scroll");

    if (this.container) {
      this.container.addEventListener('scroll', this._setCurrentItemByScroll);
    }

    if (this.state.currentIdx > 0) {
      this.props.actions.scrollToItem(this.state.currentIdx);
    } else {
      this.setCurrentItemByScroll();
    }

    this.startAutoSlideshowIfNeeded(this.props.styleParams);
    this.removeArrowsIfNeeded();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window_windowWrapper.removeEventListener('gallery_navigation_out', this.navigationOutHandler);
    window_windowWrapper.removeEventListener('gallery_navigation_in', this.navigationInHandler);

    if (this.container) {
      this.container.removeEventListener('scroll', this._setCurrentItemByScroll);
    }
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    if (utils.isVerbose()) {
      console.count('galleryView render');
      console.count('Rendering Gallery count');
      console.time('Rendering Gallery took ');
    }

    var gallery = this.createGallery();
    var thumbnails = this.getThumbnails();

    if (utils.isVerbose()) {
      console.timeEnd('Rendering Gallery took ');
    }

    return /*#__PURE__*/react_default.a.createElement("div", {
      className: this.getClassNames(),
      style: this.getStyles(),
      onKeyDown: this.handleSlideshowKeyPress,
      role: "region",
      "aria-label": this.props.proGalleryRegionLabel
    }, thumbnails[0], gallery, thumbnails[1]);
  };

  return SlideshowView;
}(galleryComponent_GalleryComponent);

/* harmony default export */ var slideshowView = (slideshowView_SlideshowView);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/gallerySizeType.js
var GALLERY_SIZE_TYPE = {
  SMART: 'smart',
  PIXELS: 'px',
  RATIO: 'ratio'
};
/* harmony default export */ var constants_gallerySizeType = (GALLERY_SIZE_TYPE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/dimensionsHelper.js



var dimensionsHelper_DimensionsHelper = /*#__PURE__*/function () {
  function DimensionsHelper() {
    this.styles = {};
    this.container = {};
    this.domId = '';
    this._cache = {};
  }

  var _proto = DimensionsHelper.prototype;

  _proto.getOrPutInCache = function getOrPutInCache(field, createValue) {
    if (this._cache[field]) return this._cache[field];
    this._cache[field] = createValue();
    return this._cache[field];
  };

  _proto.dumpCache = function dumpCache() {
    this._cache = {};
  };

  _proto.updateParams = function updateParams(_ref) {
    var styles = _ref.styles,
        container = _ref.container,
        domId = _ref.domId;
    this.dumpCache();
    this.domId = domId || this.domId;
    this.styles = styles || this.styles;
    this.container = container || this.container;
  };

  _proto.getGalleryDimensions = function getGalleryDimensions() {
    var _this = this;

    return this.getOrPutInCache('galleryDimensions', function () {
      if (!utils.isSSR() && !_this.container.avoidGallerySelfMeasure) {
        if (_this.isUnknownWidth()) {
          _this.tryCalcAndSetContainerWidth(); //will try to set container.width

        }

        if (_this.isUnknownHeight()) {
          _this.tryCalcAndSetContainerHeight(); //will try to set container.height

        }

        if (typeof _this.container.scrollBase === 'undefined') {
          _this.calcScrollBase(); //will set container.scrollBase

        }
      }

      var res = {
        galleryWidth: Math.ceil(_this.getGalleryWidth()),
        galleryHeight: Math.ceil(_this.getGalleryHeight()),
        scrollBase: _this.container.scrollBase ? Math.ceil(_this.container.scrollBase) : 0,
        height: Math.ceil(_this.container.height),
        width: Math.ceil(_this.container.width)
      };

      if (_this.container.externalScrollBase) {
        //if was provided from the wrapper
        res.scrollBase += _this.container.externalScrollBase;
      }

      if (_this.styles.hasThumbnails) {
        var fixedThumbnailSize = _this.styles.thumbnailSize + _this.styles.galleryMargin + 3 * _this.styles.thumbnailSpacings;

        switch (_this.styles.galleryThumbnailsAlignment) {
          case 'top':
          case 'bottom':
            res.galleryHeight -= fixedThumbnailSize;
            break;

          case 'left':
          case 'right':
            res.galleryWidth -= fixedThumbnailSize;
            break;

          default:
            break;
        }
      } else if (_this.styles.isSlideshow) {
        res.galleryHeight -= _this.styles.slideshowInfoSize;
      }

      return res;
    });
  };

  _proto.isUnknownWidth = function isUnknownWidth(container) {
    if (container === void 0) {
      container = this.container;
    }

    //if the container width is not a number, it is unknownWidth (e.g.: "", "100%", "calc(100% + -160px)")
    return !(container.width > 0);
  };

  _proto.isUnknownHeight = function isUnknownHeight(container) {
    if (container === void 0) {
      container = this.container;
    }

    //if the container height is not a number, it is unknownHeight (e.g.: "", "100%", "calc(100% + -160px)")
    return !(container.height > 0);
  };

  _proto.tryCalcAndSetContainerWidth = function tryCalcAndSetContainerWidth() {
    var boundingRect = this.calcBoundingRect();
    var calcWidth = boundingRect && boundingRect.width;

    if (calcWidth) {
      this.container.width = calcWidth;

      if (utils.isVerbose()) {
        console.log('Pro-Gallery calculated width');
      }
    }
  };

  _proto.tryCalcAndSetContainerHeight = function tryCalcAndSetContainerHeight() {
    var boundingRect = this.calcBoundingRect();
    var calcHeight = boundingRect && boundingRect.height;

    if (calcHeight > 0) {
      this.container.height = calcHeight;

      if (utils.isVerbose()) {
        console.log('Pro-Gallery calculated height');
      }
    } else if (calcHeight === 0) {
      this.container.height = 200; //default height, just to not be 0

      if (utils.isVerbose()) {
        console.log('Pro-Gallery calculated height of 0, will set manually to 200');
      }
    }
  };

  _proto.getGalleryWidth = function getGalleryWidth() {
    var _this2 = this;

    return this.getOrPutInCache('galleryWidth', function () {
      var domWidth = function domWidth() {
        return window_windowWrapper.isMock ? utils.getScreenWidth() : window_windowWrapper.innerWidth;
      };

      var width = Math.floor((_this2.container.width > 0 ? _this2.container.width : domWidth()) + _this2.getDimensionFix() * 2); //add margins to width and then remove them in css negative margins

      if (_this2.styles.arrowsPosition && _this2.styles.oneRow) {
        width -= 2 * (_this2.styles.arrowsSize + 40 + _this2.styles.imageMargin);
      }

      return width;
    });
  };

  _proto.getGalleryHeight = function getGalleryHeight() {
    var _this3 = this;

    return this.getOrPutInCache('galleryHeight', function () {
      //const offsetTop = this.styles.oneRow ? this.container.offsetTop : 0;
      var dimensionFix = function dimensionFix() {
        return _this3.styles.oneRow ? _this3.getDimensionFix() : 0;
      };

      var domHeight = function domHeight() {
        return _this3.container.avoidGallerySelfMeasure ? 0 : window_windowWrapper.isMock ? utils.getScreenHeight() : window_windowWrapper.innerHeight;
      }; //() => protectGalleryHeight(this.container.windowHeight, offsetTop);


      var res = Math.floor((_this3.container.height > 0 ? _this3.container.height : domHeight()) + dimensionFix());
      return res;
    });
  };

  _proto.calcScrollBase = function calcScrollBase() {
    var _this4 = this;

    return this.getOrPutInCache('scrollBase', function () {
      var scrollBase = 0;

      try {
        var offset = _this4.getBoundingRect().y - _this4.getBodyBoundingRect().y; //clientRect are relative to the viewport, thus affected by scroll and need to be normalized to the body


        if (offset >= 0) {
          scrollBase += offset;
        }

        if (utils.isVerbose()) {
          console.log('Pro-Gallery calculated scrollBase');
        }
      } catch (e) {//
      }

      _this4.container.scrollBase = scrollBase;
      return scrollBase;
    });
  };

  _proto.getBoundingRect = function getBoundingRect() {
    var _this5 = this;

    return this.getOrPutInCache('boundingRect', function () {
      return _this5.calcBoundingRect() || {
        x: 0,
        y: 0,
        width: _this5.avoidGallerySelfMeasure ? 0 : window_windowWrapper.innerWidth,
        height: _this5.avoidGallerySelfMeasure ? 0 : window_windowWrapper.innerHeight
      };
    });
  };

  _proto.calcBoundingRect = function calcBoundingRect() {
    if (utils.isVerbose()) {
      console.count('calcBoundingRect');
    }

    try {
      var proGalleryElement = window_windowWrapper.document.getElementById("pro-gallery-" + this.domId);
      utils.isVerbose() && console.log('pro gallery element =', proGalleryElement);
      return proGalleryElement.getBoundingClientRect();
    } catch (e) {
      return false;
    }
  };

  _proto.calcBodyBoundingRect = function calcBodyBoundingRect() {
    if (utils.isVerbose()) {
      console.count('calcBodyBoundingRect');
    }

    try {
      return window_windowWrapper.document.body.getBoundingClientRect();
    } catch (e) {
      return false;
    }
  };

  _proto.getBodyBoundingRect = function getBodyBoundingRect() {
    var _this6 = this;

    return this.getOrPutInCache('bodyBoundingRect', function () {
      return _this6.calcBodyBoundingRect() || {
        x: 0,
        y: 0,
        width: window_windowWrapper.innerWidth,
        height: window_windowWrapper.innerHeight
      };
    });
  };

  _proto.getDimensionFix = function getDimensionFix() {
    var _this7 = this;

    return this.getOrPutInCache('dimensionFix', function () {
      return Number(_this7.styles.imageMargin) - Number(_this7.styles.galleryMargin);
    });
  };

  _proto.getGalleryRatio = function getGalleryRatio() {
    var _this8 = this;

    return this.getOrPutInCache('galleryRatio', function () {
      var res = _this8.getGalleryDimensions();

      return res.galleryWidth / res.galleryHeight;
    });
  };

  return DimensionsHelper;
}();

/* harmony default export */ var dimensionsHelper = (new dimensionsHelper_DimensionsHelper());
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/textBoxHeightCalculationOptions.js
var TEXT_BOX_HEIGHT_CALCULATION_OPTIONS = {
  AUTOMATIC: 'AUTOMATIC',
  MANUAL: 'MANUAL'
};
/* harmony default export */ var textBoxHeightCalculationOptions = (TEXT_BOX_HEIGHT_CALCULATION_OPTIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/textBoxWidthCalculationOptions.js
var TEXT_BOX_WIDTH_CALCULATION_OPTIONS = {
  PERCENT: 'PERCENT',
  MANUAL: 'MANUAL'
};
/* harmony default export */ var textBoxWidthCalculationOptions = (TEXT_BOX_WIDTH_CALCULATION_OPTIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/scrollDirection.js
var SCROLL_DIRECTION = {
  VERTICAL: 0,
  HORIZONTAL: 1
};
/* harmony default export */ var constants_scrollDirection = (SCROLL_DIRECTION);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/loadingWithColorMode.js
var LOADING_WITH_COLOR_MODE = {
  PICKED_COLOR: 'PICKED_COLOR',
  MAIN_COLOR: 'MAIN_COLOR'
};
/* harmony default export */ var loadingWithColorMode = (LOADING_WITH_COLOR_MODE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/layout.js
var LAYOUTS = {
  EMPTY: -1,
  COLLAGE: 0,
  MASONRY: 1,
  GRID: 2,
  THUMBNAIL: 3,
  SLIDER: 4,
  SLIDESHOW: 5,
  PANORAMA: 6,
  COLUMN: 7,
  MAGIC: 8,
  FULLSIZE: 9,
  BRICKS: 10,
  MIX: 11,
  ALTERNATE: 12
};
/* harmony default export */ var constants_layout = (LAYOUTS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/alternateGallery.js
function alternateGallery_extends() { alternateGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return alternateGallery_extends.apply(this, arguments); }

function alternateGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function alternateGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function alternateGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { alternateGallery_ownKeys(Object(source), true).forEach(function (key) { alternateGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { alternateGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function alternateGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var fixedStyles = {
  galleryLayout: constants_layout.ALTERNATE,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 1,
  titlePlacement: placements.SHOW_ON_HOVER,
  scrollDirection: constants_scrollDirection.VERTICAL,
  galleryMargin: 0,
  isVertical: true,
  groupSize: 3,
  collageDensity: 0.48,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 86,
  minItemSize: 50,
  chooseBestGroup: true,
  rotatingGroupTypes: '1,2h,1,2h',
  smartCrop: false,
  floatingImages: 0,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  rotatingCropRatios: ''
};
var createStyles = function createStyles(styles) {
  return alternateGallery_objectSpread(alternateGallery_objectSpread({}, styles), fixedStyles);
};

var alternateGallery_alternateGallery = /*#__PURE__*/function (_React$Component) {
  alternateGallery_inheritsLoose(alternateGallery, _React$Component);

  function alternateGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = alternateGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, alternateGallery_extends({}, this.props, {
      styles: createStyles(this.props.styles)
    }));
  };

  return alternateGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/bricksGallery.js
function bricksGallery_extends() { bricksGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return bricksGallery_extends.apply(this, arguments); }

function bricksGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function bricksGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bricksGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bricksGallery_ownKeys(Object(source), true).forEach(function (key) { bricksGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bricksGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bricksGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var bricksGallery_fixedStyles = {
  galleryLayout: constants_layout.BRICKS,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 1,
  titlePlacement: placements.SHOW_ON_HOVER,
  scrollDirection: constants_scrollDirection.VERTICAL,
  galleryMargin: 0,
  isVertical: true,
  groupSize: 3,
  collageDensity: 0.8,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 400,
  minItemSize: 50,
  chooseBestGroup: true,
  rotatingGroupTypes: '2h',
  smartCrop: false,
  floatingImages: 0,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  rotatingCropRatios: '0.707,1.414,1.414,0.707'
};
var bricksGallery_createStyles = function createStyles(styles) {
  return bricksGallery_objectSpread(bricksGallery_objectSpread({}, styles), bricksGallery_fixedStyles);
};

var bricksGallery_BricksGallery = /*#__PURE__*/function (_React$Component) {
  bricksGallery_inheritsLoose(BricksGallery, _React$Component);

  function BricksGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BricksGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, bricksGallery_extends({}, this.props, {
      styles: bricksGallery_createStyles(this.props.styles)
    }));
  };

  return BricksGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/collageGallery.js
function collageGallery_extends() { collageGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return collageGallery_extends.apply(this, arguments); }

function collageGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function collageGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function collageGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { collageGallery_ownKeys(Object(source), true).forEach(function (key) { collageGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { collageGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function collageGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var collageGallery_fixedStyles = {
  galleryLayout: constants_layout.COLLAGE,
  cubeImages: false,
  titlePlacement: placements.SHOW_ON_HOVER,
  groupSize: 3,
  hasThumbnails: false,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 0,
  fixedColumns: 0,
  enableScroll: true,
  isGrid: false,
  isSlider: false,
  isMasonry: false,
  isColumns: false,
  isSlideshow: false,
  cropOnlyFill: false
};
var collageGallery_createStyles = function createStyles(styles) {
  return collageGallery_objectSpread(collageGallery_objectSpread(collageGallery_objectSpread({}, styles), collageGallery_fixedStyles), {}, {
    gallerySize: styles.modifiedGallerySize ? styles.gallerySize : Math.round(styles.gallerySize * 5 + 500),
    modifiedGallerySize: true
  });
};

var collageGallery_CollageGallery = /*#__PURE__*/function (_React$Component) {
  collageGallery_inheritsLoose(CollageGallery, _React$Component);

  function CollageGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CollageGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, collageGallery_extends({}, this.props, {
      styles: collageGallery_createStyles(this.props.styles)
    }));
  };

  return CollageGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/fullsizeGallery.js
function fullsizeGallery_extends() { fullsizeGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return fullsizeGallery_extends.apply(this, arguments); }

function fullsizeGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function fullsizeGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function fullsizeGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { fullsizeGallery_ownKeys(Object(source), true).forEach(function (key) { fullsizeGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { fullsizeGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fullsizeGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var fullsizeGallery_fixedStyles = {
  galleryLayout: constants_layout.FULLSIZE,
  cubeImages: true,
  cubeRatio: '100%/100%',
  cubeType: 'fill',
  oneRow: true,
  titlePlacement: placements.SHOW_ON_HOVER,
  scrollDirection: constants_scrollDirection.HORIZONTAL,
  galleryMargin: 0,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
  gallerySize: function gallerySize() {
    return dimensionsHelper.getGalleryWidth();
  },
  hasThumbnails: false,
  enableScroll: true,
  scrollSnap: true,
  isGrid: false,
  isSlider: false,
  isColumns: false,
  isMasonry: false,
  isSlideshow: false,
  cropOnlyFill: false,
  floatingImages: 0,
  imageMargin: 0
};
var fullsizeGallery_createStyles = function createStyles(styles) {
  return fullsizeGallery_objectSpread(fullsizeGallery_objectSpread({}, styles), fullsizeGallery_fixedStyles);
};

var fullsizeGallery_FullsizeGallery = /*#__PURE__*/function (_React$Component) {
  fullsizeGallery_inheritsLoose(FullsizeGallery, _React$Component);

  function FullsizeGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FullsizeGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, fullsizeGallery_extends({}, this.props, {
      styles: fullsizeGallery_createStyles(this.props.styles)
    }));
  };

  return FullsizeGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/columnGallery.js
function columnGallery_extends() { columnGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return columnGallery_extends.apply(this, arguments); }

function columnGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function columnGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function columnGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { columnGallery_ownKeys(Object(source), true).forEach(function (key) { columnGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { columnGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function columnGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var columnGallery_fixedStyles = {
  galleryLayout: constants_layout.COLUMN,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 0.35,
  oneRow: true,
  scrollDirection: constants_scrollDirection.HORIZONTAL,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
  gallerySize: function gallerySize() {
    return dimensionsHelper.getGalleryHeight();
  },
  fixedColumns: 0,
  enableScroll: true,
  isGrid: false,
  isColumns: true,
  isMasonry: false,
  isSlider: false,
  isSlideshow: false,
  cropOnlyFill: false
};
var columnGallery_createStyles = function createStyles(styles) {
  return columnGallery_objectSpread(columnGallery_objectSpread({}, styles), columnGallery_fixedStyles);
};

var columnGallery_ColumnGallery = /*#__PURE__*/function (_React$Component) {
  columnGallery_inheritsLoose(ColumnGallery, _React$Component);

  function ColumnGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ColumnGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, columnGallery_extends({}, this.props, {
      styles: columnGallery_createStyles(this.props.styles)
    }));
  };

  return ColumnGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/arrowsPosition.js
var ARROWS_POSITION = {
  ON_GALLERY: 0,
  OUTSIDE_GALLERY: 1
};
/* harmony default export */ var constants_arrowsPosition = (ARROWS_POSITION);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/cubeType.js
var IMAGE_RESIZE = {
  CROP: 'fill',
  FIT: 'fit',
  MIN: 'min',
  MAX: 'max'
};
/* harmony default export */ var cubeType = (IMAGE_RESIZE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/dimensions.js
var DIMENSIONS = {
  SIDE_BAR_WIDTH: 430,
  STORE_SIDE_BAR_WIDTH: 560,
  MOBILE_PADDING: 120,
  NO_PADDING: 0
};
/* harmony default export */ var constants_dimensions = (DIMENSIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/expandAnimations.js
var EXPAND_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  EXPAND: 'EXPAND',
  FADE_IN: 'FADE_IN',
  ZOOM: 'ZOOM'
};
/* harmony default export */ var expandAnimations = (EXPAND_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/expandInfoPositions.js
var EXPAND_INFO_POSITIONS = {
  SIDE: 'SIDE',
  BOTTOM: 'BOTTOM'
};
/* harmony default export */ var expandInfoPositions = (EXPAND_INFO_POSITIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/galleryTextAlign.js
var GALLERY_TEXT_ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};
/* harmony default export */ var constants_galleryTextAlign = (GALLERY_TEXT_ALIGN);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/gridStyle.js
var GRID_STYLE = {
  FIT_TO_SCREEN: 0,
  SET_ITEMS_PER_ROW: 1
};
/* harmony default export */ var constants_gridStyle = (GRID_STYLE);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/groupTypes.js
var GROUP_TYPES = {
  '1': '1',
  '2v': '2v',
  '2h': '2h',
  '3r': '3r',
  '3b': '3b',
  '3t': '3t',
  '3l': '3l',
  '3v': '3v',
  '3h': '3h'
};
/* harmony default export */ var constants_groupTypes = (GROUP_TYPES);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/horizontalAlign.js
var HORIZONTAL_ALIGN = {
  LEFT: 'flex-start',
  CENTER: 'center',
  RIGHT: 'flex-end'
};
/* harmony default export */ var horizontalAlign = (HORIZONTAL_ALIGN);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/isVertical.js
var IS_VERTICAL = {
  COLUMNS: true,
  ROWS: false
};
/* harmony default export */ var constants_isVertical = (IS_VERTICAL);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/layoutDirection.js
var LAYOUT_DIRECTION = {
  LEFT_TO_RIGHT: false,
  RIGHT_TO_LEFT: true
};
/* harmony default export */ var layoutDirection = (LAYOUT_DIRECTION);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/loadMoreAmount.js
var LOAD_MORE_AMOUNT = {
  PARTIAL: 'partial',
  ALL: 'all'
};
/* harmony default export */ var constants_loadMoreAmount = (LOAD_MORE_AMOUNT);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/mobileSwipeAnimations.js
var MOBILE_SWIPE_ANIMATIONS = {
  EXPAND: 'EXPAND',
  FADE: 'FADE',
  CAROUSEL: 'CAROUSEL',
  CROSSFADE: 'CROSSFADE'
};
/* harmony default export */ var mobileSwipeAnimations = (MOBILE_SWIPE_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/resizeMethods.js
var RESIZE_METHODS = {
  FILL: 'fill',
  FIT: 'fit',
  FULL: 'full',
  VIDEO: 'video'
};
/* harmony default export */ var resizeMethods = (RESIZE_METHODS);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/thumbnailsAlignment.js
var THUMBNAILS_ALIGNMENT = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP: 'top',
  RIGHT: 'right'
};
/* harmony default export */ var thumbnailsAlignment = (THUMBNAILS_ALIGNMENT);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/verticalAlign.js
var VERTICAL_ALIGN = {
  TOP: 'flex-start',
  CENTER: 'center',
  BOTTOM: 'flex-end'
};
/* harmony default export */ var verticalAlign = (VERTICAL_ALIGN);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/videoPlay.js
var VIDEO_PLAY = {
  HOVER: 'hover',
  AUTO: 'auto',
  ON_CLICK: 'onClick'
};
/* harmony default export */ var constants_videoPlay = (VIDEO_PLAY);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/watermarkDock.js
/* harmony default export */ var watermarkDock = ({
  // Not sure this will work
  LEFT_TOP: {
    top: 0,
    left: 0,
    transform: 'translate3d(0,0,0)'
  },
  MIDDLE_TOP: {
    top: 0,
    left: '50%',
    transform: 'translate3d(-50%,0,0)'
  },
  RIGHT_TOP: {
    top: 0,
    left: 'auto',
    right: 0,
    transform: 'translate3d(0,0,0)'
  },
  LEFT_MIDDLE: {
    top: '50%',
    left: 0,
    transform: 'translate3d(0,-50%,0)',
    margin: 0
  },
  MIDDLE: {
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
    margin: 0
  },
  RIGHT_MIDDLE: {
    top: '50%',
    left: 'auto',
    right: 0,
    transform: 'translate3d(0,-50%,0)',
    margin: 0
  },
  LEFT_DOWN: {
    top: 'auto',
    bottom: 0,
    left: 0,
    transform: 'translate3d(0,0,0)'
  },
  MIDDLE_DOWN: {
    top: 'auto',
    left: '50%',
    bottom: 0,
    transform: 'translate3d(-50%,0,0)'
  },
  RIGHT_DOWN: {
    top: 'auto',
    left: 'auto',
    right: 0,
    bottom: 0,
    transform: 'translate3d(0,0,0)'
  }
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/constants/index.js






































/* harmony default export */ var constants = ({
  arrowsPosition: constants_arrowsPosition,
  cubeType: cubeType,
  dimensions: constants_dimensions,
  events: events,
  expandAnimations: expandAnimations,
  expandInfoPositions: expandInfoPositions,
  formFactor: formFactor,
  gallerySizeType: constants_gallerySizeType,
  galleryTextAlign: constants_galleryTextAlign,
  gridStyle: constants_gridStyle,
  groupTypes: constants_groupTypes,
  horizontalAlign: horizontalAlign,
  imageHoverAnimations: imageHoverAnimations,
  infoBehaviourOnHover: infoBehaviourOnHover,
  infoType: infoType,
  isVertical: constants_isVertical,
  itemClick: constants_itemClick,
  layout: constants_layout,
  layoutDirection: layoutDirection,
  lazyLoad: constants_lazyLoad,
  loadingMode: loadingMode,
  loadingWithColorMode: loadingWithColorMode,
  loadMoreAmount: constants_loadMoreAmount,
  mobileSwipeAnimations: mobileSwipeAnimations,
  overlayAnimations: overlayAnimations,
  placements: placements,
  hasAbovePlacement: hasAbovePlacement,
  hasBelowPlacement: hasBelowPlacement,
  hasHoverPlacement: hasHoverPlacement,
  hasRightPlacement: hasRightPlacement,
  hasLeftPlacement: hasLeftPlacement,
  hasVerticalPlacement: hasVerticalPlacement,
  hasHorizontalPlacement: hasHorizontalPlacement,
  isAbovePlacement: isAbovePlacement,
  isBelowPlacement: isBelowPlacement,
  isHoverPlacement: isHoverPlacement,
  isRightPlacement: isRightPlacement,
  isLeftPlacement: isLeftPlacement,
  isVerticalPlacement: isVerticalPlacement,
  isHorizontalPlacement: isHorizontalPlacement,
  resizeMethods: resizeMethods,
  scrollAnimations: scrollAnimations,
  scrollDirection: constants_scrollDirection,
  socialNetworks: socialNetworks,
  textBoxHeightCalculationOptions: textBoxHeightCalculationOptions,
  textBoxWidthCalculationOptions: textBoxWidthCalculationOptions,
  thumbnailsAlignment: thumbnailsAlignment,
  urlSizes: URL_SIZES,
  urlTypes: URL_TYPES,
  verticalAlign: verticalAlign,
  videoPlay: constants_videoPlay,
  viewMode: viewMode,
  watermarkDock: watermarkDock
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/leanGallery/isEligible.js
function isEligible_createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = isEligible_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function isEligible_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return isEligible_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return isEligible_arrayLikeToArray(o, minLen); }

function isEligible_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isEligible_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function isEligible_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { isEligible_ownKeys(Object(source), true).forEach(function (key) { isEligible_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { isEligible_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isEligible_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 //example: http://pro-gallery.surge.sh/?titlePlacement=DONT_SHOW&itemClick=nothing&allowTitle=true&allowHover=false&galleryLayout=2&allowLeanGallery=true

var isEligible_notEligibleReasons = function notEligibleReasons(_ref) {
  var items = _ref.items,
      styles = _ref.styles;

  var s = isEligible_objectSpread(isEligible_objectSpread(isEligible_objectSpread({}, styles), gridGallery_fixedStyles), {}, {
    allowLeanGallery: true
  });

  var res = [];

  if (String(styles.galleryLayout) !== '2') {
    res.push('not a Grid layout');
  }

  if (items.length > MAX_ITEMS_COUNT) {
    res.push("more than " + MAX_ITEMS_COUNT + " items");
  }

  for (var _iterator = isEligible_createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
    var item = _step.value;

    if (!isEligible_isImage(item)) {
      res.push("at least one item is not an image");
    }
  }

  for (var _i = 0, _Object$entries = Object.entries(s); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        styleParam = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (!isValidStyleParam(styleParam, value, s)) {
      res.push("invalid style: " + styleParam + " => " + value);
    }
  }

  return res;
};
/* harmony default export */ var isEligible = (function (_ref2) {
  var items = _ref2.items,
      styles = _ref2.styles;
  var allowLeanGallery = !!styles.allowLeanGallery;

  if (!allowLeanGallery) {
    return false;
  }

  if (items.length > MAX_ITEMS_COUNT) {
    console.log("[LEAN GALLERY] NOT ALLOWED - more than " + MAX_ITEMS_COUNT + " items", items.length);
    return false;
  }

  for (var _iterator2 = isEligible_createForOfIteratorHelperLoose(items), _step2; !(_step2 = _iterator2()).done;) {
    var item = _step2.value;

    if (!isEligible_isImage(item)) {
      console.log("[LEAN GALLERY] NOT ALLOWED - an item that is not an image", item);
      return false;
    }
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(styles); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _Object$entries2[_i2],
        styleParam = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    if (!isValidStyleParam(styleParam, value, styles)) {
      console.log("[LEAN GALLERY] NOT ALLOWED - invalid styleParam", styleParam, value);
      return false;
    }
  }

  console.log("[LEAN GALLERY] ALLOWED!", styles);
  return true;
});
var MAX_ITEMS_COUNT = 25;

var isEligible_isImage = function isImage(item) {
  var meta = item.metadata || item.metaData;
  var isImageItem = !!((!meta.type || meta.type === 'image') && (item.url || item.mediaUrl || item.src));
  return isImageItem;
};

var isValidStyleParam = function isValidStyleParam(styleParam, value, allStyles) {
  if (typeof handledStyleParams[styleParam] !== 'undefined') return true; // if (typeof ignoredStyleParams[styleParam] !== 'undefined') return true;

  if (typeof fixedStyleParams[styleParam] !== 'undefined') {
    var sp = fixedStyleParams[styleParam];

    if (sp && typeof sp === 'function') {
      return sp(allStyles);
    } else if (sp && sp.length > 0) {
      return sp.includes(value);
    } else {
      return sp === value;
    }
  }

  return true;
}; //these styles can get any value, the lean gallery will handle them


var handledStyleParams = {
  numberOfImagesPerRow: 3,
  gallerySizeType: 'smart',
  gallerySizeRatio: 1,
  gallerySizePx: 300,
  gallerySize: 30,
  cubeType: 'fill',
  cubeRatio: 1,
  fixedColumns: 0,
  borderRadius: 0,
  imageMargin: 10,
  gridStyle: 0,
  itemBorderWidth: 0,
  itemBorderRadius: 0,
  imageQuality: 90,
  textBoxHeight: 200,
  allowTitle: false,
  allowDescription: false
}; //these params are not relevant when a lean gallery is rendered - the fixed styles will override them

/*
const ignoredStyleParams = {
  gotStyleParams: true,
  galleryType: null,
  collageAmount: 0,
  numberOfImagesPerCol: 2,
  minItemSize: 120,
  chooseBestGroup: true,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  collageDensity: 0.8, //80, // should be 0.8 after
  cropOnlyFill: false,
  gallerySliderImageRatio: 16 / 9,
  groupsPerStrip: 0,
  showArrows: false,
  viewMode: 'preview',
  thumbnailSpacings: 4,
  enableScroll: true,
  hasThumbnails: true,
  isGrid: false,
  isSlider: false,
  isColumns: false,
  isMasonry: false,
  isSlideshow: false,
  isAutoSlideshow: false,
  slideshowLoop: false,
  autoSlideshowInterval: 4,
  galleryTextAlign: 'center',
  scrollSnap: false,
  fullscreen: true,
  arrowsPosition: 0,
  arrowsSize: 23,
  defaultShowInfoExpand: 1,
  allowTitleExpand: true,
  allowDescriptionExpand: true,
  allowLinkExpand: true,
  expandInfoPosition: 0,
  allowFullscreenExpand: true,
  fullscreenLoop: false,
  galleryAlignExpand: 'left',
  slideshowInfoSize: 200,
  playButtonForAutoSlideShow: false,
  allowSlideshowCounter: false,
  galleryThumbnailsAlignment: 'bottom',
  thumbnailSize: 250,
  magicLayoutSeed: 1,
  textImageSpace: 10,
  textBoxBorderRadius: 0,
  textBoxBorderWidth: 0,
  textsVerticalPadding: 0,
  textsHorizontalPadding: 0,
  titleDescriptionSpace: 6,
  customButtonText: '',
  customButtonBorderWidth: 1,
  customButtonBorderRadius: 0,
  loadMoreButtonText: '',
  loadMoreButtonBorderWidth: 1,
  loadMoreButtonBorderRadius: 0,
  itemShadowBlur: 20,
  itemShadowDirection: 135,
  itemShadowSize: 10,
  usm_a: 0,
  usm_r: 0,
  usm_t: 0,
  videoPlay: 'hover',
  videoSound: false,
  videoSpeed: '1',
  videoLoop: true,
  galleryHorizontalAlign: 'center',
  galleryVerticalAlign: 'center',
  overlayAnimation: GALLERY_CONSTS.overlayAnimations.NO_EFFECT,
  watermarkOpacity: 40,
  watermarkSize: 40,
  useWatermark: false,
  watermarkDock: null,
  loadMoreAmount: 'all',
  addToCartBorderWidth: 1,
  imageLoadingMode: GALLERY_CONSTS.loadingMode.BLUR,
  hoveringBehaviour: GALLERY_CONSTS.infoBehaviourOnHover.APPEARS,
  expandAnimation: GALLERY_CONSTS.expandAnimations.NO_EFFECT,
  imageHoverAnimation: GALLERY_CONSTS.imageHoverAnimations.NO_EFFECT,
  selectedLayout: '',
  layoutsVersion: 2,
  selectedLayoutV2: 2,
  isSlideshowFont: false,
  addToCartButtonText: '',
  imageInfoType: GALLERY_CONSTS.infoType.NO_BACKGROUND,
  galleryImageRatio: 2,
  sharpParams: {},
  itemBorderColor: {},
};
*/
//these params must be set to these exact values in order for the lean gallery to render well

var fixedStyleParams = {
  allowLeanGallery: true,
  galleryLayout: [-1, 2],
  isVertical: true,
  oneRow: false,
  isRTL: false,
  scrollDirection: [0, undefined],
  groupSize: 1,
  hoveringBehaviour: [constants.infoBehaviourOnHover.NEVER_SHOW, constants.infoBehaviourOnHover.APPEARS],
  rotatingGroupTypes: '',
  cubeImages: true,
  smartCrop: false,
  rotatingCubeRatio: '',
  boxShadow: 0,
  galleryMargin: 0,
  floatingImages: 0,
  placeGroupsLtr: false,
  mobilePanorama: false,
  enableInfiniteScroll: [true, 1],
  useCustomButton: false,
  itemEnableShadow: false,
  allowSocial: function allowSocial(sp) {
    return sp.hoveringBehaviour === constants.infoBehaviourOnHover.NEVER_SHOW || !sp.allowSocial;
  },
  allowDownload: function allowDownload(sp) {
    return sp.hoveringBehaviour === constants.infoBehaviourOnHover.NEVER_SHOW || !sp.allowDownload;
  },
  loveButton: function loveButton(sp) {
    return sp.hoveringBehaviour === constants.infoBehaviourOnHover.NEVER_SHOW || !sp.loveButton;
  },
  loveCounter: function loveCounter(sp) {
    return sp.hoveringBehaviour === constants.infoBehaviourOnHover.NEVER_SHOW || !sp.loveCounter;
  },
  itemClick: [constants.itemClick.NOTHING, constants.itemClick.LINK, constants.itemClick.FULLSCREEN, constants.itemClick.EXPAND],
  scrollAnimation: constants.scrollAnimations.NO_EFFECT,
  titlePlacement: function titlePlacement(sp) {
    return isVerticalPlacement(sp.titlePlacement) || sp.hoveringBehaviour === constants.infoBehaviourOnHover.NEVER_SHOW || !sp.allowTitle && !sp.allowTitle && !sp.allowDownload && !sp.allowSocial && !sp.loveButton;
  },
  calculateTextBoxHeightMode: function calculateTextBoxHeightMode(sp) {
    return sp.calculateTextBoxHeightMode === constants.textBoxHeightCalculationOptions.MANUAL || !isVerticalPlacement(sp.titlePlacement);
  }
};
// EXTERNAL MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/leanGallery/leanGallery.module.scss
var leanGallery_module = __webpack_require__(822);
var leanGallery_module_default = /*#__PURE__*/__webpack_require__.n(leanGallery_module);

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/leanGallery/leanGallery.js
function leanGallery_extends() { leanGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return leanGallery_extends.apply(this, arguments); }

function leanGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function leanGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { leanGallery_ownKeys(Object(source), true).forEach(function (key) { leanGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { leanGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function leanGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function leanGallery_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function leanGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

 // import GalleryItem from '../item/galleryItem';










var leanGallery_get = function get(item, attr) {
  if (typeof item[attr] !== 'undefined') {
    return item[attr];
  }

  if (typeof item.metadata !== 'undefined') {
    if (typeof item.metadata[attr] !== 'undefined') {
      return item.metadata[attr];
    }
  }

  if (typeof item.metaData !== 'undefined') {
    if (typeof item.metaData[attr] !== 'undefined') {
      return item.metaData[attr];
    }
  }
};

var leanGallery_LeanGallery = /*#__PURE__*/function (_React$Component) {
  leanGallery_inheritsLoose(LeanGallery, _React$Component);

  function LeanGallery() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.measureIfNeeded = _this.measureIfNeeded.bind(leanGallery_assertThisInitialized(_this));
    _this.eventsListener = _this.eventsListener.bind(leanGallery_assertThisInitialized(_this));
    _this.state = {
      itemStyle: {}
    };
    return _this;
  }

  var _proto = LeanGallery.prototype;

  _proto.eventsListener = function eventsListener(eventName, eventData) {
    if (typeof this.props.eventsListener === 'function') {
      this.props.eventsListener(eventName, eventData);
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.eventsListener(events.APP_LOADED, {});
  };

  _proto.resizeUrl = function resizeUrl(_ref) {
    var item = _ref.item;
    var _this$props = this.props,
        styles = _this$props.styles,
        resizeMediaUrl = _this$props.resizeMediaUrl;
    var cubeType = styles.cubeType,
        imageQuality = styles.imageQuality;
    var itemStyle = this.state.itemStyle;
    var url = item.url,
        mediaUrl = item.mediaUrl,
        src = item.src;
    var itemUrl = url || mediaUrl || src;
    var width = itemStyle.width || 250;
    var height = itemStyle.height || 250;
    var focalPoint = false;
    var isPreload = !(itemStyle.width > 0);
    var options = isPreload ? {
      quality: 30,
      blur: 30
    } : {
      quality: imageQuality
    };

    if (typeof resizeMediaUrl === 'function') {
      try {
        return resizeMediaUrl({
          maxWidth: leanGallery_get(item, 'width'),
          maxHeight: leanGallery_get(item, 'height')
        }, itemUrl, cubeType, width, height, options, false, focalPoint) || '';
      } catch (e) {
        return String(itemUrl);
      }
    } else {
      return String(itemUrl);
    }
  };

  _proto.calcItemSize = function calcItemSize() {
    var _this$props2 = this.props,
        styles = _this$props2.styles,
        container = _this$props2.container;
    var gallerySizeType = styles.gallerySizeType,
        gallerySize = styles.gallerySize,
        gallerySizePx = styles.gallerySizePx,
        gallerySizeRatio = styles.gallerySizeRatio;
    var itemSize;

    if (gallerySizeType === constants_gallerySizeType.PIXELS && gallerySizePx > 0) {
      itemSize = gallerySizePx;
    } else if (gallerySizeType === constants_gallerySizeType.RATIO && gallerySizeRatio > 0) {
      itemSize = container.width * (gallerySizeRatio / 100);
    } else {
      itemSize = gallerySize;
    }

    var minmaxFix = 0.75; //this fix is meant to compensate for the css grid ability to use the number as a minimum only (the pro-gallery is trying to get as close as possible to this number)

    itemSize *= minmaxFix;
    return Math.min(itemSize, container.width);
  };

  _proto.createGalleryStyle = function createGalleryStyle() {
    var styles = this.props.styles;
    var gridStyle = styles.gridStyle,
        numberOfImagesPerRow = styles.numberOfImagesPerRow,
        imageMargin = styles.imageMargin;
    var gridTemplateColumns = gridStyle === 1 ? "repeat(" + numberOfImagesPerRow + ", 1fr)" : "repeat(auto-fit, minmax(" + this.calcItemSize() + "px, 1fr))";
    return {
      gridTemplateColumns: gridTemplateColumns,
      gridGap: imageMargin + "px"
    };
  };

  _proto.createItemStyle = function createItemStyle(imageSize) {
    var styles = this.props.styles;
    var width = imageSize.width,
        height = imageSize.height;
    var borderWidth = styles.itemBorderWidth,
        borderColor = styles.itemBorderColor,
        borderRadius = styles.itemBorderRadius;
    return {
      width: width,
      height: height,
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderRadius: borderRadius
    };
  };

  _proto.calcImageSize = function calcImageSize(image) {
    var styles = this.props.styles;

    if (styles.cubeType !== resizeMethods.FIT) {
      return this.state.itemStyle;
    }

    var _this$state$itemStyle = this.state.itemStyle,
        width = _this$state$itemStyle.width,
        height = _this$state$itemStyle.height;
    var imageWidth = leanGallery_get(image, 'width');
    var imageHeight = leanGallery_get(image, 'height');
    var imageRatio = imageWidth / imageHeight;
    var containerRatio = width / height;

    if (imageRatio > containerRatio) {
      //image is wider than container
      var _height = width / imageRatio;

      return {
        width: width,
        height: _height,
        marginTop: (height - _height) / 2
      };
    } else {
      var _width = height * imageRatio;

      return {
        height: height,
        width: _width,
        marginLeft: (width - _width) / 2
      };
    }
  };

  _proto.calcContainerHeight = function calcContainerHeight() {
    var _this$state$itemStyle2 = this.state.itemStyle.height,
        height = _this$state$itemStyle2 === void 0 ? 0 : _this$state$itemStyle2;
    var _this$props$styles = this.props.styles,
        _this$props$styles$te = _this$props$styles.textBoxHeight,
        textBoxHeight = _this$props$styles$te === void 0 ? 0 : _this$props$styles$te,
        titlePlacement = _this$props$styles.titlePlacement;

    if (hasVerticalPlacement(titlePlacement)) {
      return height + textBoxHeight;
    } else {
      return height;
    }
  };

  _proto.createLinkParams = function createLinkParams(item) {
    var _this$props3 = this.props,
        noFollowForSEO = _this$props3.noFollowForSEO,
        styles = _this$props3.styles;
    var itemClick = styles.itemClick;
    var directLink = item.directLink;

    var _ref2 = directLink || {},
        url = _ref2.url,
        target = _ref2.target;

    var isSEO = viewModeWrapper_isSEOMode();
    var shouldUseNofollow = isSEO && noFollowForSEO;
    var seoLinkParams = shouldUseNofollow ? {
      rel: 'nofollow'
    } : {};
    var shouldUseDirectLink = !!(url && target && itemClick === constants_itemClick.LINK);
    var linkParams = shouldUseDirectLink ? leanGallery_objectSpread({
      href: url,
      target: target
    }, seoLinkParams) : false;
    return linkParams;
  };

  _proto.measureIfNeeded = function measureIfNeeded(node) {
    var styles = this.props.styles;

    if (!this.node && node) {
      this.node = node;
    }

    if (this.node && this.node.clientWidth !== this.clientWidth) {
      this.clientWidth = this.node.clientWidth;
      this.setState({
        itemStyle: {
          width: this.clientWidth,
          height: Math.round(this.clientWidth / styles.cubeRatio)
        }
      });
    }
  };

  _proto.fixStylesIfNeeded = function fixStylesIfNeeded(styles) {
    return leanGallery_objectSpread(leanGallery_objectSpread({}, styles), {}, {
      externalInfoHeight: styles.textBoxHeight
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.measureIfNeeded();
  };

  _proto.render = function render() {
    var _this2 = this;

    var eventsListener = this.eventsListener,
        props = this.props;
    var customInfoRenderer = props.customInfoRenderer,
        items = props.items;
    var styles = this.fixStylesIfNeeded(props.styles);
    var itemClick = styles.itemClick;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: ['pro-gallery', 'inline-styles', leanGallery_module_default.a.gallery].join(' '),
      style: this.createGalleryStyle()
    }, items.map(function (item, itemIdx) {
      var linkParams = _this2.createLinkParams(item);

      var clickable = linkParams && itemClick === constants_itemClick.LINK || [constants_itemClick.EXPAND, constants_itemClick.FULLSCREEN].includes(itemClick);

      var imageSize = _this2.calcImageSize(item);

      var itemData = leanGallery_objectSpread(leanGallery_objectSpread({}, item), {}, {
        id: item.itemId,
        idx: itemIdx
      });

      var itemProps = leanGallery_objectSpread(leanGallery_objectSpread(leanGallery_objectSpread({}, itemData), item.metaData), {}, {
        style: _this2.state.itemStyle,
        styleParams: styles
      });

      var texts = function texts(placement) {
        return typeof customInfoRenderer === 'function' && styles.titlePlacement === placement && /*#__PURE__*/react_default.a.createElement("div", {
          className: "gallery-item-common-info gallery-item-" + (placement === placements.SHOW_ABOVE ? "top" : "bottom") + "-info",
          style: getInnerInfoStyle(placement, styles)
        }, customInfoRenderer(itemProps, placement));
      };

      return /*#__PURE__*/react_default.a.createElement("a", leanGallery_extends({
        className: ['gallery-item-container', leanGallery_module_default.a.cell].join(' '),
        style: {
          height: _this2.calcContainerHeight(),
          cursor: clickable ? 'pointer' : 'default'
        },
        ref: function ref(node) {
          _this2.measureIfNeeded(node);

          eventsListener(events.ITEM_CREATED, itemData);
        },
        key: 'item-container-' + itemIdx
      }, linkParams), texts(placements.SHOW_ABOVE), /*#__PURE__*/react_default.a.createElement("div", {
        style: imageSize,
        className: ['gallery-item-hover', leanGallery_module_default.a.imageWrapper].join(' '),
        onClick: function onClick() {
          return eventsListener(events.ITEM_ACTION_TRIGGERED, itemData);
        }
      }, /*#__PURE__*/react_default.a.createElement("img", {
        src: _this2.resizeUrl({
          item: item
        }),
        loading: "lazy",
        className: ['gallery-item-content', leanGallery_module_default.a.image].join(' '),
        alt: leanGallery_get(item, 'title'),
        style: _this2.createItemStyle(imageSize),
        onLoad: function onLoad() {
          return eventsListener(events.ITEM_LOADED, itemData);
        }
      })), texts(placements.SHOW_BELOW));
    }));
  };

  return LeanGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/gridGallery.js
function gridGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function gridGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function gridGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { gridGallery_ownKeys(Object(source), true).forEach(function (key) { gridGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { gridGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function gridGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var gridGallery_fixedStyles = {
  galleryLayout: constants_layout.GRID,
  cubeImages: true,
  isVertical: true,
  groupSize: 1,
  hasThumbnails: false,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Columns',
  fixedColumns: 0,
  gallerySize: 0,
  enableScroll: true,
  cropOnlyFill: false,
  isSlider: false,
  isColumns: false,
  isGrid: true,
  isMasonry: false,
  isSlideshow: false,
  minItemSize: 50
};
var gridGallery_createStyles = function createStyles(styles) {
  return gridGallery_objectSpread(gridGallery_objectSpread(gridGallery_objectSpread({}, styles), gridGallery_fixedStyles), {}, {
    gallerySize: styles.modifiedGallerySize ? styles.gallerySize : Math.round(styles.gallerySize * 8.5 + 150),
    modifiedGallerySize: true
  });
};

var gridGallery_GridGallery = /*#__PURE__*/function (_React$Component) {
  gridGallery_inheritsLoose(GridGallery, _React$Component);

  function GridGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = GridGallery.prototype;

  _proto.render = function render() {
    var props = gridGallery_objectSpread(gridGallery_objectSpread({}, this.props), {}, {
      styles: gridGallery_createStyles(this.props.styles)
    });

    var GalleryComponent = proGallery_ProGallery;

    if (isEligible(props)) {
      GalleryComponent = leanGallery_LeanGallery;
    }

    return /*#__PURE__*/react_default.a.createElement(GalleryComponent, props);
  };

  return GridGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/magicGallery.js
function magicGallery_extends() { magicGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return magicGallery_extends.apply(this, arguments); }

function magicGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function magicGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function magicGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { magicGallery_ownKeys(Object(source), true).forEach(function (key) { magicGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { magicGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function magicGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var magicGallery_fixedStyles = {
  galleryLayout: constants_layout.MAGIC,
  cubeImages: undefined,
  cubeRatio: undefined,
  isVertical: undefined,
  gallerySize: undefined,
  collageAmount: undefined,
  collageDensity: undefined,
  groupTypes: undefined,
  oneRow: undefined,
  // later on in layoutHelper this can be changed if it is false, so not exactly fixed.
  imageMargin: undefined,
  floatingImages: undefined,
  galleryMargin: undefined,
  chooseBestGroup: undefined,
  smartCrop: undefined,
  cubeType: undefined,
  hasThumbnails: undefined,
  enableScroll: undefined,
  isGrid: undefined,
  isSlideshow: undefined,
  isSlider: undefined,
  isColumns: undefined,
  cropOnlyFill: undefined,
  fixedColumns: undefined,
  enableInfiniteScroll: undefined
};

var magicGallery_getStyleBySeed = function getStyleBySeed(seed) {
  if (!seed > 0) {
    seed = 999999;
  }

  seed = Math.floor(seed);

  var strToSeed = function strToSeed(str) {
    str = String(str);
    var total = 0;

    for (var s = 0; s < str.length; s++) {
      total += str.charCodeAt(s);
    }

    return total;
  };

  var mergeSeeds = function mergeSeeds(s1, s2) {
    return Math.floor((s1 / s2 - Math.floor(s1 / s2)) * 10000000);
  };

  var numFromSeed = function numFromSeed(min, max, strSeed) {
    var seed2 = strToSeed(strSeed);
    var range = max - min + 1;
    return mergeSeeds(seed, seed2) % range + min;
  };

  var boolFromSeed = function boolFromSeed(strSeed) {
    return !!numFromSeed(0, 1, strSeed);
  };

  var style = {
    cubeImages: boolFromSeed('cubeImages'),
    cubeRatio: numFromSeed(1, 25, 'cubeRatio') / 5,
    isVertical: boolFromSeed('isVertical'),
    gallerySize: numFromSeed(300, 800, 'gallerySize'),
    collageAmount: numFromSeed(5, 10, 'collageAmount') / 10,
    collageDensity: (featureManager.supports.spacingCalculation ? numFromSeed(1, 100, 'collageDensity') : numFromSeed(5, 10, 'collageDensity')) / 100,
    groupTypes: ['1'].concat('2h,2v,3t,3b,3l,3r,3h,3v'.split(',').filter(function (type, i) {
      return boolFromSeed('groupTypes' + i);
    })),
    oneRow: boolFromSeed('oneRow'),
    imageMargin: numFromSeed(0, featureManager.supports.spacingCalculation ? numFromSeed(300, 800, 'gallerySize') / 5 : 5, 'imageMargin'),
    galleryMargin: featureManager.supports.spacingCalculation ? 0 : numFromSeed(0, 5, 'imageMargin'),
    floatingImages: 0,
    chooseBestGroup: boolFromSeed('chooseBestGroup'),
    smartCrop: boolFromSeed('smartCrop'),
    cubeType: 'fill',
    enableScroll: true,
    isGrid: false,
    isSlideshow: false,
    isSlider: false,
    isColumns: false,
    cropOnlyFill: false,
    fixedColumns: 0,
    enableInfiniteScroll: 1
  }; //force adjustments

  if (style.oneRow) {
    style.isVertical = false;
    style.scrollDirection = constants_scrollDirection.HORIZONTAL;
  } else {
    style.scrollDirection = constants_scrollDirection.VERTICAL;
  }

  style.galleryType = style.isVertical ? 'Columns' : 'Strips';
  style.groupSize = parseInt(style.groupTypes.slice(-1)[0]);
  style.groupTypes = style.groupTypes.join(',');
  style.minItemSize = style.gallerySize / style.groupSize / 2;
  return style;
};

var magicGallery_createStyles = function createStyles(styles) {
  return magicGallery_objectSpread(magicGallery_objectSpread(magicGallery_objectSpread({}, styles), magicGallery_fixedStyles), magicGallery_getStyleBySeed(styles.magicLayoutSeed));
};

var magicGallery_MagicGallery = /*#__PURE__*/function (_React$Component) {
  magicGallery_inheritsLoose(MagicGallery, _React$Component);

  function MagicGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MagicGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, magicGallery_extends({}, this.props, {
      styles: magicGallery_createStyles(this.props.styles)
    }));
  };

  return MagicGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/masonryGallery.js
function masonryGallery_extends() { masonryGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return masonryGallery_extends.apply(this, arguments); }

function masonryGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function masonryGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function masonryGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { masonryGallery_ownKeys(Object(source), true).forEach(function (key) { masonryGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { masonryGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function masonryGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var masonryGallery_fixedStyles = {
  galleryLayout: constants_layout.MASONRY,
  cubeImages: false,
  scrollDirection: constants_scrollDirection.VERTICAL,
  groupSize: 1,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 0,
  fixedColumns: 0,
  enableScroll: true,
  isGrid: false,
  isSlider: false,
  isMasonry: true,
  isColumns: false,
  isSlideshow: false,
  cropOnlyFill: false,
  oneRow: false
};
var masonryGallery_createStyles = function createStyles(styles) {
  return masonryGallery_objectSpread(masonryGallery_objectSpread(masonryGallery_objectSpread({}, styles), masonryGallery_fixedStyles), {}, {
    gallerySize: styles.gallerySize
  });
};

var masonryGallery_MasonryGallery = /*#__PURE__*/function (_React$Component) {
  masonryGallery_inheritsLoose(MasonryGallery, _React$Component);

  function MasonryGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MasonryGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, masonryGallery_extends({}, this.props, {
      styles: masonryGallery_createStyles(this.props.styles)
    }));
  };

  return MasonryGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/mixGallery.js
function mixGallery_extends() { mixGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return mixGallery_extends.apply(this, arguments); }

function mixGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function mixGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function mixGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { mixGallery_ownKeys(Object(source), true).forEach(function (key) { mixGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { mixGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mixGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var mixGallery_fixedStyles = {
  galleryLayout: constants_layout.MIX,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 1,
  titlePlacement: placements.SHOW_ON_HOVER,
  scrollDirection: constants_scrollDirection.VERTICAL,
  galleryMargin: 0,
  isVertical: true,
  groupSize: 3,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  collageDensity: 0.48,
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 86,
  minItemSize: 50,
  chooseBestGroup: true,
  rotatingGroupTypes: '1,3l,1,3r',
  smartCrop: false,
  floatingImages: 0,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  rotatingCropRatios: ''
};
var mixGallery_createStyles = function createStyles(styles) {
  return mixGallery_objectSpread(mixGallery_objectSpread({}, styles), mixGallery_fixedStyles);
};

var mixGallery_MixGallery = /*#__PURE__*/function (_React$Component) {
  mixGallery_inheritsLoose(MixGallery, _React$Component);

  function MixGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MixGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, mixGallery_extends({}, this.props, {
      styles: mixGallery_createStyles(this.props.styles)
    }));
  };

  return MixGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/panoramaGallery.js
function panoramaGallery_extends() { panoramaGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return panoramaGallery_extends.apply(this, arguments); }

function panoramaGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function panoramaGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function panoramaGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { panoramaGallery_ownKeys(Object(source), true).forEach(function (key) { panoramaGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { panoramaGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function panoramaGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var panoramaGallery_fixedStyles = {
  galleryLayout: constants_layout.PANORAMA,
  cubeImages: false,
  scrollDirection: constants_scrollDirection.VERTICAL,
  isVertical: true,
  groupSize: 1,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  galleryType: 'Columns',
  gallerySize: function gallerySize() {
    return dimensionsHelper.getGalleryWidth();
  },
  oneRow: false,
  fixedColumns: 1,
  enableScroll: true,
  isGrid: false,
  isColumns: false,
  isMasonry: false,
  isSlider: false,
  isSlideshow: false,
  cropOnlyFill: false,
  slideshowLoop: false
};
var panoramaGallery_createStyles = function createStyles(styles) {
  return panoramaGallery_objectSpread(panoramaGallery_objectSpread({}, styles), panoramaGallery_fixedStyles);
};

var panoramaGallery_PanoramaGallery = /*#__PURE__*/function (_React$Component) {
  panoramaGallery_inheritsLoose(PanoramaGallery, _React$Component);

  function PanoramaGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanoramaGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, panoramaGallery_extends({}, this.props, {
      styles: panoramaGallery_createStyles(this.props.styles)
    }));
  };

  return PanoramaGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/sliderGallery.js
function sliderGallery_extends() { sliderGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return sliderGallery_extends.apply(this, arguments); }

function sliderGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function sliderGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function sliderGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { sliderGallery_ownKeys(Object(source), true).forEach(function (key) { sliderGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { sliderGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function sliderGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var sliderGallery_fixedStyles = {
  //tested params
  galleryLayout: constants_layout.SLIDER,
  enableInfiniteScroll: true,
  cubeImages: true,
  oneRow: true,
  scrollDirection: constants_scrollDirection.HORIZONTAL,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
  gallerySize: function gallerySize() {
    return dimensionsHelper.getGalleryHeight();
  },
  hasThumbnails: false,
  enableScroll: true,
  scrollSnap: true,
  isGrid: false,
  isSlider: true,
  isColumns: false,
  isMasonry: false,
  isSlideshow: false,
  cropOnlyFill: true
};
var sliderGallery_createStyles = function createStyles(styles) {
  return sliderGallery_objectSpread(sliderGallery_objectSpread({}, styles), sliderGallery_fixedStyles);
};

var sliderGallery_SliderGallery = /*#__PURE__*/function (_React$Component) {
  sliderGallery_inheritsLoose(SliderGallery, _React$Component);

  function SliderGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SliderGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, sliderGallery_extends({}, this.props, {
      styles: sliderGallery_createStyles(this.props.styles)
    }));
  };

  return SliderGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/slideshowGallery.js
function slideshowGallery_extends() { slideshowGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return slideshowGallery_extends.apply(this, arguments); }

function slideshowGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function slideshowGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function slideshowGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { slideshowGallery_ownKeys(Object(source), true).forEach(function (key) { slideshowGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { slideshowGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function slideshowGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var slideshowGallery_fixedStyles = {
  galleryLayout: constants_layout.SLIDESHOW,
  enableInfiniteScroll: true,
  cubeRatio: '100%/100%',
  cubeImages: true,
  oneRow: true,
  hoveringBehaviour: infoBehaviourOnHover.NEVER_SHOW,
  scrollDirection: constants_scrollDirection.HORIZONTAL,
  galleryMargin: 0,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  itemBorderWidth: 0,
  itemBorderRadius: 0,
  itemBorderColor: undefined,
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  gallerySize: 550,
  galleryType: 'Strips',
  fixedColumns: 1,
  hasThumbnails: false,
  enableScroll: true,
  scrollSnap: true,
  isGrid: false,
  isColumns: false,
  isMasonry: false,
  isSlider: false,
  isSlideshow: true,
  cropOnlyFill: false,
  floatingImages: 0,
  imageMargin: 0
};
var slideshowGallery_createStyles = function createStyles(styles) {
  return slideshowGallery_objectSpread(slideshowGallery_objectSpread({}, styles), slideshowGallery_fixedStyles);
};

var slideshowGallery_SlideshowGallery = /*#__PURE__*/function (_React$Component) {
  slideshowGallery_inheritsLoose(SlideshowGallery, _React$Component);

  function SlideshowGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SlideshowGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, slideshowGallery_extends({}, this.props, {
      styles: slideshowGallery_createStyles(this.props.styles)
    }));
  };

  return SlideshowGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/thumbnailGallery.js
function thumbnailGallery_extends() { thumbnailGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return thumbnailGallery_extends.apply(this, arguments); }

function thumbnailGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function thumbnailGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function thumbnailGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { thumbnailGallery_ownKeys(Object(source), true).forEach(function (key) { thumbnailGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { thumbnailGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function thumbnailGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var thumbnailGallery_fixedStyles = {
  galleryLayout: constants_layout.THUMBNAIL,
  enableInfiniteScroll: true,
  cubeRatio: '100%/100%',
  cubeImages: true,
  oneRow: true,
  titlePlacement: placements.SHOW_ON_HOVER,
  scrollDirection: constants_scrollDirection.HORIZONTAL,
  galleryMargin: 0,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
  gallerySize: function gallerySize() {
    return dimensionsHelper.getGalleryWidth();
  },
  hasThumbnails: true,
  enableScroll: true,
  scrollSnap: true,
  isGrid: false,
  isSlider: false,
  isMasonry: false,
  isColumns: false,
  isSlideshow: false,
  cropOnlyFill: false,
  floatingImages: 0,
  imageMargin: 0
};
var thumbnailGallery_createStyles = function createStyles(styles) {
  return thumbnailGallery_objectSpread(thumbnailGallery_objectSpread({}, styles), thumbnailGallery_fixedStyles);
};

var thumbnailGallery_ThumbnailGallery = /*#__PURE__*/function (_React$Component) {
  thumbnailGallery_inheritsLoose(ThumbnailGallery, _React$Component);

  function ThumbnailGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ThumbnailGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, thumbnailGallery_extends({}, this.props, {
      styles: thumbnailGallery_createStyles(this.props.styles)
    }));
  };

  return ThumbnailGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/emptyGallery.js
function emptyGallery_extends() { emptyGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return emptyGallery_extends.apply(this, arguments); }

function emptyGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function emptyGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function emptyGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { emptyGallery_ownKeys(Object(source), true).forEach(function (key) { emptyGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { emptyGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function emptyGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var emptyGallery_fixedStyles = {
  galleryLayout: constants_layout.EMPTY
};
var emptyGallery_createStyles = function createStyles(styles) {
  return emptyGallery_objectSpread(emptyGallery_objectSpread(emptyGallery_objectSpread({}, styles), emptyGallery_fixedStyles), {}, {
    gallerySize: styles.modifiedGallerySize ? styles.gallerySize : Math.round(styles.gallerySize * 9 + 100),
    modifiedGallerySize: true
  });
};

var emptyGallery_EmptyGallery = /*#__PURE__*/function (_React$Component) {
  emptyGallery_inheritsLoose(EmptyGallery, _React$Component);

  function EmptyGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = EmptyGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement(proGallery_ProGallery, emptyGallery_extends({}, this.props, {
      styles: emptyGallery_createStyles(this.props.styles)
    }));
  };

  return EmptyGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/presets.js















var presets_addPresetStyles = function addPresetStyles(styles) {
  switch (styles.galleryLayout) {
    case constants_layout.MASONRY:
      return masonryGallery_createStyles(styles);

    case constants_layout.GRID:
      return gridGallery_createStyles(styles);

    case constants_layout.THUMBNAIL:
      return thumbnailGallery_createStyles(styles);

    case constants_layout.SLIDER:
      return sliderGallery_createStyles(styles);

    case constants_layout.SLIDESHOW:
      return slideshowGallery_createStyles(styles);

    case constants_layout.PANORAMA:
      return panoramaGallery_createStyles(styles);

    case constants_layout.COLUMN:
      return columnGallery_createStyles(styles);

    case constants_layout.MAGIC:
      return magicGallery_createStyles(styles);

    case constants_layout.FULLSIZE:
      return fullsizeGallery_createStyles(styles);

    case constants_layout.BRICKS:
      return bricksGallery_createStyles(styles);

    case constants_layout.MIX:
      return mixGallery_createStyles(styles);

    case constants_layout.ALTERNATE:
      return createStyles(styles);

    case constants_layout.EMPTY:
      return emptyGallery_createStyles(styles);

    case constants_layout.COLLAGE:
    default:
      return collageGallery_createStyles(styles);
  }
};
/* harmony default export */ var presets = ({
  alternate: fixedStyles,
  bricks: bricksGallery_fixedStyles,
  collage: collageGallery_fixedStyles,
  fullsize: fullsizeGallery_fixedStyles,
  column: columnGallery_fixedStyles,
  grid: gridGallery_fixedStyles,
  magic: magicGallery_fixedStyles,
  masonry: masonryGallery_fixedStyles,
  mix: mixGallery_fixedStyles,
  panorama: panoramaGallery_fixedStyles,
  slider: sliderGallery_fixedStyles,
  slideshow: slideshowGallery_fixedStyles,
  thumbnails: thumbnailGallery_fixedStyles,
  empty: emptyGallery_fixedStyles
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/layoutHelper.js

















var emptyLayout = {
  galleryType: undefined,
  groupSize: undefined,
  showArrows: undefined,
  cubeImages: undefined,
  cubeType: undefined,
  cubeRatio: undefined,
  isVertical: undefined,
  gallerySize: undefined,
  collageAmount: undefined,
  collageDensity: undefined,
  groupTypes: undefined,
  oneRow: undefined,
  imageMargin: undefined,
  galleryMargin: undefined,
  floatingImages: undefined,
  chooseBestGroup: undefined,
  smartCrop: undefined,
  hasThumbnails: undefined,
  enableScroll: undefined,
  isGrid: undefined,
  isSlider: undefined,
  isColumns: undefined,
  isSlideshow: undefined,
  cropOnlyFill: undefined,
  fixedColumns: undefined,
  enableInfiniteScroll: undefined
};

function getStyleByGalleryType(styles) {
  //legacy layouts
  var galleryType = styles.galleryType,
      gallerySize = styles.gallerySize;
  var galleryTypes = {
    collage_ver: function collage_ver() {
      return {
        cubeImages: false,
        isVertical: true,
        galleryType: 'Columns',
        groupSize: 3,
        groupTypes: '1,2h,2v,3t,3b,3l,3r',
        gallerySize: Math.round(gallerySize * 5 + 500),
        fixedColumns: 0
      };
    },
    collage_hor: function collage_hor() {
      return {
        cubeImages: false,
        isVertical: false,
        galleryType: 'Strips',
        groupSize: 3,
        groupTypes: '1,2h,2v,3t,3b,3l,3r',
        gallerySize: Math.round(gallerySize * 5 + 500),
        fixedColumns: 0
      };
    },
    grid: function grid() {
      return {
        cubeImages: true,
        isVertical: true,
        galleryType: 'Columns',
        groupSize: 1,
        groupTypes: '1',
        gallerySize: Math.round(gallerySize * 8.5 + 150),
        fixedColumns: 0,
        isGrid: true
      };
    },
    masonry_ver: function masonry_ver() {
      return {
        cubeImages: false,
        isVertical: true,
        galleryType: 'Columns',
        groupSize: 1,
        groupTypes: '1',
        gallerySize: Math.round(gallerySize * 8 + 200),
        fixedColumns: 0
      };
    },
    masonry_hor: function masonry_hor() {
      return {
        cubeImages: false,
        isVertical: false,
        galleryType: 'Strips',
        groupSize: 1,
        groupTypes: '1',
        gallerySize: Math.round(gallerySize * 5 + 200),
        fixedColumns: 0
      };
    },
    one_col: function one_col() {
      return {
        cubeImages: false,
        isVertical: true,
        galleryType: 'Columns',
        groupSize: 1,
        groupTypes: '1',
        gallerySize: function gallerySize() {
          return dimensionsHelper.getGalleryWidth();
        },
        //'full_width';
        fixedColumns: 1
      };
    },
    one_row: function one_row() {
      return {
        cubeImages: false,
        isVertical: false,
        galleryType: 'Strips',
        groupSize: 1,
        groupTypes: '1',
        gallerySize: function gallerySize() {
          return dimensionsHelper.getGalleryHeight();
        },
        fixedColumns: 0
      };
    },
    slideshow: function slideshow() {
      return {
        showArrows: true,
        cubeImages: true,
        cubeRatio: function cubeRatio() {
          return dimensionsHelper.getGalleryRatio();
        },
        isVertical: true,
        gallerySize: function gallerySize() {
          return dimensionsHelper.getGalleryWidth();
        },
        galleryType: 'Columns',
        groupSize: 1,
        groupTypes: '1',
        fixedColumns: 1
      };
    }
  };
  var styleState;

  switch (galleryType) {
    case '-1':
      //empty
      styleState = {
        gallerySize: gallerySize
      };
      break;

    case '0':
      //vertical collage
      styleState = galleryTypes.collage_ver();
      break;

    default:
    case '1':
      //horizontal collage
      styleState = galleryTypes.collage_hor();
      break;

    case '2':
      //grid
      styleState = galleryTypes.grid();
      break;

    case '3':
      //vertical masonry
      styleState = galleryTypes.masonry_ver();
      break;

    case '4':
      //horizontal masonry
      styleState = galleryTypes.masonry_hor();
      break;

    case '5':
      //one column
      styleState = galleryTypes.one_col();
      break;

    case '6':
      //one row
      styleState = galleryTypes.one_row();
      break;

    case '7':
      //slideshow
      styleState = galleryTypes.slideshow();
      break;
  }

  return styleState;
} //returns true if the given param is in the current layout preset


var layoutHelper_isInPreset = function isInPreset(styleParams, paramToCheck) {
  var layoutName = getLayoutName(styleParams.galleryLayout) || 'empty'; // empty for when there is no layout given

  return Object.keys(presets[layoutName]).includes(paramToCheck);
};

var getLayoutName = function getLayoutName(galleryLayout) {
  var galleyLayoutList = ['empty', // -1
  'collage', // 0
  'masonry', // 1
  'grid', // 2
  'thumbnails', // 3
  'slider', // 4
  'slideshow', // 5
  'panorama', // 6
  'column', // 7
  'magic', // 8
  'fullsize', // 9
  'bricks', // 10
  'alternate', // 11
  'mix' // 12
  ];
  return galleyLayoutList[galleryLayout + 1];
};

function addLayoutStyles(styles) {
  var galleryLayoutV1 = styles.galleryType;
  var galleryLayoutV2 = styles.galleryLayout;

  if (!utils.isUndefined(galleryLayoutV1) && utils.isUndefined(galleryLayoutV2)) {
    //legacy layouts - only if galleyrType parameter is specifically defined (i.e. layout had changed)
    styles = Object.assign(styles, getStyleByGalleryType(styles)); //legacy layouts

    styles.layoutsVersion = 1;
    var selectedLayoutVars = ['galleryType', 'galleryThumbnailsAlignment', 'magicLayoutSeed', 'cubeType', 'isVertical', 'scrollDirection', 'enableInfiniteScroll'];
    styles.selectedLayout = selectedLayoutVars.map(function (key) {
      return String(styles[key]);
    }).join('|');
  } else {
    //new layouts
    if (utils.isVerbose()) {
      console.log('Using galleryLayout for defaults', styles);
    }

    styles = Object.assign({}, emptyLayout, styles);
    var _selectedLayoutVars = ['galleryLayout', 'galleryThumbnailsAlignment', 'magicLayoutSeed', 'cubeType', 'isVertical', 'scrollDirection', 'enableInfiniteScroll'];
    styles.selectedLayout = _selectedLayoutVars.map(function (key) {
      return String(styles[key]);
    }).join('|');
    styles.layoutsVersion = 2;
    styles.selectedLayoutV2 = galleryLayoutV2;

    if (utils.isVerbose()) {
      console.log('new selected layout', styles.selectedLayout);
    }
  }

  styles = Object.assign(styles, processLayouts(styles));
  return styles;
}

function processLayouts(styles) {
  var processedStyles = styles;
  processedStyles.isSlideshowFont = isSlideshowFont(processedStyles);
  processedStyles.oneRow = processedStyles.oneRow || processedStyles.scrollDirection === constants_scrollDirection.HORIZONTAL;

  if (utils.isMobile()) {
    if (processedStyles.isSlideshowFont) {
      if (!utils.isUndefined(processedStyles.itemFontSlideshow)) {
        processedStyles.itemFontSlideshow.value = processedStyles.itemFontSlideshow.value.replace(/^font\s*:\s*/, '');
        processedStyles.itemFontSlideshow.value = processedStyles.itemFontSlideshow.value.replace(/;$/, '');

        if (processedStyles.itemFontSlideshow.value.indexOf('underline') > -1) {
          processedStyles.itemFontSlideshow.value = processedStyles.itemFontSlideshow.value.replace('underline', '');
          processedStyles.textDecorationTitle = 'underline';
        } else {
          processedStyles.textDecorationTitle = 'none';
        }
      }

      if (!utils.isUndefined(processedStyles.itemDescriptionFontSlideshow)) {
        processedStyles.itemDescriptionFontSlideshow.value = processedStyles.itemDescriptionFontSlideshow.value.replace(/^font\s*:\s*/, '');
        processedStyles.itemDescriptionFontSlideshow.value = processedStyles.itemDescriptionFontSlideshow.value.replace(/;$/, '');

        if (processedStyles.itemDescriptionFontSlideshow.value.indexOf('underline') > -1) {
          processedStyles.itemDescriptionFontSlideshow.value = processedStyles.itemDescriptionFontSlideshow.value.replace('underline', '');
          processedStyles.textDecorationDesc = 'underline';
        } else {
          processedStyles.textDecorationDesc = 'none';
        }
      }
    } else {
      if (!utils.isUndefined(processedStyles.itemFont)) {
        processedStyles.itemFont.value = processedStyles.itemFont.value.replace(/^font\s*:\s*/, '');
        processedStyles.itemFont.value = processedStyles.itemFont.value.replace(/;$/, '');

        if (processedStyles.itemFont.value.indexOf('underline') > -1) {
          processedStyles.itemFont.value = processedStyles.itemFont.value.replace('underline', '');
          processedStyles.textDecorationTitle = 'underline';
        } else {
          processedStyles.textDecorationTitle = 'none';
        }
      }

      if (!utils.isUndefined(processedStyles.itemDescriptionFont)) {
        processedStyles.itemDescriptionFont.value = processedStyles.itemDescriptionFont.value.replace(/^font\s*:\s*/, '');
        processedStyles.itemDescriptionFont.value = processedStyles.itemDescriptionFont.value.replace(/;$/, '');

        if (processedStyles.itemDescriptionFont.value.indexOf('underline') > -1) {
          processedStyles.itemDescriptionFont.value = processedStyles.itemDescriptionFont.value.replace('underline', '');
          processedStyles.textDecorationDesc = 'underline';
        } else {
          processedStyles.textDecorationDesc = 'none';
        }
      }
    }
  }

  if ((!processedStyles.isVertical || processedStyles.groupSize > 1 || processedStyles.oneRow === true) && !processedStyles.isSlider && !processedStyles.isColumns) {
    // all horizontal layouts that are not slider or columns
    processedStyles.titlePlacement = placements.SHOW_ON_HOVER;
  } // to_wrapper


  if (!hasHoverPlacement(processedStyles.titlePlacement) && processedStyles.hoveringBehaviour !== infoBehaviourOnHover.NEVER_SHOW) {
    processedStyles.hoveringBehaviour = infoBehaviourOnHover.APPEARS;
  }

  if (processedStyles.imageLoadingMode === loadingMode.COLOR && processedStyles.imageLoadingWithColorMode === loadingWithColorMode.MAIN_COLOR) {
    processedStyles.imageLoadingMode = loadingMode.MAIN_COLOR;
  }

  if (processedStyles.cubeType === 'fit' && (processedStyles.isGrid || processedStyles.hasThumbnails || processedStyles.isSlider || processedStyles.isSlideshow)) {
    processedStyles.itemBorderWidth = 0;
    processedStyles.itemBorderRadius = 0;
    processedStyles.itemEnableShadow = false;
  }

  if (processedStyles.itemEnableShadow) {
    if (processedStyles.oneRow) {
      processedStyles.itemEnableShadow = false;
    } else {
      //add galleryMargin to allow the shadow to be seen
      processedStyles.galleryMargin = Math.max(processedStyles.galleryMargin, (processedStyles.itemShadowSize || 0) + (processedStyles.itemShadowBlur || 0));
    }
  }

  if (processedStyles.oneRow) {
    //if oneRow is true, use horizontal layouts only
    processedStyles.isVertical = false;
    processedStyles.scrollAnimation = scrollAnimations.NO_EFFECT;
  } else {
    processedStyles.slideshowLoop = false; //allow slideshowLoop only for horizontal layouts
  }

  if (processedStyles.imageMargin > 0) {
    if (utils.isMobile()) {
      processedStyles.imageMargin = Math.min(processedStyles.imageMargin, 50); //limit mobile spacing to 50px (25 on each side)
    }

    processedStyles.imageMargin /= 2;
  }

  if (processedStyles.loadMoreButtonFont && utils.isMobile()) {
    processedStyles.loadMoreButtonFont.value = processedStyles.loadMoreButtonFont.value.replace(/^font\s*:\s*/, '');
    processedStyles.loadMoreButtonFont.value = processedStyles.loadMoreButtonFont.value.replace(/;$/, '');

    if (processedStyles.loadMoreButtonFont.value.indexOf('underline') > -1) {
      processedStyles.loadMoreButtonFont.value = processedStyles.loadMoreButtonFont.value.replace('underline', '');
      processedStyles.textDecorationLoadMore = 'underline';
    } else {
      processedStyles.textDecorationLoadMore = 'none';
    }
  }

  if (processedStyles.isGrid && !processedStyles.oneRow || featureManager.supports.fixedColumnsInMasonry && processedStyles.isMasonry && processedStyles.isVertical) {
    // if (canSet('numberOfImagesPerRow', 'fixedColumns')) {
    //If toggle is for Items per row, fill the fixedColumns with the number of items
    //If toggle is responsive, make fixedColumns to be 0 or undefined;
    //Show the new controls only on Vertical scroll (one ow is false)
    processedStyles.fixedColumns = String(processedStyles.gridStyle) === '1' ? Number(processedStyles.numberOfImagesPerRow) : 0;
    processedStyles.groupTypes = '1';
    processedStyles.groupSize = 1;
    processedStyles.collageAmount = 0;
    processedStyles.collageDensity = 0; // }
  } //TODO this needs to split, need to leave the wixStyles assign in the statics section


  if (!utils.isUndefined(processedStyles.numberOfImagesPerCol) && processedStyles.isGrid && processedStyles.oneRow) {
    processedStyles.fixedColumns = 0;

    switch (processedStyles.numberOfImagesPerCol) {
      case 1:
      default:
        processedStyles.groupTypes = '1';
        processedStyles.groupSize = 1;
        processedStyles.collageAmount = 0;
        processedStyles.collageDensity = 0;
        break;

      case 2:
        processedStyles.groupTypes = '2v';
        processedStyles.groupSize = 2;
        processedStyles.collageAmount = 1;
        processedStyles.collageDensity = 1;
        break;

      case 3:
        processedStyles.groupTypes = '3v';
        processedStyles.groupSize = 3;
        processedStyles.collageAmount = 1;
        processedStyles.collageDensity = 1;
        break;
    }
  } //returned to the statics because it was the definition of the object.
  // processedStyles.sharpParams = {
  //   quality: 90,
  //   usm: {}
  // };
  //Backwards compatibility for masonry layout


  if (String(processedStyles.galleryLayout) === '1') {
    if (processedStyles.isVertical) {
      processedStyles.gallerySize = Math.round(processedStyles.gallerySize * 8 + 200);
    } else {
      processedStyles.gallerySize = Math.round(processedStyles.gallerySize * 5 + 200);
    }
  }

  if (processedStyles.forceMobileCustomButton) {
    processedStyles.gallerySize = Math.round(30 * 8.5 + 150);
    processedStyles.titlePlacement = placements.SHOW_BELOW;
    processedStyles.galleryLayout = 2;
    processedStyles.fixedColumns = 1;
    processedStyles.numberOfImagesPerRow = 1;
  }

  if (processedStyles.fixedColumns > 0 && utils.isMobile() && typeof processedStyles.m_numberOfImagesPerRow === 'undefined') {
    processedStyles.fixedColumns = 1;
  } //in case a special gallery size was specified, use it


  if (processedStyles.gallerySizeType === constants_gallerySizeType.PIXELS && processedStyles.gallerySizePx > 0) {
    processedStyles.gallerySize = processedStyles.gallerySizePx;
  } else if (processedStyles.gallerySizeType === constants_gallerySizeType.RATIO && processedStyles.gallerySizeRatio > 0) {
    processedStyles.gallerySize = (window_windowWrapper && window_windowWrapper.innerWidth || 980) * (processedStyles.gallerySizeRatio / 100);
  }

  processedStyles.textBoxHeight = getTextBoxAboveOrBelowHeight(processedStyles);
  processedStyles.externalInfoHeight = getHeightFromStyleParams(processedStyles, processedStyles.textBoxHeight);
  processedStyles.externalInfoWidth = getTextBoxRightOrLeftWidth(processedStyles);
  return processedStyles;
}

function getHeightFromStyleParams(styleParams, textBoxHeight) {
  var additionalHeight = textBoxHeight;

  if (hasVerticalPlacement(styleParams.titlePlacement) && styleParams.imageInfoType === infoType.SEPARATED_BACKGROUND && (styleParams.allowTitle || styleParams.allowDescription)) {
    additionalHeight += styleParams.textImageSpace;
    additionalHeight += styleParams.textBoxBorderWidth * 2;
  }

  return additionalHeight;
}

function getTextBoxRightOrLeftWidth(styleParams) {
  if (!shouldShowTextRightOrLeftBelow(styleParams)) {
    return 0;
  }

  var gallerySize = styleParams.gallerySize,
      calculateTextBoxWidthMode = styleParams.calculateTextBoxWidthMode,
      textBoxWidth = styleParams.textBoxWidth,
      textBoxWidthPercent = styleParams.textBoxWidthPercent;
  var width = 0;

  if (calculateTextBoxWidthMode === textBoxWidthCalculationOptions.PERCENT) {
    width = Math.min(100, Math.max(0, textBoxWidthPercent)) / 100;
  } else {
    width = Math.min(gallerySize, textBoxWidth);
  }

  return width;
}

function shouldShowTextRightOrLeftBelow(styleParams) {
  var oneRow = styleParams.oneRow,
      isVertical = styleParams.isVertical,
      groupSize = styleParams.groupSize,
      titlePlacement = styleParams.titlePlacement,
      allowTitle = styleParams.allowTitle,
      allowDescription = styleParams.allowDescription,
      useCustomButton = styleParams.useCustomButton;
  var allowedByLayoutConfig = !oneRow && isVertical && groupSize === 1;
  return allowedByLayoutConfig && hasHorizontalPlacement(titlePlacement) && (allowTitle || allowDescription || useCustomButton);
}

function getTextBoxAboveOrBelowHeight(styleParams) {
  if (!shouldShowTextBoxAboveOrBelow(styleParams)) {
    return 0;
  }

  if (styleParams.calculateTextBoxHeightMode === textBoxHeightCalculationOptions.AUTOMATIC) {
    return getHeightByContent(styleParams);
  } else {
    return styleParams.textBoxHeight;
  }
}

function shouldShowTextBoxAboveOrBelow(styleParams) {
  var titlePlacement = styleParams.titlePlacement,
      allowTitle = styleParams.allowTitle,
      allowDescription = styleParams.allowDescription,
      useCustomButton = styleParams.useCustomButton;
  return hasVerticalPlacement(titlePlacement) && (allowTitle || allowDescription || useCustomButton);
}

function getHeightByContent(styleParams) {
  var itemFontSlideshow = styleParams.itemFontSlideshow,
      itemDescriptionFontSlideshow = styleParams.itemDescriptionFontSlideshow,
      allowTitle = styleParams.allowTitle,
      allowDescription = styleParams.allowDescription,
      useCustomButton = styleParams.useCustomButton;

  if (!shouldShowTextBoxAboveOrBelow(styleParams)) {
    return 0;
  }

  var paddingTopAndBottom = 45;
  var defaultButtonHeight = useCustomButton ? 33 : 0;
  var defaultItemFontSize = 22;
  var defaultItemDescriptionFontSize = 15;
  var totalSpaceBetweenElements = useCustomButton && (allowTitle || allowDescription) ? designConsts.spaceBetweenElements : 0;
  var titleFontSize = 0;
  var descriptionFontSize = 0;

  if (allowTitle) {
    titleFontSize = itemFontSlideshow ? getFontLineHeight(itemFontSlideshow) : defaultItemFontSize;
    totalSpaceBetweenElements += allowDescription ? designConsts.spaceBetweenTitleAndDescription : 0;
  }

  if (allowDescription) {
    descriptionFontSize = itemDescriptionFontSlideshow ? getFontLineHeight(itemDescriptionFontSlideshow) : defaultItemDescriptionFontSize;
  }

  return 10 + titleFontSize + 3 * descriptionFontSize + paddingTopAndBottom + totalSpaceBetweenElements + defaultButtonHeight; // HACK  +10 for spare place. we can not really know that this is the final font - thus, this whole calc to get the bottom info height will break one day again.
}

function getFontLineHeight(font) {
  if (font.value.match(/\/(\d+)px/)) {
    //lineHeight is in px
    return parseInt(font.value.match(/\/(\d+)px/)[1]);
  } else if (font.value.match(/\/(\d+)%/)) {
    //lineHeight is in percentage
    return font.size * (parseInt(font.value.match(/\/(\d+)%/)[1]) / 100);
  } else if (font.value.match(/px\/(([0-9]*[.])?[0-9]*)/)) {
    //lineHeight is in em or without any units (which means em too)
    return font.size * parseFloat(font.value.match(/px\/(([0-9]*[.])?[0-9]*)/)[1]);
  } else {
    console.error('GalleryContainer -> getFontLineHeight -> font lineHeight do not match any pattern. font value: ', font.value);
    return font.size;
  }
}

function isSlideshowFont(styles) {
  var galleryLayout = styles.galleryLayout;

  if (galleryLayout === constants.layout.SLIDESHOW) {
    return true;
  }

  if (hasVerticalPlacement(styles.titlePlacement)) {
    if (galleryLayout === 4 || galleryLayout === 6 || galleryLayout === 7) {
      return true;
    } else if (galleryLayout === 1 && styles.isVertical) {
      return true;
    } else if (galleryLayout === 2 && styles.scrollDirection !== 1) {
      return true;
    }
  }

  return false;
}


// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/utils.js
function src_utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function src_utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { src_utils_ownKeys(Object(source), true).forEach(function (key) { src_utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { src_utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function src_utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var src_utils_Utils = /*#__PURE__*/function () {
  function Utils() {
    this._hash2int = {};
  }

  var _proto = Utils.prototype;

  _proto.stripSlashes = function stripSlashes(str) {
    var newStr = '';

    if (typeof str === 'string') {
      newStr = str.replace(/\\\//g, '/').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\0/g, '\0').replace(/\\\\/g, '\\');
    }

    return newStr;
  };

  _proto.parseStringObject = function parseStringObject(sObj) {
    if (typeof sObj !== 'string') {
      return sObj;
    }

    var stripedObj = this.stripSlashes(sObj); //eslint-disable-next-line

    if (typeof sObj === 'string' && /^[\],:{}\s]*$/.test(stripedObj.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      //this is a json
      try {
        return JSON.parse(stripedObj);
      } catch (e) {// console.error('Parse object error: Catched ', e);
      }
    }

    return stripedObj;
  };

  _proto.hashToInt = function hashToInt(str, min, max) {
    var _int = 0;

    if (typeof str === 'undefined' || str.length === 0) {
      return _int;
    }

    if (!this._hash2int[str]) {
      for (var i = 0; i < str.length; i++) {
        _int += str.charCodeAt(i);
      }

      this._hash2int[str] = _int;
    }

    if (typeof min === 'undefined' || typeof max === 'undefined') {
      return this._hash2int[str];
    } else {
      return this._hash2int[str] % (max - min + 1) + min;
    }
  };

  _proto.insertIfDefined = function insertIfDefined(obj, field, value) {
    if (typeof value !== 'undefined') {
      obj[field] = value;
    }
  };

  _proto.convertStyleParams = function convertStyleParams(styleParams) {
    //default styleParams
    var convertedStyleParams = Object.assign({
      cubeImages: false,
      cubeType: 'fill',
      cubeRatio: 1,
      rotatingCropRatios: '',
      smartCrop: false,
      imageMargin: 10,
      galleryMargin: 0,
      floatingImages: 0,
      chooseBestGroup: true,
      groupSize: 3,
      groupTypes: '1,2h,2v,3h,3v,3t,3b,3l,3r',
      rotatingGroupTypes: '',
      isVertical: true,
      minItemSize: 120,
      oneRow: false,
      gallerySize: 500,
      collageDensity: 50,
      fixedColumns: 0,
      columnWidths: ''
    }, styleParams);
    this.insertIfDefined(convertedStyleParams, 'cubeImages', convertedStyleParams.cropItems);
    this.insertIfDefined(convertedStyleParams, 'cubeType', convertedStyleParams.cropType);
    this.insertIfDefined(convertedStyleParams, 'cubeRatio', convertedStyleParams.cropRatio);
    this.insertIfDefined(convertedStyleParams, 'rotatingCropRatios', Array.isArray(convertedStyleParams.rotatingCropRatios) ? convertedStyleParams.rotatingCropRatios.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'smartCrop', convertedStyleParams.smartCrop);
    this.insertIfDefined(convertedStyleParams, 'imageMargin', convertedStyleParams.itemSpacing);
    this.insertIfDefined(convertedStyleParams, 'galleryMargin', convertedStyleParams.layoutSpacing);
    this.insertIfDefined(convertedStyleParams, 'floatingImages', convertedStyleParams.randomSpacings);
    this.insertIfDefined(convertedStyleParams, 'chooseBestGroup', convertedStyleParams.smartGrouping);
    this.insertIfDefined(convertedStyleParams, 'groupSize', convertedStyleParams.itemsPerGroup);
    this.insertIfDefined(convertedStyleParams, 'groupTypes', Array.isArray(convertedStyleParams.allowedGroupTypes) ? convertedStyleParams.allowedGroupTypes.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'rotatingGroupTypes', Array.isArray(convertedStyleParams.rotatingGroupTypes) ? convertedStyleParams.rotatingGroupTypes.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'isVertical', convertedStyleParams.isColumnsLayout);
    this.insertIfDefined(convertedStyleParams, 'minItemSize', convertedStyleParams.minItemSize);
    this.insertIfDefined(convertedStyleParams, 'oneRow', convertedStyleParams.isVerticalScroll);
    this.insertIfDefined(convertedStyleParams, 'gallerySize', convertedStyleParams.rowSize || convertedStyleParams.columnSize);
    this.insertIfDefined(convertedStyleParams, 'collageDensity', convertedStyleParams.collageDensity);
    this.insertIfDefined(convertedStyleParams, 'fixedColumns', convertedStyleParams.fixedColumns);
    this.insertIfDefined(convertedStyleParams, 'columnWidths', Array.isArray(convertedStyleParams.columnWidths) ? convertedStyleParams.columnWidths.join(',') : undefined);
    return convertedStyleParams;
  };

  _proto.convertContainer = function convertContainer(container, styleParams) {
    var convertedContainer = src_utils_objectSpread({
      bounds: {}
    }, container); // galleryWidth is a value calculated prior to the layouter. if it exists it is stronger than width. if galleryWidth doesnt exist width(the total container width) is used instead but it then requieres adding margin calculations. Same is true for the height.
    // this is mostly true for "galleries" containing more than one "gallery" such as thumbnails where teh thumbnails are also a gallery and both are contained within container.width/height and have their own galleryWidth/Height


    if (container.width >= 0 && !(container.galleryWidth >= 0)) {
      convertedContainer.galleryWidth = container.width + ((styleParams.imageMargin || 0) - (styleParams.galleryMargin || 0)) * 2;
      delete convertedContainer.width;
    }

    if (container.height >= 0 && !(container.galleryHeight >= 0)) {
      convertedContainer.galleryHeight = container.height + ((styleParams.imageMargin || 0) - (styleParams.galleryMargin || 0));
      delete convertedContainer.height;
    }

    if (styleParams.externalInfoHeight >= 0 && styleParams.oneRow) {
      convertedContainer.galleryHeight -= styleParams.externalInfoHeight;
    }

    return convertedContainer;
  };

  return Utils;
}();

var utils_utils = new src_utils_Utils();
// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/item.js
function item_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function item_createClass(Constructor, protoProps, staticProps) { if (protoProps) item_defineProperties(Constructor.prototype, protoProps); if (staticProps) item_defineProperties(Constructor, staticProps); return Constructor; }


var item_Item = /*#__PURE__*/function () {
  /* @ngInject */
  function Item(config) {
    this.style = {};
    this.visibility = {};
    config = config || {};

    if (!config.dto) {
      console.error('Item has no DTO', config);
      config.dto = {};
    }

    this.config = config;
    this.dto = config.dto;
    this.idx = config.idx;
    this.inGroupIdx = config.inGroupIdx;
    this.container = config.container;
    this.cubeType = 'fill';

    if (config.styleParams) {
      var _config = config,
          styleParams = _config.styleParams;
      this.cubeType = styleParams.cubeType;
      this.cubeImages = styleParams.cubeImages;
      this._cubeRatio = styleParams.cubeRatio;
      this.rotatingCropRatios = styleParams.rotatingCropRatios;
      this.smartCrop = styleParams.smartCrop;
      this.cropOnlyFill = styleParams.cropOnlyFill;
      this.imageMargin = styleParams.imageMargin;
      this.galleryMargin = styleParams.galleryMargin;
      this.floatingImages = styleParams.floatingImages;
      this.smartCrop = styleParams.smartCrop;
    }

    this._groupOffset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    this._group = {};

    this.calcPinOffset = function () {
      return 0;
    };

    this.resize(1);
  }

  var _proto = Item.prototype;

  _proto.fixMetadataVerticalVideoRatio = function fixMetadataVerticalVideoRatio(metadata) {
    if (metadata.qualities && metadata.qualities[0]) {
      //fix incorrect width height for vertical videos
      var qualities = metadata.qualities;
      var _qualities = qualities[qualities.length - 1],
          height = _qualities.height,
          width = _qualities.width;
      metadata.height = height;
      metadata.width = width;
    }
  };

  _proto.resize = function resize(scaleOrDimensions) {
    var scale = 1;

    if (scaleOrDimensions === false) {
      return;
    } else if (scaleOrDimensions > 0) {
      scale = scaleOrDimensions;
    } else if (typeof scaleOrDimensions === 'object') {
      if (scaleOrDimensions.width) {
        var w = Math.max(1, scaleOrDimensions.width);
        scale = w / this.width;
      } else if (scaleOrDimensions.height) {
        var h = Math.max(1, scaleOrDimensions.height);
        scale = h / this.height;
      }
    }

    this.width *= scale;
    this.height *= scale;
    this.resized = true;
    return this;
  };

  _proto.pinToCorner = function pinToCorner(cornerName, pinAfter) {
    var _this = this;

    if (pinAfter === void 0) {
      pinAfter = false;
    }

    var isTop = cornerName.indexOf('top') >= 0;
    var isLeft = cornerName.indexOf('left') >= 0;
    this.style.top = isTop ? 0 : 'auto';
    this.style.bottom = isTop ? 'auto' : 0;
    this.style.left = isLeft ? 0 : 'auto';
    this.style.right = isLeft ? 'auto' : 0;
    this.pin = cornerName;
    this.isPinnedTop = isTop;
    this.isPinnedLeft = isLeft;
    this.pinAfter = pinAfter;
    this.pinAfterType = isTop ? 'top' : isLeft ? 'left' : '';

    this.calcPinOffset = function (groupSize, dir) {
      if (!_this.pinAfter) {
        return 0;
      } else if (_this.pin === dir) {
        //this is used only for 3h/3v group types - to calc the offset of the middle item
        var m = _this.imageMargin; // return ((groupSize - 6 * m) * this.pinOffset + 2 * m);

        if (dir === 'top') {
          return _this.pinAfter.height + 2 * m;
        } else if (dir === 'left') {
          return _this.pinAfter.width + 2 * m;
        } else {
          return 0;
        } // return ((groupSize - 6 * m) * this.pinOffset + 4 * m);

      } else {
        return 0;
      }
    };
  };

  _proto.setPosition = function setPosition(position) {
    this.style.position = position;
  };

  _proto.getPosition = function getPosition(pos) {
    return parseInt(pos, 10) >= 0 ? pos : 'auto';
  };

  item_createClass(Item, [{
    key: "top",
    get: function get() {
      return this.getPosition(this.style.top);
    }
  }, {
    key: "left",
    get: function get() {
      return this.getPosition(this.style.left);
    }
  }, {
    key: "right",
    get: function get() {
      return this.getPosition(this.style.right);
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.getPosition(this.style.bottom);
    }
  }, {
    key: "group",
    set: function set(group) {
      Object.assign(this._group, group);
    },
    get: function get() {
      return this._group;
    }
  }, {
    key: "groupOffset",
    set: function set(offset) {
      Object.assign(this._groupOffset, offset);
    }
  }, {
    key: "offset",
    get: function get() {
      var offset = {
        top: this._groupOffset.top + (this.isPinnedTop ? this.calcPinOffset(this._group.height, 'top') : this._group.height - this.outerHeight) || 0,
        left: this._groupOffset.left + (this.isPinnedLeft ? this.calcPinOffset(this._group.width, 'left') : this._group.width - this.outerWidth) || 0
      };
      offset.right = offset.left + this.width;
      offset.bottom = offset.top + this.height;
      return offset;
    }
  }, {
    key: "transform",
    get: function get() {
      if (this.floatingImages > 0) {
        var m = this.imageMargin;
        var g = this.galleryMargin;
        var spaceLeft = this.offset.left > 0 ? m : g;
        var spaceRight = this.container.galleryWidth - this.offset.right > 2 * m ? m : g;
        var spaceUp = this.offset.top > 0 ? m : g;
        var spaceDown = this.container.galleryHeight - this.offset.bottom > 2 * m ? m : g;
        var horizontalShift = utils_utils.hashToInt(this.hash + this.offset.right + 'x', -1 * spaceLeft, spaceRight) * this.floatingImages;
        var verticalShift = utils_utils.hashToInt(this.hash + this.offset.top + 'y', -1 * spaceUp, spaceDown) * this.floatingImages;
        return {
          transform: "translate3d(" + horizontalShift + "px, " + verticalShift + "px, 0)"
        };
      } else {
        return {};
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this.dto.id || this.dto.photoId || this.dto.itemId;
    },
    set: function set(id) {
      this.dto.itemId = this.dto.photoId = this.dto.id = id;
    }
  }, {
    key: "hash",
    get: function get() {
      return this.dto.hash || this.dto.mediaUrl || this.dto.id;
    }
  }, {
    key: "maxWidth",
    get: function get() {
      return this.dto.width || this.dto.w;
    },
    set: function set(w) {
      this.dto.width = w;
    }
  }, {
    key: "outerWidth",
    get: function get() {
      return this.width + 2 * this.margins;
    }
  }, {
    key: "infoWidth",
    get: function get() {
      return this.Group ? this.Group.infoWidth : 0;
    }
  }, {
    key: "orgWidth",
    get: function get() {
      return this.style.width || this.dto.width || this.dto.w || 1; //make sure the width / height is not undefined (crashes the gallery)
    }
  }, {
    key: "width",
    get: function get() {
      var width;

      if (this.cubeImages && this.ratio >= this.cubeRatio) {
        width = this.style.cubedWidth || this.orgHeight * this.cubeRatio;
      } else {
        width = this.orgWidth;
      }

      return Math.max(width, 1);
    },
    set: function set(w) {
      this.style.cubedWidth = this.style.width = Math.max(1, w);
    }
  }, {
    key: "outerHeight",
    get: function get() {
      return this.height + 2 * this.margins;
    }
  }, {
    key: "orgHeight",
    get: function get() {
      return this.style.height || this.dto.height || this.dto.h || 1; //make sure the width / height is not undefined (creashes the gallery)
    }
  }, {
    key: "height",
    get: function get() {
      var height;

      if (this.cubeImages && this.ratio < this.cubeRatio) {
        height = this.style.cubedHeight || this.orgWidth / this.cubeRatio;
      } else {
        height = this.orgHeight;
      }

      return Math.max(height, 1);
    },
    set: function set(h) {
      this.style.cubedHeight = this.style.height = Math.max(1, h);
    }
  }, {
    key: "maxHeight",
    get: function get() {
      return this.dto.height || this.dto.h;
    },
    set: function set(h) {
      h = this.dto.height;
    }
  }, {
    key: "infoHeight",
    get: function get() {
      return this.Group ? this.Group.infoHeight : 0;
    }
  }, {
    key: "margins",
    get: function get() {
      return this.imageMargin || 0;
    },
    set: function set(m) {
      this.imageMargin = m;
    }
  }, {
    key: "cubeRatio",
    get: function get() {
      var _this2 = this;

      var ratio;

      if (this.rotatingCropRatio) {
        ratio = this.rotatingCropRatio;
      } else if (this.rotatingCropRatios && this.rotatingCropRatios.length > 0) {
        var cropRatiosArr = String(this.rotatingCropRatios).split(',');
        ratio = this.rotatingCropRatio = cropRatiosArr[this.idx % cropRatiosArr.length];
      }

      if (!ratio && typeof this._cubeRatio === 'function') {
        ratio = this._cubeRatio();
      }

      if (!ratio && this.cropOnlyFill && this.cubeType === 'fit') {
        ratio = this.ratio;
      }

      if (!ratio) {
        ratio = this._cubeRatio || this.ratio;
      }

      if (this.dynamicCropRatios !== null && typeof ratio === 'string') {
        if (!this.dynamicCropRatios) {
          var dynamicCropRegex = /^\d*\.?\d*(%|px)\/\d*\.?\d*(%|px)$/;
          var match = dynamicCropRegex.exec(ratio);

          if (match) {
            this.dynamicCropRatios = ratio.split('/').map(function (val, idx) {
              if (val.indexOf('%') > 0) {
                return {
                  type: '%',
                  val: parseFloat(val.replace('%', '')) / 100,
                  dim: idx === 0 ? 'galleryWidth' : 'galleryHeight'
                };
              } else {
                return {
                  type: 'px',
                  val: parseInt(val.replace('px', ''))
                };
              }
            });
          } else {
            this.dynamicCropRatios = null;
          }
        }

        if (this.dynamicCropRatios) {
          var dynamicCropRatio = this.dynamicCropRatios.map(function (r) {
            if (r.type === '%') {
              var dim = _this2.container[r.dim] + (r.dim === 'galleryHeight' ? _this2.imageMargin : 0);
              var relativeDim = r.val * dim - 2 * _this2.imageMargin;
              return relativeDim;
            } else {
              return r.val;
            }
          });
          ratio = dynamicCropRatio[0] / dynamicCropRatio[1];
        }
      }

      ratio = Number(ratio);

      if (this.smartCrop === true) {
        if (this.isPortrait) {
          ratio = Math.min(ratio, 1 / ratio);
        } else {
          ratio = Math.max(ratio, 1 / ratio);
        }
      }

      if (this.cubeType === 'min') {
        ratio = Math.max(ratio, this.orgRatio);
      } else if (this.cubeType === 'max') {
        ratio = Math.min(ratio, this.orgRatio);
      }

      return ratio;
    },
    set: function set(ratio) {
      if (typeof this._cubeRatio === 'number') {
        this._cubeRatio = ratio;
        this.style.cubedHeight = this.style.cubedWidth = 0;
      }
    }
  }, {
    key: "orientation",
    get: function get() {
      return this.ratio < 0.999 ? 'portrait' : 'landscape'; //make sure that almost square images get the same treatment
    }
  }, {
    key: "isPortrait",
    get: function get() {
      return this.orientation === 'portrait';
    }
  }, {
    key: "isLandscape",
    get: function get() {
      return this.orientation === 'landscape';
    }
  }, {
    key: "ratio",
    get: function get() {
      if (!this.orgRatio) {
        this.orgRatio = this.orgWidth / this.orgHeight;
      }

      return this.orgRatio;
    },
    set: function set(r) {
      this.orgRatio = r;
    }
  }, {
    key: "scheme",
    get: function get() {
      return {
        id: this.id,
        idx: this.idx,
        inGroupIdx: this.inGroupIdx,
        dto: this.dto,
        type: this.type,
        style: this.style,
        width: this.width,
        maxWidth: this.maxWidth,
        outerWidth: this.outerWidth,
        infoWidth: this.infoWidth,
        margins: this.margins,
        ratio: this.ratio,
        cropRatio: this.cubeRatio,
        isCropped: this.cubeImages,
        cropType: this.cubeType,
        height: this.height,
        maxHeight: this.maxHeight,
        outerHeight: this.outerHeight,
        infoHeight: this.infoHeight,
        group: this.group,
        offset: this.offset,
        groupOffset: this._groupOffset,
        transform: this.transform,
        orientation: this.orientation,
        isPortrait: this.isPortrait,
        isLandscape: this.isLandscape,
        visibility: this.visibility
      };
    }
  }]);

  return Item;
}();
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/galleryItem.js
function galleryItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function galleryItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { galleryItem_ownKeys(Object(source), true).forEach(function (key) { galleryItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { galleryItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function galleryItem_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function galleryItem_createClass(Constructor, protoProps, staticProps) { if (protoProps) galleryItem_defineProperties(Constructor.prototype, protoProps); if (staticProps) galleryItem_defineProperties(Constructor, staticProps); return Constructor; }

////// <reference path="../../reference.ts" />





var galleryItem_GalleryItem = /*#__PURE__*/function () {
  function GalleryItem(config) {
    this.uniqueId = utils.generateUUID();
    this.isGalleryItem = true;
    this.createdBy = config.createdBy;
    this.createUrl = this.createUrl.bind(this);
    this.update(config);
  }

  var _proto = GalleryItem.prototype;

  _proto.update = function update(config) {
    this.resizeMediaUrl = config.resizeMediaUrl;

    if (config.dto && config.dto.dto) {
      config.dto = config.dto.dto; //defence patch due to mis-use of item-core

      if (utils.isDev()) {
        console.warn('Item core is created with already existing item core');
      }
    }

    this.dto = galleryItem_objectSpread({}, config.dto);

    if (config.scheme) {
      this.processScheme(config.scheme);
    } else {
      var dto = {};
      Object.assign(dto, this.dto, this.metadata);
      this.processScheme(new item_Item({
        dto: dto
      }).scheme);
    }

    if (this.dto) {
      var itemMetadata = this.dto.metaData || this.dto.metadata;

      if (itemMetadata) {
        //metadata is encoded encoded, parsed if needed
        this.dto.metaData = utils.parseStringObject(itemMetadata);
      }
    }

    this.sharpParams = galleryItem_objectSpread({}, config.sharpParams);

    if (!this.sharpParams.quality) {
      this.sharpParams.quality = 90;
    }

    if (!this.sharpParams.usm) {
      this.sharpParams.usm = {};
    }

    this.thumbnailSize = config.thumbnailSize || 120;
    this.resetUrls();
    this.updateSharpParams();
  };

  _proto.processScheme = function processScheme(scheme) {
    this.id = scheme.id;
    this.idx = scheme.idx;
    this.type = scheme.type;
    this.style = scheme.style;
    this.width = scheme.width;
    this.maxWidth = scheme.maxWidth;
    this.infoWidth = scheme.infoWidth;
    this.height = scheme.height;
    this.maxHeight = scheme.maxHeight;
    this.infoHeight = scheme.infoHeight;
    this.margins = scheme.margins;
    this.ratio = scheme.ratio;
    this.cubeRatio = scheme.cropRatio;
    this.cubeImages = scheme.isCropped;
    this.cubeType = scheme.cropType || resizeMethods.FILL;
    this.offset = scheme.offset;
    this.group = scheme.group;
    this.transform = scheme.transform;
    this.orientation = scheme.orientation;
    this.visibility = scheme.visibility;
  };

  _proto.renderProps = function renderProps(config) {
    return galleryItem_objectSpread({
      className: 'image',
      key: this.key,
      idx: this.idx,
      photoId: this.photoId,
      id: this.id,
      hash: this.id,
      html: this.html,
      type: this.type,
      isVideoPlaceholder: this.isVideoPlaceholder,
      url: this.url,
      alt: this.alt,
      directLink: this.directLink,
      directShareLink: this.directShareLink,
      linkUrl: this.linkUrl,
      linkType: this.linkType,
      linkOpenType: this.linkOpenType,
      linkData: this.linkData,
      title: this.title,
      fileName: this.fileName,
      description: this.description,
      createUrl: this.createUrl,
      cubeImages: this.cubeImages,
      cubeType: this.cubeType,
      cubeRatio: this.cubeRatio,
      transform: this.transform,
      offset: this.offset,
      style: galleryItem_objectSpread({
        ratio: this.ratio,
        bgColor: this.bgColor,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
        infoWidth: this.infoWidth,
        infoHeight: this.infoHeight,
        orientation: this.orientation
      }, this.style),
      isDemo: this.isDemo,
      videoUrl: this.videoUrl,
      isExternalVideo: this.isExternalVideo
    }, config);
  };

  _proto.getDataForShop = function getDataForShop() {
    var focalPoint = this.focalPoint;
    var metadata = this.metadata;
    return {
      isDemo: metadata.isDemo,
      orderIndex: this.orderIndex,
      itemId: this.dto.itemId,
      itemUrl: this.url,
      itemHeight: metadata.height,
      title: metadata.title,
      itemWidth: metadata.width,
      itemType: metadata.type || 'image',
      imageUrl: this.resizedUrl(resizeMethods.FIT, 200, 200, null, null).img(),
      imagePurchasedUrl: this.dto.mediaUrl,
      fpX: focalPoint[0],
      fpY: focalPoint[1]
    };
  };

  _proto.getHighestMp4Resolution = function getHighestMp4Resolution(qualities) {
    var mp4s = qualities.filter(function (video) {
      return video.formats[0] === 'mp4';
    });
    var _mp4s$sort$ = mp4s.sort(function (a, b) {
      return b.width - a.width;
    })[0],
        width = _mp4s$sort$.width,
        height = _mp4s$sort$.height;
    return {
      width: width,
      height: height
    };
  };

  _proto.resizedUrl = function resizedUrl(resizeMethod, requiredWidth, requiredHeight, sharpParams) {
    var _this = this;

    var resizeUrl = function resizeUrl(item, url) {
      var resizedUrl;

      if (typeof _this.resizeMediaUrl === 'function') {
        try {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var str = String(utils.hashCode(JSON.stringify(galleryItem_objectSpread({
            url: url
          }, args))));

          if (!_this._cachedUrls[str]) {
            _this._cachedUrls[str] = String(_this.resizeMediaUrl.apply(_this, [item, url].concat(args)) || '');
          }

          resizedUrl = _this._cachedUrls[str];
        } catch (e) {
          resizedUrl = String(url);
        }
      } else {
        resizedUrl = String(url);
      }

      return resizedUrl;
    };

    requiredWidth = Math.ceil(requiredWidth);
    requiredHeight = Math.ceil(requiredHeight);
    var thumbSize = 250;
    var focalPoint = resizeMethod === resizeMethods.FILL && this.isCropped && this.focalPoint;
    var urls = {};
    var imgUrl = this.url;

    if (this.isText) {
      return Object.assign.apply(Object, [{}].concat(Object.values(URL_TYPES).map(function (value) {
        var _ref;

        return _ref = {}, _ref[value] = function () {
          return '';
        }, _ref;
      })));
    } else if (this.isVideo || this.isVideoPlaceholder) {
      imgUrl = this.poster;

      if (utils.isExternalUrl(this.url)) {
        urls[URL_TYPES.VIDEO] = function () {
          return _this.url;
        };
      } else {
        urls[URL_TYPES.VIDEO] = function () {
          return resizeUrl(_this, _this.url, resizeMethods.VIDEO, requiredWidth, requiredHeight);
        };
      }
    }

    urls[URL_TYPES.HIGH_RES] = function () {
      return resizeUrl(_this, imgUrl, resizeMethod, requiredWidth, requiredHeight, sharpParams, focalPoint);
    };

    urls[URL_TYPES.LOW_RES] = function () {
      return resizeUrl(_this, imgUrl, resizeMethod, thumbSize, thumbSize * requiredHeight / requiredWidth, galleryItem_objectSpread(galleryItem_objectSpread({}, sharpParams), {}, {
        quality: 30,
        blur: 30
      }), focalPoint);
    };

    urls[URL_TYPES.SEO] = function () {
      return urls[URL_TYPES.HIGH_RES]().replace(/\.webp$/i, "." + _this.fileType);
    }; //SEO needs the original file type (jpg or png, etc..) instead of .webp, replace does not mutate


    return urls;
  };

  _proto.resetUrls = function resetUrls() {
    var maxWidth = this.maxWidth || this.dto.width || this.metadata.width;
    var maxHeight = this.maxHeight || this.dto.height || this.metadata.height;
    this.resizeWidth = Math.min(maxWidth, Math.ceil(this.width));
    this.resizeHeight = Math.min(maxHeight, Math.ceil(this.height));
    this._cachedUrls = {};
    this.urls = {};
  };

  _proto.createUrl = function createUrl(size, type) {
    try {
      return this[size + '_url'][type]();
    } catch (e) {
      return '';
    }
  };

  _proto.createDownloadUrl = function createDownloadUrl(url) {
    var _this2 = this;

    if (!this.urls.download_url) {
      this.urls.download_url = url;
      this.urls.download_url._img = this.urls.download_url.img;

      this.urls.download_url.img = function () {
        return _this2.urls.download_url._img() + ("?dn=" + _this2.fileName);
      };
    }

    return this.urls.download_url;
  };

  _proto.updateSharpParams = function updateSharpParams() {
    //override sharpParams with item sharpParams
    if (this.dto.metaData && this.dto.metaData.sharpParams && this.dto.metaData.sharpParams.L) {
      var sharpParams = this.dto.metaData.sharpParams.L;

      if (sharpParams.quality && sharpParams.overrideQuality === true) {
        this.sharpParams.quality = sharpParams.quality;
      }

      if (sharpParams.usm && sharpParams.overrideUsm === true) {
        this.sharpParams.usm = sharpParams.usm;
      }
    }
  };

  _proto.updateId = function updateId(id) {
    this.dto.itemId = this.id = id;
  };

  _proto.updateOrderIndex = function updateOrderIndex(value) {
    var ret = this.orderIndex !== value;
    this.orderIndex = value;
    return ret;
  };

  galleryItem_createClass(GalleryItem, [{
    key: "resized_url",
    get: function get() {
      if (!this.urls.resized_url) {
        this.urls.resized_url = this.resizedUrl(this.cubeType, this.resizeWidth, this.resizeHeight, this.sharpParams);
      }

      return this.urls.resized_url;
    }
  }, {
    key: "pixel_url",
    get: function get() {
      if (!this.urls.pixel_url) {
        this.urls.pixel_url = this.resizedUrl(resizeMethods.FILL, 1, 1, {
          quality: 5
        });
      }

      return this.urls.pixel_url;
    }
  }, {
    key: "thumbnail_url",
    get: function get() {
      if (!this.urls.thumbnail_url) {
        this.urls.thumbnail_url = this.resizedUrl(resizeMethods.FILL, this.thumbnailSize, this.thumbnailSize, {
          quality: 70
        });
      }

      return this.urls.thumbnail_url;
    }
  }, {
    key: "square_url",
    get: function get() {
      if (!this.urls.square_url) {
        this.urls.square_url = this.resizedUrl(resizeMethods.FILL, 100, 100, {
          quality: 80
        });
      }

      return this.urls.square_url;
    }
  }, {
    key: "full_url",
    get: function get() {
      if (!this.urls.full_url) {
        this.urls.full_url = this.resizedUrl(resizeMethods.FULL, this.maxWidth, this.maxHeight, this.sharpParams);
      }

      return this.urls.full_url;
    }
  }, {
    key: "sample_url",
    get: function get() {
      if (!this.urls.sample_url) {
        this.urls.sample_url = this.resizedUrl(resizeMethods.FIT, 500, 500, this.sharpParams);
      }

      return this.urls.sample_url;
    }
  }, {
    key: "preload_url",
    get: function get() {
      if (!this.urls.preload_url) {
        this.urls.preload_url = this.resized_url;
      }

      return this.urls.preload_url;
    }
  }, {
    key: "download_url",
    get: function get() {
      return this.createDownloadUrl(this.full_url);
    }
  }, {
    key: "download_sample_url",
    get: function get() {
      return this.createDownloadUrl(this.sample_url);
    }
  }, {
    key: "itemId",
    get: function get() {
      return this.id;
    }
  }, {
    key: "metadata",
    get: function get() {
      var md = this.dto.metaData || this.dto.metadata;

      if (utils.isUndefined(md)) {
        // console.error('Item with no metadata' + JSON.stringify(this.dto));
        md = {};
      }

      return md;
    }
  }, {
    key: "metaData",
    get: function get() {
      return this.metadata;
    }
  }, {
    key: "bgColor",
    get: function get() {
      var bg;

      if (this.isText) {
        bg = this.metadata && (this.metadata.textStyle && this.metadata.textStyle.backgroundColor || this.metadata.backgroundColor);
      } else {
        bg = 'none';
      }

      return bg;
    }
  }, {
    key: "isCropped",
    get: function get() {
      return this.cubeImages && this.cubeType === resizeMethods.FILL;
    }
  }, {
    key: "focalPoint",
    get: function get() {
      return this.metadata.focalPoint || [0.5, 0.5];
    },
    set: function set(value) {
      this.metadata.focalPoint = value;
    } //----------------------------------------------------------------//

  }, {
    key: "photoId",
    get: function get() {
      return this.id;
    }
  }, {
    key: "key",
    get: function get() {
      if (!this._key) {
        this._key = (this.dto.key || this.id || this.dto.url || 'no_key_found').replace(/\W/g, '');
      }

      return this._key;
    }
  }, {
    key: "orderIndex",
    get: function get() {
      return this.dto.orderIndex || this.dto.o || 0;
    },
    set: function set(value) {
      this.dto.orderIndex = value;
    }
  }, {
    key: "url",
    get: function get() {
      //todo :change from mediaUrl
      return this.dto.file_url || this.dto.mediaUrl || this.dto.url || this.dto.src;
    }
  }, {
    key: "fileType",
    get: function get() {
      return this.url.split('.').pop();
    }
  }, {
    key: "mediaUrl",
    get: function get() {
      return this.url;
    }
  }, {
    key: "html",
    get: function get() {
      return this.dto.html || this.dto.text || this.metadata.html || this.metadata.text;
    }
  }, {
    key: "lastModified",
    get: function get() {
      return this.metadata.lastModified;
    }
  }, {
    key: "seed",
    get: function get() {
      return utils.hashToInt(this.url);
    }
  }, {
    key: "isImage",
    get: function get() {
      return this.type === 'image';
    }
  }, {
    key: "isImportant",
    get: function get() {
      return !!this.dto.i;
    }
  }, {
    key: "videoUrl",
    get: function get() {
      return this.metadata.videoUrl;
    }
  }, {
    key: "poster",
    get: function get() {
      return this.metadata.poster || this.metadata.customPoster && this.metadata.customPoster.url || (this.metadata.posters ? this.metadata.posters[this.metadata.posters.length - 1].url : null);
    }
  }, {
    key: "qualities",
    get: function get() {
      return this.metadata.qualities;
    }
  }, {
    key: "isExternalVideo",
    get: function get() {
      return this.metadata.isExternal;
    }
  }, {
    key: "isExternal",
    get: function get() {
      return this.metadata.isExternal === true;
    }
  }, {
    key: "type",
    set: function set(type) {
      this._type = type;
    },
    get: function get() {
      switch (this._type || this.dto.type || this.metadata.type || this.dto.media_type) {
        case 'dummy':
          return 'dummy';

        case 'v':
        case 'video':
          return 'video';

        case 'h':
        case 'html':
        case 'text':
          return 'text';

        case 'i':
        case 'image':
        default:
          return 'image';
      }
    }
  }, {
    key: "isVideoPlaceholder",
    get: function get() {
      return !!(this.dto.isVideoPlaceholder || this.metadata.isVideoPlaceholder || this.dto.media_isVideoPlaceholder);
    }
  }, {
    key: "alt",
    get: function get() {
      return this.metadata.alt || this.title || this.description;
    }
  }, {
    key: "title",
    get: function get() {
      return this.metadata.title || '';
    },
    set: function set(value) {
      this.metadata.title = value;
    }
  }, {
    key: "fileName",
    get: function get() {
      return this.metadata.fileName || 'file';
    },
    set: function set(value) {
      this.metadata.fileName = value;
    }
  }, {
    key: "description",
    get: function get() {
      return this.metadata.description || ''; // if (!this.metadata.isDemo) {
      //   return this.metadata.description || '';
      // }
      // return this.getTranslatedValue(this.metadata.description);
    },
    set: function set(value) {
      this.metadata.description = value;
    }
  }, {
    key: "exif",
    get: function get() {
      return this.metadata.exif || '';
    }
  }, {
    key: "hasLink",
    get: function get() {
      switch (this.linkType) {
        case 'wix':
          return !!this.linkData.type;

        default:
          return !!this.linkUrl;
      }
    }
  }, {
    key: "link",
    get: function get() {
      return this.metadata.link || {};
    }
  }, {
    key: "linkData",
    get: function get() {
      if (this.metadata.link && this.metadata.link.data) {
        return this.metadata.link.data;
      } else if (this.isWixUrl) {
        return {
          type: 'web',
          url: this.linkUrl
        };
      } else {
        return {};
      }
    },
    set: function set(value) {
      if (!this.metadata.link) {
        this.metadata.link = {};
      }

      this.metadata.link.data = value;
    }
  }, {
    key: "linkType",
    get: function get() {
      if (this.metadata.link && !utils.isUndefined(this.metadata.link.type)) {
        return this.metadata.link.type;
      } else if (this.linkUrl) {
        return 'web';
      } else {
        return 'none';
      }
    },
    set: function set(value) {
      if (!this.metadata.link) {
        this.metadata.link = {};
      } // reset metadata.link when 'none' is selected - that's the way wix galleries work


      this.metadata.link = {
        type: value,
        url: undefined,
        text: undefined,
        title: undefined,
        target: '_blank'
      };
    }
  }, {
    key: "defaultLinkText",
    get: function get() {
      var linkData = this.linkData;

      switch (this.linkType) {
        case 'wix':
          if (linkData) {
            switch (linkData.type) {
              case 'PageLink':
                return "Go to Page " + linkData.pageName;

              case 'AnchorLink':
                return "Scroll to " + linkData.anchorName;

              case 'ExternalLink':
                return "" + linkData.url;

              case 'EmailLink':
                return "Email " + linkData.recipient;

              case 'PhoneLink':
                return "Call " + linkData.phoneNumber;

              case 'DocumentLink':
                return "Open " + linkData.name;

              default:
                return 'Go to Link';
            }
          } else {
            return 'Go to Link';
          }

        case 'web':
          return this.linkTitleFromUrl || this.linkUrl;

        case 'page':
          return this.linkTitle;

        default:
          return '';
      }
    }
  }, {
    key: "defaultLinkValue",
    get: function get() {
      var linkData = this.linkData;

      switch (this.linkType) {
        case 'wix':
          if (linkData) {
            switch (linkData.type) {
              case 'PageLink':
                if (linkData.pageName) {
                  return "PAGE - " + linkData.pageName;
                } else {
                  return 'PAGE';
                }

              case 'AnchorLink':
                return "ANCHOR - " + linkData.anchorName;

              case 'ExternalLink':
                return "LINK - " + linkData.url;

              case 'EmailLink':
                return "EMAIL - " + linkData.recipient;

              case 'PhoneLink':
                return "PHONE - " + linkData.phoneNumber;

              case 'DocumentLink':
                return "DOCUMENT - " + linkData.name;

              default:
                return 'Add a Link';
            }
          } else {
            return 'Add a Link';
          }

        case 'web':
          return this.linkUrl;

        case 'page':
          return this.linkTitle;

        default:
          return '';
      }
    }
  }, {
    key: "linkText",
    get: function get() {
      return this.metadata.link && this.metadata.link.text || this.defaultLinkText;
    },
    set: function set(value) {
      if (!this.metadata.link) {
        this.metadata.link = {};
      }

      this.metadata.link.text = value;
    }
  }, {
    key: "linkTitle",
    get: function get() {
      return this.metadata.link && this.metadata.link.title;
    },
    set: function set(value) {
      if (!this.metadata.link) {
        this.metadata.link = {};
      }

      this.metadata.link.title = value;
    }
  }, {
    key: "linkUrl",
    get: function get() {
      return this.metadata.link && this.metadata.link.url;
    },
    set: function set(value) {
      if (!this.metadata.link) {
        this.metadata.link = {};
      }

      this.metadata.link.url = value;
    }
  }, {
    key: "isWixUrl",
    get: function get() {
      return this.linkUrl && this.linkUrl.indexOf('wix') === 0;
    }
  }, {
    key: "linkTitleFromUrl",
    get: function get() {
      var regex = /[^/]*\.\w+$/g;
      var regexRes = regex.exec(this.linkUrl);
      var match = regexRes && regexRes[0];
      return match && match.split('.')[0];
    }
  }, {
    key: "unprotectedLinkOpenType",
    get: function get() {
      return utils.get(this, 'metadata.link.target');
    }
  }, {
    key: "linkOpenType",
    get: function get() {
      if (this.metadata.link && !utils.isUndefined(this.metadata.link.target)) {
        return this.unprotectedLinkOpenType;
      } else if (this.metadata.link && !utils.isUndefined(this.metadata.link.targetBlank)) {
        return this.metadata.link.targetBlank ? '_blank' : '_top';
      } else {
        return '_blank';
      }
    },
    set: function set(value) {
      if (!this.metadata.link) {
        this.metadata.link = {};
      }

      this.metadata.link.target = value;
    }
  }, {
    key: "initialLinkObject",
    get: function get() {
      return {
        type: 'none',
        url: undefined,
        text: undefined,
        title: undefined,
        target: '_blank'
      };
    }
  }, {
    key: "isDemo",
    get: function get() {
      return this.metadata.isDemo || this.dto.isDemo || this.metadata.sourceName === 'public' || this.metadata.tags && Array.isArray(this.metadata.tags) && this.metadata.tags.indexOf('_paid') >= 0;
    },
    set: function set(val) {
      this.metadata.isDemo = val;
    }
  }, {
    key: "isText",
    get: function get() {
      return this.type === 'text';
    }
  }, {
    key: "isVideo",
    get: function get() {
      return this.type === 'video';
    }
  }, {
    key: "isVisible",
    get: function get() {
      return this.visibility && this.visibility.visible;
    }
  }, {
    key: "isRendered",
    get: function get() {
      return this.visibility && this.visibility.rendered;
    }
  }, {
    key: "isDimensionless",
    get: function get() {
      return !(this.maxWidth > 1 || this.maxHeight > 1);
    }
  }, {
    key: "isTransparent",
    get: function get() {
      return this.url && (this.url.indexOf('.png') > 0 || this.url.indexOf('.gif') > 0);
    }
  }, {
    key: "directLink",
    get: function get() {
      return this.dto.directLink || '';
    }
  }, {
    key: "directShareLink",
    get: function get() {
      return this.dto.directShareLink || '';
    }
  }]);

  return GalleryItem;
}();

/* harmony default export */ var galleryItem = (galleryItem_GalleryItem);
// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/group.js
function group_createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = group_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function group_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return group_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return group_arrayLikeToArray(o, minLen); }

function group_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function group_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function group_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { group_ownKeys(Object(source), true).forEach(function (key) { group_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { group_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function group_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function group_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function group_createClass(Constructor, protoProps, staticProps) { if (protoProps) group_defineProperties(Constructor.prototype, protoProps); if (staticProps) group_defineProperties(Constructor, staticProps); return Constructor; }



var GROUP_TYPES_BY_RATIOS_V = {
  lll: '1,2h',
  llp: '1,3r',
  lpl: '1,2h',
  pll: '1,2h,3l',
  lpp: '1,2h,3r,3h',
  plp: '1,2h,3l,3r,3h',
  ppl: '1,2h,3l,3h',
  ppp: '1,2h,3l,3r,3h'
};
var GROUP_TYPES_BY_RATIOS_H = {
  lll: '1,2v,3t,3b,3v',
  llp: '1,2v,3t,3v',
  lpl: '1,2v,3t,3b,3v',
  pll: '1,2v,3b,3v',
  lpp: '1,2v,3t',
  plp: '1,2v',
  ppl: '1,3b',
  ppp: '1,2h'
};
var GROUP_SIZES_BY_MAX_SIZE = {
  1: [[1]],
  2: [[1], [1, 2], [2]],
  3: [[1], [1, 2], [1, 2, 3], [2, 3], [3]]
};
var group_Group = /*#__PURE__*/function () {
  function Group(config) {
    var _this = this;

    this.idx = config.idx;
    this.stripIdx = config.stripIdx;
    this.inStripIdx = config.inStripIdx;
    this.top = config.top;
    this.showAllItems = config.showAllItems;
    this.isLastItems = config.isLastItems;
    this.dummyItems = [];
    this.gallerySize = config.gallerySize;
    this.items = config.items.map(function (item) {
      item.Group = _this;
      return item;
    });

    if (config.styleParams) {
      var styleParams = config.styleParams;
      this.oneRow = styleParams.oneRow;
      this.cubeType = styleParams.cubeType;
      this.cubeImages = styleParams.cubeImages;
      this.isVertical = styleParams.isVertical;
      this.minItemSize = styleParams.minItemSize;
      this.collageAmount = styleParams.collageAmount;
      this.collageDensity = styleParams.collageDensity;
      this.groupTypes = styleParams.groupTypes;
      this.rotatingGroupTypes = styleParams.rotatingGroupTypes;
      this.rotatingCropRatios = styleParams.rotatingCropRatios;
      this.chooseBestGroup = styleParams.chooseBestGroup;
      this.layoutsVersion = styleParams.layoutsVersion;
      this.externalInfoHeight = styleParams.externalInfoHeight;
      this.externalInfoWidth = styleParams.externalInfoWidth;
      this.imageMargin = styleParams.imageMargin;
      this.groupSize = styleParams.groupSize;
    }

    this.visible = true;
    this.rendered = true;
    this.required = true; //prepare the group

    var forcedGroupSize = this.items.length; //todo - check if minItem size is really working

    while (!this.isWithinMinItemSize && forcedGroupSize > 0) {
      this.placeItems(forcedGroupSize);
      this.resize();
      forcedGroupSize--;
    }
  }

  var _proto = Group.prototype;

  _proto.resize = function resize() {
    if (this.isVertical) {
      this.resizeToWidth(this.gallerySize);
    } else {
      this.resizeToHeight(this.gallerySize);
    }

    this.setLeft(this.left);
    this.setTop(this.top);
  };

  _proto.safeGetItem = function safeGetItem(idx) {
    if (this.items[idx]) {
      return this.items[idx];
    } else if (this.dummyItems[idx]) {
      return this.dummyItems[idx];
    } else {
      // dummy created from the last item config
      var item = new item_Item(group_objectSpread({}, this.items[this.items.length - 1].config)); // const item = {...(this.items[this.items.length - 1])};
      // item.id += 'dummy';
      // item.idx given to dummy items starting from the last item
      // item.config.idx = last item index (all gallery items, not group items)
      // idx = in group item index
      // this.items = the group's items

      item.idx = item.config.idx + idx - (this.items.length - 1);
      item.type = 'dummy';
      this.dummyItems[idx] = item;
      return item;
    }
  };

  _proto.setCubedHeight = function setCubedHeight(height) {
    var shouldUseFixedHeight = this.cubeImages && this.groupSize === 1 && ['fill', 'fit'].includes(this.cubeType) && this.rotatingGroupTypes.length === 0 && this.rotatingCropRatios.length === 0;
    this.cubedHeight = shouldUseFixedHeight ? height : null;
  };

  _proto.round = function round() {
    //round all sizes to full pixels
    if (this.isLastGroup && !this.oneRow) {
      this.width = this.stripWidth - this.left;
    } else {
      this.width = Math.round(this.width);
    }

    this.height = Math.round(this.height);

    for (var _iterator = group_createForOfIteratorHelperLoose(this.items), _step; !(_step = _iterator()).done;) {
      var item = _step.value;
      item.width = Math.round(item.width);
      item.height = Math.round(item.height);
      item.group = {
        width: this.width,
        height: this.height
      };
    }

    var m = this.imageMargin * 2;

    switch (this.type) {
      default:
      case '1':
        this.safeGetItem(0).width = this.width - m;
        this.safeGetItem(0).height = this.height - m;
        break;

      case '2v':
        this.safeGetItem(0).width = this.safeGetItem(1).width = this.width - m;
        this.safeGetItem(0).height = this.height - this.safeGetItem(1).height - 2 * m;
        break;

      case '2h':
        this.safeGetItem(0).height = this.safeGetItem(1).height = this.height - m;
        this.safeGetItem(0).width = this.width - this.safeGetItem(1).width - 2 * m;
        break;

      case '3t':
        this.safeGetItem(0).width = this.width - m;
        this.safeGetItem(0).height = this.height - this.safeGetItem(1).height - 2 * m;
        this.safeGetItem(1).width = this.width - this.safeGetItem(2).width - 2 * m;
        this.safeGetItem(2).height = this.safeGetItem(1).height;
        break;

      case '3b':
        this.safeGetItem(0).width = this.width - this.safeGetItem(1).width - 2 * m;
        this.safeGetItem(1).height = this.safeGetItem(0).height;
        this.safeGetItem(2).height = this.height - this.safeGetItem(1).height - 2 * m;
        this.safeGetItem(2).width = this.width - m;
        break;

      case '3l':
        this.safeGetItem(1).height = this.height - this.safeGetItem(2).height - 2 * m;
        this.safeGetItem(2).width = this.safeGetItem(1).width;
        this.safeGetItem(0).width = this.width - this.safeGetItem(1).width - 2 * m;
        this.safeGetItem(0).height = this.height - m;
        break;

      case '3r':
        this.safeGetItem(0).height = this.height - this.safeGetItem(1).height - 2 * m;
        this.safeGetItem(1).width = this.safeGetItem(0).width;
        this.safeGetItem(2).width = this.width - this.safeGetItem(1).width - 2 * m;
        this.safeGetItem(2).height = this.height - m;
        break;

      case '3v':
        this.safeGetItem(0).width = this.width - m;
        this.safeGetItem(1).width = this.width - m;
        this.safeGetItem(2).width = this.width - m;
        this.safeGetItem(2).height = this.height - this.safeGetItem(0).height - this.safeGetItem(1).height - 3 * m;
        break;

      case '3h':
        this.safeGetItem(0).height = this.height - m;
        this.safeGetItem(1).height = this.height - m;
        this.safeGetItem(2).height = this.height - m;
        this.safeGetItem(2).width = this.width - this.safeGetItem(0).width - this.safeGetItem(1).width - 3 * m;
        break;
    }
  };

  _proto.getGroupType = function getGroupType(forcedGroupSize) {
    //---------| Override with specifically defined rotating group types (ignores everything else)
    if (this.rotatingGroupTypes) {
      var groupTypesArr = String(this.rotatingGroupTypes).split(',');
      return groupTypesArr[this.idx % groupTypesArr.length]; // } else if (this.isLastItems) {
      //   return this.groupTypes.split(',')[0] || '1';
    } else {
      //isVertical - is the gallery vertical (pinterest style) or horizontal (flickr style)
      //---------| Find the best groupType for each ratios case
      //optional types:
      //  1   => single photo
      //  2v  => 2 photos one above the other
      //  2h  => 2 photos one alongside the other
      //  3b  => 3 photos - one large at the bottom and two small on top, one alongside the other
      //  3t  => 3 photos - one large on top and two small at the bottom, one alongside the other
      //  3l  => 3 photos - one large on the left and two small on the right, one above the other
      //  3r  => 3 photos - one large on the right and two small on the left, one above the other
      //define optional ratios for each type:
      //  1   => all
      //  2v  => lll,llp,ppp     (horizontal only)
      //  2h  => ppp,ppl,lll     (vertical only)
      //  3b  => lll,lpl,pll,ppl (horizontal only)
      //  3t  => lll,lpl,llp,lpp (horizontal only)
      //  3l  => ppp,plp,ppl,pll (vertical only)
      //  3r  => ppp,plp,lpp,llp (vertical only)
      var isV = this.isVertical;
      var optionalTypes; //optional groupTypes (separated by ,). 1 is always optional

      if (this.chooseBestGroup) {
        //map the group to l=landscape and p=portrait
        //create a string to state the images group's type
        var ratios = this.items.map(function (item) {
          return item.orientation.slice(0, 1);
        }).join('');
        optionalTypes = (isV ? GROUP_TYPES_BY_RATIOS_V : GROUP_TYPES_BY_RATIOS_H)[ratios];
      } else if (this.items.length === 3 || forcedGroupSize === 3) {
        optionalTypes = isV ? '1,2h,3l,3r,3h' : '1,2v,3t,3b,3v';
      }

      if (this.items.length === 2 || forcedGroupSize === 2) {
        optionalTypes = isV ? '1,2h' : '1,2v';
      }

      if (this.items.length === 1 || forcedGroupSize === 1) {
        optionalTypes = '1';
      }

      var groupTypes = optionalTypes.length > 0 ? optionalTypes.split(',') : []; //---------| Override with specifically defined group types

      if (this.groupTypes) {
        // let groupTypesArr = union(['1'], this.groupTypes.split(','));
        var _groupTypesArr = this.groupTypes.split(',');

        if (_groupTypesArr.length > 1) {
          groupTypes = groupTypes.filter(function (gt) {
            return _groupTypesArr.indexOf(gt) >= 0;
          });

          if (groupTypes.length === 0) {
            //there is no match between required group types and the optional ones - use
            groupTypes = ['1'];
          }
        } else {
          groupTypes = _groupTypesArr;
        }
      } //---------| Calc collage density


      if (this.layoutsVersion > 1 && this.collageDensity >= 0) {
        //th new calculation of the collage amount
        var collageDensity = this.collageDensity; //use the collage amount to determine the optional groupsize

        var maxGroupType = parseInt(groupTypes[groupTypes.length - 1]);
        var optionalGroupSizes = GROUP_SIZES_BY_MAX_SIZE[maxGroupType];
        var targetGroupSizes = optionalGroupSizes[Math.floor(collageDensity * (optionalGroupSizes.length - 1))]; // seed += ((collageDensity * 1.5) - 0.75) * numOfOptions;

        groupTypes = groupTypes.filter(function (groupType) {
          return targetGroupSizes.indexOf(parseInt(groupType)) >= 0;
        });

        if (groupTypes.length === 0) {
          groupTypes = ['1'];
        }
      }

      var seed = this.calculateRandomSeed(groupTypes.length); //---------| Final group type to render according to:
      // - the number of options
      // - the collageAmount (if 0 - always renders 1 image, if 1 always renders the max amount)
      // - random seed (determined by the hash)

      return groupTypes[seed] || '1';
    }
  };

  _proto.calculateRandomSeed = function calculateRandomSeed(numOfOptions) {
    var seed;

    if (this.isVertical) {
      //vertical galleries random is not relevant (previous group is in another column)
      seed = utils_utils.hashToInt(this.items[0].hash) % numOfOptions;
    } else {
      seed = (this.inStripIdx + this.stripIdx) % numOfOptions;
    }

    if (this.layoutsVersion === 1 && this.collageAmount >= 0) {
      //backwards compatibility
      seed += (this.collageAmount - 0.5) * numOfOptions;
    }

    return Math.round(Math.min(Math.max(0, seed), numOfOptions - 1));
  };

  _proto.placeItems = function placeItems(forcedGroupSize) {
    this.type = this.getGroupType(forcedGroupSize); //---------| Render the images by the groupType

    var items = [];
    var item;
    var w = 0;
    var h = 0;

    switch (this.type) {
      default:
      case '1':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        items.push(item);
        w = item.width;
        h = item.height;
        break;

      case '2v':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(1);
        item.pinToCorner('bottom-left');
        item.resize(w / item.width);
        h += item.height;
        items.push(item);
        break;

      case '2h':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        item.innerOffset = [0, 0];
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(1);
        item.pinToCorner('top-right');
        item.innerOffset = [0, 0];
        item.resize(h / item.height);
        w += item.width;
        items.push(item);
        break;

      case '3b':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(1);
        item.pinToCorner('top-right');
        item.resize(h / item.height);
        w += item.width;
        items.push(item);
        item = this.safeGetItem(2);
        item.pinToCorner('bottom-left');
        item.resize(w / item.width);
        h += item.height;
        items.push(item);
        break;

      case '3t':
        item = this.safeGetItem(1);
        item.pinToCorner('bottom-left');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(2);
        item.pinToCorner('bottom-right');
        item.resize(h / item.height);
        w += item.width;
        items.push(item);
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        item.resize(w / item.width);
        h += item.height;
        items = [item].concat(items);
        break;

      case '3r':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(1);
        item.pinToCorner('bottom-left');
        item.resize(w / item.width);
        h += item.height;
        items.push(item);
        item = this.safeGetItem(2);
        item.pinToCorner('top-right');
        item.resize(h / item.height);
        w += item.width;
        items.push(item);
        break;

      case '3l':
        item = this.safeGetItem(1);
        item.pinToCorner('top-right');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(2);
        item.pinToCorner('bottom-right');
        item.resize(w / item.width);
        h += item.height;
        items.push(item);
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        item.resize(h / item.height);
        w += item.width;
        items = [item].concat(items);
        break;

      case '3v':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        item.setPosition('relative');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(2);
        item.pinToCorner('bottom-left');
        item.setPosition('relative');
        item.resize(w / item.width);
        h += item.height;
        items.push(item); //the middle item must be last to position it in the middle (h must be full height)

        item = this.safeGetItem(1);
        item.setPosition('relative');
        item.resize(w / item.width);
        h += item.height;
        item.pinToCorner('top', items[0]);
        items = [items[0], item, items[1]];
        break;

      case '3h':
        item = this.safeGetItem(0);
        item.pinToCorner('top-left');
        item.setPosition('relative');
        items.push(item);
        w = item.width;
        h = item.height;
        item = this.safeGetItem(2);
        item.pinToCorner('top-right');
        item.setPosition('relative');
        item.resize(h / item.height);
        w += item.width;
        items.push(item); //the middle item must be last to position it in the middle (w must be full width)

        item = this.safeGetItem(1);
        item.setPosition('relative');
        item.resize(h / item.height);
        w += item.width;
        item.pinToCorner('left', items[0]);
        items = [items[0], item, items[1]];
        break;
    }

    this.width = w;
    this.height = h;
    this.items = items;
    this.placed = true;
  };

  _proto.resizeToHeight = function resizeToHeight(height) {
    this.height = height;
    this.width = this.getWidthByHeight(height);
    this.resizeItems();
  };

  _proto.resizeToWidth = function resizeToWidth(width) {
    this.width = width;
    this.height = this.getHeightByWidth(width);
    this.resizeItems();
  };

  _proto.resizeItems = function resizeItems() {
    var _this2 = this;

    var items = ['3b', '3r'].indexOf(this.type) >= 0 ? this.items.slice().reverse() : this.items;
    items.forEach(function (item, i) {
      item.resize(_this2.getItemDimensions(items, i));
      item.group = {
        top: _this2.top,
        left: _this2.left,
        width: _this2.width,
        height: _this2.height
      };
      item.groupOffset = {
        bottom: _this2.top + _this2.height,
        right: _this2.left + _this2.width
      };
    });
  };

  _proto.getItemDimensions = function getItemDimensions(items, idx) {
    var m = this.imageMargin * 2;

    switch (this.type) {
      default:
      case '1':
      case '2v':
      case '3v':
        {
          var w = this.width - m;
          return {
            width: w
          };
        }

      case '2h':
      case '3h':
        {
          var h = this.height - m;
          return {
            height: h
          };
        }

      case '3t':
      case '3b':
        if (idx === 0) {
          var _w = this.width - m;

          return {
            width: _w
          };
        } else {
          var _h = this.height - items[0].height - 2 * m;

          return {
            height: _h
          };
        }

      case '3r':
      case '3l':
        if (idx === 0) {
          var _h2 = this.height - m;

          return {
            height: _h2
          };
        } else {
          var _w2 = this.width - items[0].width - 2 * m;

          return {
            width: _w2
          };
        }

    }
  };

  _proto.getHeightByWidth = function getHeightByWidth(W) {
    var Rg = 1;
    var Rm = 1;
    var M = this.imageMargin * 2;
    var R = this.items.map(function (item) {
      return item.width / item.height;
    });

    switch (this.type) {
      // ---------------------------------
      // GENERAL FORMULA:
      // ---------------------------------
      // Rg = Group ratio [layout specific calculation]
      // M = margin space between items ( = margin around item * 2)
      // Rm = Margin ratio [layout specific calculation]
      // ---------------------------------
      // | H = W * R + M * Rm |
      // ---------------------------------
      //    const H = W * Rg + M * (Vi - Hi * Rg);
      default:
      case '1':
        Rg = 1 / R[0];
        Rm = 1 - Rg;
        break;

      case '2h':
        Rg = 1 / (R[0] + R[1]);
        Rm = 1 - 2 * Rg;
        break;

      case '2v':
        Rg = 1 / R[0] + 1 / R[1];
        Rm = 2 - Rg;
        break;

      case '3h':
        Rg = 1 / (R[0] + R[1] + R[2]);
        Rm = 1 - 3 * Rg;
        break;

      case '3v':
        Rg = 1 / R[0] + 1 / R[1] + 1 / R[2];
        Rm = 3 - Rg;
        break;

      case '3t':
        Rg = 1 / (R[2] + R[1]) + 1 / R[0];
        Rm = 2 - 2 / (R[2] + R[1]) + 1 / R[0];
        break;

      case '3b':
        Rg = 1 / (R[0] + R[1]) + 1 / R[2];
        Rm = 2 - 2 / (R[0] + R[1]) + 1 / R[2];
        break;

      case '3l':
        Rg = (R[1] + R[2]) / (R[0] * R[1] + R[1] * R[2] + R[0] * R[2]);
        Rm = 2 - Rg * (2 + R[0]);
        break;

      case '3r':
        Rg = (R[0] + R[1]) / (R[0] * R[1] + R[1] * R[2] + R[0] * R[2]);
        Rm = 2 - Rg * (2 + R[2]);
        break;
    }

    var H = W * Rg + M * Rm;
    return H;
  };

  _proto.getWidthByHeight = function getWidthByHeight(H) {
    var Rg = 1;
    var Rm = 1;
    var M = this.imageMargin * 2;
    var R = this.items.map(function (item) {
      return item.width / item.height;
    });

    switch (this.type) {
      // ---------------------------------
      // GENERAL FORMULA:
      // ---------------------------------
      // Rh = Group ratio [layout specific calculation]
      // M = margin space between items ( = margin around item * 2)
      // Rm = Margin ratio [layout specific calculation]
      // ---------------------------------
      // | W = H * Rg + M * Rm |
      // ---------------------------------
      default:
      case '1':
        Rg = R[0];
        Rm = 1 - Rg;
        break;

      case '2h':
        Rg = R[0] + R[1];
        Rm = 2 - Rg;
        break;

      case '2v':
        Rg = 1 / (1 / R[0] + 1 / R[1]);
        Rm = 1 - 2 * Rg;
        break;

      case '3h':
        Rg = R[0] + R[1] + R[2];
        Rm = 3 - Rg;
        break;

      case '3v':
        Rg = 1 / (1 / R[0] + 1 / R[1] + 1 / R[2]);
        Rm = 1 - 3 * Rg;
        break;

      case '3t':
        Rg = 1 / (1 / (R[2] + R[1]) + 1 / R[0]);
        Rm = (2 / (R[2] + R[1]) + 1 / R[0] - 2) * Rg;
        break;

      case '3b':
        Rg = 1 / (1 / (R[0] + R[1]) + 1 / R[2]);
        Rm = (2 / (R[0] + R[1]) + 1 / R[2] - 2) * Rg;
        break;

      case '3l':
        Rg = (R[0] * R[1] + R[1] * R[2] + R[0] * R[2]) / (R[1] + R[2]);
        Rm = 2 + R[0] - 2 * Rg;
        break;

      case '3r':
        Rg = (R[0] * R[1] + R[1] * R[2] + R[0] * R[2]) / (R[0] + R[1]);
        Rm = 2 + R[2] - 2 * Rg;
        break;
    }

    var W = H * Rg + M * Rm;
    return W;
  };

  _proto.setTop = function setTop(top) {
    this.top = top || 0;

    for (var _iterator2 = group_createForOfIteratorHelperLoose(this.items), _step2; !(_step2 = _iterator2()).done;) {
      var item = _step2.value;
      item.groupOffset = {
        top: top,
        bottom: top + this.height
      };
    }
  };

  _proto.setLeft = function setLeft(left) {
    this.left = left || 0;

    for (var _iterator3 = group_createForOfIteratorHelperLoose(this.items), _step3; !(_step3 = _iterator3()).done;) {
      var item = _step3.value;
      item.groupOffset = {
        left: left,
        right: left + this.width
      };
    }
  };

  _proto.calcVisibilities = function calcVisibilities(bounds) {
    if (bounds === true || this.showAllItems === true) {
      this.onscreen = this.visible = this.rendered = this.required = true;
    } else if (this.oneRow) {
      this.onscreen = this.right >= bounds.onscreenTop && this.left <= bounds.onscreenBottom;
      this.visible = this.right >= bounds.visibleTop && this.left <= bounds.visibleBottom;
      this.rendered = this.right >= bounds.renderedTop && this.left <= bounds.renderedBottom;
      this.required = this.right >= bounds.requiredTop && this.left <= bounds.requiredBottom;
    } else {
      this.onscreen = this.bottom >= bounds.onscreenTop && this.top <= bounds.onscreenBottom;
      this.visible = this.bottom >= bounds.visibleTop && this.top <= bounds.visibleBottom;
      this.rendered = this.bottom >= bounds.renderedTop && this.top <= bounds.renderedBottom;
      this.required = this.bottom >= bounds.requiredTop && this.top <= bounds.requiredBottom;
    }

    for (var i = 0; i < this.items.length; i++) {
      this.items[i].visibility = {
        onscreen: this.onscreen,
        visible: this.visible,
        rendered: this.rendered,
        required: this.required
      };
    }
  };

  group_createClass(Group, [{
    key: "id",
    get: function get() {
      return 'g' + this.idx + '_' + (this.items[0] || {}).id;
    }
  }, {
    key: "ratio",
    get: function get() {
      var w = this.width;
      var h = this.height;
      return w / h;
    }
  }, {
    key: "height",
    get: function get() {
      return this.cubedHeight || this._height;
    },
    set: function set(h) {
      this._height = h;
    }
  }, {
    key: "totalHeight",
    get: function get() {
      return this.height + this.infoHeight;
    }
  }, {
    key: "infoHeight",
    get: function get() {
      return this.externalInfoHeight || 0;
    }
  }, {
    key: "infoWidth",
    get: function get() {
      return this.Column ? this.Column.infoWidth : this.externalInfoWidth || 0;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.top + this.height;
    }
  }, {
    key: "right",
    get: function get() {
      return this.left + this.width;
    }
  }, {
    key: "items",
    set: function set(items) {
      this._items = items;
    },
    get: function get() {
      return this._items;
    }
  }, {
    key: "realItems",
    get: function get() {
      return this._items.filter(function (item) {
        return item.type !== 'dummy';
      });
    }
  }, {
    key: "isWithinMinItemSize",
    get: function get() {
      var _this3 = this;

      if (this.items.length === 0 || !this.placed) {
        return false;
      }

      if (this.items.length === 1) {
        return true;
      } else {
        return this.items.reduce(function (i, item) {
          var isInSize = Math.min(item.width, item.height) >= _this3.minItemSize;

          return i && isInSize;
        }, true);
      }
    }
  }, {
    key: "scheme",
    get: function get() {
      return {
        id: this.id,
        idx: this.idx,
        stripIdx: this.stripIdx,
        inStripIdx: this.inStripIdx,
        isLastGroup: this.isLastGroup,
        items: this.items.map(function (item) {
          return item.scheme;
        }),
        type: this.type,
        width: this.width,
        height: this.height,
        infoHeight: this.infoHeight,
        infoWidth: this.infoWidth,
        ratio: this.ratio,
        top: this.top,
        left: this.left,
        right: this.right,
        bottom: this.bottom,
        visible: this.visible,
        rendered: this.rendered,
        required: this.required
      };
    }
  }]);

  return Group;
}();
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/group/galleryGroup.js
function galleryGroup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function galleryGroup_createClass(Constructor, protoProps, staticProps) { if (protoProps) galleryGroup_defineProperties(Constructor.prototype, protoProps); if (staticProps) galleryGroup_defineProperties(Constructor, staticProps); return Constructor; }

////// <reference path="../../reference.ts" />



var galleryGroup_GalleryGroup = /*#__PURE__*/function () {
  function GalleryGroup(config) {
    this.uniqueId = utils.generateUUID();
    this.isGalleryGroup = true;

    if (config.dto && config.dto.dto) {
      config.dto = config.dto.dto; //defence patch due to mis-use of item-core

      if (utils.isDev()) {
        console.warn('Item core is created with already existing item core');
      }
    }

    this.dto = Object.assign({}, config.dto);

    if (config.scheme) {
      this.processScheme(config.scheme);
    } else {
      this.processScheme(new group_Group({
        dto: config.dto
      }).scheme);
    }

    if (config.items) {
      this.items = config.items;
    } else {
      console.warn('Pro Gallery created Gallery Group without items', config);
    }
  }

  var _proto = GalleryGroup.prototype;

  _proto.processScheme = function processScheme(scheme) {
    this.id = scheme.id;
    this.idx = scheme.idx;
    this.width = scheme.width;
    this.height = scheme.height;
    this.totalHeight = scheme.totalHeight;
    this.ratio = scheme.ratio;
    this.top = scheme.top;
    this.left = scheme.left;
    this.right = scheme.right;
    this.bottom = scheme.bottom;
    this.visible = scheme.visible;
    this.rendered = scheme.rendered;
    this.required = scheme.required;
  };

  _proto.renderProps = function renderProps(galleryConfig) {
    return {
      className: 'group',
      id: this.id,
      idx: this.idx,
      key: this.key,
      type: this.type,
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      width: this.width,
      height: this.height,
      totalHeight: this.totalHeight,
      items: this.items,
      visible: this.visible,
      rendered: this.rendered,
      required: this.required,
      galleryConfig: galleryConfig
    };
  };

  galleryGroup_createClass(GalleryGroup, [{
    key: "key",
    get: function get() {
      return 'group_' + this.id;
    }
  }]);

  return GalleryGroup;
}();

/* harmony default export */ var galleryGroup = (galleryGroup_GalleryGroup);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/itemsHelper.js
function itemsHelper_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function itemsHelper_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { itemsHelper_ownKeys(Object(source), true).forEach(function (key) { itemsHelper_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { itemsHelper_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function itemsHelper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var itemsHelper_ItemsHelper = /*#__PURE__*/function () {
  function ItemsHelper() {}

  ItemsHelper.convertDtoToLayoutItem = function convertDtoToLayoutItem(dto) {
    var isLayoutItem = !!(dto.id && dto.width > 0 && dto.height > 0);

    if (isLayoutItem) {
      return dto;
    } else {
      var dtoMetadata = dto.metadata || dto.metaData;
      var metadata = typeof dtoMetadata === 'object' ? dtoMetadata : utils.parseStringObject(dtoMetadata) || {};
      return itemsHelper_objectSpread({
        id: dto.itemId || dto.photoId,
        width: metadata.width,
        height: metadata.height
      }, dto);
    }
  };

  ItemsHelper.convertToGalleryItems = function convertToGalleryItems(galleryStructure, itemConfig, existingItems) {
    if (itemConfig === void 0) {
      itemConfig = {};
    }

    if (existingItems === void 0) {
      existingItems = [];
    }

    galleryStructure.galleryItems = [];

    for (var c = 0; c < galleryStructure.columns.length; c++) {
      var column = galleryStructure.columns[c];
      column.galleryGroups = [];
      var groups = column.groups || column;

      for (var g = 0; g < groups.length; g++) {
        var group = groups[g];
        var groupItems = [];

        for (var i = 0; i < group.items.length; i++) {
          var item = group.items[i];

          var _itemConfig = itemsHelper_objectSpread({
            scheme: item,
            dto: item.dto
          }, itemConfig);

          var existingItem = existingItems[item.idx];
          var newItem = void 0;

          if (existingItem && existingItem.id && existingItem.id === item.id) {
            newItem = existingItem;
            newItem.update(_itemConfig);
          } else {
            newItem = new galleryItem(_itemConfig);
          }

          groupItems[i] = newItem;
          galleryStructure.galleryItems[item.idx] = groupItems[i];
        }

        column.galleryGroups[g] = new galleryGroup({
          scheme: group,
          dto: group.dto,
          items: groupItems
        });
      }
    }

    return galleryStructure;
  };

  ItemsHelper.convertExistingStructureToGalleryItems = function convertExistingStructureToGalleryItems(existingStructure, galleryStructure, itemConfig) {
    if (itemConfig === void 0) {
      itemConfig = {};
    }

    // console.log('convertToGalleryItems', existingStructure.galleryItems);
    // console.count('convertToGalleryItems');
    if (utils.isVerbose()) {
      console.time('convertToGalleryItems');
    }

    if (!existingStructure.galleryItems) {
      existingStructure.galleryItems = [];
    } // remove last group so it will be rebuilt in case of dummy item


    var lastColumn = existingStructure.columns.slice(-1)[0];
    var lastGroup = lastColumn.galleryGroups.pop();
    lastGroup && existingStructure.galleryItems.splice(-lastGroup.items.length);

    for (var c = 0; c < galleryStructure.columns.length; c++) {
      var column = galleryStructure.columns[c];
      var existingColumn = existingStructure.columns[c] || column;

      if (!existingColumn.galleryGroups) {
        existingColumn.galleryGroups = [];
      }

      var groups = column.groups || column;

      for (var g = 0; g < groups.length; g++) {
        var group = groups[g];
        var groupItems = [];

        for (var i = 0; i < group.items.length; i++) {
          var item = group.items[i];

          if (!existingStructure.galleryItems[item.idx]) {
            // console.count(`convertToGalleryItems - item [${item.idx}]`);
            groupItems[i] = new galleryItem(Object.assign({
              scheme: item,
              dto: item.dto
            }, itemConfig));
            existingStructure.galleryItems[item.idx] = groupItems[i];
          } else {
            existingStructure.galleryItems[item.idx].processScheme(item);
          }
        }

        if (!existingColumn.galleryGroups[g]) {
          // console.count(`convertToGalleryItems - group [${g}]`);
          existingColumn.galleryGroups[g] = new galleryGroup({
            scheme: group,
            dto: group.dto,
            items: groupItems
          });
        } else {
          existingColumn.galleryGroups[g].processScheme(group);
        }
      }

      column.galleryGroups = existingColumn.galleryGroups;
    }

    galleryStructure.galleryItems = existingStructure.galleryItems;

    if (utils.isVerbose()) {
      console.timeEnd('convertToGalleryItems');
    }

    return galleryStructure;
  };

  return ItemsHelper;
}();
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/scrollHelper.js

function scrollToItemImp(scrollParams) {
  var to, from;
  var _scrollParams$scrollM = scrollParams.scrollMarginCorrection,
      scrollMarginCorrection = _scrollParams$scrollM === void 0 ? 0 : _scrollParams$scrollM,
      durationInMS = scrollParams.durationInMS,
      horizontalElement = scrollParams.horizontalElement,
      scrollingElement = scrollParams.scrollingElement,
      isRTL = scrollParams.isRTL,
      oneRow = scrollParams.oneRow,
      galleryWidth = scrollParams.galleryWidth,
      galleryHeight = scrollParams.galleryHeight,
      totalWidth = scrollParams.totalWidth,
      top = scrollParams.top,
      items = scrollParams.items,
      itemIdx = scrollParams.itemIdx,
      fixedScroll = scrollParams.fixedScroll; //default = scroll by half the container size

  if (oneRow) {
    from = horizontalElement.scrollLeft;

    if (isRTL) {
      to = from - itemIdx * galleryWidth / 2;
    } else {
      to = from + itemIdx * galleryWidth / 2;
    } // console.log('[RTL SCROLL] scrollToItemImp: ', from, to);

  } else {
    from = top;
    to = top + itemIdx * galleryHeight / 2;
  }

  if (fixedScroll !== true) {
    //scroll to specific item
    if (utils.isVerbose()) {
      console.log('Scrolling to items #' + itemIdx);
    }

    var item = items.find(function (itm) {
      return itm.idx === itemIdx;
    });
    to = oneRow ? utils.get(item, 'offset.left') : utils.get(item, 'offset.top');

    if (item && isRTL) {
      to += item.width;
    }

    if (utils.isVerbose()) {
      console.log('Scrolling to position ' + to, item);
    }

    if (!(to >= 0)) {
      utils.isVerbose() && console.warn('Position not found, not scrolling');
      return new Promise(function (res) {
        return res();
      });
    }

    if (oneRow) {
      //set scroll to place the item in the middle of the component
      var diff = (galleryWidth - item.width) / 2;

      if (diff > 0) {
        if (isRTL) {
          to += diff;
        } else {
          to -= diff;
        }
      }

      if (isRTL) {
        to = totalWidth - to;
      }

      to = Math.max(0, to);
      to = Math.min(to, totalWidth - galleryWidth + scrollMarginCorrection);

      if (utils.isVerbose()) {
        console.log('Scrolling to new position ' + to, this);
      }
    }
  }

  if (oneRow) {
    return horizontalCssScrollTo(horizontalElement, Math.round(from), Math.round(to), durationInMS, isRTL, true);
  } else {
    return new Promise(function (resolve) {
      scrollingElement.vertical().scrollTo(0, to);
      resolve(to);
    });
  }
}
function scrollToGroupImp(scrollParams) {
  var to, from;
  var _scrollParams$scrollM2 = scrollParams.scrollMarginCorrection,
      scrollMarginCorrection = _scrollParams$scrollM2 === void 0 ? 0 : _scrollParams$scrollM2,
      durationInMS = scrollParams.durationInMS,
      horizontalElement = scrollParams.horizontalElement,
      scrollingElement = scrollParams.scrollingElement,
      isRTL = scrollParams.isRTL,
      oneRow = scrollParams.oneRow,
      galleryWidth = scrollParams.galleryWidth,
      galleryHeight = scrollParams.galleryHeight,
      totalWidth = scrollParams.totalWidth,
      top = scrollParams.top,
      groups = scrollParams.groups,
      groupIdx = scrollParams.groupIdx,
      fixedScroll = scrollParams.fixedScroll; //default = scroll by half the container size

  if (oneRow) {
    from = horizontalElement.scrollLeft;

    if (isRTL) {
      to = from - groupIdx * galleryWidth / 2;
    } else {
      to = from + groupIdx * galleryWidth / 2;
    } // console.log('[RTL SCROLL] scrollTogroupImp: ', from, to);

  } else {
    from = top;
    to = top + groupIdx * galleryHeight / 2;
  }

  if (fixedScroll !== true) {
    //scroll to specific group
    if (utils.isVerbose()) {
      console.log('Scrolling to groups #' + groupIdx);
    }

    var group = groups.find(function (grp) {
      return grp.idx === groupIdx;
    });
    to = oneRow ? utils.get(group, 'left') : utils.get(group, 'top');

    if (group && isRTL) {
      to += group.width;
    }

    if (utils.isVerbose()) {
      console.log('Scrolling to position ' + to, group);
    }

    if (!(to >= 0)) {
      utils.isVerbose() && console.warn('Position not found, not scrolling');
      return new Promise(function (res) {
        return res();
      });
    }

    if (oneRow) {
      //set scroll to place the group in the middle of the component
      var diff = (galleryWidth - group.width) / 2;

      if (diff > 0) {
        if (isRTL) {
          to += diff;
        } else {
          to -= diff;
        }
      }

      if (isRTL) {
        to = totalWidth - to;
      }

      to = Math.max(0, to);
      to = Math.min(to, totalWidth - galleryWidth + scrollMarginCorrection);

      if (utils.isVerbose()) {
        console.log('Scrolling to new position ' + to, this);
      }
    }
  }

  if (oneRow) {
    return horizontalCssScrollTo(horizontalElement, Math.round(from), Math.round(to), durationInMS, isRTL, true);
  } else {
    return new Promise(function (resolve) {
      scrollingElement.vertical().scrollTo(0, to);
      resolve(to);
    });
  }
} // ----- rendererd / visible ----- //

function getDistanceFromScreen(_ref) {
  var offset = _ref.offset,
      scroll = _ref.scroll,
      itemStart = _ref.itemStart,
      itemEnd = _ref.itemEnd,
      screenSize = _ref.screenSize;
  var before = scroll - offset - itemEnd;
  var after = offset + itemStart - screenSize - scroll;
  return {
    before: before,
    after: after
  };
}

function isWithinPaddingVertically(_ref2) {
  var target = _ref2.target,
      scrollBase = _ref2.scrollBase,
      top = _ref2.top,
      bottom = _ref2.bottom,
      screenHeight = _ref2.screenHeight,
      padding = _ref2.padding;
  var res = getDistanceFromScreen({
    offset: scrollBase || 0,
    scroll: target.scrollY,
    itemStart: top,
    itemEnd: bottom,
    screenSize: screenHeight
  });
  return res.before < padding && res.after < padding;
}

function isWithinPaddingHorizontally(_ref3) {
  var target = _ref3.target,
      left = _ref3.left,
      right = _ref3.right,
      screenWidth = _ref3.screenWidth,
      padding = _ref3.padding;
  var res = getDistanceFromScreen({
    offset: 0,
    scroll: target.scrollLeft,
    itemStart: left,
    itemEnd: right,
    screenSize: screenWidth
  });
  return res.before < padding && res.after < padding;
}

function setVerticalVisibility(_ref4) {
  var target = _ref4.target,
      props = _ref4.props,
      screenSize = _ref4.screenSize,
      padding = _ref4.padding,
      callback = _ref4.callback;
  var offset = props.offset,
      style = props.style;
  var bottom = offset.top + style.height;
  var scrollBase = props.container.scrollBase;
  callback({
    playVertically: isWithinPaddingVertically({
      target: target,
      scrollBase: scrollBase,
      top: offset.top,
      bottom: bottom,
      screenHeight: screenSize.height,
      padding: padding.playVertical
    }),
    visibleVertically: isWithinPaddingVertically({
      target: target,
      scrollBase: scrollBase,
      top: offset.top,
      bottom: bottom,
      screenHeight: screenSize.height,
      padding: padding.visibleVertical
    }),
    renderedVertically: isWithinPaddingVertically({
      target: target,
      scrollBase: scrollBase,
      top: offset.top,
      bottom: bottom,
      screenHeight: screenSize.height,
      padding: padding.renderedVertical
    })
  });
}

function setHorizontalVisibility(_ref5) {
  var target = _ref5.target,
      props = _ref5.props,
      screenSize = _ref5.screenSize,
      padding = _ref5.padding,
      callback = _ref5.callback;
  var offset = props.offset,
      style = props.style;
  var right = offset.left + style.width;
  callback({
    playHorizontally: isWithinPaddingHorizontally({
      target: target,
      left: offset.left,
      right: right,
      screenWidth: screenSize.width,
      padding: padding.playHorizontal
    }),
    visibleHorizontally: isWithinPaddingHorizontally({
      target: target,
      left: offset.left,
      right: right,
      screenWidth: screenSize.width,
      padding: padding.visibleHorizontal
    }),
    renderedHorizontally: isWithinPaddingHorizontally({
      target: target,
      left: offset.left,
      right: right,
      screenWidth: screenSize.width,
      padding: padding.renderedHorizontal
    })
  });
}

function setInitialVisibility(_ref6) {
  var props = _ref6.props,
      screenSize = _ref6.screenSize,
      padding = _ref6.padding,
      callback = _ref6.callback;
  var scrollBase = props.container.scrollBase;
  setVerticalVisibility({
    target: {
      scrollY: props.scroll.scrollY || 0,
      offsetTop: scrollBase || 0
    },
    props: props,
    screenSize: screenSize,
    padding: padding,
    callback: callback
  });
  setHorizontalVisibility({
    target: {
      scrollLeft: props.scroll.scrollLeft || 0
    },
    props: props,
    screenSize: screenSize,
    padding: padding,
    callback: callback
  });
}

function horizontalCssScrollTo(scroller, from, to, duration, isRTL) {
  var change = to - from;
  var scrollerInner = scroller.firstChild;
  scroller.setAttribute('data-scrolling', 'true');
  Object.assign(scroller.style, {
    'scroll-snap-type': 'none'
  });
  Object.assign(scrollerInner.style, {
    transition: "margin " + duration + "ms linear",
    '-webkit-transition': "margin " + duration + "ms linear"
  }, isRTL ? {
    marginRight: change + "px"
  } : {
    marginLeft: -1 * change + "px"
  });
  return new Promise(function (resolve) {
    setTimeout(function () {
      Object.assign(scrollerInner.style, {
        transition: "none",
        '-webkit-transition': "none"
      }, isRTL ? {
        marginRight: 0
      } : {
        marginLeft: 0
      });
      scroller.style.removeProperty('scroll-snap-type');
      scroller.scrollLeft = to;
      scroller.setAttribute('data-scrolling', '');
      resolve(to);
    }, duration);
  });
}


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryScrollIndicator.js
function galleryScrollIndicator_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






var galleryScrollIndicator_ScrollIndicator = /*#__PURE__*/function (_GalleryComponent) {
  galleryScrollIndicator_inheritsLoose(ScrollIndicator, _GalleryComponent);

  function ScrollIndicator(props) {
    var _this;

    _this = _GalleryComponent.call(this) || this;
    _this.state = {
      scrollTop: 0,
      scrollLeft: 0
    };
    _this.debouncedOnScroll = utils.debounce(props.onScroll, 50);
    return _this;
  }

  var _proto = ScrollIndicator.prototype;

  _proto.removeScrollListener = function removeScrollListener() {
    if (this.scrollEventListenerSet) {
      var scrollingElement = this.props.scrollingElement;

      try {
        scrollingElement.vertical().removeEventListener('scroll', this.onVerticalScroll);
      } catch (e) {//
      }

      try {
        var oneRow = this.props.oneRow;

        if (oneRow) {
          scrollingElement.horizontal().removeEventListener('scroll', this.onHorizontalScroll);
        }
      } catch (e) {//
      }

      this.scrollEventListenerSet = false;
    }
  };

  _proto.initScrollListener = function initScrollListener() {
    var _this2 = this;

    if (this.scrollEventListenerSet) {
      this.removeScrollListener();
    }

    this.scrollEventListenerSet = true;
    var oneRow = this.props.oneRow;
    var scrollingElement = this.props.scrollingElement; //Horizontal Scroll

    this.onHorizontalScroll = function (e) {
      var target = e.currentTarget || e.target || e;
      var top = target && (target.scrollY || target.scrollTop || target.y);
      var left = target && (target.scrollX || target.scrollLeft || target.x);

      if (_this2.props.isRTL) {
        left = _this2.props.totalWidth - left;
      }

      ; // console.log('[RTL SCROLL] onHorizontalScroll: ', left);

      if (left >= 0) {
        if (oneRow) {
          _this2.setState({
            scrollTop: left,
            //todo use both scrollTop and scrollLeft
            scrollLeft: left
          });

          _this2.props.getMoreItemsIfNeeded(left);

          _this2.props.enableScrollPreload();

          _this2.debouncedOnScroll({
            top: top,
            left: left
          });
        }
      }
    };

    try {
      scrollingElement.horizontal().addEventListener('scroll', this.onHorizontalScroll);
    } catch (e) {} //
    //Vertical Scroll


    this.onVerticalScroll = function (e) {
      var target = e.currentTarget || e.target || e;
      var top = target && (target.scrollY || target.scrollTop || target.y);
      var left = target && (target.scrollX || target.scrollLeft || target.x);

      if (_this2.props.isRTL) {
        left = _this2.props.totalWidth - left;
      }

      ; // console.log('[RTL SCROLL] onVerticalScroll: ', left);

      if (top >= 0) {
        if (!oneRow) {
          _this2.setState({
            scrollTop: top
          });

          _this2.props.getMoreItemsIfNeeded(top);

          _this2.props.enableScrollPreload();

          _this2.debouncedOnScroll({
            top: top,
            left: left
          });
        }
      }
    };

    try {
      scrollingElement.vertical().addEventListener('scroll', this.onVerticalScroll);
    } catch (e) {//
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeScrollListener();
  };

  _proto.componentDidMount = function componentDidMount() {
    this.initScrollListener();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var didChange = false;

    for (var _i = 0, _arr = ['domId', 'oneRow', 'isRTL', 'totalWidth', 'scrollBase']; _i < _arr.length; _i++) {
      var prop = _arr[_i];

      if (nextProps[prop] !== this.props[prop]) {
        didChange = true;
        break;
      }
    }

    if (didChange) {
      this.initScrollListener();
    }
  };

  _proto.render = function render() {
    var verticalScrollBase = !this.props.oneRow && this.props.scrollBase > 0 ? this.props.scrollBase : 0;
    var scrollTopWithoutBase = this.state.scrollTop - verticalScrollBase;
    var domId = this.props.domId;
    return /*#__PURE__*/react_default.a.createElement("div", {
      key: "css-scroll-indicator",
      "data-hook": "css-scroll-indicator",
      "data-scroll-base": verticalScrollBase,
      "data-scroll-top": this.state.scrollTop,
      className: cssScrollHelper.calcScrollClasses(domId, scrollTopWithoutBase),
      style: {
        display: 'none'
      }
    });
  };

  return ScrollIndicator;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/strip.js
function strip_createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = strip_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function strip_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return strip_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return strip_arrayLikeToArray(o, minLen); }

function strip_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function strip_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function strip_createClass(Constructor, protoProps, staticProps) { if (protoProps) strip_defineProperties(Constructor.prototype, protoProps); if (staticProps) strip_defineProperties(Constructor, staticProps); return Constructor; }

var Strip = /*#__PURE__*/function () {
  function Strip(config) {
    this.ratio = 0;
    this.groups = [];
    this.width = 0;
    this.height = 0;
    this.isFullWidth = true;
    this.idx = config.idx;
    this.groupsPerStrip = config.groupsPerStrip;
    this.oneRow = config.oneRow;
    this.gallerySize = config.gallerySize;
    this.container = config.container;
  }

  var _proto = Strip.prototype;

  _proto.addGroup = function addGroup(group) {
    if (this.hasGroups) {
      this.lastGroup.isLastGroup = false;
    }

    this.groups.push(group);
    group.stripIdx = this.idx;
    group.Strip = this;
    this.lastGroup.isLastGroup = true;
    this.lastGroup.stripWidth = this.height * this.ratio;
  };

  _proto.markAsIncomplete = function markAsIncomplete() {
    //prevent from the last group to be streched
    this.isFullWidth = false;
    this.lastGroup.isLastGroup = false;
  };

  _proto.canRemainIncomplete = function canRemainIncomplete() {
    return this.gallerySize * 1.5 < this.height;
  };

  _proto.setWidth = function setWidth(width) {
    this.width = width;

    if (this.hasGroups) {
      this.lastGroup.stripWidth = width;
    }
  };

  _proto.resizeToHeight = function resizeToHeight(height) {
    this.height = height;
    var left = 0;
    var remainder = 0;

    for (var _iterator = strip_createForOfIteratorHelperLoose(this.groups), _step; !(_step = _iterator()).done;) {
      var group = _step.value;
      group.setLeft(left); // group.left = (left);

      group.width += remainder; //add the remainder from the last group round

      group.resizeToHeight(height);
      remainder = group.width;
      group.round();
      remainder -= group.width;
      left += group.width;
    }
  };

  _proto.isFull = function isFull(newGroup, isLastImage) {
    if (!this.hasGroups) {
      return false;
    }

    var groupsPerStrip = this.groupsPerStrip,
        oneRow = this.oneRow,
        gallerySize = this.gallerySize;

    if (groupsPerStrip > 0) {
      return this.groups.length >= groupsPerStrip;
    }

    var galleryWidth = this.container.galleryWidth;
    var isStripSmallEnough;

    if (oneRow) {
      isStripSmallEnough = false; //onerow layout is one long strip
    } else {
      var withNewGroup = galleryWidth / (this.ratio + newGroup.ratio) - gallerySize; //start a new strip BEFORE adding the current group

      var withoutNewGroup = galleryWidth / this.ratio - gallerySize; //start a new strip AFTER adding the current group

      if (isNaN(withNewGroup) || isNaN(withoutNewGroup)) {
        isStripSmallEnough = false;
      } else if (withoutNewGroup < 0) {
        //the strip is already too small
        isStripSmallEnough = true;
      } else if (withNewGroup < 0) {
        //adding the new group makes is small enough
        // check if adding the new group makes the strip TOO small
        //so - without the new group, the strip is larger than the required size - but adding the new group might make it too small
        isStripSmallEnough = Math.abs(withoutNewGroup) < Math.abs(withNewGroup);
      } else {
        isStripSmallEnough = false;
      }

      if (isStripSmallEnough && isLastImage) {
        //if it is the last image - prefer adding it to the last strip rather putting it on a new strip
        isStripSmallEnough = Number(Math.abs(withoutNewGroup)) < Math.abs(withNewGroup);
      }
    }

    return isStripSmallEnough;
  };

  strip_createClass(Strip, [{
    key: "hasGroups",
    get: function get() {
      return this.groups.length > 0;
    }
  }, {
    key: "lastGroup",
    get: function get() {
      return this.groups[this.groups.length - 1];
    }
  }, {
    key: "scheme",
    get: function get() {
      return {
        idx: this.idx,
        groups: this.groups.map(function (group) {
          return group.scheme;
        }),
        width: this.width,
        height: this.height,
        ratio: this.ratio,
        isFullWidth: this.isFullWidth
      };
    }
  }]);

  return Strip;
}();
// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/column.js
function column_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function column_createClass(Constructor, protoProps, staticProps) { if (protoProps) column_defineProperties(Constructor.prototype, protoProps); if (staticProps) column_defineProperties(Constructor, staticProps); return Constructor; }

var Column = /*#__PURE__*/function () {
  function Column(idx, width, left, cubedHeight, infoWidth) {
    this.idx = idx;
    this.groups = [];
    this.height = 0;
    this.width = width;
    this.left = left;
    this.cubedHeight = cubedHeight;
    this.infoWidth = infoWidth || 0;
  }

  var _proto = Column.prototype;

  _proto.addGroup = function addGroup(group) {
    this.addGroups([group]);
  };

  _proto.addGroups = function addGroups(groups) {
    var _this = this;

    this.groups = this.groups.concat(groups);
    groups.forEach(function (group) {
      group.columnIdx = _this.idx;
      group.Column = _this;
    });
  };

  column_createClass(Column, [{
    key: "totalWidth",
    get: function get() {
      return this.width + this.infoWidth;
    }
  }, {
    key: "scheme",
    get: function get() {
      return {
        idx: this.idx,
        groups: this.groups.map(function (group) {
          return group.scheme;
        }),
        width: this.width,
        height: this.height
      };
    }
  }]);

  return Column;
}();
// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/layoutsStore.js
function layoutsStore_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function layoutsStore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { layoutsStore_ownKeys(Object(source), true).forEach(function (key) { layoutsStore_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { layoutsStore_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function layoutsStore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function layoutsStore_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function layoutsStore_createClass(Constructor, protoProps, staticProps) { if (protoProps) layoutsStore_defineProperties(Constructor.prototype, protoProps); if (staticProps) layoutsStore_defineProperties(Constructor, staticProps); return Constructor; }

var LayoutsStore = /*#__PURE__*/function () {
  function LayoutsStore() {}

  layoutsStore_createClass(LayoutsStore, [{
    key: "layout",
    set: function set(_layout) {
      this._layout = layoutsStore_objectSpread({}, _layout);
    },
    get: function get() {
      return this._layout;
    }
  }]);

  return LayoutsStore;
}();

/* harmony default export */ var layoutsStore = (new LayoutsStore());
// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/layouter.js
function layouter_createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = layouter_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function layouter_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return layouter_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return layouter_arrayLikeToArray(o, minLen); }

function layouter_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function layouter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function layouter_createClass(Constructor, protoProps, staticProps) { if (protoProps) layouter_defineProperties(Constructor.prototype, protoProps); if (staticProps) layouter_defineProperties(Constructor, staticProps); return Constructor; }








var layouter_Layouter = /*#__PURE__*/function () {
  function Layouter(layoutParams) {
    this.ready = false;
    this.pointer = 0;
    this.layoutItems = [];
    this.findNeighborItem = this.findNeighborItem.bind(this);
    this.updateParams(layoutParams);

    if (this.createLayoutOnInit !== false) {
      this.createLayout(layoutParams);
    }
  }

  var _proto = Layouter.prototype;

  _proto.updateParams = function updateParams(layoutParams) {
    this.srcItems = layoutParams.items;
    this.styleParams = utils_utils.convertStyleParams(layoutParams.styleParams);
    this.container = utils_utils.convertContainer(layoutParams.container, this.styleParams);
    var options = layoutParams.options || {};
    this.useExistingLayout = !!options.useExistingLayout;
    this.createLayoutOnInit = options.createLayoutOnInit;
    this.showAllItems = !!options.showAllItems || !!layoutParams.showAllItems;
    this.skipVisibilitiesCalc = !!options.skipVisibilitiesCalc;
    this.useLayoutStore = !!options.useLayoutStore;
  };

  _proto.verifyGalleryState = function verifyGalleryState() {
    if (!this.container.galleryWidth) {
      this.ready = false;
      this.reason = 'galleryWidth is undefined or 0';
      return false;
    }

    if (!this.styleParams.gallerySize) {
      this.ready = false;
      this.reason = 'gallerySize is undefined or 0';
      return false;
    }

    return true;
  };

  _proto.calcNumberOfColumns = function calcNumberOfColumns(galleryWidth, gallerySize) {
    var numOfCols = 1;

    if (this.styleParams.isVertical) {
      if (this.styleParams.fixedColumns > 0) {
        numOfCols = this.styleParams.fixedColumns;
      } else if (this.styleParams.columnWidths) {
        numOfCols = this.styleParams.columnWidths.split(',').length;
      } else {
        // find the number of columns that makes each column width the closet to the gallerySize
        var numOfColsFloat = galleryWidth / gallerySize;
        var roundFuncs = [Math.floor, Math.ceil];
        var diffs = roundFuncs.map(function (func) {
          return func(numOfColsFloat);
        }) //round to top, round to bottom
        .map(function (n) {
          return Math.round(galleryWidth / n);
        }) //width of each col
        .map(function (w) {
          return Math.abs(gallerySize - w);
        }); //diff from gallerySize

        var roundFunc = roundFuncs[diffs.indexOf(Math.min.apply(Math, diffs))]; //choose the round function that has the lowest diff from the gallerySize

        numOfCols = roundFunc(numOfColsFloat) || 1;
      }
    } else {
      numOfCols = 1;
    }

    return numOfCols;
  };

  _proto.findShortestColumn = function findShortestColumn(columns, groupIdx) {
    var minCol = columns[0];

    if (this.styleParams.placeGroupsLtr) {
      minCol = columns[groupIdx % columns.length];
    } else {
      var minColH = -1;

      for (var _iterator = layouter_createForOfIteratorHelperLoose(columns), _step; !(_step = _iterator()).done;) {
        var column = _step.value;
        var colH = column.height;

        if (colH < minColH || minColH < 0) {
          minColH = colH;
          minCol = column;
        }
      }
    }

    return minCol;
  };

  _proto.saveExistingLayout = function saveExistingLayout() {
    if (this.useLayoutStore) {
      layoutsStore.layout = {
        pointer: this.pointer,
        layoutItems: this.layoutItems,
        groups: this.groups,
        strips: this.strips,
        groupIdx: this.groupIdx,
        groupItems: this.groupItems,
        group: this.group,
        strip: this.strip,
        gallerySize: this.gallerySize,
        galleryHeight: this.galleryHeight,
        columns: this.columns
      };
    }
  };

  _proto.prepareLayoutParams = function prepareLayoutParams() {
    var _this = this;

    if (this.useExistingLayout && this.pointer > 0) {
      if (this.useLayoutStore) {
        Object.assign(this, layoutsStore.layout);
      } else {
        if (this.styleParams.isVertical) {
          //---------------------| COLUMNS GALLERY |----------------------//
          //remove items from the last 3 groups;
          var lastGroups = this.groups.slice(-3);
          lastGroups.forEach(function (group) {
            var column = _this.columns[group.columnIdx];

            if (column) {
              column.height -= group.totalHeight;
              column.groups.splice(-1, 1);
            }

            _this.groups.splice(-1, 1);

            group.items.forEach(function () {
              _this.layoutItems.splice(-1, 1);

              _this.pointer--;
            });
            _this.groupIdx--;
          });
        } else {
          //---------------------| STRIPS GALLERY |----------------------//
          if (this.styleParams.oneRow) {
            //remove items from the last group:
            var _lastGroups = this.groups.slice(-1);

            _lastGroups.forEach(function (group) {
              var column = _this.columns[0];

              if (column) {
                column.groups.splice(-1, 1);
              }

              var strip = _this.strips[0];

              if (strip) {
                strip.setWidth(strip.width - group.width);
                strip.ratio = strip.width / strip.height;
                strip.groups.splice(-1, 1);
                _this.strip = strip;
              }

              _this.strips = [];

              _this.groups.splice(-1, 1);

              group.realItems.forEach(function () {
                _this.layoutItems.splice(-1, 1);

                _this.pointer--;
              });
              _this.groupIdx--;
            });

            this.galleryHeight = 0;
          } else {
            //remove items from the last 2 strips;
            var lastStrips = this.strips.slice(-2);

            if (lastStrips) {
              lastStrips.forEach(function (lastStrip) {
                if (lastStrip) {
                  _this.strips.splice(-1, 1);

                  var groups = lastStrip.groups;
                  groups.forEach(function (group) {
                    _this.groups.splice(-1, 1);

                    group.items.forEach(function () {
                      _this.layoutItems.splice(-1, 1);

                      _this.pointer--;
                    });
                    _this.groupIdx--;
                  });
                }
              });
              this.galleryHeight = this.strips.reduce(function (totalHeight, strip) {
                return totalHeight += strip.height;
              }, 0); // this.strip = this.strips[this.strips.length - 1];

              this.strip = new Strip({
                idx: this.strips.length + 1,
                container: this.container,
                groupsPerStrip: this.styleParams.groupsPerStrip,
                oneRow: this.styleParams.oneRow,
                gallerySize: this.gallerySize
              });
            }
          }

          this.groupItems = [];
        }
      }

      this.item = {};
      this.pointer = Math.max(0, this.pointer);
      this.maxLoops = this.srcItems.length * 10;
    } else {
      this.pointer = 0;
      this.firstGroup = false;
      this.layoutItems = [];
      this.groups = [];
      this.strips = [];

      if (this.styleParams.forceFullHeight) {
        this.gallerySize = Math.sqrt(this.container.galleryHeight * this.container.galleryWidth / this.srcItems.length);
      } else {
        var gallerySizeVal;

        if (typeof this.styleParams.gallerySize === 'function') {
          gallerySizeVal = this.styleParams.gallerySize();
        } else {
          gallerySizeVal = this.styleParams.gallerySize;
        }

        this.gallerySize = Math.floor(gallerySizeVal) + Math.ceil(2 * (this.styleParams.imageMargin - this.styleParams.galleryMargin));
      }

      this.galleryWidth = Math.floor(this.container.galleryWidth);
      this.maxGroupSize = this.getMaxGroupSize();
      this.groupIdx = 0;
      this.item = {};
      this.groupItems = [];
      this.group = {};
      this.bounds = this.container.bounds || {};
      this.strip = new Strip({
        idx: 1,
        container: this.container,
        groupsPerStrip: this.styleParams.groupsPerStrip,
        oneRow: this.styleParams.oneRow,
        gallerySize: this.gallerySize
      });
      this.galleryHeight = 0;
      this.numOfCols = this.calcNumberOfColumns(this.galleryWidth, this.gallerySize);
      this.gallerySize = this.styleParams.isVertical ? Math.floor(this.galleryWidth / this.numOfCols) : this.gallerySize;
      var _this$styleParams = this.styleParams,
          columnWidths = _this$styleParams.columnWidths,
          cubeRatio = _this$styleParams.cubeRatio,
          externalInfoWidth = _this$styleParams.externalInfoWidth;
      var columnWidthsArr = columnWidths && columnWidths.length > 0 ? columnWidths.split(',') : false;
      var totalLeft = 0;
      var remainderWidth = this.galleryWidth;
      var fixedCubeHeight;
      this.columns = Array(this.numOfCols).fill(0).map(function (column, idx) {
        //round group widths to fit an even number of pixels
        var colWidth = columnWidthsArr ? columnWidthsArr[idx] : Math.round(remainderWidth / (_this.numOfCols - idx));
        var curLeft = totalLeft;
        totalLeft += colWidth;
        remainderWidth -= colWidth; //fix cubeRatio of rounded columns

        var infoWidth = Math.round(externalInfoWidth > 1 // integer represent size in pixels, floats size in percentage
        ? externalInfoWidth : externalInfoWidth * colWidth) || 0;
        colWidth -= infoWidth;
        fixedCubeHeight = fixedCubeHeight || (_this.gallerySize - infoWidth) / cubeRatio; //calc the cube height only once
        //add space for info on the side

        return new Column(idx, colWidth, curLeft, fixedCubeHeight, infoWidth);
      });
      this.maxLoops = this.srcItems.length * 10;
    }
  };

  _proto.createLayout = function createLayout(layoutParams) {
    if (typeof layoutParams !== 'undefined') {
      this.updateParams(layoutParams);
    }

    if (!this.verifyGalleryState()) {
      return false;
    }

    this.prepareLayoutParams();

    while (this.srcItems[this.pointer]) {
      if (this.imagesLeft === 6) {
        this.saveExistingLayout();
      }

      this.maxLoops--;

      if (this.maxLoops <= 0) {
        console.error('Cannot create layout, maxLoops reached!!!');
        return false;
      }

      this.item = new item_Item({
        idx: this.pointer,
        inGroupIdx: this.groupItems.length + 1,
        scrollTop: this.galleryHeight,
        dto: this.srcItems[this.pointer],
        container: this.container,
        styleParams: this.styleParams
      });
      this.layoutItems[this.pointer] = this.item; //push the image to a group - until its full

      this.groupItems.push(this.item);

      if (this.groupItems.length < this.maxGroupSize && this.srcItems[this.pointer + 1]) {
        this.pointer++;
        continue;
      }

      this.group = new group_Group({
        idx: this.groupIdx,
        stripIdx: this.strip.idx,
        inStripIdx: this.strip.groups.length + 1,
        top: this.galleryHeight,
        items: this.groupItems,
        isLastItems: this.isLastImages,
        gallerySize: this.gallerySize,
        showAllItems: this.showAllItems,
        container: this.container,
        styleParams: this.styleParams
      });
      this.groups[this.groupIdx] = this.group; //take back the pointer in case the group was created with less items

      this.pointer += this.group.realItems.length - this.groupItems.length;
      this.groupIdx++;
      this.groupItems = []; //resize and fit the group in the strip / column

      if (!this.styleParams.isVertical) {
        //---------------------| STRIPS GALLERY |----------------------//
        if (this.strip.isFull(this.group, this.isLastImage)) {
          //close the current strip
          this.strip.resizeToHeight(this.galleryWidth / this.strip.ratio);
          this.strip.setWidth(this.galleryWidth);
          this.galleryHeight += this.strip.height;
          this.columns[0].addGroups(this.strip.groups);
          this.strips.push(this.strip); //open a new strip

          this.strip = new Strip({
            idx: this.strip.idx + 1,
            container: this.container,
            groupsPerStrip: this.styleParams.groupsPerStrip,
            oneRow: this.styleParams.oneRow,
            gallerySize: this.gallerySize
          }); //reset the group (this group will be rebuilt)

          this.pointer -= this.group.realItems.length - 1;
          this.groupIdx--;
          continue;
        } //add the group to the (current/new) strip


        this.group.setTop(this.galleryHeight);
        this.strip.ratio += this.group.ratio; // this.strip.height = Math.min(gallerySize, (galleryWidth / this.strip.ratio));

        this.strip.height = this.galleryWidth / this.strip.ratio;
        this.strip.setWidth(this.galleryWidth);
        this.strip.addGroup(this.group);

        if (this.isLastImage && this.strip.hasGroups) {
          if (this.styleParams.oneRow) {
            this.strip.height = this.container.galleryHeight + (this.styleParams.imageMargin - this.styleParams.galleryMargin);
          } else if (this.strip.canRemainIncomplete()) {
            //stretching the this.strip to the full width will make it too high - so make it as high as the gallerySize and not stretch
            this.strip.height = this.gallerySize;
            this.strip.markAsIncomplete();
          }

          this.strip.resizeToHeight(this.strip.height);
          this.galleryHeight += this.strip.height;
          this.columns[0].addGroups(this.strip.groups);
          this.strips.push(this.strip);
        }
      } else {
        //---------------------| COLUMNS GALLERY |----------------------//
        //find the shortest column
        var minCol = this.findShortestColumn(this.columns, this.groups.length - 1); //resize the group and images

        this.group.setCubedHeight(minCol.cubedHeight); //fix last column's items ratio (caused by stretching it to fill the screen)

        this.group.resizeToWidth(minCol.width);
        this.group.round(); //update the group's position

        this.group.setTop(minCol.height);
        this.group.setLeft(minCol.left); //add the image to the column

        minCol.addGroup(this.group); //add the image height to the column

        minCol.height += this.group.totalHeight;

        if (this.galleryHeight < minCol.height) {
          this.galleryHeight = minCol.height;
        }
      } //set the group visibility


      if (!this.skipVisibilitiesCalc && !this.gotScrollEvent && this.pointer < 10) {
        //until the first scroll event, make sure the first 10 groups are displayed
        this.group.calcVisibilities(true);
      } else {
        this.group.calcVisibilities(this.bounds);
      }

      if (!this.firstGroup) {
        this.firstGroup = this.group;
      }

      this.pointer++;
    }

    if (this.styleParams.forceFullHeight) {
      var stretchRatio = this.container.galleryHeight / this.galleryHeight;
      this.items.map(function (item) {
        item.cubeImages = true;
        item.cubeRatio = item.ratio = item.width / (item.height * stretchRatio);
        item.height *= stretchRatio;
        return item;
      });
      this.groups.map(function (group) {
        group.height *= stretchRatio;
        group.setTop(group.top * stretchRatio);
        group.resizeItems();
        return group;
      });
    } //results


    this.lastGroup = this.group;
    this.colWidth = Math.floor(this.galleryWidth / this.numOfCols);
    this.height = this.galleryHeight - (this.styleParams.imageMargin - this.styleParams.galleryMargin) * 2;
    this.width = this.lastGroup.left + this.lastGroup.width;

    if (!this.skipVisibilitiesCalc) {
      this.calcVisibilities(this.bounds);
    }

    this.ready = true;
    return this.scheme;
  };

  _proto.calcVisibilities = function calcVisibilities(bounds) {
    for (var _iterator2 = layouter_createForOfIteratorHelperLoose(this.columns), _step2; !(_step2 = _iterator2()).done;) {
      var column = _step2.value;

      for (var _iterator3 = layouter_createForOfIteratorHelperLoose(column.groups), _step3; !(_step3 = _iterator3()).done;) {
        var group = _step3.value;
        group.calcVisibilities(bounds);
      }
    }

    return this.scheme;
  };

  _proto.lastVisibleItemIdxInHeight = function lastVisibleItemIdxInHeight(height) {
    for (var i = this.items.length - 1; i >= 0; i--) {
      var item = this.items[i];
      var isVisible = item.offset.top < height;

      if (isVisible) {
        return i;
      }
    }

    return this.items.length - 1;
  };

  _proto.lastVisibleItemIdx = function lastVisibleItemIdx() {
    //the item must be visible and about the show more button
    return this.lastVisibleItemIdxInHeight(this.container.galleryHeight - 100);
  };

  _proto.findNeighborItem = function findNeighborItem(itemIdx, dir) {
    var _this2 = this;

    var currentItem = this.layoutItems[itemIdx];
    var neighborItem;

    var findClosestItem = function findClosestItem(currentItemX, currentItemY, condition) {
      var minDistance = null;
      var minDistanceItem = {};
      var itemY;
      var itemX;
      var distance; // each(slice(this.layoutItems, itemIdx - 50, itemIdx + 50), (item) => {

      _this2.layoutItems.forEach(function (item) {
        itemY = item.offset.top + item.height / 2;
        itemX = item.offset.left + item.width / 2;
        distance = Math.sqrt(Math.pow(itemY - currentItemY, 2) + Math.pow(itemX - currentItemX, 2));

        if ((minDistance === null || distance > 0 && distance < minDistance) && condition(currentItemX, currentItemY, itemX, itemY)) {
          minDistance = distance;
          minDistanceItem = item;
        }
      });

      return minDistanceItem;
    };

    switch (dir) {
      case 'up':
        neighborItem = findClosestItem(currentItem.offset.left + currentItem.width / 2, currentItem.offset.top, function (curX, curY, itmX, itmY) {
          return itmY < curY;
        });
        break;

      case 'left':
        neighborItem = findClosestItem(currentItem.offset.left, currentItem.offset.top + currentItem.height / 2, function (curX, curY, itmX) {
          return itmX < curX;
        });
        break;

      case 'down':
        neighborItem = findClosestItem(currentItem.offset.left + currentItem.width / 2, currentItem.offset.bottom, function (curX, curY, itmX, itmY) {
          return itmY > curY;
        });
        break;

      default:
      case 'right':
        neighborItem = findClosestItem(currentItem.offset.right, currentItem.offset.top + currentItem.height / 2, function (curX, curY, itmX) {
          return itmX > curX;
        });
        break;
    }

    if (neighborItem.idx >= 0) {
      return neighborItem.idx;
    } else {
      console.warn('Could not find offset for itemIdx', itemIdx, dir);
      return itemIdx; //stay on the same item
    }
  };

  _proto.getMaxGroupSize = function getMaxGroupSize() {
    var _maxGroupSize = 1;

    try {
      var groupTypes = typeof this.styleParams.groupTypes === 'string' && this.styleParams.groupTypes.length > 0 ? this.styleParams.groupTypes.split(',') : this.styleParams.groupTypes;
      _maxGroupSize = groupTypes.reduce(function (curSize, groupType) {
        return Math.max(curSize, parseInt(groupType));
      }, 1);
      _maxGroupSize = Math.min(_maxGroupSize, this.styleParams.groupSize);
    } catch (e) {
      console.error("couldn't calculate max group size - returing 3 (?)", e);
      _maxGroupSize = 3;
    }

    return _maxGroupSize;
  };

  layouter_createClass(Layouter, [{
    key: "isLastImage",
    get: function get() {
      return !this.srcItems[this.pointer + 1];
    }
  }, {
    key: "isLastImages",
    get: function get() {
      if (this.styleParams.layoutsVersion > 1) {
        //layouts version 2+
        return !this.srcItems[this.pointer + 1];
      } else {
        //Backwards compatibility
        return !this.srcItems[this.pointer + 3];
      }
    }
  }, {
    key: "imagesLeft",
    get: function get() {
      return this.srcItems.length - this.pointer - 1;
    }
  }, {
    key: "items",
    get: function get() {
      return this.layoutItems;
    }
  }, {
    key: "scheme",
    get: function get() {
      return {
        items: this.items.map(function (item) {
          return item.scheme;
        }),
        groups: this.groups.map(function (group) {
          return group.scheme;
        }),
        strips: this.strips.map(function (strip) {
          return strip.scheme;
        }),
        columns: this.columns.map(function (column) {
          return column.scheme;
        }),
        height: this.height,
        width: this.width
      };
    }
  }]);

  return Layouter;
}();


// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/create-layout.js
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


function create_layout_createLayout() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(layouter_Layouter, args).createLayout();
}
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/cssLayoutsHelper.js
function cssLayoutsHelper_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function cssLayoutsHelper_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { cssLayoutsHelper_ownKeys(Object(source), true).forEach(function (key) { cssLayoutsHelper_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { cssLayoutsHelper_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function cssLayoutsHelper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // const CDN_URL = 'https://static.wixstatic.com/media/';

var desktopWidths = [480, 768, 1024, 1280, 1440, 1680, 1920, 2560];
var mobileWidths = [320]; //, 375, 414, 480, 600, 768, 900]; (mobile is currently fixed to 320px)

var cssLayoutsHelper_getImageStyle = function getImageStyle(item) {
  return {
    top: item.offset.top,
    left: item.offset.left,
    width: item.width + item.infoWidth,
    height: item.height + item.infoHeight,
    innerHeight: item.height
  };
};

var cssLayoutsHelper_createItemId = function createItemId(domId, item) {
  return "#pro-gallery-" + domId + " #" + cssScrollHelper.getSellectorDomId(item);
};

var createExactCssForItems = function createExactCssForItems(domId, galleryItems, styleParams) {
  if (domId === void 0) {
    domId = '';
  }

  var isRTL = styleParams.isRTL;
  var cssStr = '';
  galleryItems.forEach(function (item) {
    var id = cssLayoutsHelper_createItemId(domId, item);
    var style = cssLayoutsHelper_getImageStyle(item, styleParams);
    var T = "top:" + style.top + "px;";
    var L = isRTL ? "right:" + style.left + "px;left:auto;" : "left:" + style.left + "px;";
    var W = "width:" + style.width + "px;";
    var H = "height:" + style.height + "px;";
    cssStr += id + " {" + T + L + W + H + "}"; // cssStr += `${id} .gallery-item-wrapper, ${id} .gallery-item-hover, ${id} .gallery-item {${Wvw}${Hvw}}`;
  });
  return cssStr;
};

var createCssFromLayout = function createCssFromLayout(domId, layout, styleParams, width) {
  if (domId === void 0) {
    domId = '';
  }

  var cssStr = '';
  var layoutWidth = width - styleParams.imageMargin * 2;

  var getRelativeDimension = function getRelativeDimension(val) {
    return Math.round(10000 * (val / layoutWidth)) / 100;
  };

  layout.items.forEach(function (item, i) {
    var id = cssLayoutsHelper_createItemId(domId, item);

    if (i < 50) {
      var style = cssLayoutsHelper_getImageStyle(item, styleParams);
      var Tvw = "top:" + getRelativeDimension(style.top) + "vw;";
      var Wvw = "width:" + getRelativeDimension(style.width) + "vw;";
      var Hvw = "height:" + getRelativeDimension(style.height) + "vw;";
      var iHvw = "height:" + getRelativeDimension(style.innerHeight) + "vw;";
      var Lpc = "left:" + getRelativeDimension(style.left) + "%;";
      var Wpc = "width:" + getRelativeDimension(style.width) + "%;";
      cssStr += id + " {" + Tvw + Lpc + Wpc + Hvw + "}";
      cssStr += id + " .gallery-item-wrapper, " + id + " .gallery-item-hover, " + id + " .gallery-item {" + Wvw + iHvw + "}";
    } else {
      cssStr += id + "{display:none;}";
    }
  });
  return cssStr;
};

var createCssFromLayouts = function createCssFromLayouts(domId, layouts, styleParams, widths) {
  var cssStrs = [];
  layouts.forEach(function (layout, idx) {
    var cssStr = '';

    if (layout) {
      var width = widths[idx];
      var lastWidth = widths[idx - 1];
      var isFirstMediaQuery = !lastWidth || cssStrs.length === 0;
      cssStr += isFirstMediaQuery ? '' : "@media only screen and (min-width: " + (lastWidth * 2 + width) / 3 + "px) {";
      cssStr += createCssFromLayout(domId, layout, styleParams, width);
      cssStr += isFirstMediaQuery ? '' : "}";
      cssStrs.push(cssStr);
    }
  });
  return cssStrs;
};

var cssLayoutsHelper_createCssLayouts = function createCssLayouts(_ref) {
  var isApproximateWidth = _ref.isApproximateWidth,
      galleryItems = _ref.galleryItems,
      layoutParams = _ref.layoutParams,
      isMobile = _ref.isMobile,
      domId = _ref.domId;

  if (isApproximateWidth) {
    var widths = isMobile ? mobileWidths : desktopWidths;
    var cssLayouts = widths.map(function (width) {
      var _layoutParams = cssLayoutsHelper_objectSpread(cssLayoutsHelper_objectSpread({}, layoutParams), {
        container: cssLayoutsHelper_objectSpread(cssLayoutsHelper_objectSpread({}, layoutParams.container), {}, {
          galleryWidth: width,
          width: width
        })
      });

      return create_layout_createLayout(_layoutParams);
    });
    return createCssFromLayouts(domId, cssLayouts, layoutParams.styleParams, widths);
  } else {
    // const chunkSize = 10;
    // const itemsBatchs = [];
    // for (let i = 0; i < galleryItems.length; i += chunkSize) {
    //   itemsBatchs.push(galleryItems.slice(i, i + chunkSize));
    // }
    // return galleryItems.map(items =>
    //   createExactCssForItems(items, layoutParams.styleParams)
    // );
    var exactCss = [];
    exactCss.push(createExactCssForItems(domId, galleryItems, layoutParams.styleParams));
    return exactCss;
  }
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/videoScrollHelper.js
function videoScrollHelper_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function videoScrollHelper_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { videoScrollHelper_ownKeys(Object(source), true).forEach(function (key) { videoScrollHelper_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { videoScrollHelper_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function videoScrollHelper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var VIDEO_EVENTS = {
  SCROLL: 'SCROLL',
  CLICKED: 'CLICKED',
  HOVERED: 'HOVERED',
  ENDED: 'ENDED',
  INIT_SCROLL: 'INIT_SCROLL'
};

var videoScrollHelper_VideoScrollHelper = /*#__PURE__*/function () {
  function VideoScrollHelper(config) {
    var _this = this;

    this.scrollBase = 0;
    this.videoItems = [];
    this.currentPlayingIdx = -1;
    this.nextInLineIdx = -1;
    this.lastItemCount = 0;
    this.playing = false;
    this.updateGalleryStructure = this.updateGalleryStructure.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.getPlayingIdx = this.getPlayingIdx.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.top = 0;
    this.left = 0;
    this.videoPlay = undefined;
    this.itemClick = undefined;
    this.setPlayingVideos = config.setPlayingVideos;
    this.trigger = Object.assign.apply(Object, [{}].concat(Object.keys(VIDEO_EVENTS).map(function (key) {
      var _ref;

      return _ref = {}, _ref[key] = function (args) {
        return _this.handleEvent({
          eventName: key,
          eventData: args
        });
      }, _ref;
    })));
  } //--------------------------updates----------------------------------//


  var _proto = VideoScrollHelper.prototype;

  _proto.updateGalleryStructure = function updateGalleryStructure(_ref2) {
    var _this2 = this;

    var galleryStructure = _ref2.galleryStructure,
        scrollBase = _ref2.scrollBase,
        videoPlay = _ref2.videoPlay,
        itemClick = _ref2.itemClick,
        oneRow = _ref2.oneRow;
    this.galleryWidth = dimensionsHelper.getGalleryDimensions().galleryWidth;
    this.scrollBase = scrollBase;
    this.videoPlay = videoPlay;
    this.itemClick = itemClick;
    this.oneRow = oneRow;
    var lastItemCount = this.lastItemCount;
    var newItemCount = galleryStructure.galleryItems.length;
    this.lastItemCount = newItemCount;

    if (lastItemCount === newItemCount) {
      return;
    } else {
      var newItems = galleryStructure.galleryItems.slice(lastItemCount, //make sure this is the right way
      newItemCount);
      newItems.forEach(function (item) {
        if (item.type === 'video' || item.type === 'image' && (item.id.includes('_placeholder') || item.isVideoPlaceholder)) {
          // either video or a placeholder for video files (both need to be included in the list)
          _this2.videoItems.push(videoScrollHelper_objectSpread(videoScrollHelper_objectSpread({}, item), {}, {
            videoPlayRating: item.idx
          }));
        }
      });
    }
  } //--------------------------triggers--------------------------------//
  ;

  _proto.handleEvent = function handleEvent(_ref3) {
    var eventName = _ref3.eventName,
        eventData = _ref3.eventData;

    switch (eventName) {
      case VIDEO_EVENTS.SCROLL:
        this.onScroll(eventData);
        break;

      case events.ITEM_ACTION_TRIGGERED:
        //case VIDEO_EVENTS.clicked:
        this.itemClicked(eventData.idx);
        break;

      case events.HOVER_SET:
        //case VIDEO_EVENTS.hovered:
        this.itemHovered(eventData);
        break;

      case events.VIDEO_ENDED:
        //case VIDEO_EVENTS.ended:
        this.videoEnded(eventData.idx);
        break;

      case VIDEO_EVENTS.INIT_SCROLL:
        this.ScrollializePlayState();
        break;

      default:
    }
  };

  _proto.itemHovered = function itemHovered(idx) {
    if (this.videoPlay !== 'hover') return;

    if (this.IdxExistsInVideoItems(idx)) {
      this.play(idx, -1);
    } else {//do nothing
    }
  };

  _proto.itemClicked = function itemClicked(idx) {
    if (this.videoPlay !== 'onClick') return; // if (this.itemClick !== 'nothing') return;

    if (this.IdxExistsInVideoItems(idx)) {
      if (this.currentPlayingIdx === idx) {
        this.stop();
      } else {
        this.play(idx, -1);
      }
    } else {//do nothing
    }
  };

  _proto.onScroll = function onScroll(_ref4) {
    var _this3 = this;

    var top = _ref4.top,
        left = _ref4.left;
    this.top = top ? top : this.top;
    this.left = left ? left : this.left;

    if (this.currentPlayingIdx === -1) {
      this.shouldAutoPlay() && this.playNextVideoByRating({
        top: this.top,
        left: this.left
      });
    } else {
      if (!this.isCurrentVideoStillVisible({
        top: this.top,
        left: this.left
      })) {
        this.stop(this.videoItems.findIndex(function (item) {
          return item.idx === _this3.currentPlayingIdx;
        }));
      }

      this.shouldAutoPlay() && this.playNextVideoByRating({
        top: this.top,
        left: this.left
      });
    }
  };

  _proto.videoEnded = function videoEnded(idx) {
    var indexInVideoItems = this.videoItems.findIndex(function (item) {
      return item.idx === idx;
    });
    this.stop(indexInVideoItems);
    var scroll = {
      top: this.top,
      left: this.left
    };
    this.shouldAutoPlay() && this.playNextVideoByRating(scroll);
  };

  _proto.initializePlayState = function initializePlayState() {
    if (this.shouldAutoPlay()) {
      this.playNextVideoByRating({
        top: this.top,
        left: this.left
      });
    }
  } //-------------------------------controls------------------------------------//
  ;

  _proto.playNextVideoByRating = function playNextVideoByRating(_ref5) {
    var _this4 = this;

    var top = _ref5.top,
        left = _ref5.left;
    var secondBestRating = {
      idx: -1,
      rating: Infinity
    };
    var bestRating = {
      idx: -1,
      rating: Infinity
    };
    this.videoItems.some(function (item) {
      if (_this4.isVisible(item, {
        top: top,
        left: left
      })) {
        if (item.videoPlayRating <= bestRating.rating) {
          secondBestRating.idx = bestRating.idx;
          secondBestRating.rating = bestRating.rating;
          bestRating.idx = item.idx;
          bestRating.rating = item.videoPlayRating;
        } else if (item.videoPlayRating <= secondBestRating.rating) {
          secondBestRating.idx = item.idx;
          secondBestRating.rating = item.videoPlayRating;
        }

        return false;
      } else {
        if (bestRating.idx >= 0) {
          return true;
        }

        return false;
      }
    });
    this.play(bestRating.idx, secondBestRating.idx);
  };

  _proto.calculateCurrentItemPlacement = function calculateCurrentItemPlacement() {
    var _this5 = this;

    return this.videoItems.findIndex(function (item) {
      return item.idx === _this5.currentPlayingIdx;
    });
  };

  _proto.play = function play(idx, nextIdx) {
    this.setNextInLineIdx(nextIdx);
    this.setPlayingIdx(idx);
    this.playing = true;
  };

  _proto.stop = function stop(indexInVideoItems) {
    if (indexInVideoItems >= 0) {
      this.videoItems[indexInVideoItems].videoPlayRating += 1337;
    }

    this.setPlayingIdx(-1);
    this.playing = false;
  };

  _proto.onPlayingIdxChange = function onPlayingIdxChange() {
    this.setPlayingVideos(this.currentPlayingIdx, this.nextInLineIdx);
  } //-------------------------------get/set----------------------------------------//
  ;

  _proto.getPlayingIdx = function getPlayingIdx() {
    return this.currentPlayingIdx;
  };

  _proto.setPlayingIdx = function setPlayingIdx(idx) {
    if (this.currentPlayingIdx !== idx) {
      this.currentPlayingIdx = idx;
      this.onPlayingIdxChange();
    }
  };

  _proto.setNextInLineIdx = function setNextInLineIdx(idx) {
    if (this.nextInLineIdx !== idx) {
      this.nextInLineIdx = idx;
      this.onPlayingIdxChange();
    }
  } //-----------------------------Utils--------------------------------------------//
  ;

  _proto.isCurrentVideoStillVisible = function isCurrentVideoStillVisible(_ref6) {
    var top = _ref6.top,
        left = _ref6.left;
    var currentItemPlacement = this.calculateCurrentItemPlacement();
    return this.isVisible(this.videoItems[currentItemPlacement], {
      top: top,
      left: left
    });
  };

  _proto.isVisible = function isVisible(item, _ref7) {
    var top = _ref7.top,
        left = _ref7.left;
    var target = {
      offsetTop: this.scrollBase || 0,
      scrollY: top,
      scrollLeft: left
    };
    var videoPlayVerticalTolerance = (item.offset.top - item.offset.bottom) / 2;
    var videoPlayHorizontalTolerance = (item.offset.left - item.offset.right) / 2;
    var visibleVertically = isWithinPaddingVertically({
      target: target,
      scrollBase: this.scrollBase,
      top: item.offset.top,
      bottom: item.offset.top + item.style.height,
      screenHeight: window_windowWrapper && window_windowWrapper.innerHeight,
      padding: videoPlayVerticalTolerance
    });
    var visibleHorizontally;

    if (!this.oneRow) {
      visibleHorizontally = true;
    } else {
      visibleHorizontally = isWithinPaddingHorizontally({
        target: target,
        left: item.offset.left,
        right: item.offset.left + item.style.width,
        screenWidth: this.galleryWidth || window_windowWrapper && window_windowWrapper.innerWidth,
        padding: videoPlayHorizontalTolerance
      });
    }

    return visibleVertically && visibleHorizontally;
  };

  _proto.shouldAutoPlay = function shouldAutoPlay() {
    return this.videoPlay === 'auto';
  };

  _proto.IdxExistsInVideoItems = function IdxExistsInVideoItems(idx) {
    return this.videoItems.some(function (item) {
      return item.idx === idx;
    });
  };

  return VideoScrollHelper;
}();

/* harmony default export */ var videoScrollHelper = (videoScrollHelper_VideoScrollHelper); // this.renderedPaddingMultiply = 2;
// this.visiblePaddingMultiply = 0;
// this.videoPlayVerticalTolerance =
//   (this.props.offset.bottom - this.props.offset.top) / 2;
// this.videoPlayHorizontalTolerance =
//   (this.props.offset.right - this.props.offset.left) / 2;
// this.padding = {
//   renderedVertical:
//     utils.parseGetParam('renderedPadding') ||
//     this.screenSize.height * this.renderedPaddingMultiply,
//   visibleVertical:
//     utils.parseGetParam('displayPadding') ||
//     this.screenSize.height * this.visiblePaddingMultiply,
//   playVertical:
//     utils.parseGetParam('playPadding') ||
//     this.screenSize.height * this.visiblePaddingMultiply -
//       this.videoPlayVerticalTolerance,
//   renderedHorizontal:
//     utils.parseGetParam('renderedPadding') ||
//     this.screenSize.width * this.renderedPaddingMultiply,
//   visibleHorizontal:
//     utils.parseGetParam('displayPadding') ||
//     this.screenSize.width * this.visiblePaddingMultiply,
//   playHorizontal:
//     utils.parseGetParam('playPadding') ||
//     this.screenSize.width * this.visiblePaddingMultiply -
//       this.videoPlayHorizontalTolerance,
// };
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/isNew.js
/* harmony default export */ var helpers_isNew = (function (_ref, state) {
  var items = _ref.items,
      styles = _ref.styles,
      container = _ref.container,
      itemsDimensions = _ref.itemsDimensions;
  var reason = {
    items: '',
    itemsMetadata: '',
    itemsAdded: '',
    styles: '',
    container: ''
  };

  var containerHadChanged = function containerHadChanged(_container) {
    if (!state.styles || !state.container) {
      reason.container = 'no old container or styles. ';
      return true; //no old container or styles (style may change container)
    }

    if (!_container) {
      reason.container = 'no new container.';
      return false; // no new continainer
    }

    var containerHasChanged = {
      height: !state.styles.oneRow && state.styles.enableInfiniteScroll ? false : !!_container.height && _container.height !== state.container.height,
      width: !state.container || !!_container.width && _container.width !== state.container.width,
      scrollBase: !!_container.scrollBase && _container.scrollBase !== state.container.scrollBase
    };
    return Object.keys(containerHasChanged).reduce(function (is, key) {
      if (containerHasChanged[key]) {
        reason.container += "container." + key + " has changed. ";
      }

      return is || containerHasChanged[key];
    }, false);
  };

  var stylesHaveChanged = function stylesHaveChanged(_styles) {
    if (!_styles) {
      reason.styles = 'no new styles.';
      return false; //no new styles - use old styles
    }

    if (!state.styles) {
      reason.styles = 'no old styles.';
      return true; //no old styles
    }

    try {
      var wasChanged = JSON.stringify(_styles) !== JSON.stringify(state.styles);

      if (wasChanged) {
        reason.styles = 'styles were changed.';
      }

      return wasChanged;
    } catch (e) {
      console.error('Could not compare styles', e);
      return false;
    }
  };

  var itemsWereAdded = function itemsWereAdded(_items) {
    var existingItems = state.items;

    if (_items === state.items) {
      reason.itemsAdded = 'items are the same object.';
      return false; //it is the exact same object
    }

    if (!_items) {
      reason.itemsAdded = 'new items do not exist.';
      return false; // new items do not exist (use old items)
    }

    if (!existingItems || existingItems && existingItems.length === 0) {
      reason.itemsAdded = 'old items do not exist.';
      return false; // old items do not exist (it is not items addition)
    }

    if (existingItems.length >= _items.length) {
      reason.itemsAdded = 'more old items than new items.';
      return false; // more old items than new items
    }

    var idsNotChanged = existingItems.reduce(function (is, _item, idx) {
      //check that all the existing items exist in the new array
      return is && _item.id === _items[idx].itemId;
    }, true);

    if (!idsNotChanged) {
      reason.itemsAdded = 'items ids were changed. ';
    }

    return idsNotChanged;
  };

  var itemsHaveChanged = function itemsHaveChanged(newItems) {
    var existingItems = state.items;

    if (newItems === state.items) {
      reason.items = 'items are the same object.';
      return false; //it is the exact same object
    }

    if (!newItems) {
      reason.items = 'new items do not exist.';
      return false; // new items do not exist (use old items)
    }

    if (!existingItems || existingItems && existingItems.length === 0) {
      reason.items = 'old items do not exist.';
      return true; // old items do not exist
    }

    if (existingItems.length !== newItems.length) {
      reason.items = 'more new items than old items (or vice versa).';
      return true; // more new items than old items (or vice versa)
    }

    return newItems.reduce(function (is, newItem, idx) {
      //check that all the items are identical
      var existingItem = existingItems[idx];

      try {
        var itemsChanged = is || !newItem || !existingItem || newItem.itemId !== existingItem.itemId || newItem.mediaUrl !== existingItem.mediaUrl || newItem.metaData && existingItem.metaData && newItem.metaData.type !== existingItem.metaData.type;

        if (itemsChanged) {
          reason.items = "items #" + idx + " id was changed.";
        }

        return itemsChanged;
      } catch (e) {
        reason.items = 'an error occured';
        return true;
      }
    }, false);
  };

  var itemsMetadataWasChanged = function itemsMetadataWasChanged(newItems) {
    var existingItems = state.items;

    if (!newItems) {
      reason.itemsMetadata = 'new items do not exist.';
      return false; // new items do not exist (use old items)
    }

    if (!state.items || !existingItems) {
      reason.itemsMetadata = 'old items do not exist.';
      return true; // old items do not exist
    }

    return newItems.reduce(function (is, newItem, idx) {
      //check that all the items are identical
      var existingItem = existingItems[idx];

      try {
        var itemsChanged = is || JSON.stringify(newItem.metaData) !== JSON.stringify(existingItem.metaData);

        if (itemsChanged) {
          reason.itemsMetadata = "item #" + idx + " data was changed.";
        }

        return itemsChanged;
      } catch (e) {
        reason.itemsMetadata = 'an error occured.';
        return true;
      }
    }, false);
  };

  var _isNew = {
    items: itemsHaveChanged(items),
    addedItems: itemsWereAdded(items),
    itemsMetadata: itemsMetadataWasChanged(items),
    styles: stylesHaveChanged(styles),
    container: containerHadChanged(container),
    itemsDimensions: !!itemsDimensions
  };
  _isNew.str = Object.entries(_isNew).map(function (_ref2) {
    var key = _ref2[0],
        is = _ref2[1];
    return is ? key : '';
  }).filter(function (str) {
    return !!str;
  }).join('|');
  _isNew.any = _isNew.str.length > 0;
  _isNew.reason = reason; // if (!_isNew.any) {
  //   console.count('Tried recreating gallery with no new params');
  // } else {
  //   console.count('Recreating gallery with new params');
  // }

  return _isNew;
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryContainerNew.js
function galleryContainerNew_extends() { galleryContainerNew_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return galleryContainerNew_extends.apply(this, arguments); }

function galleryContainerNew_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function galleryContainerNew_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { galleryContainerNew_ownKeys(Object(source), true).forEach(function (key) { galleryContainerNew_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { galleryContainerNew_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryContainerNew_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function galleryContainerNew_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function galleryContainerNew_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



















var galleryContainerNew_GalleryContainer = /*#__PURE__*/function (_React$Component) {
  galleryContainerNew_inheritsLoose(GalleryContainer, _React$Component);

  function GalleryContainer(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    if (utils.isVerbose()) {
      console.count('[OOISSR] galleryContainerNew constructor', window_windowWrapper.isMock);
    }

    _this.getMoreItemsIfNeeded = _this.getMoreItemsIfNeeded.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.enableScrollPreload = _this.enableScrollPreload.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.toggleLoadMoreItems = _this.toggleLoadMoreItems.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.scrollToItem = _this.scrollToItem.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.scrollToGroup = _this.scrollToGroup.bind(galleryContainerNew_assertThisInitialized(_this));
    _this._scrollingElement = _this.getScrollingElement();
    _this.duplicateGalleryItems = _this.duplicateGalleryItems.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.eventsListener = _this.eventsListener.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.onGalleryScroll = _this.onGalleryScroll.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.setPlayingIdxState = _this.setPlayingIdxState.bind(galleryContainerNew_assertThisInitialized(_this));
    var initialState = {
      pgScroll: 0,
      showMoreClickedAtLeastOnce: false,
      initialGalleryHeight: undefined,
      needToHandleShowMoreClick: false,
      gotFirstScrollEvent: false,
      playingVideoIdx: -1,
      nextVideoIdx: -1,
      viewComponent: null
    };
    _this.state = initialState;
    _this.items = [];
    _this.itemsDimensions = {};
    _this.preloadedItems = {};
    _this.layoutCss = [];
    var videoScrollHelperConfig = {
      setPlayingVideos: viewModeWrapper_isEditMode() ? function () {} : _this.setPlayingIdxState
    };
    _this.videoScrollHelper = new videoScrollHelper(videoScrollHelperConfig);

    if (utils.isSSR()) {
      _this.initialGalleryState = _this.reCreateGalleryExpensively(props, initialState);

      try {
        _this.galleryInitialStateJson = JSON.stringify(_this.initialGalleryState);
      } catch (e) {
        //todo - report to sentry
        _this.galleryInitialStateJson = null;
      }
    } else {
      try {
        if (!utils.shouldDebug('no_hydrate')) {
          var state = JSON.parse(window_windowWrapper.document.querySelector("#pro-gallery-" + props.domId + " #ssr-state-to-hydrate").innerHTML);

          _this.reCreateGalleryFromState({
            items: props.items,
            styles: state.styles,
            container: state.container,
            gotFirstScrollEvent: initialState.gotFirstScrollEvent
          });

          _this.initialGalleryState = state;
        } else {
          _this.initialGalleryState = {}; //this will cause a flicker between ssr and csr
        }
      } catch (e) {
        //hydrate phase did not happen - do it all over again
        _this.initialGalleryState = {};

        try {
          var galleryState = _this.reCreateGalleryExpensively(props);

          if (Object.keys(galleryState).length > 0) {
            _this.initialGalleryState = galleryState;
          }
        } catch (_e) {
          console.warn(_e);
        }
      }
    }

    _this.state = galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, initialState), _this.initialGalleryState);
    return _this;
  }

  var _proto = GalleryContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.loadItemsDimensionsIfNeeded();
    this.scrollToItem(this.props.currentIdx, false, true, 0);

    var onGalleryCreated = function onGalleryCreated() {
      _this2.getMoreItemsIfNeeded(0);

      _this2.handleNewGalleryStructure();

      _this2.eventsListener(events.APP_LOADED, {});
    };

    var galleryState = this.reCreateGalleryExpensively(this.props);

    if (Object.keys(galleryState).length > 0) {
      utils.isVerbose() && console.warn('Pro Gallery changed after mount', utils.printableObjectsDiff(this.state, galleryState));
      this.setState(galleryState, function () {
        onGalleryCreated();
      });
    } else {
      onGalleryCreated();
    }

    this.videoScrollHelper.initializePlayState();

    try {
      if (typeof window_windowWrapper.CustomEvent === 'function') {
        this.currentHoverChangeEvent = new CustomEvent('current_hover_change');
      } else {
        //IE (new CustomEvent is not supported in IE)
        this.currentHoverChangeEvent = window_windowWrapper.document.createEvent('CustomEvent'); // MUST be 'CustomEvent'

        this.currentHoverChangeEvent.initCustomEvent('current_hover_change', false, false, null);
      }
    } catch (e) {
      console.error('could not create \'current_hover_change\' customEvent. Error =', e);
    }

    if (this.props.domId) {
      this.currentHoverChangeEvent.domId = this.props.domId;
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    if (!this.currentHoverChangeEvent.domId && nextProps.domId) {
      this.currentHoverChangeEvent.domId = nextProps.domId;
    }

    if (this.props.currentIdx !== nextProps.currentIdx) {
      this.scrollToItem(nextProps.currentIdx, false, true, 0);
    }

    var reCreateGallery = function reCreateGallery() {
      var galleryState = _this3.reCreateGalleryExpensively(nextProps);

      if (Object.keys(galleryState).length > 0) {
        _this3.setState(galleryState, function () {
          _this3.handleNewGalleryStructure();
        });
      }
    };

    var getSignificantProps = function getSignificantProps(props) {
      var domId = props.domId,
          styles = props.styles,
          container = props.container,
          items = props.items;
      return {
        domId: domId,
        styles: styles,
        container: container,
        items: items
      };
    };

    if (this.reCreateGalleryTimer) {
      clearTimeout(this.reCreateGalleryTimer);
    }

    var hasPropsChanged = true;

    try {
      var currentSignificatProps = getSignificantProps(this.props);
      var nextSignificatProps = getSignificantProps(nextProps);
      hasPropsChanged = JSON.stringify(currentSignificatProps) !== JSON.stringify(nextSignificatProps);

      if (utils.isVerbose() && hasPropsChanged) {
        console.log('New props arrived', utils.printableObjectsDiff(currentSignificatProps, nextSignificatProps));
      }
    } catch (e) {
      console.error('Cannot compare props', e);
    }

    if (hasPropsChanged) {
      reCreateGallery();

      if (!!nextProps.currentIdx && nextProps.currentIdx > 0) {
        this.scrollToItem(nextProps.currentIdx, false, true, 0);
      }

      if (this.props.isInDisplay !== nextProps.isInDisplay) {
        this.handleNavigation(nextProps.isInDisplay);
      }
    } else {//this is a hack, because in fullwidth, new props arrive without any changes
      // this.reCreateGalleryTimer = setTimeout(reCreateGallery, 1000);
    }
  };

  _proto.loadItemsDimensionsIfNeeded = function loadItemsDimensionsIfNeeded() {
    var _this4 = this;

    if (utils.isSSR()) {
      return;
    }

    if (!(this.galleryStructure && this.galleryStructure.galleryItems && this.galleryStructure.galleryItems.length > 0)) {
      return;
    }

    var galleryItems = this.galleryStructure.galleryItems;
    var itemsWithoutDimensions = galleryItems.filter(function (item) {
      try {
        return item.isVisible && item.isDimensionless && !item.isPreloaded;
      } catch (e) {
        return false;
      }
    });

    if (!itemsWithoutDimensions.length) {
      return;
    }

    var preloadItem = function preloadItem(item, onload) {
      if (!item || !item.itemId || !item.isGalleryItem) {
        return;
      }

      try {
        var id = item.itemId;

        if (_this4.itemsDimensions[id]) {
          return; //already measured
        }

        if (typeof _this4.preloadedItems[id] !== 'undefined') {
          return;
        }

        _this4.preloadedItems[id] = new Image();

        if (utils.isVerbose()) {
          console.log('Preloading item #' + item);
        }

        if (typeof item.preload_url === 'string') {
          _this4.preloadedItems[id].src = item.preload_url;
        } else {
          _this4.preloadedItems[id].src = item.createUrl(URL_SIZES.PRELOAD, URL_TYPES.LOW_RES);
        }

        if (typeof onload === 'function') {
          _this4.preloadedItems[id].onload = function (e) {
            onload(e);
          };
        }

        return _this4.preloadedItems[id];
      } catch (e) {
        console.error('Could not preload item', item, e);
        return;
      }
    };

    var debouncedReCreateGallery = utils.debounce(function () {
      var _this4$props = _this4.props,
          items = _this4$props.items,
          styles = _this4$props.styles,
          container = _this4$props.container,
          watermarkData = _this4$props.watermarkData;
      var params = {
        items: items,
        styles: styles,
        container: container,
        watermarkData: watermarkData,
        itemsDimensions: _this4.itemsDimensions
      };

      var newState = _this4.reCreateGalleryExpensively(params, _this4.state);

      if (Object.keys(newState).length > 0) {
        _this4.setState(newState, function () {
          _this4.handleNewGalleryStructure();
        });
      }
    }, 500);
    itemsWithoutDimensions.forEach(function (item, idx) {
      item.isPreloaded = true;
      preloadItem(item, function (e) {
        try {
          if (utils.isVerbose()) {
            console.log('item loaded event', idx, e);
          }

          var ele = e.srcElement;

          var _item = _this4.items.find(function (itm) {
            return itm.itemId === item.itemId;
          });

          if (_item) {
            var itemDim = {
              width: ele.width,
              height: ele.height,
              measured: true
            };
            Object.assign(_item, itemDim);

            if (typeof _item.metaData === 'object') {
              Object.assign(_item.metaData, itemDim);
            }

            _this4.itemsDimensions[_item.itemId] = itemDim; //rebuild the gallery after every dimension update
            // if (Object.keys(this.itemsDimensions).length > 0) {

            debouncedReCreateGallery(); // }
          }
        } catch (_e) {
          console.error('Could not calc element dimensions', _e);
        }
      });
    });
  };

  _proto.handleNavigation = function handleNavigation(isInDisplay) {
    if (isInDisplay) {
      this.videoScrollHelper.trigger.INIT_SCROLL();
    } else {
      this.videoScrollHelper.stop();
    }
  };

  _proto.handleNewGalleryStructure = function handleNewGalleryStructure() {
    //should be called AFTER new state is set
    var _this$state = this.state,
        container = _this$state.container,
        needToHandleShowMoreClick = _this$state.needToHandleShowMoreClick,
        initialGalleryHeight = _this$state.initialGalleryHeight;
    var styleParams = this.state.styles;
    var numOfItems = this.items.length;
    var layoutHeight = this.layout.height;
    var layoutItems = this.layout.items;
    var isInfinite = this.containerInfiniteGrowthDirection() === 'vertical';
    var updatedHeight = false;
    var needToUpdateHeightNotInfinite = !isInfinite && needToHandleShowMoreClick;

    if (needToUpdateHeightNotInfinite) {
      var showMoreContainerHeight = 138; //according to the scss

      updatedHeight = container.height + (initialGalleryHeight - showMoreContainerHeight);
    }

    var onGalleryChangeData = {
      numOfItems: numOfItems,
      container: container,
      styleParams: styleParams,
      layoutHeight: layoutHeight,
      layoutItems: layoutItems,
      isInfinite: isInfinite,
      updatedHeight: updatedHeight
    };
    this.eventsListener(events.GALLERY_CHANGE, onGalleryChangeData);

    if (needToHandleShowMoreClick) {
      this.setState({
        needToHandleShowMoreClick: false
      });
    }
  };

  _proto.reCreateGalleryFromState = function reCreateGalleryFromState(_ref) {
    var items = _ref.items,
        styles = _ref.styles,
        container = _ref.container,
        gotFirstScrollEvent = _ref.gotFirstScrollEvent;
    //update this.items
    this.items = items.map(function (item) {
      return itemsHelper_ItemsHelper.convertDtoToLayoutItem(item);
    });
    var layoutParams = {
      items: this.items,
      container: container,
      styleParams: styles,
      gotScrollEvent: true,
      options: {
        showAllItems: true,
        skipVisibilitiesCalc: true,
        useLayoutStore: false,
        createLayoutOnInit: false
      }
    };
    this.layouter = new layouter_Layouter(layoutParams);
    this.layout = this.layouter.createLayout(layoutParams);
    this.galleryStructure = itemsHelper_ItemsHelper.convertToGalleryItems(this.layout, {
      thumbnailSize: styles.thumbnailSize,
      sharpParams: styles.sharpParams,
      resizeMediaUrl: this.props.resizeMediaUrl
    });
    this.videoScrollHelper.updateGalleryStructure({
      galleryStructure: this.galleryStructure,
      scrollBase: container.scrollBase,
      videoPlay: styles.videoPlay,
      itemClick: styles.itemClick,
      oneRow: styles.oneRow
    });
    var allowPreloading = viewModeWrapper_isEditMode() || gotFirstScrollEvent;
    this.scrollCss = this.getScrollCssIfNeeded({
      domId: this.props.domId,
      items: this.galleryStructure.galleryItems,
      styleParams: styles,
      allowPreloading: allowPreloading
    });
    this.createCssLayoutsIfNeeded(layoutParams);
  };

  _proto.createCssLayoutsIfNeeded = function createCssLayoutsIfNeeded(layoutParams, isApproximateWidth) {
    if (isApproximateWidth === void 0) {
      isApproximateWidth = false;
    }

    this.layoutCss = cssLayoutsHelper_createCssLayouts({
      layoutParams: layoutParams,
      isApproximateWidth: isApproximateWidth,
      isMobile: utils.isMobile(),
      domId: this.props.domId,
      galleryItems: isApproximateWidth ? null : this.galleryStructure.galleryItems
    });
  };

  _proto.reCreateGalleryExpensively = function reCreateGalleryExpensively(_ref2, curState) {
    var _this5 = this;

    var items = _ref2.items,
        styles = _ref2.styles,
        container = _ref2.container,
        watermarkData = _ref2.watermarkData,
        itemsDimensions = _ref2.itemsDimensions;

    if (utils.isVerbose()) {
      console.count('PROGALLERY [COUNT] reCreateGalleryExpensively');
      console.time('PROGALLERY [TIME] reCreateGalleryExpensively');
    }

    var state = curState || this.state || {};

    var _styles, _container;

    var isNew = helpers_isNew({
      items: items,
      styles: styles,
      container: container,
      watermarkData: watermarkData,
      itemsDimensions: itemsDimensions
    }, galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, state), {}, {
      items: this.items
    }));
    var newState = {};

    if (utils.isVerbose()) {
      console.log('PROGALLERY reCreateGalleryExpensively', isNew, {
        items: items,
        styles: styles,
        container: container,
        watermarkData: watermarkData
      });
    }

    if ((isNew.itemsDimensions || isNew.itemsMetadata) && !isNew.items && !isNew.addedItems) {
      //if only the items metadata has changed - use the modified items (probably with the measured width and height)
      this.items = this.items.map(function (item, index) {
        var metaData = Object.assign({}, items[index].metaData);
        return Object.assign(item, {
          metaData: metaData
        }, galleryContainerNew_objectSpread({}, _this5.itemsDimensions[item.itemId]));
      });
      newState.items = this.items.map(function (item) {
        return item.itemId;
      });
    } else if (isNew.items && !isNew.addedItems) {
      this.items = items.map(function (item) {
        return Object.assign(itemsHelper_ItemsHelper.convertDtoToLayoutItem(item), galleryContainerNew_objectSpread({}, _this5.itemsDimensions[item.itemId]));
      });
      newState.items = this.items.map(function (item) {
        return item.itemId;
      });
      this.gettingMoreItems = false; //probably finished getting more items
    } else if (isNew.addedItems) {
      this.items = this.items.concat(items.slice(this.items.length).map(function (item) {
        return itemsHelper_ItemsHelper.convertDtoToLayoutItem(item);
      }));
      newState.items = this.items.map(function (item) {
        return item.itemId;
      });
      this.gettingMoreItems = false; //probably finished getting more items
    }

    if (isNew.styles || isNew.container) {
      styles = styles || state.styles;
      container = container || state.container;
      dimensionsHelper.updateParams({
        styles: styles,
        container: container,
        domId: this.props.domId
      });
      _styles = addLayoutStyles(styles);
      dimensionsHelper.updateParams({
        styles: _styles
      });
      _container = Object.assign({}, container, dimensionsHelper.getGalleryDimensions());
      dimensionsHelper.updateParams({
        container: _container
      });
      newState.styles = _styles;
      newState.container = _container;
    } else {
      _styles = state.styles;
      _container = state.container;
    }

    if (!this.galleryStructure || isNew.any) {
      if (utils.isVerbose()) {
        console.count('PROGALLERY [COUNT] - reCreateGalleryExpensively (isNew)');
      }

      var layoutParams = {
        items: this.items,
        container: _container,
        styleParams: _styles,
        gotScrollEvent: true,
        options: {
          showAllItems: true,
          skipVisibilitiesCalc: true,
          useLayoutStore: false
        }
      };

      if (this.layouter && isNew.addedItems) {
        layoutParams.options.useExistingLayout = true;
      } else {
        layoutParams.options.createLayoutOnInit = false;
        this.layouter = new layouter_Layouter(layoutParams);
      }

      this.layout = this.layouter.createLayout(layoutParams);
      var itemConfig = {
        watermark: watermarkData,
        sharpParams: _styles.sharpParams,
        thumbnailSize: styles.thumbnailSize,
        resizeMediaUrl: this.props.resizeMediaUrl,
        lastVisibleItemIdx: this.lastVisibleItemIdx
      };
      var existingLayout = this.galleryStructure || this.layout;

      if (isNew.addedItems) {
        this.galleryStructure = itemsHelper_ItemsHelper.convertExistingStructureToGalleryItems(existingLayout, this.layout, itemConfig);
      } else {
        this.galleryStructure = itemsHelper_ItemsHelper.convertToGalleryItems(this.layout, itemConfig, existingLayout.galleryItems);
      }

      this.videoScrollHelper.updateGalleryStructure({
        galleryStructure: this.galleryStructure,
        scrollBase: _container.scrollBase,
        videoPlay: _styles.videoPlay,
        itemClick: _styles.itemClick,
        oneRow: _styles.oneRow,
        cb: this.setPlayingIdxState
      });

      if (isNew.items) {
        this.loadItemsDimensionsIfNeeded();
      }

      var isApproximateWidth = dimensionsHelper.isUnknownWidth() && !_styles.oneRow; //FAKE SSR

      this.createCssLayoutsIfNeeded(layoutParams, isApproximateWidth, isNew);
      var allowPreloading = viewModeWrapper_isEditMode() || state.gotFirstScrollEvent || state.showMoreClickedAtLeastOnce;
      this.scrollCss = this.getScrollCssIfNeeded({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: _styles,
        allowPreloading: allowPreloading
      });
    }

    if (utils.isVerbose()) {
      console.log('PROGALLERY [RENDERS] - reCreateGalleryExpensively', {
        isNew: isNew
      }, {
        items: items,
        styles: styles,
        container: container,
        watermarkData: watermarkData
      });
      console.timeEnd('PROGALLERY [TIME] reCreateGalleryExpensively');
    }

    if (isNew.any) {
      return newState;
    } else {
      return {};
    }
  };

  _proto.getScrollingElement = function getScrollingElement() {
    var _this6 = this;

    var horizontal = function horizontal() {
      return window_windowWrapper.document.querySelector("#pro-gallery-" + _this6.props.domId + " #gallery-horizontal-scroll");
    };

    var vertical = this.props.scrollingElement ? typeof this.props.scrollingElement === 'function' ? this.props.scrollingElement : function () {
      return _this6.props.scrollingElement;
    } : function () {
      return window_windowWrapper;
    };
    return {
      vertical: vertical,
      horizontal: horizontal
    };
  };

  _proto.scrollToItem = function scrollToItem(itemIdx, fixedScroll, isManual, durationInMS, scrollMarginCorrection) {
    if (durationInMS === void 0) {
      durationInMS = 0;
    }

    if (itemIdx >= 0) {
      var scrollingElement = this._scrollingElement;
      var horizontalElement = scrollingElement.horizontal();

      try {
        var scrollParams = {
          scrollMarginCorrection: scrollMarginCorrection,
          isRTL: this.state.styles.isRTL,
          oneRow: this.state.styles.oneRow,
          galleryWidth: this.state.container.galleryWidth,
          galleryHeight: this.state.container.galleryHeight,
          top: 0,
          items: this.galleryStructure.items,
          totalWidth: this.galleryStructure.width,
          itemIdx: itemIdx,
          fixedScroll: fixedScroll,
          isManual: isManual,
          scrollingElement: scrollingElement,
          horizontalElement: horizontalElement,
          durationInMS: durationInMS
        };
        return scrollToItemImp(scrollParams);
      } catch (e) {
        //added console.error to debug sentry error 'Cannot read property 'isRTL' of undefined in pro-gallery-statics'
        console.error('error:', e, ' pro-gallery, scrollToItem, cannot get scrollParams, ', 'isEditMode =', viewModeWrapper_isEditMode(), ' isPreviewMode =', viewModeWrapper_isPreviewMode(), ' isSiteMode =', viewModeWrapper_isSiteMode(), ' this.state.styles =', this.state.styles, ' this.state.container =', this.state.container, ' this.galleryStructure =', this.galleryStructure);
      }
    }
  };

  _proto.scrollToGroup = function scrollToGroup(groupIdx, fixedScroll, isManual, durationInMS, scrollMarginCorrection) {
    if (durationInMS === void 0) {
      durationInMS = 0;
    }

    if (groupIdx >= 0) {
      var scrollingElement = this._scrollingElement;
      var horizontalElement = scrollingElement.horizontal();

      try {
        var scrollParams = {
          scrollMarginCorrection: scrollMarginCorrection,
          isRTL: this.state.styles.isRTL,
          oneRow: this.state.styles.oneRow,
          galleryWidth: this.state.container.galleryWidth,
          galleryHeight: this.state.container.galleryHeight,
          top: 0,
          groups: this.galleryStructure.groups,
          totalWidth: this.galleryStructure.width,
          groupIdx: groupIdx,
          fixedScroll: fixedScroll,
          isManual: isManual,
          scrollingElement: scrollingElement,
          horizontalElement: horizontalElement,
          durationInMS: durationInMS
        };
        return scrollToGroupImp(scrollParams);
      } catch (e) {
        //added console.error to debug sentry error 'Cannot read property 'isRTL' of undefined in pro-gallery-statics'
        console.error('error:', e, ' pro-gallery, scrollToGroup, cannot get scrollParams, ', 'isEditMode =', viewModeWrapper_isEditMode(), ' isPreviewMode =', viewModeWrapper_isPreviewMode(), ' isSiteMode =', viewModeWrapper_isSiteMode(), ' this.state.styles =', this.state.styles, ' this.state.container =', this.state.container, ' this.galleryStructure =', this.galleryStructure);
      }
    }
  };

  _proto.containerInfiniteGrowthDirection = function containerInfiniteGrowthDirection(styles) {
    if (styles === void 0) {
      styles = false;
    }

    var _styles = styles || this.state.styles; // return the direction in which the gallery can grow on it's own (aka infinite scroll)


    var enableInfiniteScroll = this.props.styles.enableInfiniteScroll;
    var showMoreClickedAtLeastOnce = this.state.showMoreClickedAtLeastOnce;
    var oneRow = _styles.oneRow,
        loadMoreAmount = _styles.loadMoreAmount;

    if (oneRow) {
      return 'horizontal';
    } else if (!enableInfiniteScroll) {
      //vertical gallery with showMore button enabled
      if (showMoreClickedAtLeastOnce && loadMoreAmount === 'all') {
        return 'vertical';
      } else {
        return 'none';
      }
    } else {
      return 'vertical';
    }
  };

  _proto.setPlayingIdxState = function setPlayingIdxState(playingVideoIdx, nextVideoIdx) {
    this.setState({
      playingVideoIdx: playingVideoIdx,
      nextVideoIdx: nextVideoIdx
    });
  };

  _proto.onGalleryScroll = function onGalleryScroll(_ref3) {
    var top = _ref3.top,
        left = _ref3.left;
    this.videoScrollHelper.trigger.SCROLL({
      top: top,
      left: left
    });
  };

  _proto.getScrollCssIfNeeded = function getScrollCssIfNeeded(_ref4) {
    var domId = _ref4.domId,
        items = _ref4.items,
        styleParams = _ref4.styleParams,
        allowPreloading = _ref4.allowPreloading;
    var shouldUseScrollCss = !viewModeWrapper_isSEOMode();
    var scrollCss = [];

    if (shouldUseScrollCss) {
      scrollCss = cssScrollHelper.calcScrollCss({
        items: items,
        isUnknownWidth: dimensionsHelper.isUnknownWidth(),
        styleParams: styleParams,
        domId: domId,
        allowPreloading: allowPreloading
      });
    }

    return scrollCss && scrollCss.length > 0 ? scrollCss : this.scrollCss;
  };

  _proto.toggleLoadMoreItems = function toggleLoadMoreItems() {
    var _this7 = this;

    this.eventsListener(events.LOAD_MORE_CLICKED, this.galleryStructure.galleryItems);
    var showMoreClickedAtLeastOnce = true;
    var needToHandleShowMoreClick = true;

    if (!this.allowedPreloading) {
      //we already called to calcScrollCss with allowPreloading = true
      this.allowedPreloading = true;
      this.scrollCss = this.getScrollCssIfNeeded({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: this.state.styles,
        allowPreloading: true
      });
    } //before clicking "load more" at the first time


    if (!this.state.showMoreClickedAtLeastOnce) {
      var initialGalleryHeight = this.state.container.height; //container.height before clicking "load more" at the first time

      this.setState({
        showMoreClickedAtLeastOnce: showMoreClickedAtLeastOnce,
        initialGalleryHeight: initialGalleryHeight,
        needToHandleShowMoreClick: needToHandleShowMoreClick
      }, function () {
        _this7.handleNewGalleryStructure();
      });
    } else {
      //from second click
      this.setState({
        needToHandleShowMoreClick: needToHandleShowMoreClick
      }, function () {
        _this7.handleNewGalleryStructure();
      });
    }
  };

  _proto.enableScrollPreload = function enableScrollPreload() {
    if (!this.allowedPreloading) {
      this.allowedPreloading = true; //we already called to calcScrollCss with allowPreloading = true

      this.scrollCss = this.getScrollCssIfNeeded({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: this.state.styles,
        allowPreloading: true
      });
    }

    if (!this.state.gotFirstScrollEvent) {
      this.setState({
        gotFirstScrollEvent: true
      });
    }
  };

  _proto.duplicateGalleryItems = function duplicateGalleryItems() {
    var _this$items,
        _this8 = this;

    var galleryState = this.reCreateGalleryExpensively(galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, this.props), {}, {
      items: (_this$items = this.items).concat.apply(_this$items, this.items.slice(0, this.props.totalItemsCount))
    }));

    if (Object.keys(galleryState).length > 0) {
      this.setState(galleryState, function () {
        _this8.handleNewGalleryStructure();
      });
    }
  };

  _proto.eventsListener = function eventsListener(eventName, eventData, event) {
    this.videoScrollHelper.handleEvent({
      eventName: eventName,
      eventData: eventData
    });

    if (eventName === events.HOVER_SET) {
      this.currentHoverChangeEvent.currentHoverIdx = eventData;
      window_windowWrapper.dispatchEvent(this.currentHoverChangeEvent);
    }

    if (typeof this.props.eventsListener === 'function') {
      this.props.eventsListener(eventName, eventData, event);
    }
  };

  _proto.getMoreItemsIfNeeded = function getMoreItemsIfNeeded(scrollPos) {
    var _this9 = this;

    if (this.galleryStructure && this.galleryStructure.galleryItems && this.galleryStructure.galleryItems.length > 0 && !this.gettingMoreItems && this.state.items && this.state.styles && this.state.container) {
      //more items can be fetched from the server
      //TODO - add support for horizontal galleries
      var oneRow = this.state.styles.oneRow;
      var galleryEnd = this.galleryStructure[oneRow ? 'width' : 'height'] + (oneRow ? 0 : this.state.container.scrollBase);
      var screenSize = window_windowWrapper.screen[oneRow ? 'width' : 'height'];
      var scrollEnd = scrollPos + screenSize;
      var getItemsDistance = scrollPos ? 3 * screenSize : 0; //first scrollPos is 0 falsy. dont load before a scroll happened.
      // console.log('[RTL SCROLL] getMoreItemsIfNeeded: ', scrollPos);
      //const curDistance = galleryEnd - scrollEnd;
      //if (curDistance > 0 && curDistance < getItemsDistance) {

      if (galleryEnd - scrollEnd < getItemsDistance) {
        //only when the last item turns visible we should try getting more items
        if (this.state.items.length < this.props.totalItemsCount) {
          this.gettingMoreItems = true;
          this.eventsListener(events.NEED_MORE_ITEMS, this.state.items.length);
          setTimeout(function () {
            //wait a bit before allowing more items to be fetched - ugly hack before promises still not working
            _this9.gettingMoreItems = false;
          }, 2000);
        } else if (this.state.styles.slideshowLoop) {
          this.duplicateGalleryItems();
        }
      }
    }
  };

  _proto.canRender = function canRender() {
    var can = this.state.container && this.state.styles && this.state.items;

    if (!can && utils.isVerbose()) {
      console.log('PROGALLERY [CAN_RENDER] GalleryContainer', this.state, can, this.state.container, this.state.styles, this.state.items);
    }

    return can;
  };

  _proto.render = function render() {
    var _this10 = this;

    if (!this.canRender()) {
      return null;
    }

    var ViewComponent = this.state.styles.oneRow ? slideshowView : galleryView;

    if (utils.isVerbose()) {
      console.count('PROGALLERY [COUNTS] - GalleryContainer (render)');
      console.log('PROGALLERY [RENDER] - GalleryContainer', this.state.container.scrollBase, {
        state: this.state,
        items: this.items
      });
    }

    var displayShowMore = this.containerInfiniteGrowthDirection() === 'none';
    var findNeighborItem = this.layouter ? this.layouter.findNeighborItem : function () {};
    var ssrDisableTransition = !!utils.isSSR() && 'div.pro-gallery-parent-container * { transition: none !important }';
    return /*#__PURE__*/react_default.a.createElement("div", {
      "data-key": "pro-gallery-inner-container",
      key: "pro-gallery-inner-container"
    }, /*#__PURE__*/react_default.a.createElement(galleryScrollIndicator_ScrollIndicator, {
      domId: this.props.domId,
      oneRow: this.state.styles.oneRow,
      isRTL: this.state.styles.isRTL,
      totalWidth: this.galleryStructure.width,
      scrollBase: this.state.container.scrollBase,
      scrollingElement: this._scrollingElement,
      getMoreItemsIfNeeded: this.getMoreItemsIfNeeded,
      enableScrollPreload: this.enableScrollPreload,
      onScroll: this.onGalleryScroll
    }), /*#__PURE__*/react_default.a.createElement(ViewComponent, galleryContainerNew_extends({
      isInDisplay: this.props.isInDisplay,
      isUnknownWidth: dimensionsHelper.isUnknownWidth(),
      scrollingElement: this._scrollingElement,
      totalItemsCount: this.props.totalItemsCount //the items passed in the props might not be all the items
      ,
      renderedItemsCount: this.props.renderedItemsCount,
      items: this.items,
      itemsLoveData: this.props.itemsLoveData,
      galleryStructure: this.galleryStructure,
      styleParams: this.state.styles,
      container: this.state.container,
      watermark: this.props.watermarkData,
      settings: this.props.settings,
      gotScrollEvent: true,
      scroll: {} //todo: remove after refactor is 100%
      ,
      lazyLoad: this.props.lazyLoad,
      displayShowMore: displayShowMore,
      domId: this.props.domId,
      currentIdx: this.props.currentIdx || 0,
      customHoverRenderer: this.props.customHoverRenderer,
      customInfoRenderer: this.props.customInfoRenderer,
      customSlideshowInfoRenderer: this.props.customSlideshowInfoRenderer,
      customLoadMoreRenderer: this.props.customLoadMoreRenderer,
      playingVideoIdx: this.state.playingVideoIdx,
      nextVideoIdx: this.state.nextVideoIdx,
      noFollowForSEO: this.props.noFollowForSEO,
      proGalleryRegionLabel: this.props.proGalleryRegionLabel,
      actions: galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, this.props.actions), {}, {
        findNeighborItem: findNeighborItem,
        toggleLoadMoreItems: this.toggleLoadMoreItems,
        eventsListener: this.eventsListener,
        setWixHeight: function setWixHeight() {},
        scrollToItem: this.scrollToItem,
        scrollToGroup: this.scrollToGroup,
        duplicateGalleryItems: this.duplicateGalleryItems
      })
    }, this.props.gallery)), this.galleryInitialStateJson && /*#__PURE__*/react_default.a.createElement("div", {
      id: "ssr-state-to-hydrate",
      style: {
        display: 'none'
      }
    }, this.galleryInitialStateJson), /*#__PURE__*/react_default.a.createElement("div", {
      "data-key": "items-styles",
      key: "items-styles",
      style: {
        display: 'none'
      }
    }, this.layoutCss.map(function (css, idx) {
      return /*#__PURE__*/react_default.a.createElement("style", {
        "data-key": "layoutCss-" + idx,
        key: "layoutCss-" + idx,
        dangerouslySetInnerHTML: {
          __html: css
        }
      });
    }), (this.scrollCss || []).map(function (scrollCss, idx) {
      return /*#__PURE__*/react_default.a.createElement("style", {
        key: "scrollCss_" + idx + "_" + (_this10.allowedPreloading ? 'padded' : 'padless'),
        dangerouslySetInnerHTML: {
          __html: scrollCss
        }
      });
    }), ssrDisableTransition && /*#__PURE__*/react_default.a.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: ssrDisableTransition
      }
    })));
  };

  return GalleryContainer;
}(react_default.a.Component);
/* harmony default export */ var galleryContainerNew = (galleryContainerNew_GalleryContainer);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/proGallery.js
function proGallery_extends() { proGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return proGallery_extends.apply(this, arguments); }

function proGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }










var proGallery_ProGallery = /*#__PURE__*/function (_GalleryComponent) {
  proGallery_inheritsLoose(ProGallery, _GalleryComponent);

  function ProGallery(props) {
    var _this;

    _this = _GalleryComponent.call(this) || this;
    var isSSR = !!window_windowWrapper.isMock;
    _this.canRender = !isSSR || props.allowSSR === true; //do not render if it is SSR

    if (_this.canRender) {
      _this.init(props);
    }

    if (utils.isLocal() && !utils.isTest()) {
      console.log('PRO GALLERY DEV');
    }

    return _this;
  }

  var _proto = ProGallery.prototype;

  _proto.init = function init(props) {
    if (typeof props.viewMode !== 'undefined') {
      viewModeWrapper.setViewMode(props.viewMode);
    }

    if (typeof props.formFactor !== 'undefined') {
      viewModeWrapper.setFormFactor(props.formFactor);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.viewMode !== nextProps.viewMode) {
      utils.dumpCache();
      viewModeWrapper.setViewMode(nextProps.viewMode);
    }

    if (this.props.formFactor !== nextProps.formFactor) {
      utils.dumpCache();
      viewModeWrapper.setFormFactor(nextProps.formFactor);
    }
  };

  _proto.render = function render() {
    return this.canRender && /*#__PURE__*/react_default.a.createElement("div", {
      id: "pro-gallery-" + this.props.domId,
      className: "pro-gallery"
    }, /*#__PURE__*/react_default.a.createElement(galleryContainerNew, proGallery_extends({}, this.props, {
      domId: this.props.domId,
      items: this.props.items || [],
      watermarkData: this.props.watermarkData,
      settings: this.props.settings || {},
      offsetTop: this.props.offsetTop,
      itemsLoveData: this.props.itemsLoveData || {},
      proGalleryRegionLabel: this.props.proGalleryRegionLabel || 'Gallery. you can navigate the gallery with keyboard arrow keys.'
    })));
  };

  return ProGallery;
}(galleryComponent_GalleryComponent);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/index.js














var PRESETS = {
  CollageGallery: collageGallery_CollageGallery,
  MasonryGallery: masonryGallery_MasonryGallery,
  GridGallery: gridGallery_GridGallery,
  ThumbnailGallery: thumbnailGallery_ThumbnailGallery,
  SliderGallery: sliderGallery_SliderGallery,
  SlideshowGallery: slideshowGallery_SlideshowGallery,
  PanoramaGallery: panoramaGallery_PanoramaGallery,
  ColumnGallery: columnGallery_ColumnGallery,
  MagicGallery: magicGallery_MagicGallery,
  FullsizeGallery: fullsizeGallery_FullsizeGallery,
  BricksGallery: bricksGallery_BricksGallery,
  MixGallery: mixGallery_MixGallery,
  AlternateGallery: alternateGallery_alternateGallery,
  EmptyGallery: emptyGallery_EmptyGallery
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/common/defaultStyles.js
 //this is the one place for the default styles !!!

/* harmony default export */ var defaultStyles = ({
  isRTL: false,
  isVertical: false,
  gallerySize: 30,
  minItemSize: 120,
  chooseBestGroup: true,
  groupSize: 3,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  rotatingGroupTypes: '',
  collageDensity: 0.8,
  //80, // should be 0.8 after
  cubeImages: false,
  cubeType: 'fill',
  cubeRatio: 1,
  cropOnlyFill: false,
  smartCrop: false,
  rotatingCubeRatio: '',
  gallerySliderImageRatio: 16 / 9,
  fixedColumns: 0,
  numberOfImagesPerRow: 3,
  numberOfImagesPerCol: 1,
  groupsPerStrip: 0,
  borderRadius: 0,
  boxShadow: 0,
  imageMargin: 10,
  galleryMargin: 0,
  floatingImages: 0,
  gridStyle: 0,
  mobilePanorama: false,
  placeGroupsLtr: false,
  viewMode: 'preview',
  oneRow: false,
  showArrows: true,
  enableInfiniteScroll: true,
  thumbnailSpacings: 4,
  galleryThumbnailsAlignment: constants.thumbnailsAlignment.BOTTOM,
  enableScroll: true,
  hasThumbnails: false,
  isGrid: false,
  isSlider: false,
  isColumns: false,
  isMasonry: false,
  isSlideshow: false,
  isAutoSlideshow: false,
  slideshowLoop: false,
  autoSlideshowInterval: 4,
  useCustomButton: false,
  bottomInfoHeight: 0,
  titlePlacement: constants.placements.SHOW_ON_HOVER,
  galleryHorizontalAlign: constants.horizontalAlign.CENTER,
  galleryTextAlign: 'center',
  galleryVerticalAlign: constants.verticalAlign.CENTER,
  scrollSnap: false,
  itemClick: constants.itemClick.EXPAND,
  fullscreen: true,
  allowSocial: true,
  allowDownload: false,
  allowTitle: true,
  allowDescription: false,
  loveButton: true,
  loveCounter: false,
  videoPlay: constants.videoPlay.HOVER,
  scrollAnimation: constants.scrollAnimations.NO_EFFECT,
  scrollDirection: 0,
  overlayAnimation: constants.overlayAnimations.NO_EFFECT,
  arrowsPosition: 0,
  arrowsSize: 23,
  watermarkOpacity: 40,
  watermarkSize: 40,
  useWatermark: true,
  watermarkDock: constants.watermarkDock.RIGHT_DOWN,
  loadMoreAmount: constants.loadMoreAmount.ALL,
  defaultShowInfoExpand: 1,
  allowTitleExpand: true,
  allowDescriptionExpand: true,
  allowLinkExpand: true,
  expandInfoPosition: 0,
  allowFullscreenExpand: true,
  fullscreenLoop: false,
  // bgColorExpand: color-1
  // actionsColorExpand: color-5
  // titleFontExpand: font_5
  // titleColorExpand: color-5
  // descriptionFontExpand: font_8
  // descriptionColorExpand: color-5,
  galleryAlignExpand: 'left',
  // addToCartBackColorExpand: color-5,
  // addToCartFontExpand: font-8
  // addToCartColorExpand: color-1
  addToCartBorderWidth: 1,
  //addToCartBorderColor: color-5,
  addToCartButtonText: '',
  slideshowInfoSize: 200,
  playButtonForAutoSlideShow: false,
  allowSlideshowCounter: false,
  hoveringBehaviour: constants.infoBehaviourOnHover.APPEARS,
  thumbnailSize: 120,
  magicLayoutSeed: 1,
  //itemOpacity:'color-5', startWithOpacity: 0.60,
  //itemIconColorSlideshow: 'color-5'
  // itemIconColor: color-1
  // arrowsColor: 'color-1'
  imageHoverAnimation: constants.imageHoverAnimations.NO_EFFECT,
  // itemFont: 'font_5'  // startWithSize: 22,
  // itemFontColor: 'color-1'
  // itemFontSlideshow:'font_5' // startWithSize: 22,
  // itemFontColorSlideshow: 'color-5'
  // itemDescriptionFont: 'font_8' // startWithSize: 15
  // itemDescriptionFontColor: 'color-1'
  // itemDescriptionFontSlideshow: 'font_8' // startWithSize: 15
  // itemDescriptionFontColorSlideshow: 'color-5'
  // textBoxFillColor: 'color-2', //startWithOpacity: 1,
  calculateTextBoxHeightMode: constants.textBoxHeightCalculationOptions.AUTOMATIC,
  calculateTextBoxWidthMode: constants.textBoxWidthCalculationOptions.PERCENT,
  textBoxHeight: 200,
  textBoxWidth: 200,
  textBoxWidthPercent: 50,
  textImageSpace: 10,
  textBoxBorderRadius: 0,
  textBoxBorderWidth: 0,
  // textBoxBorderColor: color-5,
  textsVerticalPadding: 0,
  textsHorizontalPadding: 0,
  titleDescriptionSpace: 6,
  customButtonText: '',
  // customButtonFontForHover: 'font_8', startWithSize: 15
  // customButtonFontColorForHover: color-5
  // customButtonFont: 'font_8', startWithSize: 15
  // customButtonFontColor: color-1'
  // customButtonColor: startWithOpacity: '0', startWithColor: 'color-1'
  customButtonBorderWidth: 1,
  // customButtonBorderColor: startWithColor: 'color-1'
  customButtonBorderRadius: 0,
  loadMoreButtonText: '',
  //loadMoreButtonFont: font_8
  // loadMoreButtonFontColor: color-5
  // loadMoreButtonColor: startWithOpacity: '1', startWithColor: 'color-1'
  loadMoreButtonBorderWidth: 1,
  // loadMoreButtonBorderColor:  startWithColor: 'color-5'
  loadMoreButtonBorderRadius: 0,
  imageInfoType: constants.infoType.NO_BACKGROUND,
  itemBorderWidth: 0,
  // itemBorderColor: 'color-5'
  itemBorderRadius: 0,
  itemEnableShadow: false,
  // itemShadowOpacityAndColor: startWithColor: 'color-5', startWithOpacity: 0.2
  itemShadowBlur: 20,
  itemShadowDirection: 135,
  itemShadowSize: 10,
  imageLoadingMode: constants.loadingMode.BLUR,
  // imageLoadingColor: startWithColor: 'color-3'
  expandAnimation: constants.expandAnimations.NO_EFFECT,
  // oneColorAnimationColor: startWithColor: 'color-1',
  imageQuality: 90,
  usmToggle: false,
  usm_a: 0,
  usm_r: 0,
  usm_t: 0,
  videoSound: false,
  videoSpeed: '1',
  videoLoop: true
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/index.js
function gallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function gallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { gallery_ownKeys(Object(source), true).forEach(function (key) { gallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { gallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function gallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function gallery_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function gallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }











var gallery_BaseGallery = /*#__PURE__*/function (_React$Component) {
  gallery_inheritsLoose(BaseGallery, _React$Component);

  function BaseGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BaseGallery.prototype;

  _proto.render = function render() {
    var lazyLoad = utils.hasNativeLazyLoadSupport() ? constants_lazyLoad.NATIVE : this.props.lazyLoad;
    var domId = this.props.domId || 'default-dom-id';

    var _this$props = this.props,
        styles = _this$props.styles,
        options = _this$props.options,
        styleParams = _this$props.styleParams,
        eventsListener = _this$props.eventsListener,
        otherProps = gallery_objectWithoutPropertiesLoose(_this$props, ["styles", "options", "styleParams", "eventsListener"]);

    var _styles = gallery_objectSpread(gallery_objectSpread(gallery_objectSpread(gallery_objectSpread({}, defaultStyles), options), styles), styleParams);

    var _eventsListener = function _eventsListener() {
      return typeof eventsListener === 'function' && eventsListener.apply(void 0, arguments);
    };

    var galleryProps = gallery_objectSpread(gallery_objectSpread({}, otherProps), {}, {
      styles: _styles,
      eventsListener: _eventsListener,
      domId: domId,
      lazyLoad: lazyLoad
    });

    dimensionsHelper.updateParams({
      domId: galleryProps.domId,
      container: galleryProps.container,
      styles: galleryProps.styles
    });
    var _galleryProps$styles = galleryProps.styles,
        galleryType = _galleryProps$styles.galleryType,
        galleryLayout = _galleryProps$styles.galleryLayout;
    var GalleryComponent = proGallery_ProGallery;

    if (galleryType === undefined || galleryLayout !== undefined) {
      switch (galleryLayout) {
        case constants_layout.MASONRY:
          GalleryComponent = PRESETS.MasonryGallery;
          break;

        case constants_layout.GRID:
          GalleryComponent = PRESETS.GridGallery;
          break;

        case constants_layout.THUMBNAIL:
          GalleryComponent = PRESETS.ThumbnailGallery;
          break;

        case constants_layout.SLIDER:
          GalleryComponent = PRESETS.SliderGallery;
          break;

        case constants_layout.SLIDESHOW:
          GalleryComponent = PRESETS.SlideshowGallery;
          break;

        case constants_layout.PANORAMA:
          GalleryComponent = PRESETS.PanoramaGallery;
          break;

        case constants_layout.COLUMN:
          GalleryComponent = PRESETS.ColumnGallery;
          break;

        case constants_layout.MAGIC:
          GalleryComponent = PRESETS.MagicGallery;
          break;

        case constants_layout.FULLSIZE:
          GalleryComponent = PRESETS.FullsizeGallery;
          break;

        case constants_layout.BRICKS:
          GalleryComponent = PRESETS.BricksGallery;
          break;

        case constants_layout.MIX:
          GalleryComponent = PRESETS.MixGallery;
          break;

        case constants_layout.ALTERNATE:
          GalleryComponent = PRESETS.AlternateGallery;
          break;

        case constants_layout.EMPTY:
          GalleryComponent = PRESETS.EmptyGallery;
          break;

        case constants_layout.COLLAGE:
        default:
          GalleryComponent = PRESETS.CollageGallery;
      }
    }

    return /*#__PURE__*/react_default.a.createElement(GalleryComponent, galleryProps);
  };

  return BaseGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/old/content.js
/* harmony default export */ var content = ({
  allowLeanGallery: {
    title: 'Allow Lean Gallery',
    description: "render a css grid gallery if the options allow it. This will run much less code and render faster."
  },
  isStore: {
    title: 'Is store',
    description: ""
  },
  showAddToCartSection: {
    title: 'show Add To Cart Section',
    description: ""
  },
  canUseWatermark: {
    title: 'can Use Watermark',
    description: ""
  },
  galleryLayout: {
    title: 'Presets',
    description: ""
  },
  slideshowLoop: {
    title: 'Loop Images',
    description: "When set to true, the gallery will loop through the images seemlessly i.e. after scrolling past the last image, the gallery will show the first image again."
  },
  isAutoSlideshow: {
    title: 'Auto Slide',
    description: "Then set to true, the gallery will change the current item automatically after a specified interval"
  },
  autoSlideshowInterval: {
    title: 'Time Between Images',
    description: "When using auto slide, use this to set the time between current item change"
  },
  slideshowInfoSize: {
    title: 'Info bar size',
    description: "In slideshow, this parameter sets the space below the image to display the title description etc. Enlarging this size will reduce the size of the image so that both of them will take the full container."
  },
  playButtonForAutoSlideShow: {
    title: 'Play button',
    description: "When true, auto slide will show a play/pause button to toggle the transitions"
  },
  scrollDirection: {
    title: "Scroll Direction",
    description: "This parameter will toggle between two types of galleries. Vertical and Horizontal. Notice that many options are available only for a specific scroll direction."
  },
  isVertical: {
    title: "Layout Orientation",
    description: "Organize images in Rows or Columns the number of columns or row size will be determined by the container size"
  },
  isRTL: {
    title: "Layout Direction",
    description: "Order images Right to Left or Left to Right, this will also have an effect on slide direction and text direction"
  },
  allowTitle: {
    title: "Allow Title",
    description: ""
  },
  allowDescription: {
    title: "Allow Description",
    description: ""
  },
  allowSlideshowCounter: {
    title: "Slideshow counter",
    description: "Display an index of the current slide"
  },
  titlePlacement: {
    title: "Texts Placement",
    description: "Determines the position of the title, description and buttons relative to the image"
  },
  hoveringBehaviour: {
    title: "Hover Effect",
    description: "Determines whether the texts appear or disappear when hovering over items"
  },
  cubeImages: {
    title: "Crop Images",
    description: "When true, items will be cropped to fit the container. When false, the container wil resize to fit each image."
  },
  cubeType: {
    title: "Items Resize",
    description: "When using a fixed sized container, you can crop the images, or resize them to fit inside the container. Notice that choosing the Fit option will leave some empty margin around each image."
  },
  cubeRatio: {
    title: "Item Crop Ratio",
    description: "The Ratio between the width and height of the cropped, this is a string that will be evaluated on runtime. Use 'X%/Y%' to indicate that the ratio is responsive. e.g. '1' is a square, '16/9' is a wide screen rectangle and '100%/50%' is full width and half the height of the container."
  },
  gallerySliderImageRatio: {
    title: "Item Crop Ratio - Slider",
    description: "The Ratio between the width and height of the cropped, this is a string that will be evaluated on runtime. Use 'X%/Y%' to indicate that the ratio is responsive. e.g. '1' is a square, '16/9' is a wide screen rectangle and '100%/50%' is full width and half the height of the container."
  },
  galleryThumbnailsAlignment: {
    title: "Thumbnail Position",
    description: "The position of the thumbnails relative to the gallery. Notice that this will change the ratio of the images so that both the thumbnails and the images will fit inside the container"
  },
  thumbnailSize: {
    title: "Thumbnail Size",
    description: "width and height of each thumbnail aside the gallery"
  },
  gridStyle: {
    title: "Responsive Type",
    description: "Choose whether to adjust the number of columns according to the container size or keep it fixed"
  },
  gallerySizeType: {
    title: "Item Size Units",
    description: "Choose which units to use when setting the target size of each item: by layout, relative to width or in pixels (recommended)"
  },
  gallerySize: {
    title: "Item Size (smart)",
    description: "Set the item size between 1 to 100 units. The real size will be determined by the layout."
  },
  gallerySizePx: {
    title: "Item Size (in pixels)",
    description: "Set the target size of each item in pixels. Notice that the actual size will change to fit the container size"
  },
  gallerySizeRatio: {
    title: "Item Size (relative to width)",
    description: "Set the items size relative to the width of the container"
  },
  numberOfImagesPerRow: {
    title: "Images Per Row",
    description: "Set a fixed number of images per row. This will not change the layout when resizing the container (i.e. not responsive)."
  },
  numberOfImagesPerCol: {
    title: "Images Per Column",
    description: "Set the number of images per column."
  },
  groupSize: {
    title: "Max Group Size",
    description: "Set the max number of images to group together when creating a collage. Choose 1 if you want to avoid collaging altogether or 3 if you want to group up to 3 images together"
  },
  groupsPerStrip: {
    title: "Groups per Row",
    description: "This will set the number of groups in a row. Notice, this will ignore the size of the container (i.e. not responsive)"
  },
  groupTypes: {
    title: "Allowed Group Types",
    description: "The allowed groups types to use in collage (advanced). To learn more about group types, go to the Wiki in the github repo."
  },
  rotatingGroupTypes: {
    title: "Repeating Group Types",
    description: "Determine a specific order of groups types to use in collage (advanced). To learn more about group types, go to the Wiki in the github repo."
  },
  thumbnailSpacings: {
    title: "Spacing between Thumbnails",
    description: "The space (in pixels) between thumbnails"
  },
  imageMargin: {
    title: "Spacing between Items",
    description: "The space (in pixels) between the items. Notice, this will reduce the size of each item, but will not change the displayed ratio of the items."
  },
  galleryMargin: {
    title: "Gallery Spacing",
    description: "The space from the container to the gallery"
  },
  floatingImages: {
    title: "floating Images",
    description: "Set a random offset to each image, in the boundaries of the margin."
  },
  collageDensity: {
    title: "Collage Density",
    description: "Detemine how much 'collaging' to create. When set to minimum, all groups will be of 1 item. When set to maximum, all groups will be set to 3 items."
  },
  enableInfiniteScroll: {
    title: "Use Infinite Scroll",
    description: "When true, new items will load automatically when scrolling the page. When false, a 'load more' button will be shown to load more items. Notice, adding more items is done by the consumer when the gallery emits the NEED_MORE_ITEMS event."
  },
  loadMoreAmount: {
    title: "Load More Behaviour",
    description: "Choose whether clicking the 'load more' button toggle an infinite scroll behaviour or adds a few more items and keep the button at the bottom."
  },
  //----------| SETTINGS SECTION |---------//
  scrollSnap: {
    title: 'Snap Scroll',
    description: "When true, scrolling will snap to the center of the closest item. When false, scrolling will not snap"
  },
  itemClick: {
    title: 'When clicking on an item:',
    description: ""
  },
  allowDownload: {
    title: 'Show Download Button',
    description: ""
  },
  allowSocial: {
    title: 'Show Share Button',
    description: ""
  },
  loveButton: {
    title: 'Show Love Button',
    description: "Shows a Love button on the overlay of each item. Notice, the consumer needs to handle saving and fetching the data"
  },
  loveCounter: {
    title: 'Show Love Counter',
    description: "Shows a counter next to the Love button. Notice, the consumer should handle the saving and fetching the data."
  },
  //------------------------ Design ----------------------//
  itemOpacity: {
    title: 'Color Overlay',
    description: ""
  },
  itemIconColorSlideshow: {
    title: 'Icon color',
    description: ""
  },
  itemIconColor: {
    title: 'Icon color',
    description: ""
  },
  arrowsSize: {
    title: 'Navigation Arrows Size',
    description: "The size of the right and left navigation arrows in pixels"
  },
  arrowsColor: {
    title: 'Navigation Arrows Color',
    description: ""
  },
  arrowsPosition: {
    title: 'Navigation Arrows Position',
    description: "Choose whther to display the navigation inside or outside the gallery. Notice, setting the arrows position on the outside will reduce the size of the gallery."
  },
  overlayAnimation: {
    title: 'Overlay Hover Animation',
    description: "Choose an effect to show the overlay when hovering over an image"
  },
  imageHoverAnimation: {
    title: 'Image Hover Animation',
    description: "Choose an effect that happens to the image when hovering over it"
  },
  itemFont: {
    title: 'Title Font',
    description: ""
  },
  itemFontColor: {
    title: 'Title Font Color',
    description: ""
  },
  itemFontSlideshow: {
    title: 'Title Font',
    description: ""
  },
  itemFontColorSlideshow: {
    title: 'Title Font Color',
    description: ""
  },
  itemDescriptionFont: {
    title: 'Description Font',
    description: ""
  },
  itemDescriptionFontColor: {
    title: 'Description Font Color',
    description: ""
  },
  itemDescriptionFontSlideshow: {
    title: 'Description Font',
    description: ""
  },
  itemDescriptionFontColorSlideshow: {
    title: 'Description Color',
    description: ""
  },
  galleryHorizontalAlign: {
    // ALSO sets galleryTextAlign --- 
    title: 'Horizontal Text Alignment',
    description: "The horizontal alignment of the texts in the gallery"
  },
  galleryVerticalAlign: {
    title: 'Vertical Text Alignment',
    description: "The vertical alignment of the texts in the gallery"
  },
  textBoxFillColor: {
    title: 'Fill Color & Opacity',
    description: ""
  },
  calculateTextBoxHeightMode: {
    title: 'Text Box Height Calc Type',
    description: ""
  },
  calculateTextBoxWidthMode: {
    title: 'Text Box Width Units',
    description: ""
  },
  textBoxHeight: {
    title: 'Text Box Height',
    description: ""
  },
  textBoxWidth: {
    title: 'Text Box Width (pixels)',
    description: "The width of info element in pixels"
  },
  textBoxWidthPercent: {
    title: 'Text Box Width (percent)',
    description: "The partial width of the info element from the width of the item"
  },
  textImageSpace: {
    title: 'Text Space From Image',
    description: ""
  },
  textBoxBorderRadius: {
    title: 'Text box corner radius',
    description: ""
  },
  textBoxBorderWidth: {
    title: 'Text box border width',
    description: ""
  },
  textBoxBorderColor: {
    title: 'Text box border color',
    description: ""
  },
  textsVerticalPadding: {
    title: 'Text vertical padding',
    description: ""
  },
  textsHorizontalPadding: {
    title: 'Text horizontal padding',
    description: ""
  },
  titleDescriptionSpace: {
    title: 'Title Description Space',
    description: ""
  },
  useCustomButton: {
    title: 'Buy Now Button',
    description: ""
  },
  customButtonText: {
    title: 'Button Text',
    description: ""
  },
  customButtonFontForHover: {
    title: 'Button Font Hover',
    description: ""
  },
  customButtonFontColorForHover: {
    title: 'Button Font Color Hover',
    description: ""
  },
  customButtonFont: {
    title: 'Button Font',
    description: "",
    fontMinSize: 14,
    fontMaxSize: 22
  },
  customButtonFontColor: {
    title: 'Button Font Color',
    description: ""
  },
  customButtonColor: {
    title: 'Button Color',
    description: ""
  },
  customButtonBorderWidth: {
    title: 'Border Width',
    description: ""
  },
  customButtonBorderColor: {
    title: 'Border Color',
    description: ""
  },
  customButtonBorderRadius: {
    title: 'Border Radius',
    description: ""
  },
  loadMoreButtonText: {
    title: 'load more Button Text',
    description: ""
  },
  loadMoreButtonFont: {
    title: 'Load More Button Font',
    description: ""
  },
  loadMoreButtonFontColor: {
    title: 'Load More Button Font Color',
    description: ""
  },
  loadMoreButtonColor: {
    title: 'Button Color & Opacity',
    description: ""
  },
  loadMoreButtonBorderWidth: {
    title: 'Load More Border Width',
    description: ""
  },
  loadMoreButtonBorderColor: {
    title: 'Load More Border Color',
    description: ""
  },
  loadMoreButtonBorderRadius: {
    title: 'Load More Border Radius',
    description: ""
  },
  imageInfoType: {
    title: 'Choose info layout',
    description: ""
  },
  itemBorderWidth: {
    title: 'item Border Width',
    description: ""
  },
  itemBorderColor: {
    title: 'item Border Color & Opacity',
    description: ""
  },
  itemBorderRadius: {
    title: 'item Border Radius',
    description: ""
  },
  itemEnableShadow: {
    title: 'Show Box Shadow',
    description: "Show a shadow around each image"
  },
  itemShadowOpacityAndColor: {
    title: 'Shadow Opacity & Color',
    description: ""
  },
  itemShadowBlur: {
    title: 'Shadow Blur',
    description: ""
  },
  itemShadowDirection: {
    title: 'Shadow Direction',
    description: ""
  },
  itemShadowSize: {
    title: 'Shadow Size',
    description: ""
  },
  imageLoadingMode: {
    title: 'Loading Placeholder',
    description: "Determines what is shown until the image is loaded"
  },
  imageLoadingColor: {
    title: 'Color Background Placeholder',
    description: ""
  },
  expandAnimation: {
    title: 'How does your expand mode open?',
    description: ""
  },
  scrollAnimation: {
    title: 'Scroll Animation',
    description: "Choose how images appear when scrolling down the page"
  },
  oneColorAnimationColor: {
    title: 'Color Animation',
    description: "Choose a color to show until the images are loaded"
  },
  allowTitleExpand: {
    title: 'Title',
    description: ""
  },
  allowDescriptionExpand: {
    title: 'Description',
    description: ""
  },
  allowLinkExpand: {
    title: 'Link',
    description: ""
  },
  expandInfoPosition: {
    title: 'Where does it appear?',
    description: ""
  },
  defaultShowInfoExpand: {
    title: 'Choose how images appear when scrolling down the page',
    description: ""
  },
  allowFullscreenExpand: {
    title: 'Allow full screen',
    description: 'Viewers can open images in full screen mode.'
  },
  fullscreenLoop: {
    title: 'Loop images',
    description: 'Viewers can scroll through images in a continuous loop.'
  },
  bgColorExpand: {
    title: 'Background color',
    description: ""
  },
  actionsColorExpand: {
    title: 'Icon color',
    description: ""
  },
  titleFontExpand: {
    title: 'title Font Expand',
    description: ""
  },
  titleColorExpand: {
    title: 'title Color Expand',
    description: ""
  },
  descriptionFontExpand: {
    title: 'description Font Expand',
    description: ""
  },
  descriptionColorExpand: {
    title: 'description Color Expand',
    description: ""
  },
  galleryAlignExpand: {
    title: 'Text alignment',
    description: ""
  },
  addToCartBackColorExpand: {
    title: 'addToCartBackColorExpand - Button color & opacity',
    description: ""
  },
  addToCartFontExpand: {
    title: 'add To Cart Font Expand',
    description: ""
  },
  addToCartColorExpand: {
    title: 'add To Cart Color Expand',
    description: ""
  },
  addToCartBorderWidth: {
    title: 'add To Cart Border width',
    description: ""
  },
  addToCartBorderColor: {
    title: 'add To Cart Border Color',
    description: ""
  },
  addToCartButtonText: {
    title: 'add To Cart Button Text',
    description: "",
    maxLength: 30
  },
  imageQuality: {
    title: 'Image Quality',
    description: 'Higher quality images often take longer to load. The recommended setting is 90%. (JPEG images only)'
  },
  usmToggle: {
    title: 'Image Sharpening',
    description: 'Sharpen all images in this gallery using the Amount, Radius and Threshold controls.'
  },
  usm_a: {
    title: 'Amount',
    description: ''
  },
  usm_r: {
    title: 'Radius',
    description: ''
  },
  usm_t: {
    title: 'Threshold (Levels)',
    description: ''
  },
  hidePlay: {
    title: 'Hide Video Play Button',
    description: 'Show videos without a play button. Notice that using this option will display videos without any indication that they are playable'
  },
  videoPlay: {
    title: 'Playing Options',
    description: 'You control how your videos play: On hover, autoplay, or on click.'
  },
  videoSound: {
    title: 'Play with sound',
    description: 'Videos are muted in gallery view by default. Enable to play videos with sound. In Expand Mode, the video will always play with the sound on.'
  },
  videoSpeed: {
    title: 'Playback speed',
    description: 'You control how your videos play: On hover, autoplay, or on click.'
  },
  videoLoop: {
    title: 'Loop videos',
    description: ''
  }
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/old/consts.js

var INPUT_TYPES = {
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  OPTIONS: "OPTIONS",
  TEXT: "TEXT",
  COLOR_PICKER: "COLOR_PICKER",
  FONT_PICKER: "FONT_PICKER",
  BUTTON: "BUTTON",
  MULTISELECT: "MULTISELECT"
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/old/dataTypes.js


var formatTitle = function formatTitle(title) {
  return title.replace(/_/g, ' ').split(' ').map(function (word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }).join(' ');
};

var dataTypes_createOptions = function createOptions(constName) {
  return Object.entries(constants[constName]).map(function (_ref) {
    var title = _ref[0],
        value = _ref[1];
    return {
      value: value,
      title: formatTitle(title)
    };
  });
};

/* harmony default export */ var dataTypes = ({
  allowLeanGallery: {
    type: INPUT_TYPES.BOOLEAN
  },
  isStore: {
    type: INPUT_TYPES.BOOLEAN,
    alert: 'MOCK PARAM'
  },
  showAddToCartSection: {
    type: INPUT_TYPES.BOOLEAN,
    alert: 'MOCK PARAM'
  },
  canUseWatermark: {
    type: INPUT_TYPES.BOOLEAN,
    alert: 'MOCK PARAM'
  },
  galleryLayout: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('layout')
  },
  slideshowLoop: {
    type: INPUT_TYPES.BOOLEAN
  },
  isAutoSlideshow: {
    type: INPUT_TYPES.BOOLEAN
  },
  autoSlideshowInterval: {
    type: INPUT_TYPES.NUMBER,
    min: 2,
    max: 30
  },
  slideshowInfoSize: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 500
  },
  playButtonForAutoSlideShow: {
    type: INPUT_TYPES.BOOLEAN
  },
  scrollDirection: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 0,
      title: "Vertical"
    }, {
      value: 1,
      title: "Horizontal"
    }],
    alert: 'should be "oneRow" instead of "scrollDirection" - but the clientlib and renderer uses both parameters\n Also if "oneRow" - "isVertical" should be set to false - maybe add it to not relevant'
  },
  isVertical: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: false,
      title: "Rows"
    }, {
      value: true,
      title: "Columns"
    }]
  },
  isRTL: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: false,
      title: "Left to Right"
    }, {
      value: true,
      title: "Right to Left"
    }]
  },
  allowTitle: {
    type: INPUT_TYPES.BOOLEAN
  },
  allowDescription: {
    type: INPUT_TYPES.BOOLEAN
  },
  allowSlideshowCounter: {
    type: INPUT_TYPES.BOOLEAN
  },
  titlePlacement: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('placements')
  },
  hoveringBehaviour: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('infoBehaviourOnHover')
  },
  cubeImages: {
    type: INPUT_TYPES.BOOLEAN
  },
  cubeType: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: constants.cubeType.CROP,
      title: "Crop"
    }, {
      value: constants.cubeType.FIT,
      title: "Fit"
    }],
    alert: " this sets cubeType, cubeImages -> check proGalleryStyleBuilder"
  },
  cubeRatio: {
    type: INPUT_TYPES.TEXT
  },
  gallerySliderImageRatio: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 16 / 9,
      title: "16:9"
    }, {
      value: 4 / 3,
      title: "4:3"
    }, {
      value: 1,
      title: "1:1"
    }, {
      value: 3 / 4,
      title: "3:4"
    }, {
      value: 9 / 16,
      title: "9:16"
    }],
    alert: 'is "cubeRatio" is undefined (a value that is only in wixers) that this is set to a default value of 16/9'
  },
  galleryThumbnailsAlignment: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('thumbnailsAlignment')
  },
  thumbnailSize: {
    type: INPUT_TYPES.NUMBER,
    min: 80,
    max: 300
  },
  gridStyle: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 0,
      title: "Fit To Screen"
    }, {
      value: 1,
      title: "Set Items Per Row"
    }]
  },
  gallerySizeType: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 'smart',
      title: "Adjust to Layout"
    }, {
      value: 'ratio',
      title: "Adjust to Container Width"
    }, {
      value: 'px',
      title: "Fixed size (in pixels)"
    }]
  },
  gallerySize: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 100
  },
  gallerySizeRatio: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 100
  },
  gallerySizePx: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 1000
  },
  numberOfImagesPerRow: {
    type: INPUT_TYPES.NUMBER,
    min: 1,
    max: 5
  },
  numberOfImagesPerCol: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 3
  },
  groupSize: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 3
  },
  groupsPerStrip: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 10
  },
  groupTypes: {
    type: INPUT_TYPES.MULTISELECT,
    repeat: false,
    options: dataTypes_createOptions('groupTypes')
  },
  rotatingGroupTypes: {
    type: INPUT_TYPES.MULTISELECT,
    repeat: true,
    options: dataTypes_createOptions('groupTypes')
  },
  thumbnailSpacings: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 30,
    units: "px",
    alert: 'Should be set as / 2'
  },
  imageMargin: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 300,
    units: "px"
  },
  galleryMargin: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 50,
    units: "px"
  },
  floatingImages: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 1,
    step: 0.1
  },
  collageDensity: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 1,
    step: 0.1
  },
  enableInfiniteScroll: {
    type: INPUT_TYPES.BOOLEAN
  },
  loadMoreAmount: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('loadMoreAmount')
  },
  //----------| SETTINGS SECTION |---------//
  scrollSnap: {
    type: INPUT_TYPES.BOOLEAN
  },
  itemClick: {
    options: dataTypes_createOptions('itemClick')
  },
  watermarkOpacity: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 100,
    unit: '%',
    alert: 'now is being saved in "appSettings"'
  },
  watermarkSize: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 100,
    unit: '%',
    alert: 'now is being saved in "appSettings"'
  },
  watermarkDock: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('watermarkDock'),
    alert: 'now is being saved in "appSettings"'
  },
  allowDownload: {
    type: INPUT_TYPES.BOOLEAN
  },
  allowSocial: {
    type: INPUT_TYPES.BOOLEAN
  },
  loveButton: {
    type: INPUT_TYPES.BOOLEAN
  },
  loveCounter: {
    type: INPUT_TYPES.BOOLEAN
  },
  //------------------------ Design ----------------------//
  itemOpacity: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement! - this is a colorPickerSlider component - I think only to set opacity'
  },
  itemIconColorSlideshow: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  itemIconColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  arrowsSize: {
    type: INPUT_TYPES.NUMBER,
    min: 8,
    max: 80
  },
  arrowsColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  arrowsPosition: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 0,
      title: "On gallery"
    }, {
      value: 1,
      title: "Outside gallery"
    }]
  },
  overlayAnimation: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('overlayAnimations')
  },
  imageHoverAnimation: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('imageHoverAnimations')
  },
  itemFont: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  itemFontColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  itemFontSlideshow: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  itemFontColorSlideshow: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  itemDescriptionFont: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  itemDescriptionFontColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  itemDescriptionFontSlideshow: {
    type: INPUT_TYPES.Font
  },
  itemDescriptionFontColorSlideshow: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  galleryHorizontalAlign: {
    // ALSO sets galleryTextAlign --- 
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('horizontalAlign'),
    alert: '"galleryTextAlign" should be set accordingly'
  },
  galleryVerticalAlign: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('verticalAlign')
  },
  textBoxFillColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  calculateTextBoxHeightMode: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('textBoxHeightCalculationOptions')
  },
  calculateTextBoxWidthMode: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('textBoxWidthCalculationOptions')
  },
  textBoxHeight: {
    type: INPUT_TYPES.NUMBER,
    min: 1,
    max: 1500,
    units: 'px'
  },
  textImageSpace: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 100,
    units: 'px'
  },
  textBoxBorderRadius: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 900,
    units: 'px'
  },
  textBoxBorderWidth: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 20,
    units: 'px'
  },
  textBoxBorderColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  textsVerticalPadding: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 50,
    units: 'px'
  },
  textsHorizontalPadding: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 50,
    units: 'px'
  },
  titleDescriptionSpace: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 50,
    units: 'px'
  },
  useCustomButton: {
    type: INPUT_TYPES.BOOLEAN
  },
  customButtonText: {
    type: INPUT_TYPES.TEXT
  },
  customButtonFontForHover: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  customButtonFontColorForHover: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  customButtonFont: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement',
    fontMinSize: 14,
    fontMaxSize: 22
  },
  customButtonFontColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  customButtonColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  customButtonBorderWidth: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 5
  },
  customButtonBorderColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  customButtonBorderRadius: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 30
  },
  loadMoreButtonText: {
    type: INPUT_TYPES.TEXT
  },
  loadMoreButtonFont: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  loadMoreButtonFontColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  loadMoreButtonColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  loadMoreButtonBorderWidth: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 5
  },
  loadMoreButtonBorderColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  loadMoreButtonBorderRadius: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 30
  },
  imageInfoType: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('infoType')
  },
  itemBorderWidth: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 20,
    units: 'px'
  },
  itemBorderColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  itemBorderRadius: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 900,
    units: 'px'
  },
  itemEnableShadow: {
    type: INPUT_TYPES.BOOLEAN
  },
  itemShadowOpacityAndColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  itemShadowBlur: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 80,
    units: 'px'
  },
  itemShadowDirection: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 360,
    units: '°'
  },
  itemShadowSize: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 150,
    units: 'px'
  },
  imageLoadingMode: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('loadingMode')
  },
  imageLoadingColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  expandAnimation: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('expandAnimations')
  },
  scrollAnimation: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('scrollAnimations')
  },
  oneColorAnimationColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  allowTitleExpand: {
    type: INPUT_TYPES.BOOLEAN
  },
  allowDescriptionExpand: {
    type: INPUT_TYPES.BOOLEAN
  },
  allowLinkExpand: {
    type: INPUT_TYPES.BOOLEAN
  },
  expandInfoPosition: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 0,
      title: "Side"
    }, {
      value: 1,
      title: "Bottom"
    }]
  },
  defaultShowInfoExpand: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 0,
      title: "When clicking info icon"
    }, {
      value: 1,
      title: "Always"
    }],
    alert: '"showInfoExpandButton" property is set accordingly'
  },
  allowFullscreenExpand: {
    type: INPUT_TYPES.BOOLEAN
  },
  fullscreenLoop: {
    type: INPUT_TYPES.BOOLEAN
  },
  bgColorExpand: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  actionsColorExpand: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  titleFontExpand: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  titleColorExpand: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  descriptionFontExpand: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  descriptionColorExpand: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  galleryAlignExpand: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: 'left',
      title: "left"
    }, {
      value: 'center',
      title: "center"
    }, {
      value: 'right',
      title: "right"
    }],
    alert: '"galleryAlignExpandIcons" property is being accordingly set'
  },
  addToCartBackColorExpand: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  addToCartFontExpand: {
    type: INPUT_TYPES.FONT_PICKER,
    alert: 'implement'
  },
  addToCartColorExpand: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  addToCartBorderWidth: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 5,
    units: 'px'
  },
  addToCartBorderColor: {
    type: INPUT_TYPES.COLOR_PICKER,
    alert: 'implement!'
  },
  addToCartButtonText: {
    type: INPUT_TYPES.TEXT,
    maxLength: 30
  },
  imageQuality: {
    type: INPUT_TYPES.NUMBER,
    min: 30,
    max: 100,
    alert: 'doesn\'t influence - this builds "sharpParams" object - as "imageQuality" property'
  },
  usmToggle: {
    type: INPUT_TYPES.BOOLEAN
  },
  usm_a: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 500,
    units: '%',
    alert: 'inside "sharpParams" object as "usm_a" property + percentage - should be divided by 100'
  },
  usm_r: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 50,
    units: 'px',
    step: 0.1,
    alert: 'inside "sharpParams" object as "usm_r" property'
  },
  usm_t: {
    type: INPUT_TYPES.NUMBER,
    min: 0,
    max: 255,
    units: 'lv',
    alert: 'inside "sharpParams" object as "usm_t" property + percentage - should be divided by 255'
  },
  hidePlay: {
    type: INPUT_TYPES.BOOLEAN
  },
  videoPlay: {
    type: INPUT_TYPES.OPTIONS,
    options: dataTypes_createOptions('videoPlay')
  },
  videoSound: {
    type: INPUT_TYPES.BOOLEAN
  },
  videoSpeed: {
    type: INPUT_TYPES.OPTIONS,
    options: [{
      value: '0.25',
      title: ".25x"
    }, {
      value: '0.5',
      title: ".50x"
    }, {
      value: '1',
      title: "Normal"
    }, {
      value: '1.25',
      title: "1.25x"
    }, {
      value: '1.5',
      title: "1.50x"
    }, {
      value: '2',
      title: "2.00x"
    }]
  },
  videoLoop: {
    type: INPUT_TYPES.BOOLEAN
  }
}); // store and mobile 
// cubeRatio: { -- It's defined in styleBuilder
// parseStyleParams - for expand mode need to investigate file - sets lots of other params.SECTIONS.EXPAND_MODE
// second parameter in proGalleryStyleBuilder - 'scrollDirection', 'oneRow'
// Maybe to add the default to this interface ? 
// cubeRatio didnt 
// is store
// is mobile 
// check expand conditions 
// decity should have precents - precents conversion
// defined in wixers!?
// if (canSet('cubeRatio')) {
//   stateStyles.cubeRatio = Number(eval(wixStyles.cubeRatio));
// }
// if (canSet('cubeType', 'cubeType')) {
//   stateStyles.cubeType = ((String(wixStyles.cubeType) === '1') ? 'fit' : 'fill');
//   if (stateStyles.cubeType === 'fit') {
//     if (stateStyles.cropOnlyFill === true) {
//       stateStyles.cubeImages = false;
//     }
//   }
// }
// //TODO, I changed it so that we will have the wixStyles, in the renderer I need to change the function to have the functionality of isSlider / isGrid - V
// //TODO should I add the new style names to the defaults as undefined? - no, i dont (should check with guy to make sure)
// if (canSet('gallerySliderImageRatio', 'cubeRatio')) {
//   stateStyles.gallerySliderImageRatio = Number(eval(['16/9', '4/3', '1', '3/4', '9/16'][Number(wixStyles.gallerySliderImageRatio)]));
// } else if (isUndefined(stateStyles.cubeRatio)) {
//   stateStyles.gallerySliderImageRatio = Number(eval(['16/9', '4/3', '1', '3/4', '9/16'][Number(defaultStateStyles.gallerySliderImageRatio)]));
// }
// if (canSet('galleryImageRatio', 'cubeRatio')) {
//   stateStyles.galleryImageRatioFromWix = Number(eval(['16/9', '4/3', '1', '3/4', '9/16'][Number(wixStyles.galleryImageRatio)]));
// }
// if (canSet('fixedColumns')) {
//   stateStyles.fixedColumns = Number(wixStyles.fixedColumns);
// }
// if (canSet('groupsPerStrip')) {
//   stateStyles.groupsPerStrip = Number(wixStyles.groupsPerStrip);
// }
// if (canSet('scrollDirection', 'oneRow')) {
//   stateStyles.oneRow = (String(wixStyles.scrollDirection) === '1');
//   if (stateStyles.oneRow) {
//     //if oneRow is true, use horizontal layouts only
//     stateStyles.isVertical = false;
//   }
// }
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/old/utils.js

var utils_showColorOverlay = function showColorOverlay(sp, context) {
  if (context === void 0) {
    context = {};
  }

  var hasHoverOnMobile = function hasHoverOnMobile(styleParams) {
    var firstTapSimulatesHover = sp.itemClick === constants.itemClick.NOTHING || showTexts(styleParams) && (utils_layoutPresentOuterInformation(styleParams) && sp.titlePlacement === constants.placements.SHOW_ON_HOVER || !utils_layoutPresentOuterInformation(styleParams));
    return !utils_isSlideshowLayout(styleParams) && firstTapSimulatesHover;
  };

  if (context.isMobile) {
    return hasHoverOnMobile(sp);
  }

  return !utils_isSlideshowLayout(sp);
};
var utils_isSlideshowLayout = function isSlideshowLayout(sp) {
  return [constants.layout.SLIDESHOW, constants.layout.FULLSIZE].indexOf(sp.galleryLayout) > -1;
};
var utils_isHorizontalLayout = function isHorizontalLayout(sp) {
  return [constants.layout.THUMBNAIL, constants.layout.SLIDER, constants.layout.SLIDESHOW, constants.layout.FULLSIZE, constants.layout.COLUMN].indexOf(sp.galleryLayout) > -1 || (sp.galleryLayout === constants.layout.GRID || sp.galleryLayout === constants.layout.COLLAGE) && !utils_oneRow(sp);
};
var utils_layoutPresentOuterInformation = function layoutPresentOuterInformation(sp) {
  return [constants.layout.PANORAMA, constants.layout.COLUMN, constants.layout.SLIDER].indexOf(sp.galleryLayout) > -1 || sp.galleryLayout === constants.layout.MASONRY && sp.isVertical || sp.galleryLayout === constants.layout.GRID && !utils_oneRow(sp);
};
var layoutPresentSideOuterInformation = function layoutPresentSideOuterInformation(sp) {
  return !utils_oneRow(sp) && sp.isVertical && sp.groupSize === 1;
};
var showTexts = function showTexts(sp) {
  return sp.allowTitle || sp.allowDescription;
};
var utils_showAlignTextVertical = function showAlignTextVertical(sp) {
  return [constants.layout.COLLAGE, constants.layout.MASONRY, constants.layout.GRID, constants.layout.THUMBNAIL, constants.layout.SLIDER, constants.layout.PANORAMA, constants.layout.COLUMN, constants.layout.MAGIC].indexOf(sp.galleryLayout) > -1 && sp.titlePlacement === constants.placements.SHOW_ON_HOVER;
};
var utils_presentOuterInformation = function presentOuterInformation(sp) {
  return utils_layoutPresentOuterInformation(sp) && sp.titlePlacement !== constants.placements.SHOW_ON_HOVER;
};
var utils_presentSideOuterInformation = function presentSideOuterInformation(sp) {
  return layoutPresentSideOuterInformation(sp) && (sp.titlePlacement === constants.placements.SHOW_ON_THE_RIGHT || sp.titlePlacement === constants.placements.SHOW_ON_THE_LEFT);
};
var utils_isTitlePlacementAlwaysShown = function isTitlePlacementAlwaysShown(sp) {
  return utils_layoutPresentOuterInformation(sp) || utils_isSlideshowLayout(sp) || sp.titlePlacement !== constants.placements.SHOW_ON_HOVER;
};
var showInfiniteScroll = function showInfiniteScroll(sp) {
  return !utils_oneRow(sp);
};
var showItemBorderAndShadowConfig = function showItemBorderAndShadowConfig(sp) {
  return !(sp.cubeType === 'fit' && utils_showThumbnailResize(sp));
}; // check cubeType exists

var utils_showThumbnailResize = function showThumbnailResize(sp) {
  return [constants.layout.EMPTY, constants.layout.GRID, constants.layout.THUMBNAIL, constants.layout.SLIDER, constants.layout.SLIDESHOW, constants.layout.FULLSIZE].indexOf(sp.galleryLayout) > -1;
};
var utils_showShadow = function showShadow(sp) {
  return showItemBorderAndShadowConfig(sp) && !utils_isHorizontalLayout(sp) && (sp.imageInfoType === constants.infoType.ATTACHED_BACKGROUND || sp.titlePlacement === constants.placements.SHOW_ON_HOVER);
};
var utils_oneRow = function oneRow(sp) {
  return sp.oneRow || sp.scrollDirection === constants.scrollDirection.horizontal;
};
var utils_showSlideshowSettings = function showSlideshowSettings(sp) {
  return [constants.layout.THUMBNAIL, constants.layout.SLIDER, constants.layout.SLIDESHOW, constants.layout.FULLSIZE, constants.layout.COLUMN].indexOf(sp.galleryLayout) > -1;
};
var utils_showAutoSlideshow = function showAutoSlideshow(sp) {
  return [constants.layout.THUMBNAIL, constants.layout.SLIDER, constants.layout.SLIDESHOW, constants.layout.FULLSIZE].indexOf(sp.galleryLayout) > -1;
};
var utils_showImagesDisplaySection = function showImagesDisplaySection(sp) {
  return [constants.layout.EMPTY, constants.layout.COLLAGE, constants.layout.MASONRY, constants.layout.GRID, constants.layout.THUMBNAIL, constants.layout.SLIDER, constants.layout.SLIDESHOW, constants.layout.FULLSIZE, constants.layout.PANORAMA, constants.layout.COLUMN].indexOf(sp.galleryLayout) > -1;
};
var utils_showHoveringBehaviour = function showHoveringBehaviour(sp) {
  return utils_showImagesDisplaySection(sp) && !utils_isSlideshowLayout(sp) && showTexts(sp) && (utils_presentOuterInformation(sp) && sp.titlePlacement === constants.placements.SHOW_ON_HOVER || !utils_presentOuterInformation(sp));
};
var showTextSubSection = function showTextSubSection(sp) {
  return showTexts(sp);
};
var showButtonSection = function showButtonSection(sp) {
  return showInfiniteScroll(sp) && !sp.enableInfiniteScroll && isStore(sp);
};
var utils_showExpendSection = function showExpendSection(sp) {
  return sp.itemClick === constants.itemClick.EXPAND || isStore(sp);
};
var showScrollAnimations = function showScrollAnimations(sp) {
  return !utils_oneRow(sp);
};
var utils_showGallerySize = function showGallerySize(sp) {
  return (sp.galleryLayout === constants.layout.GRID || sp.galleryLayout === constants.layout.COLLAGE) && !utils_oneRow(sp) ? sp.gridStyle === 0 : [constants.layout.EMPTY, constants.layout.COLLAGE, constants.layout.MASONRY].indexOf(sp.galleryLayout) >= 0;
}; // implement

var isStore = function isStore(sp) {
  return sp.isStore;
};
var utils_showAddToCartSection = function showAddToCartSection(sp) {
  return isStore(sp) && sp.showAddToCartSection;
}; // providerApi.hasAddToCart();

var utils_canUseWatermark = function canUseWatermark(sp) {
  return isStore(sp) && sp.canUseWatermark;
}; // mediaUploaded || !isDemoImage;

var always = function always() {
  return true;
};
var isLayout = function isLayout(sp, layouts) {
  return sp.galleryLayout === -1 || layouts.indexOf(sp.galleryLayout) >= 0;
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/old/isRelevant.js


/* harmony default export */ var old_isRelevant = ({
  isStore: always,
  allowLeanGallery: function allowLeanGallery(sp) {
    return isLayout(sp, [constants.layout.GRID]);
  },
  showAddToCartSection: function showAddToCartSection(sp) {
    return isStore(sp);
  },
  canUseWatermark: function canUseWatermark(sp) {
    return isStore(sp);
  },
  galleryLayout: always,
  slideshowLoop: utils_showSlideshowSettings,
  isAutoSlideshow: utils_showAutoSlideshow,
  autoSlideshowInterval: function autoSlideshowInterval(sp) {
    return utils_showAutoSlideshow(sp) && sp.isAutoSlideshow;
  },
  slideshowInfoSize: utils_isSlideshowLayout,
  playButtonForAutoSlideShow: utils_isSlideshowLayout,
  scrollDirection: function scrollDirection(sp) {
    return [constants.layout.EMPTY, constants.layout.COLLAGE, constants.layout.GRID].indexOf(sp.galleryLayout) > -1;
  },
  isVertical: function isVertical(sp) {
    return [constants.layout.COLLAGE, constants.layout.MASONRY].indexOf(sp.galleryLayout) > -1;
  },
  isRTL: function isRTL(sp) {
    return [constants.layout.PANORAMA].indexOf(sp.galleryLayout) === -1;
  },
  allowTitle: utils_showImagesDisplaySection,
  allowDescription: utils_showImagesDisplaySection,
  allowSlideshowCounter: function allowSlideshowCounter(sp) {
    return utils_isSlideshowLayout(sp) && sp.isAutoSlideshow;
  },
  titlePlacement: function titlePlacement(sp) {
    return utils_layoutPresentOuterInformation(sp) && showTexts(sp);
  },
  hoveringBehaviour: utils_showHoveringBehaviour,
  cubeImages: utils_showThumbnailResize,
  cubeType: utils_showThumbnailResize,
  cubeRatio: function cubeRatio(sp) {
    return sp.cubeType === constants.cubeType.CROP;
  },
  gallerySliderImageRatio: function gallerySliderImageRatio(sp) {
    return sp.galleryLayout === constants.layout.SLIDER && sp.cubeType === constants.cubeType.CROP;
  },
  galleryThumbnailsAlignment: function galleryThumbnailsAlignment(sp) {
    return [constants.layout.THUMBNAIL].indexOf(sp.galleryLayout) >= 0;
  },
  thumbnailSize: function thumbnailSize(sp) {
    return [constants.layout.THUMBNAIL].indexOf(sp.galleryLayout) >= 0;
  },
  gridStyle: function gridStyle(sp) {
    return isLayout(sp, [constants.layout.GRID, constants.layout.COLLAGE]) && !utils_oneRow(sp);
  },
  gallerySizeType: utils_showGallerySize,
  gallerySize: function gallerySize(sp) {
    return utils_showGallerySize(sp) && [constants.gallerySizeType.PIXELS, constants.gallerySizeType.RATIO].indexOf(sp.gallerySizeType) < 0;
  },
  gallerySizePx: function gallerySizePx(sp) {
    return utils_showGallerySize(sp) && constants.gallerySizeType.PIXELS === sp.gallerySizeType;
  },
  gallerySizeRatio: function gallerySizeRatio(sp) {
    return utils_showGallerySize(sp) && constants.gallerySizeType.RATIO === sp.gallerySizeType;
  },
  numberOfImagesPerRow: function numberOfImagesPerRow(sp) {
    return isLayout(sp, [constants.layout.GRID, constants.layout.COLLAGE]) && !utils_oneRow(sp) && sp.gridStyle === 1;
  },
  numberOfImagesPerCol: function numberOfImagesPerCol(sp) {
    return [constants.layout.GRID].indexOf(sp.galleryLayout) >= 0 && isLayout(sp, [constants.layout.COLLAGE]) && !utils_oneRow(sp);
  },
  groupSize: function groupSize(sp) {
    return isLayout(sp, [constants.layout.COLLAGE]);
  },
  groupTypes: function groupTypes(sp) {
    return isLayout(sp, [constants.layout.COLLAGE]);
  },
  rotatingGroupTypes: function rotatingGroupTypes(sp) {
    return isLayout(sp, [constants.layout.COLLAGE]);
  },
  groupsPerStrip: function groupsPerStrip(sp) {
    return isLayout(sp, [constants.layout.COLLAGE]);
  },
  thumbnailSpacings: function thumbnailSpacings(sp) {
    return [constants.layout.EMPTY, constants.layout.THUMBNAIL].indexOf(sp.galleryLayout) > -1;
  },
  imageMargin: function imageMargin(sp) {
    return [constants.layout.EMPTY, constants.layout.COLLAGE, constants.layout.MASONRY, constants.layout.GRID, constants.layout.SLIDER, constants.layout.PANORAMA, constants.layout.COLUMN, constants.layout.BRICKS, constants.layout.MIX, constants.layout.ALTERNATE].indexOf(sp.galleryLayout) > -1;
  },
  galleryMargin: always,
  floatingImages: always,
  collageDensity: function collageDensity(sp) {
    return [constants.layout.EMPTY, constants.layout.COLLAGE].indexOf(sp.galleryLayout) >= 0;
  },
  enableInfiniteScroll: function enableInfiniteScroll(sp) {
    return [constants.layout.COLLAGE, constants.layout.MASONRY, constants.layout.GRID, constants.layout.PANORAMA].indexOf(sp.galleryLayout) > -1 && !utils_oneRow(sp);
  },
  loadMoreAmount: function loadMoreAmount(sp) {
    return [constants.layout.COLLAGE, constants.layout.MASONRY, constants.layout.GRID, constants.layout.PANORAMA].indexOf(sp.galleryLayout) > -1 && !utils_oneRow(sp) && !sp.enableInfiniteScroll;
  },
  magicLayoutSeed: function magicLayoutSeed(sp) {
    return [constants.layout.MAGIC].indexOf(sp.galleryLayout) > -1;
  },
  scrollSnap: function scrollSnap(sp) {
    return utils_isHorizontalLayout(sp);
  },
  itemClick: function itemClick(sp) {
    return !isStore(sp);
  },
  allowDownload: always,
  allowSocial: always,
  loveButton: always,
  loveCounter: function loveCounter(sp) {
    return sp.loveButton;
  },
  itemOpacity: utils_showColorOverlay,
  itemIconColorSlideshow: utils_isSlideshowLayout,
  itemIconColor: function itemIconColor(sp) {
    return !utils_isSlideshowLayout(sp);
  },
  arrowsSize: utils_isHorizontalLayout,
  arrowsColor: utils_isHorizontalLayout,
  arrowsPosition: utils_isHorizontalLayout,
  // && showOldGalleryFeaturesDesign,
  overlayAnimation: function overlayAnimation(sp) {
    return !utils_isSlideshowLayout(sp) && !(sp.titlePlacement === constants.placements.SHOW_ON_HOVER && sp.hoveringBehaviour === constants.infoBehaviourOnHover.NO_CHANGE);
  },
  imageHoverAnimation: function imageHoverAnimation(sp) {
    return !utils_isSlideshowLayout(sp);
  },
  itemFont: function itemFont(sp) {
    return showTextSubSection(sp) && sp.allowTitle && !(utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemFontColor: function itemFontColor(sp) {
    return showTextSubSection(sp) && sp.allowTitle && !(utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemFontSlideshow: function itemFontSlideshow(sp) {
    return showTextSubSection(sp) && sp.allowTitle && (utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemFontColorSlideshow: function itemFontColorSlideshow(sp) {
    return showTextSubSection(sp) && sp.allowTitle && (utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemDescriptionFont: function itemDescriptionFont(sp) {
    return showTextSubSection(sp) && sp.allowDescription && !(utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemDescriptionFontColor: function itemDescriptionFontColor(sp) {
    return showTextSubSection(sp) && sp.allowDescription && !(utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemDescriptionFontSlideshow: function itemDescriptionFontSlideshow(sp) {
    return showTextSubSection(sp) && sp.allowDescription && (utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  itemDescriptionFontColorSlideshow: function itemDescriptionFontColorSlideshow(sp) {
    return showTextSubSection(sp) && sp.allowDescription && (utils_isSlideshowLayout(sp) || utils_presentOuterInformation(sp));
  },
  galleryHorizontalAlign: function galleryHorizontalAlign(sp) {
    return showTextSubSection(sp);
  },
  // ALSO sets galleryTextAlign ---sp => showTextSubSection(sp),
  galleryVerticalAlign: function galleryVerticalAlign(sp) {
    return showTextSubSection(sp) && utils_showAlignTextVertical(sp);
  },
  textBoxFillColor: function textBoxFillColor(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp) && (sp.infoType === constants.infoType.ATTACHED_BACKGROUND || sp.infoType === constants.infoType.SEPARATED_BACKGROUND);
  },
  calculateTextBoxHeightMode: function calculateTextBoxHeightMode(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp);
  },
  calculateTextBoxWidthMode: function calculateTextBoxWidthMode(sp) {
    return showTextSubSection(sp) && utils_presentSideOuterInformation(sp);
  },
  textBoxHeight: function textBoxHeight(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp) && sp.calculateTextBoxHeightMode === constants.textBoxHeightCalculationOptions.MANUAL;
  },
  textBoxWidth: function textBoxWidth(sp) {
    return showTextSubSection(sp) && utils_presentSideOuterInformation(sp) && sp.calculateTextBoxHeightMode === constants.textBoxWidthCalculationOptions.MANUAL;
  },
  textBoxWidthPercent: function textBoxWidthPercent(sp) {
    return showTextSubSection(sp) && utils_presentSideOuterInformation(sp) && sp.calculateTextBoxWidthMode === constants.textBoxWidthCalculationOptions.PERCENT;
  },
  textImageSpace: function textImageSpace(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp) && sp.infoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  textBoxBorderRadius: function textBoxBorderRadius(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp) && sp.infoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  textBoxBorderWidth: function textBoxBorderWidth(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp) && sp.infoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  textBoxBorderColor: function textBoxBorderColor(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && utils_presentOuterInformation(sp) && sp.infoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  textsVerticalPadding: function textsVerticalPadding(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && (sp.titlePlacement !== constants.placements.SHOW_ON_HOVER || !sp.galleryVerticalAlign === 'center');
  },
  textsHorizontalPadding: function textsHorizontalPadding(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp);
  },
  titleDescriptionSpace: function titleDescriptionSpace(sp) {
    return showTextSubSection(sp) && !utils_isSlideshowLayout(sp) && sp.allowTitle && sp.allowDescription;
  },
  useCustomButton: function useCustomButton(sp) {
    return showButtonSection(sp);
  },
  customButtonText: function customButtonText(sp) {
    return showButtonSection(sp) && sp.useCustomButton;
  },
  customButtonFontForHover: function customButtonFontForHover(sp) {
    return showButtonSection(sp) && sp.useCustomButton && utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonFontColorForHover: function customButtonFontColorForHover(sp) {
    return showButtonSection(sp) && sp.useCustomButton && utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonFont: function customButtonFont(sp) {
    return showButtonSection(sp) && sp.useCustomButton && !utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonFontColor: function customButtonFontColor(sp) {
    return showButtonSection(sp) && sp.useCustomButton && !utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonColor: function customButtonColor(sp) {
    return showButtonSection(sp) && sp.useCustomButton && !utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonBorderWidth: function customButtonBorderWidth(sp) {
    return showButtonSection(sp) && sp.useCustomButton && !utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonBorderColor: function customButtonBorderColor(sp) {
    return showButtonSection(sp) && sp.useCustomButton && !utils_isTitlePlacementAlwaysShown(sp);
  },
  customButtonBorderRadius: function customButtonBorderRadius(sp) {
    return showButtonSection(sp) && sp.useCustomButton && !utils_isTitlePlacementAlwaysShown(sp);
  },
  loadMoreButtonText: function loadMoreButtonText(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  loadMoreButtonFont: function loadMoreButtonFont(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  loadMoreButtonFontColor: function loadMoreButtonFontColor(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  loadMoreButtonColor: function loadMoreButtonColor(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  loadMoreButtonBorderWidth: function loadMoreButtonBorderWidth(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  loadMoreButtonBorderColor: function loadMoreButtonBorderColor(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  loadMoreButtonBorderRadius: function loadMoreButtonBorderRadius(sp) {
    return showButtonSection(sp) && showInfiniteScroll(sp) && !sp.enableInfiniteScroll;
  },
  imageInfoType: function imageInfoType(sp) {
    return utils_presentOuterInformation(sp) && showTexts(sp);
  },
  itemBorderWidth: showItemBorderAndShadowConfig,
  itemBorderColor: showItemBorderAndShadowConfig,
  itemBorderRadius: showItemBorderAndShadowConfig,
  itemEnableShadow: utils_showShadow,
  itemShadowOpacityAndColor: function itemShadowOpacityAndColor(sp) {
    return utils_showShadow(sp) && sp.itemEnableShadow;
  },
  itemShadowBlur: function itemShadowBlur(sp) {
    return utils_showShadow(sp) && sp.itemEnableShadow;
  },
  itemShadowDirection: function itemShadowDirection(sp) {
    return utils_showShadow(sp) && sp.itemEnableShadow;
  },
  itemShadowSize: function itemShadowSize(sp) {
    return utils_showShadow(sp) && sp.itemEnableShadow;
  },
  imageLoadingMode: always,
  imageLoadingColor: function imageLoadingColor(sp) {
    return sp.imageLoadingMode === constants.loadingMode.COLOR;
  },
  expandAnimation: function expandAnimation(sp) {
    return sp.itemClick === constants.itemClick.EXPAND || isStore(sp);
  },
  scrollAnimation: function scrollAnimation(sp) {
    return showScrollAnimations(sp);
  },
  oneColorAnimationColor: function oneColorAnimationColor(sp) {
    return showScrollAnimations(sp) && sp.scrollAnimation === constants.scrollAnimations.ONE_COLOR;
  },
  allowTitleExpand: function allowTitleExpand(sp) {
    return utils_showExpendSection(sp);
  },
  allowDescriptionExpand: function allowDescriptionExpand(sp) {
    return utils_showExpendSection(sp);
  },
  allowLinkExpand: function allowLinkExpand(sp) {
    return utils_showExpendSection(sp);
  },
  expandInfoPosition: function expandInfoPosition(sp) {
    return utils_showExpendSection(sp) && !isStore(sp);
  },
  defaultShowInfoExpand: function defaultShowInfoExpand(sp) {
    return utils_showExpendSection(sp) && sp.expandInfoPosition !== 1 && !isStore(sp);
  },
  allowFullscreenExpand: function allowFullscreenExpand(sp) {
    return utils_showExpendSection(sp) && !isStore(sp);
  },
  fullscreenLoop: function fullscreenLoop(sp) {
    return utils_showExpendSection(sp) && !isStore(sp);
  },
  bgColorExpand: function bgColorExpand(sp) {
    return utils_showExpendSection(sp);
  },
  actionsColorExpand: function actionsColorExpand(sp) {
    return utils_showExpendSection(sp);
  },
  titleFontExpand: function titleFontExpand(sp) {
    return utils_showExpendSection(sp) && sp.allowTitleExpand;
  },
  titleColorExpand: function titleColorExpand(sp) {
    return utils_showExpendSection(sp) && sp.allowTitleExpand;
  },
  descriptionFontExpand: function descriptionFontExpand(sp) {
    return utils_showExpendSection(sp) && sp.allowDescriptionExpand;
  },
  descriptionColorExpand: function descriptionColorExpand(sp) {
    return utils_showExpendSection(sp) && sp.allowDescriptionExpand;
  },
  galleryAlignExpand: function galleryAlignExpand(sp) {
    return utils_showExpendSection(sp) && (sp.allowDescriptionExpand || sp.allowTitleExpand) && !isStore(sp);
  },
  addToCartBackColorExpand: function addToCartBackColorExpand(sp) {
    return utils_showExpendSection(sp) && isStore(sp);
  },
  addToCartFontExpand: function addToCartFontExpand(sp) {
    return utils_showExpendSection(sp) && utils_showAddToCartSection(sp);
  },
  addToCartColorExpand: function addToCartColorExpand(sp) {
    return utils_showExpendSection(sp) && utils_showAddToCartSection(sp);
  },
  addToCartBorderWidth: function addToCartBorderWidth(sp) {
    return utils_showExpendSection(sp) && utils_showAddToCartSection(sp);
  },
  addToCartBorderColor: function addToCartBorderColor(sp) {
    return utils_showExpendSection(sp) && utils_showAddToCartSection(sp);
  },
  addToCartButtonText: function addToCartButtonText(sp) {
    return utils_showExpendSection(sp) && utils_showAddToCartSection(sp);
  },
  imageQuality: always,
  usmToggle: always,
  usm_a: function usm_a(sp) {
    return sp.usmToggle;
  },
  usm_r: function usm_r(sp) {
    return sp.usmToggle;
  },
  usm_t: function usm_t(sp) {
    return sp.usmToggle;
  },
  hidePlay: always,
  videoPlay: always,
  videoSound: function videoSound(sp) {
    return sp.videoPlay !== constants.videoPlay.ON_CLICK;
  },
  videoSpeed: always,
  videoLoop: always
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/utils/constants.js

var constants_INPUT_TYPES = {
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  OPTIONS: "OPTIONS",
  TEXT: "TEXT",
  COLOR_PICKER: "COLOR_PICKER",
  FONT_PICKER: "FONT_PICKER",
  BUTTON: "BUTTON",
  MULTISELECT: "MULTISELECT",
  MULTIREPEAT: "MULTIREPEAT"
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/utils/utils.js

var utils_formatTitle = function formatTitle(title) {
  return title.replace(/_/g, ' ').split(' ').map(function (word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }).join(' ');
};
var utils_createOptions = function createOptions(constName) {
  return Object.entries(constants[constName]).map(function (_ref) {
    var title = _ref[0],
        value = _ref[1];
    return {
      value: value,
      title: utils_formatTitle(title)
    };
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemClick.js


/* harmony default export */ var options_itemClick = ({
  title: 'Click Action',
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.itemClick.EXPAND,
  options: utils_createOptions('itemClick'),
  description: "Specifies what happens when an item is clicked. To enable the 'expand' or 'fullscreen' options, make sure you're using the ExpandableProGallery component"
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/allowTitle.js

/* harmony default export */ var options_allowTitle = ({
  title: 'Show Title',
  description: "Allow a title to appear with each item.\n  Note that the placement of the texts (title and description) can also be changed with the option - \"titlePlacement\".",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/allowSocial.js

/* harmony default export */ var options_allowSocial = ({
  title: 'Allow Social Button',
  description: "Add a social share icon to each item. Triggers the SHARE_BUTTON_CLICKED event. When the icon is clicked,\n  several social network icons will appear on the item (currently available Facebook, Pinterest, Twitter, Tumblr and Email).\n  Note that the consumer has to handle the event triggered by this button.\n  You can use the eventListener property of the ProGallery to listen to this event and create your own implementation.",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/allowDescription.js

/* harmony default export */ var options_allowDescription = ({
  title: 'Show Description',
  description: "Allow a description to appear with each item.\n  Note that the placement of the texts (title and description) can also be changed with the option - \"titlePlacement\".",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/allowDownload.js

/* harmony default export */ var options_allowDownload = ({
  title: 'Allow Download Button',
  description: "Add a download icon to each item. Note, in iOS devices (iPad, iPod and iPhone) this option is\n  not relevant and the download button will not be shown.",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/loveButton.js

/* harmony default export */ var options_loveButton = ({
  title: 'Love button',
  description: "Choose to show love (heart) button. Can be set in all layouts.\n  Triggers the \"LOVE_BUTTON_CLICKED\" event.\n  Note that the consumer has to handle the event triggered by this button.\n  You can use the eventListener property of the ProGallery to listen to this event and create your own implementation.",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/imageMargin.js

/* harmony default export */ var options_imageMargin = ({
  title: 'Spacing Between Items',
  description: "Set the margin between items.\n    This option is not relevant to some layouts: Slideshow, Thumbnails.",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 10
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/hoveringBehaviour.js


/* harmony default export */ var options_hoveringBehaviour = ({
  title: 'Hover Effect',
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.infoBehaviourOnHover.APPEARS,
  options: utils_createOptions('infoBehaviourOnHover'),
  description: "Determines whether the info appears or disappears or always shown or never shown on when hovering over items.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/enableInfiniteScroll.js

/* harmony default export */ var options_enableInfiniteScroll = ({
  title: 'Use Infinite Scroll',
  description: "Choose Whether you want to have infinite scroll option or not. When this option is set to false the gallery will have\n  a \"Load More\". Note that the consumer will have to add the new items when the gallery requests more (\"NEED_MORE_ITEMS\" event will be emited).",
  isRelevant: function isRelevant(styleParams) {
    return !styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": true
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/cubeType.js


/* harmony default export */ var options_cubeType = ({
  title: 'Crop Type',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeImages;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.cubeType.CROP,
  options: utils_createOptions('cubeType'),
  description: "Choose between croping the image to fill it's container (\"fill\") or fiting the whole image (\"fit\").\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/cubeImages.js

/* harmony default export */ var cubeImages = ({
  title: 'Crop Images',
  description: "When true, the consumer will have the option to either crop the items to fill their containers or to fit\n  them inside (the \"FIT\" option may leave empty margins around the items).",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/cubeRatio.js
/* harmony default export */ var options_cubeRatio = ({
  title: 'Item Size Ratio',
  description: "The option sets the ratio between the width and height of the item, this is a string that will be evaluated on runtime. Use 'X%/Y%' to indicate that the ratio is responsive. e.g.\n  '1' is a square, '16/9' is a wide screen rectangle and '100%/50%' is full width and half the height of the container",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeImages;
  },
  "default": 1
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/oneRow.js

/* harmony default export */ var options_oneRow = ({
  title: 'One Row',
  description: "Choose between a vertical to horizontal scrolled gallery. Note that this option will affect\n  the availability of many other options",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/titlePlacement.js


/* harmony default export */ var options_titlePlacement = ({
  title: 'Texts Placement',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical && styleParams.groupSize === 1 && !styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.MULTISELECT,
  "default": constants.placements.SHOW_ON_HOVER,
  options: utils_createOptions('placements'),
  description: "Choose the the placement of the texts (title and description) relative to the items in the gallery. \n  Notes: \n   - this option also deals with the hover effects and may overide \"hoveringBehaviour\" when set to anything but \"SHOW_ON_HOVER\". \n   - you can select multiple values, but only one of each direction (ABOVE / BELOW, RIGHT / LEFT)\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/useCustomButton.js

/* harmony default export */ var options_useCustomButton = ({
  title: 'Buy Now Button',
  description: "\n  Choose if you want to have a \"Buy Now\" for each item (you can edit the text on the button using the \"customButtonText\" option).",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/galleryVerticalAlign.js


/* harmony default export */ var options_galleryVerticalAlign = ({
  title: 'Vertical Text Alignment',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.allowTitle || styleParams.allowDescription;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.verticalAlign.CENTER,
  options: utils_createOptions('verticalAlign'),
  description: "Choose the vertical alignment of the texts container in each item.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/galleryHorizontalAlign.js


/* harmony default export */ var options_galleryHorizontalAlign = ({
  title: 'Horizontal Text Alignment',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.allowTitle || styleParams.allowDescription;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.horizontalAlign.CENTER,
  options: utils_createOptions('horizontalAlign'),
  description: "Choose the horizontal alignment of the texts container.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/galleryMargin.js

/* harmony default export */ var galleryMargin = ({
  title: 'Gallery Spacing',
  description: "Set the margin between the gallery and it's container.",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/isVertical.js


/* harmony default export */ var options_isVertical = ({
  title: 'Layout Orientation',
  description: "Choose between a vertical to horizontal oriented gallery. Note that this option may affect\n  other (e.g: \"titlePlacement\" - you will not be able to change this option when \"isVertical\" is \"false\")",
  isRelevant: function isRelevant(styleParams) {
    return !styleParams.oneRow;
  },
  options: utils_createOptions('isVertical'),
  type: constants_INPUT_TYPES.OPTIONS,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/numberOfImagesPerRow.js

/* harmony default export */ var options_numberOfImagesPerRow = ({
  title: 'Images Per Row',
  isRelevant: function isRelevant(styleParams) {
    return !styleParams.oneRow && styleParams.isVertical && styleParams.gridStyle === 1;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 3,
  description: "This sets the number of items per row in the gallery. Note that this option relies on a number of options, the gallery must be\n    a vertical scrolled gallery (scrollDirection = 1), layout orientation (isVertical) must be set to \"true\" and gridStyle must be set to \"1\" for this option to have an effect. Currently the only supporting\n    layouts are Grid and Masonry\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/numberOfImagesPerCol.js

/* harmony default export */ var options_numberOfImagesPerCol = ({
  title: 'Images Per Column',
  description: "This option sets the number of images per a column. This option is currently supported only by Grid layout",
  type: constants_INPUT_TYPES.NUMBER,
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow;
  },
  "default": 1
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/galleryTextAlign.js


/* harmony default export */ var options_galleryTextAlign = ({
  title: 'Text alignment',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.allowTitle || styleParams.allowDescription;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.galleryTextAlign.CENTER,
  options: utils_createOptions('galleryTextAlign'),
  description: "This option sets the alignment (left, right or center) of each item in the gallery.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/videoPlay.js


/* harmony default export */ var options_videoPlay = ({
  title: 'Playing Options',
  description: "Choose when video items will start playing: On hover, on click or autoplay",
  isRelevant: function isRelevant() {
    return true;
  },
  options: utils_createOptions('videoPlay'),
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.videoPlay.HOVER
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/imageHoverAnimation.js


/* harmony default export */ var options_imageHoverAnimation = ({
  title: 'Image Hover Animation',
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.imageHoverAnimations.NO_EFFECT,
  options: utils_createOptions('imageHoverAnimations'),
  description: "Choose the image animation effect to be used when hovering on each item.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/overlayAnimation.js


/* harmony default export */ var options_overlayAnimation = ({
  title: 'Overlay Hover Animation',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.hoveringBehaviour !== constants.infoBehaviourOnHover.NO_CHANGE && styleParams.hoveringBehaviour !== constants.infoBehaviourOnHover.NEVER_SHOW;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.overlayAnimations.NO_EFFECT,
  options: utils_createOptions('overlayAnimations'),
  description: "Choose the overlay animation effect to be used when hovering over an item"
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textsHorizontalPadding.js

/* harmony default export */ var options_textsHorizontalPadding = ({
  title: 'Text horizontal padding',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.allowTitle || styleParams.allowDescription;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0,
  description: "Set the horizontal padding for the texts for each item in the gallery.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textsVerticalPadding.js

/* harmony default export */ var options_textsVerticalPadding = ({
  title: 'Text vertical padding',
  isRelevant: function isRelevant(styleParams) {
    return (styleParams.allowTitle || styleParams.allowDescription) && styleParams.titlePlacement !== constants.placements.SHOW_ON_HOVER;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0,
  description: "Set the vertical padding for the texts for each item in the gallery.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textImageSpace.js

var _GALLERY_CONSTS$place = constants.placements,
    SHOW_ABOVE = _GALLERY_CONSTS$place.SHOW_ABOVE,
    SHOW_BELOW = _GALLERY_CONSTS$place.SHOW_BELOW;
/* harmony default export */ var options_textImageSpace = ({
  title: 'Text Space From Image',
  isRelevant: function isRelevant(styleParams) {
    return (styleParams.allowTitle || styleParams.allowDescription) && styleParams.imageInfoType === constants.infoType.SEPARATED_BACKGROUND && [SHOW_ABOVE, SHOW_BELOW].indexOf(styleParams.titlePlacement) > -1;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 10,
  description: "Set the space between the item and the texts in the gallery. Note that this option is relevant\n  to galleries with texts separated from the image (texts below image or above image).\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textBoxBorderColor.js

/* harmony default export */ var options_textBoxBorderColor = ({
  title: 'Text Box Border Color',
  description: "Set the border color of the texts container for each item.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.titlePlacement !== constants.placements.SHOW_ON_HOVER && (styleParams.allowTitle || styleParams.allowDescription) && styleParams.imageInfoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  type: constants_INPUT_TYPES.COLOR_PICKER // default: 0,

});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textBoxBorderRadius.js

/* harmony default export */ var options_textBoxBorderRadius = ({
  title: 'Text Box Border Radius',
  description: "Set the border radius of the texts container for each item.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.titlePlacement !== constants.placements.SHOW_ON_HOVER && (styleParams.allowTitle || styleParams.allowDescription) && styleParams.imageInfoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textBoxBorderWidth.js

/* harmony default export */ var options_textBoxBorderWidth = ({
  title: 'Text box border width',
  description: "Set the border width of the texts container for each item.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.titlePlacement !== constants.placements.SHOW_ON_HOVER && (styleParams.allowTitle || styleParams.allowDescription) && styleParams.imageInfoType === constants.infoType.SEPARATED_BACKGROUND;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textBoxWidth.js


/* harmony default export */ var options_textBoxWidth = ({
  title: 'Text Box Width (pixels)',
  description: "Set the text box width when on the right side or on the left side.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical && styleParams.groupSize === 1 && !styleParams.oneRow && styleParams.calculateTextBoxWidthMode === constants.textBoxWidthCalculationOptions.MANUAL && hasHorizontalPlacement(styleParams.titlePlacement) && (styleParams.allowTitle || styleParams.allowDescription);
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 200,
  min: 0,
  max: 1000
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textBoxWidthPercent.js


/* harmony default export */ var options_textBoxWidthPercent = ({
  title: 'Text Box Width (percent)',
  description: "Set the text box width in percent from the column width when on the right side or on the left side.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical && styleParams.groupSize === 1 && !styleParams.oneRow && styleParams.calculateTextBoxWidthMode === constants.textBoxWidthCalculationOptions.PERCENT && hasHorizontalPlacement(styleParams.titlePlacement) && (styleParams.allowTitle || styleParams.allowDescription);
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 50,
  min: 0,
  max: 100
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/imageInfoType.js


/* harmony default export */ var options_imageInfoType = ({
  title: 'Choose info layout',
  description: "Choose the layout you want for your texts, you can choose to separate the texts and the items\n  so you can style them separately.",
  isRelevant: function isRelevant(styleParams) {
    return (styleParams.allowTitle || styleParams.allowDescription) && styleParams.groupSize === 1 && styleParams.isVertical && styleParams.titlePlacement !== constants.placements.SHOW_ON_HOVER;
  },
  options: utils_createOptions('infoType'),
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.infoType.NO_BACKGROUND
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/groupSize.js

/* harmony default export */ var options_groupSize = ({
  title: 'Max Group Size',
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.NUMBER,
  min: 0,
  max: 3,
  "default": 3,
  description: "Choose the max number of items grouping in the gallery, \"1\" for only one items per group and \"3\"(max) for up to 3 item per group.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/collageDensity.js

/* harmony default export */ var options_collageDensity = ({
  title: 'Collage Density',
  description: "Determines how dense the collaging and grouping of images will be. Note that in order for this option to take any effect,\n  the option \"groupSize\" needs to be set to more than 1",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.groupSize > 1;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0.8
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/gridStyle.js


/* harmony default export */ var options_gridStyle = ({
  title: 'Responsive Type',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.gridStyle.FIT_TO_SCREEN,
  options: utils_createOptions('gridStyle'),
  description: "Choose between adjusting the number of columns addording to the container\n  size or setting it manualyand keep it fixed.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/hasThumbnails.js

/* harmony default export */ var hasThumbnails = ({
  title: 'Slider Thumbnails',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false,
  description: "Choose if you want to have slider thumbnails in the gallery. Note that this option is relevant only\n  to galleries that render the slideShowView component.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/groupTypes.js


/* harmony default export */ var options_groupTypes = ({
  title: 'Allowed Group Types',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.groupSize > 1;
  },
  type: constants_INPUT_TYPES.MULTISELECT,
  "default": Object.keys(constants.groupTypes).toString(),
  options: utils_createOptions('groupTypes'),
  description: "The allowed group types in collage. This is an advance option that gives you more control over\n  the layout of the gallery by specifying the groups you want in the gallery (e.g: \"1\" - groups of 1 item, \"2v\" - groups of 2 vertical items\n  and more...).\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/thumbnailSize.js

/* harmony default export */ var options_thumbnailSize = ({
  title: 'Thumbnail Size',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.hasThumbnails;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 120,
  min: 80,
  max: 300,
  description: "Set the size (width and height) of each of the thumbnails in the Thumbnail layout.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/galleryThumbnailsAlignment.js

/* harmony default export */ var options_galleryThumbnailsAlignment = ({
  title: 'Thumbnails Position',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow && styleParams.hasThumbnails;
  },
  type: constants_INPUT_TYPES.TEXT,
  "default": constants.thumbnailsAlignment.BOTTOM,
  description: "Set the position of the sliding thumbnails relative to the gallery (bottom, top, left and right).\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/isRTL.js


/* harmony default export */ var options_isRTL = ({
  title: 'Layout Direction',
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.layoutDirection.LEFT_TO_RIGHT,
  options: utils_createOptions('layoutDirection'),
  description: "Set the direction of the gallery layout (right to left or left to right)"
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/scrollSnap.js

/* harmony default export */ var options_scrollSnap = ({
  title: 'Scroll Snap In Sliding Galleries',
  description: "Choose if you want the closest image to snap in to place when scrolling horizontaly",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemBorderWidth.js

/* harmony default export */ var itemBorderWidth = ({
  title: 'Item Border Width',
  description: "Set the border width for each item in the gallery .",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeType !== constants.cubeType.FIT;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemBorderRadius.js

/* harmony default export */ var itemBorderRadius = ({
  title: 'Item Border Radius',
  description: "Set the border radius for each item in the gallery.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeType !== constants.cubeType.FIT;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemBorderColor.js

/* harmony default export */ var itemBorderColor = ({
  title: 'Item Border Color',
  description: "Set the border color for each item in the gallery.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeType !== constants.cubeType.FIT;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/rotatingCropRatios.js

/* harmony default export */ var rotatingCropRatios = ({
  title: 'Rotating Crop Ratios',
  description: "Crop each image according to the corresponding crop ratio as indicated in this string. This will create a pattern of cropped images",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeImages;
  },
  type: constants_INPUT_TYPES.TEXT,
  "default": ''
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/autoSlideshowInterval.js

/* harmony default export */ var options_autoSlideshowInterval = ({
  title: 'Time Between Images',
  description: "Set an interval time when using autoSlide, to have an auto sliding gallery. ",
  min: 2,
  max: 30,
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isAutoSlideshow && styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 4
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/smartCrop.js

/* harmony default export */ var smartCrop = ({
  title: 'Smart Crop',
  description: "When set to true, items will be cropped according to their original size ratio",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeImages;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/minItemSize.js

/* harmony default export */ var minItemSize = ({
  title: 'Minimum Item Size',
  description: "Set a minimum item size for items in a group. Note that the size passed to this option is a target size and the gallery will\n  try to get as close as possible",
  type: constants_INPUT_TYPES.NUMBER,
  isRelevant: function isRelevant(styleParams) {
    return styleParams.groupSize > 1;
  },
  "default": 120
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/scrollAnimation.js


/* harmony default export */ var options_scrollAnimation = ({
  title: 'Scroll Animation',
  description: "Choose the type of animation to be used when items appear while scrolling verticaly through the gallery",
  isRelevant: function isRelevant(styleParams) {
    return !styleParams.oneRow;
  },
  options: utils_createOptions('scrollAnimations'),
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.scrollAnimations.NO_EFFECT
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/floatingImages.js

/* harmony default export */ var floatingImages = ({
  title: 'Floating Images',
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.NUMBER,
  min: 0,
  max: 1,
  step: 0.1,
  "default": 0,
  description: "Set a random offset to each image, in the boundaries of the margin.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/thumbnailSpacings.js

/* harmony default export */ var options_thumbnailSpacings = ({
  title: 'Thumbnails Spacings',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow && styleParams.hasThumbnails;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 4,
  description: "Set the spacing between thumbnails.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/slideshowLoop.js

/* harmony default export */ var slideshowLoop = ({
  title: 'Loop Images',
  description: "Choose if you want the items to loop when you reach the last item in a sliding gallery",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/arrowsSize.js

/* harmony default export */ var options_arrowsSize = ({
  title: 'Navigation Arrows Size',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow && styleParams.showArrows;
  },
  type: constants_INPUT_TYPES.NUMBER,
  min: 8,
  max: 80,
  "default": 23,
  description: "Set the size of the navigation arrows in pixels.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/titleDescriptionSpace.js

/* harmony default export */ var options_titleDescriptionSpace = ({
  title: 'Title Description Spacing',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.allowTitle && styleParams.allowDescription;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 6,
  min: 0,
  max: 50,
  description: "Set the spacing between the title and the description.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/slideshowInfoSize.js

/* harmony default export */ var options_slideshowInfoSize = ({
  title: 'Slideshow Info Section Size',
  description: "Set the size of the info section in slideshow. the item's height will be adjusted accordingly",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 200
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/textBoxHeight.js


/* harmony default export */ var options_textBoxHeight = ({
  title: 'Text Box Height (pixels)',
  description: "Set the text box Height when the texts are above or below the item",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical && styleParams.groupSize === 1 && !styleParams.oneRow && hasVerticalPlacement(styleParams.titlePlacement) && styleParams.calculateTextBoxHeightMode === constants.textBoxHeightCalculationOptions.MANUAL && (styleParams.allowTitle || styleParams.allowDescription);
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 200,
  min: 0,
  max: 1000
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/calculateTextBoxHeightMode.js



/* harmony default export */ var options_calculateTextBoxHeightMode = ({
  title: 'Text Box Height Calculation Type',
  description: "Set the calc type (manual or automatic) to use when calculating the textbox height",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical && styleParams.groupSize === 1 && !styleParams.oneRow && hasVerticalPlacement(styleParams.titlePlacement) && (styleParams.allowTitle || styleParams.allowDescription);
  },
  type: constants_INPUT_TYPES.OPTIONS,
  options: utils_createOptions('textBoxHeightCalculationOptions'),
  "default": constants.textBoxHeightCalculationOptions.AUTOMATIC
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/calculateTextBoxWidthMode.js


/* harmony default export */ var options_calculateTextBoxWidthMode = ({
  title: 'Text Box Width Units',
  description: "Set the text box width in pixels or as a percent from the column width.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.isVertical && styleParams.groupSize === 1 && !styleParams.oneRow && (styleParams.titlePlacement === constants.placements.SHOW_ON_THE_LEFT || styleParams.titlePlacement === constants.placements.SHOW_ON_THE_RIGHT) && (styleParams.allowTitle || styleParams.allowDescription);
  },
  type: constants_INPUT_TYPES.OPTIONS,
  options: utils_createOptions('textBoxWidthCalculationOptions'),
  "default": constants.textBoxWidthCalculationOptions.PERCENT
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/chooseBestGroup.js

/* harmony default export */ var chooseBestGroup = ({
  title: 'Choose Best Group',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.groupSize > 1;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": true,
  description: "When true, the gallery will choose the best way to arrange the groups according\n  to the proportions of the items.\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/imageLoadingMode.js


/* harmony default export */ var imageLoadingMode = ({
  title: 'Loading Placeholder',
  description: "Determines what is shown until the image is loaded.",
  isRelevant: function isRelevant() {
    return true;
  },
  options: utils_createOptions('loadingMode'),
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.loadingMode.BLUR
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/cropOnlyFill.js

/* harmony default export */ var cropOnlyFill = ({
  title: 'Crop Only Fill? (find a better name)',
  description: "When using cubeType (FIT), this option let you keep the image original ratio while not creating\n  margins between the image and the image container.",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.cubeImages && styleParams.cubeType === constants.cubeType.FIT;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/groupsPerStrip.js

/* harmony default export */ var options_groupsPerStrip = ({
  title: 'Groups per Row',
  isRelevant: function isRelevant(styleParams) {
    return !styleParams.oneRow && !styleParams.isVertical;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0,
  min: 0,
  max: 10,
  description: "Set the number of groups per row in the gallery (relevant only to galleries with vertical scroll).\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/fixedColumns.js

/* harmony default export */ var fixedColumns = ({
  title: 'Number Of Columns',
  description: "Set a fixed number of columns in the gallery. Note that this option relies on the options isVertical (set to \"true\")\n  and oneRow (set to \"false\").",
  isRelevant: function isRelevant(styleParams) {
    return !styleParams.oneRow && styleParams.isVertical;
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 0
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/rotatingGroupTypes.js


/* harmony default export */ var options_rotatingGroupTypes = ({
  title: 'Rotating Group Types',
  description: "Choose the order of group types to appear in rotation in a collage gallery. Note that\n  the groupSize must support the groups specified (if groupSize set to 2, you cannot use groups of 3)",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.groupSize > 1;
  },
  type: constants_INPUT_TYPES.MULTIREPEAT,
  options: utils_createOptions('groupTypes'),
  "default": ''
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/arrowsPosition.js


/* harmony default export */ var options_arrowsPosition = ({
  title: 'Navigation Arrows Position',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow && styleParams.showArrows;
  },
  type: constants_INPUT_TYPES.OPTIONS,
  "default": constants.arrowsPosition.ON_GALLERY,
  options: utils_createOptions('arrowsPosition'),
  description: "Set the position of the navigation arrows in sliders. You can choose to position the arrows on the gallery (ON_GALLERY)\n  or outside the gallery (OUTSIDE_GALLERY- in these case the gallery will margins from both sides to make room for the arrows);\n  "
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemShadowSize.js

/* harmony default export */ var options_itemShadowSize = ({
  title: 'Item Shadow Size',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.itemEnableShadow && !styleParams.oneRow && !(styleParams.cubeImages && styleParams.cubeType === constants.cubeType.FIT) && (styleParams.imageInfoType === constants.infoType.ATTACHED_BACKGROUND || styleParams.titlePlacement === constants.placements.SHOW_ON_HOVER);
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 10
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemShadowBlur.js

/* harmony default export */ var options_itemShadowBlur = ({
  title: 'Item Shadow Blur',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.itemEnableShadow && !styleParams.oneRow && !(styleParams.cubeImages && styleParams.cubeType === constants.cubeType.FIT) && (styleParams.imageInfoType === constants.infoType.ATTACHED_BACKGROUND || styleParams.titlePlacement === constants.placements.SHOW_ON_HOVER);
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 20
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemShadowDirection.js

/* harmony default export */ var options_itemShadowDirection = ({
  title: 'Item Shadow Direction',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.itemEnableShadow && !styleParams.oneRow && !(styleParams.cubeImages && styleParams.cubeType === constants.cubeType.FIT) && (styleParams.imageInfoType === constants.infoType.ATTACHED_BACKGROUND || styleParams.titlePlacement === constants.placements.SHOW_ON_HOVER);
  },
  type: constants_INPUT_TYPES.NUMBER,
  "default": 135
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemShadowOpacityAndColor.js

/* harmony default export */ var options_itemShadowOpacityAndColor = ({
  title: 'Item Shadow Direction',
  isRelevant: function isRelevant(styleParams) {
    return styleParams.itemEnableShadow && !styleParams.oneRow && !(styleParams.cubeImages && styleParams.cubeType === constants.cubeType.FIT) && (styleParams.imageInfoType === constants.infoType.ATTACHED_BACKGROUND || styleParams.titlePlacement === constants.placements.SHOW_ON_HOVER);
  },
  type: constants_INPUT_TYPES.COLOR_PICKER,
  "default": {
    value: 'rgba(0,0,0,.3)'
  }
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/itemEnableShadow.js

/* harmony default export */ var itemEnableShadow = ({
  title: 'Enable Item Shadow',
  isRelevant: function isRelevant(styleParams) {
    return !(styleParams.cubeImages && styleParams.cubeType === constants.cubeType.FIT) && (styleParams.imageInfoType === constants.infoType.ATTACHED_BACKGROUND || styleParams.titlePlacement === constants.placements.SHOW_ON_HOVER);
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": false
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/videoLoop.js

/* harmony default export */ var videoLoop = ({
  title: 'Loop Videos',
  description: "When true videos will be played in a loop",
  isRelevant: function isRelevant() {
    return true;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": true
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/options/showArrows.js

/* harmony default export */ var options_showArrows = ({
  title: 'Show Navigation Arrows',
  description: "Choose if you want to have navigation arrows in a sliding gallery",
  isRelevant: function isRelevant(styleParams) {
    return styleParams.oneRow;
  },
  type: constants_INPUT_TYPES.BOOLEAN,
  "default": true
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/index.js










































































/* harmony default export */ var src_settings = ({
  itemClick: options_itemClick,
  allowTitle: options_allowTitle,
  allowDescription: options_allowDescription,
  loveButton: options_loveButton,
  allowSocial: options_allowSocial,
  allowDownload: options_allowDownload,
  imageMargin: options_imageMargin,
  hoveringBehaviour: options_hoveringBehaviour,
  enableInfiniteScroll: options_enableInfiniteScroll,
  cubeType: options_cubeType,
  cubeImages: cubeImages,
  cubeRatio: options_cubeRatio,
  oneRow: options_oneRow,
  titlePlacement: options_titlePlacement,
  useCustomButton: options_useCustomButton,
  galleryVerticalAlign: options_galleryVerticalAlign,
  galleryHorizontalAlign: options_galleryHorizontalAlign,
  galleryMargin: galleryMargin,
  isVertical: options_isVertical,
  numberOfImagesPerRow: options_numberOfImagesPerRow,
  numberOfImagesPerCol: options_numberOfImagesPerCol,
  galleryTextAlign: options_galleryTextAlign,
  videoPlay: options_videoPlay,
  imageHoverAnimation: options_imageHoverAnimation,
  overlayAnimation: options_overlayAnimation,
  textsHorizontalPadding: options_textsHorizontalPadding,
  textsVerticalPadding: options_textsVerticalPadding,
  textImageSpace: options_textImageSpace,
  textBoxBorderColor: options_textBoxBorderColor,
  textBoxBorderRadius: options_textBoxBorderRadius,
  textBoxBorderWidth: options_textBoxBorderWidth,
  textBoxWidth: options_textBoxWidth,
  textBoxWidthPercent: options_textBoxWidthPercent,
  imageInfoType: options_imageInfoType,
  groupSize: options_groupSize,
  collageDensity: options_collageDensity,
  gridStyle: options_gridStyle,
  hasThumbnails: hasThumbnails,
  groupTypes: options_groupTypes,
  thumbnailSize: options_thumbnailSize,
  galleryThumbnailsAlignment: options_galleryThumbnailsAlignment,
  isRTL: options_isRTL,
  scrollSnap: options_scrollSnap,
  itemBorderWidth: itemBorderWidth,
  itemBorderRadius: itemBorderRadius,
  itemBorderColor: itemBorderColor,
  rotatingCropRatios: rotatingCropRatios,
  autoSlideshowInterval: options_autoSlideshowInterval,
  smartCrop: smartCrop,
  minItemSize: minItemSize,
  scrollAnimation: options_scrollAnimation,
  floatingImages: floatingImages,
  thumbnailSpacings: options_thumbnailSpacings,
  slideshowLoop: slideshowLoop,
  arrowsSize: options_arrowsSize,
  titleDescriptionSpace: options_titleDescriptionSpace,
  slideshowInfoSize: options_slideshowInfoSize,
  textBoxHeight: options_textBoxHeight,
  calculateTextBoxHeightMode: options_calculateTextBoxHeightMode,
  calculateTextBoxWidthMode: options_calculateTextBoxWidthMode,
  chooseBestGroup: chooseBestGroup,
  imageLoadingMode: imageLoadingMode,
  cropOnlyFill: cropOnlyFill,
  groupsPerStrip: options_groupsPerStrip,
  fixedColumns: fixedColumns,
  rotatingGroupTypes: options_rotatingGroupTypes,
  arrowsPosition: options_arrowsPosition,
  itemShadowSize: options_itemShadowSize,
  itemShadowBlur: options_itemShadowBlur,
  itemShadowDirection: options_itemShadowDirection,
  itemShadowOpacityAndColor: options_itemShadowOpacityAndColor,
  itemEnableShadow: itemEnableShadow,
  videoLoop: videoLoop,
  showArrows: options_showArrows
});
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/settings/merged.js
function merged_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function merged_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { merged_ownKeys(Object(source), true).forEach(function (key) { merged_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { merged_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function merged_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var styleList = [].concat(Array.from(new Set([].concat(Object.keys(src_settings), Object.keys(old_isRelevant), Object.keys(content)))));
var mergedSettings = styleList.reduce(function (obj, styleParam) {
  var _objectSpread2;

  var settingsData = src_settings[styleParam] || merged_objectSpread(merged_objectSpread(merged_objectSpread({
    styleParam: styleParam,
    isRelevant: old_isRelevant[styleParam]
  }, content[styleParam]), dataTypes[styleParam]), {}, {
    "default": defaultStyles[styleParam],
    isOld: true
  });

  return merged_objectSpread(merged_objectSpread({}, obj), {}, (_objectSpread2 = {}, _objectSpread2[styleParam] = settingsData, _objectSpread2));
}, {});
/* harmony default export */ var merged = (mergedSettings);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/svgs/components/x.js
function x_extends() { x_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return x_extends.apply(this, arguments); }

function x_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable */

/* tslint:disable */


var x_x = function x(_ref) {
  var size = _ref.size,
      props = x_objectWithoutPropertiesLoose(_ref, ["size"]);

  return /*#__PURE__*/react_default.a.createElement("svg", x_extends({
    viewBox: "0 0 15 15",
    fill: "currentColor",
    width: size || "15",
    height: size || "15"
  }, props), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M15 0.6L14.4 0 7.5 6.9 0.6 0 0 0.6 6.9 7.5 0 14.4 0.6 15 7.5 8.1 14.4 15 15 14.4 8.1 7.5z",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
};

x_x.displayName = 'x';
/* harmony default export */ var components_x = (x_x);
/* tslint:enable */

/* eslint-enable */
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/presets/expandableGallery.js
function expandableGallery_extends() { expandableGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return expandableGallery_extends.apply(this, arguments); }

function expandableGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function expandableGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { expandableGallery_ownKeys(Object(source), true).forEach(function (key) { expandableGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { expandableGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function expandableGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function expandableGallery_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function expandableGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



 // import CLICK_ACTIONS from '../../../common/constants/itemClick';


var expandableGallery_styles = {
  gallery: {},
  fullscreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9,
    background: 'white',
    opacity: 0,
    transition: 'opacity 2s ease',
    visibility: 'hidden'
  },
  shown: {
    visibility: 'visible',
    opacity: 1
  },
  close: {
    boxSizing: 'content-box',
    zIndex: 10,
    padding: 10,
    position: 'fixed',
    right: 20,
    top: 20,
    background: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
    width: 25,
    height: 25,
    fill: 'black',
    cursor: 'pointer'
  }
};

var expandableGallery_ExpandableProGallery = /*#__PURE__*/function (_React$Component) {
  expandableGallery_inheritsLoose(ExpandableProGallery, _React$Component);

  function ExpandableProGallery(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.eventListener = _this.eventListener.bind(expandableGallery_assertThisInitialized(_this));
    _this.state = {
      fullscreenIdx: -1
    };
    return _this;
  }

  var _proto = ExpandableProGallery.prototype;

  _proto.eventListener = function eventListener(eventName, eventData) {
    switch (eventName) {
      case events.ITEM_ACTION_TRIGGERED:
        this.setState({
          fullscreenIdx: eventData.idx
        });
        break;

      default:
        console.log({
          eventName: eventName,
          eventData: eventData
        });
        break;
    }

    if (typeof this.props.eventsListener === 'function') {
      this.props.eventsListener(eventName, eventData);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("section", {
      style: expandableGallery_objectSpread(expandableGallery_objectSpread({}, expandableGallery_styles.gallery), {}, {
        display: this.state.fullscreenIdx < 0 ? 'block' : 'none'
      })
    }, /*#__PURE__*/react_default.a.createElement(gallery_BaseGallery, expandableGallery_extends({}, this.props, {
      key: "pro-gallery-" + this.props.domId,
      domId: "pro-gallery-" + this.props.domId,
      eventsListener: this.eventListener
    }))), this.state.fullscreenIdx < 0 ? null : /*#__PURE__*/react_default.a.createElement("section", {
      style: expandableGallery_objectSpread(expandableGallery_objectSpread({}, expandableGallery_styles.fullscreen), this.state.fullscreenIdx >= 0 && expandableGallery_styles.shown)
    }, /*#__PURE__*/react_default.a.createElement(components_x, {
      style: expandableGallery_styles.close,
      onClick: function onClick() {
        return _this2.setState({
          fullscreenIdx: -1
        });
      }
    }), /*#__PURE__*/react_default.a.createElement(gallery_BaseGallery, expandableGallery_extends({}, this.props, {
      key: "pro-fullscreen-" + this.props.domId,
      domId: "pro-fullscreen-" + this.props.domId,
      currentIdx: this.state.fullscreenIdx,
      container: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      styles: expandableGallery_objectSpread(expandableGallery_objectSpread({}, this.props.options || this.props.styles), {}, {
        galleryLayout: 5,
        slideshowInfoSize: 0,
        cubeType: 'fit',
        scrollSnap: true
      })
    }))));
  };

  return ExpandableProGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/index.js













/***/ })

};;