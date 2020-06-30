import { MODIFIERS } from 'wix-rich-content-editor-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import createInsertButtons from './insert-buttons';

const createToolbar: CreatePluginToolbar = ({ setEditorState, helpers, t, icon }) => {
  const commandHandler = (editorState: DraftEditorState) => {
    setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
  };

  return {
    TextButtonMapper: () => ({
      CodeBlock: {
        component: TextCodeBlockButton,
        isMobile: true,
        keyBindings: [
          {
            keyCommand: {
              command: 'code-block',
              modifiers: [MODIFIERS.COMMAND],
              key: '0',
            },
            commandHandler,
          },
        ],
      },
    }),
    InsertButtons: createInsertButtons({ helpers, t, addBlockHandler: commandHandler, icon }),
    name: 'code-block',
  };
};

export default createToolbar;
