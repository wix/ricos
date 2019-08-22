import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Context } from 'wix-rich-content-common';
import GalleryViewer from './gallery-viewer';
import { getDefault } from './constants';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class GalleryComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);

    const { block, store } = this.props;
    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected.bind(this));
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded.bind(this));
    }
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
    const defaults = getDefault();
    const styles = Object.assign(defaults.styles, props.componentData.styles || {});
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
          Object.assign(state, { isLoading: userSelectedFiles.files.length });
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
    const item = {
      metadata: {
        height: img.height,
        width: img.width,
      },
      itemId: String(event.timeStamp),
      url: img.src,
    };

    const itemIdx = this.setItemInGallery(item, itemPos);
    const { helpers } = this.context;
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
          height: item.height,
          width: item.width,
          processedByConsumer: true,
        },
        itemId: String(item.id),
        url: item.file_name,
      };
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

  fileLoaded = (event, file, itemPos) => {
    const img = new Image();
    img.onload = e => this.imageLoaded(e, file, itemPos);
    img.src = event.target.result;
  };

  render() {
    return (
      <GalleryViewer
        componentData={this.props.componentData}
        onClick={this.props.onClick}
        className={this.props.className}
        settings={this.props.settings}
      />
    );
  }
}

GalleryComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  settings: PropTypes.object,
};

GalleryComponent.contextType = Context.type;

export { GalleryComponent as Component, getDefault };
