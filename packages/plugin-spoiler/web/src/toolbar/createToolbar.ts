import { RichUtils, BUTTON_TYPES, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import TextSpoilerButton from './TextSpoilerButton';
import { SPOILER_TYPE } from '../types';
import SpoilerIcon from '../icons/SpoilerContainerIcon';
import {
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
}) => {
  return {
    //TODO: isMobile: true?
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.SPOILER]: {
        component: TextSpoilerButton,
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
