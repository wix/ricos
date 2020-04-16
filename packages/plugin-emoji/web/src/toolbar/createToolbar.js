import createInsertButtons from './insert-buttons';

export default function createToolbar({
  settings,
  helpers,
  styles,
  t,
  isMobile,
  getEditorState,
  setEditorState,
}) {
  return {
    InsertButtons: isMobile
      ? []
      : createInsertButtons({
          settings,
          helpers,
          styles,
          t,
          getEditorState,
          setEditorState,
        }),
    name: 'emoji',
  };
}
