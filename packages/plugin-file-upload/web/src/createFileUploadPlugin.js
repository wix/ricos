import createToolbar from './toolbar';
import { Component, DEFAULTS } from './file-upload-component';
import { FILE_UPLOAD_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createFileUploadPlugin = (config = {}) => {
  const type = FILE_UPLOAD_TYPE;
  const { helpers, t, [type]: settings = {}, pluginDefaults = {}, ...rest } = config;

  pluginDefaults[type] = DEFAULTS;

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
    pluginDefaults,
    ...rest,
  });
};

export { createFileUploadPlugin };
