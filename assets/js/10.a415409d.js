exports.ids = [10];
exports.modules = {

/***/ 1165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_a7175146_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85);
/* harmony import */ var wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(110);
/* harmony import */ var wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _wix_draft_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _wix_draft_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wix_draft_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ricos_content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var wix_rich_content_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var wix_rich_content_editor_common_libs_EditorEventsContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(95);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(216);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_10__);
var EditorModal=function(_super){function EditorModal(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.updateAriaHiddenId=function(ariaHiddenId){return react_modal__WEBPACK_IMPORTED_MODULE_10___default.a.setAppElement(ariaHiddenId||"body")},_this.parentSelector=function(){var target=_this.props.target,element=document.body;return target&&(element=document.getElementById(target)),element||document.body},_this}return Object(_index_a7175146_js__WEBPACK_IMPORTED_MODULE_2__[/* _ */ "b"])(EditorModal,_super),EditorModal.prototype.componentDidMount=function(){this.updateAriaHiddenId(this.props.ariaHiddenId)},EditorModal.prototype.componentWillReceiveProps=function(newProps){newProps.ariaHiddenId!==this.props.ariaHiddenId&&this.updateAriaHiddenId(newProps.ariaHiddenId)},EditorModal.prototype.render=function(){var _a=this.props,isOpen=_a.isOpen,contentLabel=_a.contentLabel,style=_a.style,role=_a.role,onRequestClose=_a.onRequestClose,ModalsMap=_a.ModalsMap,locale=_a.locale,modalProps=Object(_index_a7175146_js__WEBPACK_IMPORTED_MODULE_2__["c"])(_a,["isOpen","contentLabel","style","role","onRequestClose","ModalsMap","locale"]);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_modal__WEBPACK_IMPORTED_MODULE_10___default.a,{isOpen:isOpen,contentLabel:contentLabel,style:style,role:role,parentSelector:this.parentSelector,onRequestClose:onRequestClose},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_3__[/* RichContentEditorModal */ "c"],Object(_index_a7175146_js__WEBPACK_IMPORTED_MODULE_2__["d"])({modalsMap:ModalsMap,locale:locale},modalProps)))},EditorModal}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (EditorModal);
//# sourceMappingURL=EditorModal-5dbb8f1b.js.map


/***/ })

};;