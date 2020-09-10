exports.ids = [9];
exports.modules = {

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resetIdCounter", function() { return /* binding */ resetIdCounter; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __webpack_require__(164);

// CONCATENATED MODULE: ./node_modules/compute-scroll-into-view/dist/index.module.js
function t(t){return null!=t&&"object"==typeof t&&1===t.nodeType}function e(t,e){return(!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return!1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}/* harmony default export */ var index_module = (function(e,i){var o=window,l=i.scrollMode,d=i.block,u=i.inline,h=i.boundary,a=i.skipOverflowHiddenElements,c="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=e;t(p)&&c(p);){if((p=p.parentNode)===f){s.push(p);break}p===document.body&&n(p)&&!n(document.documentElement)||n(p,a)&&s.push(p)}for(var g=o.visualViewport?o.visualViewport.width:innerWidth,m=o.visualViewport?o.visualViewport.height:innerHeight,w=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,W=e.getBoundingClientRect(),b=W.height,H=W.width,y=W.top,M=W.right,E=W.bottom,V=W.left,x="start"===d||"nearest"===d?y:"end"===d?E:y+b/2,I="center"===u?V+H/2:"end"===u?M:V,C=[],T=0;T<s.length;T++){var k=s[T],B=k.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,L=B.left;if("if-needed"===l&&y>=0&&V>=0&&E<=m&&M<=g&&y>=R&&E<=Y&&V>=L&&M<=X)return C;var S=getComputedStyle(k),j=parseInt(S.borderLeftWidth,10),N=parseInt(S.borderTopWidth,10),q=parseInt(S.borderRightWidth,10),z=parseInt(S.borderBottomWidth,10),A=0,F=0,G="offsetWidth"in k?k.offsetWidth-k.clientWidth-j-q:0,J="offsetHeight"in k?k.offsetHeight-k.clientHeight-N-z:0;if(f===k)A="start"===d?x:"end"===d?x-m:"nearest"===d?r(v,v+m,m,N,z,v+x,v+x+b,b):x-m/2,F="start"===u?I:"center"===u?I-g/2:"end"===u?I-g:r(w,w+g,g,j,q,w+I,w+I+H,H),A=Math.max(0,A+v),F=Math.max(0,F+w);else{A="start"===d?x-R-N:"end"===d?x-Y+z+J:"nearest"===d?r(R,Y,D,N,z+J,x,x+b,b):x-(R+D/2)+J/2,F="start"===u?I-L-j:"center"===u?I-(L+O/2)+G/2:"end"===u?I-X+q+G:r(L,X,O,j,q+G,I,I+H,H);var K=k.scrollLeft,P=k.scrollTop;x+=P-(A=Math.max(0,Math.min(P+A,k.scrollHeight-D+J))),I+=K-(F=Math.max(0,Math.min(K+F,k.scrollWidth-O+G)))}C.push({el:k,top:A,left:F})}return C});
//# sourceMappingURL=index.module.js.map

// CONCATENATED MODULE: ./node_modules/downshift/dist/downshift.esm.js









// istanbul ignore next
var statusDiv = typeof document === 'undefined' ? null : document.getElementById('a11y-status-message');
var cleanupTimerID;
/**
 * @param {String} status the status message
 */

function setStatus(status) {
  var div = getStatusDiv();

  if (!status) {
    return;
  }

  if (cleanupTimerID) {
    clearTimeout(cleanupTimerID);
    cleanupTimerID = null;
  }

  div.textContent = status;
  cleanupTimerID = setTimeout(function () {
    div.textContent = '';
    cleanupTimerID = null;
  }, 500);
}
/**
 * Get the status node or create it if it does not already exist
 * @return {HTMLElement} the status node
 */


function getStatusDiv() {
  if (statusDiv) {
    return statusDiv;
  }

  statusDiv = document.createElement('div');
  statusDiv.setAttribute('id', 'a11y-status-message');
  statusDiv.setAttribute('role', 'status');
  statusDiv.setAttribute('aria-live', 'polite');
  statusDiv.setAttribute('aria-relevant', 'additions text');
  Object.assign(statusDiv.style, {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px'
  });
  document.body.appendChild(statusDiv);
  return statusDiv;
}

var unknown =  false ? undefined : 0;
var mouseUp =  false ? undefined : 1;
var itemMouseEnter =  false ? undefined : 2;
var keyDownArrowUp =  false ? undefined : 3;
var keyDownArrowDown =  false ? undefined : 4;
var keyDownEscape =  false ? undefined : 5;
var keyDownEnter =  false ? undefined : 6;
var keyDownHome =  false ? undefined : 7;
var keyDownEnd =  false ? undefined : 8;
var clickItem =  false ? undefined : 9;
var blurInput =  false ? undefined : 10;
var changeInput =  false ? undefined : 11;
var keyDownSpaceButton =  false ? undefined : 12;
var clickButton =  false ? undefined : 13;
var blurButton =  false ? undefined : 14;
var controlledPropUpdatedSelectedItem =  false ? undefined : 15;
var touchEnd =  false ? undefined : 16;

var stateChangeTypes = /*#__PURE__*/Object.freeze({
  unknown: unknown,
  mouseUp: mouseUp,
  itemMouseEnter: itemMouseEnter,
  keyDownArrowUp: keyDownArrowUp,
  keyDownArrowDown: keyDownArrowDown,
  keyDownEscape: keyDownEscape,
  keyDownEnter: keyDownEnter,
  keyDownHome: keyDownHome,
  keyDownEnd: keyDownEnd,
  clickItem: clickItem,
  blurInput: blurInput,
  changeInput: changeInput,
  keyDownSpaceButton: keyDownSpaceButton,
  clickButton: clickButton,
  blurButton: blurButton,
  controlledPropUpdatedSelectedItem: controlledPropUpdatedSelectedItem,
  touchEnd: touchEnd
});

var idCounter = 0;
/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @param {Function} cb the callback
 * @return {Function} a function
 */

function cbToCb(cb) {
  return typeof cb === 'function' ? cb : noop;
}

function noop() {}
/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} menuNode the menu element of the component
 */


function scrollIntoView(node, menuNode) {
  if (node === null) {
    return;
  }

  var actions = index_module(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  });
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
/**
 * @param {HTMLElement} parent the parent node
 * @param {HTMLElement} child the child node
 * @return {Boolean} whether the parent is the child or the child is in the parent
 */


function isOrContainsNode(parent, child) {
  return parent === child || parent.contains && parent.contains(child);
}
/**
 * Simple debounce implementation. Will call the given
 * function once after the time given has passed since
 * it was last called.
 * @param {Function} fn the function to call after the time
 * @param {Number} time the time to wait
 * @return {Function} the debounced function
 */


function debounce(fn, time) {
  var timeoutId;

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    cancel();
    timeoutId = setTimeout(function () {
      timeoutId = null;
      fn.apply(void 0, args);
    }, time);
  }

  wrapper.cancel = cancel;
  return wrapper;
}
/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */


function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return fns.some(function (fn) {
      if (fn) {
        fn.apply(void 0, [event].concat(args));
      }

      return event.preventDownshiftDefault || event.hasOwnProperty('nativeEvent') && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
/**
 * This return a function that will call all the given functions with
 * the arguments with which it's called. It does a null-check before
 * attempting to call the functions and can take any number of functions.
 * @param {...Function} fns the functions to call
 * @return {Function} the function that calls all the functions
 */


function callAll() {
  for (var _len4 = arguments.length, fns = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    fns[_key4] = arguments[_key4];
  }

  return function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    fns.forEach(function (fn) {
      if (fn) {
        fn.apply(void 0, args);
      }
    });
  };
}
/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */


function generateId() {
  return String(idCounter++);
}
/**
 * Resets idCounter to 0. Used for SSR.
 */


function resetIdCounter() {
  idCounter = 0;
}
/**
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */


function getA11yStatusMessage(_ref2) {
  var isOpen = _ref2.isOpen,
      selectedItem = _ref2.selectedItem,
      resultCount = _ref2.resultCount,
      previousResultCount = _ref2.previousResultCount,
      itemToString = _ref2.itemToString;

  if (!isOpen) {
    return selectedItem ? itemToString(selectedItem) : '';
  }

  if (!resultCount) {
    return 'No results are available.';
  }

  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? ' is' : 's are') + " available, use up and down arrow keys to navigate. Press Enter key to select.";
  }

  return '';
}
/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */


function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ?
  /* istanbul ignore next (preact) */
  arg[0] : arg;

  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}
