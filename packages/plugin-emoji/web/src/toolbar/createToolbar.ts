import createInsertButtons from './insert-buttons';
import {
  CreatePluginToolbar,
  TranslationFunction,
  PluginConfig,
  GetEditorState,
  SetEditorState,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  getEditorState,
  setEditorState,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
}) => {
  return {
    InsertButtons: isMobile
      ? []
      : createInsertButtons({
          settings,
          t,
          isMobile,
          getEditorState,
          setEditorState,
        }),
    name: 'emoji',
  };
};

export default createToolbar;
