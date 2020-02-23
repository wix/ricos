import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get, includes, isEqual, isFunction } from 'lodash';
import {
  mergeStyles,
  validate,
  isSSR,
  getImageSrc,
  Loader,
  WIX_MEDIA_DEFAULT,
  pluginImageSchema,
} from 'wix-rich-content-common';
import { DEFAULTS, SEO_IMAGE_WIDTH } from './consts';
import styles from '../statics/styles/image-viewer.scss';
import ExpandIcon from './icons/expand.svg';
import InPluginInput from './InPluginInput';

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    validate(props.componentData, pluginImageSchema);
    this.state = {};
    this.preloadRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ ssrDone: true });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginImageSchema);
    }
  }

  calculateHeight(width = 1, src) {
    return src && src.height && src.width
      ? Math.ceil((src.height / src.width) * width)
      : WIX_MEDIA_DEFAULT.SIZE;
  }

  getImageUrl(src) {
    const { helpers, seoMode } = this.props || {};
    if (!src && helpers?.handleFileSelection) {
      return null;
    }

    const imageUrl = {
      preload: '',
      highres: '',
    };

    if (this.props.dataUrl) {
      imageUrl.preload = imageUrl.highres = this.props.dataUrl;
    } else {
      let requiredWidth, requiredHeight;
      imageUrl.preload = getImageSrc(src, helpers);
      if (seoMode) {
        requiredWidth = src?.width && Math.min(src.width, SEO_IMAGE_WIDTH);
        requiredHeight = this.calculateHeight(SEO_IMAGE_WIDTH, src);
      } else if (this.state.container) {
        const { width } = this.state.container.getBoundingClientRect();
        requiredWidth = width || src?.width || 1;
        if (this.props.isMobile) {
          //adjust the image width to viewport scaling and device pixel ratio
          requiredWidth *= (!isSSR() && window.devicePixelRatio) || 1;
          requiredWidth *= (!isSSR() && window.screen.width / document.body.clientWidth) || 1;
        }
        //keep the image's original ratio
        requiredHeight = this.calculateHeight(requiredWidth, src);
        requiredWidth = Math.ceil(requiredWidth);
        requiredHeight = Math.ceil(requiredHeight);
      }
      imageUrl.highres = getImageSrc(src, helpers, {
        requiredWidth,
        requiredHeight,
        requiredQuality: 90,
        imageType: 'highRes',
      });
    }
    if (this.state.ssrDone && !imageUrl.preload) {
      console.error(`image plugin mounted with invalid image source!`, src); //eslint-disable-line no-console
    }

    return imageUrl;
  }

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

  renderImage = (imageClassName, imageSrc, alt, props, isGif, seoMode) => {
    return this.getImage(
      classNames(imageClassName, this.styles.imageHighres, {
        [this.styles.onlyHighRes]: isGif || seoMode,
      }),
      imageSrc.highres,
      alt,
      props,
      !isGif
    );
  };

  renderPreloadImage = (imageClassName, imageSrc, alt, props) => {
    return this.getImage(
      classNames(imageClassName, this.styles.imagePreload),
      imageSrc.preload,
      alt,
      props
    );
  };

  getImage(imageClassNames, src, alt, props, fadeIn = false) {
    return (
      <img
        {...props}
        className={imageClassNames}
        src={src}
        alt={alt}
        onError={this.onImageLoadError}
        onLoad={fadeIn ? e => this.onImageLoad(e) : undefined}
        ref={fadeIn ? undefined : this.preloadRef}
      />
    );
  }

  onImageLoad = e => {
    e.target.style.opacity = 1;
    if (this.preloadRef.current) {
      this.preloadRef.current.style.opacity = 0;
    }
  };

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }
    return (
      <div className={this.styles.imageOverlay}>
        <Loader type={'medium'} theme={this.props.theme} />
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

  renderCaption(caption) {
    const { onCaptionChange, setFocusToBlock, setInPluginEditingMode } = this.props;
    return onCaptionChange ? (
      <InPluginInput
        setInPluginEditingMode={setInPluginEditingMode}
        className={this.styles.imageCaption}
        value={caption}
        onChange={onCaptionChange}
        setFocusToBlock={setFocusToBlock}
      />
    ) : (
      <span className={this.styles.imageCaption}>{caption}</span>
    );
  }

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler?.();
    }
  };

  handleRef = e => {
    if (!this.state.container) {
      this.setState({ container: e }); //saving the container on the state to trigger a new render
    }
  };

  shouldRenderCaption() {
    const { getInPluginEditingMode, settings, componentData, defaultCaption } = this.props;
    const caption = componentData.metadata?.caption;

    if (includes(get(settings, 'toolbar.hidden'), 'settings')) {
      return false;
    }
    if (
      caption === undefined ||
      (caption === '' && !getInPluginEditingMode?.()) ||
      caption === defaultCaption
    ) {
      return false;
    }
    const data = componentData || DEFAULTS;
    if (data.config.size === 'original' && data.src && data.src.width) {
      return data.src.width >= 350;
    }
    return true;
  }

  handleExpand = e => {
    e.preventDefault();
    const { onExpand } = this.props.helpers;
    onExpand && onExpand(this.props.entityIndex);
  };

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { componentData, className, settings, setComponentUrl, seoMode } = this.props;
    const { fallbackImageSrc, ssrDone } = this.state;
    const data = componentData || DEFAULTS;
    const { metadata = {} } = componentData;

    const hasLink = data.config && data.config.link;
    const hasExpand = this.props.helpers && this.props.helpers.onExpand;

    const itemClassName = classNames(this.styles.imageContainer, className, {
      [this.styles.pointer]: hasExpand,
    });
    const imageClassName = classNames(this.styles.image);
    const imageSrc = fallbackImageSrc || this.getImageUrl(data.src);
    let imageProps = {};
    if (data.src && settings) {
      imageProps = isFunction(settings.imageProps)
        ? settings.imageProps(data.src)
        : settings.imageProps;
    }
    const isGif = imageSrc?.highres?.endsWith?.('.gif');
    setComponentUrl?.(imageSrc?.highres);
    const shouldRenderPreloadImage = !seoMode && imageSrc && !isGif;
    const shouldRenderImage = (imageSrc && (seoMode || ssrDone)) || isGif;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="imageViewer"
        onClick={!hasLink && this.handleExpand}
        className={itemClassName}
        onKeyDown={e => this.onKeyDown(e, this.onClick)}
        ref={e => this.handleRef(e)}
        onContextMenu={this.handleContextMenu}
      >
        <div className={this.styles.imageWrapper} role="img" aria-label={metadata.alt}>
          {shouldRenderPreloadImage &&
            this.renderPreloadImage(imageClassName, imageSrc, metadata.alt, imageProps)}
          {shouldRenderImage &&
            this.renderImage(imageClassName, imageSrc, metadata.alt, imageProps, isGif, seoMode)}
          {this.renderLoader()}
          {hasLink && hasExpand && (
            <ExpandIcon className={this.styles.expandIcon} onClick={this.handleExpand} />
          )}
        </div>
        {this.renderTitle(data, this.styles)}
        {this.renderDescription(data, this.styles)}
        {this.shouldRenderCaption() && this.renderCaption(metadata.caption)}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

ImageViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  dataUrl: PropTypes.string,
  isFocused: PropTypes.bool,
  settings: PropTypes.object,
  defaultCaption: PropTypes.string,
  entityIndex: PropTypes.number,
  onCaptionChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  disableRightClick: PropTypes.bool,
  getInPluginEditingMode: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  isMobile: PropTypes.bool.isRequired,
  setComponentUrl: PropTypes.func,
  seoMode: PropTypes.bool,
};

export default ImageViewer;
