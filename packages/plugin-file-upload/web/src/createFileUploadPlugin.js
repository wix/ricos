import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './file-upload-component';
import { FILE_UPLOAD_TYPE } from './types';
import { createBasePlugin, onUploadStart } from 'wix-rich-content-plugin-commons';

const createFileUploadPlugin = (config = {}) => {
  const type = FILE_UPLOAD_TYPE;
  const { helpers, t, [type]: settings = {}, ...rest } = config;

  const updateEntityBIWrapper = (onMediaUploadStart, updateEntity) => {
    const uploadingFileBI = onUploadStart(type, onMediaUploadStart);
    return ({ data, error }) => updateEntity({ data, error, ...uploadingFileBI });
  };

  return createBasePlugin({
    component: Component,
    type: FILE_UPLOAD_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
    }),
    helpers,
    settings,
    t,
    defaultPluginData: DEFAULTS,
    updateEntityBIWrapper,
    ...rest,
  });
};

export { createFileUploadPlugin };
