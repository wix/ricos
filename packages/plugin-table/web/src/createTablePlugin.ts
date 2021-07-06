import createToolbar from './toolbar/createToolbar';
import { Component } from './table-component';
import { getDefaultsSettings } from './tableUtil';
import { TABLE_TYPE, TablePluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { COMMANDS } from 'wix-rich-content-editor-common';
import CodeUtils from 'draft-js-code';

const createTablePlugin: CreatePluginFunction<TablePluginEditorConfig> = config => {
  const {
    localeContent,
    locale,
    helpers,
    t,
    [TABLE_TYPE]: settings = {},
    isMobile,
    ...rest
  } = config;

  return createBasePlugin(
    {
      component: Component,
      type: TABLE_TYPE,
      toolbar: createToolbar({
        helpers,
        t,
        settings,
        isMobile,
      }),
      helpers,
      settings,
      t,
      isMobile,
      defaultPluginData: getDefaultsSettings(),
      noPluginBorder: true,
      noPointerEventsOnFocus: true,
      withHorizontalScroll: true,
      locale: localeContent || locale,
      ...rest,
    },
    {
      handleKeyCommand: (command, editorState, timestamp, { setEditorState }) => {
        if (CodeUtils.hasSelectionInBlock(editorState)) {
          let newState;
          if (command === COMMANDS.TAB) {
            return 'handled';
          }
          if (newState) {
            setEditorState(newState);
            return 'handled';
          }
        }
        return 'not-handled';
      },
    }
  );
};

export { createTablePlugin };
