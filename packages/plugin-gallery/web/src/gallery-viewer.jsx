import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { validate, mergeStyles, pluginGallerySchema } from 'wix-rich-content-common';
import { isEqual, debounce } from 'lodash';
import { convertItemData } from './lib/convert-item-data';
import { DEFAULTS, isHorizontalLayout, sampleItems } from './constants';
import resizeMediaUrl from './lib/resize-media-url';
import styles from '../statics/styles/viewer.scss';
import 'pro-gallery/dist/statics/main.min.css';
import ExpandIcon from './icons/expand.svg';
import { GALLERY_TYPE } from './types';
// import { GALLERY_CONSTS } from 'pro-gallery'; will work on version 1.10.1
import VIEW_MODE from 'pro-gallery/dist/es/src/common/constants/viewMode';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery');

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
    if (this.props.helpers.onExpand) {
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
    const { onExpand, onViewerAction } = this.props.helpers;
    onViewerAction?.(GALLERY_TYPE, 'expand_image');
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
      <div className={this.styles.expandContainer}>
        <ExpandIcon
          className={this.styles.expandIcon}
          onClick={e => {
            e.preventDefault();
            this.handleExpand(itemProps);
          }}
        />
      </div>
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
    const hasExpand = this.props.helpers?.onExpand;
    return hasExpand ? (
      <div className={this.styles.pointer}>
        {this.renderExpandIcon(itemProps)}
        {this.renderTitle(itemProps.title)}
      </div>
    ) : (
      <Fragment>{this.renderTitle(itemProps.title)}</Fragment>
    );
  };

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { scrollingElement, ...settings } = this.props.settings;
    const { styleParams, size = { width: 300 } } = this.state;
    const items = this.getItems();
    // const viewMode = this.props.seoMode === true ? GALLERY_CONSTS.viewMode.SEO : undefined; will work on version 1.10.1
    const viewMode = this.props.seoMode === true ? VIEW_MODE.SEO : undefined;

    return (
      <div
        ref={elem => (this.container = elem)}
        className={this.styles.gallery_container}
        data-hook={'galleryViewer'}
        role="none"
        onContextMenu={this.handleContextMenu}
      >
        <ProGallery
          domId={this.domId}
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
