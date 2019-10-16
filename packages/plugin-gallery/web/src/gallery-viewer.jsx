import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, get } from 'lodash';
import { validate, mergeStyles, Context } from 'wix-rich-content-common';
import { convertItemData } from './helpers/convert-item-data';
import { getDefault, isHorizontalLayout, sampleItems } from './constants';
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
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    let galleryKey = this.state && this.state.galleryKey;
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      galleryKey = get(this, 'props.componentData.styles.galleryLayout', Math.random());
    }
    this.setState({ galleryKey, ...this.stateFromProps(nextProps) });
  }

  componentDidUpdate(prevProps) {
    if (this.shouldUpdateDimensions(prevProps.componentData)) {
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
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

  updateDimensions = () => {
    if (this.container && this.container.getBoundingClientRect) {
      const width = Math.floor(this.container.getBoundingClientRect().width);
      let height;
      if (isHorizontalLayout(this.state.styleParams)) {
        height = width ? Math.floor((width * 3) / 4) : 300;
      }
      this.setState({ size: { width, height } });
    }
  };

  stateFromProps = props => {
    const defaults = getDefault();
    const items = props.componentData.items || defaults.items;
    const styleParams = Object.assign(defaults.styles, props.componentData.styles || {});

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
      default:
        break;
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles: viewerStyles, theme: this.context.theme });
    // TODO remove gallery key
    const { galleryKey, styleParams, size = { width: 300 } } = this.state;
    return (
      <div
        key={galleryKey}
        ref={elem => (this.container = elem)}
        className={this.styles.gallery_container}
      >
        <ProGallery
          items={this.getItems()}
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
