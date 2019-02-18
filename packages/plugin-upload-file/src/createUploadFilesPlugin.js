import createToolbar from './toolbar';
import { Component } from './upload-file-component';
import { UPLOAD_FILE_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-common';

const createUploadFilesPlugin = (config = {}) => {
  const type = UPLOAD_FILE_TYPE;
  const { helpers, t, [type]: settings = {}, ...rest } = config;
  return createBasePlugin({
    component: Component,
    type: UPLOAD_FILE_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings
    }),
    helpers,
    settings,
    t,
    ...rest
  });
};

export { createUploadFilesPlugin };
