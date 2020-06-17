import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { closeIcon, expandIcon, shrinkIcon } from './icons';
import { convertItemData } from 'wix-rich-content-plugin-gallery/dist/lib/convert-item-data';
import layouts from 'wix-rich-content-plugin-gallery/dist/lib/layout-data-provider';
import resizeMediaUrl from 'wix-rich-content-plugin-gallery/dist/lib/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';

const { ProGallery } = require('pro-gallery');

export default class Fullscreen extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreenMode: false };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
    this.addFullscreenChangeListener();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
    this.removeFullscreenChangeListener();
  }

  addFullscreenChangeListener = () => {
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.onFullscreenChange);
  };

  removeFullscreenChangeListener = () => {
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.onFullscreenChange);
  };

  onFullscreenChange = () => {
    const { fullscreenMode } = this.state;
    if (
      !window.document.fullscreenElement &&
      !window.document.webkitIsFullScreen &&
      !window.document.mozFullScreen &&
      !window.document.msFullscreenElement
    ) {
      if (fullscreenMode) {
        this.setState({ fullscreenMode: false });
      }
    } else if (!fullscreenMode) {
      this.setState({ fullscreenMode: true });
    }
  };

  onEsc = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  getItems = () => {
    const { images } = this.props;
    return convertItemData({ items: images });
  };

  closeFullscreen = () => {
    document.exitFullscreen?.() ||
      document.mozCancelFullScreen?.() ||
      document.webkitExitFullScreen?.() ||
      document.msExitFullscreen?.();
  };

  openFullscreen = () => {
    this.ref.requestFullscreen?.() ||
      this.ref.mozRequestFullScreen?.() ||
      this.ref.webkitRequestFullScreen?.() ||
      this.ref.msRequestFullscreen?.();
  };

  toggleFullscreenMode = () =>
    this.state.fullscreenMode ? this.closeFullscreen() : this.openFullscreen();

  getMobileAttributes = (width, height) => {
    return {
      width,
      height,
      style: styles.expand_mode,
      styleParams: { showArrows: false, arrowsPosition: 0, slideshowInfoSize: 154 },
    };
  };

  getFullscreenAttributes = width => {
    return {
      width,
      height: window.screen.height,
      style: styles.fullscreen_mode,
      styleParams: { showArrows: true, arrowsPosition: 0, slideshowInfoSize: 0 },
    };
  };

  getExpandModeAttributes = (width, height) => {
    return {
      width: width - 14,
      height,
      style: styles.expand_mode,
      styleParams: { showArrows: true, arrowsPosition: 1, slideshowInfoSize: 142 },
    };
  };

  getDimensionsAndStyles = () => {
    const { fullscreenMode } = this.state;
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 640) {
      return this.getMobileAttributes(width, height);
    } else if (fullscreenMode) {
      return this.getFullscreenAttributes(width);
    } else {
      return this.getExpandModeAttributes(width, height);
    }
  };

  onClose = fullscreenMode => {
    const { onClose } = this.props;
    if (fullscreenMode) {
      this.toggleFullscreenMode();
    }
    onClose();
  };

  renderButtons = () => {
    const { fullscreenMode } = this.state;
    const icon = fullscreenMode ? shrinkIcon : expandIcon;
    const ariaLabel = fullscreenMode ? 'fullscreen-shrink-button' : 'fullscreen-expand-button';
    const { foregroundColor } = this.props;
    return (
      <Fragment>
        <button
          className={styles.close}
          style={foregroundColor}
          onClick={() => this.onClose(fullscreenMode)}
          aria-label={'fullscreen-close-button'}
        >
          {closeIcon()}
        </button>
        {window.innerWidth > 640 && (
          <button
            className={styles.expand_button}
            style={foregroundColor}
            onClick={this.toggleFullscreenMode}
            aria-label={ariaLabel}
          >
            {icon()}
          </button>
        )}
      </Fragment>
    );
  };

  render() {
    const { index, isOpen, target, backgroundColor, topMargin } = this.props;
    const items = this.getItems();
    const { width, height, style, styleParams } = this.getDimensionsAndStyles();
    let fullscreen = (
      <div ref={el => (this.ref = el)} style={{ ...backgroundColor, ...topMargin }} dir="ltr">
        {this.renderButtons()}
        <div className={style}>
          <ProGallery
            items={items}
            currentIdx={index}
            resizeMediaUrl={resizeMediaUrl}
            container={{
              width,
              height,
            }}
            styles={{
              ...layouts[5],
              galleryLayout: 5,
              cubeType: 'fit',
              scrollSnap: true,
              videoPlay: 'auto',
              allowSocial: false,
              loveButton: false,
              allowTitle: true,
              ...styleParams,
            }}
          />
        </div>
      </div>
    );

    if (target) {
      fullscreen = ReactDOM.createPortal(fullscreen, target);
    }

    return isOpen ? fullscreen : null;
  }
}

Fullscreen.propTypes = {
  images: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  foregroundColor: PropTypes.object,
  onClose: PropTypes.func,
  target: PropTypes.elementType,
};
