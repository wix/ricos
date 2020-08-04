import { RichUtils, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import SpoilerButton from './SpoilerButton';
import { SPOILER_TYPE } from '../types';
import SpoilerIcon from '../icons/spoilerIcon.svg';

const createToolbar = config => {
  const { t, getEditorState, setEditorState } = config;
  return {
    TextButtonMapper: () => ({
      [SPOILER_TYPE]: {
        component: SpoilerButton,
        externalizedButtonProps: {
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
          isDisabled: () => false, // TODO: check
        },
      },
    }),
    name: SPOILER_TYPE,
  };
};
export default createToolbar;
