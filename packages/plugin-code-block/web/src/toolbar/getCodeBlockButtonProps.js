import {
  isAtomicBlockFocused,
  INSERT_PLUGIN_BUTTONS,
  BUTTON_TYPES,
} from 'wix-rich-content-plugin-commons';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';

export const getButtonProps = ({ icon, getEditorState, setEditorState, t }) => ({
  getIcon: () => icon,
  tooltip: t('TextCodeBlockButton_Tooltip'),
  getLabel: () => t(INSERT_PLUGIN_BUTTONS.CODE_BLOCK),
  name: INSERT_PLUGIN_BUTTONS.CODE_BLOCK,
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
