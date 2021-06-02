import React, { Component } from 'react';
import {
  dataBuilder,
  tempDataBuilder,
  uploadFunctionGetter,
} from '../Utils/mediaPluginsDataBuilders';
import {
  fileExtensionToType,
  FileTypes,
} from 'wix-rich-content-plugin-file-upload/libs/fileExtensionToType';
import PropTypes from 'prop-types';

const createBaseMediaPlugin = ({ PluginComponent, pluginType }) => {
  return class MediaPlugin extends Component {
    static propTypes = {
      componentData: PropTypes.object.isRequired,
      children: PropTypes.any,
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
        data: data && dataBuilder[pluginType]?.({ data, error }, componentData, fileType),
        error,
        itemIndex,
      });
    };

    uploadFile = (files, onLocalLoad, onUploadFinished, itemPos) => {
      const file = files[0];
      if (file) {
        this.fileReader(file).then(url => {
          const extension = file.name.split('.').pop();
          const fileType = extension && FileTypes[fileExtensionToType(extension)];
          const tempData = tempDataBuilder[pluginType]?.(
            {
              url,
              file,
              type: extension,
            },
            fileType
          );
          const itemIndex = onLocalLoad?.(tempData, itemPos);
          const handleFileUpload = uploadFunctionGetter[pluginType](this.props);
          if (handleFileUpload) {
            const {
              helpers: { onMediaUploadStart, onMediaUploadEnd },
            } = this.props;
            const uploadBIData = onMediaUploadStart(pluginType, file.size, fileType);
            handleFileUpload(file, ({ data, error }) => {
              onMediaUploadEnd(uploadBIData, error);
              this.handleUploadFinished(data, error, onUploadFinished, itemIndex, fileType);
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

export default createBaseMediaPlugin;
