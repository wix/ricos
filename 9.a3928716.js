exports.ids = [9];
exports.modules = {

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_dcf7dedf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony import */ var wix_rich_content_viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(150);
/* harmony import */ var wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
function imageEntryToGallery(data,index){var src=data.src,url=src.file_name,metadata=data.metadata;return{metadata:{height:src.height,width:src.width,title:metadata&&metadata.caption||"",altText:metadata&&metadata.alt||""},itemId:src.id||url+index,url:url}}function convertEntryToGalleryItems(entry,index){switch(entry.type){case"wix-draft-plugin-image":case"IMAGE":return entry.data.src?[imageEntryToGallery(entry.data,index)]:[];case"wix-draft-plugin-gallery":return entry.data.items;default:return[]}}var getImagesData_cjs=function(_ref){var entityMap=_ref.entityMap,sum=0,imageMap={};return{images:Object.values(entityMap).map(convertEntryToGalleryItems).reduce((function(urls,entryUrls,i){return entryUrls.length>0&&(imageMap[i]=sum),sum+=entryUrls.length,urls.concat(entryUrls)}),[]),imageMap:imageMap}};function createCommonjsModule(fn,module){return fn(module={exports:{}},module.exports),module.exports}var _extends_1=createCommonjsModule((function(module){function _extends(){return module.exports=_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}module.exports=_extends}));function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var _ref=Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g",{fill:"none",fillRule:"evenodd"},Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{fill:"#FFF",d:"M0 0h60v60H0z"}),Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{fill:"#000",d:"M42.188 17l.812.813L30.812 30 43 42.188l-.813.812L30 30.812 17.812 43 17 42.187 29.187 30 17 17.812l.813-.812L30 29.187 42.188 17z"}));function _extends$1(){return(_extends$1=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var _ref$1=Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g",{fill:"none",fillRule:"evenodd"},Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{fill:"#FFF",d:"M0 0h60v60H0z"}),Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g",{fill:"#1B1B1B"},Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{d:"M25.704 33.53l.764.764-8.427 8.426-.763-.763zM43 25h-1v-7h-7v-1h8v8z"}),Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{d:"M41.955 17.279l.765.766-8.426 8.426-.766-.766zM17 43v-8h1v7h7v1h-8z"})));function SvgExpand(props){return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg",_extends$1({width:60,height:60,viewBox:"0 0 60 60",style:{background:"#fff"}},props),_ref$1)}function _extends$2(){return(_extends$2=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}var _ref$2=Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g",{fill:"none",fillRule:"evenodd"},Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{fill:"#FFF",d:"M0 0h60v60H0z"}),Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g",{fill:"#1B1B1B"},Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{d:"M17.764 43L17 42.236l8.427-8.426.763.763zM33 18.833h1v7h7v1h-8v-8z"}),Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path",{d:"M34.045 26.554l-.765-.766 8.426-8.426.766.766zM26.468 33.53v8h-1v-7h-7v-1h8z"})));function SvgShrink(props){return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg",_extends$2({width:60,height:60,viewBox:"0 0 60 60"},props),_ref$2)}var x,module,layouts=[{showArrows:!1,cubeImages:!1,groupSize:3,groupTypes:"1,2h,2v,3t,3b,3l,3r",fixedColumns:0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,isVertical:!0,cropOnlyFill:!1,oneRow:!1,galleryType:"Columns",imageMargin:20,gallerySizePx:"300"},{showArrows:!1,cubeImages:!1,groupSize:1,groupTypes:"1",fixedColumns:0,numberOfImagesPerRow:0,imageMargin:20,gallerySizePx:"300",gridStyle:0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,cropOnlyFill:!1,oneRow:!1},{showArrows:!1,cubeImages:!0,smartCrop:!1,imageResize:!1,galleryImageRatio:2,numberOfImagesPerRow:3,imageMargin:20,cubeType:"fill",cubeRatio:1,isVertical:!0,galleryType:"Columns",groupSize:1,groupTypes:"1",fixedColumns:void 0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,cropOnlyFill:!1,isSlider:!1,isColumns:!1,isGrid:!0,isSlideshow:!1,minItemSize:50,oneRow:!1},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeType:"fill",cubeRatio:1,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",oneRow:!0,hasThumbnails:!0,galleryThumbnailsAlignment:"bottom",enableScroll:!1,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,cropOnlyFill:!1,floatingImages:0,thumbnailSpacings:0,galleryMargin:0},{showArrows:!0,cubeImages:!0,smartCrop:!1,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",oneRow:!0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isSlider:!0,isColumns:!1,isSlideshow:!1,cropOnlyFill:!0,imageMargin:20,cubeType:"fit",cubeRatio:"16/9"},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeRatio:1,cubeType:"fit",isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",fixedColumns:1,oneRow:!0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!1,isGrid:!1,isColumns:!1,isSlider:!1,isSlideshow:!0,cropOnlyFill:!1,floatingImages:0,galleryMargin:0,imageMargin:0,slideShowInfoSize:0},{showArrows:!1,cubeImages:!1,isVertical:!0,galleryType:"Columns",groupSize:1,groupTypes:"1",oneRow:!1,fixedColumns:1,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!0,isGrid:!1,isColumns:!1,isSlider:!1,isSlideshow:!1,cropOnlyFill:!1,imageMargin:20},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeType:"fill",cubeRatio:.35,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",fixedColumns:0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",oneRow:!0,enableScroll:!0,isGrid:!1,isColumns:!0,isSlider:!1,isSlideshow:!1,cropOnlyFill:!1,imageMargin:20},{},{showArrows:!0,cubeImages:!0,smartCrop:!1,cubeType:"fill",cubeRatio:1,isVertical:!1,galleryType:"Strips",groupSize:1,groupTypes:"1",oneRow:!0,hasThumbnails:!1,galleryThumbnailsAlignment:"none",enableScroll:!1,isGrid:!1,isSlider:!1,isColumns:!1,isSlideshow:!1,cropOnlyFill:!1,floatingImages:0,galleryMargin:0,imageMargin:0}],imageClientSDK=(function(module,exports){module.exports=function(e){var t={};function a(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(i,r,function(t){return e[t]}.bind(null,r));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=15)}([function(e,t,a){var i={JPG:"jpg",JPEG:"jpeg",PNG:"png",WEBP:"webp",WIX_ICO_MP:"wix_ico_mp",WIX_MP:"wix_mp",GIF:"gif",SVG:"svg",UNRECOGNIZED:"unrecognized"},r=[i.JPG,i.JPEG,i.PNG,i.GIF,i.WEBP];e.exports={alignTypes:{CENTER:"center",TOP:"top",TOP_LEFT:"top_left",TOP_RIGHT:"top_right",BOTTOM:"bottom",BOTTOM_LEFT:"bottom_left",BOTTOM_RIGHT:"bottom_right",LEFT:"left",RIGHT:"right"},alignTypesMap:{center:"c",top:"t",top_left:"tl",top_right:"tr",bottom:"b",bottom_left:"bl",bottom_right:"br",left:"l",right:"r"},transformTypes:{FIT:"fit",FILL:"fill",FILL_FOCAL:"fill_focal",CROP:"crop",LEGACY_CROP:"legacy_crop",LEGACY_FILL:"legacy_fill"},fittingTypes:{SCALE_TO_FILL:"fill",SCALE_TO_FIT:"fit",STRETCH:"stretch",ORIGINAL_SIZE:"original_size",TILE:"tile",TILE_HORIZONTAL:"tile_horizontal",TILE_VERTICAL:"tile_vertical",FIT_AND_TILE:"fit_and_tile",LEGACY_STRIP_TILE:"legacy_strip_tile",LEGACY_STRIP_TILE_HORIZONTAL:"legacy_strip_tile_horizontal",LEGACY_STRIP_TILE_VERTICAL:"legacy_strip_tile_vertical",LEGACY_STRIP_SCALE_TO_FILL:"legacy_strip_fill",LEGACY_STRIP_SCALE_TO_FIT:"legacy_strip_fit",LEGACY_STRIP_FIT_AND_TILE:"legacy_strip_fit_and_tile",LEGACY_STRIP_ORIGINAL_SIZE:"legacy_strip_original_size",LEGACY_ORIGINAL_SIZE:"actual_size",LEGACY_FIT_WIDTH:"fitWidth",LEGACY_FIT_HEIGHT:"fitHeight",LEGACY_FULL:"full",LEGACY_BG_FIT_AND_TILE:"legacy_tile",LEGACY_BG_FIT_AND_TILE_HORIZONTAL:"legacy_tile_horizontal",LEGACY_BG_FIT_AND_TILE_VERTICAL:"legacy_tile_vertical",LEGACY_BG_NORMAL:"legacy_normal"},htmlTag:{BG:"bg",IMG:"img",SVG:"svg"},upscaleMethods:{AUTO:"auto",CLASSIC:"classic",SUPER:"super"},upscaleMethodsValues:{classic:1,super:2},defaultUSM:{radius:.66,amount:1,threshold:.01},emptyData:{uri:"",css:{img:{},container:{}},attr:{img:{},container:{}}},imageQuality:{HIGH:"HIGH",MEDIUM:"MEDIUM",LOW:"LOW",TINY:"TINY"},imageFilters:{CONTRAST:"contrast",BRIGHTNESS:"brightness",SATURATION:"saturation",HUE:"hue",BLUR:"blur"},imageScaleDefaults:{HIGH:{size:196e4,quality:90,maxUpscale:1},MEDIUM:{size:36e4,quality:85,maxUpscale:1},LOW:{size:16e4,quality:80,maxUpscale:1.2},TINY:{size:0,quality:80,maxUpscale:1.4}},fileType:i,supportedExtensions:r,webp:{LOSSLESS:"lossless",LOSSY:"lossy",ALPHA:"alpha",ANIMATION:"animation"},SAFE_TRANSFORMED_AREA:25e6,SUPER_UPSCALE_MODELS:[1.5,2,4],MAX_DEVICE_PIXEL_RATIO:2,API_VERSION:"v1"}},function(e,t,a){var i=a(2),r=a(0),n=a(4);function s(e){var t=new window.Image;t.onload=function(){var a=n.getFeature("isWEBP");a[e]=t.width>0&&t.height>0,n.setFeature("isWEBP",a)},t.src="data:image/webp;base64,"+{lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"}[e]}function o(e){var t=[r.fileType.PNG,r.fileType.JPEG,r.fileType.JPG,r.fileType.WIX_ICO_MP,r.fileType.WIX_MP];return i.includes(t,u(e))}function l(e){return i.includes(["webp"],u(e))}function c(e){return/(^https?)|(^data)|(^\/\/)/.test(e)}function u(e){return(/[.]([^.]+)$/.exec(e)&&/[.]([^.]+)$/.exec(e)[1]||"").toLowerCase()}function p(e,t,a,i,n){return n===r.transformTypes.FILL?function(e,t,a,i){return Math.max(a/e,i/t)}(e,t,a,i):n===r.transformTypes.FIT?function(e,t,a,i){return Math.min(a/e,i/t)}(e,t,a,i):1}function h(e,t){var a=T(e,t);return{optimizedScaleFactor:r.imageScaleDefaults[a].maxUpscale,upscaleMethodValue:r.upscaleMethodsValues.classic,forceUSM:!1}}function f(e,t){var a=T(e,t);return{optimizedScaleFactor:r.imageScaleDefaults[a].maxUpscale,upscaleMethodValue:r.upscaleMethodsValues.classic,forceUSM:!1}}function g(e,t,a){return{optimizedScaleFactor:i.last(r.SUPER_UPSCALE_MODELS),upscaleMethodValue:r.upscaleMethodsValues.super,forceUSM:!(r.SUPER_UPSCALE_MODELS.includes(a)||a>i.last(r.SUPER_UPSCALE_MODELS))}}function T(e,t){var a=e*t;return a>r.imageScaleDefaults[r.imageQuality.HIGH].size?r.imageQuality.HIGH:a>r.imageScaleDefaults[r.imageQuality.MEDIUM].size?r.imageQuality.MEDIUM:a>r.imageScaleDefaults[r.imageQuality.LOW].size?r.imageQuality.LOW:r.imageQuality.TINY}function A(e,t){var a=Math.pow(10,t||0);return(e*a/a).toFixed(parseInt(t,10))}e.exports={populateGlobalFeatureSupport:function(){"undefined"!=typeof window&&(s(r.webp.LOSSY),s(r.webp.LOSSLESS),s(r.webp.ALPHA),s(r.webp.ANIMATION),n.setFeature("isObjectFitBrowser","objectFit"in window.document.documentElement.style))},isWEBPBrowserSupport:function(e){var t=n.getFeature("isWEBP"),a=e===r.fileType.JPG&&t[r.webp.LOSSY],i=e===r.fileType.PNG&&t[r.webp.LOSSLESS],s=e===r.fileType.PNG&&t[r.webp.ALPHA];return a||i&&s},isObjectFitBrowserSupport:function(){return n.getFeature("isObjectFitBrowser")},isImageTransformApplicable:function(e){return o(e)&&!c(e)},isValidRequest:function(e,t,a){return a&&t&&!(!(n=t.id)||!n.trim()||"none"===n.toLowerCase())&&i.includes(r.fittingTypes,e);var n},isImageTypeSupported:o,isExternalUrl:c,isWEBP:l,getFileType:function(e){return function(e){return i.includes(["jpg","jpeg"],u(e))}(e)?r.fileType.JPG:function(e){return i.includes(["png"],u(e))}(e)?r.fileType.PNG:l(e)?r.fileType.WEBP:r.fileType.UNRECOGNIZED},getFileExtension:u,getFileName:function(e,t){var a=/\.([^.]*)$/;if("string"==typeof t&&t.length){var n=["/","\\","?","<",">","|","“",":",'"'].map(encodeURIComponent),s=new RegExp("("+n.concat(["\\.","\\*"]).join("|")+")","g"),o=t,l=t.match(a);return l&&i.includes(r.supportedExtensions,l[1])&&(o=t.replace(a,"")),encodeURIComponent(o).replace(s,"_")}var c=e.match(/\/(.*?)$/);return(c?c[1]:e).replace(a,"")},getAlignedRect:function(e,t,a){var i=void 0,n=void 0;switch(a){case r.alignTypes.CENTER:i=Math.max(0,(e.width-t.width)/2),n=Math.max(0,(e.height-t.height)/2);break;case r.alignTypes.TOP:i=Math.max(0,(e.width-t.width)/2),n=0;break;case r.alignTypes.TOP_LEFT:i=0,n=0;break;case r.alignTypes.TOP_RIGHT:i=Math.max(0,e.width-t.width),n=0;break;case r.alignTypes.BOTTOM:i=Math.max(0,(e.width-t.width)/2),n=Math.max(0,e.height-t.height);break;case r.alignTypes.BOTTOM_LEFT:i=0,n=Math.max(0,e.height-t.height);break;case r.alignTypes.BOTTOM_RIGHT:i=Math.max(0,e.width-t.width),n=Math.max(0,e.height-t.height);break;case r.alignTypes.LEFT:i=0,n=Math.max(0,(e.height-t.height)/2);break;case r.alignTypes.RIGHT:i=Math.max(0,e.width-t.width),n=Math.max(0,(e.height-t.height)/2)}return{x:e.x?e.x+i:i,y:e.y?e.y+n:n,width:Math.min(e.width,t.width),height:Math.min(e.height,t.height)}},getOverlappingRect:function(e,t){var a=Math.max(0,Math.min(e.width,t.x+t.width)-Math.max(0,t.x)),i=Math.max(0,Math.min(e.height,t.y+t.height)-Math.max(0,t.y));return a&&i&&(e.width!==a||e.height!==i)?{x:Math.max(0,t.x),y:Math.max(0,t.y),width:a,height:i}:null},getScaleFactor:p,getTransformData:function(e,t,a,i,n){e=e||a.width,t=t||a.height;var s=function(e){return Math.min(e.pixelAspectRatio||1,r.MAX_DEVICE_PIXEL_RATIO)}(a),o=function(e,t,a,i,n){var s=void 0,o=void 0,l=void 0;if(s=p(e,t,a,i,n),n===r.transformTypes.FILL?(o=a,l=i):n===r.transformTypes.FIT&&(o=e*s,l=t*s),o*l>r.SAFE_TRANSFORMED_AREA){var c=Math.sqrt(r.SAFE_TRANSFORMED_AREA/(o*l));s=p(e,t,o*=c,l*=c,n)}return{scaleFactor:s,width:o,height:l}}(e,t,a.width*s,a.height*s,i),l=o.scaleFactor;return function(e,t,a,i,n,s,o){var l=function(e,t,a,i){return{classic:h,auto:f,super:g}[i](e,t,a)}(e,t,s,n),c=l.optimizedScaleFactor,u=l.upscaleMethodValue,p=l.forceUSM;if(s<=c)return{width:a,height:i,scaleFactor:s,upscaleMethodValue:u,forceUSM:p,cssUpscaleNeeded:!1};var T=void 0,A=void 0;switch(o){case r.transformTypes.FILL:T=a*(c/s),A=i*(c/s);break;case r.transformTypes.FIT:T=e*c,A=t*c}return{width:T,height:A,scaleFactor:c,upscaleMethodValue:u,forceUSM:p,cssUpscaleNeeded:!0}}(e,t,o.width,o.height,n,l,i)},getAlignment:function(e){return r.alignTypesMap[e.alignment]||r.alignTypesMap[r.alignTypes.CENTER]},getPreferredImageQuality:function(e,t){return r.imageScaleDefaults[T(e,t)].quality},getDimension:function(e,t,a,i,r){var n=p(e,t,a,i,r);return{width:Math.round(e*n),height:Math.round(t*n)}},getFocalPoint:function(e){var t=null;return"number"!=typeof e.x||isNaN(e.x)||"number"!=typeof e.y||isNaN(e.y)||(t={x:A(Math.max(0,Math.min(100,e.x))/100,2),y:A(Math.max(0,Math.min(100,e.y))/100,2)}),t},getUpscaleString:function(e){return e&&e.upscaleMethod&&"string"==typeof e.upscaleMethod&&r.upscaleMethods[e.upscaleMethod.toUpperCase()]||r.upscaleMethods.AUTO},roundToFixed:A}},function(e,t,a){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports={assign:function(){for(var e=arguments[0]||{},t=Array.prototype.slice.call(arguments,1,arguments.length),a=0;a<t.length;a++){var i=t[a];for(var r in i)i.hasOwnProperty(r)&&(e[r]=i[r])}return e},includes:function(e,t){return e.indexOf?e.indexOf(t)>-1:!(!e||"object"!==(void 0===e?"undefined":i(e)))&&Object.keys(e).some((function(a){return e[a]===t}))},last:function(e){return e[e.length-1]},template:function(e){return function(t){var a=e;for(var i in t)t.hasOwnProperty(i)&&(a=a.replace(new RegExp("\\${"+i+"}","g"),t[i]));return a}}}},function(e,t,a){var i=a(1),r=a(5),n=a(6);e.exports=function(e,t,a,s){var o=i.getFileType(t.id),l={fileName:i.getFileName(t.id,t.name),fileExtension:i.getFileExtension(t.id),fileType:o,isWEBPSupport:i.isWEBPBrowserSupport(o),fittingType:e,src:{id:t.id,width:t.width,height:t.height,isCropped:!1},focalPoint:{x:t.focalPoint&&t.focalPoint.x,y:t.focalPoint&&t.focalPoint.y},parts:[],quality:0,upscaleMethod:i.getUpscaleString(s),progressive:!0,watermark:"",unsharpMask:{},filters:{}};return i.isImageTransformApplicable(t.id)&&(r.setTransformParts(l,t,a),n.setTransformOptions(l,s)),l}},function(e,t,a){var i={isWEBP:{lossless:!1,lossy:!1,alpha:!1,animation:!1},isObjectFitBrowser:!0};e.exports={getFeature:function(e){return i[e]},setFeature:function(e,t){i[e]=t}}},function(e,t,a){var i=a(2),r=a(0),n=a(1);function s(e,t){var a=n.getTransformData(e.src.width,e.src.height,t,r.transformTypes.FIT,e.upscaleMethod);return{transformType:r.transformTypes.FILL,width:Math.round(a.width),height:Math.round(a.height),alignment:r.alignTypesMap.center,upscale:a.scaleFactor>1,forceUSM:a.forceUSM,scaleFactor:a.scaleFactor,cssUpscaleNeeded:a.cssUpscaleNeeded,upscaleMethodValue:a.upscaleMethodValue}}function o(e){return{transformType:r.transformTypes.CROP,x:Math.round(e.x),y:Math.round(e.y),width:Math.round(e.width),height:Math.round(e.height),upscale:!1,forceUSM:!1,scaleFactor:1,cssUpscaleNeeded:!1}}e.exports={setTransformParts:function(e,t,a){var l=void 0;switch(t.crop&&(l=n.getOverlappingRect(t,t.crop))&&(e.src.width=l.width,e.src.height=l.height,e.src.cropped=!0,e.parts.push(o(l))),e.fittingType){case r.fittingTypes.SCALE_TO_FIT:case r.fittingTypes.LEGACY_FIT_WIDTH:case r.fittingTypes.LEGACY_FIT_HEIGHT:case r.fittingTypes.LEGACY_FULL:case r.fittingTypes.FIT_AND_TILE:case r.fittingTypes.LEGACY_BG_FIT_AND_TILE:case r.fittingTypes.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:case r.fittingTypes.LEGACY_BG_FIT_AND_TILE_VERTICAL:case r.fittingTypes.LEGACY_BG_NORMAL:e.parts.push(s(e,a));break;case r.fittingTypes.SCALE_TO_FILL:e.parts.push(function(e,t){var a=n.getTransformData(e.src.width,e.src.height,t,r.transformTypes.FILL,e.upscaleMethod),i=n.getFocalPoint(e.focalPoint);return{transformType:i?r.transformTypes.FILL_FOCAL:r.transformTypes.FILL,width:Math.round(a.width),height:Math.round(a.height),alignment:n.getAlignment(t),focalPointX:i&&i.x,focalPointY:i&&i.y,upscale:a.scaleFactor>1,forceUSM:a.forceUSM,scaleFactor:a.scaleFactor,cssUpscaleNeeded:a.cssUpscaleNeeded,upscaleMethodValue:a.upscaleMethodValue}}(e,a));break;case r.fittingTypes.STRETCH:e.parts.push(function(e,t){var a=n.getScaleFactor(e.src.width,e.src.height,t.width,t.height,r.transformTypes.FILL),o=i.assign({},t);return o.width=e.src.width*a,o.height=e.src.height*a,s(e,o)}(e,a));break;case r.fittingTypes.TILE_HORIZONTAL:case r.fittingTypes.TILE_VERTICAL:case r.fittingTypes.TILE:case r.fittingTypes.LEGACY_ORIGINAL_SIZE:case r.fittingTypes.ORIGINAL_SIZE:l=n.getAlignedRect(e.src,a,a.alignment),e.src.isCropped?(i.assign(e.parts[0],l),e.src.width=l.width,e.src.height=l.height):e.parts.push(o(l));break;case r.fittingTypes.LEGACY_STRIP_TILE_HORIZONTAL:case r.fittingTypes.LEGACY_STRIP_TILE_VERTICAL:case r.fittingTypes.LEGACY_STRIP_TILE:case r.fittingTypes.LEGACY_STRIP_ORIGINAL_SIZE:e.parts.push(function(e){return{transformType:r.transformTypes.LEGACY_CROP,width:Math.round(e.width),height:Math.round(e.height),alignment:n.getAlignment(e),upscale:!1,forceUSM:!1,scaleFactor:1,cssUpscaleNeeded:!1}}(a));break;case r.fittingTypes.LEGACY_STRIP_SCALE_TO_FIT:case r.fittingTypes.LEGACY_STRIP_FIT_AND_TILE:e.parts.push(function(e){return{transformType:r.transformTypes.FIT,width:Math.round(e.width),height:Math.round(e.height),upscale:!1,forceUSM:!0,scaleFactor:1,cssUpscaleNeeded:!1}}(a));break;case r.fittingTypes.LEGACY_STRIP_SCALE_TO_FILL:e.parts.push(function(e){return{transformType:r.transformTypes.LEGACY_FILL,width:Math.round(e.width),height:Math.round(e.height),alignment:n.getAlignment(e),upscale:!1,forceUSM:!0,scaleFactor:1,cssUpscaleNeeded:!1}}(a))}}}},function(e,t,a){var i=a(2),r=a(0),n=a(1);function s(e,t,a){return!isNaN(e)&&"number"==typeof e&&0!==e&&e>=t&&e<=a}e.exports={setTransformOptions:function(e,t){t=t||{},e.quality=function(e,t){var a=i.last(e.parts),r=n.getPreferredImageQuality(a.width,a.height),s=t.quality&&t.quality>=5&&t.quality<=90?t.quality:r;return parseInt(s,10)}(e,t),e.progressive=function(e){return!1!==e.progressive}(t),e.watermark=function(e){return e.watermark}(t),e.unsharpMask=function(e,t){var a=void 0;return function(e){e=e||{};var t=!isNaN(e.radius)&&"number"==typeof e.radius&&e.radius>=.1&&e.radius<=500,a=!isNaN(e.amount)&&"number"==typeof e.amount&&e.amount>=0&&e.amount<=10,i=!isNaN(e.threshold)&&"number"==typeof e.threshold&&e.threshold>=0&&e.threshold<=255;return t&&a&&i}(t.unsharpMask)?a={radius:t.unsharpMask.radius,amount:t.unsharpMask.amount,threshold:t.unsharpMask.threshold}:function(e){return e=e||{},!isNaN(e.radius)&&"number"==typeof e.radius&&0===e.radius&&!isNaN(e.amount)&&"number"==typeof e.amount&&0===e.amount&&!isNaN(e.threshold)&&"number"==typeof e.threshold&&0===e.threshold}(t.unsharpMask)||function(e){var t=i.last(e.parts);return!(t.scaleFactor>=1)||t.forceUSM}(e)&&(a=r.defaultUSM),a&&(a.radius=n.roundToFixed(a.radius,2),a.amount=n.roundToFixed(a.amount,2),a.threshold=n.roundToFixed(a.threshold,2)),a}(e,t),e.filters=function(e){var t=e.filters||{},a={};return s(t[r.imageFilters.CONTRAST],-100,100)&&(a[r.imageFilters.CONTRAST]=t[r.imageFilters.CONTRAST]),s(t[r.imageFilters.BRIGHTNESS],-100,100)&&(a[r.imageFilters.BRIGHTNESS]=t[r.imageFilters.BRIGHTNESS]),s(t[r.imageFilters.SATURATION],-100,100)&&(a[r.imageFilters.SATURATION]=t[r.imageFilters.SATURATION]),s(t[r.imageFilters.HUE],-180,180)&&(a[r.imageFilters.HUE]=t[r.imageFilters.HUE]),s(t[r.imageFilters.BLUR],0,100)&&(a[r.imageFilters.BLUR]=t[r.imageFilters.BLUR]),a}(t)}}},function(e,t,a){var i=a(0),r=a(1),n=a(8),s=a(3);e.exports=function(e,t,a,o,l){var c=i.emptyData.uri;return r.isImageTransformApplicable(t.id)?(l=l||s(e,t,a,o,l),c=n.getImageURI(l)):c=t.id,c}},function(e,t,a){var i,r=a(2),n=a(0),s=r.template("fit/w_${width},h_${height}"),o=r.template("fill/w_${width},h_${height},al_${alignment}"),l=r.template("fill/w_${width},h_${height},fp_${focalPointX}_${focalPointY}"),c=r.template("crop/x_${x},y_${y},w_${width},h_${height}"),u=r.template("crop/w_${width},h_${height},al_${alignment}"),p=r.template("fill/w_${width},h_${height},al_${alignment}"),h=r.template(",lg_${upscaleMethodValue}"),f=r.template(",q_${quality}"),g=r.template(",usm_${radius}_${amount}_${threshold}"),T=r.template(",bl"),A=r.template(",wm_${watermark}"),m=((i={})[n.imageFilters.CONTRAST]=r.template(",con_${contrast}"),i[n.imageFilters.BRIGHTNESS]=r.template(",br_${brightness}"),i[n.imageFilters.SATURATION]=r.template(",sat_${saturation}"),i[n.imageFilters.HUE]=r.template(",hue_${hue}"),i[n.imageFilters.BLUR]=r.template(",blur_${blur}"),i);e.exports={getImageURI:function(e){var t=[];e.parts.forEach((function(e){switch(e.transformType){case n.transformTypes.CROP:t.push(c(e));break;case n.transformTypes.LEGACY_CROP:t.push(u(e));break;case n.transformTypes.LEGACY_FILL:var a=p(e);e.upscale&&(a+=h(e)),t.push(a);break;case n.transformTypes.FIT:var i=s(e);e.upscale&&(i+=h(e)),t.push(i);break;case n.transformTypes.FILL:var r=o(e);e.upscale&&(r+=h(e)),t.push(r);break;case n.transformTypes.FILL_FOCAL:var f=l(e);e.upscale&&(f+=h(e)),t.push(f)}}));var a=t.join("/");return(e.fileType===n.fileType.PNG&&e.isWEBPSupport||e.fileType===n.fileType.JPG)&&(a+=f(e)),e.unsharpMask&&(a+=g(e.unsharpMask)),e.progressive||(a+=T(e)),e.watermark&&(a+=A(e)),e.filters&&(a+=Object.keys(e.filters).map((function(t){return m[t](e.filters)})).join("")),e.src.id+"/"+n.API_VERSION+"/"+a+"/"+e.fileName+"."+(e.isWEBPSupport?"webp":e.fileExtension)}}},,,,,,,function(e,t,a){var i=a(16),r=a(0);i.populateGlobalFeatureSupport();var o=/^media\//i,l="undefined"!=typeof window?window.devicePixelRatio:1;function c(e){return o.test(e)?"https://static.wixstatic.com/"+e:"https://static.wixstatic.com/media/"+e}e.exports={getScaleToFitImageURL:function(e,t,a,n,s,o){return c(i.getData(r.fittingTypes.SCALE_TO_FIT,{id:e,width:t,height:a,name:o&&o.name},{width:n,height:s,htmlTag:i.htmlTag.IMG,alignment:i.alignTypes.CENTER,pixelAspectRatio:l},o).uri)},getScaleToFillImageURL:function(e,t,a,n,s,o){return c(i.getData(r.fittingTypes.SCALE_TO_FILL,{id:e,width:t,height:a,name:o&&o.name,focalPoint:{x:o&&o.focalPoint&&o.focalPoint.x,y:o&&o.focalPoint&&o.focalPoint.y}},{width:n,height:s,htmlTag:i.htmlTag.IMG,alignment:i.alignTypes.CENTER,pixelAspectRatio:l},o).uri)},getCropImageURL:function(e,t,a,n,s,o,u,p,h,f){return c(i.getData(r.fittingTypes.SCALE_TO_FILL,{id:e,width:t,height:a,name:f&&f.name,crop:{x:n,y:s,width:o,height:u}},{width:p,height:h,htmlTag:i.htmlTag.IMG,alignment:i.alignTypes.CENTER,pixelAspectRatio:l},f).uri)}}},function(e,t,a){var i=a(0),r=a(1),n=a(7);e.exports={populateGlobalFeatureSupport:r.populateGlobalFeatureSupport,getData:function(e,t,a,s){var o=i.emptyData.uri;return r.isValidRequest(e,t,a)&&(o=n(e,t,a,s)),{uri:o}},fittingTypes:i.fittingTypes,alignTypes:i.alignTypes,htmlTag:i.htmlTag,upscaleMethods:i.upscaleMethods}}])}(module={exports:{}}),module.exports),imageClientAPI=(x=imageClientSDK)&&x.__esModule&&Object.prototype.hasOwnProperty.call(x,"default")?x.default:x,isAbsoluteUrl=(imageClientSDK.getScaleToFillImageURL,imageClientSDK.getScaleToFitImageURL,imageClientSDK.imageClientSDK,function(url){return url.startsWith("http://")||url.startsWith("https://")}),getAbsoluteUrl=function(url,type){return isAbsoluteUrl(url)?url:("image"===type?(baseUrl="https://static.wixstatic.com/",baseFolder="media/"):(baseUrl="https://video.wixstatic.com/",baseFolder="video/"),baseUrl+(url.startsWith(baseFolder)?url:baseFolder+url));var baseUrl,baseFolder},fullscreenResizeMediaUrl=function(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,faces,allowWatermark,focalPoint){return void 0===faces&&(faces=!1),void 0===allowWatermark&&(allowWatermark=!1),resizeMediaUrl(item,originalUrl,resizeMethod,2*requiredWidth,2*requiredHeight,sharpParams,faces,allowWatermark,focalPoint)},resizeMediaUrl=function(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,faces,allowWatermark,focalPoint){return-1!==originalUrl.indexOf("base64")?originalUrl:(requiredWidth=Math.ceil(requiredWidth),requiredHeight=Math.ceil(requiredHeight),"video"===resizeMethod?getAbsoluteUrl(originalUrl,"video"):requiredWidth>=item.maxWidth&&requiredHeight>=item.maxHeight?getAbsoluteUrl(item.url,"image"):function(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,faces,allowWatermark,focalPoint){originalUrl=originalUrl||"",(sharpParams=sharpParams||{}).quality>0&&(sharpParams.quality=Math.min(90,sharpParams.quality));var focalPointObj={x:50,y:50};focalPoint&&focalPoint[0]>=0&&focalPoint[1]>=0&&(focalPointObj.x=Math.round(100*focalPoint[0]),focalPointObj.y=Math.round(100*focalPoint[1])),!0===sharpParams.allowUsm&&sharpParams.usm?(sharpParams.usm.usm_a=Math.min(5,Math.max(0,sharpParams.usm.usm_a||0)),sharpParams.usm.usm_r=Math.min(128,Math.max(0,sharpParams.usm.usm_r||0)),sharpParams.usm.usm_t=Math.min(1,Math.max(0,sharpParams.usm.usm_t||0))):sharpParams.usm={usm_a:0,usm_r:0,usm_t:0};var resizer=function(){};resizer="fit"===resizeMethod?imageClientAPI.getScaleToFitImageURL:imageClientAPI.getScaleToFillImageURL;var options={};return sharpParams.quality>0&&(options.quality=sharpParams.quality),sharpParams.blur>0&&(options.filters={blur:sharpParams.blur}),focalPointObj&&(options.focalPoint=focalPointObj),sharpParams&&sharpParams.usm&&(options.unsharpMask={radius:parseFloat(sharpParams.usm.usm_r),amount:parseFloat(sharpParams.usm.usm_a),threshold:parseFloat(sharpParams.usm.usm_t)}),isAbsoluteUrl(originalUrl)?originalUrl:resizer(originalUrl.replace("https://static.wixstatic.com/",""),item.maxWidth,item.maxHeight,requiredWidth,requiredHeight,options)}(item,originalUrl,resizeMethod,requiredWidth,requiredHeight,sharpParams,0,0,focalPoint))},fscreen=function(x){return x&&x.__esModule&&Object.prototype.hasOwnProperty.call(x,"default")?x.default:x}(createCommonjsModule((function(module,exports){Object.defineProperty(exports,"__esModule",{value:!0});var key={fullscreenEnabled:0,fullscreenElement:1,requestFullscreen:2,exitFullscreen:3,fullscreenchange:4,fullscreenerror:5},webkit=["webkitFullscreenEnabled","webkitFullscreenElement","webkitRequestFullscreen","webkitExitFullscreen","webkitfullscreenchange","webkitfullscreenerror"],moz=["mozFullScreenEnabled","mozFullScreenElement","mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozfullscreenerror"],ms=["msFullscreenEnabled","msFullscreenElement","msRequestFullscreen","msExitFullscreen","MSFullscreenChange","MSFullscreenError"],document="undefined"!=typeof window&&void 0!==window.document?window.document:{},vendor="fullscreenEnabled"in document&&Object.keys(key)||webkit[0]in document&&webkit||moz[0]in document&&moz||ms[0]in document&&ms||[];exports.default={requestFullscreen:function(element){return element[vendor[key.requestFullscreen]]()},requestFullscreenFunction:function(element){return element[vendor[key.requestFullscreen]]},get exitFullscreen(){return document[vendor[key.exitFullscreen]].bind(document)},addEventListener:function(type,handler,options){return document.addEventListener(vendor[key[type]],handler,options)},removeEventListener:function(type,handler,options){return document.removeEventListener(vendor[key[type]],handler,options)},get fullscreenEnabled(){return Boolean(document[vendor[key.fullscreenEnabled]])},set fullscreenEnabled(val){},get fullscreenElement(){return document[vendor[key.fullscreenElement]]},set fullscreenElement(val){},get onfullscreenchange(){return document[("on"+vendor[key.fullscreenchange]).toLowerCase()]},set onfullscreenchange(handler){return document[("on"+vendor[key.fullscreenchange]).toLowerCase()]=handler},get onfullscreenerror(){return document[("on"+vendor[key.fullscreenerror]).toLowerCase()]},set onfullscreenerror(handler){return document[("on"+vendor[key.fullscreenerror]).toLowerCase()]=handler}}}))),_extends_1$1=function(fn,module){return function(module){function _extends(){return module.exports=_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}module.exports=_extends}(module={exports:{}}),module.exports}(),ProGallery=__webpack_require__(978).ProGallery,Fullscreen=function(_Component){function Fullscreen(props){var _this;return(_this=_Component.call(this,props)||this).addFullscreenChangeListener=function(){fscreen.fullscreenEnabled&&fscreen.addEventListener("fullscreenchange",_this.onFullscreenChange)},_this.removeFullscreenChangeListener=function(){fscreen.fullscreenEnabled&&fscreen.removeEventListener("fullscreenchange",_this.onFullscreenChange)},_this.onWindowResize=function(){return _this.forceUpdate()},_this.onFullscreenChange=function(){return _this.setState({isInFullscreen:!!fscreen.fullscreenElement})},_this.onEsc=function(event){"Escape"===event.key&&_this.onClose()},_this.toggleFullscreenMode=function(){var isInFullscreen=_this.state.isInFullscreen;fscreen.fullscreenEnabled&&(isInFullscreen?fscreen.exitFullscreen():fscreen.requestFullscreen(document.body))},_this.getStyleParams=function(){var isInFullscreen=_this.state.isInFullscreen,arrowsPosition=0,slideshowInfoSize=0;return _this.props.isMobile?slideshowInfoSize=154:isInFullscreen||(arrowsPosition=1,slideshowInfoSize=142),{arrowsPosition:arrowsPosition,slideshowInfoSize:slideshowInfoSize}},_this.onClose=function(){_this.state.isInFullscreen&&_this.toggleFullscreenMode(),_this.currentIdx=-1,_this.props.onClose()},_this.renderCloseButton=function(){var foregroundColor=_this.props.foregroundColor;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{className:"_2zGgi",style:foregroundColor,onClick:function(){return _this.onClose()},"aria-label":"Close","data-hook":"fullscreen-close-button"},Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg",_extends({width:60,height:60,viewBox:"0 0 60 60"},void 0),_ref))},_this.renderFullscreenToggleButton=function(){var isInFullscreen=_this.state.isInFullscreen,foregroundColor=_this.props.foregroundColor,icon=isInFullscreen?SvgShrink:SvgExpand,ariaLabel=isInFullscreen?"Shrink":"Expand";return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{className:"_3PuAk",style:foregroundColor,onClick:_this.toggleFullscreenMode,"aria-label":ariaLabel,"data-hook":"fullscreen-toggle-button"},icon())},_this.handleGalleryEvents=function(name,data){if("CURRENT_ITEM_CHANGED"===name){var _this$props=_this.props,images=_this$props.images,index=_this$props.index;-1!==_this.currentIdx?_this.currentIdx>0&&images[_this.currentIdx-1].itemId===data.itemId?_this.currentIdx-=1:_this.currentIdx+=1:_this.currentIdx=index}},_this.state={isInFullscreen:!1},_this.currentIdx=-1,_this}var subClass,superClass;superClass=_Component,(subClass=Fullscreen).prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,subClass.__proto__=superClass;var _proto=Fullscreen.prototype;return _proto.componentDidMount=function(){document.addEventListener("keydown",this.onEsc),window.addEventListener("resize",this.onWindowResize),this.addFullscreenChangeListener()},_proto.componentWillUnmount=function(){document.removeEventListener("keydown",this.onEsc),window.removeEventListener("resize",this.onWindowResize),this.removeFullscreenChangeListener()},_proto.getItems=function(){return function(_ref){var anchorTarget=_ref.anchorTarget,relValue=_ref.relValue;return _ref.items.map((function(item){var metadata=item.metadata;if(item.metaData)return item;var url,convertedData={metaData:{link:{type:"none",target:"_blank"}},directLink:{}};if(metadata){if(convertedData.metaData=_extends_1$1({},metadata,{link:{type:"none",target:"_blank"}}),"video"===item.metadata.type){convertedData.metaData.link={target:"_blank",rel:"noopener",url:Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__["normalizeUrl"])(item.url||"")};var _convertedData$metaDa=convertedData.metaData.poster,pathname=_convertedData$metaDa.pathname,_convertedData$metaDa2=_convertedData$metaDa.thumbnail,thumbPathname=(_convertedData$metaDa2=void 0===_convertedData$metaDa2?{}:_convertedData$metaDa2).pathname;pathname&&thumbPathname&&(convertedData.metaData.poster=function(url){return url.startsWith("http://")||url.startsWith("https://")}(url=thumbPathname)?url:("media/","https://static.wixstatic.com/"+(url.startsWith("media/")?url:"media/"+url)))}convertedData.metaData.alt=metadata.altText,item.metadata.link&&(convertedData.metaData.link={type:"wix",target:item.metadata.link.target||anchorTarget||"_self",data:{type:"ExternalLink",target:item.metadata.link.target||anchorTarget||"_self",rel:item.metadata.link.rel||relValue||"noopener",url:Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__["normalizeUrl"])(item.metadata.link.url||"")}},convertedData.directLink={url:Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_4__["normalizeUrl"])(item.metadata.link.url||""),target:item.metadata.link.target||anchorTarget||"_self",rel:item.metadata.link.rel||relValue||"noopener"})}return _extends_1$1({},item,{metadata:void 0},convertedData)}))}({items:this.props.images})},_proto.render=function(){var _this$props2=this.props,isOpen=_this$props2.isOpen,target=_this$props2.target,backgroundColor=_this$props2.backgroundColor,topMargin=_this$props2.topMargin,isMobile=_this$props2.isMobile,index=_this$props2.index,isInFullscreen=this.state.isInFullscreen,_this$getStyleParams=this.getStyleParams(),arrowsPosition=_this$getStyleParams.arrowsPosition,slideshowInfoSize=_this$getStyleParams.slideshowInfoSize,width=isInFullscreen||isMobile?window.innerWidth:window.innerWidth-14,height=isInFullscreen?window.screen.height:window.innerHeight,items=this.getItems(),fullscreen=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{style:_extends_1({},backgroundColor,topMargin),dir:"ltr","data-hook":"fullscreen-root",className:isInFullscreen?"_1KpZG":"_3dmg8"},this.renderCloseButton(),!isMobile&&this.renderFullscreenToggleButton(),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ProGallery,{items:items,currentIdx:-1===this.currentIdx?index:this.currentIdx,eventsListener:this.handleGalleryEvents,resizeMediaUrl:fullscreenResizeMediaUrl,container:{width:width,height:height},styles:_extends_1({},layouts[5],{galleryLayout:5,cubeType:"fit",scrollSnap:!0,videoPlay:"auto",allowSocial:!1,loveButton:!1,allowTitle:!0,showArrows:!isMobile,arrowsPosition:arrowsPosition,slideshowInfoSize:slideshowInfoSize})}));return target&&(fullscreen=react_dom__WEBPACK_IMPORTED_MODULE_5___default.a.createPortal(fullscreen,target)),isOpen?fullscreen:null},Fullscreen}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]),ViewerModal=function(_super){function ViewerModal(props){var _this=_super.call(this,props)||this;return props.setExpandModeData(getImagesData_cjs(props.initialState)),_this.state={disabled:!1},_this}return Object(_index_dcf7dedf_js__WEBPACK_IMPORTED_MODULE_2__[/* _ */ "b"])(ViewerModal,_super),ViewerModal.prototype.componentDidUpdate=function(prevProps){var initialState=this.props.initialState;prevProps.initialState!==initialState&&this.props.setExpandModeData(getImagesData_cjs(initialState))},ViewerModal.prototype.render=function(){var _a=this.props,index=_a.index,isOpen=_a.isOpen,images=_a.images,onClose=_a.onClose,isMobile=_a.isMobile;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Fullscreen,{isOpen:isOpen,images:images,onClose:onClose,isMobile:isMobile,index:index})},ViewerModal}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (ViewerModal);
//# sourceMappingURL=FullscreenModal-9e37e586.js.map


/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (LAYOUTS);

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var SCROLL_DIRECTION = {
  VERTICAL: 0,
  HORIZONTAL: 1
};
/* harmony default export */ __webpack_exports__["a"] = (SCROLL_DIRECTION);

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ GalleryComponent; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/context/GalleryContext.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


var GalleryContext;

try {
  GalleryContext = /*#__PURE__*/react_default.a.createContext({});
} catch (e) {
  GalleryContext = null;
}

var GalleryContext_GalleryProvider = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(GalleryProvider, _React$Component);

  function GalleryProvider() {
    return _React$Component.apply(this, arguments) || this;
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryComponent_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var GalleryComponent = /*#__PURE__*/function (_React$Component) {
  galleryComponent_inheritsLoose(GalleryComponent, _React$Component);

  function GalleryComponent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    if (typeof _this.context !== 'object') {
      _this.context = {};
    }

    if (props && typeof props.context === 'object') {
      _this.context = _objectSpread(_objectSpread({}, _this.context), props.context);
    }

    return _this;
  }

  return GalleryComponent;
}(react_default.a.Component);

_defineProperty(GalleryComponent, "contextType", GalleryContext);

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasAbovePlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasBelowPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return hasHoverPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return hasRightPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hasLeftPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hasVerticalPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hasHorizontalPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isAbovePlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isBelowPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return isHoverPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return isRightPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isLeftPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return isVerticalPlacement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return isHorizontalPlacement; });
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