/**
 * @param {Object} element (P)react element
 * @return {Boolean} whether it's a DOM element
 */


function isDOMElement(element) {
  // then we assume this is react
  return typeof element.type === 'string';
}
/**
 * @param {Object} element (P)react element
 * @return {Object} the props
 */


function getElementProps(element) {
  return element.props;
}
/**
 * Throws a helpful error message for required properties. Useful
 * to be used as a default in destructuring or object params.
 * @param {String} fnName the function name
 * @param {String} propName the prop name
 */


function requiredProp(fnName, propName) {
  // eslint-disable-next-line no-console
  console.error("The property \"" + propName + "\" is required in \"" + fnName + "\"");
}

var stateKeys = ['highlightedIndex', 'inputValue', 'isOpen', 'selectedItem', 'type'];
/**
 * @param {Object} state the state object
 * @return {Object} state that is relevant to downshift
 */

function pickState(state) {
  if (state === void 0) {
    state = {};
  }

  var result = {};
  stateKeys.forEach(function (k) {
    if (state.hasOwnProperty(k)) {
      result[k] = state[k];
    }
  });
  return result;
}
/**
 * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
 * @param {Object} event a keyboardEvent object
 * @return {String} keyboard key
 */


function normalizeArrowKey(event) {
  var key = event.key,
      keyCode = event.keyCode;
  /* istanbul ignore next (ie) */

  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return "Arrow" + key;
  }

  return key;
}
/**
 * Simple check if the value passed is object literal
 * @param {*} obj any things
 * @return {Boolean} whether it's object literal
 */


function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */


function getNextWrappingIndex(moveAmount, baseIndex, itemCount) {
  var itemsLastIndex = itemCount - 1;

  if (typeof baseIndex !== 'number' || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }

  var newIndex = baseIndex + moveAmount;

  if (newIndex < 0) {
    newIndex = itemsLastIndex;
  } else if (newIndex > itemsLastIndex) {
    newIndex = 0;
  }

  return newIndex;
}

