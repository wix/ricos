import createToolbar from './toolbar';
import { Component } from './file-upload-component';
import { FILE_UPLOAD_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-common';

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
    ...rest,
  });
};

export { createFileUploadPlugin };
