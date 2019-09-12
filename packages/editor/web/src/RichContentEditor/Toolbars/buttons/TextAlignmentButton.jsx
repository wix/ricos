import {
  getTextAlignment,
  setTextAlignment,
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from 'wix-rich-content-common';
import {
  AlignTextLeftButton,
  AlignTextCenterButton,
  AlignTextRightButton,
  AlignTextJustifyButton,
} from './TextButtons';
import createTextDropdownButton from './utils/createTextDropdownButton';

const activeIcon = textAlignment => {
  switch (textAlignment) {
    case 'center':
      return AlignTextCenterIcon;
    case 'right':
      return AlignRightIcon;
    case 'justify':
      return AlignJustifyIcon;
    case 'left':
    default:
      return AlignLeftIcon;
  }
};

export default createTextDropdownButton({
  buttons: [
    AlignTextLeftButton,
    AlignTextCenterButton,
    AlignTextRightButton,
    AlignTextJustifyButton,
  ],
  activeItem: ({ getEditorState, value, defaultValue }) => {
    const alignment = value || getTextAlignment(getEditorState(), defaultValue);
    return {
      alignment,
      Icon: activeIcon(alignment),
    };
  },
  onChange: (getEditorState, setEditorState, textAlignment) => {
    const newEditorState = setTextAlignment(getEditorState(), textAlignment);
    setEditorState(newEditorState);
  },
  tooltipTextKey: 'AlignTextDropdownButton_Tooltip',
});
