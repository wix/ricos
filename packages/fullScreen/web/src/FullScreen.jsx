import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { closeIcon, expandIcon, shrinkIcon } from './icons';
import layouts from 'wix-rich-content-plugin-gallery/libs/layout-data-provider';
import { fullscreenResizeMediaUrl } from 'wix-rich-content-plugin-gallery/libs/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';
import fscreen from 'fscreen';
import { convertItemData } from 'wix-rich-content-plugin-gallery/libs/convert-item-data';

const { ProGallery } = require('pro-gallery');

export default class Fullscreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isInFullscreen: false };
    // currentIdx shouldn't be saved in state to avoid rerender on item change
    this.currentIdx = -1;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
    window.addEventListener('resize', this.onWindowResize);
    this.addFullscreenChangeListener();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
    window.removeEventListener('resize', this.onWindowResize);
    this.removeFullscreenChangeListener();
  }

  addFullscreenChangeListener = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.addEventListener('fullscreenchange', this.onFullscreenChange);
    }
  };

  removeFullscreenChangeListener = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.removeEventListener('fullscreenchange', this.onFullscreenChange);
    }
  };

  onWindowResize = () => this.forceUpdate();

  onFullscreenChange = () => this.setState({ isInFullscreen: !!fscreen.fullscreenElement });

  onEsc = event => {
    if (event.key === 'Escape') {
      this.onClose();
    }
  };

  toggleFullscreenMode = () => {
    const { isInFullscreen } = this.state;
    if (fscreen.fullscreenEnabled) {
      isInFullscreen ? fscreen.exitFullscreen() : fscreen.requestFullscreen(document.body);
    }
  };

  getStyleParams = () => {
    const { isInFullscreen } = this.state;
    let arrowsPosition = 0;
    let slideshowInfoSize = 0;
    if (this.props.isMobile) {
      slideshowInfoSize = 154;
    } else if (!isInFullscreen) {
      arrowsPosition = 1;
      slideshowInfoSize = 142;
    }
    return { arrowsPosition, slideshowInfoSize };
  };

  onClose = () => {
    if (this.state.isInFullscreen) {
      this.toggleFullscreenMode();
    }
    this.currentIdx = -1;
    this.props.onClose();
  };

  renderCloseButton = () => {
    const { foregroundColor } = this.props;
    return (
      <button
        className={styles.close}
        style={foregroundColor}
        onClick={() => this.onClose()}
        aria-label={'Close'}
        data-hook={'fullscreen-close-button'}
      >
        {closeIcon()}
      </button>
    );
  };

  renderFullscreenToggleButton = () => {
    const { isInFullscreen } = this.state;
    const { foregroundColor } = this.props;
    const icon = isInFullscreen ? shrinkIcon : expandIcon;
    const ariaLabel = isInFullscreen ? 'Shrink' : 'Expand';
    return (
      <button
        className={styles.expand_button}
        style={foregroundColor}
        onClick={this.toggleFullscreenMode}
        aria-label={ariaLabel}
        data-hook={'fullscreen-toggle-button'}
      >
        {icon()}
      </button>
    );
  };

  handleGalleryEvents = (name, data) => {
    if (name === 'CURRENT_ITEM_CHANGED') {
      const { images, index } = this.props;
      if (this.currentIdx !== -1) {
        // the new item must be either left or right to the previous item
        // needs to be removed once PG allows tracking current item index
        if (this.currentIdx > 0 && images[this.currentIdx - 1].itemId === data.itemId) {
          this.currentIdx -= 1;
        } else {
          this.currentIdx += 1;
        }
      } else {
        this.currentIdx = index;
      }
    }
  };

  getItems() {
    const { images } = this.props;
    return convertItemData({ items: images });
  }

  infoElement = itemProps => {
    return (
      <div className={styles.info_container}>
        <div className={styles.title}>{itemProps.title}</div>
      </div>
    );
  };

  render() {
    const { isOpen, target, backgroundColor, topMargin, isMobile, index } = this.props;
    const { isInFullscreen } = this.state;
    const { arrowsPosition, slideshowInfoSize } = this.getStyleParams();
    const width = isInFullscreen || isMobile ? window.innerWidth : window.innerWidth - 14;
    const height = isInFullscreen ? window.screen.height : window.innerHeight;
    const items = this.getItems();
    let fullscreen = (
      <div
        style={{ ...backgroundColor, ...topMargin }}
        dir="ltr"
        data-hook={'fullscreen-root'}
        className={isInFullscreen ? styles.fullscreen_mode : styles.expand_mode}
      >
        {this.renderCloseButton()}
        {!isMobile && this.renderFullscreenToggleButton()}
        <ProGallery
          items={items}
          currentIdx={this.currentIdx === -1 ? index : this.currentIdx}
          eventsListener={this.handleGalleryEvents}
          resizeMediaUrl={fullscreenResizeMediaUrl}
          container={{ width, height }}
          styles={{
            ...layouts[5],
            galleryLayout: 5,
            cubeType: 'fit',
            scrollSnap: true,
            videoPlay: 'auto',
            allowSocial: false,
            loveButton: false,
            allowTitle: true,
            defaultShowInfoExpand: 1,
            showArrows: !isMobile,
            arrowsPosition,
            slideshowInfoSize,
          }}
          customSlideshowInfoRenderer={this.infoElement}
        />
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
  isMobile: PropTypes.bool,
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  foregroundColor: PropTypes.object,
  onClose: PropTypes.func,
  target: PropTypes.elementType,
};
