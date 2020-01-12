import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get, includes, isEqual, isFunction } from 'lodash';
import {
  Context,
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
  }

  componentDidMount() {
    this._isMounted = true;
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
    const { helpers, shouldRenderOptimizedImages } = this.context || {};
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
      if (shouldRenderOptimizedImages) {
        requiredWidth = src && src.width && Math.min(src.width, SEO_IMAGE_WIDTH);
        requiredHeight = this.calculateHeight(SEO_IMAGE_WIDTH, src);
      } else if (this.state.container) {
        const { width } = this.state.container.getBoundingClientRect();
        requiredWidth = width || src?.width || 1;
        if (this.context.isMobile) {
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
    const fileType = imageSrc.highres.split('.').pop();
    const isGif = fileType === 'gif';
    let images = [
      <img
        {...props}
        key="highres"
        className={classNames(imageClassName, this.styles.imageHighres)}
        src={imageSrc.highres}
        alt={alt}
        onLoad={isGif ? undefined : e => this.onHighResLoad(e)}
      />,
    ];
    if (!isGif) {
      images = [
        <img
          key="preload"
          ref={ref => (this.preloadImage = ref)}
          className={classNames(imageClassName, this.styles.imagePreload)}
          src={imageSrc.preload}
          alt={alt}
          onError={this.onImageLoadError}
        />,
        ...images,
      ];
    }
    return images;
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

  renderCaption(caption) {
    const { onCaptionChange, setFocusToBlock } = this.props;
    return (
      <InPluginInput
        className={this.styles.imageCaption}
        value={caption}
        onChange={onCaptionChange}
        setFocusToBlock={setFocusToBlock}
      />
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
    const { settings, componentData, defaultCaption } = this.props;
    const caption = componentData.metadata?.caption;
    const { getInPluginEditingMode } = this.context;

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
    const { onExpand } = this.context.helpers;
    onExpand && onExpand(this.props.entityIndex);
  };

  handleContextMenu = e => this.context.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { componentData, className, settings } = this.props;
    const { fallbackImageSrc } = this.state;
    const data = componentData || DEFAULTS;
    const { metadata = {} } = componentData;

    const hasLink = data.config && data.config.link;
    const hasExpand = this.context.helpers && this.context.helpers.onExpand;

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
          {imageSrc && this.renderImage(imageClassName, imageSrc, metadata.alt, imageProps)}
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

ImageViewer.contextType = Context.type;

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
};

export default ImageViewer;
