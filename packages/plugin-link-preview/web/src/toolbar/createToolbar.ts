import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({
  settings,
  setEditorState,
  getEditorState,
  helpers,
  isMobile,
  t,
}) => {
  return {
    InlineButtons: createInlineButtons({ setEditorState, getEditorState }),
    InsertButtons: createInsertButtons({ helpers, settings, isMobile, t }),
    name: 'link-preview',
  };
};

export default createToolbar;
