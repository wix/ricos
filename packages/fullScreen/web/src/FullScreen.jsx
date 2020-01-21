import React from 'react';
import ReactDOM from 'react-dom';
import closeIcon from './icons/close.svg';
import { convertItemData } from 'wix-rich-content-plugin-gallery/dist/lib/convert-item-data';
import layouts from 'wix-rich-content-plugin-gallery/dist/lib/layout-data-provider';
import resizeMediaUrl from 'wix-rich-content-plugin-gallery/dist/lib/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery');

export default function Fullscreen(props) {
  const { numberOfItems, locale, fullscreenIdx, isOpen, onClose, target } = props;

  const getItems = () => {
    const { items, relValue, anchorTarget } = props;
    return convertItemData({ items, relValue, anchorTarget });
  };

  const fullscreen = (
    <>
      {isOpen ? (
        <div className={styles.fullscreen}>
          <button className={styles.close} onClick={() => onClose()}>
            {closeIcon()}
          </button>
          <ProGallery
            items={getItems()}
            totalItemsCount={numberOfItems}
            locale={locale}
            currentIdx={fullscreenIdx}
            resizeMediaUrl={resizeMediaUrl}
            container={{
              width: window.innerWidth,
              height: window.innerHeight,
            }}
            styles={{
              ...layouts[5],
              galleryLayout: 5,
              slideshowInfoSize: 0,
              cubeType: 'fit',
              scrollSnap: true,
              videoPlay: 'onClick',
            }}
          />
        </div>
      ) : null}
    </>
  );

  return target ? ReactDOM.createPortal(fullscreen, target) : fullscreen;
}

Fullscreen.propTypes = {
  items: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  fullscreenIdx: PropTypes.number,
  numberOfItems: PropTypes.number,
  onClose: PropTypes.func,
  locale: PropTypes.string,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
};
