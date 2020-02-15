import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { validate, mergeStyles, pluginGallerySchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import { isHorizontalLayout } from './constants';
import resizeMediaUrl from './helpers/resize-media-url';
import styles from '../statics/styles/viewer.scss';
import 'pro-gallery/dist/statics/main.min.css';
import ExpandIcon from './icons/expand.svg';
import Gallery from './domain/Gallery';

const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery');

class GalleryViewer extends React.Component {
  constructor(props) {
    validate(props.componentData, pluginGallerySchema);
    super(props);

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
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
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
    const {
      componentData,
      isMobile,
      anchorTarget,
      relValue,
      settings: { showTitleDefault = true },
    } = props;

    const galleryDomain = new Gallery(componentData, {
      showTitleDefault,
      isMobile,
      anchorTarget,
      relValue,
    });
    const { items, styleParams } = galleryDomain;

    return {
      items,
      styleParams,
    };
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
      case 'ITEM_ACTION_TRIGGERED':
        this.handleExpand(data);
        break;
      default:
        break;
    }
  };

  handleExpand = data => {
    const { onExpand } = this.props.helpers;
    onExpand && onExpand(this.props.entityIndex, data.idx);
  };

  renderExpandIcon = itemProps => {
    return itemProps.linkData.url ? (
      <ExpandIcon
        className={this.styles.expandIcon}
        onClick={e => {
          e.preventDefault();
          this.handleExpand(itemProps);
        }}
      />
    ) : null;
  };

  renderTitle = alt => {
    return alt ? (
      <div className={this.styles.imageTitleContainer}>
        <div className={this.styles.imageTitle}>{alt}</div>
      </div>
    ) : null;
  };

  hoverElement = itemProps => {
    const {
      settings: { showTitleDefault = true },
    } = this.props;
    return (
      showTitleDefault && (
        <Fragment>
          {this.renderExpandIcon(itemProps)}
          {this.renderTitle(itemProps.alt)}
        </Fragment>
      )
    );
  };

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { scrollingElement, ...settings } = this.props.settings;
    const { items, styleParams, size = { width: 300 } } = this.state;

    return (
      <div
        ref={elem => (this.container = elem)}
        className={this.styles.gallery_container}
        data-hook="galleryViewer"
        role="none"
        onContextMenu={this.handleContextMenu}
      >
        <ProGallery
          items={items}
          styles={styleParams}
          container={size}
          settings={settings}
          scrollingElement={scrollingElement}
          eventsListener={this.handleGalleryEvents}
          resizeMediaUrl={resizeMediaUrl}
          customHoverRenderer={this.hoverElement}
        />
      </div>
    );
  }
}

GalleryViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
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
};

export default GalleryViewer;
