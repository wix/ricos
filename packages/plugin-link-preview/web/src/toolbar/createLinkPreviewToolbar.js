import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({
  settings,
  setEditorState,
  getEditorState,
  helpers,
  isMobile,
}) {
  const buttons = {
    InlineButtons: createInlineButtons(setEditorState, getEditorState),
    InsertButtons: createInsertButtons({ helpers, settings, isMobile }),
  };

  return {
    ...buttons,
    name: 'link-preview',
  };
}
