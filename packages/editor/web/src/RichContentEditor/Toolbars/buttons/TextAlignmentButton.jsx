import { getTextAlignment, TEXT_BUTTONS } from 'wix-rich-content-editor-common';
import createTextDropdownButton from './utils/createTextDropdownButton';

const getActiveIcon = (textAlignment, buttonProps) => {
  return {
    left: buttonProps[TEXT_BUTTONS.ALIGN_LEFT].getIcon(),
    center: buttonProps[TEXT_BUTTONS.ALIGN_CENTER].getIcon(),
    right: buttonProps[TEXT_BUTTONS.ALIGN_RIGHT].getIcon(),
    justify: buttonProps[TEXT_BUTTONS.ALIGN_JUSTIFY].getIcon(),
  }[textAlignment];
};
/*
 * createTextAlignmentButton
 */
export default ({ buttonProps, getEditorState, defaultTextAlignment }) => {
  return createTextDropdownButton({
    buttons: [
      buttonProps[TEXT_BUTTONS.ALIGN_LEFT],
      buttonProps[TEXT_BUTTONS.ALIGN_CENTER],
      buttonProps[TEXT_BUTTONS.ALIGN_RIGHT],
      buttonProps[TEXT_BUTTONS.ALIGN_JUSTIFY],
    ],
    activeItem: () => {
      const alignment = getTextAlignment(getEditorState(), defaultTextAlignment);
      return getActiveIcon(alignment, buttonProps);
    },
    tooltipTextKey: 'AlignTextDropdownButton_Tooltip',
    dataHook: 'Alignment',
  });
};