var downshift_esm_Downshift =
/*#__PURE__*/
function (_Component) {
  Object(inheritsLoose["a" /* default */])(Downshift, _Component);

  function Downshift(_props) {
    var _this = _Component.call(this, _props) || this;

    _this.id = _this.props.id || "downshift-" + generateId();
    _this.menuId = _this.props.menuId || _this.id + "-menu";
    _this.labelId = _this.props.labelId || _this.id + "-label";
    _this.inputId = _this.props.inputId || _this.id + "-input";

    _this.getItemId = _this.props.getItemId || function (index) {
      return _this.id + "-item-" + index;
    };

    _this.input = null;
    _this.items = [];
    _this.itemCount = null;
    _this.previousResultCount = 0;
    _this.timeoutIds = [];

    _this.internalSetTimeout = function (fn, time) {
      var id = setTimeout(function () {
        _this.timeoutIds = _this.timeoutIds.filter(function (i) {
          return i !== id;
        });
        fn();
      }, time);

      _this.timeoutIds.push(id);
    };

    _this.setItemCount = function (count) {
      _this.itemCount = count;
    };

    _this.unsetItemCount = function () {
      _this.itemCount = null;
    };

    _this.setHighlightedIndex = function (highlightedIndex, otherStateToSet) {
      if (highlightedIndex === void 0) {
        highlightedIndex = _this.props.defaultHighlightedIndex;
      }

      if (otherStateToSet === void 0) {
        otherStateToSet = {};
      }

      otherStateToSet = pickState(otherStateToSet);

      _this.internalSetState(Object(esm_extends["a" /* default */])({
        highlightedIndex: highlightedIndex
      }, otherStateToSet));
    };

    _this.clearSelection = function (cb) {
      _this.internalSetState({
        selectedItem: null,
        inputValue: '',
        highlightedIndex: _this.props.defaultHighlightedIndex,
        isOpen: _this.props.defaultIsOpen
      }, cb);
    };

    _this.selectItem = function (item, otherStateToSet, cb) {
      otherStateToSet = pickState(otherStateToSet);

      _this.internalSetState(Object(esm_extends["a" /* default */])({
        isOpen: _this.props.defaultIsOpen,
        highlightedIndex: _this.props.defaultHighlightedIndex,
        selectedItem: item,
        inputValue: _this.props.itemToString(item)
      }, otherStateToSet), cb);
    };

    _this.selectItemAtIndex = function (itemIndex, otherStateToSet, cb) {
      var item = _this.items[itemIndex];

      if (item == null) {
        return;
      }

      _this.selectItem(item, otherStateToSet, cb);
    };

    _this.selectHighlightedItem = function (otherStateToSet, cb) {
      return _this.selectItemAtIndex(_this.getState().highlightedIndex, otherStateToSet, cb);
    };

    _this.internalSetState = function (stateToSet, cb) {
      var isItemSelected, onChangeArg;
      var onStateChangeArg = {};
      var isStateToSetFunction = typeof stateToSet === 'function'; // we want to call `onInputValueChange` before the `setState` call
      // so someone controlling the `inputValue` state gets notified of
      // the input change as soon as possible. This avoids issues with
      // preserving the cursor position.
      // See https://github.com/downshift-js/downshift/issues/217 for more info.

      if (!isStateToSetFunction && stateToSet.hasOwnProperty('inputValue')) {
        _this.props.onInputValueChange(stateToSet.inputValue, Object(esm_extends["a" /* default */])({}, _this.getStateAndHelpers(), {}, stateToSet));
      }

      return _this.setState(function (state) {
        state = _this.getState(state);
        var newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet; // Your own function that could modify the state that will be set.

        newStateToSet = _this.props.stateReducer(state, newStateToSet); // checks if an item is selected, regardless of if it's different from
        // what was selected before
        // used to determine if onSelect and onChange callbacks should be called

        isItemSelected = newStateToSet.hasOwnProperty('selectedItem'); // this keeps track of the object we want to call with setState

        var nextState = {}; // this is just used to tell whether the state changed

        var nextFullState = {}; // we need to call on change if the outside world is controlling any of our state
        // and we're trying to update that state. OR if the selection has changed and we're
        // trying to update the selection

        if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
          onChangeArg = newStateToSet.selectedItem;
        }

        newStateToSet.type = newStateToSet.type || unknown;
        Object.keys(newStateToSet).forEach(function (key) {
          // onStateChangeArg should only have the state that is
          // actually changing
          if (state[key] !== newStateToSet[key]) {
            onStateChangeArg[key] = newStateToSet[key];
          } // the type is useful for the onStateChangeArg
          // but we don't actually want to set it in internal state.
          // this is an undocumented feature for now... Not all internalSetState
          // calls support it and I'm not certain we want them to yet.
          // But it enables users controlling the isOpen state to know when
          // the isOpen state changes due to mouseup events which is quite handy.


          if (key === 'type') {
            return;
          }

          nextFullState[key] = newStateToSet[key]; // if it's coming from props, then we don't care to set it internally

          if (!_this.isControlledProp(key)) {
            nextState[key] = newStateToSet[key];
          }
        }); // if stateToSet is a function, then we weren't able to call onInputValueChange
        // earlier, so we'll call it now that we know what the inputValue state will be.

        if (isStateToSetFunction && newStateToSet.hasOwnProperty('inputValue')) {
          _this.props.onInputValueChange(newStateToSet.inputValue, Object(esm_extends["a" /* default */])({}, _this.getStateAndHelpers(), {}, newStateToSet));
        }

        return nextState;
      }, function () {
        // call the provided callback if it's a function
        cbToCb(cb)(); // only call the onStateChange and onChange callbacks if
        // we have relevant information to pass them.

        var hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;

        if (hasMoreStateThanType) {
          _this.props.onStateChange(onStateChangeArg, _this.getStateAndHelpers());
        }

        if (isItemSelected) {
          _this.props.onSelect(stateToSet.selectedItem, _this.getStateAndHelpers());
        }

        if (onChangeArg !== undefined) {
          _this.props.onChange(onChangeArg, _this.getStateAndHelpers());
        } // this is currently undocumented and therefore subject to change
        // We'll try to not break it, but just be warned.


        _this.props.onUserAction(onStateChangeArg, _this.getStateAndHelpers());
      });
    };

    _this.rootRef = function (node) {
      return _this._rootNode = node;
    };

    _this.getRootProps = function (_temp, _temp2) {
      var _extends2;

      var _ref = _temp === void 0 ? {} : _temp,
          _ref$refKey = _ref.refKey,
          refKey = _ref$refKey === void 0 ? 'ref' : _ref$refKey,
          rest = Object(objectWithoutPropertiesLoose["a" /* default */])(_ref, ["refKey"]);

      var _ref2 = _temp2 === void 0 ? {} : _temp2,
          _ref2$suppressRefErro = _ref2.suppressRefError,
          suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;

      // this is used in the render to know whether the user has called getRootProps.
      // It uses that to know whether to apply the props automatically
      _this.getRootProps.called = true;
      _this.getRootProps.refKey = refKey;
      _this.getRootProps.suppressRefError = suppressRefError;

      var _this$getState = _this.getState(),
          isOpen = _this$getState.isOpen;

      return Object(esm_extends["a" /* default */])((_extends2 = {}, _extends2[refKey] = _this.rootRef, _extends2.role = 'combobox', _extends2['aria-expanded'] = isOpen, _extends2['aria-haspopup'] = 'listbox', _extends2['aria-owns'] = isOpen ? _this.menuId : null, _extends2['aria-labelledby'] = _this.labelId, _extends2), rest);
    };

    _this.keyDownHandlers = {
      ArrowDown: function ArrowDown(event) {
        var _this2 = this;

        event.preventDefault();

        if (this.getState().isOpen) {
          var amount = event.shiftKey ? 5 : 1;
          this.moveHighlightedIndex(amount, {
            type: keyDownArrowDown
          });
        } else {
          this.internalSetState({
            isOpen: true,
            type: keyDownArrowDown
          }, function () {
            var itemCount = _this2.getItemCount();

            if (itemCount > 0) {
              _this2.setHighlightedIndex(getNextWrappingIndex(1, _this2.getState().highlightedIndex, itemCount), {
                type: keyDownArrowDown
              });
            }
          });
        }
      },
      ArrowUp: function ArrowUp(event) {
        var _this3 = this;

        event.preventDefault();

        if (this.getState().isOpen) {
          var amount = event.shiftKey ? -5 : -1;
          this.moveHighlightedIndex(amount, {
            type: keyDownArrowUp
          });
        } else {
          this.internalSetState({
            isOpen: true,
            type: keyDownArrowUp
          }, function () {
            var itemCount = _this3.getItemCount();

            if (itemCount > 0) {
              _this3.setHighlightedIndex(getNextWrappingIndex(-1, _this3.getState().highlightedIndex, itemCount), {
                type: keyDownArrowDown
              });
            }
          });
        }
      },
      Enter: function Enter(event) {
        var _this$getState2 = this.getState(),
            isOpen = _this$getState2.isOpen,
            highlightedIndex = _this$getState2.highlightedIndex;

        if (isOpen && highlightedIndex != null) {
          event.preventDefault();
          var item = this.items[highlightedIndex];
          var itemNode = this.getItemNodeFromIndex(highlightedIndex);

          if (item == null || itemNode && itemNode.hasAttribute('disabled')) {
            return;
          }

          this.selectHighlightedItem({
            type: keyDownEnter
          });
        }
      },
      Escape: function Escape(event) {
        event.preventDefault();
        this.reset({
          type: keyDownEscape,
          selectedItem: null,
          inputValue: ''
        });
      }
    };
    _this.buttonKeyDownHandlers = Object(esm_extends["a" /* default */])({}, _this.keyDownHandlers, {
      ' ': function _(event) {
        event.preventDefault();
        this.toggleMenu({
          type: keyDownSpaceButton
        });
      }
    });
    _this.inputKeyDownHandlers = Object(esm_extends["a" /* default */])({}, _this.keyDownHandlers, {
      Home: function Home(event) {
        this.highlightFirstOrLastIndex(event, true, {
          type: keyDownHome
        });
      },
      End: function End(event) {
        this.highlightFirstOrLastIndex(event, false, {
          type: keyDownEnd
        });
      }
    });

    _this.getToggleButtonProps = function (_temp3) {
      var _ref3 = _temp3 === void 0 ? {} : _temp3,
          onClick = _ref3.onClick,
          onPress = _ref3.onPress,
          onKeyDown = _ref3.onKeyDown,
          onKeyUp = _ref3.onKeyUp,
          onBlur = _ref3.onBlur,
          rest = Object(objectWithoutPropertiesLoose["a" /* default */])(_ref3, ["onClick", "onPress", "onKeyDown", "onKeyUp", "onBlur"]);

      var _this$getState3 = _this.getState(),
          isOpen = _this$getState3.isOpen;

      var enabledEventHandlers = {
        onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
        onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
        onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
        onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
      };
      var eventHandlers = rest.disabled ? {} : enabledEventHandlers;
      return Object(esm_extends["a" /* default */])({
        type: 'button',
        role: 'button',
        'aria-label': isOpen ? 'close menu' : 'open menu',
        'aria-haspopup': true,
        'data-toggle': true
      }, eventHandlers, {}, rest);
    };

    _this.buttonHandleKeyUp = function (event) {
      // Prevent click event from emitting in Firefox
      event.preventDefault();
    };

    _this.buttonHandleKeyDown = function (event) {
      var key = normalizeArrowKey(event);

      if (_this.buttonKeyDownHandlers[key]) {
        _this.buttonKeyDownHandlers[key].call(Object(assertThisInitialized["a" /* default */])(_this), event);
      }
    };

    _this.buttonHandleClick = function (event) {
      event.preventDefault(); // handle odd case for Safari and Firefox which
      // don't give the button the focus properly.

      /* istanbul ignore if (can't reasonably test this) */

      if ( _this.props.environment.document.activeElement === _this.props.environment.document.body) {
        event.target.focus();
      } // to simplify testing components that use downshift, we'll not wrap this in a setTimeout
      // if the NODE_ENV is test. With the proper build system, this should be dead code eliminated
      // when building for production and should therefore have no impact on production code.


      if (false) {} else {
        // Ensure that toggle of menu occurs after the potential blur event in iOS
        _this.internalSetTimeout(function () {
          return _this.toggleMenu({
            type: clickButton
          });
        });
      }
    };

    _this.buttonHandleBlur = function (event) {
      var blurTarget = event.target; // Save blur target for comparison with activeElement later
      // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not body element

      _this.internalSetTimeout(function () {
        if (!_this.isMouseDown && (_this.props.environment.document.activeElement == null || _this.props.environment.document.activeElement.id !== _this.inputId) && _this.props.environment.document.activeElement !== blurTarget // Do nothing if we refocus the same element again (to solve issue in Safari on iOS)
        ) {
            _this.reset({
              type: blurButton
            });
          }
      });
    };

    _this.getLabelProps = function (props) {
      return Object(esm_extends["a" /* default */])({
        htmlFor: _this.inputId,
        id: _this.labelId
      }, props);
    };

    _this.getInputProps = function (_temp4) {
      var _ref4 = _temp4 === void 0 ? {} : _temp4,
          onKeyDown = _ref4.onKeyDown,
          onBlur = _ref4.onBlur,
          onChange = _ref4.onChange,
          onInput = _ref4.onInput,
          onChangeText = _ref4.onChangeText,
          rest = Object(objectWithoutPropertiesLoose["a" /* default */])(_ref4, ["onKeyDown", "onBlur", "onChange", "onInput", "onChangeText"]);

      var onChangeKey;
      var eventHandlers = {};
      /* istanbul ignore next (preact) */

      onChangeKey = 'onChange';

      var _this$getState4 = _this.getState(),
          inputValue = _this$getState4.inputValue,
          isOpen = _this$getState4.isOpen,
          highlightedIndex = _this$getState4.highlightedIndex;

      if (!rest.disabled) {
        var _eventHandlers;

        eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, _this.inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, _this.inputHandleBlur), _eventHandlers);
      }
      /* istanbul ignore if (react-native) */


      return Object(esm_extends["a" /* default */])({
        'aria-autocomplete': 'list',
        'aria-activedescendant': isOpen && typeof highlightedIndex === 'number' && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
        'aria-controls': isOpen ? _this.menuId : null,
        'aria-labelledby': _this.labelId,
        // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
        // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
        autoComplete: 'off',
        value: inputValue,
        id: _this.inputId
      }, eventHandlers, {}, rest);
    };

    _this.inputHandleKeyDown = function (event) {
      var key = normalizeArrowKey(event);

      if (key && _this.inputKeyDownHandlers[key]) {
        _this.inputKeyDownHandlers[key].call(Object(assertThisInitialized["a" /* default */])(_this), event);
      }
    };

    _this.inputHandleChange = function (event) {
      _this.internalSetState({
        type: changeInput,
        isOpen: true,
        inputValue: event.target.value,
        highlightedIndex: _this.props.defaultHighlightedIndex
      });
    };

    _this.inputHandleBlur = function () {
      // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not the body element
      _this.internalSetTimeout(function () {
        var downshiftButtonIsActive = _this.props.environment.document && !!_this.props.environment.document.activeElement && !!_this.props.environment.document.activeElement.dataset && _this.props.environment.document.activeElement.dataset.toggle && _this._rootNode && _this._rootNode.contains(_this.props.environment.document.activeElement);

        if (!_this.isMouseDown && !downshiftButtonIsActive) {
          _this.reset({
            type: blurInput
          });
        }
      });
    };

    _this.menuRef = function (node) {
      _this._menuNode = node;
    };

    _this.getMenuProps = function (_temp5, _temp6) {
      var _extends3;

      var _ref5 = _temp5 === void 0 ? {} : _temp5,
          _ref5$refKey = _ref5.refKey,
          refKey = _ref5$refKey === void 0 ? 'ref' : _ref5$refKey,
          ref = _ref5.ref,
          props = Object(objectWithoutPropertiesLoose["a" /* default */])(_ref5, ["refKey", "ref"]);

      var _ref6 = _temp6 === void 0 ? {} : _temp6,
          _ref6$suppressRefErro = _ref6.suppressRefError,
          suppressRefError = _ref6$suppressRefErro === void 0 ? false : _ref6$suppressRefErro;

      _this.getMenuProps.called = true;
      _this.getMenuProps.refKey = refKey;
      _this.getMenuProps.suppressRefError = suppressRefError;
      return Object(esm_extends["a" /* default */])((_extends3 = {}, _extends3[refKey] = callAll(ref, _this.menuRef), _extends3.role = 'listbox', _extends3['aria-labelledby'] = props && props['aria-label'] ? null : _this.labelId, _extends3.id = _this.menuId, _extends3), props);
    };

    _this.getItemProps = function (_temp7) {
      var _enabledEventHandlers;

      var _ref7 = _temp7 === void 0 ? {} : _temp7,
          onMouseMove = _ref7.onMouseMove,
          onMouseDown = _ref7.onMouseDown,
          onClick = _ref7.onClick,
          onPress = _ref7.onPress,
          index = _ref7.index,
          _ref7$item = _ref7.item,
          item = _ref7$item === void 0 ?  true ?
      /* istanbul ignore next */
      undefined : undefined : _ref7$item,
          rest = Object(objectWithoutPropertiesLoose["a" /* default */])(_ref7, ["onMouseMove", "onMouseDown", "onClick", "onPress", "index", "item"]);

      if (index === undefined) {
        _this.items.push(item);

        index = _this.items.indexOf(item);
      } else {
        _this.items[index] = item;
      }

      var onSelectKey = 'onClick';
      var customClickHandler = onClick;
      var enabledEventHandlers = (_enabledEventHandlers = {
        // onMouseMove is used over onMouseEnter here. onMouseMove
        // is only triggered on actual mouse movement while onMouseEnter
        // can fire on DOM changes, interrupting keyboard navigation
        onMouseMove: callAllEventHandlers(onMouseMove, function () {
          if (index === _this.getState().highlightedIndex) {
            return;
          }

          _this.setHighlightedIndex(index, {
            type: itemMouseEnter
          }); // We never want to manually scroll when changing state based
          // on `onMouseMove` because we will be moving the element out
          // from under the user which is currently scrolling/moving the
          // cursor


          _this.avoidScrolling = true;

          _this.internalSetTimeout(function () {
            return _this.avoidScrolling = false;
          }, 250);
        }),
        onMouseDown: callAllEventHandlers(onMouseDown, function (event) {
          // This prevents the activeElement from being changed
          // to the item so it can remain with the current activeElement
          // which is a more common use case.
          event.preventDefault();
        })
      }, _enabledEventHandlers[onSelectKey] = callAllEventHandlers(customClickHandler, function () {
        _this.selectItemAtIndex(index, {
          type: clickItem
        });
      }), _enabledEventHandlers); // Passing down the onMouseDown handler to prevent redirect
      // of the activeElement if clicking on disabled items

      var eventHandlers = rest.disabled ? {
        onMouseDown: enabledEventHandlers.onMouseDown
      } : enabledEventHandlers;
      return Object(esm_extends["a" /* default */])({
        id: _this.getItemId(index),
        role: 'option',
        'aria-selected': _this.getState().highlightedIndex === index
      }, eventHandlers, {}, rest);
    };

    _this.clearItems = function () {
      _this.items = [];
    };

    _this.reset = function (otherStateToSet, cb) {
      if (otherStateToSet === void 0) {
        otherStateToSet = {};
      }

      otherStateToSet = pickState(otherStateToSet);

      _this.internalSetState(function (_ref8) {
        var selectedItem = _ref8.selectedItem;
        return Object(esm_extends["a" /* default */])({
          isOpen: _this.props.defaultIsOpen,
          highlightedIndex: _this.props.defaultHighlightedIndex,
          inputValue: _this.props.itemToString(selectedItem)
        }, otherStateToSet);
      }, cb);
    };

    _this.toggleMenu = function (otherStateToSet, cb) {
      if (otherStateToSet === void 0) {
        otherStateToSet = {};
      }

      otherStateToSet = pickState(otherStateToSet);

      _this.internalSetState(function (_ref9) {
        var isOpen = _ref9.isOpen;
        return Object(esm_extends["a" /* default */])({
          isOpen: !isOpen
        }, isOpen && {
          highlightedIndex: _this.props.defaultHighlightedIndex
        }, {}, otherStateToSet);
      }, function () {
        var _this$getState5 = _this.getState(),
            isOpen = _this$getState5.isOpen,
            highlightedIndex = _this$getState5.highlightedIndex;

        if (isOpen) {
          if (_this.getItemCount() > 0 && typeof highlightedIndex === 'number') {
            _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
          }
        }

        cbToCb(cb)();
      });
    };

    _this.openMenu = function (cb) {
      _this.internalSetState({
        isOpen: true
      }, cb);
    };

    _this.closeMenu = function (cb) {
      _this.internalSetState({
        isOpen: false
      }, cb);
    };

    _this.updateStatus = debounce(function () {
      var state = _this.getState();

      var item = _this.items[state.highlightedIndex];

      var resultCount = _this.getItemCount();

      var status = _this.props.getA11yStatusMessage(Object(esm_extends["a" /* default */])({
        itemToString: _this.props.itemToString,
        previousResultCount: _this.previousResultCount,
        resultCount: resultCount,
        highlightedItem: item
      }, state));

      _this.previousResultCount = resultCount;
      setStatus(status);
    }, 200);

    // fancy destructuring + defaults + aliases
    // this basically says each value of state should either be set to
    // the initial value or the default value if the initial value is not provided
    var _this$props = _this.props,
        defaultHighlightedIndex = _this$props.defaultHighlightedIndex,
        _this$props$initialHi = _this$props.initialHighlightedIndex,
        _highlightedIndex = _this$props$initialHi === void 0 ? defaultHighlightedIndex : _this$props$initialHi,
        defaultIsOpen = _this$props.defaultIsOpen,
        _this$props$initialIs = _this$props.initialIsOpen,
        _isOpen = _this$props$initialIs === void 0 ? defaultIsOpen : _this$props$initialIs,
        _this$props$initialIn = _this$props.initialInputValue,
        _inputValue = _this$props$initialIn === void 0 ? '' : _this$props$initialIn,
        _this$props$initialSe = _this$props.initialSelectedItem,
        _selectedItem = _this$props$initialSe === void 0 ? null : _this$props$initialSe;

    var _state = _this.getState({
      highlightedIndex: _highlightedIndex,
      isOpen: _isOpen,
      inputValue: _inputValue,
      selectedItem: _selectedItem
    });

    if (_state.selectedItem != null && _this.props.initialInputValue === undefined) {
      _state.inputValue = _this.props.itemToString(_state.selectedItem);
    }

    _this.state = _state;
    return _this;
  }

  var _proto = Downshift.prototype;

  /**
   * Clear all running timeouts
   */
  _proto.internalClearTimeouts = function internalClearTimeouts() {
    this.timeoutIds.forEach(function (id) {
      clearTimeout(id);
    });
    this.timeoutIds = [];
  }
  /**
   * Gets the state based on internal state or props
   * If a state value is passed via props, then that
   * is the value given, otherwise it's retrieved from
   * stateToMerge
   *
   * This will perform a shallow merge of the given state object
   * with the state coming from props
   * (for the controlled component scenario)
   * This is used in state updater functions so they're referencing
   * the right state regardless of where it comes from.
   *
   * @param {Object} stateToMerge defaults to this.state
   * @return {Object} the state
   */
  ;

  _proto.getState = function getState(stateToMerge) {
    var _this4 = this;

    if (stateToMerge === void 0) {
      stateToMerge = this.state;
    }

    return Object.keys(stateToMerge).reduce(function (state, key) {
      state[key] = _this4.isControlledProp(key) ? _this4.props[key] : stateToMerge[key];
      return state;
    }, {});
  }
  /**
   * This determines whether a prop is a "controlled prop" meaning it is
   * state which is controlled by the outside of this component rather
   * than within this component.
   * @param {String} key the key to check
   * @return {Boolean} whether it is a controlled controlled prop
   */
  ;

  _proto.isControlledProp = function isControlledProp(key) {
    return this.props[key] !== undefined;
  };

  _proto.getItemCount = function getItemCount() {
    // things read better this way. They're in priority order:
    // 1. `this.itemCount`
    // 2. `this.props.itemCount`
    // 3. `this.items.length`
    var itemCount = this.items.length;

    if (this.itemCount != null) {
      itemCount = this.itemCount;
    } else if (this.props.itemCount !== undefined) {
      itemCount = this.props.itemCount;
    }

    return itemCount;
  };

  _proto.getItemNodeFromIndex = function getItemNodeFromIndex(index) {
    return this.props.environment.document.getElementById(this.getItemId(index));
  };

  _proto.scrollHighlightedItemIntoView = function scrollHighlightedItemIntoView() {
    /* istanbul ignore else (react-native) */
    {
      var node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
      this.props.scrollIntoView(node, this._menuNode);
    }
  };

  _proto.moveHighlightedIndex = function moveHighlightedIndex(amount, otherStateToSet) {
    var itemCount = this.getItemCount();

    if (itemCount > 0) {
      var nextHighlightedIndex = getNextWrappingIndex(amount, this.getState().highlightedIndex, itemCount);
      this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
    }
  };

  _proto.highlightFirstOrLastIndex = function highlightFirstOrLastIndex(event, first, otherStateToSet) {
    var itemsLastIndex = this.getItemCount() - 1;

    if (itemsLastIndex < 0 || !this.getState().isOpen) {
      return;
    }

    event.preventDefault();
    this.setHighlightedIndex(first ? 0 : itemsLastIndex, otherStateToSet);
  };

  _proto.getStateAndHelpers = function getStateAndHelpers() {
    var _this$getState6 = this.getState(),
        highlightedIndex = _this$getState6.highlightedIndex,
        inputValue = _this$getState6.inputValue,
        selectedItem = _this$getState6.selectedItem,
        isOpen = _this$getState6.isOpen;

    var itemToString = this.props.itemToString;
    var id = this.id;
    var getRootProps = this.getRootProps,
        getToggleButtonProps = this.getToggleButtonProps,
        getLabelProps = this.getLabelProps,
        getMenuProps = this.getMenuProps,
        getInputProps = this.getInputProps,
        getItemProps = this.getItemProps,
        openMenu = this.openMenu,
        closeMenu = this.closeMenu,
        toggleMenu = this.toggleMenu,
        selectItem = this.selectItem,
        selectItemAtIndex = this.selectItemAtIndex,
        selectHighlightedItem = this.selectHighlightedItem,
        setHighlightedIndex = this.setHighlightedIndex,
        clearSelection = this.clearSelection,
        clearItems = this.clearItems,
        reset = this.reset,
        setItemCount = this.setItemCount,
        unsetItemCount = this.unsetItemCount,
        setState = this.internalSetState;
    return {
      // prop getters
      getRootProps: getRootProps,
      getToggleButtonProps: getToggleButtonProps,
      getLabelProps: getLabelProps,
      getMenuProps: getMenuProps,
      getInputProps: getInputProps,
      getItemProps: getItemProps,
      // actions
      reset: reset,
      openMenu: openMenu,
      closeMenu: closeMenu,
      toggleMenu: toggleMenu,
      selectItem: selectItem,
      selectItemAtIndex: selectItemAtIndex,
      selectHighlightedItem: selectHighlightedItem,
      setHighlightedIndex: setHighlightedIndex,
      clearSelection: clearSelection,
      clearItems: clearItems,
      setItemCount: setItemCount,
      unsetItemCount: unsetItemCount,
      setState: setState,
      // props
      itemToString: itemToString,
      // derived
      id: id,
      // state
      highlightedIndex: highlightedIndex,
      inputValue: inputValue,
      isOpen: isOpen,
      selectedItem: selectedItem
    };
  } //////////////////////////// ROOT
  ;

  _proto.componentDidMount = function componentDidMount() {
    var _this5 = this;

    /* istanbul ignore if (react-native) */
    if (false) {}
    /* istanbul ignore if (react-native) */


    {
      var targetWithinDownshift = function (target, checkActiveElement) {
        if (checkActiveElement === void 0) {
          checkActiveElement = true;
        }

        var document = _this5.props.environment.document;
        return [_this5._rootNode, _this5._menuNode].some(function (contextNode) {
          return contextNode && (isOrContainsNode(contextNode, target) || checkActiveElement && isOrContainsNode(contextNode, document.activeElement));
        });
      }; // this.isMouseDown helps us track whether the mouse is currently held down.
      // This is useful when the user clicks on an item in the list, but holds the mouse
      // down long enough for the list to disappear (because the blur event fires on the input)
      // this.isMouseDown is used in the blur handler on the input to determine whether the blur event should
      // trigger hiding the menu.


      var onMouseDown = function () {
        _this5.isMouseDown = true;
      };

      var onMouseUp = function (event) {
        _this5.isMouseDown = false; // if the target element or the activeElement is within a downshift node
        // then we don't want to reset downshift

        var contextWithinDownshift = targetWithinDownshift(event.target);

        if (!contextWithinDownshift && _this5.getState().isOpen) {
          _this5.reset({
            type: mouseUp
          }, function () {
            return _this5.props.onOuterClick(_this5.getStateAndHelpers());
          });
        }
      }; // Touching an element in iOS gives focus and hover states, but touching out of
      // the element will remove hover, and persist the focus state, resulting in the
      // blur event not being triggered.
      // this.isTouchMove helps us track whether the user is tapping or swiping on a touch screen.
      // If the user taps outside of Downshift, the component should be reset,
      // but not if the user is swiping


      var onTouchStart = function () {
        _this5.isTouchMove = false;
      };

      var onTouchMove = function () {
        _this5.isTouchMove = true;
      };

      var onTouchEnd = function (event) {
        var contextWithinDownshift = targetWithinDownshift(event.target, false);

        if (!_this5.isTouchMove && !contextWithinDownshift && _this5.getState().isOpen) {
          _this5.reset({
            type: touchEnd
          }, function () {
            return _this5.props.onOuterClick(_this5.getStateAndHelpers());
          });
        }
      };

      var environment = this.props.environment;
      environment.addEventListener('mousedown', onMouseDown);
      environment.addEventListener('mouseup', onMouseUp);
      environment.addEventListener('touchstart', onTouchStart);
      environment.addEventListener('touchmove', onTouchMove);
      environment.addEventListener('touchend', onTouchEnd);

      this.cleanup = function () {
        _this5.internalClearTimeouts();

        _this5.updateStatus.cancel();

        environment.removeEventListener('mousedown', onMouseDown);
        environment.removeEventListener('mouseup', onMouseUp);
        environment.removeEventListener('touchstart', onTouchStart);
        environment.removeEventListener('touchmove', onTouchMove);
        environment.removeEventListener('touchend', onTouchEnd);
      };
    }
  };

  _proto.shouldScroll = function shouldScroll(prevState, prevProps) {
    var _ref10 = this.props.highlightedIndex === undefined ? this.getState() : this.props,
        currentHighlightedIndex = _ref10.highlightedIndex;

    var _ref11 = prevProps.highlightedIndex === undefined ? prevState : prevProps,
        prevHighlightedIndex = _ref11.highlightedIndex;

    var scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
    return scrollWhenOpen || currentHighlightedIndex !== prevHighlightedIndex;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (false) {}

    if (this.isControlledProp('selectedItem') && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
      this.internalSetState({
        type: controlledPropUpdatedSelectedItem,
        inputValue: this.props.itemToString(this.props.selectedItem)
      });
    }

    if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
      this.scrollHighlightedItemIntoView();
    }
    /* istanbul ignore else (react-native) */


    this.updateStatus();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cleanup(); // avoids memory leak
  };

  _proto.render = function render() {
    var children = unwrapArray(this.props.children, noop); // because the items are rerendered every time we call the children
    // we clear this out each render and it will be populated again as
    // getItemProps is called.

    this.clearItems(); // we reset this so we know whether the user calls getRootProps during
    // this render. If they do then we don't need to do anything,
    // if they don't then we need to clone the element they return and
    // apply the props for them.

    this.getRootProps.called = false;
    this.getRootProps.refKey = undefined;
    this.getRootProps.suppressRefError = undefined; // we do something similar for getMenuProps

    this.getMenuProps.called = false;
    this.getMenuProps.refKey = undefined;
    this.getMenuProps.suppressRefError = undefined; // we do something similar for getLabelProps

    this.getLabelProps.called = false; // and something similar for getInputProps

    this.getInputProps.called = false;
    var element = unwrapArray(children(this.getStateAndHelpers()));

    if (!element) {
      return null;
    }

    if (this.getRootProps.called || this.props.suppressRefError) {
      if (false) {}

      return element;
    } else if (isDOMElement(element)) {
      // they didn't apply the root props, but we can clone
      // this and apply the props ourselves
      return react_default.a.cloneElement(element, this.getRootProps(getElementProps(element)));
    }
    /* istanbul ignore else */


    if (false) {}
    /* istanbul ignore next */


    return undefined;
  };

  return Downshift;
}(react["Component"]);

