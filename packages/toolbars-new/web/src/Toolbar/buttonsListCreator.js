/* eslint-disable fp/no-loops */
import {
  PluginsDataMap,
  DecorationsDataMap,
  GetEditorState,
  SetEditorState,
  TextAlignment,
  InlineStyle,
  IMAGE_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  POLL_TYPE,
  VIDEO_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HTML_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_POLL_TYPE,
  RICOS_FILE_TYPE,
  RICOS_LINK_TYPE,
  LINK_TYPE,
  RICOS_MENTION_TYPE,
  MENTION_TYPE,
  CODE_BLOCK_TYPE,
  HEADER_BLOCK,
  BLOCKQUOTE,
  UNSTYLED,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
} from 'wix-rich-content-common';

const buttonsActionTranslator = {
  HEADINGS: 'HEADINGS',
  '|': 'Separator',
  Bold: 'Bold',
  Italic: 'Italic',
  Underline: 'Underline',
  TEXT_COLOR: 'TEXT_COLOR',
  TEXT_HIGHLIGHT: 'TEXT_HIGHLIGHT',
  Title: 'Title',
  Blockquote: BLOCKQUOTE,
  Alignment: 'Alignment',
  OrderedList: NUMBERED_LIST_TYPE,
  UnorderedList: BULLET_LIST_TYPE,
  DECREASE_INDENT: 'DECREASE_INDENT',
  INCREASE_INDENT: 'INCREASE_INDENT',
  SPOILER: 'SPOILER',
  LINE_SPACING: 'LINE_SPACING',
  LINK: 'LINK',
  CODE_BLOCK: CODE_BLOCK_TYPE,
};

const buttonsTypeTranslator = {
  DROPDOWN: ['HEADINGS', 'TEXT_COLOR', 'TEXT_HIGHLIGHT', 'LINE_SPACING'],
  SEPARATOR: ['Separator'],
  button: [
    'Bold',
    'Italic',
    'Underline',
    'Title',
    'Quote',
    'NumberedList',
    'BulletedList',
    'DECREASE_INDENT',
    'INCREASE_INDENT',
    'SPOILER',
    'LINK',
    'CODE_BLOCK',
  ],
  GROUP: ['Alignment'],
};

export const createButtonsList = (formattingButtonsKeys, editorCommands) => {
  const buttonsList = {};
  formattingButtonsKeys.forEach((buttonKey, index) => {
    handleButtonName(buttonsList, buttonKey, index);
    handleButtonType(buttonsList, index);
  });
  return buttonsList;
};

const handleButtonType = (buttonsList, index) => {
  for (const [key, value] of Object.entries(buttonsTypeTranslator)) {
    if (value.some(buttonName => buttonName === buttonsList[index].name)) {
      buttonsList[index].type = key;
    }
  }
};

const handleButtonName = (buttonsList, buttonKey, index) => {
  if (buttonKey === '|') {
    buttonsList[index] = { name: 'Separator' };
  } else if (buttonKey.name) {
    buttonsList[index] = { name: buttonKey.name };
  } else {
    buttonsList[index] = { name: buttonKey };
  }
};

// let isActiveFromEC;
// let onClickFromEC;
// if (inlineStyleButtons.includes(buttonProps.name)) {
//   onClickFromEC = () => this.props.editorCommands.toggleInlineStyle(buttonProps.name);
//   isActiveFromEC = this.props.editorCommands.hasInlineStyle(buttonProps.name);
// } else if (textBlockButtons[buttonProps.name]) {
//   onClickFromEC = () =>
//     this.props.editorCommands.setBlockType(textBlockButtons[buttonProps.name]);
//   isActiveFromEC = this.props.editorCommands.isBlockTypeSelected(
//     textBlockButtons[buttonProps.name]
//   );
// }
