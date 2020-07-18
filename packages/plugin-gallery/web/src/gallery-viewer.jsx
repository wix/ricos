import React from 'react';
import PropTypes from 'prop-types';
import { validate, mergeStyles } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginGallerySchema from 'wix-rich-content-common/dist/statics/schemas/plugin-gallery.schema.json';
import { isEqual, debounce } from 'lodash';
import { convertItemData } from './lib/convert-item-data';
import { DEFAULTS, isHorizontalLayout, sampleItems } from './constants';
import resizeMediaUrl from './lib/resize-media-url';
import styles from '../statics/styles/viewer.rtlignore.scss';
import '../statics/styles/gallery-styles.scss';
import ExpandIcon from './icons/expand';
import classnames from 'classnames';
import { GALLERY_TYPE } from './types';

const { ProGallery, GALLERY_CONSTS } = require('pro-gallery');

class GalleryViewer extends React.Component {
  constructor(props) {
    validate(props.componentData, pluginGallerySchema);
    super(props);
    this.domId = this.props.blockKey || 'v-' + this.props.entityIndex;
    this.state = {
      size: {},
      ...this.stateFromProps(props),
    };
  }

  componentDidMount() {
    if (this.props.settings.onExpand) {
      const styleParams = this.state.styleParams;
      this.setState({
        styleParams: { ...styleParams, allowHover: true },
      });
    }
    window.addEventListener('resize', this.updateDimensions);
    this.initUpdateDimensionsForDomChanges();
  }

  initUpdateDimensionsForDomChanges() {
    let { scrollingElement } = this.props?.settings;
    if (!scrollingElement) {
      // eslint-disable-next-line no-console
      console.error(
        `Please fix the gallery config of Rich Content Editor.
        A scrollingElement needs to be provided. Without it the gallery will not work correctly`
      );
      scrollingElement = document.body;
    }
    let contentElement =
      typeof scrollingElement === 'function' ? scrollingElement() : scrollingElement;
    if (contentElement?.nodeType !== 1) {
      contentElement = document.body;
    }
    if (contentElement) {
      this.observer = new MutationObserver(() => {
        if (contentElement.clientHeight !== this.oldContentElementHeight) {
          this.oldContentElementHeight = contentElement.clientHeight;
          this.updateDimensions();
        }
      });
      this.observer.observe(contentElement, { attributes: true, childList: true, subtree: true });
    } else {
      // eslint-disable-next-line no-console
      console.warn(`can't find content container to listen for changes to update gallery`);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.stateFromProps(nextProps) });
  }

  componentDidUpdate(prevProps) {
    if (this.shouldUpdateDimensions(prevProps.componentData)) {
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
    this.observer.disconnect();
    window.removeEventListener('resize', this.updateDimensions);
  }

  shouldUpdateDimensions = prevComponentData => {
    const { galleryLayout: prevGalleryLayout } = prevComponentData.styles;
    const { galleryLayout: currentGalleryLayout } = this.state.styleParams;
    if (currentGalleryLayout !== prevGalleryLayout) {
      return true;
    }

    if (!isEqual(prevComponentData.config, this.props.componentData.config)) {
      return true;
    }
  };

  updateDimensions = debounce(() => {
    if (this.container && this.container.getBoundingClientRect) {
      const width = Math.floor(this.container.getBoundingClientRect().width);
      let height;
      if (isHorizontalLayout(this.state.styleParams)) {
        height = width ? Math.floor((width * 3) / 4) : 300;
      }
      this.setState({ size: { width, height } });
    }
  }, 100);

  stateFromProps = props => {
    const items = props.componentData.items || DEFAULTS.items;
    const styleParams = this.getStyleParams(
      { ...DEFAULTS.styles, ...(props.componentData.styles || {}) },
      items
    );
    return {
      items,
      styleParams,
    };
  };

  getItems() {
    const { items } = this.state;
    const { anchorTarget, relValue } = this.props;
    if (items.length > 0) {
      return convertItemData({ items, anchorTarget, relValue });
    } else {
      return sampleItems;
    }
  }

  handleGalleryEvents = (name, data) => {
    switch (name) {
      case 'GALLERY_CHANGE':
        if (this.container) {
          if (!isHorizontalLayout(this.state.styleParams)) {
            this.container.style.height = `${data.layoutHeight}px`;
          } else {
            this.container.style.height = 'auto';
          }
        }
        break;
      case 'ITEM_ACTION_TRIGGERED':
        !data.linkData.url && this.handleExpand(data);
        break;
      default:
        break;
    }
  };

  handleExpand = data => {
    const {
      settings: { onExpand },
      helpers = {},
    } = this.props;
    helpers.onAction?.('expand_gallery', GALLERY_TYPE);
    onExpand?.(this.props.entityIndex, data.idx);
  };

  hasTitle = items => {
    return items.some(item => {
      return item.metadata && item.metadata.title;
    });
  };

  getStyleParams = (styleParams, items) => {
    if (!this.props.isMobile) {
      return { ...styleParams, allowHover: true };
    }
    if (this.hasTitle(items))
      return {
        ...styleParams,
        isVertical: styleParams.galleryLayout === 1,
        allowTitle: true,
        galleryTextAlign: 'center',
        textsHorizontalPadding: 0,
        imageInfoType: 'NO_BACKGROUND',
        hoveringBehaviour: 'APPEARS',
        textsVerticalPadding: 0,
        titlePlacement: 'SHOW_BELOW',
        calculateTextBoxHeightMode: 'AUTOMATIC',
      };
    return styleParams;
  };

  renderExpandIcon = itemProps => {
    return itemProps.type !== 'video' ? (
      <ExpandIcon
        className={this.styles.expandIcon}
        onClick={e => {
          e.preventDefault();
          this.handleExpand(itemProps);
        }}
      />
    ) : null;
  };

  renderTitle = title => {
    return title ? (
      <div className={this.styles.imageTitleContainer}>
        <div className={this.styles.imageTitle}>{title}</div>
      </div>
    ) : null;
  };

  hoverElement = itemProps => {
    const {
      settings: { onExpand },
    } = this.props;
    const isClickable = onExpand || itemProps.link;
    const itemStyles = classnames(
      this.styles.galleryItem,
      isClickable && this.styles.clickableItem
    );
    return (
      <div className={itemStyles}>
        {onExpand && this.renderExpandIcon(itemProps)}
        {this.renderTitle(itemProps.title)}
      </div>
    );
  };

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { scrollingElement, ...settings } = this.props.settings;
    const { styleParams, size } = this.state;

    const items = this.getItems();
    const viewMode = this.props.seoMode ? GALLERY_CONSTS.viewMode.SEO : undefined;

    return (
      <div
        ref={elem => (this.container = elem)}
        className={this.styles.gallery_container}
        data-hook={'galleryViewer'}
        role="none"
        onContextMenu={this.handleContextMenu}
        dir="ltr"
      >
        <ProGallery
          domId={this.domId}
          allowSSR={!!this.props.seoMode}
          items={items}
          styles={styleParams}
          container={size}
          settings={settings}
          scrollingElement={scrollingElement}
          eventsListener={this.handleGalleryEvents}
          resizeMediaUrl={resizeMediaUrl}
          customHoverRenderer={this.hoverElement}
          viewMode={viewMode}
        />
      </div>
    );
  }
}

GalleryViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockKey: PropTypes.string,
  entityIndex: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  settings: PropTypes.object,
  disableRightClick: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  helpers: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
  seoMode: PropTypes.bool,
};

export default GalleryViewer;
