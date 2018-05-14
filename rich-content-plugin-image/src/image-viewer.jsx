import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { mergeStyles, ImageLoader } from 'wix-rich-content-common';
import getImageSrc from './get-image-source';
import styles from './default-image-styles.scss';

const getDefault = () => ({
  config: {
    alignment: 'center',
    size: 'content',
    showTitle: true,
    showDescription: true,
  },
});

class ImageViewer extends React.Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {};
  }

  getImageSrc(src) {
    const { helpers } = this.props;

    if (!src && (helpers && helpers.handleFileSelection)) {
      return null;
    }

    const imageUrl = {
      preload: '',
      highres: ''
    };

    if (this.props.dataUrl) {
      imageUrl.preload = imageUrl.highres = this.props.dataUrl;
    } else {
      let options = {};
      //do not render webp on preload - the SSR never renders webp and the same format should be kept
      imageUrl.preload = getImageSrc(src, helpers, { allowWebp: false });
      if (this.state.container) {
        const { width } = this.state.container.getBoundingClientRect();
        let requiredWidth = width || src.width || 1;
        if (this.props.isMobile) {
          //adjust the image width to viewport scaling and device pixel ratio
          requiredWidth *= (window && window.devicePixelRatio) || 1;
          requiredWidth *= (window && (window.screen.width / document.body.clientWidth)) || 1;
        }
        //keep the image's original ratio
        let requiredHeight = (src.height && src.width) ? Math.ceil((src.height / src.width) * requiredWidth) : 2048;
        const requiredQuality = 90;
        requiredWidth = Math.ceil(requiredWidth);
        requiredHeight = Math.ceil(requiredHeight);
        options = { requiredWidth, requiredHeight, requiredQuality };
        imageUrl.highres = getImageSrc(src, helpers, options);
      }
    }

    if (!imageUrl.preload) {
      console.error(`image plugin mounted with invalid image source!`, src); //eslint-disable-line no-console
    }

    return imageUrl;
  }

  renderImage(imageClassName, imageSrc, alt, props) {
    return [
      <img key="preload" className={classNames(imageClassName, this.styles.imagePreload)} src={imageSrc.preload} alt={alt} />,
      <img
        {...props} key="highres" className={classNames(imageClassName, this.styles.imageHighres)} src={imageSrc.highres} alt={alt}
        onLoad={e => e.target.style.opacity = 1}
      />
    ];
  }

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }
    return <div className={this.styles.imageOverlay}><ImageLoader type={'medium'} theme={this.props.theme} /></div>;
  }

  renderTitle(data, styles) {
    const config = data.config || {};
    return !!config.showTitle && <div className={classNames(styles.imageTitle)}>{(data && data.title) || ''}</div>;
  }

  renderDescription(data, styles) {
    const config = data.config || {};
    return !!config.showDescription &&
      <div className={classNames(styles.imageDescription)}>{(data && data.description) || ''}</div>;
  }

  renderCaption(caption, isFocused, readOnly, styles, t) {
    const defaultCaption = t('ImageViewer_Caption');

    return (
      caption ?
        <div className={styles.imageCaption} data-hook="imageViewerCaption">{caption}</div> :
        (!readOnly && isFocused) && <div className={styles.imageCaption}>{defaultCaption}</div>
    );
  }

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  handleRef = e => {
    if (!this.state.container) {
      this.setState({ container: e }); //saving the container on the state to trigger a new render
    }
  };

  render() {
    const { styles } = this;
    const { componentData, className, onClick, isFocused, readOnly, settings, t } = this.props;
    const data = componentData || getDefault();
    data.config = data.config || {};
    const { metadata = {} } = componentData;
    const shouldRenderCaption = !includes(get(settings, 'toolbar.hidden'), 'settings') &&
      data.config.size !== 'original' &&
      data.config.alignment !== 'left' &&
      data.config.alignment !== 'right';

    const itemClassName = classNames(styles.imageContainer, className);
    const imageClassName = classNames(styles.image);
    const imageSrc = this.getImageSrc(data.src);
    const imageProps = data.src && isFunction(settings.imageProps) ? settings.imageProps(data.src) : settings.imageProps;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="imageViewer" onClick={onClick} className={itemClassName} onKeyDown={e => this.onKeyDown(e, onClick)}
        ref={e => this.handleRef(e)}
      >
        <div className={styles.imageWrapper}>
          {imageSrc && this.renderImage(imageClassName, imageSrc, metadata.alt, imageProps)}
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, styles)}
        {this.renderDescription(data, styles)}
        {shouldRenderCaption && this.renderCaption(metadata.caption, isFocused, readOnly, styles, t)}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

ImageViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  dataUrl: PropTypes.string,
  isFocused: PropTypes.bool,
  readOnly: PropTypes.bool,
  isMobile: PropTypes.bool,
  settings: PropTypes.object,
  t: PropTypes.func,
};

export { ImageViewer, getDefault };
