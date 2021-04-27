/* eslint-disable fp/no-loops */
import {
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
} from 'wix-rich-content-common';

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockQuoteIcon,
  TitleIcon,
  // TitleOneIcon,
  // TitleTwoIcon,
  OrderedListIcon,
  UnorderedListIcon,
  LinkIcon,
  // AlignTextCenterIcon,
  // AlignJustifyIcon,
  AlignLeftIcon,
  // AlignRightIcon,
  TextColorIcon,
  TextHighlightIcon,
  increaseIndentPluginIcon,
  decreaseIndentPluginIcon,
  SpoilerButtonIcon,
  LineSpacingIcon,
  CodeBlockIcon,
} from '../icons';

const buttonsFullData = {
  HEADINGS: {
    icon: () => null,
    dataHook: 'headingsDropdownButton',
    tooltip: 'Text style',
    label: 'Paragraph',
    arrow: true,
    action: 'HEADINGS',
    type: 'DROPDOWN',
  },
  Separator: {
    type: 'SEPARATOR',
  },
  Bold: {
    icon: BoldIcon,
    dataHook: 'textInlineStyleButton_BOLD',
    tooltip: 'Bold',
    action: 'Bold',
    type: 'button',
  },
  Italic: {
    icon: ItalicIcon,
    dataHook: 'textInlineStyleButton_ITALIC',
    tooltip: 'Italic',
    action: 'Italic',
    type: 'button',
  },
  Underline: {
    icon: UnderlineIcon,
    dataHook: 'textInlineStyleButton_UNDERLINE',
    tooltip: 'Underline',
    action: 'Underline',
    type: 'button',
  },
  TEXT_COLOR: {
    icon: TextColorIcon,
    dataHook: 'wix-rich-content-text-color-button',
    tooltip: 'Text color',
    action: 'TEXT_COLOR',
    type: 'DROPDOWN',
  },
  TEXT_HIGHLIGHT: {
    icon: TextHighlightIcon,
    dataHook: 'wix-rich-content-text-highlight-button',
    tooltip: 'Highlight color',
    action: 'TEXT_HIGHLIGHT',
    type: 'DROPDOWN',
  },
  Title: {
    icon: TitleIcon,
    dataHook: 'textBlockStyleButton_Title',
    tooltip: 'Title',
    action: 'Title',
    type: 'button',
  },
  Blockquote: {
    icon: BlockQuoteIcon,
    dataHook: 'textBlockStyleButton_Quote',
    tooltip: 'Quote',
    action: BLOCKQUOTE,
    type: 'button',
  },
  Alignment: {
    icon: AlignLeftIcon,
    dataHook: 'Alignment',
    tooltip: 'Alignment',
    action: 'Alignment',
    type: 'button',
    // type: 'GROUP',
  },
  OrderedList: {
    icon: OrderedListIcon,
    dataHook: 'textBlockStyleButton_NumberedList',
    tooltip: 'Numbered list',
    action: NUMBERED_LIST_TYPE,
    type: 'button',
  },
  UnorderedList: {
    icon: UnorderedListIcon,
    dataHook: 'textBlockStyleButton_BulletedList',
    tooltip: 'Bulleted list',
    action: BULLET_LIST_TYPE,
    type: 'button',
  },
  DECREASE_INDENT: {
    icon: decreaseIndentPluginIcon,
    dataHook: 'DECREASE_INDENT',
    tooltip: 'Decrease indent',
    action: 'DECREASE_INDENT',
    type: 'button',
  },
  INCREASE_INDENT: {
    icon: increaseIndentPluginIcon,
    dataHook: 'INCREASE_INDENT',
    tooltip: 'Increase indent',
    action: 'INCREASE_INDENT',
    type: 'button',
  },
  SPOILER: {
    icon: SpoilerButtonIcon,
    dataHook: 'spoilerButton',
    tooltip: 'Spoiler',
    action: 'SPOILER',
    type: 'button',
  },
  LINE_SPACING: {
    icon: LineSpacingIcon,
    dataHook: 'LINE_SPACING',
    tooltip: 'Line spacing',
    action: 'LINE_SPACING',
    type: 'DROPDOWN',
  },
  LINK: {
    icon: LinkIcon,
    dataHook: 'LINK',
    tooltip: 'Link',
    action: 'LINK',
    type: 'button',
  },
  CODE_BLOCK: {
    icon: CodeBlockIcon,
    dataHook: 'CODE_BLOCK',
    tooltip: 'Code snippet',
    action: CODE_BLOCK_TYPE,
    type: 'button',
  },
};

const inlineStyleButtons = ['Bold', 'Italic', 'Underline'];

const textBlockButtons = ['CODE_BLOCK', 'Blockquote', 'OrderedList', 'UnorderedList'];

export const createButtonsList = (formattingButtonsKeys, editorCommands) => {
  const buttonsList = [];
  formattingButtonsKeys.forEach((buttonKey, index) => {
    handleButtonName(buttonsList, buttonKey, index);
    handleButtonType(buttonsList, index);
    handleButtonIcon(buttonsList, index);
    handleButtonDataHook(buttonsList, index);
    handleButtonTooltip(buttonsList, index);
    handleButtonLabel(buttonsList, index);
    handleButtonArrow(buttonsList, index);
    handleButtonOnClick(buttonsList, index, editorCommands);
    handleButtonIsActive(buttonsList, index, editorCommands);
    handleButtonIsDisabled(buttonsList, index);
  });
  return buttonsList;
};

const handleButtonIsDisabled = (buttonsList, index) => {
  buttonsList[index].isDisabled = () => false;
};

const handleButtonIsActive = (buttonsList, index, editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (inlineStyleButtons.includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.hasInlineStyle(buttonsFullData[buttonName].action);
  } else if (textBlockButtons.includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.isBlockTypeSelected(buttonsFullData[buttonName].action);
  } else {
    buttonsList[index].isActive = () => false;
  }
};

const handleButtonOnClick = (buttonsList, index, editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (inlineStyleButtons.includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.toggleInlineStyle(buttonsFullData[buttonName].action);
  } else if (textBlockButtons.includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.setBlockType(buttonsFullData[buttonName].action);
  } else {
    buttonsList[index].onClick = () => console.log('click');
  }
};

const handleButtonArrow = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].arrow) {
    buttonsList[index].arrow = buttonsFullData[buttonsList[index].name].arrow;
  }
};

const handleButtonLabel = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].label) {
    buttonsList[index].getLabel = () => buttonsFullData[buttonsList[index].name].label;
  }
};

const handleButtonTooltip = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].tooltip) {
    buttonsList[index].tooltip = buttonsFullData[buttonsList[index].name].tooltip;
  }
};

const handleButtonDataHook = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].dataHook) {
    buttonsList[index].dataHook = buttonsFullData[buttonsList[index].name].dataHook;
  }
};

const handleButtonIcon = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].icon) {
    buttonsList[index].getIcon = () => buttonsFullData[buttonsList[index].name].icon;
  }
};

const handleButtonType = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].type) {
    buttonsList[index].type = buttonsFullData[buttonsList[index].name].type;
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
