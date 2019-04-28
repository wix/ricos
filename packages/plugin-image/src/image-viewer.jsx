import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { mergeStyles, Loader, validate, Context } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import getImageSrc from './get-image-source';
import { WIX_MEDIA_DEFAULT } from './get-wix-media-url';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/image-viewer.scss';

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
    validate(props.componentData, schema);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }
  getImageSrc(src) {
    const { helpers } = this.context || {};

    if (!src && (helpers && helpers.handleFileSelection)) {
      return null;
    }

    const imageUrl = {
      preload: '',
      highres: '',
    };

    if (this.props.dataUrl) {
      imageUrl.preload = imageUrl.highres = this.props.dataUrl;
    } else {
      imageUrl.preload = getImageSrc(src, helpers);
      if (this.state.container) {
        const { width } = this.state.container.getBoundingClientRect();
        let requiredWidth = width || src.width || 1;
        if (this.context.isMobile) {
          //adjust the image width to viewport scaling and device pixel ratio
          requiredWidth *= (window && window.devicePixelRatio) || 1;
          requiredWidth *= (window && window.screen.width / document.body.clientWidth) || 1;
        }
        //keep the image's original ratio
        let requiredHeight =
          src.height && src.width
            ? Math.ceil((src.height / src.width) * requiredWidth)
            : WIX_MEDIA_DEFAULT.SIZE;
        requiredWidth = Math.ceil(requiredWidth);
        requiredHeight = Math.ceil(requiredHeight);

        imageUrl.highres = getImageSrc(src, helpers, {
          requiredWidth,
          requiredHeight,
          requiredQuality: 90,
          imageType: 'highRes',
        });
      }
    }

    if (this._isMounted && !imageUrl.preload) {
      console.error(`image plugin mounted with invalid image source!`, src); //eslint-disable-line no-console
    }

    return imageUrl;
  }

  onHighResLoad = e => {
    e.target.style.opacity = 1;
    this.preloadImage && (this.preloadImage.style.opacity = 0);
  };

  onImageLoadError = () => {
    const {
      componentData: { src },
    } = this.props;

    if (src && src.fallback) {
      this.setState({
        fallbackImageSrc: {
          preload: src.fallback,
          highres: src.fallback,
        },
      });
    }
  };

  renderImage(imageClassName, imageSrc, alt, props) {
    return [
      <img
        key="preload"
        ref={ref => (this.preloadImage = ref)}
        className={classNames(imageClassName, this.styles.imagePreload)}
        src={imageSrc.preload}
        alt={alt}
        onError={this.onImageLoadError}
      />,
      <img
        {...props}
        key="highres"
        className={classNames(imageClassName, this.styles.imageHighres)}
        src={imageSrc.highres}
        alt={alt}
        onLoad={e => this.onHighResLoad(e)}
      />,
    ];
  }

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }
    return (
      <div className={this.styles.imageOverlay}>
        <Loader type={'medium'} />
      </div>
    );
  }

  renderTitle(data, styles) {
    const config = data.config || {};
    return (
      !!config.showTitle && (
        <div className={classNames(styles.imageTitle)}>{(data && data.title) || ''}</div>
      )
    );
  }

  renderDescription(data, styles) {
    const config = data.config || {};
    return (
      !!config.showDescription && (
        <div className={classNames(styles.imageDescription)}>
          {(data && data.description) || ''}
        </div>
      )
    );
  }

  renderCaption(caption, isFocused, readOnly, styles, defaultCaption) {
    return caption ? (
      <div className={styles.imageCaption} data-hook="imageViewerCaption">
        {caption}
      </div>
    ) : (
      !readOnly && isFocused && defaultCaption && (
        <div className={styles.imageCaption}>{defaultCaption}</div>
      )
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

  shouldRenderCaption() {
    const { settings, componentData } = this.props;
    if (includes(get(settings, 'toolbar.hidden'), 'settings')) {
      return false;
    }
    const data = componentData || getDefault();
    if (data.config.size === 'original' && data.src && data.src.width) {
      return data.src.width >= 350;
    }
    return true;
  }

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      componentData,
      className,
      onClick,
      isFocused,
      readOnly,
      settings,
      defaultCaption,
    } = this.props;
    const { fallbackImageSrc } = this.state;
    const data = componentData || getDefault();
    data.config = data.config || {};
    const { metadata = {} } = componentData;

    const itemClassName = classNames(this.styles.imageContainer, className);
    const imageClassName = classNames(this.styles.image);
    const imageSrc = fallbackImageSrc || this.getImageSrc(data.src);
    let imageProps = {};
    if (data.src && settings && isFunction(settings.imageProps)) {
      imageProps = settings.imageProps(data.src);
    } else if (data.src && settings) {
      imageProps = settings.imageProps;
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="imageViewer"
        onClick={onClick}
        className={itemClassName}
        onKeyDown={e => this.onKeyDown(e, onClick)}
        ref={e => this.handleRef(e)}
      >
        <div className={this.styles.imageWrapper}>
          {imageSrc && this.renderImage(imageClassName, imageSrc, metadata.alt, imageProps)}
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, this.styles)}
        {this.renderDescription(data, this.styles)}
        {this.shouldRenderCaption() &&
          this.renderCaption(metadata.caption, isFocused, readOnly, this.styles, defaultCaption)}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

ImageViewer.contextType = Context.type;

ImageViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  dataUrl: PropTypes.string,
  isFocused: PropTypes.bool,
  readOnly: PropTypes.bool,
  settings: PropTypes.object,
  defaultCaption: PropTypes.string,
};

export { ImageViewer, getDefault };
