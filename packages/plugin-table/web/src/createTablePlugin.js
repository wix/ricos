import createToolbar from './toolbar';
import { Component } from './table-component';
import { DEFAULTS } from './defaults';
import { TABLE_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createTablePlugin = (config = {}) => {
  const {
    helpers,
    t,
    [TABLE_TYPE]: settings = {},
    isMobile,
    setEditorState,
    getEditorState,
    ...rest
  } = config;

  return createBasePlugin({
    component: Component,
    type: TABLE_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
      setEditorState,
      getEditorState,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    setEditorState,
    getEditorState,
    ...rest,
  });
};

export { createTablePlugin };
