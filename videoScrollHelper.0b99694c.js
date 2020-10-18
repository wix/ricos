exports.ids = [4];
exports.modules = {

/***/ 1203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(323);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _scrollHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(139);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var VIDEO_EVENTS = {
  SCROLL: 'SCROLL',
  CLICKED: 'CLICKED',
  HOVERED: 'HOVERED',
  ENDED: 'ENDED',
  INIT_SCROLL: 'INIT_SCROLL'
};

var VideoScrollHelper = /*#__PURE__*/function () {
  function VideoScrollHelper(config) {
    var _this = this;

    this.scrollBase = 0;
    this.videoItems = [];
    this.currentPlayingIdx = -1;
    this.nextInLineIdx = -1;
    this.lastItemCount = 0;
    this.playing = false;
    this.updateGalleryStructure = this.updateGalleryStructure.bind(this);
    this.initializePlayState = this.initializePlayState.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.top = 0;
    this.left = 0;
    this.videoPlay = undefined;
    this.itemClick = undefined;
    this.setPlayingVideos = config.setPlayingVideos;
    this.lastVideoPlayed = -1;
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
        videoLoop = _ref2.videoLoop,
        itemClick = _ref2.itemClick,
        oneRow = _ref2.oneRow;
    this.galleryWidth = pro_gallery_lib__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getGalleryDimensions().galleryWidth;
    this.scrollBase = scrollBase;
    this.videoPlay = videoPlay;
    this.videoLoop = videoLoop;
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
          _this2.videoItems.push(_objectSpread(_objectSpread({}, item), {}, {
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

      case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].events.ITEM_ACTION_TRIGGERED:
        //case VIDEO_EVENTS.clicked:
        this.itemClicked(eventData.idx);
        break;

      case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].events.HOVER_SET:
        //case VIDEO_EVENTS.hovered:
        this.itemHovered(eventData);
        break;

      case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].events.VIDEO_ENDED:
        //case VIDEO_EVENTS.ended:
        this.videoEnded(eventData.idx);
        break;

      case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].events.VIDEO_PLAYED:
        //case VIDEO_EVENTS.ended:
        this.videoPlayed(eventData.idx);
        break;

      case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].events.VIDEO_ERROR:
        //case VIDEO_EVENTS.ended:
        this.videoErrorReported();
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
      this.autoPlayNextVideoByRating({
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

      this.autoPlayNextVideoByRating({
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
    this.autoPlayNextVideoByRating(scroll);
  };

  _proto.videoPlayed = function videoPlayed(idx) {
    this.lastVideoPlayed = idx;
  };

  _proto.videoErrorReported = function videoErrorReported() {
    this.stop();
  };

  _proto.initializePlayState = function initializePlayState() {
    this.autoPlayNextVideoByRating({
      top: this.top,
      left: this.left
    });
  } //-------------------------------controls------------------------------------//
  ;

  _proto.autoPlayNextVideoByRating = function autoPlayNextVideoByRating(_ref5) {
    var _this4 = this;

    var top = _ref5.top,
        left = _ref5.left;

    if (!this.shouldAutoPlay()) {
      return;
    }

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

    if (!this.allowedLoop() && bestRating.idx === this.lastVideoPlayed) {
      if (secondBestRating.idx >= 0) {
        this.play(secondBestRating.idx, bestRating.idx); //play 2nd in line instead. keep best rating for next by the score he got...
      } else {
          return; //cant play same video twice.
        }
    } else {
      this.play(bestRating.idx, secondBestRating.idx);
    }
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
    var visibleVertically = Object(_scrollHelper__WEBPACK_IMPORTED_MODULE_3__[/* isWithinPaddingVertically */ "b"])({
      target: target,
      scrollBase: this.scrollBase,
      top: item.offset.top,
      bottom: item.offset.top + item.style.height,
      screenHeight: pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].innerHeight,
      padding: videoPlayVerticalTolerance
    });
    var visibleHorizontally;

    if (!this.oneRow) {
      visibleHorizontally = true;
    } else {
      visibleHorizontally = Object(_scrollHelper__WEBPACK_IMPORTED_MODULE_3__[/* isWithinPaddingHorizontally */ "a"])({
        target: target,
        left: item.offset.left,
        right: item.offset.left + item.style.width,
        screenWidth: this.galleryWidth || pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].innerWidth,
        padding: videoPlayHorizontalTolerance
      });
    }

    return visibleVertically && visibleHorizontally;
  };

  _proto.shouldAutoPlay = function shouldAutoPlay() {
    return this.videoPlay === 'auto';
  };

  _proto.allowedLoop = function allowedLoop() {
    return this.videoLoop === true;
  };

  _proto.IdxExistsInVideoItems = function IdxExistsInVideoItems(idx) {
    return this.videoItems.some(function (item) {
      return item.idx === idx;
    });
  };

  return VideoScrollHelper;
}();

/* harmony default export */ __webpack_exports__["default"] = (VideoScrollHelper); // this.renderedPaddingMultiply = 2;
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

/***/ })

};;