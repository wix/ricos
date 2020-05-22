// @flow
import { MODIFIERS } from 'wix-rich-content-editor-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import createInsertButtons from './codeBlockInsertButtons';
import CodeBlockIcon from '../icons/CodeBlockIcon';

const codeBlockTexButtontMapper /*: TextButtonMapper */ = config => {
  const { setEditorState, helpers, t } = config;
  const icon = config[CODE_BLOCK_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || CodeBlockIcon;
  const commandHandler = editorState => {
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
    name: CODE_BLOCK_TYPE,
  };
};

export default codeBlockTexButtontMapper;
