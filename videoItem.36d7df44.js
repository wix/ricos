exports.ids = [3];
exports.modules = {

/***/ 1204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43);
/* harmony import */ var _galleryComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33);
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var VideoItem = /*#__PURE__*/function (_GalleryComponent) {
  _inheritsLoose(VideoItem, _GalleryComponent);

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

    if (!(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].ReactPlayer)) {
      __webpack_require__.e(/* import() | reactPlayer */ 2).then(__webpack_require__.t.bind(null, 1184, 7)).then(function (ReactPlayer) {
        pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].ReactPlayer = ReactPlayer["default"];

        _this2.setState({
          reactPlayerLoaded: true
        });

        _this2.playVideoIfNeeded();
      });
    }

    if ( //Vimeo player must be loaded by us, problem with requireJS
    !(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Vimeo) && this.props.videoUrl && this.props.videoUrl.includes('vimeo.com')) {
      __webpack_require__.e(/* import() | vimeoPlayer */ 5).then(__webpack_require__.bind(null, 1201)).then(function (Player) {
        pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Vimeo = {
          Player: Player["default"]
        };

        _this2.setState({
          vimeoPlayerLoaded: true
        });

        _this2.playVideoIfNeeded();
      });
    }

    if ( //Hls player must be loaded by us, problem with requireJS
    !(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Hls) && this.isHLSVideo()) {
      __webpack_require__.e(/* import() | HlsPlayer */ 0).then(__webpack_require__.t.bind(null, 1202, 7)).then(function (Player) {
        pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Hls = Player["default"];

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
    return this.isHLSVideo() && !pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isiOS();
  };

  _proto.shouldForceVideoForHLS = function shouldForceVideoForHLS() {
    return this.isHLSVideo() && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isiOS();
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

    if (prevProps.type === 'image' && this.props.type === "video") {
      this.dynamiclyImportVideoPlayers();
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
        this.videoElement = this.videoElement || pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].document.querySelector("#video-" + this.props.id + " video");

        if (this.videoElement) {
          this.isPlaying = true;
          this.videoElement.play();
          pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isVerbose() && console.log('[VIDEO] Playing video #' + this.props.idx, this.videoElement);
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
    if (!(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].ReactPlayer)) {
      return null;
    }

    var PlayerElement = pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].ReactPlayer;
    var isWiderThenContainer = this.props.style.ratio >= this.props.cubeRatio;
    var videoDimensionsCss = {
      width: isWiderThenContainer ? '100%' : 'auto',
      height: isWiderThenContainer ? 'auto' : '100%'
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

    var url = this.props.videoUrl ? this.props.videoUrl : this.props.createUrl(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].urlSizes.RESIZED, pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].urlTypes.VIDEO);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PlayerElement, {
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

        _this3.props.actions.eventsListener(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].events.VIDEO_ENDED, _this3.props);
      },
      onPause: function onPause() {
        _this3.setState({
          playing: false
        });
      },
      onError: function onError(e) {
        _this3.props.actions.eventsListener(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].events.VIDEO_ERROR, _objectSpread(_objectSpread({}, _this3.props), {}, {
          videoError: e
        }));
      },
      playbackRate: Number(this.props.styleParams.videoSpeed) || 1,
      onPlay: function onPlay() {
        _this3.props.actions.eventsListener(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].events.VIDEO_PLAYED, _this3.props);

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
            poster: this.props.createUrl(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].urlSizes.RESIZED, pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].urlTypes.HIGH_RES),
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
      var videoGalleryItem = pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].document && pro_gallery_lib__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].document.getElementById("video-" + this.props.id);
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
  } //-----------------------------------------| RENDER |--------------------------------------------//
  ;

  _proto.render = function render() {
    var hover = this.props.hover;
    var baseClassName = 'gallery-item-content gallery-item-visible gallery-item-preloaded gallery-item-video gallery-item video-item' + (pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isiPhone() ? ' ios' : '');

    if (this.state.playing) {
      baseClassName += ' playing';
    }

    var videoPreloader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pro-circle-preloader",
      key: 'video-preloader-' + this.props.idx
    });

    var _ref2 = this.props.imageDimensions || {},
        marginLeft = _ref2.marginLeft,
        marginTop = _ref2.marginTop,
        restOfDimensions = _objectWithoutPropertiesLoose(_ref2, ["marginLeft", "marginTop"]);

    var video = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: baseClassName + ' animated fadeIn ',
      "data-hook": "video_container-video-player-element",
      key: 'video_container-' + this.props.id,
      style: pro_gallery_lib__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].deviceHasMemoryIssues() || this.state.ready ? {
        backgroundColor: 'black'
      } : _objectSpread({
        backgroundImage: "url(" + this.props.createUrl(pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].urlSizes.RESIZED, pro_gallery_lib__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].urlTypes.HIGH_RES) + ")"
      }, restOfDimensions)
    }, this.createPlayerElement(), this.props.videoControls, videoPreloader);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: 'video-and-hover-container' + this.props.idx
    }, [video, hover]);
  };

  return VideoItem;
}(_galleryComponent__WEBPACK_IMPORTED_MODULE_4__[/* GalleryComponent */ "a"]);

/* harmony default export */ __webpack_exports__["default"] = (VideoItem);

/***/ })

};;