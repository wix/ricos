import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './file-upload-component';
import { FILE_UPLOAD_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

const createFileUploadPlugin = (config = {}) => {
  const type = FILE_UPLOAD_TYPE;
  const { helpers, t, [type]: settings = {}, ...rest } = config;

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
    ...rest,
  });
};

export { createFileUploadPlugin };
