import React from 'react';
import ReactDOM from 'react-dom';
import closeIcon from './icons/close.svg';
import { convertItemData } from 'wix-rich-content-plugin-gallery/dist/lib/convert-item-data';
import layouts from 'wix-rich-content-plugin-gallery/dist/lib/layout-data-provider';
import resizeMediaUrl from 'wix-rich-content-plugin-gallery/dist/lib/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';
// import { ProGallery } from 'pro-gallery';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery');

export default function Fullscreen(props) {
  const {
    locale,
    index,
    isOpen,
    onClose,
    target,
    backgroundColor,
    topMargin,
    foregroundColor,
  } = props;

  const getItems = () => {
    const { images, relValue, anchorTarget } = props;
    return convertItemData({ items: images, relValue, anchorTarget });
  };

  let fullscreen = (
    <div className={styles.fullscreen} style={{ ...backgroundColor, ...topMargin }}>
      <button className={styles.close} style={foregroundColor} onClick={() => onClose()}>
        {closeIcon()}
      </button>
      <ProGallery
        items={getItems()}
        locale={locale}
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

Fullscreen.propTypes = {
  images: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  foregroundColor: PropTypes.object,
  onClose: PropTypes.func,
  locale: PropTypes.string,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
};
