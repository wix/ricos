import { isAtomicBlockFocused, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';

const INSERT_BUTTON_NAME = 'CodeblockPlugin_InsertButton';

export const getButtonProps = ({ icon, getEditorState, setEditorState, t }) => ({
  getIcon: () => icon,
  tooltip: t('TextCodeBlockButton_Tooltip'),
  getLabel: () => t(INSERT_BUTTON_NAME),
  name: INSERT_BUTTON_NAME,
  isDisabled: () => isAtomicBlockFocused(getEditorState()),
  onClick: () => setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, getEditorState())),
  isActive: () => {
    const editorState = getEditorState();
    const key = editorState.getSelection().getStartKey();
    return (
      editorState
        .getCurrentContent()
        .getBlockForKey(key)
        .getType() === CODE_BLOCK_TYPE
    );
  },
  type: BUTTON_TYPES.BUTTON,
});
