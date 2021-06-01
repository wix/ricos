exports.ids = [12];
exports.modules = {

/***/ 1208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)},__assign=function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};function addTextSelectionListener(container,callback){var handleSelection=function(){var selectedText,position,selection=document.getSelection(),selectionAnchor=null==selection?void 0:selection.anchorNode,selectionFocus=null==selection?void 0:selection.focusNode;selection&&selection.rangeCount>0&&!selection.isCollapsed&&container.contains(selectionAnchor)&&container.contains(selectionFocus)&&(selectedText=function(selection){return selection.toString().replace(/(\r\n|\r|\n){2,}/g," ")}(selection),position=function(selection){var rects=function(selection){var range=selection.getRangeAt(0),innerRects=function(range){for(var _iterator=document.createNodeIterator(range.commonAncestorContainer,NodeFilter.SHOW_ALL),innerSelectionNodes=[];_iterator.nextNode()&&_iterator.referenceNode!==range.startContainer;);for(;_iterator.nextNode()&&_iterator.referenceNode!==range.endContainer;)_iterator.referenceNode.nodeType===Node.TEXT_NODE&&innerSelectionNodes.push(_iterator.referenceNode);return innerSelectionNodes}(range).map((function(n){var r=document.createRange();return r.selectNodeContents(n),r.getBoundingClientRect()})),clientRects=range.getClientRects();return function(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;var r=Array(s),k=0;for(i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r}([clientRects[0]],innerRects,[clientRects[clientRects.length-1]])}(selection),left=999999,right=0;rects.forEach((function(rect){left=Math.min(left,rect.left),right=Math.max(right,rect.right)}));var y=rects[0].top+window.scrollY;return{x:(left+right)/2+window.scrollX,y:y}}(selection)),callback(selectedText,position)};return document.addEventListener("selectionchange",handleSelection),function(){return document.removeEventListener("selectionchange",handleSelection)}}var TextSelectionToolbar=function(_super){function TextSelectionToolbar(props){var _this=_super.call(this,props)||this;return _this.addTextSelectionListener=function(container){container&&!_this.removeTextSelectionListener&&(_this.removeTextSelectionListener=addTextSelectionListener(container,_this.setSelectedText))},_this.setSelectedText=Object(lodash__WEBPACK_IMPORTED_MODULE_1__["debounce"])((function(selectedText,selectedTextPosition){return _this.setState({selectedText:selectedText,selectedTextPosition:selectedTextPosition})}),50),_this.state={selectedText:""},_this}return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}(TextSelectionToolbar,_super),TextSelectionToolbar.prototype.componentDidMount=function(){this.addTextSelectionListener(this.props.container)},TextSelectionToolbar.prototype.componentWillUnmount=function(){this.removeTextSelectionListener()},TextSelectionToolbar.prototype.componentWillReceiveProps=function(nextPros){this.addTextSelectionListener(nextPros.container)},TextSelectionToolbar.prototype.render=function(){var _a=this.state,selectedText=_a.selectedText,selectedTextPosition=_a.selectedTextPosition,_b=this.props,container=_b.container,children=_b.children;if(!selectedText||!selectedTextPosition)return null;var left=container.getBoundingClientRect().left,containerOffset=this.props.container.getBoundingClientRect().top,style={top:selectedTextPosition.y-containerOffset-5-window.scrollY,left:selectedTextPosition.x-left};return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:"_1Knj6",style:style},children(selectedText))},TextSelectionToolbar}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component),twitter=function(props){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg",__assign({xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20"},props),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M17.653 4.268c.854-.52 1.493-1.336 1.8-2.297-.804.483-1.683.825-2.6 1.01-1.153-1.245-2.939-1.65-4.506-1.023-1.566.627-2.597 2.16-2.6 3.867.001.318.037.636.106.946-3.298-.168-6.37-1.748-8.453-4.346-.37.633-.563 1.355-.56 2.09-.117 1.34.452 2.647 1.507 3.463C1.608 7.87.88 7.696.173 7.458v.052c.142 2.038 1.63 3.717 3.614 4.077-.298.098-.608.147-.92.146-.233.001-.466-.024-.694-.074.55 1.699 2.103 2.858 3.867 2.888-1.446 1.158-3.237 1.786-5.08 1.78-.32 0-.641-.02-.96-.058 3.593 2.332 8.156 2.492 11.9.417 3.744-2.076 6.073-6.056 6.073-10.381 0-.18-.013-.36-.013-.54.801-.588 1.492-1.316 2.04-2.15-.745.336-1.536.556-2.347.653z"}))},TwitterButton=function(_a){var selectedText=_a.selectedText,onClick=_a.onClick;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{"data-hook":"twitter-button",className:"_20uN3",onClick:function(){return function(selectedText){null==onClick||onClick(selectedText),function(selectedText){var text="“"+selectedText+"“—",url=window.location.href;text.length+url.length>279&&(text=function(text,maxTextLength){var content=text.substring(0,maxTextLength-2);return(content=content.slice(0,content.lastIndexOf(" ")))+"…“—"}(text,279-url.length));var TWEET_ON_TWITTER_URL="https://twitter.com/intent/tweet?text="+encodeURI(text)+"&url="+encodeURI(url);window.open(TWEET_ON_TWITTER_URL)}(selectedText)}(selectedText)}},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(twitter,null))};/* harmony default export */ __webpack_exports__["default"] = (function(_a){var onButtonClick=_a.onButtonClick,container=_a.container;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextSelectionToolbar,{container:container},(function(selectedText){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TwitterButton,{selectedText:selectedText,onClick:function(selectedText){return null==onButtonClick?void 0:onButtonClick("TWITTER","Click",selectedText)}})}))});
//# sourceMappingURL=TextSelectionToolbar-b32dcef3.js.map


/***/ })

};;