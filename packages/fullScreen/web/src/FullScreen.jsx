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
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.onFullscreenChange);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.onFullscreenChange);
  }

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

  toggleFullscreenMode = () => {
    const { fullscreenMode } = this.state;
    if (fullscreenMode) {
      document.exitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.webkitExitFullScreen?.() ||
        document.msExitFullscreen?.();
    } else {
      this.ref.requestFullscreen?.() ||
        this.ref.mozRequestFullScreen?.() ||
        this.ref.webkitRequestFullScreen?.() ||
        this.ref.msRequestFullscreen?.();
    }
  };

  getExpandModeDimensions = () => {
    // This is for adjusting the image size properly for small screens.
    let expandWidth = window.innerWidth;
    let expandSlideshowInfoSize = 154;
    if (window.innerWidth > 640) {
      expandWidth -= 40;
      expandSlideshowInfoSize = 140;
    }
    return { expandWidth, expandSlideshowInfoSize };
  };

  getDimensionsAndStyles = () => {
    const { fullscreenMode } = this.state;
    let width = window.innerWidth;
    let height = window.screen.height;
    let slideshowInfoSize = 0;
    let style = styles.fullscreen_mode;
    if (!fullscreenMode) {
      const { expandWidth, expandSlideshowInfoSize } = this.getExpandModeDimensions();
      height = window.innerHeight;
      width = expandWidth;
      slideshowInfoSize = expandSlideshowInfoSize;
      style = styles.expand_mode;
    }
    return { width, height, slideshowInfoSize, style };
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
    let icon;
    let ariaLabel;

    if (fullscreenMode) {
      icon = shrinkIcon;
      ariaLabel = 'fullscreen-shrink-button';
    } else {
      icon = expandIcon;
      ariaLabel = 'fullscreen-expand-button';
    }
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
        <button
          className={styles.expand_button}
          style={foregroundColor}
          onClick={this.toggleFullscreenMode}
          aria-label={ariaLabel}
        >
          {icon()}
        </button>
      </Fragment>
    );
  };

  render() {
    const { index, isOpen, target, backgroundColor, topMargin } = this.props;
    const items = this.getItems();
    const { width, height, slideshowInfoSize, style } = this.getDimensionsAndStyles();
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
              slideshowInfoSize,
              allowTitle: true,
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
