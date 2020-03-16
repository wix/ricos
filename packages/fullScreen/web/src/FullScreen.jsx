import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import closeIcon from './icons/close.svg';
import { convertItemData } from 'wix-rich-content-plugin-gallery/dist/lib/convert-item-data';
import layouts from 'wix-rich-content-plugin-gallery/dist/lib/layout-data-provider';
import resizeMediaUrl from 'wix-rich-content-plugin-gallery/dist/lib/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery');

export default class Fullscreen extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
  }

  onEsc = event => {
    event.preventDefault;
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  getItems = () => {
    const { images } = this.props;
    return convertItemData({ items: images });
  };

  render() {
    const {
      index,
      isOpen,
      onClose,
      target,
      backgroundColor,
      topMargin,
      foregroundColor,
    } = this.props;
    let fullscreen = (
      <div className={styles.fullscreen} style={{ ...backgroundColor, ...topMargin }}>
        <button
          className={styles.close}
          style={foregroundColor}
          onClick={() => onClose()}
          data-hook={'fullscreen-close-button'}
        >
          {closeIcon()}
        </button>
        <ProGallery
          items={this.getItems()}
          currentIdx={index}
          resizeMediaUrl={resizeMediaUrl}
          container={{ width: window.innerWidth, height: window.innerHeight }}
          styles={{
            ...layouts[5],
            galleryLayout: 5,
            slideshowInfoSize: 0,
            cubeType: 'fit',
            scrollSnap: true,
            videoPlay: 'auto',
            allowSocial: false,
          }}
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
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  foregroundColor: PropTypes.object,
  onClose: PropTypes.func,
  target: PropTypes.instanceOf(Element),
};
