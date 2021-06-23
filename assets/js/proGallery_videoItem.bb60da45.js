exports.ids = [5];
exports.modules = {

/***/ 1222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _galleryComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);




var VideoItem = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "c"])(VideoItem, _super);
    function VideoItem(props) {
        var _this = _super.call(this, props) || this;
        _this.pause = _this.pause.bind(_this);
        _this.play = _this.play.bind(_this);
        _this.playVideoIfNeeded = _this.playVideoIfNeeded.bind(_this);
        _this.state = {
            playedOnce: false,
            loadVideo: props.loadVideo || props.playing,
            playing: false,
            reactPlayerLoaded: false,
            vimeoPlayerLoaded: false,
            hlsPlayerLoaded: false,
        };
        return _this;
    }
    VideoItem.prototype.componentDidMount = function () {
        this.dynamiclyImportVideoPlayers();
    };
    VideoItem.prototype.dynamiclyImportVideoPlayers = function () {
        var _this = this;
        if (!(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].ReactPlayer)) {
            __webpack_require__.e(/* import() | proGallery_reactPlayer */ 4).then(__webpack_require__.t.bind(null, 1200, 7)).then(function (ReactPlayer) {
                pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].ReactPlayer = ReactPlayer.default;
                _this.setState({ reactPlayerLoaded: true });
                _this.playVideoIfNeeded();
            });
        }
        if (
        //Vimeo player must be loaded by us, problem with requireJS
        !(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Vimeo) &&
            this.props.videoUrl &&
            this.props.videoUrl.includes('vimeo.com')) {
            __webpack_require__.e(/* import() | proGallery_vimeoPlayer */ 7).then(__webpack_require__.bind(null, 1217)).then(function (Player) {
                pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Vimeo = { Player: Player.default };
                _this.setState({ vimeoPlayerLoaded: true });
                _this.playVideoIfNeeded();
            });
        }
        if (
        //Hls player must be loaded by us, problem with requireJS
        !(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Hls) &&
            this.isHLSVideo()) {
            __webpack_require__.e(/* import() | proGallery_HlsPlayer */ 3).then(__webpack_require__.t.bind(null, 1218, 7)).then(function (Player) {
                pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Hls = Player.default;
                _this.setState({ hlsPlayerLoaded: true });
                _this.playVideoIfNeeded();
            });
        }
    };
    VideoItem.prototype.isHLSVideo = function () {
        return (this.props.videoUrl &&
            (this.props.videoUrl.includes('/hls') ||
                this.props.videoUrl.includes('.m3u8')));
    };
    VideoItem.prototype.shouldUseHlsPlayer = function () {
        return this.isHLSVideo() && !pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isiOS();
    };
    VideoItem.prototype.shouldForceVideoForHLS = function () {
        return this.isHLSVideo() && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isiOS();
    };
    VideoItem.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.playing || nextProps.firstUserInteractionExecuted) {
            this.setState({ loadVideo: true });
        }
        this.playVideoIfNeeded(nextProps);
    };
    VideoItem.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.currentIdx !== this.props.currentIdx) {
            this.fixIFrameTabIndexIfNeeded();
        }
        if (prevProps.type === 'image' && this.props.type === 'video') {
            this.dynamiclyImportVideoPlayers();
        }
        this.playVideoIfNeeded();
    };
    VideoItem.prototype.play = function () {
        this.props.playVideo(this.props.idx);
    };
    VideoItem.prototype.pause = function () {
        this.props.pauseVideo();
    };
    VideoItem.prototype.playVideoIfNeeded = function (props) {
        if (props === void 0) { props = this.props; }
        try {
            var playingVideoIdx = props.playingVideoIdx;
            if (playingVideoIdx === this.props.idx && !this.isPlaying) {
                this.videoElement =
                    this.videoElement ||
                        pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].document.querySelector("#video-" + this.props.id + " video");
                if (this.videoElement) {
                    this.isPlaying = true;
                    this.videoElement.play();
                    pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isVerbose() &&
                        console.log('[VIDEO] Playing video #' + this.props.idx, this.videoElement);
                }
            }
        }
        catch (e) {
            console.error('[VIDEO] Could not play video #' + this.props.idx, this.videoElement, e);
        }
    };
    //-----------------------------------------| UTILS |--------------------------------------------//
    VideoItem.prototype.createPlayerElement = function () {
        var _a;
        var _this = this;
        //video dimensions are for videos in grid fill - placing the video with negative margins to crop into a square
        if (!(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"] &&
            pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].ReactPlayer &&
            (this.state.loadVideo || this.props.playing))) {
            return null;
        }
        var PlayerElement = pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].ReactPlayer;
        var isWiderThenContainer = this.props.style.ratio >= this.props.cubeRatio;
        // adding 1 pixel to compensate for the difference we have sometimes from layouter in grid fill
        var videoDimensionsCss = {
            width: isWiderThenContainer ? 'calc(100% + 1px)' : 'auto',
            height: isWiderThenContainer ? 'auto' : 'calc(100% + 1px)',
        };
        if (this.props.styleParams.cubeImages &&
            this.props.styleParams.cubeType === 'fill') {
            //grid crop mode
            _a = [
                videoDimensionsCss.height,
                videoDimensionsCss.width,
            ], videoDimensionsCss.width = _a[0], videoDimensionsCss.height = _a[1];
            videoDimensionsCss.position = 'absolute';
            videoDimensionsCss.margin = 'auto';
            videoDimensionsCss.minHeight = '100%';
            videoDimensionsCss.minWidth = '100%';
            videoDimensionsCss.left = '-100%';
            videoDimensionsCss.right = '-100%';
            videoDimensionsCss.top = '-100%';
            videoDimensionsCss.bottom = '-100%';
        }
        var url = this.props.videoUrl
            ? this.props.videoUrl
            : this.props.createUrl(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].urlSizes.RESIZED, pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].urlTypes.VIDEO);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PlayerElement, { className: 'gallery-item-visible video gallery-item', id: "video-" + this.props.id, width: "100%", height: "100%", url: url, alt: this.props.alt ? this.props.alt : 'untitled video', loop: !!this.props.styleParams.videoLoop, ref: function (player) { return (_this.video = player); }, volume: this.props.styleParams.videoSound ? 0.8 : 0, playing: this.props.playing, onEnded: function () {
                _this.setState({ playing: false });
                _this.props.actions.eventsListener(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].events.VIDEO_ENDED, _this.props);
            }, onPause: function () {
                _this.setState({ playing: false });
            }, onError: function (e) {
                _this.props.actions.eventsListener(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].events.VIDEO_ERROR, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, _this.props), { videoError: e }));
            }, playbackRate: Number(this.props.styleParams.videoSpeed) || 1, onProgress: function () {
                if (!_this.state.playedOnce) {
                    _this.setState({ playedOnce: true });
                }
            }, onPlay: function () {
                _this.props.actions.eventsListener(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].events.VIDEO_PLAYED, _this.props);
                _this.setState({ playing: true });
            }, onReady: function () {
                _this.playVideoIfNeeded();
                _this.fixIFrameTabIndexIfNeeded();
                _this.props.actions.setItemLoaded();
                _this.setState({ ready: true });
            }, controls: this.props.styleParams.showVideoControls, config: {
                file: {
                    attributes: {
                        controlsList: 'nodownload',
                        disablepictureinpicture: 'true',
                        muted: !this.props.styleParams.videoSound,
                        preload: 'metadata',
                        poster: this.props.createUrl(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].urlSizes.SCALED, pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].urlTypes.HIGH_RES),
                        style: videoDimensionsCss,
                        type: 'video/mp4',
                    },
                    forceHLS: this.shouldUseHlsPlayer(),
                    forceVideo: this.shouldForceVideoForHLS(),
                },
            }, key: 'video-' + this.props.id }));
    };
    VideoItem.prototype.fixIFrameTabIndexIfNeeded = function () {
        if (this.props.isExternalVideo) {
            var videoGalleryItem = pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].document &&
                pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].document.getElementById("video-" + this.props.id);
            var videoIFrames = videoGalleryItem && videoGalleryItem.getElementsByTagName('iframe');
            var videoIFrame = videoIFrames && videoIFrames[0];
            if (videoIFrame) {
                if (this.props.currentIdx === this.props.idx) {
                    videoIFrame.setAttribute('tabIndex', '0');
                }
                else {
                    videoIFrame.setAttribute('tabIndex', '-1');
                }
            }
        }
    };
    //-----------------------------------------| RENDER |--------------------------------------------//
    VideoItem.prototype.render = function () {
        var _a = this.props, videoPlaceholder = _a.videoPlaceholder, hover = _a.hover;
        var baseClassName = 'gallery-item-content gallery-item-visible gallery-item-preloaded gallery-item-video gallery-item video-item' +
            (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isiPhone() ? ' ios' : '');
        if (this.state.playing) {
            baseClassName += ' playing';
        }
        if (this.state.playedOnce && this.state.ready) {
            baseClassName += ' playedOnce';
        }
        // eslint-disable-next-line no-unused-vars
        var _b = this.props.imageDimensions || {}, marginLeft = _b.marginLeft, marginTop = _b.marginTop, restOfDimensions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "e"])(_b, ["marginLeft", "marginTop"]);
        var video = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: baseClassName, "data-hook": "video_container-video-player-element", key: 'video_container-' + this.props.id, style: pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].deviceHasMemoryIssues() || this.state.ready
                ? { backgroundColor: 'black' }
                : Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({ backgroundImage: "url(" + this.props.createUrl(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].urlSizes.RESIZED, pro_gallery_lib__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].urlTypes.HIGH_RES) + ")" }, restOfDimensions) },
            this.createPlayerElement(),
            this.props.videoControls));
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { key: 'video-and-hover-container' + this.props.idx }, [video, videoPlaceholder, hover]));
    };
    return VideoItem;
}(_galleryComponent__WEBPACK_IMPORTED_MODULE_5__[/* GalleryComponent */ "a"]));
/* harmony default export */ __webpack_exports__["default"] = (VideoItem);
//# sourceMappingURL=videoItem.js.map

/***/ })

};;