downshift_esm_Downshift.defaultProps = {
  defaultHighlightedIndex: null,
  defaultIsOpen: false,
  getA11yStatusMessage: getA11yStatusMessage,
  itemToString: function itemToString(i) {
    if (i == null) {
      return '';
    }

    if (false) {}

    return String(i);
  },
  onStateChange: noop,
  onInputValueChange: noop,
  onUserAction: noop,
  onChange: noop,
  onSelect: noop,
  onOuterClick: noop,
  selectedItemChanged: function selectedItemChanged(prevItem, item) {
    return prevItem !== item;
  },
  environment: typeof window === 'undefined'
  /* istanbul ignore next (ssr) */
  ? {} : window,
  stateReducer: function stateReducer(state, stateToSet) {
    return stateToSet;
  },
  suppressRefError: false,
  scrollIntoView: scrollIntoView
};
downshift_esm_Downshift.stateChangeTypes = stateChangeTypes;
 false ? undefined : void 0;

function validateGetMenuPropsCalledCorrectly(node, _ref12) {
  var refKey = _ref12.refKey;

  if (!node) {
    // eslint-disable-next-line no-console
    console.error("downshift: The ref prop \"" + refKey + "\" from getMenuProps was not applied correctly on your menu element.");
  }
}

function validateGetRootPropsCalledCorrectly(element, _ref13) {
  var refKey = _ref13.refKey;
  var refKeySpecified = refKey !== 'ref';
  var isComposite = !isDOMElement(element);

  if (isComposite && !refKeySpecified && !Object(react_is["isForwardRef"])(element)) {
    // eslint-disable-next-line no-console
    console.error('downshift: You returned a non-DOM element. You must specify a refKey in getRootProps');
  } else if (!isComposite && refKeySpecified) {
    // eslint-disable-next-line no-console
    console.error("downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified \"" + refKey + "\"");
  }

  if (!Object(react_is["isForwardRef"])(element) && !getElementProps(element)[refKey]) {
    // eslint-disable-next-line no-console
    console.error("downshift: You must apply the ref prop \"" + refKey + "\" from getRootProps onto your root element.");
  }
}

function validateControlledUnchanged(prevProps, nextProps) {
  var warningDescription = "This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props";
  ['selectedItem', 'isOpen', 'inputValue', 'highlightedIndex'].forEach(function (propKey) {
    if (prevProps[propKey] !== undefined && nextProps[propKey] === undefined) {
      // eslint-disable-next-line no-console
      console.error("downshift: A component has changed the controlled prop \"" + propKey + "\" to be uncontrolled. " + warningDescription);
    } else if (prevProps[propKey] === undefined && nextProps[propKey] !== undefined) {
      // eslint-disable-next-line no-console
      console.error("downshift: A component has changed the uncontrolled prop \"" + propKey + "\" to be controlled. " + warningDescription);
    }
  });
}

/* harmony default export */ var downshift_esm = __webpack_exports__["default"] = (downshift_esm_Downshift);



/***/ })

};;