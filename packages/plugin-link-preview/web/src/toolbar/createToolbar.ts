import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
  setEditorState,
  getEditorState,
  isMobile,
  t,
}) => {
  return {
    InlineButtons: createInlineButtons({ setEditorState, getEditorState }),
    InsertButtons: createInsertButtons({ settings, isMobile, t }),
    name: 'link-preview',
  };
};

export default createToolbar;
