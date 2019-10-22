import { MODIFIERS } from 'wix-rich-content-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import createInsertButtons from './codeBlockInsertButtons';

export default ({ setEditorState, helpers, t }) => {
  const commandHandler = editorState => {
    setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
  };

  return {
    TextButtonMapper: () => ({
      CodeBlock: {
        component: TextCodeBlockButton,
        isMobile: true,
        position: {
          mobile: 7,
        },
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
    InsertButtons: createInsertButtons({ helpers, t, addBlockHandler: commandHandler }),
    name: 'code-block',
  };
};
