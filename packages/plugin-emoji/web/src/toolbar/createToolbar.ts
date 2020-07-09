import createInsertButtons from './insert-buttons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  settings,
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
          t,
          isMobile,
          getEditorState,
          setEditorState,
        }),
    name: 'emoji',
  };
};

export default createToolbar;
