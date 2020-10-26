import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar, TranslationFunction, PluginConfig } from 'wix-rich-content-common';
import { SetEditorState, GetEditorState } from 'wix-rich-content-common/src';

const createToolbar: CreatePluginToolbar = ({
  settings,
  setEditorState,
  getEditorState,
  isMobile,
  t,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  setEditorState: SetEditorState;
  getEditorState: GetEditorState;
}) => {
  return {
    InlineButtons: createInlineButtons({ setEditorState, getEditorState }),
    InsertButtons: createInsertButtons({ settings, isMobile, t }),
    name: 'link-preview',
  };
};

export default createToolbar;
