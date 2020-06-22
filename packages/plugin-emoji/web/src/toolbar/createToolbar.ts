import createInsertButtons from './insert-buttons';

export default function createToolbar({
  settings,
  helpers,
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
          t,
          getEditorState,
          setEditorState,
        }),
    name: 'emoji',
  };
}
