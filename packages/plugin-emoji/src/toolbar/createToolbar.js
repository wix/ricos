import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t, isMobile, getEditorState }) {
  return {
    InsertButtons: createInsertButtons({ settings, helpers, styles, t, isMobile, getEditorState }),
    name: 'emoji',
  };
}