/* harmony default export */ __webpack_exports__["a"] = (PLACEMENTS);


/***/ }),

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// NAMESPACE OBJECT: ./node_modules/pro-gallery-lib/dist/es/src/common/utils/lodash.js
var lodash_namespaceObject = {};
__webpack_require__.r(lodash_namespaceObject);
__webpack_require__.d(lodash_namespaceObject, "pick", function() { return pick; });
__webpack_require__.d(lodash_namespaceObject, "throttle", function() { return throttle; });
__webpack_require__.d(lodash_namespaceObject, "debounce", function() { return debounce; });
__webpack_require__.d(lodash_namespaceObject, "get", function() { return get; });
__webpack_require__.d(lodash_namespaceObject, "isFunction", function() { return isFunction; });
__webpack_require__.d(lodash_namespaceObject, "isEqual", function() { return isEqual; });
__webpack_require__.d(lodash_namespaceObject, "isNumber", function() { return isNumber; });

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/utils/lodash.js
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
var get = function get(obj, path, defaultValue) {
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
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/window/windowWrapper.js + 1 modules
var windowWrapper = __webpack_require__(901);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/window/viewModeWrapper.js
var viewModeWrapper = __webpack_require__(913);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/utils/index.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var utils_Utils = /*#__PURE__*/function () {
  function Utils() {
    this._cache = {};
    this._hash2int = {};
    this._params = {};
    Object.assign(this, lodash_namespaceObject);
  }

  var _proto = Utils.prototype;

  _proto.shouldUseCache = function shouldUseCache() {
    return !Object(viewModeWrapper["a" /* isEditMode */])() && !Object(viewModeWrapper["d" /* isPreviewMode */])() && !this.isSSR();
  };

  _proto.isUndefined = function isUndefined(something) {
    return typeof something === 'undefined';
  };

  _proto.dumpCache = function dumpCache() {
    this._cache = {};
  };

  _proto.getOrPutFromCache = function getOrPutFromCache(fld, func) {
    if (!this.shouldUseCache()) {
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

      _location.search // .replace ( "?", "" )
      // this is better, there might be a question mark inside
      .substr(1).split('&').forEach(function (item) {
        tmp = item.split('=');

        if (tmp[0] === val) {
          result = decodeURIComponent(tmp[1]);
        }
      });

      if (!result) {
        // if the param was not found in the search, try decoding the path
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
      // this is a json
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
      var deviceType = _this.parseGetParam('deviceType') || windowWrapper["a" /* default */].deviceType;
      var isMobileViewer = _this.parseGetParam('showMobileView') === 'true';
      var formFactorMobile = Object(viewModeWrapper["b" /* isFormFactorMobile */])();

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
        })(navigator.userAgent || navigator.vendor || windowWrapper["a" /* default */].opera);

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
      return windowWrapper["a" /* default */].isTest;
    } catch (e) {
      return false;
    }
  };

  _proto.isLocal = function isLocal() {
    try {
      var host = windowWrapper["a" /* default */].location.hostname;

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

  _proto.isVerbose = function isVerbose() {
    return !this.isTest() && (this.safeLocalStorage() || {}).forceDevMode === 'true';
  };

  _proto.isStoreGallery = function isStoreGallery() {
    var _this4 = this;

    return this.getOrPutFromCache('isStoreGallery', function () {
      try {
        return windowWrapper["a" /* default */].location.search.toLowerCase().indexOf('isstore') > -1;
      } catch (e) {
        if (_this4.isDev()) {
          console.error('cant find window', e);
        }

        return false;
      }
    });
  } // TODO : Replace with isPrerender mode
  ;

  _proto.isSSR = function isSSR() {
    return typeof global.window === 'undefined';
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
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !windowWrapper["a" /* default */].MSStream;
      } catch (e) {
        return false;
      }
    });
  };

  _proto.isiPhone = function isiPhone() {
    return this.getOrPutFromCache('isiPhone', function () {
      try {
        return /iPhone/.test(navigator.userAgent) && !windowWrapper["a" /* default */].MSStream;
      } catch (e) {
        return false;
      }
    });
  };

  _proto.isLandscape = function isLandscape() {
    var _this5 = this;

    return this.getOrPutFromCache('isLandscape', function () {
      if (!_this5.isMobile()) {
        return false;
      }

      try {
        if (!_this5.isUndefined(windowWrapper["a" /* default */].orientation)) {
          return windowWrapper["a" /* default */].orientation === 90 || windowWrapper["a" /* default */].orientation === -90;
        } else {
          var mql = windowWrapper["a" /* default */].matchMedia('(orientation: landscape)');

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
      return localStorage ? localStorage : windowWrapper["a" /* default */]; // TrackJS errors, function returning null
    } catch (e) {
      return windowWrapper["a" /* default */];
    }
  };

  _proto.shouldDebug = function shouldDebug(str) {
    try {
      return !!this.safeLocalStorage()[str] || (windowWrapper["a" /* default */].debugApp || '').indexOf(str) >= 0 || (this.parseGetParam('debugApp') || '').indexOf(str) >= 0;
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

    return elementIdx || -1; // no tabIndex (tab will not focus on this item)
  };

  _proto.setStateAndLog = function setStateAndLog(that, caller, state, callback) {
    var _this6 = this;

    if (this.isVerbose()) {
      console.log("State Change Called (" + caller + ")", state);

      var oldState = _objectSpread({}, that.state);

      that.setState(state, function () {
        var newState = _objectSpread({}, that.state);

        var change = _this6.printableObjectsDiff(oldState, newState, 'state');

        if (Object.keys(change).length > 0) {
          console.log("State Change Completed (" + caller + ")", change);
        }

        if (_this6.isFunction(callback)) {
          callback.bind(that)();
        }
      });
    } else {
      that.setState(state, function () {
        if (_this6.isFunction(callback)) {
          callback.bind(that)();
        }
      });
    }
  };

  _proto.printableObjectsDiff = function printableObjectsDiff(obj1, obj2, prefix) {
    var _this7 = this;

    if (prefix === void 0) {
      prefix = '';
    }

    var _toString = function _toString(v) {
      if (v === '') {
        v = "''";
      } else if (_this7.isUndefined(v)) {
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

        if (!_this7.isEqual(v, _obj2[k])) {
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
    if (Object(viewModeWrapper["d" /* isPreviewMode */])() && this.isMobile()) {
      // In editor preview-mode, the screen is still a desktop, but the viewport in which the preview mode renders us is only 320, so 'window.screen.width' returns a wrong value.
      return 320;
    }

    if (this.isTest()) {
      return 1920;
    }

    try {
      if (this.isLandscape()) {
        return Math.max(windowWrapper["a" /* default */].screen.width, windowWrapper["a" /* default */].screen.height);
      } else {
        return windowWrapper["a" /* default */].screen.width;
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
        return Math.min(windowWrapper["a" /* default */].screen.width, windowWrapper["a" /* default */].screen.height);
      } else {
        return windowWrapper["a" /* default */].screen.height;
      }
    } catch (e) {
      return 1200;
    }
  };

  _proto.getWindowWidth = function getWindowWidth() {
    try {
      return windowWrapper["a" /* default */].innerWidth || 980;
    } catch (e) {
      return 980;
    }
  };

  _proto.getMobileEnabledClick = function getMobileEnabledClick(action) {
    // todo: bring back this line before pushing to master
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
        // comment to avoid 'block is empty' from linter
      }
    }

    return this._cache.params[name];
  };

  _proto.scrollTo = function scrollTo(element, to, duration, isHorizontal, callback) {
    if (this.isMobile()) {
      duration = 0; // do not animate scroll on mobile (looks jumpy and buggy)
    }

    var easeInOutQuad = function easeInOutQuad(currentTime, start, change, _duration) {
      // t = current time
      // b = start value
      // c = change in value
      // d = _duration
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
  };

  _proto.formatColor = function formatColor(color) {
    var defaultColor = 'inherit';

    if (!color) {
      return defaultColor;
    }

    var colorStr = color.value ? color.value : color;
    var colorRegex = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/;
    var regexRes = colorRegex.exec(colorStr);
    var isValidColor = regexRes && regexRes[0];
    return isValidColor ? colorStr : defaultColor;
  };

  return Utils;
}();

/* harmony default export */ var utils = __webpack_exports__["a"] = (new utils_Utils());

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var INFO_BEHAVIOUR_ON_HOVER = {
  APPEARS: 'APPEARS',
  DISAPPEARS: 'DISAPPEARS',
  NO_CHANGE: 'NO_CHANGE',
  // ALWAYS_SHOW
  NEVER_SHOW: 'NEVER_SHOW'
};
/* harmony default export */ __webpack_exports__["a"] = (INFO_BEHAVIOUR_ON_HOVER);

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return scrollToItemImp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return scrollToGroupImp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isWithinPaddingHorizontally; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isWithinPaddingVertically; });
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(764);

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
    if (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose()) {
      console.log('Scrolling to items #' + itemIdx);
    }

    var item = items.find(function (itm) {
      return itm.idx === itemIdx;
    });
    to = oneRow ? pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(item, 'offset.left') : pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(item, 'offset.top');

    if (item && isRTL) {
      to += item.width;
    }

    if (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose()) {
      console.log('Scrolling to position ' + to, item);
    }

    if (!(to >= 0)) {
      pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose() && console.warn('Position not found, not scrolling');
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

      if (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose()) {
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
    if (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose()) {
      console.log('Scrolling to groups #' + groupIdx);
    }

    var group = groups.find(function (grp) {
      return grp.idx === groupIdx;
    });
    to = oneRow ? pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(group, 'left') : pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(group, 'top');

    if (group && isRTL) {
      to += group.width;
    }

    if (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose()) {
      console.log('Scrolling to position ' + to, group);
    }

    if (!(to >= 0)) {
      pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose() && console.warn('Position not found, not scrolling');
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

      if (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isVerbose()) {
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



/***/ }),

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: windowWrapper

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/window/window.mock.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {
  return {};
};

var width = 2560;
var height = 1440;
var dims = {
  y: 0,
  x: 0,
  width: width,
  height: height,
  innerWidth: width,
  innerHeight: height,
  outerWidth: width,
  outerHeight: height,
  clientWidth: width,
  clientHeight: height
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
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/window/windowWrapper.js


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
/* harmony default export */ var window_windowWrapper = __webpack_exports__["a"] = (_window);


/***/ }),

/***/ 903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var FORM_FACTOR = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  TABLET: 'tablet'
};
/* harmony default export */ __webpack_exports__["a"] = (FORM_FACTOR);

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var GALLERY_SIZE_TYPE = {
  SMART: 'smart',
  PIXELS: 'px',
  RATIO: 'ratio'
};
/* harmony default export */ __webpack_exports__["a"] = (GALLERY_SIZE_TYPE);

/***/ }),

/***/ 905:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var INFO_TYPE = {
  NO_BACKGROUND: 'NO_BACKGROUND',
  ATTACHED_BACKGROUND: 'ATTACHED_BACKGROUND',
  SEPARATED_BACKGROUND: 'SEPARATED_BACKGROUND',
  DONT_SHOW: 'DONT_SHOW'
};
/* harmony default export */ __webpack_exports__["a"] = (INFO_TYPE);

/***/ }),

/***/ 906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var LOADING_MODE = {
  BLUR: 'BLUR',
  COLOR: 'COLOR',
  MAIN_COLOR: 'MAIN_COLOR'
};
/* harmony default export */ __webpack_exports__["a"] = (LOADING_MODE);

/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var LOADING_WITH_COLOR_MODE = {
  PICKED_COLOR: 'PICKED_COLOR',
  MAIN_COLOR: 'MAIN_COLOR'
};
/* harmony default export */ __webpack_exports__["a"] = (LOADING_WITH_COLOR_MODE);

/***/ }),

/***/ 908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var RESIZE_METHODS = {
  FILL: 'fill',
  FIT: 'fit',
  FULL: 'full',
  VIDEO: 'video'
};
/* harmony default export */ __webpack_exports__["a"] = (RESIZE_METHODS);

/***/ }),

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (SCROLL_ANIMATIONS);

/***/ }),

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var TEXT_BOX_WIDTH_CALCULATION_OPTIONS = {
  PERCENT: 'PERCENT',
  MANUAL: 'MANUAL'
};
/* harmony default export */ __webpack_exports__["a"] = (TEXT_BOX_WIDTH_CALCULATION_OPTIONS);

/***/ }),

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return URL_SIZES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return URL_TYPES; });
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

/***/ }),

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var VIEW_MODE = {
  SITE: 'SITE',
  EDIT: 'EDIT',
  PREVIEW: 'PREVIEW',
  PRERENDER: 'PRERENDER',
  SEO: 'SEO'
};
/* harmony default export */ __webpack_exports__["a"] = (VIEW_MODE);

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return viewModeWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isSiteMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isEditMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isPreviewMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isSEOMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isFormFactorMobile; });
/* unused harmony export isFormFactorTablet */
/* unused harmony export isFormFactorDesktop */
/* unused harmony export isFormFactorTouch */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isPrerenderMode; });
/* harmony import */ var _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(912);
/* harmony import */ var _constants_formFactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(903);



var ViewModeWrapper = /*#__PURE__*/function () {
  function ViewModeWrapper() {
    this.setViewMode = this.setViewMode.bind(this);
    this.isSiteMode = this.isSiteMode.bind(this);
    this.isEditMode = this.isEditMode.bind(this);
    this.isPrerenderMode = this.isPrerenderMode.bind(this);
    this.isPreviewMode = this.isPreviewMode.bind(this);
    this.isSEOMode = this.isSEOMode.bind(this);
    this.setFormFactor = this.setFormFactor.bind(this);
    this.isFormFactorDesktop = this.isFormFactorDesktop.bind(this);
    this.isFormFactorMobile = this.isFormFactorMobile.bind(this);
    this.isFormFactorTablet = this.isFormFactorTablet.bind(this);
    this.isFormFactorTouch = this.isFormFactorTouch.bind(this);
    this._viewMode = _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].SITE;
    this._formFactor = _constants_formFactor__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].DESKTOP;
  }

  var _proto = ViewModeWrapper.prototype;

  _proto.setViewMode = function setViewMode(viewMode) {
    this._viewMode = viewMode;
  };

  _proto.setFormFactor = function setFormFactor(forceVal) {
    this._formFactor = forceVal;
  };

  _proto.isFormFactorMobile = function isFormFactorMobile() {
    return this._formFactor === _constants_formFactor__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].MOBILE;
  };

  _proto.isFormFactorTablet = function isFormFactorTablet() {
    return this._formFactor === _constants_formFactor__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].TABLET;
  };

  _proto.isFormFactorDesktop = function isFormFactorDesktop() {
    return this._formFactor === _constants_formFactor__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].DESKTOP;
  };

  _proto.isFormFactorTouch = function isFormFactorTouch() {
    return this.isMobile() || this.isTablet();
  };

  _proto.isSiteMode = function isSiteMode() {
    return this._viewMode === _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].SITE;
  };

  _proto.isEditMode = function isEditMode() {
    return this._viewMode === _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].EDIT;
  };

  _proto.isPreviewMode = function isPreviewMode() {
    return this._viewMode === _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].PREVIEW;
  };

  _proto.isPrerenderMode = function isPrerenderMode() {
    return this._viewMode === _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].PRERENDER;
  };

  _proto.isSEOMode = function isSEOMode() {
    return this._viewMode === _constants_viewMode__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].SEO;
  };

  return ViewModeWrapper;
}();

var viewModeWrapper = new ViewModeWrapper();
var isSiteMode = viewModeWrapper.isSiteMode;
var isEditMode = viewModeWrapper.isEditMode;
var isPreviewMode = viewModeWrapper.isPreviewMode;
var isSEOMode = viewModeWrapper.isSEOMode;
var isFormFactorMobile = viewModeWrapper.isFormFactorMobile;
var isFormFactorTablet = viewModeWrapper.isFormFactorTablet;
var isFormFactorDesktop = viewModeWrapper.isFormFactorDesktop;
var isFormFactorTouch = viewModeWrapper.isFormFactorTouch;
var isPrerenderMode = viewModeWrapper.isPrerenderMode;











/***/ }),

/***/ 914:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(925);


/***/ }),

/***/ 924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



var DimensionsHelper = /*#__PURE__*/function () {
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

  _proto.getGalleryWidth = function getGalleryWidth() {
    var _this2 = this;

    return this.getOrPutInCache('galleryWidth', function () {
      var width = Math.floor(_this2.container.width) + _this2.getDimensionFix() * 2; //add margins to width and then remove them in css negative margins

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

      var res = Math.floor((_this3.container.height > 0 ? _this3.container.height : 0) + dimensionFix());
      return res;
    });
  };

  _proto.getDimensionFix = function getDimensionFix() {
    var _this4 = this;

    return this.getOrPutInCache('dimensionFix', function () {
      return Number(_this4.styles.imageMargin) - Number(_this4.styles.galleryMargin);
    });
  };

  _proto.getGalleryRatio = function getGalleryRatio() {
    var _this5 = this;

    return this.getOrPutInCache('galleryRatio', function () {
      var res = _this5.getGalleryDimensions();

      return res.galleryWidth / res.galleryHeight;
    });
  };

  return DimensionsHelper;
}();

/* harmony default export */ __webpack_exports__["a"] = (new DimensionsHelper());

/***/ }),

