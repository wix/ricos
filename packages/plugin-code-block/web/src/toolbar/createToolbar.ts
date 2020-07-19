import { MODIFIERS, TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import CodeBlockIcon from '../icons/CodeBlockIcon';
import { getButtonProps } from './getCodeBlockButtonProps';

const codeBlockTexButtontMapper = config => {
  const icon = config[CODE_BLOCK_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || CodeBlockIcon;
  const commandHandler = editorState => {
    config.setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
  };

  return {
    TextButtonMapper: () => ({
      CodeBlock: {
        component: TextCodeBlockButton,
        externalizedButtonProps: getButtonProps({ icon, ...config }),
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
    InsertButtons: [
      {
        ...getButtonProps({ icon, ...config }),
        toolbars: [TOOLBARS.EXTERNAL, TOOLBARS.MOBILE, TOOLBARS.SIDE, TOOLBARS.FOOTER],
        addBlockHandler: commandHandler,
        type: BUTTON_TYPES.CUSTOM_BLOCK,
        tooltip: config.t('TextCodeBlock_InsertButton_Tooltip'),
      },
    ],
    name: CODE_BLOCK_TYPE,
  };
};

export default codeBlockTexButtontMapper;
