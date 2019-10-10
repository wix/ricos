import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { validate, mergeStyles, Context } from 'wix-rich-content-common';
import { convertItemData } from './helpers/convert-item-data';
import { getDefault, isHorizontalLayout } from './constants';
import resizeMediaUrl from './helpers/resize-media-url';
import schema from '../statics/data-schema.json';
import viewerStyles from '../statics/styles/viewer.scss';
import 'pro-gallery/dist/statics/main.min.css';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery');

class GalleryViewer extends React.Component {
  constructor(props) {
    validate(props.componentData, schema);
    super(props);

    this.state = {
      size: {},
      ...this.stateFromProps(props),
    };

    this.sampleItems = [1, 2, 3].map(i => {
      return {
        metadata: {
          height: 10,
          width: 10,
        },
        orderIndex: i,
        itemId: 'sampleItem-' + i,
        url:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAA1JREFUCB1jePv27X8ACVkDxyMHIvwAAAAASUVORK5CYII=', //eslint-disable-line
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    // TODO: remove galleryKey
    let galleryKey = this.state && this.state.galleryKey;
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      const { galleryLayout: currentGalleryLayout } = this.props.componentData.styles;
      const { galleryLayout: nextGalleryLayout } = nextProps.componentData.styles;
      if (currentGalleryLayout !== nextGalleryLayout) {
        this.handleGalleryLayoutChange(nextProps.componentData.styles);
      }
      validate(nextProps.componentData, schema);
      galleryKey = Math.random();
    }
    this.setState({ galleryKey, ...this.stateFromProps(nextProps) }, () => this.updateDimensions());
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (this.container && this.container.getBoundingClientRect) {
      const width = Math.floor(this.container.getBoundingClientRect().width);
      this.setState({ size: { width } });
    }
  };

  stateFromProps = props => {
    const defaults = getDefault();
    const items = props.componentData.items || defaults.items;
    const styleParams = this.getStyleParams(
      Object.assign(defaults.styles, props.componentData.styles || {}),
      this.hasTitle(items)
    );
    return {
      items,
      styleParams,
    };
  };

  getItems() {
    const { items } = this.state;
    const { anchorTarget, relValue } = this.context;

    if (items.length > 0) {
      return convertItemData({ items, anchorTarget, relValue });
    } else {
      return this.sampleItems;
    }
  }

  handleGalleryLayoutChange = styleParams => {
    if (this.container) {
      if (isHorizontalLayout(styleParams)) {
        const { width } = this.container.getBoundingClientRect();
        const height = width ? (width * 9) / 16 : 300;
        this.setState(state => ({
          size: {
            ...state.size,
            height,
          },
        }));
      } else {
        this.setState({ size: { height: undefined } });
      }
    }
  };

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
      default:
        break;
    }
  };

  hasTitle = items => {
    return items.some(item => {
      return item.metadata && item.metadata.title;
    });
  };

  getStyleParams = (styleParams, shouldRenderTitle) => {
    if (!shouldRenderTitle) {
      return styleParams;
    }
    const display = this.context.isMobile
      ? { titlePlacement: 'SHOW_BELOW', calculateTextBoxHeightMode: 'AUTOMATIC' }
      : { titlePlacement: 'SHOW_ON_HOVER', allowHover: true, galleryVerticalAlign: 'flex-end' };
    return {
      ...styleParams,
      isVertical: styleParams.galleryLayout === 1,
      allowTitle: true,
      galleryTextAlign: 'center',
      textsHorizontalPadding: 0,
      imageInfoType: 'NO_BACKGROUND',
      hoveringBehaviour: 'APPEARS',
      textsVerticalPadding: 0,
      ...display,
    };
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles: viewerStyles, theme: this.context.theme });
    // TODO remove gallery key
    const { galleryKey, styleParams, size = { width: 300 } } = this.state;
    const items = this.getItems();
    return (
      <div
        ref={elem => (this.container = elem)}
        className={this.styles.gallery_container}
        data-hook="galleryViewer"
      >
        <ProGallery
          // TODO remove gallery key
          key={galleryKey}
          items={items}
          styles={styleParams}
          container={size}
          settings={this.props.settings}
          eventsListener={this.handleGalleryEvents}
          resizeMediaUrl={resizeMediaUrl}
        />
      </div>
    );
  }
}

GalleryViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  settings: PropTypes.object,
};

GalleryViewer.contextType = Context.type;

export default GalleryViewer;
