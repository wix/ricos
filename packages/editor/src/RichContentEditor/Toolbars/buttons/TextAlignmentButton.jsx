import { EditorState, Modifier } from '@wix/draft-js';
import {
  getTextAlignment,
  AlignLeftIcon,
  AlignCenterIcon,
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
      return AlignCenterIcon;
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
    const editorState = getEditorState();
    const contentState = Modifier.mergeBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      { textAlignment }
    );
    const newEditorState = EditorState.push(editorState, contentState, 'change-block-data');
    setEditorState(newEditorState);
  },
  tooltipTextKey: 'AlignTextDropdownButton_Tooltip',
});
