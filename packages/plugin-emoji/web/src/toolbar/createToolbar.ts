import createInsertButtons from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({
  settings,
  helpers,
  t,
  isMobile,
  getEditorState,
  setEditorState,
}) => {
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
};

export default createToolbar;
