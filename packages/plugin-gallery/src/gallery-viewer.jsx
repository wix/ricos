import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { validate } from 'wix-rich-content-common';
import schema from '../statics/data-schema.json';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery-renderer');

const getDefault = () => ({
  items: [],
  styles: {
    galleryLayout: 2,
    gallerySizeType: 'px',
    gallerySizePx: 300,
    oneRow: false,
    cubeRatio: 1,
    galleryThumbnailsAlignment: 'bottom',
    isVertical: false,
    numberOfImagesPerRow: 3,
    imageMargin: 20,
    thumbnailSpacings: 0,
    cubeType: 'fill',
    enableInfiniteScroll: true,
    titlePlacement: 'SHOW_ON_HOVER',
    allowHover: false,
    itemClick: 'link',
    showArrows: false,
    gridStyle: 1,
    loveButton: false,
    allowSocial: false,
    allowDownload: false
  },
  config: {
    alignment: 'center',
    size: 'content',
    layout: 'small',
    spacing: 0,
  },
});

class GalleryViewer extends React.Component {
  constructor(props) {
    validate(props.componentData, schema);
    super(props);
    this.state = this.stateFromProps(props);

    this.sampleItems = [1, 2, 3].map(i => {
      return {
        metadata: {
          height: 10,
          width: 10
        },
        orderIndex: i,
        itemId: 'sampleItem-' + i,
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAA1JREFUCB1jePv27X8ACVkDxyMHIvwAAAAASUVORK5CYII='//eslint-disable-line
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
    this.setState(this.stateFromProps(nextProps));
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (this.container && this.container.getBoundingClientRect) {
      const width = Math.floor(this.container.getBoundingClientRect().width);
      const height = Math.floor(width * 3 / 4);
      this.setState({ size: { width, height } });
    }
  }

  stateFromProps = props => {
    const defaults = getDefault();
    const items = props.componentData.items || defaults.items;
    const styles = Object.assign(defaults.styles, props.componentData.styles || {});

    return {
      items,
      styles
    };
  };

  getItems() {
    const { items } = this.state;

    if (items.length > 0) {
      return items;
    } else {
      return this.sampleItems;
    }

  }

  render() {
    const { styles, size } = this.state;

    // console.log('Rendering ProGallery', styles);

    return (
      <div ref={elem => this.container = elem}>
        <ProGallery
          styles={styles}
          items={this.getItems()}
          galleryDataSrc={'manuallySetImages'}
          container={size}
          settings={this.props.settings}
        />
      </div>);
  }
}

GalleryViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.object,
  helpers: PropTypes.object,
  settings: PropTypes.object
};

export { GalleryViewer, getDefault };
