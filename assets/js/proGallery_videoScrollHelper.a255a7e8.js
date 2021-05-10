exports.ids = [6];
exports.modules = {

/***/ 1205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(324);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _scrollHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(137);



var VIDEO_EVENTS = {
    SCROLL: 'SCROLL',
    CLICKED: 'CLICKED',
    HOVERED: 'HOVERED',
    ENDED: 'ENDED',
    INIT_SCROLL: 'INIT_SCROLL',
};
var VideoScrollHelper = /** @class */ (function () {
    function VideoScrollHelper(config) {
        var _this = this;
        this.scrollBase = 0;
        this.videoItems = [];
        this.currentPlayingIdx = -1;
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
        this.trigger = Object.assign.apply(Object, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spreadArrays */ "f"])([{}], Object.keys(VIDEO_EVENTS).map(function (key) {
            var _a;
            return (_a = {},
                _a[key] = function (args) { return _this.handleEvent({ eventName: key, eventData: args }); },
                _a);
        })));
    }
    //--------------------------updates----------------------------------//
    VideoScrollHelper.prototype.updateGalleryStructure = function (_a) {
        var _this = this;
        var galleryStructure = _a.galleryStructure, scrollBase = _a.scrollBase, videoPlay = _a.videoPlay, videoLoop = _a.videoLoop, itemClick = _a.itemClick, oneRow = _a.oneRow;
        this.galleryWidth = pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getGalleryDimensions().galleryWidth;
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
        }
        else {
            var newItems = galleryStructure.galleryItems.slice(lastItemCount, //make sure this is the right way
            newItemCount);
            newItems.forEach(function (item) {
                if (item.type === 'video' ||
                    (item.type === 'image' &&
                        (item.id.includes('_placeholder') || item.isVideoPlaceholder))) {
                    // either video or a placeholder for video files (both need to be included in the list)
                    _this.videoItems.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, item), { videoPlayRating: item.idx }));
                }
            });
        }
    };
    //--------------------------triggers--------------------------------//
    VideoScrollHelper.prototype.handleEvent = function (_a) {
        var eventName = _a.eventName, eventData = _a.eventData;
        switch (eventName) {
            case VIDEO_EVENTS.SCROLL:
                this.onScroll(eventData);
                break;
            case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].events.ITEM_ACTION_TRIGGERED:
                //case VIDEO_EVENTS.clicked:
                this.itemClicked(eventData.idx);
                break;
            case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].events.HOVER_SET:
                //case VIDEO_EVENTS.hovered:
                this.itemHovered(eventData);
                break;
            case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].events.VIDEO_ENDED:
                //case VIDEO_EVENTS.ended:
                this.videoEnded(eventData.idx);
                break;
            case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].events.VIDEO_PLAYED:
                //case VIDEO_EVENTS.ended:
                this.videoPlayed(eventData.idx);
                break;
            case pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].events.VIDEO_ERROR:
                //case VIDEO_EVENTS.ended:
                this.videoErrorReported();
                break;
            case VIDEO_EVENTS.INIT_SCROLL:
                this.ScrollializePlayState();
                break;
            default:
        }
    };
    VideoScrollHelper.prototype.itemHovered = function (idx) {
        if (this.videoPlay !== 'hover')
            return;
        if (this.IdxExistsInVideoItems(idx)) {
            this.play(idx);
        }
        else {
            //do nothing
        }
    };
    VideoScrollHelper.prototype.itemClicked = function (idx) {
        if (this.videoPlay !== 'onClick')
            return;
        // if (this.itemClick !== 'nothing') return;
        if (this.IdxExistsInVideoItems(idx)) {
            if (this.currentPlayingIdx === idx) {
                this.stop();
            }
            else {
                this.play(idx);
            }
        }
        else {
            //do nothing
        }
    };
    VideoScrollHelper.prototype.onScroll = function (_a) {
        var _this = this;
        var top = _a.top, left = _a.left;
        this.top = top ? top : this.top;
        this.left = left ? left : this.left;
        if (this.currentPlayingIdx === -1) {
            this.autoPlayNextVideoByRating({ top: this.top, left: this.left });
        }
        else {
            if (!this.isCurrentVideoStillVisible({ top: this.top, left: this.left })) {
                this.stop(this.videoItems.findIndex(function (item) { return item.idx === _this.currentPlayingIdx; }));
            }
            this.autoPlayNextVideoByRating({ top: this.top, left: this.left });
        }
    };
    VideoScrollHelper.prototype.videoEnded = function (idx) {
        var indexInVideoItems = this.videoItems.findIndex(function (item) { return item.idx === idx; });
        this.stop(indexInVideoItems);
        var scroll = { top: this.top, left: this.left };
        this.autoPlayNextVideoByRating(scroll);
    };
    VideoScrollHelper.prototype.videoPlayed = function (idx) {
        this.lastVideoPlayed = idx;
    };
    VideoScrollHelper.prototype.videoErrorReported = function () {
        this.stop();
    };
    VideoScrollHelper.prototype.initializePlayState = function () {
        this.autoPlayNextVideoByRating({ top: this.top, left: this.left });
    };
    //-------------------------------controls------------------------------------//
    VideoScrollHelper.prototype.autoPlayNextVideoByRating = function (_a) {
        var _this = this;
        var top = _a.top, left = _a.left;
        if (!this.shouldAutoPlay()) {
            return;
        }
        var secondBestRating = {
            idx: -1,
            rating: Infinity,
        };
        var bestRating = {
            idx: -1,
            rating: Infinity,
        };
        this.videoItems.some(function (item) {
            if (_this.isVisible(item, { top: top, left: left })) {
                if (item.videoPlayRating <= bestRating.rating) {
                    secondBestRating.idx = bestRating.idx;
                    secondBestRating.rating = bestRating.rating;
                    bestRating.idx = item.idx;
                    bestRating.rating = item.videoPlayRating;
                }
                else if (item.videoPlayRating <= secondBestRating.rating) {
                    secondBestRating.idx = item.idx;
                    secondBestRating.rating = item.videoPlayRating;
                }
                return false;
            }
            else {
                if (bestRating.idx >= 0) {
                    return true;
                }
                return false;
            }
        });
        if (bestRating.idx >= 0) {
            if (!this.allowedLoop() && bestRating.idx === this.lastVideoPlayed) {
                if (secondBestRating.idx >= 0) {
                    this.play(secondBestRating.idx); //play 2nd in line instead. keep best rating for next by the score he got...
                }
                else {
                    return; //cant play same video twice.
                }
            }
            else {
                this.play(bestRating.idx);
            }
        }
        else {
            this.lastVideoPlayed = -2; //if there are no videos to play. we can reset this mechanism so that one-video galleries can keep playing the same video
        }
    };
    VideoScrollHelper.prototype.calculateCurrentItemPlacement = function () {
        var _this = this;
        return this.videoItems.findIndex(function (item) { return item.idx === _this.currentPlayingIdx; });
    };
    VideoScrollHelper.prototype.play = function (idx) {
        this.setPlayingIdx(idx);
        this.playing = true;
    };
    VideoScrollHelper.prototype.stop = function (indexInVideoItems) {
        if (indexInVideoItems >= 0) {
            this.videoItems[indexInVideoItems].videoPlayRating += 1337;
        }
        this.setPlayingIdx(-1);
        this.playing = false;
    };
    VideoScrollHelper.prototype.onPlayingIdxChange = function () {
        this.setPlayingVideos(this.currentPlayingIdx);
    };
    //-------------------------------get/set----------------------------------------//
    VideoScrollHelper.prototype.setPlayingIdx = function (idx) {
        if (this.currentPlayingIdx !== idx) {
            this.currentPlayingIdx = idx;
            this.onPlayingIdxChange();
        }
    };
    //-----------------------------Utils--------------------------------------------//
    VideoScrollHelper.prototype.isCurrentVideoStillVisible = function (_a) {
        var top = _a.top, left = _a.left;
        var currentItemPlacement = this.calculateCurrentItemPlacement();
        return this.isVisible(this.videoItems[currentItemPlacement], { top: top, left: left });
    };
    VideoScrollHelper.prototype.isVisible = function (item, _a) {
        var top = _a.top, left = _a.left;
        var target = {
            offsetTop: this.scrollBase || 0,
            scrollY: top,
            scrollLeft: left,
        };
        var videoPlayVerticalTolerance = (item.offset.top - item.offset.bottom) / 2;
        var videoPlayHorizontalTolerance = (item.offset.left - item.offset.right) / 2;
        var visibleVertically = Object(_scrollHelper__WEBPACK_IMPORTED_MODULE_4__[/* isWithinPaddingVertically */ "b"])({
            target: target,
            scrollBase: this.scrollBase,
            top: item.offset.top,
            bottom: item.offset.top + item.style.height,
            screenHeight: pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].innerHeight,
            padding: videoPlayVerticalTolerance,
        });
        var visibleHorizontally;
        if (!this.oneRow) {
            visibleHorizontally = true;
        }
        else {
            visibleHorizontally = Object(_scrollHelper__WEBPACK_IMPORTED_MODULE_4__[/* isWithinPaddingHorizontally */ "a"])({
                target: target,
                left: item.offset.left,
                right: item.offset.left + item.style.width,
                screenWidth: this.galleryWidth || (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].innerWidth),
                padding: videoPlayHorizontalTolerance,
            });
        }
        return visibleVertically && visibleHorizontally;
    };
    VideoScrollHelper.prototype.shouldAutoPlay = function () {
        return this.videoPlay === 'auto';
    };
    VideoScrollHelper.prototype.allowedLoop = function () {
        return this.videoLoop === true;
    };
    VideoScrollHelper.prototype.IdxExistsInVideoItems = function (idx) {
        return this.videoItems.some(function (item) { return item.idx === idx; });
    };
    return VideoScrollHelper;
}());
/* harmony default export */ __webpack_exports__["default"] = (VideoScrollHelper);
// this.renderedPaddingMultiply = 2;
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
//# sourceMappingURL=videoScrollHelper.js.map

/***/ })

};;