import React, { PureComponent } from 'react';
import {
  dataBuilder,
  tempDataBuilder,
  uploadFunctionGetter,
  GALLERY_FILE_TYPES,
} from '../Utils/mediaPluginsDataBuilders';
import PropTypes from 'prop-types';
import {
  GALLERY_TYPE,
  alignmentClassName,
  sizeClassName,
  textWrapClassName,
} from 'wix-rich-content-common';

const createMediaUploadWrapper = PluginComponent => {
  return class MediaUploadWrapper extends PureComponent {
    static propTypes = {
      componentData: PropTypes.object.isRequired,
      commonPubsub: PropTypes.object,
      helpers: PropTypes.object,
      type: PropTypes.string,
    };

    static alignmentClassName = (...args) =>
      PluginComponent.alignmentClassName?.(...args) || alignmentClassName(...args);

    static sizeClassName = (...args) =>
      PluginComponent.sizeClassName?.(...args) || sizeClassName(...args);

    static textWrapClassName = (...args) =>
      PluginComponent.textWrapClassName?.(...args) || textWrapClassName(...args);

    static customClassName = (...args) => PluginComponent.customClassName?.(...args);

    fileReader = file => {
      return new Promise(resolve => {
        resolve(URL.createObjectURL(file));
      });
    };

    handleUploadFinished = (data, error, onUploadFinished, itemIndex, fileType) => {
      const { commonPubsub, componentData, type } = this.props;
      if (error) {
        commonPubsub.set('onMediaUploadError', error);
      }
      return onUploadFinished({
        data: data && dataBuilder[type]?.({ data, error }, componentData, fileType, itemIndex),
        error,
      });
    };

    uploadFile = (file, onLocalLoad, onUploadFinished, itemPos) => {
      const { type } = this.props;
      if (file) {
        this.fileReader(file).then(url => {
          const { componentData } = this.props;
          const tempData = tempDataBuilder[type]?.({
            url,
            file,
          });
          onLocalLoad?.(tempData);
          const handleFileUpload = uploadFunctionGetter[type](this.props);
          if (handleFileUpload) {
            const {
              helpers: { onMediaUploadStart, onMediaUploadEnd },
            } = this.props;
            const uploadBIData = onMediaUploadStart(type, file.size, file.type);
            const fileType = getGalleryFileType(file.type);
            handleFileUpload(file, ({ data, error }) => {
              onMediaUploadEnd(uploadBIData, error);
              this.handleUploadFinished(data, error, onUploadFinished, itemPos, fileType);
            });
          } else {
            this.handleUploadFinished(
              undefined,
              { msg: 'Missing upload function' },
              onUploadFinished,
              type
            );
          }
        });
      }
    };

    render() {
      return (
        <PluginComponent
          {...this.props}
          handleUploadStart={this.uploadFile}
          handleUploadFinished={this.handleUploadFinished}
        />
      );
    }
  };
};

const createBaseMediaPlugin = PluginComponent => {
  return createMediaUploadWrapper(
    class BaseMediaPlugin extends PureComponent {
      static propTypes = {
        componentData: PropTypes.object.isRequired,
        componentState: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        block: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired,
        handleUploadStart: PropTypes.func.isRequired,
        handleUploadFinished: PropTypes.func.isRequired,
        commonPubsub: PropTypes.object,
        type: PropTypes.string,
      };

      constructor(props) {
        super(props);
        this.state = { isLoading: false, tempData: null };
      }

      componentDidMount() {
        const { block, store, commonPubsub, type } = this.props;
        const blockKey = block.getKey();
        store?.setBlockHandler(
          'handleFilesSelected',
          blockKey,
          this.handleFilesSelected.bind(this)
        );
        store?.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded.bind(this));
        type === GALLERY_TYPE &&
          commonPubsub?.setBlockHandler(
            'galleryHandleFilesAdded',
            blockKey,
            this.handleFilesAdded.bind(this)
          );
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
            this.props.handleUploadFinished(
              item,
              (error instanceof Array && error[index]) || error,
              this.onUploadFinished
            );
          });
        } else {
          this.props.handleUploadFinished(data, error, this.onUploadFinished);
        }
      };

      render() {
        const { isLoading, tempData } = this.state;
        return <PluginComponent {...this.props} isLoading={isLoading} tempData={tempData} />;
      }
    }
  );
};

const getGalleryFileType = type => {
  return type.match('image/*')
    ? GALLERY_FILE_TYPES.IMAGE
    : type.match('video/*')
    ? GALLERY_FILE_TYPES.VIDEO
    : '';
};

export { createMediaUploadWrapper, createBaseMediaPlugin };
