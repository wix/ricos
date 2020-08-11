import { RichUtils, BUTTON_TYPES, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import SpoilerButton from './SpoilerButton';
import { SPOILER_TYPE } from '../types';
import SpoilerIcon from '../icons/spoilerIcon.svg';

const createToolbar = config => {
  const { t, getEditorState, setEditorState } = config;
  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.SPOILER]: {
        component: SpoilerButton,
        externalizedButtonProps: {
          dataHook: 'spoilerButton',
          type: BUTTON_TYPES.BUTTON,
          tooltip: t('Spoiler_Insert_Tooltip'),
          getLabel: () => t('Spoiler_Insert_Tooltip'), // TODO: need another key?
          getIcon: () => SpoilerIcon,
          onClick: () =>
            setEditorState(RichUtils.toggleInlineStyle(getEditorState(), SPOILER_TYPE)),
          isActive: () =>
            getEditorState()
              .getCurrentInlineStyle()
              .has(SPOILER_TYPE),
          isDisabled: () =>
            getEditorState()
              .getSelection()
              .isCollapsed(),
        },
      },
    }),
    name: SPOILER_TYPE,
  };
};
export default createToolbar;
