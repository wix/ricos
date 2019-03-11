import { MODIFIERS } from 'wix-rich-content-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';

export default ({ setEditorState }) => ({
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
          commandHandler: editorState => {
            setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
          },
        },
      ],
    },
  }),
});
