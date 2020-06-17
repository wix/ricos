import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { closeIcon, expandIcon, shrinkIcon } from './icons';
import layouts from 'wix-rich-content-plugin-gallery/dist/lib/layout-data-provider';
import resizeMediaUrl from 'wix-rich-content-plugin-gallery/dist/lib/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';
import fscreen from 'fscreen';

const { ProGallery } = require('pro-gallery');

export default class Fullscreen extends Component {
  constructor(props) {
    super(props);
    this.state =
      window.innerWidth > 640 ? this.getExpandModeAttributes() : this.getMobileAttributes();
  }

  static getDerivedStateFromProps(props, state) {
    const { index } = props;
    return index === state.currentIdx ? null : { ...state, index };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
    window.addEventListener('resize', this.updateDimensionsAndStyles);
    this.addFullscreenChangeListener();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
    window.removeEventListener('resize', this.updateDimensionsAndStyles);
    this.removeFullscreenChangeListener();
  }

  addFullscreenChangeListener = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.addEventListener('fullscreenchange', this.updateDimensionsAndStyles);
    }
  };

  removeFullscreenChangeListener = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.removeEventListener('fullscreenchange', this.updateDimensionsAndStyles);
    }
  };

  onEsc = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  toggleFullscreenMode = () => {
    const fullscreenMode = fscreen.fullscreenElement;
    if (fscreen.fullscreenEnabled) {
      fullscreenMode ? fscreen.exitFullscreen() : fscreen.requestFullscreen(this.ref);
    }
  };

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

  updateDimensionsAndStyles = () => {
    const fullscreenMode = fscreen.fullscreenElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 640) {
      this.setState(this.getMobileAttributes(width, height));
    } else if (fullscreenMode) {
      this.setState(this.getFullscreenAttributes(width));
    } else {
      this.setState(this.getExpandModeAttributes(width, height));
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
    const fullscreenMode = fscreen.fullscreenElement;
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

  handleGalleryEvents = (name, data) => {
    const { images } = this.props;
    const { currentIdx } = this.state;
    switch (name) {
      case 'CURRENT_ITEM_CHANGED':
        if (data === images[currentIdx - 1]) {
          this.setState({ currentIdx: currentIdx - 1 });
        } else {
          this.setState({ currentIdx: currentIdx + 1 });
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { isOpen, target, backgroundColor, topMargin, images } = this.props;
    const { currentIdx, width, height, style, styleParams } = this.state;
    let fullscreen = (
      <div ref={el => (this.ref = el)} style={{ ...backgroundColor, ...topMargin }} dir="ltr">
        {this.renderButtons()}
        <div className={style}>
          <ProGallery
            items={images}
            currentIdx={currentIdx}
            eventsListener={this.handleGalleryEvents}
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
