import { EditorState, Modifier } from '@wix/draft-js';
import {
  getTextAlignment,
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
  AlignmentJustifyIcon,
} from 'wix-rich-content-common';
import {
  AlignTextLeftButton,
  AlignTextCenterButton,
  AlignTextRightButton,
  AlignTextJustifyButton,
} from './TextButtons';
import { createTextDropdownButton } from './utils';

const activeIcon = textAlignment => {
  switch (textAlignment) {
    case 'center':
      return AlignmentCenterIcon;
    case 'right':
      return AlignmentRightIcon;
    case 'justify':
      return AlignmentJustifyIcon;
    case 'left':
    default:
      return AlignmentLeftIcon;
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
