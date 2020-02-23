import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import GalleryViewer from './gallery-viewer';
import { DEFAULTS, imageItem } from './constants';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class GalleryComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);

    const { block, store, commonPubsub } = this.props;
    const blockKey = block.getKey();
    if (store) {
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected.bind(this));
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded.bind(this));
    }
    commonPubsub?.setBlockHandler(
      'galleryHandleFilesAdded',
      blockKey,
      this.handleFilesAdded.bind(this)
    );
  }

  componentWillReceiveProps(nextProps) {
    const { componentData, componentState } = this.props;
    if (
      !isEqual(componentData, nextProps.componentData) ||
      !isEqual(componentState, nextProps.componentState)
    ) {
      this.setState(this.stateFromProps(nextProps));
    }
  }

  stateFromProps = props => {
    const items = props.componentData.items || []; // || DEFAULTS.items;
    const styles = { ...DEFAULTS.styles, ...(props.componentData.styles || {}) };
    const isLoading = (props.componentState && props.componentState.isLoading) || 0;
    const state = {
      items,
      styles,
      isLoading,
    };

    if (props.componentState) {
      const { userSelectedFiles } = props.componentState;
      if (isLoading <= 0 && userSelectedFiles) {
        //lets continue the uploading process
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          state.isLoading = userSelectedFiles.files.length;
          this.handleFilesSelected(userSelectedFiles.files);
        }
        if (this.props.store) {
          setTimeout(() => {
            //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
            this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
          }, 0);
        }
      }
    }

    return state;
  };

  setItemInGallery = (item, itemPos) => {
    const shouldAdd = typeof itemPos === 'undefined';
    let { items, styles } = this.state;
    let itemIdx;
    if (shouldAdd) {
      itemIdx = items.length;
      items = [...items, item];
    } else {
      itemIdx = itemPos;
      items = [...items];
      items[itemPos] = item;
    }

    //when updating componentData on an async method like this one,
    // we need to use a sync method to change the EditorState.
    // The broadcast is good if the toolbar is displaying some status or images
    this.props.componentData.items = items;
    this.props.componentData.styles = styles;
    const { setData } = this.props.blockProps;
    setData(this.props.componentData);

    this.setState({ items });
    if (this.props.store) {
      this.props.store.update('componentData', { items, styles, config: {} });
    }

    return itemIdx;
  };

  handleFilesSelected = (files, itemPos) => {
    Array(...files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => this.fileLoaded(e, file, itemPos);
      reader.readAsDataURL(file);
    });
  };

  imageLoaded = (event, file, itemPos) => {
    const img = event.target;
    const item = imageItem(img, String(event.timeStamp));
    const itemIdx = this.setItemInGallery(item, itemPos);
    const { helpers } = this.props;
    const hasFileChangeHelper = helpers && helpers.onFilesChange;

    if (hasFileChangeHelper) {
      helpers.onFilesChange(file, ({ data }) => this.handleFilesAdded({ data, itemIdx }));
    } else {
      console.warn('Missing upload function'); //eslint-disable-line no-console
    }
  };

  handleFilesAdded = ({ data, itemIdx }) => {
    const handleFileAdded = (item, idx) => {
      const galleryItem = {
        metadata: {
          type: item.type || 'image',
          height: item.height,
          width: item.width,
        },
        itemId: String(item.id),
        url: item.file_name,
      };
      if (item.type === 'video') {
        galleryItem.metadata.poster = item.poster || item.thumbnail_url;
      }
      this.setItemInGallery(galleryItem, idx);
    };

    if (data instanceof Array) {
      data.forEach(item => {
        handleFileAdded(item);
      });
    } else {
      handleFileAdded(data, itemIdx);
    }
  };

  videoLoaded = (event, file, itemPos) => {
    const { helpers } = this.context;
    const hasFileChangeHelper = helpers && helpers.onVideoSelected;

    if (hasFileChangeHelper) {
      helpers.onVideoSelected(file, video => {
        // eslint-disable-next-line camelcase
        const data = { ...video, id: String(event.timeStamp), file_name: video.video_url };
        this.handleFilesAdded({ data, itemPos });
      });
    } else {
      console.warn('Missing upload function'); //eslint-disable-line no-console
    }
  };

  fileLoaded = (event, file, itemPos) => {
    if (file.type.match('image/*')) {
      const img = new Image();
      img.onload = e => this.imageLoaded(e, file, itemPos);
      img.src = event.target.result;
    } else if (file.type.match('video/*')) {
      this.videoLoaded(event, file, itemPos);
    }
  };

  render() {
    return (
      <GalleryViewer
        componentData={this.props.componentData}
        onClick={this.props.onClick}
        className={this.props.className}
        settings={this.props.settings}
        theme={this.props.theme}
        helpers={this.props.helpers}
        disableRightClick={this.props.disableRightClick}
        isMobile={this.props.isMobile}
        anchorTarget={this.props.anchorTarget}
        relValue={this.props.relValue}
      />
    );
  }
}

GalleryComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  commonPubsub: PropTypes.object,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  settings: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  disableRightClick: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
};

export { GalleryComponent as Component, DEFAULTS };
