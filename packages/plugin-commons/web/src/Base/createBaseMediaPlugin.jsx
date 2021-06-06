import React, { PureComponent, Suspense } from 'react';
import {
  dataBuilder,
  tempDataBuilder,
  uploadFunctionGetter,
} from '../Utils/mediaPluginsDataBuilders';
import { fileExtensionToType, FileTypes } from '../Utils/fileExtensionToType';
import PropTypes from 'prop-types';
import { GALLERY_TYPE } from 'wix-rich-content-common';

const MediaPluginOverlay = React.lazy(() => import('../Components/MediaPluginOverlay'));

class MediaPlugin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, tempData: null };
    props.pluginType === GALLERY_TYPE &&
      props.commonPubsub?.setBlockHandler(
        'galleryHandleFilesAdded',
        this.blockKey,
        this.handleFilesAdded.bind(this)
      );
  }

  componentDidMount() {
    const { block, store } = this.props;
    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected.bind(this));
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded.bind(this));
    }
    this.updateComponent();
  }

  componentDidUpdate() {
    this.updateComponent();
  }

  updateComponent() {
    const componentState = this.props.componentState || {};
    const { isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!isLoading && userSelectedFiles) {
      //lets continue the uploading process
      if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
        this.handleFilesSelected(userSelectedFiles.files);
        this.setState({ itemsLeftToUpload: userSelectedFiles.files.length, isLoading: true });
      }
      setTimeout(() => {
        //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
        this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
      }, 0);
    }
  }

  getLoadingParams = componentState => {
    //check if the file upload is coming on the regular state
    const { isLoading, userSelectedFiles } = componentState;
    return { isLoading: this.state?.isLoading || isLoading, userSelectedFiles };
  };

  onUploadFinished = ({ data, error }) => {
    data && this.props.store.update('componentData', data, this.props.block.getKey());
    let { tempData } = this.state;
    if (!error) {
      tempData = null;
    }
    this.setState(state => {
      const itemsLeftToUpload = state.itemsLeftToUpload - 1;
      const isLoading = itemsLeftToUpload > 0;
      return { itemsLeftToUpload, isLoading, tempData };
    });
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  onLocalLoad = tempData => this.setState({ tempData });

  handleFilesSelected = files => {
    Array(...files).forEach(file => {
      this.props.handleUploadStart(file, this.onLocalLoad, this.onUploadFinished);
    });
  };

  handleFilesAdded = ({ data, error }) => {
    if (data instanceof Array) {
      data.forEach((item, index) => {
        this.props.handleUploadFinished(item, error[index] || error, this.onUploadFinished);
      });
    } else {
      this.props.handleUploadFinished(data, error, this.onUploadFinished);
    }
  };

  render() {
    const { componentData, Component, t, isOverlayLoader } = this.props;
    const { isLoading, tempData } = this.state;
    const { error } = componentData;
    return (
      <>
        <Component {...this.props} isLoading={isLoading} tempData={tempData} />
        {isOverlayLoader && (
          <Suspense fallback={<div />}>
            <MediaPluginOverlay
              error={error}
              t={t}
              isOverlayLoader={isOverlayLoader}
              isLoading={isLoading || componentData?.loading}
            />
          </Suspense>
        )}
      </>
    );
  }
}

MediaPlugin.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadFinished: PropTypes.func.isRequired,
  isOverlayLoader: PropTypes.bool,
  Component: PropTypes.any,
  commonPubsub: PropTypes.object,
  pluginType: PropTypes.string,
};

const createBaseMediaPlugin = ({
  PluginComponent,
  pluginType,
  isPluginViewer = true,
  isOverlayLoader = true,
}) => {
  return class MediaUploadWrapper extends PureComponent {
    static propTypes = {
      componentData: PropTypes.object.isRequired,
      commonPubsub: PropTypes.object,
      helpers: PropTypes.object,
    };

    fileReader = file => {
      return new Promise(resolve => {
        resolve(URL.createObjectURL(file));
      });
    };

    handleUploadFinished = (data, error, onUploadFinished, itemIndex, fileType) => {
      const { commonPubsub, componentData } = this.props;
      if (error) {
        commonPubsub.set('onMediaUploadError', error);
      }
      return onUploadFinished({
        data:
          data && dataBuilder[pluginType]?.({ data, error }, componentData, fileType, itemIndex),
        error,
      });
    };

    uploadFile = (file, onLocalLoad, onUploadFinished, itemPos) => {
      if (file) {
        this.fileReader(file).then(url => {
          const extension = file.name.split('.').pop();
          const fileType = extension && FileTypes[fileExtensionToType(extension)];
          const { componentData } = this.props;
          const tempData = tempDataBuilder[pluginType]?.({
            url,
            file,
            type: extension,
          });
          onLocalLoad?.(tempData);
          const handleFileUpload = uploadFunctionGetter[pluginType](this.props);
          if (handleFileUpload) {
            const {
              helpers: { onMediaUploadStart, onMediaUploadEnd },
            } = this.props;
            const uploadBIData = onMediaUploadStart(pluginType, file.size, fileType);
            handleFileUpload(file, ({ data, error }) => {
              onMediaUploadEnd(uploadBIData, error);
              this.handleUploadFinished(data, error, onUploadFinished, itemPos, fileType);
            });
          } else {
            this.handleUploadFinished(
              undefined,
              { msg: 'Missing upload function' },
              onUploadFinished,
              pluginType
            );
          }
        });
      }
    };

    render() {
      return isPluginViewer ? (
        <MediaPlugin
          Component={PluginComponent}
          {...this.props}
          handleUploadStart={this.uploadFile}
          handleUploadFinished={this.handleUploadFinished}
          isOverlayLoader={isOverlayLoader}
          pluginType={pluginType}
        />
      ) : (
        <PluginComponent
          {...this.props}
          handleUploadStart={this.uploadFile}
          handleUploadFinished={this.handleUploadFinished}
        />
      );
    }
  };
};

export default createBaseMediaPlugin;
