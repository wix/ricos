import { getTextAlignment, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import createTextDropdownButton from './utils/createTextDropdownButton';

const getActiveIcon = (textAlignment, buttonProps) => {
  return {
    left: buttonProps[FORMATTING_BUTTONS.ALIGN_LEFT].getIcon(),
    center: buttonProps[FORMATTING_BUTTONS.ALIGN_CENTER].getIcon(),
    right: buttonProps[FORMATTING_BUTTONS.ALIGN_RIGHT].getIcon(),
    justify: buttonProps[FORMATTING_BUTTONS.ALIGN_JUSTIFY].getIcon(),
  }[textAlignment];
};
/*
 * createTextAlignmentButton
 */
export default ({ buttonProps, getEditorState, defaultTextAlignment }) => {
  return createTextDropdownButton({
    buttons: [
      buttonProps[FORMATTING_BUTTONS.ALIGN_LEFT],
      buttonProps[FORMATTING_BUTTONS.ALIGN_CENTER],
      buttonProps[FORMATTING_BUTTONS.ALIGN_RIGHT],
      buttonProps[FORMATTING_BUTTONS.ALIGN_JUSTIFY],
    ],
    activeItem: () => {
      const alignment = getTextAlignment(getEditorState(), defaultTextAlignment);
      return getActiveIcon(alignment, buttonProps);
    },
    tooltipTextKey: 'AlignTextDropdownButton_Tooltip',
    dataHook: 'Alignment',
  });
};
