import {
  isAtomicBlockFocused,
  BUTTON_TYPES,
  FORMATTING_BUTTONS,
  indentSelectedBlocks,
} from 'wix-rich-content-editor-common';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon';
import { DecreaseIndentButton, IncreaseIndentButton } from './IndentButtons';
import {
  CreatePluginToolbar,
  SetEditorState,
  GetEditorState,
  TranslationFunction,
} from 'wix-rich-content-common';
import { IndentPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  getEditorState,
  settings,
  setEditorState,
  t,
}: {
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: IndentPluginEditorConfig;
  t: TranslationFunction;
}) => {
  const getIconByDirection = (type: 'indent' | 'unindent') => {
    const editorState = getEditorState();
    const content = editorState.getCurrentContent();
    const key = editorState.getSelection().getStartKey();
    const selectedBlockKey = content.getBlockForKey(key).getKey();
    const directionMap = editorState.getDirectionMap();
    return {
      LTR: {
        indent: settings?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
        unindent: settings?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
      },
      RTL: {
        unindent: settings?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
        indent: settings?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
      },
    }[directionMap.get(selectedBlockKey)][type];
  };
  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.DECREASE_INDENT]: {
        component: DecreaseIndentButton,
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            const indented = indentSelectedBlocks(getEditorState(), -1);
            setEditorState(indented);
          },
          isActive: () => false,
          getIcon: () => getIconByDirection('unindent'),
          tooltip: t('decreaseIndentButton_Tooltip'),
          getLabel: () => '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
          // TODO: should be disabled when no indent?
          isDisabled: () => isAtomicBlockFocused(getEditorState()),
        },
      },
      [FORMATTING_BUTTONS.INCREASE_INDENT]: {
        component: IncreaseIndentButton,
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            const indented = indentSelectedBlocks(getEditorState(), 1);
            setEditorState(indented);
          },
          isActive: () => false,
          getIcon: () => getIconByDirection('indent'),
          tooltip: t('increaseIndentButton_Tooltip'),
          getLabel: () => '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
          // TODO: should be disabled when no indent?
          isDisabled: () => isAtomicBlockFocused(getEditorState()),
        },
      },
    }),
    name: 'indent',
  };
};

export default createToolbar;
