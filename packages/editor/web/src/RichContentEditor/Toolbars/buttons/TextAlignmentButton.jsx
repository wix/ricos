import {
  getTextAlignment,
  setTextAlignment,
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from 'wix-rich-content-editor-common';
import {
  alignTextLeftButton,
  alignTextCenterButton,
  alignTextRightButton,
  alignTextJustifyButton,
} from './TextButtons';
import createTextDropdownButton from './utils/createTextDropdownButton';

const activeIcon = (textAlignment, icons) => {
  const { AlignLeft, AlignCenter, AlignRight, AlignJustify } = icons;
  switch (textAlignment) {
    case 'center':
      return AlignCenter || AlignTextCenterIcon;
    case 'right':
      return AlignRight || AlignRightIcon;
    case 'justify':
      return AlignJustify || AlignJustifyIcon;
    case 'left':
    default:
      return AlignLeft || AlignLeftIcon;
  }
};

export default icons => {
  const { AlignLeft, AlignCenter, AlignRight, AlignJustify } = icons;
  return createTextDropdownButton({
    buttons: [
      alignTextLeftButton(AlignLeft),
      alignTextCenterButton(AlignCenter),
      alignTextRightButton(AlignRight),
      alignTextJustifyButton(AlignJustify),
    ],
    activeItem: ({ getEditorState, value, defaultValue }) => {
      const alignment = value || getTextAlignment(getEditorState(), defaultValue);
      return {
        alignment,
        Icon: activeIcon(alignment, icons),
      };
    },
    onChange: (getEditorState, setEditorState, textAlignment) => {
      const newEditorState = setTextAlignment(getEditorState(), textAlignment);
      setEditorState(newEditorState);
    },
    tooltipTextKey: 'AlignTextDropdownButton_Tooltip',
  });
};
