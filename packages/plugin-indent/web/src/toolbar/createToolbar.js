import { BUTTON_TYPES, indentSelectedBlocks } from 'wix-rich-content-editor-common';
import { DecreaseIndentButton, IncreaseIndentButton } from './IndentButtons';
import { INDENT_TYPE } from '../types';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';

export default function createToolbar(config) {
  const { isMobile } = config;
  return {
    TextButtonMapper: () => ({
      decreaseIndent: {
        component: DecreaseIndentButton,
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
          getIcon: () =>
            config[INDENT_TYPE]?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
          tooltip: config.t('decreaseIndentButton_Tooltip'),
          label: '', // new key needed?
          buttonType: BUTTON_TYPES.BUTTON,
        },
      },
      increaseIndent: {
        component: IncreaseIndentButton,
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
          getIcon: () =>
            config[INDENT_TYPE]?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
          tooltip: config.t('increaseIndentButton_Tooltip'),
          label: '', // new key needed?
          buttonType: BUTTON_TYPES.BUTTON,
        },
      },
    }),
    name: 'indent',
  };
}
