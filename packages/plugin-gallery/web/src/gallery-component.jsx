import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'wix-rich-content-plugin-commons';
import { isEqual } from 'lodash';
import GalleryViewer from './gallery-viewer';
import { DEFAULTS } from './defaults';
import { GALLERY_TYPE } from './types';
import styles from '../statics/styles/gallery-component.scss';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class GalleryComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);

    const { block, store, commonPubsub } = this.props;
    this.blockKey = block.getKey();
    if (store) {
      store.setBlockHandler(
        'handleFilesSelected',
        this.blockKey,
        this.handleFilesSelected.bind(this)
      );
      store.setBlockHandler('handleFilesAdded', this.blockKey, this.handleFilesAdded.bind(this));
    }
    commonPubsub?.setBlockHandler(
      'galleryHandleFilesAdded',
      this.blockKey,
      this.handleFilesAdded.bind(this)
    );
  }

  componentWillReceiveProps(nextProps) {
    const { componentData, componentState } = this.props;
    if (
      !isEqual(componentData, nextProps.componentData) ||
      !isEqual(componentState, nextProps.componentState)
    ) {
      this.setState(
        { ...this.stateFromProps(nextProps) },
        () => this.setState({ key: !this.state.key }) //fixes gallery height not updating correctly
      );
    }
  }

  stateFromProps = props => {
    const items = props.componentData.items || []; // || DEFAULTS.items;
    const styles = { ...DEFAULTS.styles, ...(props.componentData.styles || {}) };
    const itemsLeftToUpload = this.state?.itemsLeftToUpload || 0;
    const state = {
      items,
      styles,
      itemsLeftToUpload,
    };

    if (props.componentState) {
      const { userSelectedFiles } = props.componentState;
      if (itemsLeftToUpload <= 0 && userSelectedFiles) {
        //lets continue the uploading process
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          state.itemsLeftToUpload = userSelectedFiles.files.length;
          this.handleFilesSelected(userSelectedFiles.files);
          state.isLoading = true;
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
    let { items, styles, key } = this.state;
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

    this.setState({ items, key: !key });
    if (this.props.store) {
      this.props.store.update('componentData', {
        items,
        styles,
        config: {},
      });
    }
    return itemIdx;
  };

  onLocalLoad = (item, itemPos) => {
    return item && this.setItemInGallery(item, itemPos);
  };

  onUploadFinished = ({ data, itemIndex }) => {
    this.setItemInGallery(data, itemIndex);
    this.setState(state => {
      const itemsLeftToUpload = state.itemsLeftToUpload - 1;
      const isLoading = itemsLeftToUpload > 0;
      return { itemsLeftToUpload, isLoading };
    });
  };

  handleFilesSelected = (files, itemPos) => {
    Array(...files).forEach(file => {
      this.props.handleUploadStart([file], this.onLocalLoad, this.onUploadFinished, itemPos);
    });
    this.state && this.onLoad(true);
  };

  onFileUploadEnd = () => {
    this.setState(state => {
      const itemsLeftToUpload = state.itemsLeftToUpload - 1;
      const isLoading = itemsLeftToUpload > 0;
      return { itemsLeftToUpload, isLoading };
    });
  };

  handleFilesAdded = ({ data, error, itemIdx }) => {
    const handleFileAdded = (data, error, idx) => {
      this.props.handleUploadFinished(data, error, this.onUploadFinished, idx);
    };
    if (data instanceof Array) {
      data.forEach(item => {
        handleFileAdded(item, error);
      });
    } else {
      handleFileAdded(data, error, itemIdx);
    }
    if (this.props.store) {
      this.props.store.update('componentState', { isLoading: false });
    }
    this.onLoad(false);
  };

  renderLoader = () => {
    return <Loader type={'medium'} />;
  };

  onLoad = isLoading => {
    this.setState({ isLoading });
  };

  renderMobileNativeLoader = ({ url }) =>
    url ? null : (
      <div className={styles.mobileNativeLoaderContainer}>
        <Loader type={'mini'} disableProgress />
      </div>
    );

  render() {
    return (
      <>
        <GalleryViewer
          key={this.state.key}
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
          blockKey={this.blockKey}
          itemOverlayElement={this.renderMobileNativeLoader}
        />
        {this.state.isLoading && this.renderLoader()}
      </>
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
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadFinished: PropTypes.func.isRequired,
};

export { GalleryComponent as Component, DEFAULTS };
