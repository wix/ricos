import { BUTTON_TYPES, indentSelectedBlocks } from 'wix-rich-content-editor-common';
import { INDENT_TYPE } from '../types';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';

export default function createToolbar(config) {
  const { getEditorState, isMobile } = config;

  const getIcon = type => {
    const editorState = getEditorState();
    const content = editorState.getCurrentContent();
    const key = editorState.getSelection().getStartKey();
    const selectedBlockKey = content.getBlockForKey(key).getKey();
    const directionMap = editorState.getDirectionMap();
    return {
      LTR: {
        indent: config[INDENT_TYPE]?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
        unindent: config[INDENT_TYPE]?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
      },
      RTL: {
        unindent: config[INDENT_TYPE]?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
        indent: config[INDENT_TYPE]?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
      },
    }[directionMap.get(selectedBlockKey)][type];
  };

  return {
    TextButtonMapper: () => ({
      DecreaseIndent: {
        isMobile,
        group: {
          desktop: 2,
          mobile: 2,
        },
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            const indented = indentSelectedBlocks(config.getEditorState(), -1);
            config.setEditorState(indented);
          },
          isActive: () => false,
          getIcon: () => getIcon('unindent'),
          tooltip: config.t('decreaseIndentButton_Tooltip'),
          label: '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
          // TODO: should be disabled when no indent?
          isDisabled: () => false,
        },
      },
      IncreaseIndent: {
        isMobile,
        group: {
          desktop: 2,
          mobile: 2,
        },
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            const indented = indentSelectedBlocks(config.getEditorState(), 1);
            config.setEditorState(indented);
          },
          isActive: () => false,
          getIcon: () => getIcon('indent'),
          tooltip: config.t('increaseIndentButton_Tooltip'),
          label: '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
          // TODO: should be disabled when no indent?
          isDisabled: () => false,
        },
      },
    }),
    name: 'indent',
  };
}
