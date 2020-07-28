import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
  setEditorState,
  getEditorState,
}) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile, setEditorState, getEditorState }),
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: 'table',
  };
};

export default createToolbar;