/***/ 925:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ 978:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ProGallery", function() { return /* reexport */ gallery_BaseGallery; });
__webpack_require__.d(__webpack_exports__, "ProBlueprintsGallery", function() { return /* reexport */ blueprintsIndex_BaseGallery; });
__webpack_require__.d(__webpack_exports__, "LayoutingProGallery", function() { return /* reexport */ layoutingIndex_BaseGallery; });
__webpack_require__.d(__webpack_exports__, "LeanGallery", function() { return /* reexport */ leanGallery_LeanGallery; });
__webpack_require__.d(__webpack_exports__, "isEligibleForLeanGallery", function() { return /* reexport */ isEligible; });
__webpack_require__.d(__webpack_exports__, "notEligibleReasons", function() { return /* reexport */ isEligible_notEligibleReasons; });
__webpack_require__.d(__webpack_exports__, "cssScrollHelper", function() { return /* reexport */ cssScrollHelper; });
__webpack_require__.d(__webpack_exports__, "addLayoutStyles", function() { return /* reexport */ helpers_layoutHelper; });
__webpack_require__.d(__webpack_exports__, "GALLERY_CONSTS", function() { return /* reexport */ constants["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "addPresetStyles", function() { return /* reexport */ presets_addPresetStyles; });
__webpack_require__.d(__webpack_exports__, "defaultStyles", function() { return /* reexport */ common_defaultStyles; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/index.js + 21 modules
var constants = __webpack_require__(979);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/defaultStyles.js

 // this is the one place for the default styles !!!

var defaultStyles = {
  isRTL: false,
  isVertical: false,
  gallerySize: 30,
  minItemSize: 120,
  chooseBestGroup: true,
  groupSize: 3,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  rotatingGroupTypes: '',
  collageDensity: 0.8,
  // 80, // should be 0.8 after
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
  scatter: 0,
  gridStyle: 0,
  mobilePanorama: false,
  placeGroupsLtr: false,
  viewMode: 'preview',
  oneRow: false,
  showArrows: true,
  enableInfiniteScroll: true,
  thumbnailSpacings: 4,
  galleryThumbnailsAlignment: constants["a" /* default */].thumbnailsAlignment.BOTTOM,
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
  bottomInfoHeight: 0,
  titlePlacement: constants["a" /* default */].placements.SHOW_ON_HOVER,
  galleryTextAlign: 'center',
  scrollSnap: false,
  itemClick: constants["a" /* default */].itemClick.EXPAND,
  fullscreen: true,
  videoPlay: constants["a" /* default */].videoPlay.HOVER,
  scrollAnimation: constants["a" /* default */].scrollAnimations.NO_EFFECT,
  scrollDirection: 0,
  overlayAnimation: constants["a" /* default */].overlayAnimations.NO_EFFECT,
  arrowsPosition: 0,
  arrowsSize: 23,
  watermarkOpacity: 40,
  watermarkSize: 40,
  useWatermark: true,
  watermarkDock: constants["a" /* default */].watermarkDock.RIGHT_DOWN,
  loadMoreAmount: constants["a" /* default */].loadMoreAmount.ALL,
  defaultShowInfoExpand: 1,
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
  // addToCartBorderColor: color-5,
  addToCartButtonText: '',
  slideshowInfoSize: 200,
  playButtonForAutoSlideShow: false,
  allowSlideshowCounter: false,
  hoveringBehaviour: constants["a" /* default */].infoBehaviourOnHover.APPEARS,
  thumbnailSize: 120,
  magicLayoutSeed: 1,
  // itemOpacity:'color-5', startWithOpacity: 0.60,
  // itemIconColorSlideshow: 'color-5'
  // itemIconColor: color-1
  // arrowsColor: 'color-1'
  imageHoverAnimation: constants["a" /* default */].imageHoverAnimations.NO_EFFECT,
  imagePlacementAnimation: constants["a" /* default */].imagePlacementAnimations.NO_EFFECT,
  // itemFont: 'font_5'  // startWithSize: 22,
  // itemFontColor: 'color-1'
  // itemFontSlideshow:'font_5' // startWithSize: 22,
  // itemFontColorSlideshow: 'color-5'
  // itemDescriptionFont: 'font_8' // startWithSize: 15
  // itemDescriptionFontColor: 'color-1'
  // itemDescriptionFontSlideshow: 'font_8' // startWithSize: 15
  // itemDescriptionFontColorSlideshow: 'color-5'
  // textBoxFillColor: 'color-2', //startWithOpacity: 1,
  calculateTextBoxWidthMode: constants["a" /* default */].textBoxWidthCalculationOptions.PERCENT,
  textBoxHeight: 200,
  textBoxWidth: 200,
  textBoxWidthPercent: 50,
  textImageSpace: 10,
  textBoxBorderRadius: 0,
  textBoxBorderWidth: 0,
  loadMoreButtonText: '',
  // loadMoreButtonFont: font_8
  // loadMoreButtonFontColor: color-5
  // loadMoreButtonColor: startWithOpacity: '1', startWithColor: 'color-1'
  loadMoreButtonBorderWidth: 1,
  // loadMoreButtonBorderColor:  startWithColor: 'color-5'
  loadMoreButtonBorderRadius: 0,
  imageInfoType: constants["a" /* default */].infoType.NO_BACKGROUND,
  itemBorderWidth: 0,
  // itemBorderColor: 'color-5'
  itemBorderRadius: 0,
  itemEnableShadow: false,
  // itemShadowOpacityAndColor: startWithColor: 'color-5', startWithOpacity: 0.2
  itemShadowBlur: 20,
  itemShadowDirection: 135,
  itemShadowSize: 10,
  imageLoadingMode: constants["a" /* default */].loadingMode.BLUR,
  // imageLoadingColor: startWithColor: 'color-3'
  expandAnimation: constants["a" /* default */].expandAnimations.NO_EFFECT,
  // oneColorAnimationColor: startWithColor: 'color-1',
  imageQuality: 90,
  usmToggle: false,
  usm_a: 0,
  usm_r: 0,
  usm_t: 0,
  videoSound: false,
  videoSpeed: '1',
  videoLoop: true
};
/* Object.entries(galleryOptions).forEach(([styleParam, settings]) => {
  if (defaultStyles[styleParam] !== settings.default) {
    console.warn('Style Param default MISMATCH!', styleParam, defaultStyles[styleParam], settings.default);
    // defaultStyles[styleParam] = settings.default;
  }
});
 */

/* harmony default export */ var common_defaultStyles = (defaultStyles);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/helpers/dimensionsHelper.js
var dimensionsHelper = __webpack_require__(924);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/layout.js
var constants_layout = __webpack_require__(688);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/placements.js
var placements = __webpack_require__(714);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/scrollDirection.js
var scrollDirection = __webpack_require__(692);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/utils/index.js + 1 modules
var utils = __webpack_require__(764);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/window/windowWrapper.js + 1 modules
var windowWrapper = __webpack_require__(901);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/helpers/versionsHelper.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      return _objectSpread(_objectSpread({}, obj), {}, (_objectSpread2 = {}, _objectSpread2[feature] = _this.freezeDate >= releaseDate, _objectSpread2));
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
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/infoBehaviourOnHover.js
var infoBehaviourOnHover = __webpack_require__(768);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/loadingMode.js
var loadingMode = __webpack_require__(906);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/loadingWithColorMode.js
var loadingWithColorMode = __webpack_require__(907);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/scrollAnimations.js
var scrollAnimations = __webpack_require__(909);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/gallerySizeType.js
var gallerySizeType = __webpack_require__(904);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/infoType.js
var infoType = __webpack_require__(905);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/textBoxWidthCalculationOptions.js
var textBoxWidthCalculationOptions = __webpack_require__(910);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/helpers/layoutHelper.js













var layoutHelper_calcTargetItemSize = function calcTargetItemSize(styles, smartCalc) {
  if (smartCalc === void 0) {
    smartCalc = false;
  }

  if (styles.gallerySizeType === gallerySizeType["a" /* default */].PIXELS && styles.gallerySizePx > 0) {
    return styles.gallerySizePx;
  } else if (styles.gallerySizeType === gallerySizeType["a" /* default */].RATIO && styles.gallerySizeRatio > 0) {
    return (windowWrapper["a" /* default */] && windowWrapper["a" /* default */].innerWidth || 980) * (styles.gallerySizeRatio / 100);
  } else {
    return smartCalc ? smartCalc : styles.gallerySize;
  }
};

function processLayouts(styles, customExternalInfoRendererExists) {
  var processedStyles = styles;
  processedStyles.isSlideshowFont = isSlideshowFont(processedStyles);
  processedStyles.oneRow = processedStyles.oneRow || processedStyles.scrollDirection === scrollDirection["a" /* default */].HORIZONTAL;

  var setTextUnderline = function setTextUnderline(itemFontStyleParam, textDecorationType) {
    /* itemFontStyleParam: itemFontSlideshow / itemDescriptionFontSlideshow / itemFont / itemDescriptionFont
    textDecorationType: textDecorationTitle / textDecorationDesc */
    processedStyles[itemFontStyleParam].value = processedStyles[itemFontStyleParam].value.replace(/^font\s*:\s*/, '');
    processedStyles[itemFontStyleParam].value = processedStyles[itemFontStyleParam].value.replace(/;$/, '');

    if (processedStyles[itemFontStyleParam].value.indexOf('underline') > -1 || processedStyles[itemFontStyleParam].style.underline === true) {
      processedStyles[itemFontStyleParam].value = processedStyles[itemFontStyleParam].value.replace('underline', '');
      processedStyles[textDecorationType] = 'underline';
    } else if (processedStyles[itemFontStyleParam].style.underline === false) {
      processedStyles[textDecorationType] = 'none';
    }
  };

  if (utils["a" /* default */].isMobile()) {
    if (processedStyles.isSlideshowFont) {
      if (!utils["a" /* default */].isUndefined(processedStyles.itemFontSlideshow)) {
        setTextUnderline('itemFontSlideshow', 'textDecorationTitle');
      }

      if (!utils["a" /* default */].isUndefined(processedStyles.itemDescriptionFontSlideshow)) {
        setTextUnderline('itemDescriptionFontSlideshow', 'textDecorationDesc');
      }
    } else {
      if (!utils["a" /* default */].isUndefined(processedStyles.itemFont)) {
        setTextUnderline('itemFont', 'textDecorationTitle');
      }

      if (!utils["a" /* default */].isUndefined(processedStyles.itemDescriptionFont)) {
        setTextUnderline('itemDescriptionFont', 'textDecorationDesc');
      }
    }
  }

  if ((!processedStyles.isVertical || processedStyles.groupSize > 1 || processedStyles.oneRow === true) && !processedStyles.isSlider && !processedStyles.isColumns) {
    // all horizontal layouts that are not slider or columns
    processedStyles.titlePlacement = placements["a" /* default */].SHOW_ON_HOVER;
  } // to_wrapper


  if (!Object(placements["e" /* hasHoverPlacement */])(processedStyles.titlePlacement) && processedStyles.hoveringBehaviour !== infoBehaviourOnHover["a" /* default */].NEVER_SHOW) {
    processedStyles.hoveringBehaviour = infoBehaviourOnHover["a" /* default */].APPEARS;
  }

  if (processedStyles.imageLoadingMode === loadingMode["a" /* default */].COLOR && processedStyles.imageLoadingWithColorMode === loadingWithColorMode["a" /* default */].MAIN_COLOR) {
    processedStyles.imageLoadingMode = loadingMode["a" /* default */].MAIN_COLOR;
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
      // add galleryMargin to allow the shadow to be seen
      processedStyles.galleryMargin = Math.max(processedStyles.galleryMargin, (processedStyles.itemShadowSize || 0) + (processedStyles.itemShadowBlur || 0));
    }
  }

  if (processedStyles.oneRow) {
    // if oneRow is true, use horizontal layouts only
    processedStyles.isVertical = false;
    processedStyles.scrollAnimation = scrollAnimations["a" /* default */].NO_EFFECT;
  } else {
    processedStyles.slideshowLoop = false; // allow slideshowLoop only for horizontal layouts
  }

  if (processedStyles.imageMargin > 0) {
    if (utils["a" /* default */].isMobile()) {
      processedStyles.imageMargin = Math.min(processedStyles.imageMargin, 50); // limit mobile spacing to 50px (25 on each side)
    }

    processedStyles.imageMargin /= 2;
  }

  if (processedStyles.loadMoreButtonFont && utils["a" /* default */].isMobile()) {
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
    // If toggle is for Items per row, fill the fixedColumns with the number of items
    // If toggle is responsive, make fixedColumns to be 0 or undefined;
    // Show the new controls only on Vertical scroll (one ow is false)
    processedStyles.fixedColumns = String(processedStyles.gridStyle) === '1' ? Number(processedStyles.numberOfImagesPerRow) : 0;
    processedStyles.groupTypes = '1';
    processedStyles.groupSize = 1;
    processedStyles.collageAmount = 0;
    processedStyles.collageDensity = 0; // }
  } // TODO this needs to split, need to leave the wixStyles assign in the statics section


  if (!utils["a" /* default */].isUndefined(processedStyles.numberOfImagesPerCol) && processedStyles.isGrid && processedStyles.oneRow) {
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
  } // returned to the statics because it was the definition of the object.
  // processedStyles.sharpParams = {
  //   quality: 90,
  //   usm: {}
  // };


  if (processedStyles.forceMobileCustomButton) {
    processedStyles.targetItemSize = Math.round(30 * 8.5 + 150);
    processedStyles.titlePlacement = placements["a" /* default */].SHOW_BELOW;
    processedStyles.galleryLayout = 2;
    processedStyles.fixedColumns = 1;
    processedStyles.numberOfImagesPerRow = 1;
  }

  if (processedStyles.fixedColumns > 0 && utils["a" /* default */].isMobile() && typeof processedStyles.m_numberOfImagesPerRow === 'undefined') {
    processedStyles.fixedColumns = 1;
  } // in case a special gallery size was specified, use it


  if (processedStyles.gallerySizeType === gallerySizeType["a" /* default */].PIXELS && processedStyles.gallerySizePx > 0) {
    processedStyles.targetItemSize = processedStyles.gallerySizePx;
  } else if (processedStyles.gallerySizeType === gallerySizeType["a" /* default */].RATIO && processedStyles.gallerySizeRatio > 0) {
    processedStyles.targetItemSize = (windowWrapper["a" /* default */] && windowWrapper["a" /* default */].innerWidth || 980) * (processedStyles.gallerySizeRatio / 100);
  }

  processedStyles.textBoxHeight = getTextBoxAboveOrBelowHeight(processedStyles, customExternalInfoRendererExists);
  processedStyles.externalInfoHeight = getHeightFromStyleParams(processedStyles, processedStyles.textBoxHeight);
  processedStyles.externalInfoWidth = getTextBoxRightOrLeftWidth(processedStyles, customExternalInfoRendererExists); // Handle case of autoplay on ios devices

  if (processedStyles.videoPlay === 'auto' && processedStyles.itemClick === 'nothing' && utils["a" /* default */].isiOS()) {
    processedStyles.videoPlay = 'onClick';
  }

  return processedStyles;
}

function getHeightFromStyleParams(styleParams, textBoxHeight) {
  var additionalHeight = textBoxHeight;

  if (textBoxHeight > 0 && Object(placements["h" /* hasVerticalPlacement */])(styleParams.titlePlacement) && styleParams.imageInfoType === infoType["a" /* default */].SEPARATED_BACKGROUND) {
    additionalHeight += styleParams.textImageSpace;
    additionalHeight += styleParams.textBoxBorderWidth * 2;
  }

  return additionalHeight;
}

function getTextBoxRightOrLeftWidth(styleParams, customExternalInfoRendererExists) {
  if (!shouldShowTextRightOrLeft(styleParams, customExternalInfoRendererExists)) {
    return 0;
  }

  var targetItemSize = styleParams.targetItemSize,
      calculateTextBoxWidthMode = styleParams.calculateTextBoxWidthMode,
      textBoxWidth = styleParams.textBoxWidth,
      textBoxWidthPercent = styleParams.textBoxWidthPercent;
  var width = 0;

  if (calculateTextBoxWidthMode === textBoxWidthCalculationOptions["a" /* default */].PERCENT) {
    width = Math.min(100, Math.max(0, textBoxWidthPercent)) / 100;
  } else {
    width = Math.min(targetItemSize, textBoxWidth);
  }

  return width;
}

function shouldShowTextRightOrLeft(styleParams, customExternalInfoRendererExists) {
  var oneRow = styleParams.oneRow,
      isVertical = styleParams.isVertical,
      groupSize = styleParams.groupSize,
      titlePlacement = styleParams.titlePlacement;
  var allowedByLayoutConfig = !oneRow && isVertical && groupSize === 1;
  return allowedByLayoutConfig && Object(placements["d" /* hasHorizontalPlacement */])(titlePlacement) && customExternalInfoRendererExists;
}

function getTextBoxAboveOrBelowHeight(styleParams, customExternalInfoRendererExists) {
  if (!shouldShowTextBoxAboveOrBelow(styleParams, customExternalInfoRendererExists)) {
    return 0;
  }

  return styleParams.textBoxHeight;
}

function shouldShowTextBoxAboveOrBelow(styleParams, customExternalInfoRendererExists) {
  return Object(placements["h" /* hasVerticalPlacement */])(styleParams.titlePlacement) && customExternalInfoRendererExists;
}

function isSlideshowFont(styles) {
  var galleryLayout = styles.galleryLayout;

  if (galleryLayout === constants_layout["a" /* default */].SLIDESHOW) {
    return true;
  }

  if (Object(placements["h" /* hasVerticalPlacement */])(styles.titlePlacement)) {
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

/* harmony default export */ var layoutHelper = (processLayouts);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/alternateGallery.js
function alternateGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function alternateGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { alternateGallery_ownKeys(Object(source), true).forEach(function (key) { alternateGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { alternateGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function alternateGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].ALTERNATE,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 1,
  titlePlacement: placements["a" /* default */].SHOW_ON_HOVER,
  scrollDirection: scrollDirection["a" /* default */].VERTICAL,
  galleryMargin: 0,
  isVertical: true,
  groupSize: 3,
  collageDensity: 0.48,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 86,
  minItemSize: 50,
  chooseBestGroup: true,
  rotatingGroupTypes: '1,2h,1,2h',
  smartCrop: false,
  scatter: 0,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  rotatingCropRatios: '',
  slideshowLoop: false
};
var alternateGallery_createStyles = function createStyles(styles) {
  return alternateGallery_objectSpread(alternateGallery_objectSpread(alternateGallery_objectSpread({}, styles), fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/bricksGallery.js
function bricksGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bricksGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bricksGallery_ownKeys(Object(source), true).forEach(function (key) { bricksGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bricksGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bricksGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var bricksGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].BRICKS,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 1,
  titlePlacement: placements["a" /* default */].SHOW_ON_HOVER,
  scrollDirection: scrollDirection["a" /* default */].VERTICAL,
  galleryMargin: 0,
  isVertical: true,
  groupSize: 3,
  collageDensity: 0.8,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  slideshowLoop: false,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  gallerySize: 400,
  minItemSize: 50,
  chooseBestGroup: true,
  rotatingGroupTypes: '2h',
  smartCrop: false,
  scatter: 0,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  rotatingCropRatios: '0.707,1.414,1.414,0.707'
};
var bricksGallery_createStyles = function createStyles(styles) {
  return bricksGallery_objectSpread(bricksGallery_objectSpread(bricksGallery_objectSpread({}, styles), bricksGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/collageGallery.js
function collageGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function collageGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { collageGallery_ownKeys(Object(source), true).forEach(function (key) { collageGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { collageGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function collageGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var collageGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].COLLAGE,
  cubeImages: false,
  titlePlacement: placements["a" /* default */].SHOW_ON_HOVER,
  groupSize: 3,
  hasThumbnails: false,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  slideshowLoop: false,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  targetItemSize: 0,
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
    targetItemSize: layoutHelper_calcTargetItemSize(styles, Math.round(styles.gallerySize * 5 + 500))
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/fullsizeGallery.js
function fullsizeGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function fullsizeGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { fullsizeGallery_ownKeys(Object(source), true).forEach(function (key) { fullsizeGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { fullsizeGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fullsizeGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var fullsizeGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].FULLSIZE,
  cubeImages: true,
  cubeRatio: '100%/100%',
  cubeType: 'fill',
  oneRow: true,
  titlePlacement: placements["a" /* default */].SHOW_ON_HOVER,
  scrollDirection: scrollDirection["a" /* default */].HORIZONTAL,
  galleryMargin: 0,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
  hasThumbnails: false,
  enableScroll: true,
  scrollSnap: true,
  isGrid: false,
  isSlider: false,
  isColumns: false,
  isMasonry: false,
  isSlideshow: false,
  cropOnlyFill: false,
  scatter: 0,
  imageMargin: 0
};
var fullsizeGallery_createStyles = function createStyles(styles) {
  return fullsizeGallery_objectSpread(fullsizeGallery_objectSpread(fullsizeGallery_objectSpread({}, styles), fullsizeGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/columnGallery.js
function columnGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function columnGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { columnGallery_ownKeys(Object(source), true).forEach(function (key) { columnGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { columnGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function columnGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var columnGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].COLUMN,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 0.35,
  oneRow: true,
  scrollDirection: scrollDirection["a" /* default */].HORIZONTAL,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  slideshowLoop: false,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
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
  return columnGallery_objectSpread(columnGallery_objectSpread(columnGallery_objectSpread({}, styles), columnGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/gridGallery.js
function gridGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function gridGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { gridGallery_ownKeys(Object(source), true).forEach(function (key) { gridGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { gridGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function gridGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var gridGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].GRID,
  cubeImages: true,
  isVertical: true,
  groupSize: 1,
  hasThumbnails: false,
  groupTypes: '1',
  slideshowLoop: false,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Columns',
  fixedColumns: 0,
  targetItemSize: 0,
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
    targetItemSize: layoutHelper_calcTargetItemSize(styles, Math.round(styles.gallerySize * 8.5 + 150))
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/magicGallery.js
function magicGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function magicGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { magicGallery_ownKeys(Object(source), true).forEach(function (key) { magicGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { magicGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function magicGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var magicGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].MAGIC,
  cubeImages: undefined,
  cubeRatio: undefined,
  isVertical: undefined,
  targetItemSize: undefined,
  collageAmount: undefined,
  collageDensity: undefined,
  groupTypes: undefined,
  oneRow: undefined,
  // later on in layoutHelper this can be changed if it is false, so not exactly fixed.
  imageMargin: undefined,
  scatter: undefined,
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
  enableInfiniteScroll: undefined,
  slideshowLoop: false
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
    targetItemSize: numFromSeed(300, 800, 'gallerySize'),
    collageAmount: numFromSeed(5, 10, 'collageAmount') / 10,
    collageDensity: (featureManager.supports.spacingCalculation ? numFromSeed(1, 100, 'collageDensity') : numFromSeed(5, 10, 'collageDensity')) / 100,
    groupTypes: ['1'].concat('2h,2v,3t,3b,3l,3r,3h,3v'.split(',').filter(function (type, i) {
      return boolFromSeed('groupTypes' + i);
    })),
    oneRow: boolFromSeed('oneRow'),
    imageMargin: numFromSeed(0, featureManager.supports.spacingCalculation ? numFromSeed(300, 800, 'gallerySize') / 5 : 5, 'imageMargin'),
    galleryMargin: featureManager.supports.spacingCalculation ? 0 : numFromSeed(0, 5, 'imageMargin'),
    scatter: 0,
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
    style.scrollDirection = scrollDirection["a" /* default */].HORIZONTAL;
  } else {
    style.scrollDirection = scrollDirection["a" /* default */].VERTICAL;
  }

  style.galleryType = style.isVertical ? 'Columns' : 'Strips';
  style.groupSize = parseInt(style.groupTypes.slice(-1)[0]);
  style.groupTypes = style.groupTypes.join(',');
  style.minItemSize = style.targetItemSize / style.groupSize / 2;
  return style;
};

var magicGallery_createStyles = function createStyles(styles) {
  return magicGallery_objectSpread(magicGallery_objectSpread(magicGallery_objectSpread({}, styles), magicGallery_fixedStyles), magicGallery_getStyleBySeed(styles.magicLayoutSeed));
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/masonryGallery.js
function masonryGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function masonryGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { masonryGallery_ownKeys(Object(source), true).forEach(function (key) { masonryGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { masonryGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function masonryGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var masonryGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].MASONRY,
  cubeImages: false,
  scrollDirection: scrollDirection["a" /* default */].VERTICAL,
  groupSize: 1,
  groupTypes: '1',
  slideshowLoop: false,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
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
    targetItemSize: layoutHelper_calcTargetItemSize(styles, styles.isVertical ? styles.gallerySize * 8 + 200 : styles.gallerySize * 5 + 200)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/mixGallery.js
function mixGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function mixGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { mixGallery_ownKeys(Object(source), true).forEach(function (key) { mixGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { mixGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mixGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var mixGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].MIX,
  cubeType: 'fill',
  cubeImages: true,
  cubeRatio: 1,
  titlePlacement: placements["a" /* default */].SHOW_ON_HOVER,
  scrollDirection: scrollDirection["a" /* default */].VERTICAL,
  galleryMargin: 0,
  isVertical: true,
  groupSize: 3,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  collageDensity: 0.48,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  targetItemSize: 86,
  minItemSize: 50,
  chooseBestGroup: true,
  rotatingGroupTypes: '1,3l,1,3r',
  smartCrop: false,
  scatter: 0,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  rotatingCropRatios: ''
};
var mixGallery_createStyles = function createStyles(styles) {
  return mixGallery_objectSpread(mixGallery_objectSpread(mixGallery_objectSpread({}, styles), mixGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/panoramaGallery.js
function panoramaGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function panoramaGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { panoramaGallery_ownKeys(Object(source), true).forEach(function (key) { panoramaGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { panoramaGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function panoramaGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var panoramaGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].PANORAMA,
  cubeImages: false,
  scrollDirection: scrollDirection["a" /* default */].VERTICAL,
  isVertical: true,
  groupSize: 1,
  groupTypes: '1',
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  galleryType: 'Columns',
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
  return panoramaGallery_objectSpread(panoramaGallery_objectSpread(panoramaGallery_objectSpread({}, styles), panoramaGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/sliderGallery.js
function sliderGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function sliderGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { sliderGallery_ownKeys(Object(source), true).forEach(function (key) { sliderGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { sliderGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function sliderGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var sliderGallery_fixedStyles = {
  // tested params
  galleryLayout: constants_layout["a" /* default */].SLIDER,
  enableInfiniteScroll: true,
  cubeImages: true,
  oneRow: true,
  scrollDirection: scrollDirection["a" /* default */].HORIZONTAL,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
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
  return sliderGallery_objectSpread(sliderGallery_objectSpread(sliderGallery_objectSpread({}, styles), sliderGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/slideshowGallery.js
function slideshowGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function slideshowGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { slideshowGallery_ownKeys(Object(source), true).forEach(function (key) { slideshowGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { slideshowGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function slideshowGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var slideshowGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].SLIDESHOW,
  enableInfiniteScroll: true,
  cubeRatio: '100%/100%',
  cubeImages: true,
  oneRow: true,
  hoveringBehaviour: infoBehaviourOnHover["a" /* default */].NEVER_SHOW,
  scrollDirection: scrollDirection["a" /* default */].HORIZONTAL,
  galleryMargin: 0,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  itemBorderWidth: 0,
  itemBorderRadius: 0,
  itemBorderColor: undefined,
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  targetItemSize: 550,
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
  scatter: 0,
  imageMargin: 0
};
var slideshowGallery_createStyles = function createStyles(styles) {
  return slideshowGallery_objectSpread(slideshowGallery_objectSpread(slideshowGallery_objectSpread({}, styles), slideshowGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/thumbnailGallery.js
function thumbnailGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function thumbnailGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { thumbnailGallery_ownKeys(Object(source), true).forEach(function (key) { thumbnailGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { thumbnailGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function thumbnailGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var thumbnailGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].THUMBNAIL,
  enableInfiniteScroll: true,
  cubeRatio: '100%/100%',
  cubeImages: true,
  oneRow: true,
  titlePlacement: placements["a" /* default */].SHOW_ON_HOVER,
  scrollDirection: scrollDirection["a" /* default */].HORIZONTAL,
  galleryMargin: 0,
  isVertical: false,
  groupSize: 1,
  groupTypes: '1',
  // this params were moved from the presets in layoutHelper and were not tested and checked yet.
  smartCrop: false,
  galleryType: 'Strips',
  hasThumbnails: true,
  enableScroll: true,
  scrollSnap: true,
  isGrid: false,
  isSlider: false,
  isMasonry: false,
  isColumns: false,
  isSlideshow: false,
  cropOnlyFill: false,
  scatter: 0,
  imageMargin: 0
};
var thumbnailGallery_createStyles = function createStyles(styles) {
  return thumbnailGallery_objectSpread(thumbnailGallery_objectSpread(thumbnailGallery_objectSpread({}, styles), thumbnailGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles)
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/emptyGallery.js
function emptyGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function emptyGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { emptyGallery_ownKeys(Object(source), true).forEach(function (key) { emptyGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { emptyGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function emptyGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var emptyGallery_fixedStyles = {
  galleryLayout: constants_layout["a" /* default */].EMPTY
};
var emptyGallery_createStyles = function createStyles(styles) {
  return emptyGallery_objectSpread(emptyGallery_objectSpread(emptyGallery_objectSpread({}, styles), emptyGallery_fixedStyles), {}, {
    targetItemSize: layoutHelper_calcTargetItemSize(styles, Math.round(styles.gallerySize * 9 + 100))
  });
};
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/presets/presets.js
















var presets_addPresetStyles = function addPresetStyles(styles) {
  var galleryType = styles.galleryType;
  var galleryLayoutV1 = styles.galleryType;
  var galleryLayoutV2 = styles.galleryLayout;

  if (galleryLayoutV1 !== undefined && galleryLayoutV2 === undefined) {
    // legacy layouts - only if galleyrType parameter is specifically defined (i.e. layout had changed)
    switch (galleryType) {
      case '1':
        // horizontal collage
        return collageGallery_createStyles(styles);

      case '2':
        // grid
        return gridGallery_createStyles(styles);

      case '3':
        // vertical masonry
        return masonryGallery_createStyles(styles);

      case '4':
        // horizontal masonry
        return masonryGallery_createStyles(styles);

      case '5':
        // one column
        return panoramaGallery_createStyles(styles);

      case '6':
        // one row
        return columnGallery_createStyles(styles);

      case '7':
        // slideshow
        return slideshowGallery_createStyles(styles);

      case '0': // vertical collage

      default:
        return collageGallery_createStyles(styles);
    }
  } else {
    // new layouts
    switch (styles.galleryLayout) {
      case constants_layout["a" /* default */].MASONRY:
        return masonryGallery_createStyles(styles);

      case constants_layout["a" /* default */].GRID:
        return gridGallery_createStyles(styles);

      case constants_layout["a" /* default */].THUMBNAIL:
        return thumbnailGallery_createStyles(styles);

      case constants_layout["a" /* default */].SLIDER:
        return sliderGallery_createStyles(styles);

      case constants_layout["a" /* default */].SLIDESHOW:
        return slideshowGallery_createStyles(styles);

      case constants_layout["a" /* default */].PANORAMA:
        return panoramaGallery_createStyles(styles);

      case constants_layout["a" /* default */].COLUMN:
        return columnGallery_createStyles(styles);

      case constants_layout["a" /* default */].MAGIC:
        return magicGallery_createStyles(styles);

      case constants_layout["a" /* default */].FULLSIZE:
        return fullsizeGallery_createStyles(styles);

      case constants_layout["a" /* default */].BRICKS:
        return bricksGallery_createStyles(styles);

      case constants_layout["a" /* default */].MIX:
        return mixGallery_createStyles(styles);

      case constants_layout["a" /* default */].ALTERNATE:
        return alternateGallery_createStyles(styles);

      case constants_layout["a" /* default */].EMPTY:
        return emptyGallery_createStyles(styles);

      case constants_layout["a" /* default */].COLLAGE:
      default:
        return collageGallery_createStyles(styles);
    }
  }
};

var NEW_PRESETS = {
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
}; // returns true if the given param is in the current layout preset


var isInPreset = function isInPreset(galleryLayout, paramToCheck) {
  var layoutName = getLayoutName(galleryLayout) || 'empty'; // empty for when there is no layout given

  return Object.keys(NEW_PRESETS[layoutName]).includes(paramToCheck);
};


// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/window/viewModeWrapper.js
var viewModeWrapper = __webpack_require__(913);

// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/utils.js
function utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { utils_ownKeys(Object(source), true).forEach(function (key) { utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Utils = /*#__PURE__*/function () {
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
      scatter: 0,
      chooseBestGroup: true,
      groupSize: 3,
      groupTypes: '1,2h,2v,3h,3v,3t,3b,3l,3r',
      rotatingGroupTypes: '',
      isVertical: true,
      minItemSize: 120,
      oneRow: false,
      targetItemSize: 500,
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
    this.insertIfDefined(convertedStyleParams, 'scatter', convertedStyleParams.randomSpacings);
    this.insertIfDefined(convertedStyleParams, 'chooseBestGroup', convertedStyleParams.smartGrouping);
    this.insertIfDefined(convertedStyleParams, 'groupSize', convertedStyleParams.itemsPerGroup);
    this.insertIfDefined(convertedStyleParams, 'groupTypes', Array.isArray(convertedStyleParams.allowedGroupTypes) ? convertedStyleParams.allowedGroupTypes.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'rotatingGroupTypes', Array.isArray(convertedStyleParams.rotatingGroupTypes) ? convertedStyleParams.rotatingGroupTypes.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'isVertical', convertedStyleParams.isColumnsLayout);
    this.insertIfDefined(convertedStyleParams, 'minItemSize', convertedStyleParams.minItemSize);
    this.insertIfDefined(convertedStyleParams, 'oneRow', convertedStyleParams.isVerticalScroll);
    this.insertIfDefined(convertedStyleParams, 'targetItemSize', convertedStyleParams.rowSize || convertedStyleParams.columnSize);
    this.insertIfDefined(convertedStyleParams, 'collageDensity', convertedStyleParams.collageDensity);
    this.insertIfDefined(convertedStyleParams, 'fixedColumns', convertedStyleParams.fixedColumns);
    this.insertIfDefined(convertedStyleParams, 'columnWidths', Array.isArray(convertedStyleParams.columnWidths) ? convertedStyleParams.columnWidths.join(',') : undefined);
    return convertedStyleParams;
  };

  _proto.convertContainer = function convertContainer(container, styleParams) {
    var convertedContainer = utils_objectSpread({
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

var utils_utils = new Utils();
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
      this.scatter = styleParams.scatter;
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

  _proto.calcScatter = function calcScatter(offset) {
    if (this.scatter > 0) {
      var m = this.imageMargin;
      var g = this.galleryMargin;
      var spaceLeft = offset.left > 0 ? m : g;
      var spaceRight = this.container.galleryWidth - offset.right > 2 * m ? m : g;
      var spaceUp = offset.top > 0 ? m : g;
      var spaceDown = this.container.galleryHeight - offset.bottom > 2 * m ? m : g;
      var horizontalShift = utils_utils.hashToInt(this.hash + offset.right + 'x', -1 * spaceLeft, spaceRight) * (this.scatter / 100);
      var verticalShift = utils_utils.hashToInt(this.hash + offset.top + 'y', -1 * spaceUp, spaceDown) * (this.scatter / 100);
      return {
        x: horizontalShift,
        y: verticalShift
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
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

      var _this$calcScatter = this.calcScatter(offset),
          x = _this$calcScatter.x,
          y = _this$calcScatter.y;

      offset.left += x;
      offset.top += y;
      offset.right = offset.left + this.width;
      offset.bottom = offset.top + this.height;
      return offset;
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
        orientation: this.orientation,
        isPortrait: this.isPortrait,
        isLandscape: this.isLandscape,
        visibility: this.visibility
      };
    }
  }]);

  return Item;
}();
// CONCATENATED MODULE: ./node_modules/pro-layouts/dist/es/src/group.js
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
    this.targetItemSize = config.targetItemSize;
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
      this.resizeToWidth(this.targetItemSize);
    } else {
      this.resizeToHeight(this.targetItemSize);
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

    for (var _iterator = _createForOfIteratorHelperLoose(this.items), _step; !(_step = _iterator()).done;) {
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

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.items), _step2; !(_step2 = _iterator2()).done;) {
      var item = _step2.value;
      item.groupOffset = {
        top: top,
        bottom: top + this.height
      };
    }
  };

  _proto.setLeft = function setLeft(left) {
    this.left = left || 0;

    for (var _iterator3 = _createForOfIteratorHelperLoose(this.items), _step3; !(_step3 = _iterator3()).done;) {
      var item = _step3.value;
      item.groupOffset = {
        left: left,
        right: left + this.width
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
    this.targetItemSize = config.targetItemSize;
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
    return this.targetItemSize * 1.5 < this.height;
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
        targetItemSize = this.targetItemSize;

    if (groupsPerStrip > 0) {
      return this.groups.length >= groupsPerStrip;
    }

    var galleryWidth = this.container.galleryWidth;
    var isStripSmallEnough;

    if (oneRow) {
      isStripSmallEnough = false; //onerow layout is one long strip
    } else {
      var withNewGroup = galleryWidth / (this.ratio + newGroup.ratio) - targetItemSize; //start a new strip BEFORE adding the current group

      var withoutNewGroup = galleryWidth / this.ratio - targetItemSize; //start a new strip AFTER adding the current group

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
    this.useLayoutStore = !!options.useLayoutStore;
  };

  _proto.verifyGalleryState = function verifyGalleryState() {
    if (!this.container.galleryWidth) {
      this.ready = false;
      throw new Error('Layouter: cannot create layout, galleryWidth is undefined or 0');
    }

    if (!this.styleParams.targetItemSize) {
      this.ready = false;
      throw new Error('Layouter: cannot create layout, targetItemSize is undefined or 0');
    }
  };

  _proto.calcNumberOfColumns = function calcNumberOfColumns(galleryWidth, targetItemSize) {
    var numOfCols = 1;

    if (this.styleParams.isVertical) {
      if (this.styleParams.fixedColumns > 0) {
        numOfCols = this.styleParams.fixedColumns;
      } else if (this.styleParams.columnWidths) {
        numOfCols = this.styleParams.columnWidths.split(',').length;
      } else {
        // find the number of columns that makes each column width the closet to the targetItemSize
        var numOfColsFloat = galleryWidth / targetItemSize;
        var roundFuncs = [Math.floor, Math.ceil];
        var diffs = roundFuncs.map(function (func) {
          return func(numOfColsFloat);
        }) //round to top, round to bottom
        .map(function (n) {
          return Math.round(galleryWidth / n);
        }) //width of each col
        .map(function (w) {
          return Math.abs(targetItemSize - w);
        }); //diff from targetItemSize

        var roundFunc = roundFuncs[diffs.indexOf(Math.min.apply(Math, diffs))]; //choose the round function that has the lowest diff from the targetItemSize

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
        targetItemSize: this.targetItemSize,
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

            group.realItems.forEach(function () {
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
                targetItemSize: this.targetItemSize
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
        this.targetItemSize = Math.sqrt(this.container.galleryHeight * this.container.galleryWidth / this.srcItems.length);
      } else {
        var gallerySizeVal;

        if (typeof this.styleParams.targetItemSize === 'function') {
          gallerySizeVal = this.styleParams.targetItemSize();
        } else {
          gallerySizeVal = this.styleParams.targetItemSize;
        }

        this.targetItemSize = Math.floor(gallerySizeVal) + Math.ceil(2 * (this.styleParams.imageMargin - this.styleParams.galleryMargin));
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
        targetItemSize: this.targetItemSize
      });
      this.galleryHeight = 0;
      this.numOfCols = this.calcNumberOfColumns(this.galleryWidth, this.targetItemSize);
      this.targetItemSize = this.styleParams.isVertical ? Math.floor(this.galleryWidth / this.numOfCols) : this.targetItemSize;
      var _this$styleParams = this.styleParams,
          columnWidths = _this$styleParams.columnWidths,
          cubeRatio = _this$styleParams.cubeRatio,
          externalInfoWidth = _this$styleParams.externalInfoWidth,
          imageMargin = _this$styleParams.imageMargin;
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
        fixedCubeHeight = fixedCubeHeight || (_this.targetItemSize - infoWidth - imageMargin * 2) / cubeRatio + imageMargin * 2; //calc the cube height only once
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

    this.verifyGalleryState();
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
        targetItemSize: this.targetItemSize,
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
            targetItemSize: this.targetItemSize
          }); //reset the group (this group will be rebuilt)

          this.pointer -= this.group.realItems.length - 1;
          this.groupIdx--;
          continue;
        } //add the group to the (current/new) strip


        this.group.setTop(this.galleryHeight);
        this.strip.ratio += this.group.ratio; // this.strip.height = Math.min(targetItemSize, (galleryWidth / this.strip.ratio));

        this.strip.height = this.galleryWidth / this.strip.ratio;
        this.strip.setWidth(this.galleryWidth);
        this.strip.addGroup(this.group);

        if (this.isLastImage && this.strip.hasGroups) {
          if (this.styleParams.oneRow) {
            this.strip.height = this.container.galleryHeight + (this.styleParams.imageMargin - this.styleParams.galleryMargin);
          } else if (this.strip.canRemainIncomplete()) {
            //stretching the this.strip to the full width will make it too high - so make it as high as the targetItemSize and not stretch
            this.strip.height = this.targetItemSize;
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
    this.ready = true;
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


// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/resizeMethods.js
var resizeMethods = __webpack_require__(908);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/urlTypes.js
var urlTypes = __webpack_require__(911);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/galleryItem.js
function galleryItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function galleryItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { galleryItem_ownKeys(Object(source), true).forEach(function (key) { galleryItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { galleryItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function galleryItem_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function galleryItem_createClass(Constructor, protoProps, staticProps) { if (protoProps) galleryItem_defineProperties(Constructor.prototype, protoProps); if (staticProps) galleryItem_defineProperties(Constructor, staticProps); return Constructor; }






var galleryItem_GalleryItem = /*#__PURE__*/function () {
  function GalleryItem(config) {
    this.uniqueId = utils["a" /* default */].generateUUID();
    this.isGalleryItem = true;
    this.createdBy = config.createdBy;
    this.createUrl = this.createUrl.bind(this);
    this.update(config);
  }

  var _proto = GalleryItem.prototype;

  _proto.update = function update(config) {
    this.resizeMediaUrl = config.resizeMediaUrl;

    if (config.dto && config.dto.dto) {
      config.dto = config.dto.dto; // defence patch due to mis-use of item-core

      if (utils["a" /* default */].isDev()) {
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
        // metadata is encoded encoded, parsed if needed
        this.dto.metaData = utils["a" /* default */].parseStringObject(itemMetadata);
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
    this.cubeType = scheme.cropType || resizeMethods["a" /* default */].FILL;
    this.offset = scheme.offset;
    this.group = scheme.group;
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
      imageUrl: this.resizedUrl(resizeMethods["a" /* default */].FIT, 200, 200, null, null).img(),
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

          var str = String(utils["a" /* default */].hashCode(JSON.stringify(galleryItem_objectSpread({
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
    var focalPoint = resizeMethod === resizeMethods["a" /* default */].FILL && this.isCropped && this.focalPoint;
    var urls = {};
    var imgUrl = this.url;

    if (this.isText) {
      return Object.assign.apply(Object, [{}].concat(Object.values(urlTypes["b" /* URL_TYPES */]).map(function (value) {
        var _ref;

        return _ref = {}, _ref[value] = function () {
          return '';
        }, _ref;
      })));
    } else if (this.isVideo || this.isVideoPlaceholder) {
      imgUrl = this.poster;

      if (utils["a" /* default */].isExternalUrl(this.url)) {
        urls[urlTypes["b" /* URL_TYPES */].VIDEO] = function () {
          return _this.url;
        };
      } else {
        urls[urlTypes["b" /* URL_TYPES */].VIDEO] = function () {
          return resizeUrl(_this, _this.url, resizeMethods["a" /* default */].VIDEO, requiredWidth, requiredHeight);
        };
      }
    }

    urls[urlTypes["b" /* URL_TYPES */].HIGH_RES] = function () {
      return resizeUrl(_this, imgUrl, resizeMethod, requiredWidth, requiredHeight, sharpParams, focalPoint);
    };

    urls[urlTypes["b" /* URL_TYPES */].LOW_RES] = function () {
      return resizeUrl(_this, imgUrl, resizeMethod, thumbSize, thumbSize * requiredHeight / requiredWidth, galleryItem_objectSpread(galleryItem_objectSpread({}, sharpParams), {}, {
        quality: 30,
        blur: 30
      }), focalPoint);
    };

    urls[urlTypes["b" /* URL_TYPES */].SEO] = function () {
      return urls[urlTypes["b" /* URL_TYPES */].HIGH_RES]().replace(/\.webp$/i, "." + _this.fileType);
    }; // SEO needs the original file type (jpg or png, etc..) instead of .webp, replace does not mutate


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
    // override sharpParams with item sharpParams
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
        this.urls.pixel_url = this.resizedUrl(resizeMethods["a" /* default */].FILL, 1, 1, {
          quality: 5
        });
      }

      return this.urls.pixel_url;
    }
  }, {
    key: "thumbnail_url",
    get: function get() {
      if (!this.urls.thumbnail_url) {
        this.urls.thumbnail_url = this.resizedUrl(resizeMethods["a" /* default */].FILL, this.thumbnailSize, this.thumbnailSize, {
          quality: 70
        });
      }

      return this.urls.thumbnail_url;
    }
  }, {
    key: "square_url",
    get: function get() {
      if (!this.urls.square_url) {
        this.urls.square_url = this.resizedUrl(resizeMethods["a" /* default */].FILL, 100, 100, {
          quality: 80
        });
      }

      return this.urls.square_url;
    }
  }, {
    key: "full_url",
    get: function get() {
      if (!this.urls.full_url) {
        this.urls.full_url = this.resizedUrl(resizeMethods["a" /* default */].FULL, this.maxWidth, this.maxHeight, this.sharpParams);
      }

      return this.urls.full_url;
    }
  }, {
    key: "sample_url",
    get: function get() {
      if (!this.urls.sample_url) {
        this.urls.sample_url = this.resizedUrl(resizeMethods["a" /* default */].FIT, 500, 500, this.sharpParams);
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

      if (utils["a" /* default */].isUndefined(md)) {
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
      return this.cubeImages && this.cubeType === resizeMethods["a" /* default */].FILL;
    }
  }, {
    key: "focalPoint",
    get: function get() {
      return this.metadata.focalPoint || [0.5, 0.5];
    },
    set: function set(value) {
      this.metadata.focalPoint = value;
    } // ----------------------------------------------------------------//

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
      // todo :change from mediaUrl
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
      return utils["a" /* default */].hashToInt(this.url);
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
      if (this.metadata.link && !utils["a" /* default */].isUndefined(this.metadata.link.type)) {
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
      return utils["a" /* default */].get(this, 'metadata.link.target');
    }
  }, {
    key: "linkOpenType",
    get: function get() {
      if (this.metadata.link && !utils["a" /* default */].isUndefined(this.metadata.link.target)) {
        return this.unprotectedLinkOpenType;
      } else if (this.metadata.link && !utils["a" /* default */].isUndefined(this.metadata.link.targetBlank)) {
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
      return true;
    }
  }, {
    key: "isRendered",
    get: function get() {
      return true;
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
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/galleryGroup.js
function galleryGroup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function galleryGroup_createClass(Constructor, protoProps, staticProps) { if (protoProps) galleryGroup_defineProperties(Constructor.prototype, protoProps); if (staticProps) galleryGroup_defineProperties(Constructor, staticProps); return Constructor; }




var galleryGroup_GalleryGroup = /*#__PURE__*/function () {
  function GalleryGroup(config) {
    this.uniqueId = utils["a" /* default */].generateUUID();
    this.isGalleryGroup = true;

    if (config.dto && config.dto.dto) {
      config.dto = config.dto.dto; //defence patch due to mis-use of item-core

      if (utils["a" /* default */].isDev()) {
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
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/helpers/itemsHelper.js
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
      var metadata = typeof dtoMetadata === 'object' ? dtoMetadata : utils["a" /* default */].parseStringObject(dtoMetadata) || {};
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
    if (utils["a" /* default */].isVerbose()) {
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

    if (utils["a" /* default */].isVerbose()) {
      console.timeEnd('convertToGalleryItems');
    }

    return galleryStructure;
  };

  return ItemsHelper;
}();
// EXTERNAL MODULE: ./node_modules/pro-gallery/dist/es/src/components/galleryComponent.js + 1 modules
var galleryComponent = __webpack_require__(700);

// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryDebugMessage.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var galleryDebugMessage_GalleryDebugMessage = /*#__PURE__*/function (_GalleryComponent) {
  _inheritsLoose(GalleryDebugMessage, _GalleryComponent);

  function GalleryDebugMessage() {
    return _GalleryComponent.apply(this, arguments) || this;
  }

  var _proto = GalleryDebugMessage.prototype;

  _proto.render = function render() {
    if (utils["a" /* default */].getTopUrlParam('pgdebug') !== 'true') {
      return false;
    }

    var version = /*#__PURE__*/react_default.a.createElement("div", {
      className: "version-header "
    }, "Pro Gallery Version #", windowWrapper["a" /* default */].staticsVersion);
    var parentSize = '';

    try {
      parentSize = ' psw' + windowWrapper["a" /* default */].top.screen.width + ' piw' + windowWrapper["a" /* default */].top.innerWidth + ' pbw' + windowWrapper["a" /* default */].top.document.body.clientWidth;
    } catch (e) {//not on the domain
    }

    var debugMsg = /*#__PURE__*/react_default.a.createElement("div", {
      className: "version-header "
    }, utils["a" /* default */].isLandscape() ? 'land' : 'port', " sw", windowWrapper["a" /* default */].screen.width, "sh", windowWrapper["a" /* default */].screen.height, " iw", windowWrapper["a" /* default */].innerWidth, " bw", windowWrapper["a" /* default */].document.body.clientWidth, " sr", '1', "rc", this.props.resizeCount, " oc", this.props.orientationCount, " nh", this.props.newHeight, " lh", this.props.lastHeight, parentSize, "www", this.props.maxGalleryWidth);
    return /*#__PURE__*/react_default.a.createElement("div", null, version, debugMsg);
  };

  return GalleryDebugMessage;
}(galleryComponent["a" /* GalleryComponent */]);

/* harmony default export */ var galleryDebugMessage = (galleryDebugMessage_GalleryDebugMessage);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/imageItem.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function imageItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function imageItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { imageItem_ownKeys(Object(source), true).forEach(function (key) { imageItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { imageItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function imageItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function imageItem_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var BLURRY_IMAGE_REMOVAL_ANIMATION_DURATION = 1000;

var imageItem_ImageItem = /*#__PURE__*/function (_GalleryComponent) {
  imageItem_inheritsLoose(ImageItem, _GalleryComponent);

  function ImageItem(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;
    _this.getImageContainer = _this.getImageContainer.bind(_assertThisInitialized(_this));
    _this.getImageContainerClassNames = _this.getImageContainerClassNames.bind(_assertThisInitialized(_this));
    _this.getImageElement = _this.getImageElement.bind(_assertThisInitialized(_this));
    _this.state = {
      isHighResImageLoaded: false
    };
    _this.removeLowResImageTimeoutId = undefined;
    _this.handleHighResImageLoad = _this.handleHighResImageLoad.bind(_assertThisInitialized(_this));
    return _this;
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

  _proto.handleHighResImageLoad = function handleHighResImageLoad(_ref) {
    var _this2 = this;

    var target = _ref.target;
    this.removeLowResImageTimeoutId = setTimeout(function () {
      _this2.setState({
        isHighResImageLoaded: true
      });

      _this2.removeLowResImageTimeoutId = undefined;
    }, BLURRY_IMAGE_REMOVAL_ANIMATION_DURATION);

    try {
      target.style.opacity = '1';
      this.props.actions.setItemLoaded();
    } catch (e) {
      console.error('Failed to load high res image', e);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.removeLowResImageTimeoutId !== undefined) {
      clearTimeout(this.removeLowResImageTimeoutId);
    }
  };

  _proto.getImageContainerClassNames = function getImageContainerClassNames() {
    var styleParams = this.props.styleParams;
    var imageContainerClassNames = ['gallery-item-content', 'image-item', 'gallery-item-visible', 'gallery-item', 'gallery-item-preloaded', styleParams.cubeImages && styleParams.cubeType === 'fit' ? 'grid-fit' : '', styleParams.imageLoadingMode === constants["a" /* default */].loadingMode.COLOR ? 'load-with-color' : ''].join(' ');
    return imageContainerClassNames;
  };

  _proto.getImageContainer = function getImageContainer(imageRenerer, classNames, extraNodes) {
    var _this$props = this.props,
        imageDimensions = _this$props.imageDimensions,
        id = _this$props.id,
        actions = _this$props.actions;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: classNames,
      onTouchStart: actions.handleItemMouseDown,
      onTouchEnd: actions.handleItemMouseUp,
      key: 'image_container-' + id,
      "data-hook": 'image-item',
      style: imageDimensions.borderRadius ? {
        borderRadius: imageDimensions.borderRadius
      } : {}
    }, imageRenerer(), extraNodes);
  };

  _proto.getImageElement = function getImageElement() {
    var _this3 = this;

    var _this$props2 = this.props,
        alt = _this$props2.alt,
        imageDimensions = _this$props2.imageDimensions,
        createUrl = _this$props2.createUrl,
        id = _this$props2.id,
        settings = _this$props2.settings,
        styleParams = _this$props2.styleParams;
    var isHighResImageLoaded = this.state.isHighResImageLoaded;
    var imageProps = settings && settings.imageProps && typeof settings.imageProps === 'function' ? settings.imageProps(id) : {};

    var _ref2 = imageDimensions || {},
        marginLeft = _ref2.marginLeft,
        marginTop = _ref2.marginTop,
        restOfDimensions = _objectWithoutPropertiesLoose(_ref2, ["marginLeft", "marginTop"]);

    var image = function image() {
      var imagesComponents = [];
      var blockDownloadStyles = utils["a" /* default */].isMobile() && !_this3.props.styleParams.allowContextMenu ? {
        '-webkit-user-select': 'none',
        '-webkit-touch-callout': 'none'
      } : {};

      if (!isHighResImageLoaded) {
        var preload = null;

        var preloadProps = imageItem_objectSpread({
          className: 'gallery-item-visible gallery-item gallery-item-preloaded',
          key: 'gallery-item-image-img-preload',
          'data-hook': 'gallery-item-image-img-preload',
          loading: "lazy"
        }, imageProps);

        var preloadStyles = Object(viewModeWrapper["c" /* isPrerenderMode */])() ? {
          width: '100%',
          height: '100%'
        } : {};

        switch (styleParams.imageLoadingMode) {
          case constants["a" /* default */].loadingMode.BLUR:
            var imageStyles = imageItem_objectSpread(imageItem_objectSpread({}, restOfDimensions), {}, {
              backgroundSize: '0.3px',
              backgroundRepeat: 'repeat'
            });

            preload = /*#__PURE__*/react_default.a.createElement("img", _extends({
              alt: "",
              key: 'image_preload_blur-' + id,
              src: createUrl(constants["a" /* default */].urlSizes.RESIZED, Object(viewModeWrapper["e" /* isSEOMode */])() ? constants["a" /* default */].urlTypes.SEO : constants["a" /* default */].urlTypes.LOW_RES),
              style: imageItem_objectSpread(imageItem_objectSpread(imageItem_objectSpread({}, imageStyles), preloadStyles), blockDownloadStyles)
            }, preloadProps));
            break;

          case constants["a" /* default */].loadingMode.MAIN_COLOR:
            preload = /*#__PURE__*/react_default.a.createElement("img", _extends({
              alt: "",
              key: 'image_preload_main_color-' + id,
              src: createUrl(constants["a" /* default */].urlSizes.PIXEL, Object(viewModeWrapper["e" /* isSEOMode */])() ? constants["a" /* default */].urlTypes.SEO : constants["a" /* default */].urlTypes.LOW_RES),
              style: imageItem_objectSpread(imageItem_objectSpread(imageItem_objectSpread({}, restOfDimensions), preloadStyles), blockDownloadStyles)
            }, preloadProps));
            break;
        }

        imagesComponents.push(preload);
      }

      var shouldRenderHighResImages = !Object(viewModeWrapper["c" /* isPrerenderMode */])() && !utils["a" /* default */].isSSR();

      if (shouldRenderHighResImages) {
        var highres = /*#__PURE__*/react_default.a.createElement("img", _extends({
          key: 'image_highres-' + id,
          className: "gallery-item-visible gallery-item gallery-item-preloaded " + (Object(viewModeWrapper["e" /* isSEOMode */])() ? '' : 'gallery-item-hidden'),
          "data-hook": "gallery-item-image-img",
          alt: alt ? alt : 'untitled image',
          src: createUrl(constants["a" /* default */].urlSizes.RESIZED, Object(viewModeWrapper["e" /* isSEOMode */])() ? constants["a" /* default */].urlTypes.SEO : constants["a" /* default */].urlTypes.HIGH_RES),
          loading: "lazy",
          onLoad: _this3.handleHighResImageLoad,
          style: imageItem_objectSpread(imageItem_objectSpread(imageItem_objectSpread({}, restOfDimensions), _this3.state.isHighResImageLoaded && {
            opacity: 1
          }), blockDownloadStyles)
        }, imageProps));
        imagesComponents.push(highres);
      }

      return imagesComponents;
    };

    return image;
  };

  _proto.render = function render() {
    var imageRenderer = this.getImageElement();
    var imageContainerClassNames = this.getImageContainerClassNames();
    var renderedItem = this.getImageContainer(imageRenderer, imageContainerClassNames);
    return renderedItem;
  };

  return ImageItem;
}(galleryComponent["a" /* GalleryComponent */]);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/textItem.js
function textItem_extends() { textItem_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return textItem_extends.apply(this, arguments); }

function textItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function textItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { textItem_ownKeys(Object(source), true).forEach(function (key) { textItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { textItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function textItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function textItem_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var textItem_TextItem = /*#__PURE__*/function (_GalleryComponent) {
  textItem_inheritsLoose(TextItem, _GalleryComponent);

  function TextItem(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;

    if (typeof _this.props.actions.setItemLoaded === 'function') {
      _this.props.actions.setItemLoaded();
    }

    return _this;
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
}(galleryComponent["a" /* GalleryComponent */]);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemHover.js
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
    hoverClass.push('fullscreen-' + (styleParams.fullscreen ? 'enabled' : 'disabled'));

    if (utils["a" /* default */].isUndefined(styleParams.itemOpacity)) {
      //if gallery was just added to the page, and it's settings were never opened,
      //the styles of opacity and background were not set (are undefined),
      //so we are using the default background & opacity (is scss under .gallery-item-hover.default)
      hoverClass.push('default');
    }

    if (forceShowHover) {
      //in mobile, when item is hovered (tapped, with all the right configurations), forceShowHover is true
      hoverClass.push('force-hover');
    } else if (utils["a" /* default */].isMobile()) {
      hoverClass.push('hide-hover');
    }

    return hoverClass.join(' ');
  };

  _proto.shouldRenderHoverInnerIfExist = function shouldRenderHoverInnerIfExist() {
    var _this$props2 = this.props,
        itemWasHovered = _this$props2.itemWasHovered,
        styleParams = _this$props2.styleParams;
    var hoveringBehaviour = styleParams.hoveringBehaviour,
        overlayAnimation = styleParams.overlayAnimation,
        alwaysShowHover = styleParams.alwaysShowHover;
    var APPEARS = constants["a" /* default */].infoBehaviourOnHover.APPEARS;
    var NO_EFFECT = constants["a" /* default */].overlayAnimations.NO_EFFECT;

    if (alwaysShowHover) {
      return true;
    }

    if (hoveringBehaviour === APPEARS && overlayAnimation !== NO_EFFECT) {
      //when there is a specific overlayAnimation, to support the animation we render the itemHover before any hover activity (see 'shouldHover()' in itemView).
      //so in this specific case, the itemHover exists right away, but we do'nt want to render yet the hover-inner,
      //the hover-inner will be rendered only after (at) the first hover an on, and not before.
      return itemWasHovered;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        imageDimensions = _this$props3.imageDimensions,
        actions = _this$props3.actions,
        idx = _this$props3.idx,
        renderCustomInfo = _this$props3.renderCustomInfo;
    var hoverClass = this.getHoverClass();
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: hoverClass,
      key: 'item-hover-' + idx,
      "data-hook": 'item-hover-' + idx,
      "aria-hidden": true,
      style: imageDimensions && imageDimensions.borderRadius ? {
        borderRadius: imageDimensions.borderRadius
      } : {}
    }, /*#__PURE__*/react_default.a.createElement("div", {
      style: {
        height: '100%'
      },
      onTouchStart: actions.handleItemMouseDown,
      onTouchEnd: actions.handleItemMouseUp
    }, this.shouldRenderHoverInnerIfExist() && renderCustomInfo ? /*#__PURE__*/react_default.a.createElement("div", {
      className: "gallery-item-hover-inner"
    }, renderCustomInfo()) : null));
  };

  return ItemHover;
}(galleryComponent["a" /* GalleryComponent */]);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/cssScrollHelper.js


var cssScrollHelper_CssScrollHelper = /*#__PURE__*/function () {
  function CssScrollHelper() {
    this.pgScrollSteps = [40960, 20480, 10240, 5120, 2560, 1280, 640, 320, 160, 80, 40, 20, 10];
    this.pgScrollClassName = 'pgscl';
    this.screenSize = Math.max(windowWrapper["a" /* default */].screen.width, windowWrapper["a" /* default */].screen.height);
    this.scrollCss = [];
    this.scrollCssProps = [];
    this.calcScrollPaddings(false);
  }

  var _proto = CssScrollHelper.prototype;

  _proto.calcScrollPaddings = function calcScrollPaddings() {
    var _this = this;

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
      return [5120, Infinity];
    };

    this.lowResPadding = function () {
      return [10240, Infinity];
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
        styleParams = _ref2.styleParams;

    if (!(items && items.length)) {
      return [];
    }

    var scrollAnimation = styleParams.scrollAnimation;

    if (!scrollAnimation || scrollAnimation === constants["a" /* default */].scrollAnimations.NO_EFFECT) {
      return [];
    }

    this.screenSize = styleParams.oneRow ? Math.min(windowWrapper["a" /* default */].outerWidth, windowWrapper["a" /* default */].screen.width) : Math.min(windowWrapper["a" /* default */].outerHeight, windowWrapper["a" /* default */].screen.height);

    if (!styleParams.oneRow && utils["a" /* default */].isMobile()) {
      this.screenSize += 50;
    }

    this.calcScrollPaddings();

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
        styleParams: styleParams
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
        styleParams = _ref5.styleParams;
    var idx = item.idx;
    var scrollCss = '';
    var createScrollSelectors = this.createScrollSelectorsFunction({
      domId: domId,
      item: item,
      styleParams: styleParams
    }); //scrollAnimation

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

    if (!scrollAnimation || scrollAnimation === constants["a" /* default */].scrollAnimations.NO_EFFECT) {
      return '';
    }

    var _randomDelay = (idx % 3 + 1) * 100; //100 - 300


    var _randomDuration = (idx % 3 + 1) * 100; //100 - 300


    var animationPreparationPadding = this.allPagePadding();
    var animationActivePadding = this.aboveScreenPadding();
    var scrollAnimationCss = ''; // notice: these 2 animations must have the blurry image

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.MAIN_COLOR) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .image-item') + "{background-size: 1px; background-repeat: repeat;}";
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, " img") + ("{filter: opacity(0); transition: filter 1." + _randomDuration + "s ease-in " + _randomDelay + "ms !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, " img") + "{filter: opacity(1) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.BLUR) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, " img") + ("{filter: opacity(0); transition: filter 1." + _randomDuration + "s ease-in " + _randomDelay + "ms !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, " img") + "{filter: opacity(1) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.FADE_IN) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{filter: opacity(0); transition: filter 1." + _randomDuration + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{filter: opacity(1) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.GRAYSCALE) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{filter: grayscale(100%); transition: filter 1." + (200 + _randomDuration) + "s ease-in !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{filter: grayscale(0) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.SLIDE_UP) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + "{transform: translateY(100px); transition: transform 0.8s cubic-bezier(.13,.78,.53,.92) !important;}";
      scrollAnimationCss += createScrollSelectors(animationActivePadding, '') + "{transform: translateY(0) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.EXPAND) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + ("{transform: scale(0.95); transition: transform 1s cubic-bezier(.13,.78,.53,.92) " + _randomDelay + "ms !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, '') + "{transform: scale(1) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.SHRINK) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + ("{transform: scale(1.05); transition: transform 1s cubic-bezier(.13,.78,.53,.92) " + _randomDelay + "ms !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, '') + "{transform: scale(1) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.ZOOM_OUT) {
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{transform: scale(1.1); transition: transform 1.2s cubic-bezier(.13,.78,.53,.92) " + _randomDelay + "ms !important;}");
      scrollAnimationCss += createScrollSelectors(animationActivePadding, ' .gallery-item-wrapper') + "{transform: scale(1) !important;}";
    }

    if (scrollAnimation === constants["a" /* default */].scrollAnimations.ONE_COLOR) {
      var oneColorAnimationColor = styleParams.oneColorAnimationColor && styleParams.oneColorAnimationColor.value ? styleParams.oneColorAnimationColor.value : 'transparent';
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, '') + ("{background-color: " + oneColorAnimationColor + ";}");
      scrollAnimationCss += createScrollSelectors(animationPreparationPadding, ' .gallery-item-wrapper') + ("{filter: opacity(0); transition: filter 0." + (600 + _randomDuration) + "s ease-in !important;}");
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
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemViewStyleProvider.js
function itemViewStyleProvider_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function itemViewStyleProvider_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { itemViewStyleProvider_ownKeys(Object(source), true).forEach(function (key) { itemViewStyleProvider_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { itemViewStyleProvider_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function itemViewStyleProvider_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function getContainerStyle(styleParams) {
  return itemViewStyleProvider_objectSpread({}, (styleParams.imageInfoType === constants["a" /* default */].infoType.ATTACHED_BACKGROUND || constants["a" /* default */].hasHoverPlacement(styleParams.titlePlacement)) && itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, getBorderStyle(styleParams.itemBorderRadius, styleParams.itemBorderWidth, styleParams.itemBorderColor)), boxShadow(styleParams)));
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
      boxShadow: shadowX + "px " + shadowY + "px " + itemShadowBlur + "px " + utils["a" /* default */].formatColor(styleParams.itemShadowOpacityAndColor)
    };
  }

  return _boxShadow;
}

function getImageStyle(styleParams) {
  return itemViewStyleProvider_objectSpread({}, !constants["a" /* default */].hasHoverPlacement(styleParams.titlePlacement) && (styleParams.imageInfoType === constants["a" /* default */].infoType.NO_BACKGROUND || styleParams.imageInfoType === constants["a" /* default */].infoType.SEPARATED_BACKGROUND) && itemViewStyleProvider_objectSpread({}, getBorderStyle(styleParams.itemBorderRadius, styleParams.itemBorderWidth, styleParams.itemBorderColor)));
}

function getBorderStyle(borderRadius, borderWidth, borderColor) {
  return itemViewStyleProvider_objectSpread({
    overflow: 'hidden',
    borderRadius: borderRadius,
    borderWidth: borderWidth + 'px',
    borderColor: utils["a" /* default */].formatColor(borderColor)
  }, borderWidth && {
    borderStyle: 'solid'
  });
}

function getOuterInfoStyle(placement, styleParams, mediaHeight, textBoxHeight) {
  var styles = itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, constants["a" /* default */].hasHorizontalPlacement(placement) && {
    height: mediaHeight,
    "float": constants["a" /* default */].isRightPlacement(placement) ? 'right' : 'left'
  }), constants["a" /* default */].hasVerticalPlacement(placement) && {
    height: textBoxHeight,
    boxSizing: 'content-box'
  });

  if (styleParams.imageInfoType === constants["a" /* default */].infoType.SEPARATED_BACKGROUND) {
    return itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, styles), getBorderStyle(styleParams.textBoxBorderRadius, styleParams.textBoxBorderWidth, styleParams.textBoxBorderColor)), constants["a" /* default */].hasAbovePlacement(placement) && {
      marginBottom: styleParams.textImageSpace
    }), constants["a" /* default */].hasBelowPlacement(placement) && {
      marginTop: styleParams.textImageSpace
    });
  }

  return styles;
}

function getInnerInfoStylesAboveOrBelow(styleParams, infoHeight) {
  return {
    width: '100%',
    height: infoHeight
  };
}

function getInnerInfoStylesRightOrLeft(styleParams, infoWidth) {
  return {
    height: '100%',
    width: infoWidth
  };
}

function getInnerInfoStyle(placement, styleParams, infoHeight, infoWidth) {
  var commonStyles = itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, (styleParams.imageInfoType === constants["a" /* default */].infoType.SEPARATED_BACKGROUND || styleParams.imageInfoType === constants["a" /* default */].infoType.ATTACHED_BACKGROUND) && styleParams.textBoxFillColor && styleParams.textBoxFillColor.value && {
    backgroundColor: styleParams.textBoxFillColor.value
  }), {}, {
    overflow: 'hidden',
    boxSizing: 'border-box'
  });

  var infoAboveOrBelow = constants["a" /* default */].hasVerticalPlacement(placement);
  var infoRightOrLeft = constants["a" /* default */].hasHorizontalPlacement(placement);
  return itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread(itemViewStyleProvider_objectSpread({}, commonStyles), infoAboveOrBelow && getInnerInfoStylesAboveOrBelow(styleParams, infoHeight)), infoRightOrLeft && getInnerInfoStylesRightOrLeft(styleParams, infoWidth));
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(914);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

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
function videoItemPlaceholder_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var VideoItemPlaceholder = /*#__PURE__*/function (_ImageItem) {
  videoItemPlaceholder_inheritsLoose(VideoItemPlaceholder, _ImageItem);

  function VideoItemPlaceholder() {
    return _ImageItem.apply(this, arguments) || this;
  }

  var _proto = VideoItemPlaceholder.prototype;

  _proto.render = function render() {
    var videoControls = this.props.videoControls;
    var VideoPlaceholderContainerClassnames = this.getImageContainerClassNames() + ' video-item gallery-item-video';
    var videoPlaceholderImageRenderer = this.getImageElement();
    var renderedItem = this.getImageContainer(videoPlaceholderImageRenderer, VideoPlaceholderContainerClassnames, videoControls);
    return renderedItem;
  };

  return VideoItemPlaceholder;
}(imageItem_ImageItem);

/* harmony default export */ var videoItemPlaceholder = (VideoItemPlaceholder);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/videos/videoItemWrapper.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function videoItemWrapper_extends() { videoItemWrapper_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return videoItemWrapper_extends.apply(this, arguments); }

function videoItemWrapper_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function videoItemWrapper_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var videoControls = [/*#__PURE__*/react_default.a.createElement("i", {
  key: "play-triangle",
  "data-hook": "play-triangle",
  className: 'gallery-item-video-play-triangle play-triangle '
}, /*#__PURE__*/react_default.a.createElement(components_play_triangle, null)), /*#__PURE__*/react_default.a.createElement("i", {
  key: "play-bg",
  "data-hook": "play-background",
  className: 'gallery-item-video-play-background play-background '
}, /*#__PURE__*/react_default.a.createElement(components_play_background, null))];

var videoItemWrapper_VideoItemWrapper = /*#__PURE__*/function (_ImageItem) {
  videoItemWrapper_inheritsLoose(VideoItemWrapper, _ImageItem);

  function VideoItemWrapper(props) {
    var _this;

    _this = _ImageItem.call(this, props) || this;
    _this.shouldPlayVideo = _this.shouldPlayVideo.bind(videoItemWrapper_assertThisInitialized(_this));
    _this.createVideoItemPlaceholder = _this.createVideoItemPlaceholder.bind(videoItemWrapper_assertThisInitialized(_this));
    _this.state = {
      VideoItemLoaded: false
    };
    return _this;
  }

  var _proto = VideoItemWrapper.prototype;

  _proto.shouldPlayVideo = function shouldPlayVideo() {
    var _this$props$stylePara = this.props.styleParams,
        videoPlay = _this$props$stylePara.videoPlay,
        itemClick = _this$props$stylePara.itemClick;
    var hasLink = this.props.hasLink;

    if (this.props.isVideoPlaceholder) {
      return false;
    }

    if (this.props.idx === this.props.playingVideoIdx || this.props.idx === this.props.nextVideoIdx) {
      if (videoPlay === 'hover' || videoPlay === 'auto') {
        return true;
      } else if (itemClick === 'nothing') {
        return true;
      } else if (itemClick === 'link' && !hasLink) {
        return true;
      }
    }

    return false;
  };

  _proto.createVideoItemPlaceholder = function createVideoItemPlaceholder(showVideoControls) {
    var props = utils["a" /* default */].pick(this.props, ['alt', 'title', 'description', 'id', 'idx', 'styleParams', 'createUrl', 'settings', 'actions']);
    return /*#__PURE__*/react_default.a.createElement(videoItemPlaceholder, videoItemWrapper_extends({}, props, {
      key: "videoPlaceholder",
      imageDimensions: this.props.imageDimensions,
      isThumbnail: !!this.props.thumbnailHighlightId,
      id: this.props.idx,
      videoControls: showVideoControls && videoControls
    }));
  };

  _proto.componentDidMount = /*#__PURE__*/function () {
    var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var VideoItem;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return __webpack_require__.e(/* import() | videoItem */ 5).then(__webpack_require__.bind(null, 986));

            case 3:
              VideoItem = _context.sent;
              this.VideoItem = VideoItem["default"];

              if (this.shouldPlayVideo()) {
                this.setState({
                  VideoItemLoaded: true
                });
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error('Failed to fetch VideoItem');

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 8]]);
    }));

    function componentDidMount() {
      return _componentDidMount.apply(this, arguments);
    }

    return componentDidMount;
  }();

  _proto.render = function render() {
    var hover = this.props.hover;
    var showVideoControls = !this.props.hidePlay && this.props.styleParams.showVideoPlayButton;
    var videoPlaceholder = this.createVideoItemPlaceholder(showVideoControls);
    var VideoItem = this.VideoItem;

    if (!this.shouldPlayVideo() || !VideoItem) {
      return [videoPlaceholder, hover];
    }

    return /*#__PURE__*/react_default.a.createElement(VideoItem, videoItemWrapper_extends({}, this.props, {
      videoControls: showVideoControls && videoControls
    }));
  };

  return VideoItemWrapper;
}(imageItem_ImageItem);

/* harmony default export */ var videoItemWrapper = (videoItemWrapper_VideoItemWrapper);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/item/itemView.js
function itemView_extends() { itemView_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return itemView_extends.apply(this, arguments); }

function itemView_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
        _this.props.actions.eventsListener(constants["a" /* default */].events.HOVER_SET, -1);

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

    _this.props.actions.eventsListener(constants["a" /* default */].events.ITEM_CREATED, _this.props);

    _this.init();

    _this.state = {
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
    this.onContainerKeyDown = this.onContainerKeyDown.bind(this);
    this.handleItemMouseDown = this.handleItemMouseDown.bind(this);
    this.handleItemMouseUp = this.handleItemMouseUp.bind(this);
    this.setItemLoaded = this.setItemLoaded.bind(this);
    this.isHighlight = this.isHighlight.bind(this);
    this.getItemHover = this.getItemHover.bind(this);
    this.getImageItem = this.getImageItem.bind(this);
    this.getVideoItem = this.getVideoItem.bind(this);
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
    this.onMouseOut = this.onMouseOut.bind(this);
    this.changeActiveElementIfNeeded = this.changeActiveElementIfNeeded.bind(this);
    this.checkIfCurrentHoverChanged = this.checkIfCurrentHoverChanged.bind(this);
    this.getCustomInfoRendererProps = this.getCustomInfoRendererProps.bind(this);
  } //----------------------------------------| ACTIONS |-------------------------------------------//
  ;

  _proto.setItemLoaded = function setItemLoaded() {
    this.props.actions.eventsListener(constants["a" /* default */].events.ITEM_LOADED, this.props);
    this.setState({
      loaded: true
    });
  };

  _proto.isIconTag = function isIconTag(tagName) {
    return ['button', 'i', 'a', 'svg', 'path'].indexOf(tagName.toLowerCase()) >= 0;
  };

  _proto.onMouseOver = function onMouseOver() {
    if (!utils["a" /* default */].isMobile()) {
      this.props.actions.eventsListener(constants["a" /* default */].events.HOVER_SET, this.props.idx);
    }
  };

  _proto.onMouseOut = function onMouseOut() {
    if (!utils["a" /* default */].isMobile()) {
      this.props.actions.eventsListener(constants["a" /* default */].events.HOVER_SET, -1);
    }
  };

  _proto.onContainerKeyDown = function onContainerKeyDown(e) {
    switch (e.keyCode || e.charCode) {
      case 32: //space

      case 13:
        //enter
        e.stopPropagation();
        var clickTarget = 'item-container';
        this.onItemClick(e, clickTarget, false); //pressing enter or space always behaves as click on main image, even if the click is on a thumbnail

        if (this.shouldUseDirectLink()) {
          this.itemAnchor.click(); // when directLink, we want to simulate the 'enter' or 'space' press on an <a> element
        }

        return false;

      default:
        return true;
    }
  };

  _proto.handleGalleryItemAction = function handleGalleryItemAction(e) {
    this.props.actions.eventsListener(constants["a" /* default */].events.ITEM_ACTION_TRIGGERED, this.props, e);
  };

  _proto.onItemWrapperClick = function onItemWrapperClick(e) {
    var clickTarget = 'item-media';
    this.onItemClick(e, clickTarget);
  };

  _proto.onItemInfoClick = function onItemInfoClick(e) {
    var clickTarget = 'item-info';
    this.onItemClick(e, clickTarget);
  };

  _proto.onItemClick = function onItemClick(e, clickTarget, shouldPreventDefault) {
    if (shouldPreventDefault === void 0) {
      shouldPreventDefault = true;
    }

    if (utils["a" /* default */].isFunction(utils["a" /* default */].get(windowWrapper["a" /* default */], 'galleryWixCodeApi.onItemClicked'))) {
      windowWrapper["a" /* default */].galleryWixCodeApi.onItemClicked(this.props); //TODO remove after OOI is fully integrated
    }

    this.props.actions.eventsListener(constants["a" /* default */].events.ITEM_CLICKED, itemView_objectSpread(itemView_objectSpread({}, this.props), {}, {
      clickTarget: clickTarget
    }), e);

    if (this.shouldUseDirectLink()) {
      return;
    }

    if (shouldPreventDefault) {
      e.preventDefault();
    }

    if (this.shouldShowHoverOnMobile()) {
      this.handleHoverClickOnMobile(e);
    } else {
      this.handleGalleryItemAction(e);
    }
  };

  _proto.handleHoverClickOnMobile = function handleHoverClickOnMobile(e) {
    if (this.isClickOnCurrentHoveredItem()) {
      this.handleGalleryItemAction(e);
      this.props.actions.eventsListener(constants["a" /* default */].events.HOVER_SET, -1);
    } else {
      this.props.actions.eventsListener(constants["a" /* default */].events.HOVER_SET, this.props.idx);
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
    if (utils["a" /* default */].isMobile() && this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }

    return true; //make sure the default event behaviour continues
  } //-----------------------------------------| UTILS |--------------------------------------------//
  ;

  _proto.shouldShowHoverOnMobile = function shouldShowHoverOnMobile() {
    if (utils["a" /* default */].isMobile()) {
      var _this$props$stylePara = this.props.styleParams,
          titlePlacement = _this$props$stylePara.titlePlacement,
          hoveringBehaviour = _this$props$stylePara.hoveringBehaviour,
          itemClick = _this$props$stylePara.itemClick,
          alwaysShowHover = _this$props$stylePara.alwaysShowHover,
          previewHover = _this$props$stylePara.previewHover,
          allowDescription = _this$props$stylePara.allowDescription,
          allowTitle = _this$props$stylePara.allowTitle,
          isStoreGallery = _this$props$stylePara.isStoreGallery;
      var isNewMobileSettings = featureManager.supports.mobileSettings;

      if (hoveringBehaviour === constants["a" /* default */].infoBehaviourOnHover.NEVER_SHOW) {
        return false;
      }

      if (itemClick === 'nothing' && this.props.type !== 'video') {
        return true;
      } else if (this.props.customHoverRenderer && constants["a" /* default */].hasHoverPlacement(titlePlacement) && hoveringBehaviour !== constants["a" /* default */].infoBehaviourOnHover.NEVER_SHOW && isNewMobileSettings && (allowDescription || allowTitle || isStoreGallery)) {
        return true;
      }

      if (alwaysShowHover) {
        return true;
      }

      if (Object(viewModeWrapper["a" /* isEditMode */])() && previewHover) {
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
        hoveringBehaviour = styleParams.hoveringBehaviour,
        overlayAnimation = styleParams.overlayAnimation;
    var _GALLERY_CONSTS$infoB = constants["a" /* default */].infoBehaviourOnHover,
        NEVER_SHOW = _GALLERY_CONSTS$infoB.NEVER_SHOW,
        APPEARS = _GALLERY_CONSTS$infoB.APPEARS;
    var NO_EFFECT = constants["a" /* default */].overlayAnimations.NO_EFFECT;

    if (hoveringBehaviour === NEVER_SHOW) {
      return false;
    } else if (alwaysShowHover === true) {
      return true;
    } else if (Object(viewModeWrapper["a" /* isEditMode */])() && previewHover) {
      return true;
    } else if (hoveringBehaviour === APPEARS && overlayAnimation === NO_EFFECT && !this.state.itemWasHovered) {
      //when there is no overlayAnimation, we want to render the itemHover only on first hover and on (and not before)
      //when there is a specific overlayAnimation, to support the animation we should render the itemHover before any hover activity.
      return false;
    } else if (utils["a" /* default */].isMobile()) {
      return this.shouldShowHoverOnMobile();
    } else {
      return true;
    }
  } //---------------------------------------| COMPONENTS |-----------------------------------------//
  ;

  _proto.getImageDimensions = function getImageDimensions() {
    //image dimensions are for images in grid fit - placing the image with positive margins to show it within the square
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

  _proto.getItemHover = function getItemHover(imageDimensions) {
    var _this2 = this;

    var _this$props2 = this.props,
        customHoverRenderer = _this$props2.customHoverRenderer,
        props = itemView_objectWithoutPropertiesLoose(_this$props2, ["customHoverRenderer"]);

    var shouldHover = this.shouldHover();
    return shouldHover && /*#__PURE__*/react_default.a.createElement(itemHover_ItemHover, itemView_extends({}, props, {
      forceShowHover: this.simulateOverlayHover(),
      imageDimensions: imageDimensions,
      itemWasHovered: this.state.itemWasHovered,
      key: "hover",
      actions: {
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp
      },
      renderCustomInfo: customHoverRenderer ? function () {
        return customHoverRenderer(_this2.getCustomInfoRendererProps());
      } : null
    }));
  };

  _proto.getCustomInfoRendererProps = function getCustomInfoRendererProps() {
    return itemView_objectSpread(itemView_objectSpread({}, this.props), {
      isMobile: utils["a" /* default */].isMobile()
    });
  };

  _proto.getImageItem = function getImageItem(imageDimensions) {
    var props = utils["a" /* default */].pick(this.props, ['alt', 'title', 'description', 'id', 'idx', 'styleParams', 'createUrl', 'settings']);
    return /*#__PURE__*/react_default.a.createElement(imageItem_ImageItem, itemView_extends({}, props, {
      key: "imageItem",
      imageDimensions: imageDimensions,
      isThumbnail: !!this.props.thumbnailHighlightId,
      actions: {
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp,
        setItemLoaded: this.setItemLoaded
      }
    }));
  };

  _proto.getVideoItem = function getVideoItem(imageDimensions, itemHover) {
    return /*#__PURE__*/react_default.a.createElement(videoItemWrapper, itemView_extends({}, this.props, {
      playing: this.props.idx === this.props.playingVideoIdx,
      key: 'video' + this.props.idx,
      hover: itemHover,
      imageDimensions: imageDimensions,
      hasLink: this.itemHasLink(),
      actions: itemView_objectSpread(itemView_objectSpread({}, this.props.actions), {}, {
        setItemLoaded: this.setItemLoaded,
        handleItemMouseDown: this.handleItemMouseDown,
        handleItemMouseUp: this.handleItemMouseUp
      })
    }));
  };

  _proto.getTextItem = function getTextItem(imageDimensions) {
    var props = utils["a" /* default */].pick(this.props, ['id', 'styleParams', 'style', 'html', 'cubeRatio']);
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
    var _this3 = this;

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
    var itemHover = null;

    if (this.shouldHover() || styleParams.isSlideshow) {
      itemHover = this.getItemHover(imageDimensions);
    }

    switch (type) {
      case 'dummy':
        itemInner = /*#__PURE__*/react_default.a.createElement("div", null);
        break;

      case 'video':
        itemInner = this.getVideoItem(imageDimensions, itemHover);
        break;

      case 'text':
        itemInner = [this.getTextItem(imageDimensions), itemHover];
        break;

      case 'image':
      case 'picture':
      default:
        if (this.props.isVideoPlaceholder) {
          itemInner = this.getVideoItem(imageDimensions, itemHover);
        } else {
          itemInner = [this.getImageItem(imageDimensions), itemHover];
        }

    }

    if (styleParams.isSlideshow) {
      var customSlideshowInfoRenderer = this.props.customSlideshowInfoRenderer;
      var style = {
        height: styleParams.slideshowInfoSize + "px",
        bottom: "-" + styleParams.slideshowInfoSize + "px"
      };
      var slideshowInfo = customSlideshowInfoRenderer ? customSlideshowInfoRenderer(this.getCustomInfoRendererProps()) : null;
      var _this$props4 = this.props,
          photoId = _this$props4.photoId,
          id = _this$props4.id,
          idx = _this$props4.idx;
      itemInner = /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("a", itemView_extends({
        ref: function ref(e) {
          return _this3.itemAnchor = e;
        },
        "data-id": photoId,
        "data-idx": idx,
        key: 'item-container-link-' + id
      }, this.getLinkParams(), {
        tabIndex: -1
      }), itemInner), /*#__PURE__*/react_default.a.createElement("div", {
        className: "gallery-slideshow-info",
        "data-hook": "gallery-slideshow-info-buttons",
        style: style
      }, slideshowInfo));
    }

    return itemInner;
  };

  _proto.getRightInfoElementIfNeeded = function getRightInfoElementIfNeeded() {
    if (constants["a" /* default */].hasRightPlacement(this.props.styleParams.titlePlacement)) {
      return this.getExternalInfoElement(constants["a" /* default */].placements.SHOW_ON_THE_RIGHT, 'gallery-item-right-info');
    } else {
      return null;
    }
  };

  _proto.getLeftInfoElementIfNeeded = function getLeftInfoElementIfNeeded() {
    if (constants["a" /* default */].hasLeftPlacement(this.props.styleParams.titlePlacement)) {
      return this.getExternalInfoElement(constants["a" /* default */].placements.SHOW_ON_THE_LEFT, 'gallery-item-left-info');
    } else {
      return null;
    }
  };

  _proto.getBottomInfoElementIfNeeded = function getBottomInfoElementIfNeeded() {
    if (constants["a" /* default */].hasBelowPlacement(this.props.styleParams.titlePlacement)) {
      return this.getExternalInfoElement(constants["a" /* default */].placements.SHOW_BELOW, 'gallery-item-bottom-info');
    } else {
      return null;
    }
  };

  _proto.getTopInfoElementIfNeeded = function getTopInfoElementIfNeeded() {
    if (constants["a" /* default */].hasAbovePlacement(this.props.styleParams.titlePlacement)) {
      return this.getExternalInfoElement(constants["a" /* default */].placements.SHOW_ABOVE, 'gallery-item-top-info');
    } else {
      return null;
    }
  };

  _proto.getExternalInfoElement = function getExternalInfoElement(placement, elementName) {
    var _this$props5 = this.props,
        styleParams = _this$props5.styleParams,
        customInfoRenderer = _this$props5.customInfoRenderer,
        style = _this$props5.style;

    if (!customInfoRenderer) {
      return null;
    }

    var info = null; //if there is no url for videos and images, we will not render the itemWrapper
    //but will render the info element if exists, with the whole size of the item

    var infoHeight = styleParams.textBoxHeight + (this.hasRequiredMediaUrl ? 0 : style.height);
    var infoWidth = style.infoWidth + (this.hasRequiredMediaUrl ? 0 : style.width);
    var itemExternalInfo = customInfoRenderer(this.getCustomInfoRendererProps(), placement);
    info = /*#__PURE__*/react_default.a.createElement("div", {
      style: getOuterInfoStyle(placement, styleParams, style.height, styleParams.textBoxHeight)
    }, /*#__PURE__*/react_default.a.createElement("div", {
      style: getInnerInfoStyle(placement, styleParams, infoHeight, infoWidth),
      className: 'gallery-item-common-info ' + elementName,
      "aria-hidden": true,
      onClick: this.onItemInfoClick
    }, itemExternalInfo));
    return info;
  };

  _proto.simulateHover = function simulateHover() {
    return this.state.isCurrentHover || this.props.styleParams.alwaysShowHover === true || Object(viewModeWrapper["a" /* isEditMode */])() && this.props.styleParams.previewHover;
  };

  _proto.simulateOverlayHover = function simulateOverlayHover() {
    return this.simulateHover() || this.props.styleParams.hoveringBehaviour === constants["a" /* default */].infoBehaviourOnHover.NO_CHANGE;
  };

  _proto.itemHasLink = function itemHasLink() {
    var _this$props6 = this.props,
        linkData = _this$props6.linkData,
        linkUrl = _this$props6.linkUrl;
    var itemDoesntHaveLink = linkData.type === undefined && (linkUrl === undefined || linkUrl === ''); //when itemClick is 'link' but no link was added to this specific item

    return !itemDoesntHaveLink;
  };

  _proto.getItemContainerStyles = function getItemContainerStyles() {
    var _this$props7 = this.props,
        offset = _this$props7.offset,
        style = _this$props7.style,
        styleParams = _this$props7.styleParams,
        _this$props7$settings = _this$props7.settings,
        settings = _this$props7$settings === void 0 ? {} : _this$props7$settings;
    var containerStyleByStyleParams = getContainerStyle(styleParams);
    var itemDoesntHaveLink = !this.itemHasLink(); //when itemClick is 'link' but no link was added to this specific item

    var itemStyles = {
      overflowY: styleParams.isSlideshow ? 'visible' : 'hidden',
      position: 'absolute',
      bottom: 'auto',
      margin: styleParams.oneRow ? styleParams.imageMargin + 'px' : 0,
      cursor: styleParams.itemClick === constants["a" /* default */].itemClick.NOTHING || styleParams.itemClick === constants["a" /* default */].itemClick.LINK && itemDoesntHaveLink ? 'default' : 'pointer'
    };
    var _settings$avoidInline = settings.avoidInlineStyles,
        avoidInlineStyles = _settings$avoidInline === void 0 ? true : _settings$avoidInline;
    var layoutStyles = avoidInlineStyles ? {} : {
      top: offset.top,
      left: styleParams.isRTL ? 'auto' : offset.left,
      right: !styleParams.isRTL ? 'auto' : offset.left,
      width: style.width + style.infoWidth,
      height: style.height + style.infoHeight
    };
    var transitionStyles = this.state.loaded && Object(viewModeWrapper["a" /* isEditMode */])() ? {
      transition: 'all .4s ease',
      transitionProperty: 'top, left, width, height'
    } : {
      transition: 'none'
    };

    var itemContainerStyles = itemView_objectSpread(itemView_objectSpread(itemView_objectSpread(itemView_objectSpread({}, transitionStyles), itemStyles), layoutStyles), containerStyleByStyleParams);

    return itemContainerStyles;
  };

  _proto.getItemWrapperStyles = function getItemWrapperStyles() {
    var _this$props8 = this.props,
        styleParams = _this$props8.styleParams,
        style = _this$props8.style,
        type = _this$props8.type;
    var height = style.height;
    var styles = {};

    if (type === 'text') {
      styles.backgroundColor = styleParams.cubeType !== 'fit' ? 'transparent' : 'inherit';
    } else {
      styles.backgroundColor = (styleParams.cubeType !== 'fit' ? style.bgColor : 'inherit') || 'transparent';
    }

    styles.margin = -styleParams.itemBorderWidth + 'px';
    styles.height = height + 'px';
    var imageDimensions = this.getImageDimensions();

    var itemWrapperStyles = itemView_objectSpread(itemView_objectSpread({}, styles), imageDimensions);

    return itemWrapperStyles;
  };

  _proto.getItemAriaLabel = function getItemAriaLabel() {
    var _this$props9 = this.props,
        type = _this$props9.type,
        alt = _this$props9.alt,
        styleParams = _this$props9.styleParams;
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
    var imagePlacementAnimation = styleParams.imagePlacementAnimation;
    var overlayAnimation = styleParams.overlayAnimation;
    var imageHoverAnimation = styleParams.imageHoverAnimation;
    var classNames = {
      'gallery-item-container': true,
      'visible': true,
      highlight: this.isHighlight(),
      clickable: styleParams.itemClick !== 'nothing',
      'simulate-hover': this.simulateHover(),
      'hide-hover': !this.simulateHover() && utils["a" /* default */].isMobile(),
      'invert-hover': styleParams.hoveringBehaviour === constants["a" /* default */].infoBehaviourOnHover.DISAPPEARS,
      //animations
      'animation-slide': isNOTslideshow && imagePlacementAnimation === constants["a" /* default */].imagePlacementAnimations.SLIDE,
      //overlay animations
      'hover-animation-fade-in': isNOTslideshow && overlayAnimation === constants["a" /* default */].overlayAnimations.FADE_IN,
      'hover-animation-expand': isNOTslideshow && overlayAnimation === constants["a" /* default */].overlayAnimations.EXPAND,
      'hover-animation-slide-up': isNOTslideshow && overlayAnimation === constants["a" /* default */].overlayAnimations.SLIDE_UP,
      'hover-animation-slide-right': isNOTslideshow && overlayAnimation === constants["a" /* default */].overlayAnimations.SLIDE_RIGHT,
      //image hover animations
      'zoom-in-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.ZOOM_IN,
      'blur-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.BLUR,
      'grayscale-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.GRAYSCALE,
      'shrink-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.SHRINK,
      'invert-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.INVERT,
      'color-in-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.COLOR_IN,
      'darkened-on-hover': isNOTslideshow && imageHoverAnimation === constants["a" /* default */].imageHoverAnimations.DARKENED,
      'pro-gallery-mobile-indicator': utils["a" /* default */].isMobile()
    };
    var strClass = Object.entries(classNames).map(function (_ref2) {
      var classname = _ref2[0],
          isNeeded = _ref2[1];
      return isNeeded ? classname : false;
    }).filter(Boolean).join(' ');
    return strClass;
  };

  _proto.getItemWrapperClass = function getItemWrapperClass() {
    var _this$props10 = this.props,
        styleParams = _this$props10.styleParams,
        type = _this$props10.type;
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
    var tabIndex = this.isHighlight() ? utils["a" /* default */].getTabIndex('currentThumbnail') : this.props.currentIdx === this.props.idx ? utils["a" /* default */].getTabIndex('currentGalleryItem') : -1;
    return tabIndex;
  };

  _proto.changeActiveElementIfNeeded = function changeActiveElementIfNeeded(prevProps) {
    var _this4 = this;

    try {
      if ((Object(viewModeWrapper["f" /* isSiteMode */])() || Object(viewModeWrapper["e" /* isSEOMode */])()) && !utils["a" /* default */].isMobile() && windowWrapper["a" /* default */].document && windowWrapper["a" /* default */].document.activeElement && windowWrapper["a" /* default */].document.activeElement.className) {
        var activeElement = windowWrapper["a" /* default */].document.activeElement; //check if focus is on 'gallery-item-container' in current gallery

        var isThisGalleryItemInFocus = function isThisGalleryItemInFocus() {
          return !!windowWrapper["a" /* default */].document.querySelector("#pro-gallery-" + _this4.props.domId + " #" + String(activeElement.id));
        };

        var isGalleryItemInFocus = function isGalleryItemInFocus() {
          return String(activeElement.className).indexOf('gallery-item-container') >= 0;
        }; //check if focus is on 'load-more' in current gallery


        var isThisGalleryShowMoreInFocus = function isThisGalleryShowMoreInFocus() {
          return !!windowWrapper["a" /* default */].document.querySelector("#pro-gallery-" + _this4.props.domId + " #" + String(activeElement.id));
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
    if (utils["a" /* default */].isMobile()) {
      try {
        react_default.a.initializeTouchEvents(true);
      } catch (e) {}
    }

    windowWrapper["a" /* default */].addEventListener('current_hover_change', this.checkIfCurrentHoverChanged);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.itemLoadedTimeout);
    windowWrapper["a" /* default */].removeEventListener('current_hover_change', this.checkIfCurrentHoverChanged);
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
    if (!utils["a" /* default */].isDev() && !this.props.styleParams.allowContextMenu) {
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
    var _this$props11 = this.props,
        directLink = _this$props11.directLink,
        styleParams = _this$props11.styleParams,
        directShareLink = _this$props11.directShareLink;
    var isSEO = Object(viewModeWrapper["e" /* isSEOMode */])();

    if (styleParams.itemClick === constants["a" /* default */].itemClick.LINK) {
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
    } else if (styleParams.itemClick === constants["a" /* default */].itemClick.FULLSCREEN || styleParams.itemClick === constants["a" /* default */].itemClick.EXPAND) {
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
    var _this5 = this;

    var _this$props12 = this.props,
        photoId = _this$props12.photoId,
        id = _this$props12.id,
        hash = _this$props12.hash,
        idx = _this$props12.idx,
        styleParams = _this$props12.styleParams,
        type = _this$props12.type,
        url = _this$props12.url; //if (there is an url for video items and image items) OR text item (text item do not use media url)

    this.hasRequiredMediaUrl = url || type === 'text'; //if titlePlacement !== SHOW_ON_HOVER and !this.hasRequiredMediaUrl, we will NOT render the itemWrapper (but will render the info element with the whole size of the item)

    var isItemWrapperEmpty = styleParams.titlePlacement !== constants["a" /* default */].placements.SHOW_ON_HOVER && !this.hasRequiredMediaUrl;
    var innerDiv = /*#__PURE__*/react_default.a.createElement("div", {
      className: this.getItemContainerClass(),
      onContextMenu: function onContextMenu(e) {
        return _this5.onContextMenu(e);
      },
      id: cssScrollHelper.getSellectorDomId(this.props),
      ref: function ref(e) {
        return _this5.itemContainer = e;
      },
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      onKeyDown: this.onContainerKeyDown,
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
      style: itemView_objectSpread(itemView_objectSpread(itemView_objectSpread({}, !this.props.styleParams.isSlideshow && getImageStyle(this.props.styleParams)), constants["a" /* default */].hasRightPlacement(this.props.styleParams.titlePlacement) && {
        "float": 'left'
      }), constants["a" /* default */].hasLeftPlacement(this.props.styleParams.titlePlacement) && {
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
          return _this5.itemAnchor = e;
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
}(galleryComponent["a" /* GalleryComponent */]);

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
    var activeItemIdx = windowWrapper["a" /* default */].document.activeElement.getAttribute('data-idx');

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
        utils["a" /* default */].setStateAndLog(this, 'Set Gallery Current Item', {
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
        utils["a" /* default */].setStateAndLog(this, 'Focus on Last Gallery Item', {
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
        getVisibleItems = _this$props.getVisibleItems;
    var galleryConfig = this.createGalleryConfig();
    var showMoreContainerHeight = 138; //according to the scss

    var debugMsg = /*#__PURE__*/react_default.a.createElement(galleryDebugMessage, this.props.debug);
    var galleryHeight;

    if (showMore) {
      galleryHeight = container.galleryHeight - showMoreContainerHeight;
    } else {
      galleryHeight = galleryStructure.height + 'px';
    }

    var galleryStructureItems = getVisibleItems(galleryStructure.galleryItems, container);
    var layout = galleryStructureItems.map(function (item, index) {
      return /*#__PURE__*/react_default.a.createElement(itemView, item.renderProps(galleryView_objectSpread(galleryView_objectSpread(galleryView_objectSpread({}, galleryConfig), itemsLoveData[item.id]), {}, {
        visible: item.isVisible,
        key: "itemView-" + item.id + "-" + index
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
        width: this.props.container.galleryWidth - styleParams.imageMargin * 2,
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
    return utils["a" /* default */].shouldDebug('screenLogs') ? /*#__PURE__*/react_default.a.createElement("div", {
      className: "screen-logs"
    }, "URL width: ", utils["a" /* default */].parseGetParam('width'), ", Container:", ' ', JSON.stringify(this.props.container.galleryWidth), ", window.document.body.clientWidth ", document.body.clientWidth, ", window.innerWidth ", windowWrapper["a" /* default */].innerWidth, ", window.screen.width:", ' ', windowWrapper["a" /* default */].screen.width) : '';
  };

  _proto.returnButtonStyle = function returnButtonStyle(styleParams) {
    var btnStyle = {};

    if (utils["a" /* default */].isMobile()) {
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
        className: 'show-more-container' + (utils["a" /* default */].isMobile() ? ' pro-gallery-mobile-indicator' : '')
      }, /*#__PURE__*/react_default.a.createElement("button", {
        tabIndex: utils["a" /* default */].getTabIndex('loadMoreButton'),
        id: 'show-more-' + this.props.domId,
        className: "show-more",
        onClick: this.showMoreItems,
        "data-hook": "show-more",
        "aria-label": buttonText,
        style: btnStyle
      }, buttonText));
    }

    return showMoreButton;
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    if (utils["a" /* default */].isVerbose()) {
      console.count('galleryView render');
      console.time('Rendering Gallery took ');
      console.log('[DEBUG_RENDER] GalleryView styleParams', this.props.styleParams);
      console.log('[DEBUG_RENDER] GalleryView props changed', utils["a" /* default */].printableObjectsDiff(this.lastProps || {}, this.props));
      this.lastProps = galleryView_objectSpread({}, this.props);
      console.log('[DEBUG_RENDER] GalleryView state changed', utils["a" /* default */].printableObjectsDiff(this.lastState || {}, this.state));
      this.lastState = galleryView_objectSpread({}, this.state);
      this.renderCount = (this.renderCount || 0) + 1;
    }

    var showMore = this.createShowMoreButton();
    var gallery = this.createGallery(showMore);

    if (utils["a" /* default */].isVerbose()) {
      console.timeEnd('Rendering Gallery took ');
    }

    var screenLogs = this.screenLogs();
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: 'pro-gallery-parent-container',
      key: "pro-gallery-" + this.id,
      role: "region",
      "aria-label": this.props.proGalleryRegionLabel
    }, screenLogs, gallery, showMore);
  };

  return GalleryView;
}(galleryComponent["a" /* GalleryComponent */]);

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
}(galleryComponent["a" /* GalleryComponent */]);

/* harmony default export */ var groupView = (groupView_GroupView);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryHelpers.js

function isGalleryInViewport(container) {
  var haveAllVariablesForViewPortCalc = !!(container && Number.isInteger(container.scrollBase) && Number.isInteger(container.galleryHeight) && windowWrapper["a" /* default */] && windowWrapper["a" /* default */].document && windowWrapper["a" /* default */].document.documentElement && (Number.isInteger(windowWrapper["a" /* default */].document.documentElement.scrollTop) || windowWrapper["a" /* default */].document.scrollingElement && Number.isInteger(windowWrapper["a" /* default */].document.scrollingElement.scrollTop)) && Number.isInteger(windowWrapper["a" /* default */].document.documentElement.offsetHeight));
  var inTopViewPort = haveAllVariablesForViewPortCalc && container.scrollBase + container.galleryHeight > windowWrapper["a" /* default */].document.documentElement.scrollTop;
  var inBottomViewPort = haveAllVariablesForViewPortCalc && container.scrollBase < (windowWrapper["a" /* default */].document.documentElement.scrollTop || windowWrapper["a" /* default */].document.scrollingElement.scrollTop) + windowWrapper["a" /* default */].document.documentElement.offsetHeight;
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









var SKIP_SLIDES_MULTIPLIER = 1.5;

var slideshowView_SlideshowView = /*#__PURE__*/function (_GalleryComponent) {
  slideshowView_inheritsLoose(SlideshowView, _GalleryComponent);

  function SlideshowView(props) {
    var _this;

    _this = _GalleryComponent.call(this, props) || this;

    slideshowView_defineProperty(slideshowView_assertThisInitialized(_this), "autoScrollToNextItem", function () {
      if (!Object(viewModeWrapper["a" /* isEditMode */])() && (isGalleryInViewport(_this.props.container) || Object(viewModeWrapper["d" /* isPreviewMode */])())) {
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
    _this._setCurrentItemByScroll = utils["a" /* default */].throttle(_this.setCurrentItemByScroll, 600).bind(slideshowView_assertThisInitialized(_this));
    _this._next = utils["a" /* default */].throttle(_this.next.bind(slideshowView_assertThisInitialized(_this)), 400).bind(slideshowView_assertThisInitialized(_this));
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

    var _this$props = this.props,
        items = _this$props.items,
        totalItemsCount = _this$props.totalItemsCount;

    if (this.container) {
      var _this$container = this.container,
          scrollLeft = _this$container.scrollLeft,
          scrollWidth = _this$container.scrollWidth,
          clientWidth = _this$container.clientWidth;

      if (isRTL) {
        return items.length >= totalItemsCount && scrollLeft + clientWidth >= scrollWidth - 1;
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
    return !this.props.styleParams.slideshowLoop && this.state.currentIdx >= this.props.totalItemsCount - 1;
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

    if (avoidIndividualNavigation && this.props.styleParams.groupSize > 1) {
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

    if (avoidIndividualNavigation && !(this.props.styleParams.groupSize > 1)) {
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
      var scrollToItemPromise = !isScrollingPastEdge && scrollToItem(nextItem, false, true, scrollDuration, scrollMarginCorrection);
      scrollToItemPromise.then(function () {
        if (_this2.props.styleParams.groupSize === 1) {
          var skipFromSlide = Math.round(_this2.props.totalItemsCount * SKIP_SLIDES_MULTIPLIER);
          var skipToSlide = skipFromSlide - _this2.props.totalItemsCount;

          if (nextItem >= skipFromSlide) {
            nextItem = skipToSlide;
            scrollToItem(nextItem);
          }
        }

        utils["a" /* default */].setStateAndLog(_this2, 'Next Item', {
          currentIdx: nextItem
        }, function () {
          _this2.onCurrentItemChanged();

          _this2.isSliding = false;
        });
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
    var currentGroupIdx = this.getCenteredGroupIdxByScroll();
    var currentGroup = currentGroupIdx + direction;
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
      !isScrollingPastEdge && scrollToGroup(currentGroup, false, true, scrollDuration, scrollMarginCorrection);
      utils["a" /* default */].setStateAndLog(this, 'Next Item', {
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

      this.props.actions.eventsListener(constants["a" /* default */].events.CURRENT_ITEM_CHANGED, this.props.items[this.state.currentIdx]);
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
    this.props.actions.eventsListener(constants["a" /* default */].events.THUMBNAIL_CLICKED, this.props);
    this.isAutoScrolling = true;
    this.startAutoSlideshowIfNeeded(this.props.styleParams);
    utils["a" /* default */].setStateAndLog(this, 'Scroll to Item', {
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

    if (utils["a" /* default */].isVerbose()) {
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
        backgroundImage: "url(" + thumbnailItem.createUrl(constants["a" /* default */].urlSizes.THUMBNAIL, constants["a" /* default */].urlTypes.HIGH_RES) + ")"
      };
      var thumbnailOffset = oneRow ? (_ref4 = {}, _ref4[_this5.props.styleParams.isRTL ? 'right' : 'left'] = thumbnailSize * idx + 2 * idx * thumbnailSpacings, _ref4) : {
        top: thumbnailSize * idx + 2 * idx * thumbnailSpacings
      };
      Object.assign(itemStyle, thumbnailOffset);
      return /*#__PURE__*/react_default.a.createElement("div", {
        key: 'thumbnail-' + thumbnailItem.id + (Number.isInteger(item.loopIndex) ? '-' + item.loopIndex : ''),
        className: 'thumbnailItem' + (highlighted ? ' pro-gallery-thumbnails-highlighted gallery-item-container highlight' + (utils["a" /* default */].isMobile() ? ' pro-gallery-mobile-indicator' : '') : ''),
        "data-key": thumbnailItem.id,
        style: itemStyle,
        onClick: function onClick() {
          return _this5.scrollToThumbnail(thumbnailItem.idx);
        }
      });
    })));
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

    if (utils["a" /* default */].isVerbose()) {
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

    if (!utils["a" /* default */].isUndefined(currentIdx)) {
      utils["a" /* default */].setStateAndLog(this, 'Set Current Item', {
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
    var _this$state = this.state,
        hideLeftArrow = _this$state.hideLeftArrow,
        hideRightArrow = _this$state.hideRightArrow;
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
    var svgStyle = {
      transform: "scale(" + scalePercentage + ")"
    };
    var svgInternalStyle = {};

    if (utils["a" /* default */].isMobile()) {
      if (typeof arrowsColor !== 'undefined') {
        svgInternalStyle.fill = arrowsColor.value;
      }
    } // nav-arrows-container width is 100. arrowWidth + padding on each side should be 100


    var containerPadding = (100 - arrowWidth) / 2;
    var slideshowSpace = isSlideshow ? slideshowInfoSize : 0; // top: imageMargin effect the margin of the main div that SlideshowView is rendering, so the arrows should be places accordingly. 50% is the middle, 50px is half of nav-arrows-container height

    var containerStyle = {
      padding: "0 " + containerPadding + "px 0 " + containerPadding + "px",
      top: "calc(50% - 50px + " + imageMargin / 2 + "px - " + slideshowSpace / 2 + "px)"
    }; // Add negative positioning for external arrows. consists of arrow size, half of arrow container and padding

    var arrowsPos = oneRow && arrowsPosition === constants["a" /* default */].arrowsPosition.OUTSIDE_GALLERY ? "-" + (arrowsSize + 50 + 10) + "px" : imageMargin + "px"; // left & right: imageMargin effect the margin of the main div that SlideshowView is rendering, so the arrows should be places accordingly

    var prevContainerStyle = {
      left: arrowsPos
    };
    var nextContainerStyle = {
      right: arrowsPos
    };
    return [hideLeftArrow ? null : /*#__PURE__*/react_default.a.createElement("button", {
      className: 'nav-arrows-container prev ' + (utils["a" /* default */].isMobile() ? 'pro-gallery-mobile-indicator ' : ''),
      onClick: function onClick() {
        return _this7._next({
          direction: -1
        });
      },
      "aria-label": (isRTL ? 'Next' : 'Previous') + " Item",
      tabIndex: utils["a" /* default */].getTabIndex('slideshowPrev'),
      key: "nav-arrow-back",
      "data-hook": "nav-arrow-back",
      style: slideshowView_objectSpread(slideshowView_objectSpread({}, containerStyle), prevContainerStyle)
    }, /*#__PURE__*/react_default.a.createElement("svg", {
      width: "23",
      height: "39",
      viewBox: "0 0 23 39",
      style: svgStyle
    }, /*#__PURE__*/react_default.a.createElement("path", {
      className: "slideshow-arrow",
      style: svgInternalStyle,
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
      tabIndex: utils["a" /* default */].getTabIndex('slideshowNext'),
      key: "nav-arrow-next",
      "data-hook": "nav-arrow-next",
      style: slideshowView_objectSpread(slideshowView_objectSpread({}, containerStyle), nextContainerStyle)
    }, /*#__PURE__*/react_default.a.createElement("svg", {
      width: "23",
      height: "39",
      viewBox: "0 0 23 39",
      style: svgStyle
    }, /*#__PURE__*/react_default.a.createElement("path", {
      className: "slideshow-arrow",
      style: svgInternalStyle,
      d: "M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z",
      transform: "translate(-855 -230)"
    })))];
  };

  _proto.createLayout = function createLayout() {
    var _this8 = this;

    var _this$props2 = this.props,
        itemsLoveData = _this$props2.itemsLoveData,
        getVisibleItems = _this$props2.getVisibleItems,
        galleryStructure = _this$props2.galleryStructure,
        container = _this$props2.container;
    var galleryConfig = {
      scrollingElement: this.props.scrollingElement,
      totalItemsCount: this.props.totalItemsCount,
      scroll: this.props.scroll,
      styleParams: this.props.styleParams,
      container: this.props.container,
      watermark: this.props.watermark,
      settings: this.props.settings,
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

    var renderGroups = function renderGroups(column) {
      var layoutGroupView = !!column.galleryGroups.length && getVisibleItems(column.galleryGroups, container);
      return layoutGroupView && layoutGroupView.map(function (group) {
        return group.rendered ? /*#__PURE__*/react_default.a.createElement(groupView, slideshowView_objectSpread({
          allowLoop: _this8.props.styleParams.slideshowLoop && _this8.props.galleryStructure.width > _this8.props.container.width,
          itemsLoveData: itemsLoveData
        }, group.renderProps(galleryConfig))) : false;
      });
    };

    return galleryStructure.columns.map(function (column, c) {
      var columnStyle = {
        width: column.width,
        height: container.galleryHeight
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
      }, renderGroups(column)));
    });
  };

  _proto.createGallery = function createGallery() {
    // When arrows are set outside of the gallery, gallery is resized and needs to be positioned
    var galleryStyleForExternalArrows = this.props.styleParams.oneRow && this.props.styleParams.arrowsPosition === constants["a" /* default */].arrowsPosition.OUTSIDE_GALLERY ? {
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
    return this.props.container.galleryWidth >= utils["a" /* default */].getWindowWidth() - 10;
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

    var _this$props3 = this.props,
        totalItemsCount = _this$props3.totalItemsCount,
        _this$props3$stylePar = _this$props3.styleParams,
        galleryTextAlign = _this$props3$stylePar.galleryTextAlign,
        slideshowInfoSize = _this$props3$stylePar.slideshowInfoSize;
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

    if (Object(viewModeWrapper["a" /* isEditMode */])() || Object(viewModeWrapper["d" /* isPreviewMode */])()) {
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

    if (!isGalleryInViewport(this.props.container)) {
      return;
    }

    setTimeout(function () {
      var atStart = _this12.isScrollStart() || _this12.isFirstItem();

      var atEnd = _this12.isScrollEnd() || _this12.isLastItem();

      var isRTL = _this12.props.styleParams.isRTL;
      var _this12$state = _this12.state,
          hideLeftArrow = _this12$state.hideLeftArrow,
          hideRightArrow = _this12$state.hideRightArrow;
      var nextHideLeft = !isRTL && atStart || isRTL && atEnd;
      var nextHideRight = isRTL && atStart || !isRTL && atEnd;
      var isNew = !!nextHideLeft !== !!hideLeftArrow || !!nextHideRight !== !!hideRightArrow;

      if (isNew) {
        _this12.setState({
          hideLeftArrow: !!nextHideLeft,
          hideRightArrow: !!nextHideRight
        });
      }
    }, 500);
  };

  _proto.navigationOutHandler = function navigationOutHandler() {
    //TODO remove after full refactor release
    utils["a" /* default */].setStateAndLog(this, 'Next Item', {
      isInView: false
    });
    this.stopAutoSlideshow();
  };

  _proto.navigationInHandler = function navigationInHandler() {
    //TODO remove after full refactor release
    utils["a" /* default */].setStateAndLog(this, 'Next Item', {
      isInView: true
    });
    this.startAutoSlideshowIfNeeded(this.props.styleParams);
  };

  _proto.componentDidMount = function componentDidMount() {
    windowWrapper["a" /* default */].addEventListener('gallery_navigation_out', this.navigationOutHandler);
    windowWrapper["a" /* default */].addEventListener('gallery_navigation_in', this.navigationInHandler);
    this.container = windowWrapper["a" /* default */].document.querySelector("#pro-gallery-" + this.props.domId + " #gallery-horizontal-scroll");

    if (this.container) {
      this.container.addEventListener('scroll', this._setCurrentItemByScroll);
    }

    if (this.state.currentIdx > 0) {
      this.props.actions.scrollToItem(this.state.currentIdx);
    } else {
      this.setCurrentItemByScroll();
    }

    this.startAutoSlideshowIfNeeded(this.props.styleParams);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    windowWrapper["a" /* default */].removeEventListener('gallery_navigation_out', this.navigationOutHandler);
    windowWrapper["a" /* default */].removeEventListener('gallery_navigation_in', this.navigationInHandler);

    if (this.container) {
      this.container.removeEventListener('scroll', this._setCurrentItemByScroll);
    }
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    if (utils["a" /* default */].isVerbose()) {
      console.count('galleryView render');
      console.count('Rendering Gallery count');
      console.time('Rendering Gallery took ');
    }

    var gallery = this.createGallery();
    var thumbnails = this.getThumbnails();

    if (utils["a" /* default */].isVerbose()) {
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
}(galleryComponent["a" /* GalleryComponent */]);

/* harmony default export */ var slideshowView = (slideshowView_SlideshowView);
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
  scatter: undefined,
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
        targetItemSize: Math.round(gallerySize * 5 + 500),
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
        targetItemSize: Math.round(gallerySize * 5 + 500),
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
        targetItemSize: Math.round(gallerySize * 8.5 + 150),
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
        targetItemSize: Math.round(gallerySize * 8 + 200),
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
        targetItemSize: Math.round(gallerySize * 5 + 200),
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
        targetItemSize: function targetItemSize() {
          return dimensionsHelper["a" /* default */].getGalleryWidth();
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
        targetItemSize: function targetItemSize() {
          return dimensionsHelper["a" /* default */].getGalleryHeight();
        },
        fixedColumns: 0
      };
    },
    slideshow: function slideshow() {
      return {
        showArrows: true,
        cubeImages: true,
        cubeRatio: function cubeRatio() {
          return dimensionsHelper["a" /* default */].getGalleryRatio();
        },
        isVertical: true,
        targetItemSize: function targetItemSize() {
          return dimensionsHelper["a" /* default */].getGalleryWidth();
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
      styleState = {};
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
}

function addLayoutStyles(styles, customExternalInfoRendererExists) {
  var galleryLayoutV1 = styles.galleryType;
  var galleryLayoutV2 = styles.galleryLayout;

  if (!utils["a" /* default */].isUndefined(galleryLayoutV1) && utils["a" /* default */].isUndefined(galleryLayoutV2)) {
    //legacy layouts - only if galleyrType parameter is specifically defined (i.e. layout had changed)
    styles = Object.assign(styles, getStyleByGalleryType(styles)); //legacy layouts

    styles.layoutsVersion = 1;
    var selectedLayoutVars = ['galleryType', 'galleryThumbnailsAlignment', 'magicLayoutSeed', 'cubeType', 'isVertical', 'scrollDirection', 'enableInfiniteScroll'];
    styles.selectedLayout = selectedLayoutVars.map(function (key) {
      return String(styles[key]);
    }).join('|');
  } else {
    //new layouts
    if (utils["a" /* default */].isVerbose()) {
      console.log('Using galleryLayout for defaults', styles);
    }

    styles = Object.assign({}, emptyLayout, styles);
    var _selectedLayoutVars = ['galleryLayout', 'galleryThumbnailsAlignment', 'magicLayoutSeed', 'cubeType', 'isVertical', 'scrollDirection', 'enableInfiniteScroll'];
    styles.selectedLayout = _selectedLayoutVars.map(function (key) {
      return String(styles[key]);
    }).join('|');
    styles.layoutsVersion = 2;
    styles.selectedLayoutV2 = galleryLayoutV2;

    if (utils["a" /* default */].isVerbose()) {
      console.log('new selected layout', styles.selectedLayout);
    }
  }

  styles = Object.assign(styles, layoutHelper(styles, customExternalInfoRendererExists));
  return styles;
}

/* harmony default export */ var helpers_layoutHelper = (addLayoutStyles);
// EXTERNAL MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/scrollHelper.js
var scrollHelper = __webpack_require__(769);

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
    _this.debouncedOnScroll = utils["a" /* default */].debounce(props.onScroll, 50);
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
      _this2.props.setGotFirstScrollIfNeeded();

      var target = e.currentTarget || e.target || e;
      var top = target && (target.scrollY || target.scrollTop || target.y);
      var left = target && (target.scrollX || target.scrollLeft || target.x);

      if (_this2.props.isRTL) {
        left = _this2.props.totalWidth - left;
      } // console.log('[RTL SCROLL] onHorizontalScroll: ', left);


      if (left >= 0) {
        if (oneRow) {
          _this2.setState({
            scrollTop: left,
            //todo use both scrollTop and scrollLeft
            scrollLeft: left
          });

          _this2.props.getMoreItemsIfNeeded(left);

          _this2.debouncedOnScroll({
            top: top,
            left: left
          });
        }
      }
    };

    try {
      scrollingElement.horizontal().addEventListener('scroll', this.onHorizontalScroll);
    } catch (e) {//
    } //Vertical Scroll


    this.onVerticalScroll = function (e) {
      _this2.props.setGotFirstScrollIfNeeded();

      var target = e.currentTarget || e.target || e;
      var top = target && (target.scrollY || target.scrollTop || target.y);
      var left = target && (target.scrollX || target.scrollLeft || target.x);

      if (_this2.props.isRTL) {
        left = _this2.props.totalWidth - left;
      } // console.log('[RTL SCROLL] onVerticalScroll: ', left);


      if (top >= 0) {
        if (!oneRow) {
          _this2.setState({
            scrollTop: top
          });

          _this2.props.getMoreItemsIfNeeded(top);

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
}(galleryComponent["a" /* GalleryComponent */]);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/cssLayoutsHelper.js
 // // const CDN_URL = 'https://static.wixstatic.com/media/';
// const desktopWidths = [480, 768, 1024, 1280, 1440, 1680, 1920, 2560];
// const mobileWidths = [320]; //, 375, 414, 480, 600, 768, 900]; (mobile is currently fixed to 320px)

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
}; // const createCssFromLayout = (domId = '', layout, styleParams, width) => {
//   let cssStr = '';
//   const layoutWidth = width - styleParams.imageMargin * 2;
//   const getRelativeDimension = val =>
//     Math.round(10000 * (val / layoutWidth)) / 100;
//   layout.items.forEach((item, i) => {
//     const id = createItemId(domId, item);
//     if (i < 50) {
//       const style = getImageStyle(item, styleParams);
//       const Tvw = `top:${getRelativeDimension(style.top)}vw;`;
//       const Wvw = `width:${getRelativeDimension(style.width)}vw;`;
//       const Hvw = `height:${getRelativeDimension(style.height)}vw;`;
//       const iHvw = `height:${getRelativeDimension(style.innerHeight)}vw;`;
//       const Lpc = `left:${getRelativeDimension(style.left)}%;`;
//       const Wpc = `width:${getRelativeDimension(style.width)}%;`;
//       cssStr += `${id} {${Tvw}${Lpc}${Wpc}${Hvw}}`;
//       cssStr += `${id} .gallery-item-wrapper, ${id} .gallery-item-hover, ${id} .gallery-item {${Wvw}${iHvw}}`;
//     } else {
//       cssStr += `${id}{display:none;}`;
//     }
//   });
//   return cssStr;
// };
// const createCssFromLayouts = (domId, layouts, styleParams, widths) => {
//   const cssStrs = [];
//   layouts.forEach((layout, idx) => {
//     let cssStr = '';
//     if (layout) {
//       const width = widths[idx];
//       const lastWidth = widths[idx - 1];
//       const isFirstMediaQuery = !lastWidth || cssStrs.length === 0;
//       cssStr += isFirstMediaQuery
//         ? ''
//         : `@media only screen and (min-width: ${(lastWidth * 2 + width) /
//             3}px) {`;
//       cssStr += createCssFromLayout(domId, layout, styleParams, width);
//       cssStr += isFirstMediaQuery ? '' : `}`;
//       cssStrs.push(cssStr);
//     }
//   });
//   return cssStrs;
// };


var createCssLayouts = function createCssLayouts(_ref) {
  var galleryItems = _ref.galleryItems,
      layoutParams = _ref.layoutParams,
      domId = _ref.domId;
  var exactCss = [];
  exactCss.push(createExactCssForItems(domId, galleryItems, layoutParams.styleParams));
  return exactCss;
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/isNew.js
/* harmony default export */ var helpers_isNew = (function (_ref, state) {
  var items = _ref.items,
      styles = _ref.styles,
      container = _ref.container,
      watermark = _ref.watermark,
      itemsDimensions = _ref.itemsDimensions;
  var reason = {
    items: '',
    itemsMetadata: '',
    itemsAdded: '',
    styles: '',
    container: ''
  };

  var watermarkHaveChanged = function watermarkHaveChanged(newWatermark) {
    var oldWatermark = state.container;

    if (newWatermark) {
      if (!oldWatermark) {
        reason.watermark = 'first watermark arrived';
        return true;
      } else {
        try {
          var wasChanged = JSON.stringify(Object.entries(oldWatermark).sort()) !== JSON.stringify(Object.entries(newWatermark).sort());

          if (wasChanged) {
            reason.watermark = 'watermark changed.';
          }

          return wasChanged;
        } catch (e) {
          console.error('Could not compare watermarks', e);
          return false;
        }
      }
    }

    return false;
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
      var wasChanged = JSON.stringify(Object.entries(_styles).sort()) !== JSON.stringify(Object.entries(state.styles).sort());

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
    watermark: watermarkHaveChanged(watermark),
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
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/helpers/videoScrollHelperWrapper.js


var videoScrollHelperWrapper_VideoScrollHelperWrapper = /*#__PURE__*/function () {
  function VideoScrollHelperWrapper(setPlayingIdxState) {
    this.setPlayingIdxState = setPlayingIdxState;

    this.handleEvent = function () {};

    this.trigger = {
      SCROLL: function SCROLL() {},
      INIT_SCROLL: function INIT_SCROLL() {}
    };

    this.stop = function () {};

    this.initializePlayState = function () {};
  }

  var _proto = VideoScrollHelperWrapper.prototype;

  _proto.initVideoScrollHelperIfNeeded = function initVideoScrollHelperIfNeeded(galleryStructureData, items) {
    var _this = this;

    if (items.some(function (item) {
      return item.metaData && item.metaData.type === "video" || item.metadata && item.metadata.type === "video";
    })) {
      var videoScrollHelperConfig = {
        setPlayingVideos: Object(viewModeWrapper["a" /* isEditMode */])() ? function () {} : this.setPlayingIdxState
      };
      __webpack_require__.e(/* import() | videoScrollHelper */ 6).then(__webpack_require__.bind(null, 985)).then(function (VideoScrollHelper) {
        Object.assign(_this, new VideoScrollHelper["default"](videoScrollHelperConfig));

        _this.updateGalleryStructure(galleryStructureData);

        _this.initializePlayState();
      })["catch"](function (e) {
        console.error('Failed to load videoScrollHelper. error: ' + e);
      });
    }
  };

  _proto.updateGalleryStructure = function updateGalleryStructure(scrollHelperNewGalleryStructure, shouldTryToInit, items) {
    if (shouldTryToInit) {
      this.initVideoScrollHelperIfNeeded(scrollHelperNewGalleryStructure, items);
    }
  };

  return VideoScrollHelperWrapper;
}();

/* harmony default export */ var videoScrollHelperWrapper = (videoScrollHelperWrapper_VideoScrollHelperWrapper);
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
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/layoutFixer.js
function layoutFixer_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return layoutFixer_construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return layoutFixer_setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function layoutFixer_construct(Parent, args, Class) { if (layoutFixer_isNativeReflectConstruct()) { layoutFixer_construct = Reflect.construct; } else { layoutFixer_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) layoutFixer_setPrototypeOf(instance, Class.prototype); return instance; }; } return layoutFixer_construct.apply(null, arguments); }

function layoutFixer_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function layoutFixer_setPrototypeOf(o, p) { layoutFixer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return layoutFixer_setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function layoutFixer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function layoutFixer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { layoutFixer_ownKeys(Object(source), true).forEach(function (key) { layoutFixer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { layoutFixer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function layoutFixer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var setAttributes = function setAttributes(node, attributes) {
  return node && attributes && Object.keys(attributes).forEach(function (attr) {
    return node.setAttribute(attr, attributes[attr]);
  });
};

var setStyle = function setStyle(node, styleProperties) {
  return node && styleProperties && Object.keys(styleProperties).forEach(function (prop) {
    var propValue = styleProperties[prop];

    if (propValue !== undefined) {
      node.style[prop] = propValue;
    } else {
      node.style.removeProperty(prop);
    }
  });
};

var getItemWrapperStyle = function getItemWrapperStyle(item, styleParams) {
  return {
    width: item.width + 'px',
    height: item.height + (styleParams.externalInfoHeight || 0) + 'px'
  };
};

var getItemContainerStyle = function getItemContainerStyle(item, styleParams) {
  var itemWrapperStyles = getItemWrapperStyle(item, styleParams);
  var isRTL = styleParams.isRTL;
  return layoutFixer_objectSpread({
    opacity: 1,
    top: item.offset.top + 'px',
    left: isRTL ? 'auto' : item.offset.left + 'px',
    right: !isRTL ? 'auto' : item.offset.left + 'px'
  }, itemWrapperStyles);
};

var layoutFixer_createLayoutFixer = function createLayoutFixer() {
  if (window.layoutFixerCreated === true) {
    return;
  }

  window.layoutFixerCreated = true;
  console.log('[LAYOUT FIXER] createLayoutFixer');

  var LayoutFixerElement = /*#__PURE__*/function (_HTMLElement) {
    layoutFixer_inheritsLoose(LayoutFixerElement, _HTMLElement);

    function LayoutFixerElement() {
      return _HTMLElement.apply(this, arguments) || this;
    }

    var _proto = LayoutFixerElement.prototype;

    _proto.connectedCallback = function connectedCallback() {
      var _this = this;

      console.log('[LAYOUT FIXER] connectedCallback');
      this.parentId = this.getAttribute('parentid');
      this.parent = this.parentNode; // && document.getElementById(this.parentId)

      console.log('[LAYOUT FIXER] parent', this.parent);
      this.useLayouter = true;
      this.items = JSON.parse(this.getAttribute('items'));

      if (!(this.items && this.items.length > 0)) {
        this.useLayouter = false;
      }

      console.log('[LAYOUT FIXER] items', this.items.map(function (item) {
        return item.mediaUrl;
      }));
      this.styleParams = JSON.parse(this.getAttribute('styles'));

      if (!(this.styleParams && typeof this.styleParams === 'object')) {
        this.useLayouter = false;
      }

      this.measures = this.parent && this.parent.getBoundingClientRect();

      if (this.measures && this.useLayouter && typeof create_layout_createLayout === 'function') {
        this.layout = create_layout_createLayout({
          items: this.items,
          styleParams: this.styleParams,
          container: this.measures
        });
        console.log('[LAYOUT FIXER] layout', this.layout);
      }

      if (typeof this.measures === 'object') {
        console.log('[LAYOUT FIXER] measures', this.measures);
        setAttributes(this.parent, {
          'data-top': this.measures.top,
          'data-width': this.measures.width,
          'data-height': this.measures.height
        });
      }

      if (this.useLayouter && this.layout && this.layout.items && this.layout.items.length > 0) {
        this.parent.querySelectorAll('.gallery-item-container').forEach(function (element, idx) {
          console.log('[LAYOUT FIXER] setStyle', idx, getItemContainerStyle(_this.layout.items[idx], _this.styleParams));
          setStyle(element, getItemContainerStyle(_this.layout.items[idx], _this.styleParams));
        });
        this.parent.querySelectorAll('.gallery-item-wrapper').forEach(function (element, idx) {
          setStyle(element, getItemWrapperStyle(_this.layout.items[idx], _this.styleParams));
        });
      }
    };

    return LayoutFixerElement;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  console.log('[LAYOUT FIXER] customElements.define', window, window.customElements);
  window.customElements.define('layout-fixer', LayoutFixerElement);
};

if (typeof window !== 'undefined') {
  window.requestAnimationFrame(function () {
    try {
      layoutFixer_createLayoutFixer();
    } catch (e) {
      console.error('Cannot create layout fixer', e);
    }
  });
}

var layoutFixer_LayoutFixer = function LayoutFixer(props) {
  console.log('[LAYOUT FIXER] rendering', Object(viewModeWrapper["c" /* isPrerenderMode */])(), props);
  return Object(viewModeWrapper["c" /* isPrerenderMode */])() ? /*#__PURE__*/react_default.a.createElement("layout-fixer", {
    parentId: props.parentId,
    items: JSON.stringify(props.items),
    styles: JSON.stringify(props.styles)
  }) : null;
};
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

    if (utils["a" /* default */].isVerbose()) {
      console.count('[OOISSR] galleryContainerNew constructor', windowWrapper["a" /* default */].isMock);
    }

    _this.getMoreItemsIfNeeded = _this.getMoreItemsIfNeeded.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.setGotFirstScrollIfNeeded = _this.setGotFirstScrollIfNeeded.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.toggleLoadMoreItems = _this.toggleLoadMoreItems.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.scrollToItem = _this.scrollToItem.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.scrollToGroup = _this.scrollToGroup.bind(galleryContainerNew_assertThisInitialized(_this));
    _this._scrollingElement = _this.getScrollingElement();
    _this.duplicateGalleryItems = _this.duplicateGalleryItems.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.eventsListener = _this.eventsListener.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.onGalleryScroll = _this.onGalleryScroll.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.setPlayingIdxState = _this.setPlayingIdxState.bind(galleryContainerNew_assertThisInitialized(_this));
    _this.getVisibleItems = _this.getVisibleItems.bind(galleryContainerNew_assertThisInitialized(_this));
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
    _this.videoScrollHelper = new videoScrollHelperWrapper(_this.setPlayingIdxState);
    _this.items = [];
    _this.itemsDimensions = {};
    _this.preloadedItems = {};
    _this.layoutCss = [];

    if (utils["a" /* default */].isSSR()) {
      _this.initialGalleryState = _this.reCreateGalleryExpensively(props, initialState);

      try {
        _this.galleryInitialStateJson = JSON.stringify(_this.initialGalleryState);
      } catch (e) {
        //todo - report to sentry
        _this.galleryInitialStateJson = null;
      }
    } else {
      try {
        if (!utils["a" /* default */].shouldDebug('no_hydrate')) {
          var state = JSON.parse(windowWrapper["a" /* default */].document.querySelector("#pro-gallery-" + props.domId + " #ssr-state-to-hydrate").innerHTML);

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

        var galleryState = _this.reCreateGalleryExpensively(props);

        if (Object.keys(galleryState).length > 0) {
          _this.initialGalleryState = galleryState;
        }
      }
    }

    _this.state = galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, initialState), _this.initialGalleryState);
    return _this;
  }

  var _proto = GalleryContainer.prototype;

  _proto.getVisibleItems = function getVisibleItems(items, container) {
    var gotFirstScrollEvent = this.state.gotFirstScrollEvent;
    var scrollY = windowWrapper["a" /* default */].scrollY;
    var galleryHeight = container.galleryHeight,
        scrollBase = container.scrollBase,
        galleryWidth = container.galleryWidth;

    if (Object(viewModeWrapper["e" /* isSEOMode */])() || Object(viewModeWrapper["a" /* isEditMode */])() || Object(viewModeWrapper["d" /* isPreviewMode */])() || utils["a" /* default */].isSSR() || gotFirstScrollEvent || scrollY > 0 || this.props.currentIdx > 0) {
      return items;
    }

    var visibleItems = items;

    try {
      var windowHeight = windowWrapper["a" /* default */].innerHeight;
      var isInfinite = this.isVerticalGallery() && this.containerInfiniteGrowthDirection() === 'vertical';
      var galleryBottom = isInfinite ? Infinity : scrollBase + galleryHeight;
      var windowBottom = scrollY + windowHeight;
      var maxItemTop = Math.min(galleryBottom, windowBottom) - scrollBase;

      if (maxItemTop < 0) {
        //gallery is below the fold
        visibleItems = [];
      } else if (this.isVerticalGallery()) {
        visibleItems = items.filter(function (item) {
          return item.offset.top <= maxItemTop;
        });
      } else {
        visibleItems = items.filter(function (item) {
          return item.left <= galleryWidth + 20;
        });
      }

      if (visibleItems.length < 2 && visibleItems.length < items.length) {
        //dont render less then 2 items (otherwise slide show Arrow will be removed)
        visibleItems = items.slice(0, 2);
      }
    } catch (e) {
      console.error('Could not calculate visible items, returning original items', e);
      visibleItems = items;
    }

    return visibleItems;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.loadItemsDimensionsIfNeeded();
    this.scrollToItem(this.props.currentIdx, false, true, 0);
    this.handleNewGalleryStructure();
    this.eventsListener(constants["a" /* default */].events.APP_LOADED, {});
    this.getMoreItemsIfNeeded(0);
    this.videoScrollHelper.initializePlayState();

    try {
      if (typeof windowWrapper["a" /* default */].CustomEvent === 'function') {
        this.currentHoverChangeEvent = new CustomEvent('current_hover_change');
      } else {
        //IE (new CustomEvent is not supported in IE)
        this.currentHoverChangeEvent = windowWrapper["a" /* default */].document.createEvent('CustomEvent'); // MUST be 'CustomEvent'

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
    var _this2 = this;

    if (!this.currentHoverChangeEvent.domId && nextProps.domId) {
      this.currentHoverChangeEvent.domId = nextProps.domId;
    }

    if (this.props.currentIdx !== nextProps.currentIdx) {
      this.scrollToItem(nextProps.currentIdx, false, true, 0);
    }

    var reCreateGallery = function reCreateGallery() {
      var galleryState = _this2.reCreateGalleryExpensively(nextProps);

      if (Object.keys(galleryState).length > 0) {
        _this2.setState(galleryState, function () {
          _this2.handleNewGalleryStructure();
        });
      }
    };

    var getSignificantProps = function getSignificantProps(props) {
      var domId = props.domId,
          styles = props.styles,
          container = props.container,
          items = props.items,
          watermark = props.watermark;
      return {
        domId: domId,
        styles: styles,
        container: container,
        items: items,
        watermark: watermark
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

      if (utils["a" /* default */].isVerbose() && hasPropsChanged) {
        console.log('New props arrived', utils["a" /* default */].printableObjectsDiff(currentSignificatProps, nextSignificatProps));
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
    var _this3 = this;

    if (utils["a" /* default */].isSSR()) {
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

        if (_this3.itemsDimensions[id]) {
          return; //already measured
        }

        if (typeof _this3.preloadedItems[id] !== 'undefined') {
          return;
        }

        _this3.preloadedItems[id] = new Image();

        if (utils["a" /* default */].isVerbose()) {
          console.log('Preloading item #' + item);
        }

        if (typeof item.preload_url === 'string') {
          _this3.preloadedItems[id].src = item.preload_url;
        } else {
          _this3.preloadedItems[id].src = item.createUrl(constants["a" /* default */].urlSizes.PRELOAD, constants["a" /* default */].urlTypes.LOW_RES);
        }

        if (typeof onload === 'function') {
          _this3.preloadedItems[id].onload = function (e) {
            onload(e);
          };
        }

        return _this3.preloadedItems[id];
      } catch (e) {
        console.error('Could not preload item', item, e);
        return;
      }
    };

    var debouncedReCreateGallery = utils["a" /* default */].debounce(function () {
      var _this3$props = _this3.props,
          items = _this3$props.items,
          styles = _this3$props.styles,
          container = _this3$props.container,
          watermark = _this3$props.watermark;
      var params = {
        items: items,
        styles: styles,
        container: container,
        watermark: watermark,
        itemsDimensions: _this3.itemsDimensions
      };

      var newState = _this3.reCreateGalleryExpensively(params, _this3.state);

      if (Object.keys(newState).length > 0) {
        _this3.setState(newState, function () {
          _this3.handleNewGalleryStructure();
        });
      }
    }, 500);
    itemsWithoutDimensions.forEach(function (item, idx) {
      item.isPreloaded = true;
      preloadItem(item, function (e) {
        try {
          if (utils["a" /* default */].isVerbose()) {
            console.log('item loaded event', idx, e);
          }

          var ele = e.srcElement;

          var _item = _this3.items.find(function (itm) {
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

            _this3.itemsDimensions[_item.itemId] = itemDim; //rebuild the gallery after every dimension update
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
    this.eventsListener(constants["a" /* default */].events.GALLERY_CHANGE, onGalleryChangeData);

    if (needToHandleShowMoreClick) {
      this.setState({
        needToHandleShowMoreClick: false
      });
    }
  };

  _proto.reCreateGalleryFromState = function reCreateGalleryFromState(_ref) {
    var items = _ref.items,
        styles = _ref.styles,
        container = _ref.container;
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
      videoLoop: styles.videoLoop,
      itemClick: styles.itemClick,
      oneRow: styles.oneRow
    }, true, this.items);
    var shouldUseScrollCss = !Object(viewModeWrapper["e" /* isSEOMode */])() && (Object(viewModeWrapper["a" /* isEditMode */])() || this.state.gotFirstScrollEvent || this.state.showMoreClickedAtLeastOnce);

    if (shouldUseScrollCss) {
      this.getScrollCss({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: styles
      });
    }

    this.createCssLayoutsIfNeeded(layoutParams);
    this.createDynamicStyles(styles);
  };

  _proto.createCssLayoutsIfNeeded = function createCssLayoutsIfNeeded(layoutParams) {
    var _this$props$settings = this.props.settings,
        settings = _this$props$settings === void 0 ? {} : _this$props$settings;
    var _settings$avoidInline = settings.avoidInlineStyles,
        avoidInlineStyles = _settings$avoidInline === void 0 ? true : _settings$avoidInline;

    if (avoidInlineStyles) {
      // inline styles are replacing the layoutCss
      // avoid inline styles === use layout css
      this.layoutCss = createCssLayouts({
        layoutParams: layoutParams,
        isMobile: utils["a" /* default */].isMobile(),
        domId: this.props.domId,
        galleryItems: this.galleryStructure.galleryItems
      });
    }
  };

  _proto.reCreateGalleryExpensively = function reCreateGalleryExpensively(_ref2, curState) {
    var _this4 = this;

    var items = _ref2.items,
        styles = _ref2.styles,
        container = _ref2.container,
        watermark = _ref2.watermark,
        itemsDimensions = _ref2.itemsDimensions,
        customInfoRenderer = _ref2.customInfoRenderer,
        resizeMediaUrl = _ref2.resizeMediaUrl;

    if (utils["a" /* default */].isVerbose()) {
      console.count('PROGALLERY [COUNT] reCreateGalleryExpensively');
      console.time('PROGALLERY [TIME] reCreateGalleryExpensively');
    }

    var state = curState || this.state || {};

    var _styles, _container;

    var customExternalInfoRendererExists = !!customInfoRenderer;
    var stylesWithLayoutStyles = styles && helpers_layoutHelper(styles, customExternalInfoRendererExists);
    var isNew = helpers_isNew({
      items: items,
      styles: stylesWithLayoutStyles,
      container: container,
      watermark: watermark,
      itemsDimensions: itemsDimensions
    }, galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, state), {}, {
      items: this.items
    }));
    var newState = {};

    if (utils["a" /* default */].isVerbose()) {
      console.log('PROGALLERY reCreateGalleryExpensively', isNew, {
        items: items,
        styles: styles,
        container: container,
        watermark: watermark
      });
    }

    if ((isNew.itemsDimensions || isNew.itemsMetadata) && !isNew.items && !isNew.addedItems) {
      //if only the items metadata has changed - use the modified items (probably with the measured width and height)
      this.items = this.items.map(function (item, index) {
        var metaData = Object.assign({}, items[index].metaData);
        return Object.assign(item, {
          metaData: metaData
        }, galleryContainerNew_objectSpread({}, _this4.itemsDimensions[item.itemId]));
      });
      newState.items = this.items.map(function (item) {
        return item.itemId;
      });
    } else if (isNew.items && !isNew.addedItems) {
      this.items = items.map(function (item) {
        return Object.assign(itemsHelper_ItemsHelper.convertDtoToLayoutItem(item), galleryContainerNew_objectSpread({}, _this4.itemsDimensions[item.itemId]));
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
      dimensionsHelper["a" /* default */].updateParams({
        styles: styles,
        container: container,
        domId: this.props.domId
      });
      _styles = helpers_layoutHelper(styles, customExternalInfoRendererExists);
      dimensionsHelper["a" /* default */].updateParams({
        styles: _styles
      });
      _container = Object.assign({}, container, dimensionsHelper["a" /* default */].getGalleryDimensions());
      dimensionsHelper["a" /* default */].updateParams({
        container: _container
      });
      newState.styles = _styles;
      newState.container = _container;
    } else {
      _styles = state.styles;
      _container = state.container;
    }

    if (!this.galleryStructure || isNew.any) {
      if (utils["a" /* default */].isVerbose()) {
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
        watermark: watermark,
        sharpParams: _styles.sharpParams,
        thumbnailSize: styles.thumbnailSize,
        resizeMediaUrl: resizeMediaUrl,
        lastVisibleItemIdx: this.lastVisibleItemIdx
      };
      var existingLayout = this.galleryStructure || this.layout;

      if (isNew.addedItems) {
        this.galleryStructure = itemsHelper_ItemsHelper.convertExistingStructureToGalleryItems(existingLayout, this.layout, itemConfig);
      } else {
        this.galleryStructure = itemsHelper_ItemsHelper.convertToGalleryItems(this.layout, itemConfig, existingLayout.galleryItems);
      }

      var scrollHelperNewGalleryStructure = {
        galleryStructure: this.galleryStructure,
        scrollBase: _container.scrollBase,
        videoPlay: _styles.videoPlay,
        itemClick: _styles.itemClick,
        oneRow: _styles.oneRow,
        cb: this.setPlayingIdxState
      };
      this.videoScrollHelper.updateGalleryStructure(scrollHelperNewGalleryStructure, !utils["a" /* default */].isSSR() && (isNew.addedItems || isNew.items), this.items);

      if (isNew.items) {
        this.loadItemsDimensionsIfNeeded();
      }

      this.createCssLayoutsIfNeeded(layoutParams);
      this.createDynamicStyles(_styles);
      var shouldUseScrollCss = !Object(viewModeWrapper["e" /* isSEOMode */])() && (Object(viewModeWrapper["a" /* isEditMode */])() || this.state.gotFirstScrollEvent || this.state.showMoreClickedAtLeastOnce);

      if (shouldUseScrollCss) {
        this.getScrollCss({
          domId: this.props.domId,
          items: this.galleryStructure.galleryItems,
          styleParams: _styles
        });
      }
    }

    if (utils["a" /* default */].isVerbose()) {
      console.log('PROGALLERY [RENDERS] - reCreateGalleryExpensively', {
        isNew: isNew
      }, {
        items: items,
        styles: styles,
        container: container,
        watermark: watermark
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
    var _this5 = this;

    var horizontal = function horizontal() {
      return windowWrapper["a" /* default */].document.querySelector("#pro-gallery-" + _this5.props.domId + " #gallery-horizontal-scroll");
    };

    var vertical = this.props.scrollingElement ? typeof this.props.scrollingElement === 'function' ? this.props.scrollingElement : function () {
      return _this5.props.scrollingElement;
    } : function () {
      return windowWrapper["a" /* default */];
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
        return Object(scrollHelper["d" /* scrollToItemImp */])(scrollParams);
      } catch (e) {
        //added console.error to debug sentry error 'Cannot read property 'isRTL' of undefined in pro-gallery-statics'
        console.error('error:', e, ' pro-gallery, scrollToItem, cannot get scrollParams, ', 'isEditMode =', Object(viewModeWrapper["a" /* isEditMode */])(), ' isPreviewMode =', Object(viewModeWrapper["d" /* isPreviewMode */])(), ' isSiteMode =', Object(viewModeWrapper["f" /* isSiteMode */])(), ' this.state.styles =', this.state.styles, ' this.state.container =', this.state.container, ' this.galleryStructure =', this.galleryStructure);
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
        return Object(scrollHelper["c" /* scrollToGroupImp */])(scrollParams);
      } catch (e) {
        //added console.error to debug sentry error 'Cannot read property 'isRTL' of undefined in pro-gallery-statics'
        console.error('error:', e, ' pro-gallery, scrollToGroup, cannot get scrollParams, ', 'isEditMode =', Object(viewModeWrapper["a" /* isEditMode */])(), ' isPreviewMode =', Object(viewModeWrapper["d" /* isPreviewMode */])(), ' isSiteMode =', Object(viewModeWrapper["f" /* isSiteMode */])(), ' this.state.styles =', this.state.styles, ' this.state.container =', this.state.container, ' this.galleryStructure =', this.galleryStructure);
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

  _proto.getScrollCss = function getScrollCss(_ref4) {
    var domId = _ref4.domId,
        items = _ref4.items,
        styleParams = _ref4.styleParams;
    this.scrollCss = cssScrollHelper.calcScrollCss({
      items: items,
      styleParams: styleParams,
      domId: domId
    });
  };

  _proto.createDynamicStyles = function createDynamicStyles(_ref5) {
    var overlayBackground = _ref5.overlayBackground;
    var allowSSROpacity = Object(viewModeWrapper["c" /* isPrerenderMode */])() && !!this.props.settings.allowSSROpacity;
    this.dynamicStyles = ("\n      " + (!allowSSROpacity ? '' : "#pro-gallery-" + this.props.domId + " .gallery-item-container { opacity: 0 }") + "\n      " + (!overlayBackground ? '' : "#pro-gallery-" + this.props.domId + " .gallery-item-hover::before { background-color: " + overlayBackground + " !important}") + "\n    ").trim();
  };

  _proto.toggleLoadMoreItems = function toggleLoadMoreItems() {
    var _this6 = this;

    this.eventsListener(constants["a" /* default */].events.LOAD_MORE_CLICKED, this.galleryStructure.galleryItems);
    var showMoreClickedAtLeastOnce = true;
    var needToHandleShowMoreClick = true; //before clicking "load more" at the first time

    if (!this.state.showMoreClickedAtLeastOnce) {
      this.getScrollCss({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: this.state.styles
      });
      var initialGalleryHeight = this.state.container.height; //container.height before clicking "load more" at the first time

      this.setState({
        showMoreClickedAtLeastOnce: showMoreClickedAtLeastOnce,
        initialGalleryHeight: initialGalleryHeight,
        needToHandleShowMoreClick: needToHandleShowMoreClick
      }, function () {
        _this6.handleNewGalleryStructure();
      });
    } else {
      //from second click
      this.setState({
        needToHandleShowMoreClick: needToHandleShowMoreClick
      }, function () {
        _this6.handleNewGalleryStructure();
      });
    }
  };

  _proto.setGotFirstScrollIfNeeded = function setGotFirstScrollIfNeeded() {
    if (!this.state.gotFirstScrollEvent) {
      this.getScrollCss({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: this.state.styles
      });
      this.setState({
        gotFirstScrollEvent: true
      });
    }
  };

  _proto.duplicateGalleryItems = function duplicateGalleryItems() {
    var _this$items,
        _this7 = this;

    if (!this.itemsToDuplicate) {
      this.itemsToDuplicate = this.items;
    }

    var items = (_this$items = this.items).concat.apply(_this$items, this.itemsToDuplicate.slice(0, this.props.totalItemsCount));

    var galleryState = this.reCreateGalleryExpensively(galleryContainerNew_objectSpread(galleryContainerNew_objectSpread({}, this.props), {}, {
      items: items
    }));

    if (Object.keys(galleryState).length > 0) {
      this.setState(galleryState, function () {
        _this7.handleNewGalleryStructure();
      });
    }
  };

  _proto.eventsListener = function eventsListener(eventName, eventData, event) {
    this.videoScrollHelper.handleEvent({
      eventName: eventName,
      eventData: eventData
    });

    if (eventName === constants["a" /* default */].events.HOVER_SET) {
      this.currentHoverChangeEvent.currentHoverIdx = eventData;
      windowWrapper["a" /* default */].dispatchEvent(this.currentHoverChangeEvent);
    }

    if (typeof this.props.eventsListener === 'function') {
      this.props.eventsListener(eventName, eventData, event);
    }
  };

  _proto.getMoreItemsIfNeeded = function getMoreItemsIfNeeded(scrollPos) {
    var _this8 = this;

    if (this.galleryStructure && this.galleryStructure.galleryItems && this.galleryStructure.galleryItems.length > 0 && !this.gettingMoreItems && this.state.items && this.state.styles && this.state.container) {
      //more items can be fetched from the server
      //TODO - add support for horizontal galleries
      var oneRow = this.state.styles.oneRow;
      var galleryEnd = this.galleryStructure[oneRow ? 'width' : 'height'] + (oneRow ? 0 : this.state.container.scrollBase);
      var screenSize = windowWrapper["a" /* default */].screen[oneRow ? 'width' : 'height'];
      var scrollEnd = scrollPos + screenSize;
      var getItemsDistance = scrollPos ? 3 * screenSize : 0; //first scrollPos is 0 falsy. dont load before a scroll happened.
      // console.log('[RTL SCROLL] getMoreItemsIfNeeded: ', scrollPos);
      //const curDistance = galleryEnd - scrollEnd;
      //if (curDistance > 0 && curDistance < getItemsDistance) {

      if (galleryEnd - scrollEnd < getItemsDistance) {
        //only when the last item turns visible we should try getting more items
        if (this.state.items.length < this.props.totalItemsCount) {
          this.gettingMoreItems = true;
          this.eventsListener(constants["a" /* default */].events.NEED_MORE_ITEMS, this.state.items.length);
          setTimeout(function () {
            //wait a bit before allowing more items to be fetched - ugly hack before promises still not working
            _this8.gettingMoreItems = false;
          }, 2000);
        } else if (this.state.styles.slideshowLoop) {
          this.duplicateGalleryItems();
        }
      }
    }
  };

  _proto.canRender = function canRender() {
    var can = this.state.container && this.state.styles && this.state.items;

    if (!can && utils["a" /* default */].isVerbose()) {
      console.log('PROGALLERY [CAN_RENDER] GalleryContainer', this.state, can, this.state.container, this.state.styles, this.state.items);
    }

    return can;
  };

  _proto.isVerticalGallery = function isVerticalGallery() {
    return !this.state.styles.oneRow;
  };

  _proto.render = function render() {
    if (!this.canRender()) {
      return null;
    }

    var ViewComponent = this.isVerticalGallery() ? galleryView : slideshowView;

    if (utils["a" /* default */].isVerbose()) {
      console.count('PROGALLERY [COUNTS] - GalleryContainer (render)');
      console.log('PROGALLERY [RENDER] - GalleryContainer', this.state.container.scrollBase, {
        state: this.state,
        items: this.items
      });
    }

    var displayShowMore = this.containerInfiniteGrowthDirection() === 'none';
    var findNeighborItem = this.layouter ? this.layouter.findNeighborItem : function () {};
    return /*#__PURE__*/react_default.a.createElement("div", {
      "data-key": "pro-gallery-inner-container",
      key: "pro-gallery-inner-container",
      id: "pro-gallery-inner-container-" + this.props.domId
    }, /*#__PURE__*/react_default.a.createElement(galleryScrollIndicator_ScrollIndicator, {
      domId: this.props.domId,
      oneRow: this.state.styles.oneRow,
      isRTL: this.state.styles.isRTL,
      totalWidth: this.galleryStructure.width,
      scrollBase: this.state.container.scrollBase,
      scrollingElement: this._scrollingElement,
      getMoreItemsIfNeeded: this.getMoreItemsIfNeeded,
      setGotFirstScrollIfNeeded: this.setGotFirstScrollIfNeeded,
      onScroll: this.onGalleryScroll
    }), /*#__PURE__*/react_default.a.createElement(ViewComponent, galleryContainerNew_extends({
      isInDisplay: this.props.isInDisplay,
      scrollingElement: this._scrollingElement,
      totalItemsCount: this.props.totalItemsCount //the items passed in the props might not be all the items
      ,
      renderedItemsCount: this.props.renderedItemsCount,
      items: this.items,
      getVisibleItems: this.getVisibleItems,
      itemsLoveData: this.props.itemsLoveData,
      galleryStructure: this.galleryStructure,
      styleParams: this.state.styles,
      container: this.state.container,
      watermark: this.props.watermark,
      settings: this.props.settings,
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
      "data-key": "dynamic-styles",
      key: "items-styles",
      style: {
        display: 'none'
      }
    }, (this.layoutCss || []).filter(Boolean).map(function (css, idx) {
      return /*#__PURE__*/react_default.a.createElement("style", {
        id: "layoutCss-" + idx,
        key: "layoutCss-" + idx,
        dangerouslySetInnerHTML: {
          __html: css
        }
      });
    }), (this.scrollCss || []).filter(Boolean).map(function (css, idx) {
      return /*#__PURE__*/react_default.a.createElement("style", {
        id: "scrollCss_" + idx,
        key: "scrollCss_" + idx,
        dangerouslySetInnerHTML: {
          __html: css
        }
      });
    }), !!this.dynamicStyles && /*#__PURE__*/react_default.a.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: this.dynamicStyles
      }
    })), this.props.useLayoutFixer ? /*#__PURE__*/react_default.a.createElement(layoutFixer_LayoutFixer, {
      parentId: "pro-gallery-inner-container-" + this.props.domId,
      styles: this.state.styles,
      items: this.items
    }) : null);
  };

  return GalleryContainer;
}(react_default.a.Component);
/* harmony default export */ var galleryContainerNew = (galleryContainerNew_GalleryContainer);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/proGallery.js
function proGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function proGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { proGallery_ownKeys(Object(source), true).forEach(function (key) { proGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { proGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function proGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function proGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var proGallery_ProGallery = /*#__PURE__*/function (_GalleryComponent) {
  proGallery_inheritsLoose(ProGallery, _GalleryComponent);

  function ProGallery(props) {
    var _this;

    _this = _GalleryComponent.call(this) || this;

    _this.init(props);

    if (utils["a" /* default */].isLocal() && !utils["a" /* default */].isTest()) {
      console.log('PRO GALLERY DEV');
    }

    return _this;
  }

  var _proto = ProGallery.prototype;

  _proto.init = function init(props) {
    if (typeof props.viewMode !== 'undefined') {
      viewModeWrapper["g" /* viewModeWrapper */].setViewMode(props.viewMode);
    }

    if (typeof props.formFactor !== 'undefined') {
      viewModeWrapper["g" /* viewModeWrapper */].setFormFactor(props.formFactor);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.viewMode !== nextProps.viewMode) {
      utils["a" /* default */].dumpCache();
      viewModeWrapper["g" /* viewModeWrapper */].setViewMode(nextProps.viewMode);
    }

    if (this.props.formFactor !== nextProps.formFactor) {
      utils["a" /* default */].dumpCache();
      viewModeWrapper["g" /* viewModeWrapper */].setFormFactor(nextProps.formFactor);
    }
  };

  _proto.renderProps = function renderProps() {
    return proGallery_objectSpread(proGallery_objectSpread({}, this.props), {}, {
      domId: this.props.domId,
      items: this.props.items || [],
      watermarkData: this.props.watermarkData,
      settings: this.props.settings || {},
      offsetTop: this.props.offsetTop,
      itemsLoveData: this.props.itemsLoveData || {},
      proGalleryRegionLabel: this.props.proGalleryRegionLabel || 'Gallery. you can navigate the gallery with keyboard arrow keys.'
    });
  };

  _proto.containerProps = function containerProps() {
    return {
      id: "pro-gallery-" + this.props.domId,
      className: "pro-gallery"
    };
  };

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement("div", this.containerProps(), /*#__PURE__*/react_default.a.createElement(galleryContainerNew, this.renderProps()));
  };

  return ProGallery;
}(galleryComponent["a" /* GalleryComponent */]);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/leanGallery/leanGallery.js
function leanGallery_extends() { leanGallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return leanGallery_extends.apply(this, arguments); }

function leanGallery_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function leanGallery_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { leanGallery_ownKeys(Object(source), true).forEach(function (key) { leanGallery_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { leanGallery_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function leanGallery_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function leanGallery_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function leanGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






var leanGallery_LeanGallery = /*#__PURE__*/function (_React$Component) {
  leanGallery_inheritsLoose(LeanGallery, _React$Component);

  function LeanGallery() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.measureIfNeeded = _this.measureIfNeeded.bind(leanGallery_assertThisInitialized(_this));
    _this.eventsListener = _this.eventsListener.bind(leanGallery_assertThisInitialized(_this));
    _this.state = {
      itemStyle: {},
      numberOfColumns: 0
    };
    return _this;
  } // #region Lifecycle functions


  var _proto = LeanGallery.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.eventsListener(constants["a" /* default */].events.APP_LOADED, {});
    this.measureIfNeeded();
    this.setState({
      numberOfColumns: this.calcNumberOfColumns(this.props)
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.container.galleryWidth !== nextProps.container.galleryWidth) {
      this.measureIfNeeded();
      this.setState({
        numberOfColumns: this.calcNumberOfColumns(nextProps)
      });
    }
  } // #endregion
  // #region Gallery
  ;

  _proto.createGalleryStyle = function createGalleryStyle() {
    var _this$props$styles = this.props.styles,
        gridStyle = _this$props$styles.gridStyle,
        fixedColumns = _this$props$styles.fixedColumns,
        imageMargin = _this$props$styles.imageMargin,
        cubeImages = _this$props$styles.cubeImages;
    var itemSize = this.calcItemContainerSize();
    var numberOfColumns = gridStyle === constants["a" /* default */].gridStyle.SET_ITEMS_PER_ROW ? fixedColumns : this.state.numberOfColumns;
    var gridTemplateColumns = numberOfColumns > 0 ? "repeat(" + numberOfColumns + ", 1fr)" : "repeat(auto-fit, minmax(" + itemSize.width + "px, 1fr))";
    return leanGallery_objectSpread({
      gridTemplateColumns: gridTemplateColumns,
      gridGap: imageMargin + "px"
    }, cubeImages === false ? {
      gridAutoRows: 'minmax(max-content, 1px)',
      gridGap: 0,
      columnGap: imageMargin + "px"
    } : {});
  };

  _proto.calcNumberOfColumns = function calcNumberOfColumns(props) {
    var galleryWidth = props.container.galleryWidth;

    if (!galleryWidth) {
      return 0;
    }

    var itemSize = this.calcItemContainerSize(undefined, props);
    var numOfCols = 1;

    if (props.styles.fixedColumns > 0) {
      numOfCols = props.styles.fixedColumns;
    } else {
      // find the number of columns that makes each column width the closet to the itemSize
      var numOfColsFloat = galleryWidth / itemSize.width;
      var roundFuncs = [Math.floor, Math.ceil];
      var diffs = roundFuncs.map(function (func) {
        return func(numOfColsFloat);
      }) //round to top, round to bottom
      .map(function (n) {
        return Math.round(galleryWidth / n);
      }) //width of each col
      .map(function (w) {
        return Math.abs(itemSize.width - w);
      }); //diff from itemSize

      var roundFunc = roundFuncs[diffs.indexOf(Math.min.apply(Math, diffs))]; //choose the round function that has the lowest diff from the itemSize

      numOfCols = roundFunc(numOfColsFloat) || 1;
    }

    return numOfCols;
  } // #endregion
  // #region Item container
  ;

  _proto.calcItemContainerSize = function calcItemContainerSize(item, props) {
    var _ref = props || this.props,
        styles = _ref.styles,
        container = _ref.container;

    var targetItemSize = styles.targetItemSize,
        cubeImages = styles.cubeImages,
        titlePlacement = styles.titlePlacement,
        textBoxHeight = styles.textBoxHeight,
        cubeRatio = styles.cubeRatio,
        imageMargin = styles.imageMargin;
    var itemWidth = container.width > 0 ? Math.min(targetItemSize, container.width) : targetItemSize;
    var itemHeight = itemWidth / cubeRatio;

    if (item && cubeImages === false) {
      var ratio = leanGallery_get(item, 'width') / leanGallery_get(item, 'height');
      itemHeight = Math.round((itemWidth - imageMargin) / ratio);
    }

    if (constants["a" /* default */].hasVerticalPlacement(titlePlacement)) {
      itemHeight += textBoxHeight;
    }

    return {
      width: itemWidth,
      height: itemHeight
    };
  };

  _proto.createItemContainerStyle = function createItemContainerStyle(clickable, item) {
    var _this$state$itemStyle = this.state.itemStyle.height,
        height = _this$state$itemStyle === void 0 ? null : _this$state$itemStyle;
    var _this$props$styles2 = this.props.styles,
        imageMargin = _this$props$styles2.imageMargin,
        cubeImages = _this$props$styles2.cubeImages;
    var itemSize = this.calcItemContainerSize(item);
    var noCropStyle = cubeImages === false ? {
      gridRowEnd: "span " + itemSize.height,
      marginBottom: imageMargin + "px",
      height: 'fit-content'
    } : {};
    return leanGallery_objectSpread(leanGallery_objectSpread(leanGallery_objectSpread({}, this.createItemContainerBorder()), height ? {
      height: 'auto'
    } : {
      height: 'auto',
      textAlign: 'center'
    }), {}, {
      cursor: clickable ? 'pointer' : 'default'
    }, noCropStyle);
  };

  _proto.createItemContainerBorder = function createItemContainerBorder() {
    // Set border of the entire Item - including the info text
    var styles = this.props.styles;

    if (styles.imageInfoType === constants["a" /* default */].infoType.ATTACHED_BACKGROUND) {
      return {
        borderStyle: 'solid',
        borderWidth: styles.itemBorderWidth,
        borderColor: utils["a" /* default */].formatColor(styles.itemBorderColor),
        borderRadius: styles.itemBorderRadius
      };
    }
  } // #endregion
  // #region Image wrapper
  ;

  _proto.createImageWrapperStyle = function createImageWrapperStyle(item) {
    var _this$props$styles3 = this.props.styles,
        cubeType = _this$props$styles3.cubeType,
        cubeImages = _this$props$styles3.cubeImages;

    if (this.state.itemStyle.width && cubeType !== constants["a" /* default */].resizeMethods.FIT) {
      var itemSize = this.calcItemContainerSize(item);
      return cubeImages === false ? leanGallery_objectSpread({}, itemSize) : leanGallery_objectSpread({}, this.state.itemStyle);
    } else if (!(this.state.itemStyle.width > 0)) {
      return {
        width: '100%',
        height: 'auto'
      };
    }

    var _this$state$itemStyle2 = this.state.itemStyle,
        width = _this$state$itemStyle2.width,
        height = _this$state$itemStyle2.height;
    var imageWidth = leanGallery_get(item, 'width');
    var imageHeight = leanGallery_get(item, 'height');
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
  } // #endregion
  // #region Image
  ;

  _proto.resizeUrl = function resizeUrl(_ref2) {
    var item = _ref2.item;
    var _this$props = this.props,
        styles = _this$props.styles,
        resizeMediaUrl = _this$props.resizeMediaUrl;
    var cubeType = styles.cubeType,
        imageQuality = styles.imageQuality,
        cubeRatio = styles.cubeRatio,
        cubeImages = styles.cubeImages;
    var itemStyle = this.state.itemStyle;
    var url = item.url,
        mediaUrl = item.mediaUrl,
        src = item.src;
    var itemUrl = url || mediaUrl || src;
    var itemSize = this.calcItemContainerSize(item);
    var width = cubeImages === true && itemStyle.width || itemSize.width;
    var height = cubeImages === true && itemStyle.height || itemSize.height / cubeRatio;
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

  _proto.createImageStyle = function createImageStyle(imageWrapperStyle) {
    var _imageWrapperStyle$wi = imageWrapperStyle.width,
        width = _imageWrapperStyle$wi === void 0 ? '100%' : _imageWrapperStyle$wi,
        _imageWrapperStyle$he = imageWrapperStyle.height,
        height = _imageWrapperStyle$he === void 0 ? 'auto' : _imageWrapperStyle$he;
    var blockDownloadStyles = utils["a" /* default */].isiOS() && !this.props.styles.allowContextMenu ? {
      '-webkit-user-select': 'none',
      '-webkit-touch-callout': 'none'
    } : {};
    return leanGallery_objectSpread(leanGallery_objectSpread({
      width: width,
      height: height
    }, blockDownloadStyles), this.createImageBorder());
  };

  _proto.createImageBorder = function createImageBorder() {
    var styles = this.props.styles;

    if (styles.imageInfoType !== constants["a" /* default */].infoType.ATTACHED_BACKGROUND) {
      return {
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: styles.itemBorderWidth,
        borderColor: utils["a" /* default */].formatColor(styles.itemBorderColor),
        borderRadius: styles.itemBorderRadius
      };
    }
  } // #endregion
  // #region Helper functions
  ;

  _proto.createLinkParams = function createLinkParams(item) {
    var _this$props2 = this.props,
        noFollowForSEO = _this$props2.noFollowForSEO,
        styles = _this$props2.styles;
    var itemClick = styles.itemClick;
    var directLink = item.directLink;

    var _ref3 = directLink || {},
        url = _ref3.url,
        target = _ref3.target;

    var isSEO = Object(viewModeWrapper["e" /* isSEOMode */])();
    var shouldUseNofollow = isSEO && noFollowForSEO;
    var seoLinkParams = shouldUseNofollow ? {
      rel: 'nofollow'
    } : {};
    var shouldUseDirectLink = !!(url && target && itemClick === constants["a" /* default */].itemClick.LINK);
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

  _proto.isMetadataLinkExists = function isMetadataLinkExists(item) {
    var metadata = item.metadata || item.metaData;
    return metadata && metadata.link ? true : false;
  };

  _proto.eventsListener = function eventsListener(eventName, eventData) {
    if (typeof this.props.eventsListener === 'function') {
      this.props.eventsListener(eventName, eventData);
    }
  } // #endregion
  ;

  _proto.render = function render() {
    var _this2 = this;

    var eventsListener = this.eventsListener,
        props = this.props;
    var customInfoRenderer = props.customInfoRenderer,
        items = props.items;
    var styles = this.fixStylesIfNeeded(props.styles);
    var itemClick = styles.itemClick;
    return /*#__PURE__*/react_default.a.createElement("div", {
      "data-hook": "lean-gallery",
      className: ['pro-gallery', 'inline-styles', 'lean-gallery-gallery'].join(' '),
      style: this.createGalleryStyle()
    }, items.map(function (item, itemIdx) {
      var linkParams = _this2.createLinkParams(item);

      var clickable = linkParams && itemClick === constants["a" /* default */].itemClick.LINK || [constants["a" /* default */].itemClick.EXPAND, constants["a" /* default */].itemClick.FULLSCREEN].includes(itemClick) || _this2.isMetadataLinkExists(item);

      var itemData = leanGallery_objectSpread(leanGallery_objectSpread({}, item), {}, {
        id: item.itemId,
        idx: itemIdx
      });

      var metadata = item.metaData || item.metadata;

      var itemProps = leanGallery_objectSpread(leanGallery_objectSpread(leanGallery_objectSpread({}, itemData), metadata), {}, {
        style: _this2.state.itemStyle,
        styleParams: styles
      });

      var imageWrapperStyle = _this2.createImageWrapperStyle(item);

      var infoHeight = styles.textBoxHeight;

      var texts = function texts(placement) {
        return typeof customInfoRenderer === 'function' && styles.titlePlacement === placement && /*#__PURE__*/react_default.a.createElement("div", {
          className: "gallery-item-common-info gallery-item-" + (placement === constants["a" /* default */].placements.SHOW_ABOVE ? "top" : "bottom") + "-info",
          style: getInnerInfoStyle(placement, styles, infoHeight)
        }, customInfoRenderer(itemProps, placement));
      };

      return /*#__PURE__*/react_default.a.createElement("a", leanGallery_extends({
        className: ['gallery-item-container', 'lean-gallery-cell'].join(' '),
        style: _this2.createItemContainerStyle(clickable, item),
        ref: function ref(node) {
          _this2.measureIfNeeded(node);

          eventsListener(constants["a" /* default */].events.ITEM_CREATED, itemData);
        },
        key: 'item-container-' + itemIdx
      }, linkParams), texts(constants["a" /* default */].placements.SHOW_ABOVE), /*#__PURE__*/react_default.a.createElement("div", {
        style: imageWrapperStyle,
        className: ['gallery-item-hover', 'lean-gallery-image-wrapper'].join(' '),
        onClick: function onClick() {
          return eventsListener(constants["a" /* default */].events.ITEM_ACTION_TRIGGERED, itemData);
        }
      }, /*#__PURE__*/react_default.a.createElement("img", {
        src: _this2.resizeUrl({
          item: item
        }),
        loading: "lazy",
        className: ['gallery-item-content', 'lean-gallery-image'].join(' '),
        alt: leanGallery_get(item, 'title'),
        style: _this2.createImageStyle(imageWrapperStyle),
        onLoad: function onLoad() {
          return eventsListener(constants["a" /* default */].events.ITEM_LOADED, itemData);
        }
      })), texts(constants["a" /* default */].placements.SHOW_BELOW));
    }));
  };

  return LeanGallery;
}(react_default.a.Component);



var leanGallery_get = function get(item, attr) {
  if (typeof item[attr] !== 'undefined') {
    return item[attr];
  }

  var metadata = item.metadata || item.metaData;

  if (typeof metadata !== 'undefined') {
    if (typeof metadata[attr] !== 'undefined') {
      return metadata[attr];
    }
  }
};

var leanGallery_formatLeanGalleryStyles = function formatLeanGalleryStyles(styles) {
  var customExternalInfoRendererExists = true;
  return layoutHelper(presets_addPresetStyles(styles), customExternalInfoRendererExists); // TODO make sure the processLayouts is up to date. delete addLayoutStyles from layoutsHelper when done with it...
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/leanGallery/consts.js
 //these styles can get any value, the lean gallery will handle them

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
  textBoxHeight: 200 // cubeImages: true, // todo: in order to enable Masonry --> 'cubeImages' should be defined here and not it fixedStyleParams

}; //these params must be set to these exact values in order for the lean gallery to render well

var fixedStyleParams = {
  allowLeanGallery: true,
  cubeImages: true,
  galleryLayout: [constants["a" /* default */].layout.EMPTY, constants["a" /* default */].layout.GRID],
  // galleryLayout: [GALLERY_CONSTS.layout.EMPTY, GALLERY_CONSTS.layout.MASONRY, GALLERY_CONSTS.layout.GRID],
  isVertical: true,
  oneRow: false,
  isRTL: false,
  scrollDirection: [0, undefined],
  groupSize: 1,
  hoveringBehaviour: [constants["a" /* default */].infoBehaviourOnHover.NEVER_SHOW, constants["a" /* default */].infoBehaviourOnHover.APPEARS],
  rotatingGroupTypes: '',
  smartCrop: false,
  rotatingCubeRatio: '',
  boxShadow: 0,
  galleryMargin: 0,
  scatter: 0,
  placeGroupsLtr: false,
  mobilePanorama: false,
  enableInfiniteScroll: [true, 1],
  itemEnableShadow: false,
  itemClick: [constants["a" /* default */].itemClick.NOTHING, constants["a" /* default */].itemClick.LINK, constants["a" /* default */].itemClick.FULLSCREEN, constants["a" /* default */].itemClick.EXPAND],
  scrollAnimation: constants["a" /* default */].scrollAnimations.NO_EFFECT,
  titlePlacement: function titlePlacement(sp) {
    return constants["a" /* default */].isVerticalPlacement(sp.titlePlacement) || sp.hoveringBehaviour === constants["a" /* default */].infoBehaviourOnHover.NEVER_SHOW || constants["a" /* default */].isHoverPlacement(sp.titlePlacement) && !sp.loveButton && !sp.loveCounter && !sp.allowDownload && !sp.allowSocial && !sp.allowTitle && !sp.allowDescription;
  },
  imageHoverAnimation: constants["a" /* default */].imageHoverAnimations.NO_EFFECT,
  loveButton: false,
  loveCounter: false,
  allowDownload: false,
  allowSocial: false,
  isAccessible: false
};
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/leanGallery/isEligible.js
function isEligible_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function isEligible_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { isEligible_ownKeys(Object(source), true).forEach(function (key) { isEligible_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { isEligible_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isEligible_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isEligible_createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = isEligible_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function isEligible_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return isEligible_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return isEligible_arrayLikeToArray(o, minLen); }

function isEligible_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



 //example: http://pro-gallery.surge.sh/?titlePlacement=DONT_SHOW&itemClick=nothing&allowHover=false&galleryLayout=2&allowLeanGallery=true

var MAX_ITEMS_COUNT = 25;
/* harmony default export */ var isEligible = (function (_ref) {
  var items = _ref.items,
      styles = _ref.styles,
      _ref$totalItemsCount = _ref.totalItemsCount,
      totalItemsCount = _ref$totalItemsCount === void 0 ? 0 : _ref$totalItemsCount;
  styles = leanGallery_formatLeanGalleryStyles(styles);
  var allowLeanGallery = !!styles.allowLeanGallery;

  if (!allowLeanGallery) {
    return false;
  }

  if (totalItemsCount > items.length) {
    utils["a" /* default */].isVerbose() && console.log("[LEAN GALLERY] NOT ALLOWED - not all items arrived", totalItemsCount, items.length);
    return false;
  }

  var totalItems = Math.max(items.length, totalItemsCount);

  if (totalItems > MAX_ITEMS_COUNT) {
    utils["a" /* default */].isVerbose() && console.log("[LEAN GALLERY] NOT ALLOWED - more than " + MAX_ITEMS_COUNT + " items", totalItems);
    return false;
  }

  for (var _iterator = isEligible_createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
    var item = _step.value;

    if (!isImage(item)) {
      utils["a" /* default */].isVerbose() && console.log("[LEAN GALLERY] NOT ALLOWED - an item that is not an image", item);
      return false;
    }
  }

  for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        styleParam = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (!isEligible_isValidStyleParam(styleParam, value, styles)) {
      utils["a" /* default */].isVerbose() && console.log("[LEAN GALLERY] NOT ALLOWED - invalid styleParam", styleParam, value);
      return false;
    }
  }

  utils["a" /* default */].isVerbose() && console.log("[LEAN GALLERY] ALLOWED!", styles);
  return true;
});
var isEligible_notEligibleReasons = function notEligibleReasons(_ref2) {
  var items = _ref2.items,
      styles = _ref2.styles;

  var s = isEligible_objectSpread(isEligible_objectSpread(isEligible_objectSpread({}, styles), NEW_PRESETS.grid), {}, {
    allowLeanGallery: true
  });

  var res = [];

  if (String(styles.galleryLayout) !== '2') {
    res.push('not a Grid layout');
  }

  if (items.length > MAX_ITEMS_COUNT) {
    res.push("more than " + MAX_ITEMS_COUNT + " items");
  }

  var nonImagesCount = 0;

  for (var _iterator2 = isEligible_createForOfIteratorHelperLoose(items), _step2; !(_step2 = _iterator2()).done;) {
    var item = _step2.value;

    if (!isImage(item)) {
      nonImagesCount++;
    }
  }

  if (nonImagesCount > 0) {
    res.push(nonImagesCount + " items are not an image");
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(s); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _Object$entries2[_i2],
        styleParam = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    if (!isEligible_isValidStyleParam(styleParam, value, s)) {
      res.push("invalid style: " + styleParam + " => " + value);
    }
  }

  return res;
}; //#region Helper Functions

var isImage = function isImage(item) {
  var meta = item.metadata || item.metaData;
  var isImageItem = !!((!meta.type || meta.type === 'image') && (item.url || item.mediaUrl || item.src));
  return isImageItem;
};

var isEligible_isValidStyleParam = function isValidStyleParam(styleParam, value, allStyles) {
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
}; //#endregion
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/index.js
function gallery_extends() { gallery_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return gallery_extends.apply(this, arguments); }

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
    var domId = this.props.domId || 'default-dom-id';

    var _this$props = this.props,
        styles = _this$props.styles,
        options = _this$props.options,
        styleParams = _this$props.styleParams,
        eventsListener = _this$props.eventsListener,
        otherProps = gallery_objectWithoutPropertiesLoose(_this$props, ["styles", "options", "styleParams", "eventsListener"]);

    var _eventsListener = function _eventsListener() {
      return typeof eventsListener === 'function' && eventsListener.apply(void 0, arguments);
    };

    var _styles = gallery_objectSpread(gallery_objectSpread(gallery_objectSpread(gallery_objectSpread({}, common_defaultStyles), options), styles), styleParams);

    var galleryProps = gallery_objectSpread(gallery_objectSpread({}, otherProps), {}, {
      styles: _styles,
      eventsListener: _eventsListener,
      domId: domId
    });

    var shouldRenderLean = isEligible(galleryProps);
    var key = [domId, shouldRenderLean].join('_');

    if (this.props.useBlueprints) {//
    } else {
      dimensionsHelper["a" /* default */].updateParams({
        domId: galleryProps.domId,
        container: galleryProps.container,
        styles: galleryProps.styles
      });
      var _galleryProps$styles = galleryProps.styles,
          galleryType = _galleryProps$styles.galleryType,
          galleryLayout = _galleryProps$styles.galleryLayout;

      if (galleryType === undefined || galleryLayout !== undefined) {
        galleryProps = gallery_objectSpread(gallery_objectSpread({}, galleryProps), {}, {
          styles: presets_addPresetStyles(galleryProps.styles)
        });
      }
    }

    var GalleryComponent = proGallery_ProGallery;

    if (shouldRenderLean) {
      galleryProps.styles = leanGallery_formatLeanGalleryStyles(galleryProps.styles);
      GalleryComponent = leanGallery_LeanGallery;
    }

    return /*#__PURE__*/react_default.a.createElement(GalleryComponent, gallery_extends({
      key: key
    }, galleryProps));
  };

  return BaseGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/galleryContainerExtraNew.js
function galleryContainerExtraNew_extends() { galleryContainerExtraNew_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return galleryContainerExtraNew_extends.apply(this, arguments); }

function galleryContainerExtraNew_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function galleryContainerExtraNew_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { galleryContainerExtraNew_ownKeys(Object(source), true).forEach(function (key) { galleryContainerExtraNew_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { galleryContainerExtraNew_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function galleryContainerExtraNew_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function galleryContainerExtraNew_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function galleryContainerExtraNew_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }











var galleryContainerExtraNew_GalleryContainer = /*#__PURE__*/function (_React$Component) {
  galleryContainerExtraNew_inheritsLoose(GalleryContainer, _React$Component);

  function GalleryContainer(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    if (utils["a" /* default */].isVerbose()) {
      console.count('[OOISSR] galleryContainerNew constructor', windowWrapper["a" /* default */].isMock);
    }

    _this.getMoreItemsIfNeeded = _this.getMoreItemsIfNeeded.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.setGotFirstScrollIfNeeded = _this.setGotFirstScrollIfNeeded.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.toggleLoadMoreItems = _this.toggleLoadMoreItems.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.scrollToItem = _this.scrollToItem.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.scrollToGroup = _this.scrollToGroup.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this._scrollingElement = _this.getScrollingElement();
    _this.eventsListener = _this.eventsListener.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.onGalleryScroll = _this.onGalleryScroll.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.setPlayingIdxState = _this.setPlayingIdxState.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.getVisibleItems = _this.getVisibleItems.bind(galleryContainerExtraNew_assertThisInitialized(_this));
    _this.videoScrollHelper = new videoScrollHelperWrapper(_this.setPlayingIdxState);
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
    _this.layoutCss = [];
    _this.initialGalleryState = {};

    try {
      var galleryState = _this.propsToState(props);

      if (Object.keys(galleryState).length > 0) {
        _this.initialGalleryState = galleryState;
      }
    } catch (_e) {
      console.warn(_e);
    }

    _this.state = galleryContainerExtraNew_objectSpread(galleryContainerExtraNew_objectSpread({}, initialState), _this.initialGalleryState);
    return _this;
  }

  var _proto = GalleryContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollToItem(this.props.currentIdx, false, true, 0);
    this.eventsListener(constants["a" /* default */].events.APP_LOADED, {});
    this.videoScrollHelper.initializePlayState();

    try {
      if (typeof windowWrapper["a" /* default */].CustomEvent === 'function') {
        this.currentHoverChangeEvent = new CustomEvent('current_hover_change');
      } else {
        //IE (new CustomEvent is not supported in IE)
        this.currentHoverChangeEvent = windowWrapper["a" /* default */].document.createEvent('CustomEvent'); // MUST be 'CustomEvent'

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
    var _this2 = this;

    if (!this.currentHoverChangeEvent.domId && nextProps.domId) {
      this.currentHoverChangeEvent.domId = nextProps.domId;
    }

    if (this.props.currentIdx !== nextProps.currentIdx) {
      this.scrollToItem(nextProps.currentIdx, false, true, 0);
    }

    var reCreateGallery = function reCreateGallery() {
      var galleryState = _this2.propsToState(nextProps);

      if (Object.keys(galleryState).length > 0) {
        _this2.setState(galleryState);
      }
    };

    var getSignificantProps = function getSignificantProps(props) {
      var domId = props.domId,
          styles = props.styles,
          container = props.container,
          items = props.items,
          watermark = props.watermark;
      return {
        domId: domId,
        styles: styles,
        container: container,
        items: items,
        watermark: watermark
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

      if (utils["a" /* default */].isVerbose() && hasPropsChanged) {
        console.log('New props arrived', utils["a" /* default */].printableObjectsDiff(currentSignificatProps, nextSignificatProps));
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
    var styleParams = this.props.styles;
    var numOfItems = this.state.items.length;
    var layoutHeight = this.props.structure.height;
    var layoutItems = this.props.structure.items;
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
    console.log('handleNewGalleryStructure', onGalleryChangeData);
    this.eventsListener(constants["a" /* default */].events.GALLERY_CHANGE, onGalleryChangeData);

    if (needToHandleShowMoreClick) {
      this.setState({
        needToHandleShowMoreClick: false
      });
    }
  };

  _proto.isVerticalGallery = function isVerticalGallery() {
    return !this.state.styles.oneRow;
  };

  _proto.getVisibleItems = function getVisibleItems(items, container) {
    var gotFirstScrollEvent = this.state.gotFirstScrollEvent;
    var scrollY = windowWrapper["a" /* default */].scrollY;
    var galleryHeight = container.galleryHeight,
        scrollBase = container.scrollBase,
        galleryWidth = container.galleryWidth;

    if (Object(viewModeWrapper["e" /* isSEOMode */])() || Object(viewModeWrapper["a" /* isEditMode */])() || Object(viewModeWrapper["d" /* isPreviewMode */])() || utils["a" /* default */].isSSR() || gotFirstScrollEvent || scrollY > 0 || this.props.currentIdx > 0) {
      return items;
    }

    var visibleItems = items;

    try {
      var windowHeight = windowWrapper["a" /* default */].innerHeight;
      var isInfinite = this.isVerticalGallery() && this.containerInfiniteGrowthDirection() === 'vertical';
      var galleryBottom = isInfinite ? Infinity : scrollBase + galleryHeight;
      var windowBottom = scrollY + windowHeight;
      var maxItemTop = Math.min(galleryBottom, windowBottom) - scrollBase;

      if (maxItemTop < 0) {
        //gallery is below the fold
        visibleItems = [];
      } else if (this.isVerticalGallery()) {
        visibleItems = items.filter(function (item) {
          return item.offset.top < maxItemTop;
        });
      } else {
        visibleItems = items.filter(function (item) {
          return item.left <= galleryWidth + 20;
        });
      }

      if (visibleItems.length < 2 && visibleItems.length < items.length) {
        //dont render less then 2 items (otherwise slide show Arrow will be removed)
        visibleItems = items.slice(1);
      }
    } catch (e) {
      console.error('Could not calculate visible items, returning original items', e);
      visibleItems = items;
    }

    return visibleItems;
  };

  _proto.propsToState = function propsToState(_ref) {
    var loopingItems = _ref.loopingItems,
        items = _ref.items,
        styles = _ref.styles,
        structure = _ref.structure,
        container = _ref.container,
        domId = _ref.domId,
        resizeMediaUrl = _ref.resizeMediaUrl;
    items = items || this.props.items;
    styles = styles || this.props.styles;
    container = container || this.props.container;
    structure = structure || this.props.structure;
    domId = domId || this.props.domId;
    resizeMediaUrl = resizeMediaUrl || this.props.resizeMediaUrl;
    this.galleryStructure = itemsHelper_ItemsHelper.convertToGalleryItems(structure, {
      // TODO use same objects in the memory when the galleryItems are changed
      thumbnailSize: styles.thumbnailSize,
      sharpParams: styles.sharpParams,
      resizeMediaUrl: resizeMediaUrl
    }); // // ------------ TODO. This is using GalleryItem and I am leaving it here for now ---------- //

    var shouldUseScrollCss = !Object(viewModeWrapper["e" /* isSEOMode */])() && (Object(viewModeWrapper["a" /* isEditMode */])() || this.state.gotFirstScrollEvent || this.state.showMoreClickedAtLeastOnce);

    if (shouldUseScrollCss) {
      this.getScrollCss({
        domId: domId,
        items: this.galleryStructure.galleryItems,
        styleParams: styles
      });
    }

    var scrollHelperNewGalleryStructure = {
      galleryStructure: this.galleryStructure,
      scrollBase: container.scrollBase,
      videoPlay: styles.videoPlay,
      videoLoop: styles.videoLoop,
      itemClick: styles.itemClick,
      oneRow: styles.oneRow,
      cb: this.setPlayingIdxState
    };
    this.videoScrollHelper.updateGalleryStructure(scrollHelperNewGalleryStructure, !utils["a" /* default */].isSSR(), items);
    var layoutParams = {
      items: items,
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
    this.createCssLayoutsIfNeeded(layoutParams);
    this.createDynamicStyles(styles);
    var newState = {
      items: loopingItems || items,
      styles: styles,
      container: container,
      structure: structure
    };
    return newState;
  };

  _proto.getScrollingElement = function getScrollingElement() {
    var _this3 = this;

    var horizontal = function horizontal() {
      return windowWrapper["a" /* default */].document.querySelector("#pro-gallery-" + _this3.props.domId + " #gallery-horizontal-scroll");
    };

    var vertical = this.props.scrollingElement ? typeof this.props.scrollingElement === 'function' ? this.props.scrollingElement : function () {
      return _this3.props.scrollingElement;
    } : function () {
      return windowWrapper["a" /* default */];
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
        return Object(scrollHelper["d" /* scrollToItemImp */])(scrollParams);
      } catch (e) {
        //added console.error to debug sentry error 'Cannot read property 'isRTL' of undefined in pro-gallery-statics'
        console.error('error:', e, ' pro-gallery, scrollToItem, cannot get scrollParams, ', 'isEditMode =', Object(viewModeWrapper["a" /* isEditMode */])(), ' isPreviewMode =', Object(viewModeWrapper["d" /* isPreviewMode */])(), ' isSiteMode =', Object(viewModeWrapper["f" /* isSiteMode */])(), ' this.state.styles =', this.state.styles, ' this.state.container =', this.state.container, ' this.galleryStructure =', this.galleryStructure);
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
        return Object(scrollHelper["c" /* scrollToGroupImp */])(scrollParams);
      } catch (e) {
        //added console.error to debug sentry error 'Cannot read property 'isRTL' of undefined in pro-gallery-statics'
        console.error('error:', e, ' pro-gallery, scrollToGroup, cannot get scrollParams, ', 'isEditMode =', Object(viewModeWrapper["a" /* isEditMode */])(), ' isPreviewMode =', Object(viewModeWrapper["d" /* isPreviewMode */])(), ' isSiteMode =', Object(viewModeWrapper["f" /* isSiteMode */])(), ' this.state.styles =', this.state.styles, ' this.state.container =', this.state.container, ' this.galleryStructure =', this.galleryStructure);
      }
    }
  };

  _proto.containerInfiniteGrowthDirection = function containerInfiniteGrowthDirection(styles) {
    if (styles === void 0) {
      styles = false;
    }

    var _styles = styles || this.props.styles; // return the direction in which the gallery can grow on it's own (aka infinite scroll)


    var enableInfiniteScroll = this.props.styles.enableInfiniteScroll; //TODO - props or "raw" styles

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

  _proto.onGalleryScroll = function onGalleryScroll(_ref2) {
    var top = _ref2.top,
        left = _ref2.left;
    this.videoScrollHelper.trigger.SCROLL({
      top: top,
      left: left
    });
  };

  _proto.createDynamicStyles = function createDynamicStyles(_ref3) {
    var overlayBackground = _ref3.overlayBackground;
    var allowSSROpacity = Object(viewModeWrapper["c" /* isPrerenderMode */])() && !!this.props.settings.allowSSROpacity;
    this.dynamicStyles = ("\n      " + (!allowSSROpacity ? '' : "#pro-gallery-" + this.props.domId + " .gallery-item-container { opacity: 0 }") + "\n      " + (!overlayBackground ? '' : "#pro-gallery-" + this.props.domId + " .gallery-item-hover::before { background-color: " + overlayBackground + " !important}") + "\n    ").trim();
  };

  _proto.createCssLayoutsIfNeeded = function createCssLayoutsIfNeeded(layoutParams) {
    this.layoutCss = createCssLayouts({
      layoutParams: layoutParams,
      isMobile: utils["a" /* default */].isMobile(),
      domId: this.props.domId,
      galleryItems: this.galleryStructure.galleryItems
    });
  };

  _proto.getScrollCss = function getScrollCss(_ref4) {
    var domId = _ref4.domId,
        items = _ref4.items,
        styleParams = _ref4.styleParams;
    this.scrollCss = cssScrollHelper.calcScrollCss({
      items: items,
      styleParams: styleParams,
      domId: domId
    });
  };

  _proto.toggleLoadMoreItems = function toggleLoadMoreItems() {
    var _this4 = this;

    this.eventsListener(constants["a" /* default */].events.LOAD_MORE_CLICKED, this.galleryStructure.galleryItems);
    var showMoreClickedAtLeastOnce = true;
    var needToHandleShowMoreClick = true; //before clicking "load more" at the first time

    if (!this.state.showMoreClickedAtLeastOnce) {
      this.getScrollCss({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: this.state.styles
      });
      var initialGalleryHeight = this.state.container.height; //container.height before clicking "load more" at the first time

      this.setState({
        showMoreClickedAtLeastOnce: showMoreClickedAtLeastOnce,
        initialGalleryHeight: initialGalleryHeight,
        needToHandleShowMoreClick: needToHandleShowMoreClick
      }, function () {
        _this4.handleNewGalleryStructure();
      });
    } else {
      //from second click
      this.setState({
        needToHandleShowMoreClick: needToHandleShowMoreClick
      }, function () {
        _this4.handleNewGalleryStructure();
      });
    }
  };

  _proto.setGotFirstScrollIfNeeded = function setGotFirstScrollIfNeeded() {
    if (!this.state.gotFirstScrollEvent) {
      this.getScrollCss({
        domId: this.props.domId,
        items: this.galleryStructure.galleryItems,
        styleParams: this.state.styles
      });
      this.setState({
        gotFirstScrollEvent: true
      });
    }
  };

  _proto.eventsListener = function eventsListener(eventName, eventData, event) {
    this.videoScrollHelper.handleEvent({
      eventName: eventName,
      eventData: eventData
    });

    if (eventName === constants["a" /* default */].events.HOVER_SET) {
      this.currentHoverChangeEvent.currentHoverIdx = eventData;
      windowWrapper["a" /* default */].dispatchEvent(this.currentHoverChangeEvent);
    }

    if (typeof this.props.eventsListener === 'function') {
      this.props.eventsListener(eventName, eventData, event);
    }
  };

  _proto.getMoreItemsIfNeeded = function getMoreItemsIfNeeded(scrollPos) {
    var _this5 = this;

    if (this.galleryStructure && this.galleryStructure.galleryItems && this.galleryStructure.galleryItems.length > 0 && !this.gettingMoreItems && this.state.items && this.state.styles && this.state.container) {
      //more items can be fetched from the server
      //TODO - add support for horizontal galleries
      var oneRow = this.state.styles.oneRow;
      var galleryEnd = this.galleryStructure[oneRow ? 'width' : 'height'] + (oneRow ? 0 : this.state.container.scrollBase);
      var screenSize = windowWrapper["a" /* default */].screen[oneRow ? 'width' : 'height'];
      var scrollEnd = scrollPos + screenSize;
      var getItemsDistance = scrollPos ? 3 * screenSize : 0; //first scrollPos is 0 falsy. dont load before a scroll happened.

      if (galleryEnd - scrollEnd < getItemsDistance) {
        //only when the last item turns visible we should try getting more items
        this.gettingMoreItems = true;
        this.eventsListener(constants["a" /* default */].events.NEED_MORE_ITEMS, this.state.items.length);
        setTimeout(function () {
          //wait a bit before allowing more items to be fetched - ugly hack before promises still not working
          _this5.gettingMoreItems = false;
        }, 2000);
      }
    }
  };

  _proto.canRender = function canRender() {
    var can = this.props.container && this.props.styles && this.state.items;

    if (!can && utils["a" /* default */].isVerbose()) {
      console.log('PROGALLERY [CAN_RENDER] GalleryContainer', can, this.props.container, this.props.styles, this.state.items);
    }

    return can;
  };

  _proto.render = function render() {
    if (!this.canRender()) {
      return null;
    }

    var ViewComponent = this.props.styles.oneRow ? slideshowView : galleryView;

    if (utils["a" /* default */].isVerbose()) {
      console.count('PROGALLERY [COUNTS] - GalleryContainer (render)');
      console.log('PROGALLERY [RENDER] - GalleryContainer', this.props.container.scrollBase, {
        props: this.props,
        items: this.state.items
      });
    }

    var displayShowMore = this.containerInfiniteGrowthDirection() === 'none';
    var findNeighborItem = this.layouter ? this.layouter.findNeighborItem : function () {};
    return /*#__PURE__*/react_default.a.createElement("div", {
      "data-key": "pro-gallery-inner-container",
      key: "pro-gallery-inner-container"
    }, /*#__PURE__*/react_default.a.createElement(galleryScrollIndicator_ScrollIndicator, {
      domId: this.props.domId,
      oneRow: this.props.styles.oneRow,
      isRTL: this.props.styles.isRTL,
      totalWidth: this.galleryStructure.width,
      scrollBase: this.props.container.scrollBase,
      scrollingElement: this._scrollingElement,
      getMoreItemsIfNeeded: this.getMoreItemsIfNeeded,
      setGotFirstScrollIfNeeded: this.setGotFirstScrollIfNeeded,
      onScroll: this.onGalleryScroll
    }), /*#__PURE__*/react_default.a.createElement(ViewComponent, galleryContainerExtraNew_extends({
      isInDisplay: this.props.isInDisplay,
      scrollingElement: this._scrollingElement,
      totalItemsCount: this.props.totalItemsCount //the items passed in the props might not be all the items
      ,
      renderedItemsCount: this.props.renderedItemsCount,
      items: this.state.items,
      getVisibleItems: this.getVisibleItems,
      itemsLoveData: this.props.itemsLoveData,
      galleryStructure: this.galleryStructure,
      styleParams: this.props.styles,
      container: this.props.container,
      watermark: this.props.watermark,
      settings: this.props.settings,
      scroll: {} //todo: remove after refactor is 100%
      ,
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
      actions: galleryContainerExtraNew_objectSpread(galleryContainerExtraNew_objectSpread({}, this.props.actions), {}, {
        findNeighborItem: findNeighborItem,
        toggleLoadMoreItems: this.toggleLoadMoreItems,
        eventsListener: this.eventsListener,
        setWixHeight: function setWixHeight() {},
        scrollToItem: this.scrollToItem,
        scrollToGroup: this.scrollToGroup
      })
    }, this.props.gallery)), /*#__PURE__*/react_default.a.createElement("div", {
      "data-key": "items-styles",
      key: "items-styles",
      style: {
        display: 'none'
      }
    }, (this.layoutCss || []).filter(Boolean).map(function (css, idx) {
      return /*#__PURE__*/react_default.a.createElement("style", {
        id: "layoutCss-" + idx,
        key: "layoutCss-" + idx,
        dangerouslySetInnerHTML: {
          __html: css
        }
      });
    }), (this.scrollCss || []).filter(Boolean).map(function (css, idx) {
      return /*#__PURE__*/react_default.a.createElement("style", {
        id: "scrollCss_" + idx,
        key: "scrollCss_" + idx,
        dangerouslySetInnerHTML: {
          __html: css
        }
      });
    }), !!this.dynamicStyles && /*#__PURE__*/react_default.a.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: this.dynamicStyles
      }
    })), this.props.useLayoutFixer ? /*#__PURE__*/react_default.a.createElement(layoutFixer_LayoutFixer, {
      parentId: "pro-gallery-inner-container-" + this.props.domId,
      styles: this.state.styles,
      items: this.items
    }) : null);
  };

  return GalleryContainer;
}(react_default.a.Component);
/* harmony default export */ var galleryContainerExtraNew = (galleryContainerExtraNew_GalleryContainer);
// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/proGallery/proBlueprintsGallery.js
function proBlueprintsGallery_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var proBlueprintsGallery_ProBlueprintsGallery = /*#__PURE__*/function (_ProGallery) {
  proBlueprintsGallery_inheritsLoose(ProBlueprintsGallery, _ProGallery);

  function ProBlueprintsGallery() {
    return _ProGallery.apply(this, arguments) || this;
  }

  var _proto = ProBlueprintsGallery.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/react_default.a.createElement("div", this.containerProps(), /*#__PURE__*/react_default.a.createElement(galleryContainerExtraNew, this.renderProps()));
  };

  return ProBlueprintsGallery;
}(proGallery_ProGallery);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/blueprintsIndex.js
function blueprintsIndex_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function blueprintsIndex_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { blueprintsIndex_ownKeys(Object(source), true).forEach(function (key) { blueprintsIndex_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { blueprintsIndex_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function blueprintsIndex_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function blueprintsIndex_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function blueprintsIndex_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var blueprintsIndex_BaseGallery = /*#__PURE__*/function (_React$Component) {
  blueprintsIndex_inheritsLoose(BaseGallery, _React$Component);

  function BaseGallery() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BaseGallery.prototype;

  _proto.render = function render() {
    var domId = this.props.domId || 'default-dom-id';

    var _this$props = this.props,
        styles = _this$props.styles,
        options = _this$props.options,
        styleParams = _this$props.styleParams,
        eventsListener = _this$props.eventsListener,
        otherProps = blueprintsIndex_objectWithoutPropertiesLoose(_this$props, ["styles", "options", "styleParams", "eventsListener"]);

    var _eventsListener = function _eventsListener() {
      return typeof eventsListener === 'function' && eventsListener.apply(void 0, arguments);
    };

    var _styles = blueprintsIndex_objectSpread(blueprintsIndex_objectSpread(blueprintsIndex_objectSpread(blueprintsIndex_objectSpread({}, common_defaultStyles), options), styles), styleParams);

    var galleryProps = blueprintsIndex_objectSpread(blueprintsIndex_objectSpread({}, otherProps), {}, {
      styles: _styles,
      eventsListener: _eventsListener,
      domId: domId
    });

    if (this.props.useBlueprints) {//
    } else {
      dimensionsHelper["a" /* default */].updateParams({
        domId: galleryProps.domId,
        container: galleryProps.container,
        styles: galleryProps.styles
      });
      var _galleryProps$styles = galleryProps.styles,
          galleryType = _galleryProps$styles.galleryType,
          galleryLayout = _galleryProps$styles.galleryLayout;

      if (galleryType === undefined || galleryLayout !== undefined) {
        galleryProps = blueprintsIndex_objectSpread(blueprintsIndex_objectSpread({}, galleryProps), {}, {
          styles: presets_addPresetStyles(galleryProps.styles)
        });
      }
    }

    var GalleryComponent = proBlueprintsGallery_ProBlueprintsGallery;

    if (isEligible(galleryProps)) {
      GalleryComponent = leanGallery_LeanGallery;
    }

    return /*#__PURE__*/react_default.a.createElement(GalleryComponent, galleryProps);
  };

  return BaseGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/blueprints/Blueprints.js
function Blueprints_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Blueprints_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Blueprints_ownKeys(Object(source), true).forEach(function (key) { Blueprints_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Blueprints_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Blueprints_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Blueprints_Blueprints = /*#__PURE__*/function () {
  function Blueprints() {}

  var _proto = Blueprints.prototype;

  _proto.createBlueprint = function createBlueprint(params, lastParams, existingBlueprint, blueprintManagerId, isUsingCustomInfoElements) {
    // cacheBlocker
    // if (this.cache[params]) return this.cache[params];
    var changedParams = {};

    try {
      var newDimensionsParams = params.dimensions,
          newItemsParams = params.items,
          newStylesParams = params.styles;
      var oldDimensionsParams = lastParams.dimensions,
          oldItemsParams = lastParams.items,
          oldStylesParams = lastParams.styles; // getItems,styles and dimesions if not supplied in params;

      var _this$formatItemsIfNe = this.formatItemsIfNeeded(newItemsParams, oldItemsParams),
          formattedItems = _this$formatItemsIfNe.formattedItems,
          itemsChanged = _this$formatItemsIfNe.changed;

      var _this$formatStylesIfN = this.formatStylesIfNeeded(newStylesParams, oldStylesParams, isUsingCustomInfoElements),
          formattedStyles = _this$formatStylesIfN.formattedStyles,
          stylesChanged = _this$formatStylesIfN.changed;

      var _this$formatContainer = this.formatContainerIfNeeded(newDimensionsParams, newStylesParams, oldDimensionsParams, oldStylesParams, {
        formattedStyles: formattedStyles || existingBlueprint.styles
      }),
          formattedContainer = _this$formatContainer.formattedContainer,
          containerChanged = _this$formatContainer.changed;

      var changed = itemsChanged || stylesChanged || containerChanged;
      changedParams = {
        itemsChanged: itemsChanged,
        stylesChanged: stylesChanged,
        containerChanged: containerChanged
      };

      if (changed || !existingBlueprint) {
        if (!existingBlueprint) {
          existingBlueprint = {};
        }

        var structure = this.createStructure({
          formattedContainer: formattedContainer || existingBlueprint.container,
          formattedItems: formattedItems || existingBlueprint.items,
          formattedStyles: formattedStyles || existingBlueprint.styles
        }, changed); // assign changed values w/o replacing the original object;

        if (formattedStyles) {
          existingBlueprint.styles = formattedStyles;
        }

        if (formattedItems) {
          existingBlueprint.items = formattedItems;
        }

        if (formattedContainer) {
          existingBlueprint.container = formattedContainer;
        }

        existingBlueprint.structure = structure; // if its an infinite gallery - let the container loose

        var isInfinite = !existingBlueprint.styles.oneRow && existingBlueprint.styles.enableInfiniteScroll;

        if (isInfinite) {
          existingBlueprint.container.height = existingBlueprint.container.galleryHeight = structure.height;
        }
      }
    } catch (error) {
      console.error('Could not create blueprint, error:', error);
    } // return the existing or the modified existing object


    return {
      blueprint: existingBlueprint,
      changedParams: changedParams
    };
  } // ------------------ Raw data to Formated data (if needed) ---------------------------- //
  ;

  _proto.formatItemsIfNeeded = function formatItemsIfNeeded(items, lastItems) {
    var reason = {
      items: '',
      itemsAdded: ''
    };

    var itemsWereAdded = function itemsWereAdded(newItemsParams, oldItemsParams) {
      if (newItemsParams === oldItemsParams) {
        reason.itemsAdded = 'items are the same object.';
        return false; // it is the exact same object
      }

      if (!newItemsParams) {
        reason.itemsAdded = 'new items do not exist.';
        return false; // new items do not exist (use old items)
      }

      if (!oldItemsParams || oldItemsParams && oldItemsParams.length === 0) {
        reason.itemsAdded = 'old items do not exist.';
        return false; // old items do not exist (it is not items addition)
      }

      if (oldItemsParams.length >= newItemsParams.length) {
        reason.itemsAdded = 'more old items than new items.';
        return false; // more old items than new items
      }

      var idsNotChanged = oldItemsParams.reduce(function (is, _item, idx) {
        // check that all the existing items exist in the new array
        return is && _item.id === newItemsParams[idx].itemId;
      }, true);

      if (!idsNotChanged) {
        reason.itemsAdded = 'items ids were changed. ';
      }

      return idsNotChanged;
    };

    var itemsHaveChanged = function itemsHaveChanged(newItemsParams, oldItemsParams) {
      if (newItemsParams === oldItemsParams) {
        reason.items = 'items are the same object.';
        return false; // it is the exact same object
      }

      if (!newItemsParams) {
        reason.items = 'new items do not exist.';
        return false; // new items do not exist (use old items)
      }

      if (!oldItemsParams || oldItemsParams && oldItemsParams.length === 0) {
        reason.items = 'old items do not exist.';
        return true; // old items do not exist
      }

      if (oldItemsParams.length !== newItemsParams.length) {
        reason.items = 'more new items than old items (or vice versa).';
        return true; // more new items than old items (or vice versa)
      }

      return newItemsParams.reduce(function (is, newItem, idx) {
        // check that all the items are identical
        var existingItem = oldItemsParams[idx];

        try {
          var itemsChanged = is || !newItem || !existingItem || newItem.itemId !== existingItem.itemId || newItem.mediaUrl !== existingItem.mediaUrl || newItem.measured !== existingItem.measured || newItem.metaData && existingItem.metaData && newItem.metaData.type !== existingItem.metaData.type;

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

    var oldItemsParams = lastItems;
    var changed = false;
    var formattedItems;

    if (itemsWereAdded(items, oldItemsParams)) {
      formattedItems = oldItemsParams.concat(items.slice(oldItemsParams.length).map(function (item) {
        return itemsHelper_ItemsHelper.convertDtoToLayoutItem(item);
      }));
      this.gettingMoreItems = false; // probably finished getting more items       //TODO - what is this and how we keep it alive if needed?

      changed = true;
    } else if (itemsHaveChanged(items, oldItemsParams)) {
      formattedItems = items.map(function (item) {
        return Object.assign(itemsHelper_ItemsHelper.convertDtoToLayoutItem(item));
      });
      this.gettingMoreItems = false; // probably finished getting more items

      changed = true;
    }

    return {
      formattedItems: formattedItems,
      changed: changed
    };
  };

  _proto.formatStylesIfNeeded = function formatStylesIfNeeded(styles, lastStyles, isUsingCustomInfoElements) {
    var reason = {
      styles: ''
    };

    var stylesHaveChanged = function stylesHaveChanged(newStylesParams, oldStylesParams) {
      if (!newStylesParams) {
        reason.styles = 'no new styles.';
        return false; // no new styles - use old styles
      }

      if (!oldStylesParams) {
        reason.styles = 'no old styles.';
        return true; // no old styles
      }

      try {
        var oldStylesSorted = {};
        Object.keys(oldStylesParams).sort() // sort by keys alphabetically
        .forEach(function (key) {
          return oldStylesSorted[key] = oldStylesParams[key];
        });
        var newStylesSorted = {};
        Object.keys(newStylesParams).sort() // sort by keys alphabetically
        .forEach(function (key) {
          return newStylesSorted[key] = newStylesParams[key];
        });
        var wasChanged = JSON.stringify(newStylesSorted) !== JSON.stringify(oldStylesSorted);

        if (wasChanged) {
          reason.styles = 'styles were changed.';
        }

        return wasChanged;
      } catch (e) {
        console.error('Could not compare styles', e);
        return false;
      }
    };

    var oldStylesParams = lastStyles;
    var changed = false;
    var formattedStyles;

    if (stylesHaveChanged(styles, oldStylesParams)) {
      styles = Blueprints_objectSpread(Blueprints_objectSpread({}, common_defaultStyles), styles);
      formattedStyles = layoutHelper(presets_addPresetStyles(styles), isUsingCustomInfoElements); // TODO make sure the processLayouts is up to date. delete addLayoutStyles from layoutsHelper when done with it...

      var selectedLayoutVars = ['galleryLayout', 'galleryThumbnailsAlignment', 'magicLayoutSeed', 'cubeType', 'isVertical', 'scrollDirection', 'enableInfiniteScroll'];
      formattedStyles.selectedLayout = selectedLayoutVars.map(function (key) {
        return String(formattedStyles[key]);
      }).join('|');
      formattedStyles.layoutsVersion = 2;
      changed = true;
    }

    return {
      formattedStyles: formattedStyles,
      changed: changed
    };
  };

  _proto.formatContainerIfNeeded = function formatContainerIfNeeded(dimensions, styles, lastDimensions, lastStyles, _ref) {
    var formattedStyles = _ref.formattedStyles;
    var reason = {
      dimensions: ''
    };

    var dimensionsHaveChanged = function dimensionsHaveChanged(_ref2) {
      var newDimensionsParams = _ref2.newDimensionsParams,
          oldDimensionsParams = _ref2.oldDimensionsParams,
          oldStylesParams = _ref2.oldStylesParams;

      if (!oldStylesParams || !oldDimensionsParams) {
        reason.dimensions = 'no old dimensions or styles. ';
        return true; // no old dimensions or styles (style may change dimensions)
      }

      if (!newDimensionsParams) {
        reason.dimensions = 'no new dimensions.';
        return false; // no new continainer
      }

      var dimensionsHaveChanged = {
        height: !oldStylesParams.oneRow && oldStylesParams.enableInfiniteScroll ? false : !!newDimensionsParams.height && newDimensionsParams.height !== oldDimensionsParams.height,
        width: !oldDimensionsParams || !!newDimensionsParams.width && newDimensionsParams.width !== oldDimensionsParams.width,
        scrollBase: !!newDimensionsParams.scrollBase && newDimensionsParams.scrollBase !== oldDimensionsParams.scrollBase
      };
      return Object.keys(dimensionsHaveChanged).reduce(function (is, key) {
        if (dimensionsHaveChanged[key]) {
          reason.dimensions += "dimensions." + key + " has changed. ";
        }

        return is || dimensionsHaveChanged[key];
      }, false);
    };

    var oldDimensionsParams = lastDimensions;
    var changed = false;
    var oldStylesParams = lastStyles;
    var formattedContainer;

    if (dimensionsHaveChanged({
      newDimensionsParams: dimensions,
      oldDimensionsParams: oldDimensionsParams,
      oldStylesParams: oldStylesParams
    })) {
      dimensionsHelper["a" /* default */].updateParams({
        styles: formattedStyles,
        container: dimensions
      });
      changed = true;
      formattedContainer = Object.assign({}, dimensions, dimensionsHelper["a" /* default */].getGalleryDimensions());
    }

    return {
      formattedContainer: formattedContainer,
      changed: changed
    };
  };

  _proto.createStructure = function createStructure(_ref3) {
    var formattedContainer = _ref3.formattedContainer,
        formattedStyles = _ref3.formattedStyles,
        formattedItems = _ref3.formattedItems;
    var layoutParams = {
      items: formattedItems,
      container: formattedContainer,
      styleParams: formattedStyles,
      options: {
        showAllItems: true,
        skipVisibilitiesCalc: true,
        useLayoutStore: false
      }
    }; // if (this.layouter && addingItems) {
    //   layoutParams.options.useExistingLayout = true;
    // } else {

    layoutParams.options.createLayoutOnInit = false; // TODO - what does this do?

    this.layouter = new layouter_Layouter(layoutParams); // TODO - no need for "this."
    // }

    return this.layouter.createLayout(layoutParams);
  };

  return Blueprints;
}();

var blueprints = new Blueprints_Blueprints();
/* harmony default export */ var blueprints_Blueprints = (blueprints);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/core/blueprints/BlueprintsManager.js


function BlueprintsManager_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function BlueprintsManager_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { BlueprintsManager_ownKeys(Object(source), true).forEach(function (key) { BlueprintsManager_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { BlueprintsManager_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function BlueprintsManager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function BlueprintsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function BlueprintsManager_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { BlueprintsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { BlueprintsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var BlueprintsManager_BlueprintsManager = /*#__PURE__*/function () {
  function BlueprintsManager(_ref) {
    var id = _ref.id;
    // this.eventsCB = config && config.eventsCB;
    this.id = id + "'s blueprintsManager";
    this.currentState = {};
    this.existingBlueprint = {};
    this.cache = {};
    this.api = {};
    this.currentState.totalItemsCount = Infinity;

    this.onBlueprintReady = function () {};

    this.loopingItems = false;
  }

  var _proto = BlueprintsManager.prototype;

  _proto.init = function init(config) {
    this.api = config.api;
    this.currentState.totalItemsCount = config && config.totalItemsCount || this.currentState.totalItemsCount;
    viewModeWrapper["g" /* viewModeWrapper */].setFormFactor(config.formFactor);
  };

  _proto.createBlueprint = /*#__PURE__*/function () {
    var _createBlueprint = BlueprintsManager_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee(params) {
      var _blueprints$createBlu, blueprint, changedParams, blueprintChanged;

      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (params === void 0) {
                params = {};
              }

              this.currentState.totalItemsCount = params.totalItemsCount || this.api.getTotalItemsCount && this.api.getTotalItemsCount() || this.currentState.totalItemsCount;
              this.currentState.isUsingCustomInfoElements = params.isUsingCustomInfoElements || this.api.isUsingCustomInfoElements && this.api.isUsingCustomInfoElements() || this.currentState.isUsingCustomInfoElements;
              _context.t0 = BlueprintsManager_objectSpread;
              _context.t1 = BlueprintsManager_objectSpread({}, params);
              _context.next = 7;
              return this.completeParams(params);

            case 7:
              _context.t2 = _context.sent;
              params = (0, _context.t0)(_context.t1, _context.t2);
              _blueprints$createBlu = blueprints_Blueprints.createBlueprint(params, this.currentState, this.existingBlueprint, this.id, this.currentState.isUsingCustomInfoElements), blueprint = _blueprints$createBlu.blueprint, changedParams = _blueprints$createBlu.changedParams;
              blueprintChanged = Object.values(changedParams).some(function (changedParam) {
                return !!changedParam;
              });
              this.updateLastParamsIfNeeded(params, changedParams);
              this.api.onBlueprintReady && this.api.onBlueprintReady({
                blueprint: blueprint,
                blueprintChanged: blueprintChanged
              });
              return _context.abrupt("return", this.cache[params] = this.existingBlueprint = blueprint);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createBlueprint(_x) {
      return _createBlueprint.apply(this, arguments);
    }

    return createBlueprint;
  }();

  _proto.getMoreItems = /*#__PURE__*/function () {
    var _getMoreItems = BlueprintsManager_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee2(currentItemLength) {
      var items;
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(currentItemLength < this.currentState.totalItemsCount)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 3;
              return this.api.fetchMoreItems(currentItemLength);

            case 3:
              items = _context2.sent;

              if (items) {
                this.createBlueprint({
                  items: items
                }); // work with the new items...
              }

              _context2.next = 8;
              break;

            case 7:
              if (this.existingBlueprint.styles.slideshowLoop) {
                this.duplicateGalleryItems();
              }

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getMoreItems(_x2) {
      return _getMoreItems.apply(this, arguments);
    }

    return getMoreItems;
  }();

  _proto.resetItemLooping = function resetItemLooping() {
    this.loopingItems = false;
  };

  _proto.duplicateGalleryItems = function duplicateGalleryItems() {
    var _this$currentState$it;

    var items = (_this$currentState$it = this.currentState.items).concat.apply(_this$currentState$it, this.currentState.items.slice(0, this.currentState.totalItemsCount));

    this.loopingItems = true;
    this.createBlueprint({
      items: items
    });
  } // ------------------ Get all the needed raw data ---------------------------- //
  ;

  _proto.completeParams =
  /*#__PURE__*/
  function () {
    var _completeParams = BlueprintsManager_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee3(params) {
      var _ref2, dimensions, container, items, styles, styleParams, options, domId;

      return regenerator_default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ref2 = params || {}, dimensions = _ref2.dimensions, container = _ref2.container, items = _ref2.items, styles = _ref2.styles, styleParams = _ref2.styleParams, options = _ref2.options, domId = _ref2.domId;
              styles = BlueprintsManager_objectSpread(BlueprintsManager_objectSpread(BlueprintsManager_objectSpread({}, options), styles), styleParams);
              dimensions = BlueprintsManager_objectSpread(BlueprintsManager_objectSpread({}, dimensions), container);
              _context3.next = 5;
              return this.fetchDimensionsIfNeeded(dimensions);

            case 5:
              dimensions = _context3.sent;
              _context3.next = 8;
              return this.fetchItemsIfNeeded(items);

            case 8:
              items = _context3.sent;
              _context3.next = 11;
              return this.fetchStylesIfNeeded(styles);

            case 11:
              styles = _context3.sent;
              return _context3.abrupt("return", {
                dimensions: dimensions,
                items: items,
                styles: styles,
                domId: domId
              });

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function completeParams(_x3) {
      return _completeParams.apply(this, arguments);
    }

    return completeParams;
  }();

  _proto.fetchDimensionsIfNeeded = /*#__PURE__*/function () {
    var _fetchDimensionsIfNeeded = BlueprintsManager_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee4(dimensions) {
      var shouldFetchDimensions;
      return regenerator_default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              shouldFetchDimensions = function shouldFetchDimensions(_dimensions) {
                var should = true;

                if (_dimensions && Object.keys(_dimensions).length > 0) {
                  should = false;
                }

                return should;
              };

              if (!shouldFetchDimensions(dimensions)) {
                _context4.next = 11;
                break;
              }

              _context4.t1 = this.api.fetchDimensions;

              if (!_context4.t1) {
                _context4.next = 7;
                break;
              }

              _context4.next = 6;
              return this.api.fetchDimensions();

            case 6:
              _context4.t1 = _context4.sent;

            case 7:
              _context4.t0 = _context4.t1;

              if (_context4.t0) {
                _context4.next = 10;
                break;
              }

              _context4.t0 = this.currentState.dimensions;

            case 10:
              dimensions = _context4.t0;

            case 11:
              return _context4.abrupt("return", dimensions);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function fetchDimensionsIfNeeded(_x4) {
      return _fetchDimensionsIfNeeded.apply(this, arguments);
    }

    return fetchDimensionsIfNeeded;
  }();

  _proto.fetchItemsIfNeeded = /*#__PURE__*/function () {
    var _fetchItemsIfNeeded = BlueprintsManager_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee5(items) {
      var shouldFetchItems;
      return regenerator_default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              shouldFetchItems = function shouldFetchItems(_items) {
                var should = true;

                if (_items && _items.length > 0) {
                  should = false;
                }

                return should;
              };

              if (!shouldFetchItems(items)) {
                _context5.next = 11;
                break;
              }

              _context5.t1 = !this.loopingItems && this.api.fetchItems;

              if (!_context5.t1) {
                _context5.next = 7;
                break;
              }

              _context5.next = 6;
              return this.api.fetchItems();

            case 6:
              _context5.t1 = _context5.sent;

            case 7:
              _context5.t0 = _context5.t1;

              if (_context5.t0) {
                _context5.next = 10;
                break;
              }

              _context5.t0 = this.currentState.items;

            case 10:
              items = _context5.t0;

            case 11:
              return _context5.abrupt("return", items);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function fetchItemsIfNeeded(_x5) {
      return _fetchItemsIfNeeded.apply(this, arguments);
    }

    return fetchItemsIfNeeded;
  }();

  _proto.fetchStylesIfNeeded = /*#__PURE__*/function () {
    var _fetchStylesIfNeeded = BlueprintsManager_asyncToGenerator( /*#__PURE__*/regenerator_default.a.mark(function _callee6(styles) {
      var shouldFetchStyles;
      return regenerator_default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              shouldFetchStyles = function shouldFetchStyles(_styles) {
                var should = true;

                if (_styles && Object.keys(_styles).length > 0) {
                  // TODO - should check if they are ready styles and use ClientLib if not?
                  should = false;
                }

                return should;
              };

              if (!shouldFetchStyles(styles)) {
                _context6.next = 11;
                break;
              }

              _context6.t1 = this.api.fetchStyles;

              if (!_context6.t1) {
                _context6.next = 7;
                break;
              }

              _context6.next = 6;
              return this.api.fetchStyles();

            case 6:
              _context6.t1 = _context6.sent;

            case 7:
              _context6.t0 = _context6.t1;

              if (_context6.t0) {
                _context6.next = 10;
                break;
              }

              _context6.t0 = this.currentState.styles;

            case 10:
              styles = _context6.t0;

            case 11:
              return _context6.abrupt("return", styles);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function fetchStylesIfNeeded(_x6) {
      return _fetchStylesIfNeeded.apply(this, arguments);
    }

    return fetchStylesIfNeeded;
  }();

  _proto.updateLastParamsIfNeeded = function updateLastParamsIfNeeded(_ref3, changedParams) {
    var items = _ref3.items,
        dimensions = _ref3.dimensions,
        styles = _ref3.styles;
    this.currentState.items = changedParams.itemsChanged ? items : this.currentState.items;
    this.currentState.dimensions = changedParams.containerChanged ? BlueprintsManager_objectSpread({}, dimensions) : this.currentState.dimensions;
    this.currentState.styles = changedParams.stylesChanged ? BlueprintsManager_objectSpread({}, styles) : this.currentState.styles;
  };

  _proto.eventsListenerWrapper = function eventsListenerWrapper(eventsListenerFunc, originalArgs) {
    var eventHandledInternaly = this.internalEventHandler.apply(this, originalArgs);
    !eventHandledInternaly && eventsListenerFunc.apply(void 0, originalArgs);
  };

  _proto.needMoreItems = function needMoreItems(currentItemLength) {
    this.getMoreItems(currentItemLength);
  };

  return BlueprintsManager;
}();


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/components/gallery/layoutingIndex.js
function layoutingIndex_extends() { layoutingIndex_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return layoutingIndex_extends.apply(this, arguments); }

function layoutingIndex_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function layoutingIndex_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { layoutingIndex_ownKeys(Object(source), true).forEach(function (key) { layoutingIndex_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { layoutingIndex_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function layoutingIndex_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function layoutingIndex_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function layoutingIndex_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var blueprintsManager = new BlueprintsManager_BlueprintsManager({
  id: 'layoutingGallery'
});

var layoutingIndex_BaseGallery = /*#__PURE__*/function (_React$Component) {
  layoutingIndex_inheritsLoose(BaseGallery, _React$Component);

  function BaseGallery(props) {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {};
    blueprintsManager.init({
      api: {
        isUsingCustomInfoElements: function isUsingCustomInfoElements() {
          return props.customHoverRenderer || props.customInfoRenderer || props.customSlideshowInfoRenderer;
        }
      }
    });

    _this.onNewProps(props);

    return _this;
  }

  var _proto = BaseGallery.prototype;

  _proto.onNewProps = function onNewProps(props) {
    var _this2 = this;

    var domId = props.domId || 'default-dom-id';

    var styles = props.styles,
        options = props.options,
        styleParams = props.styleParams,
        eventsListener = props.eventsListener,
        otherProps = layoutingIndex_objectWithoutPropertiesLoose(props, ["styles", "options", "styleParams", "eventsListener"]);

    var _eventsListener = function _eventsListener() {
      return typeof eventsListener === 'function' && eventsListener.apply(void 0, arguments);
    };

    var _styles = layoutingIndex_objectSpread(layoutingIndex_objectSpread(layoutingIndex_objectSpread(layoutingIndex_objectSpread({}, common_defaultStyles), options), styles), styleParams);

    var galleryProps = layoutingIndex_objectSpread(layoutingIndex_objectSpread({}, otherProps), {}, {
      styles: _styles,
      eventsListener: _eventsListener,
      domId: domId
    });

    if (!isEligible(galleryProps)) {
      blueprintsManager.createBlueprint(galleryProps).then(function (blueprint) {
        _this2.setState({
          blueprint: blueprint
        });
      });
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    this.onNewProps(newProps);
  };

  _proto.render = function render() {
    var domId = this.props.domId || 'default-dom-id';

    var _this$props = this.props,
        styles = _this$props.styles,
        options = _this$props.options,
        styleParams = _this$props.styleParams,
        eventsListener = _this$props.eventsListener,
        otherProps = layoutingIndex_objectWithoutPropertiesLoose(_this$props, ["styles", "options", "styleParams", "eventsListener"]);

    var _eventsListener = function _eventsListener() {
      return typeof eventsListener === 'function' && eventsListener.apply(void 0, arguments);
    };

    var _styles = layoutingIndex_objectSpread(layoutingIndex_objectSpread(layoutingIndex_objectSpread(layoutingIndex_objectSpread({}, common_defaultStyles), options), styles), styleParams);

    var galleryProps = layoutingIndex_objectSpread(layoutingIndex_objectSpread({}, otherProps), {}, {
      styles: _styles,
      eventsListener: _eventsListener,
      domId: domId
    });

    var GalleryComponent = proBlueprintsGallery_ProBlueprintsGallery;
    var blueprint = {};

    if (isEligible(galleryProps)) {
      GalleryComponent = leanGallery_LeanGallery;
    } else {
      if (!this.state.blueprint) {
        return null;
      }

      blueprint = this.state.blueprint;
    }

    return /*#__PURE__*/react_default.a.createElement(GalleryComponent, layoutingIndex_extends({}, galleryProps, blueprint));
  };

  return BaseGallery;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/pro-gallery/dist/es/src/index.js












/***/ }),

/***/ 979:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/arrowsPosition.js
var ARROWS_POSITION = {
  ON_GALLERY: 0,
  OUTSIDE_GALLERY: 1
};
/* harmony default export */ var arrowsPosition = (ARROWS_POSITION);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/cubeType.js
var IMAGE_RESIZE = {
  CROP: 'fill',
  FIT: 'fit',
  MIN: 'min',
  MAX: 'max'
};
/* harmony default export */ var cubeType = (IMAGE_RESIZE);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/dimensions.js
var DIMENSIONS = {
  SIDE_BAR_WIDTH: 430,
  STORE_SIDE_BAR_WIDTH: 560,
  MOBILE_PADDING: 120,
  NO_PADDING: 0
};
/* harmony default export */ var dimensions = (DIMENSIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/events.js
var EVENTS = {
  APP_LOADED: 'APP_LOADED',
  ITEM_CREATED: 'ITEM_CREATED',
  ITEM_LOADED: 'ITEM_LOADED',
  GALLERY_CHANGE: 'GALLERY_CHANGE',
  ITEM_ACTION_TRIGGERED: 'ITEM_ACTION_TRIGGERED',
  CURRENT_ITEM_CHANGED: 'CURRENT_ITEM_CHANGED',
  NEED_MORE_ITEMS: 'NEED_MORE_ITEMS',
  VIDEO_ENDED: 'VIDEO_ENDED',
  VIDEO_ERROR: 'VIDEO_ERROR',
  VIDEO_PLAYED: 'VIDEO_PLAYED',
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
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/expandAnimations.js
var EXPAND_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  EXPAND: 'EXPAND',
  FADE_IN: 'FADE_IN',
  ZOOM: 'ZOOM'
};
/* harmony default export */ var expandAnimations = (EXPAND_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/expandInfoPositions.js
var EXPAND_INFO_POSITIONS = {
  SIDE: 'SIDE',
  BOTTOM: 'BOTTOM'
};
/* harmony default export */ var expandInfoPositions = (EXPAND_INFO_POSITIONS);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/formFactor.js
var formFactor = __webpack_require__(903);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/gallerySizeType.js
var gallerySizeType = __webpack_require__(904);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/galleryTextAlign.js
var GALLERY_TEXT_ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};
/* harmony default export */ var galleryTextAlign = (GALLERY_TEXT_ALIGN);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/gridStyle.js
var GRID_STYLE = {
  FIT_TO_SCREEN: 0,
  SET_ITEMS_PER_ROW: 1
};
/* harmony default export */ var gridStyle = (GRID_STYLE);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/groupTypes.js
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
/* harmony default export */ var groupTypes = (GROUP_TYPES);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/imageHoverAnimations.js
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
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/infoBehaviourOnHover.js
var infoBehaviourOnHover = __webpack_require__(768);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/infoType.js
var infoType = __webpack_require__(905);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/isVertical.js
var IS_VERTICAL = {
  COLUMNS: true,
  ROWS: false
};
/* harmony default export */ var isVertical = (IS_VERTICAL);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/itemClick.js
var ITEM_CLICK = {
  EXPAND: 'expand',
  LINK: 'link',
  NOTHING: 'nothing',
  FULLSCREEN: 'fullscreen'
};
/* harmony default export */ var itemClick = (ITEM_CLICK);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/layout.js
var layout = __webpack_require__(688);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/layoutDirection.js
var LAYOUT_DIRECTION = {
  LEFT_TO_RIGHT: false,
  RIGHT_TO_LEFT: true
};
/* harmony default export */ var layoutDirection = (LAYOUT_DIRECTION);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/loadingMode.js
var loadingMode = __webpack_require__(906);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/loadingWithColorMode.js
var loadingWithColorMode = __webpack_require__(907);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/loadMoreAmount.js
var LOAD_MORE_AMOUNT = {
  PARTIAL: 'partial',
  ALL: 'all'
};
/* harmony default export */ var loadMoreAmount = (LOAD_MORE_AMOUNT);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/mobileSwipeAnimations.js
var MOBILE_SWIPE_ANIMATIONS = {
  EXPAND: 'EXPAND',
  FADE: 'FADE',
  CAROUSEL: 'CAROUSEL',
  CROSSFADE: 'CROSSFADE'
};
/* harmony default export */ var mobileSwipeAnimations = (MOBILE_SWIPE_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/overlayAnimations.js
var OVERLAY_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  FADE_IN: 'FADE_IN',
  EXPAND: 'EXPAND',
  SLIDE_UP: 'SLIDE_UP',
  SLIDE_RIGHT: 'SLIDE_RIGHT'
};
/* harmony default export */ var overlayAnimations = (OVERLAY_ANIMATIONS);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/placements.js
var placements = __webpack_require__(714);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/resizeMethods.js
var resizeMethods = __webpack_require__(908);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/scrollAnimations.js
var scrollAnimations = __webpack_require__(909);

// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/scrollDirection.js
var scrollDirection = __webpack_require__(692);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/socialNetworks.js
var SOCIAL_NETWORKS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  PINTEREST: 'pinterest',
  EMAIL: 'email',
  TUMBLR: 'tumblr'
};
/* harmony default export */ var socialNetworks = (SOCIAL_NETWORKS);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/textBoxWidthCalculationOptions.js
var textBoxWidthCalculationOptions = __webpack_require__(910);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/thumbnailsAlignment.js
var THUMBNAILS_ALIGNMENT = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP: 'top',
  RIGHT: 'right'
};
/* harmony default export */ var thumbnailsAlignment = (THUMBNAILS_ALIGNMENT);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/urlTypes.js
var urlTypes = __webpack_require__(911);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/videoPlay.js
var VIDEO_PLAY = {
  HOVER: 'hover',
  AUTO: 'auto',
  ON_CLICK: 'onClick'
};
/* harmony default export */ var videoPlay = (VIDEO_PLAY);
// EXTERNAL MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/viewMode.js
var viewMode = __webpack_require__(912);

// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/watermarkDock.js
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
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/imagePlacementAnimations.js
var IMAGE_PLACEMENT_ANIMATIONS = {
  NO_EFFECT: 'NO_EFFECT',
  SLIDE: 'SLIDE'
};
/* harmony default export */ var imagePlacementAnimations = (IMAGE_PLACEMENT_ANIMATIONS);
// CONCATENATED MODULE: ./node_modules/pro-gallery-lib/dist/es/src/common/constants/index.js



































/* harmony default export */ var constants = __webpack_exports__["a"] = ({
  arrowsPosition: arrowsPosition,
  cubeType: cubeType,
  dimensions: dimensions,
  events: events,
  expandAnimations: expandAnimations,
  expandInfoPositions: expandInfoPositions,
  formFactor: formFactor["a" /* default */],
  gallerySizeType: gallerySizeType["a" /* default */],
  galleryTextAlign: galleryTextAlign,
  gridStyle: gridStyle,
  groupTypes: groupTypes,
  imageHoverAnimations: imageHoverAnimations,
  infoBehaviourOnHover: infoBehaviourOnHover["a" /* default */],
  infoType: infoType["a" /* default */],
  isVertical: isVertical,
  itemClick: itemClick,
  layout: layout["a" /* default */],
  layoutDirection: layoutDirection,
  loadingMode: loadingMode["a" /* default */],
  loadingWithColorMode: loadingWithColorMode["a" /* default */],
  loadMoreAmount: loadMoreAmount,
  mobileSwipeAnimations: mobileSwipeAnimations,
  overlayAnimations: overlayAnimations,
  placements: placements["a" /* default */],
  hasAbovePlacement: placements["b" /* hasAbovePlacement */],
  hasBelowPlacement: placements["c" /* hasBelowPlacement */],
  hasHoverPlacement: placements["e" /* hasHoverPlacement */],
  hasRightPlacement: placements["g" /* hasRightPlacement */],
  hasLeftPlacement: placements["f" /* hasLeftPlacement */],
  hasVerticalPlacement: placements["h" /* hasVerticalPlacement */],
  hasHorizontalPlacement: placements["d" /* hasHorizontalPlacement */],
  isAbovePlacement: placements["i" /* isAbovePlacement */],
  isBelowPlacement: placements["j" /* isBelowPlacement */],
  isHoverPlacement: placements["l" /* isHoverPlacement */],
  isRightPlacement: placements["n" /* isRightPlacement */],
  isLeftPlacement: placements["m" /* isLeftPlacement */],
  isVerticalPlacement: placements["o" /* isVerticalPlacement */],
  isHorizontalPlacement: placements["k" /* isHorizontalPlacement */],
  resizeMethods: resizeMethods["a" /* default */],
  scrollAnimations: scrollAnimations["a" /* default */],
  scrollDirection: scrollDirection["a" /* default */],
  socialNetworks: socialNetworks,
  textBoxWidthCalculationOptions: textBoxWidthCalculationOptions["a" /* default */],
  thumbnailsAlignment: thumbnailsAlignment,
  urlSizes: urlTypes["a" /* URL_SIZES */],
  urlTypes: urlTypes["b" /* URL_TYPES */],
  videoPlay: videoPlay,
  viewMode: viewMode["a" /* default */],
  watermarkDock: watermarkDock,
  imagePlacementAnimations: imagePlacementAnimations
});

/***/ })

};;