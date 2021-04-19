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

const buttonsIconTranslator = {
  HEADINGS: () => null,
  Bold: BoldIcon,
  Italic: ItalicIcon,
  Underline: UnderlineIcon,
  TEXT_COLOR: TextColorIcon,
  TEXT_HIGHLIGHT: TextHighlightIcon,
  Title: TitleIcon,
  Blockquote: BlockQuoteIcon,
  Alignment: AlignLeftIcon,
  OrderedList: OrderedListIcon,
  UnorderedList: UnorderedListIcon,
  DECREASE_INDENT: decreaseIndentPluginIcon,
  INCREASE_INDENT: increaseIndentPluginIcon,
  SPOILER: SpoilerButtonIcon,
  LINE_SPACING: LineSpacingIcon,
  LINK: LinkIcon,
  CODE_BLOCK: CodeBlockIcon,
};

const buttonsDataHookTranslator = {
  HEADINGS: 'headingsDropdownButton',
  Bold: 'textInlineStyleButton_BOLD',
  Italic: 'textInlineStyleButton_ITALIC',
  Underline: 'textInlineStyleButton_UNDERLINE',
  TEXT_COLOR: 'wix-rich-content-text-color-button',
  TEXT_HIGHLIGHT: 'wix-rich-content-text-highlight-button',
  Title: 'textBlockStyleButton_Title',
  Blockquote: 'textBlockStyleButton_Quote',
  Alignment: 'Alignment',
  OrderedList: 'textBlockStyleButton_NumberedList',
  UnorderedList: 'textBlockStyleButton_BulletedList',
  DECREASE_INDENT: 'DECREASE_INDENT',
  INCREASE_INDENT: 'INCREASE_INDENT',
  SPOILER: 'spoilerButton',
  LINE_SPACING: 'LINE_SPACING',
  LINK: 'LINK',
  CODE_BLOCK: 'CODE_BLOCK',
};

const buttonsTooltipTranslator = {
  HEADINGS: 'Text style',
  Bold: 'Bold',
  Italic: 'Italic',
  Underline: 'Underline',
  TEXT_COLOR: 'Text color',
  TEXT_HIGHLIGHT: 'Highlight color',
  Title: 'Title',
  Blockquote: 'Quote',
  Alignment: 'Alignment',
  OrderedList: 'Numbered list',
  UnorderedList: 'Bulleted list',
  DECREASE_INDENT: 'Decrease indent',
  INCREASE_INDENT: 'Increase indent',
  SPOILER: 'Spoiler',
  LINE_SPACING: 'Line spacing',
  LINK: 'Link',
  CODE_BLOCK: 'Code snippet',
};

const buttonsLabelTranslator = {
  HEADINGS: 'Paragraph',
};

const buttonsArrowTranslator = {
  HEADINGS: true,
};

const buttonsActionTranslator = {
  HEADINGS: 'HEADINGS',
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
    // 'Quote',
    'Blockquote',
    // 'NumberedList',
    'OrderedList',
    // 'BulletedList',
    'UnorderedList',
    'DECREASE_INDENT',
    'INCREASE_INDENT',
    'SPOILER',
    'LINK',
    'CODE_BLOCK',
    'Alignment',
  ],
  // GROUP: ['Alignment'],
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
      editorCommands.hasInlineStyle(buttonsActionTranslator[buttonName]);
  } else if (textBlockButtons.includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.isBlockTypeSelected(buttonsActionTranslator[buttonName]);
  } else {
    buttonsList[index].isActive = () => false;
  }
};

const handleButtonOnClick = (buttonsList, index, editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (inlineStyleButtons.includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.toggleInlineStyle(buttonsActionTranslator[buttonName]);
  } else if (textBlockButtons.includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.setBlockType(buttonsActionTranslator[buttonName]);
  } else {
    buttonsList[index].onClick = () => console.log('click');
  }
};

const handleButtonArrow = (buttonsList, index) => {
  if (Object.keys(buttonsArrowTranslator).includes(buttonsList[index].name)) {
    buttonsList[index].arrow = () => buttonsArrowTranslator[buttonsList[index].name];
  }
};

const handleButtonLabel = (buttonsList, index) => {
  if (Object.keys(buttonsLabelTranslator).includes(buttonsList[index].name)) {
    buttonsList[index].getLabel = () => buttonsLabelTranslator[buttonsList[index].name];
  }
};

const handleButtonTooltip = (buttonsList, index) => {
  if (Object.keys(buttonsTooltipTranslator).includes(buttonsList[index].name)) {
    buttonsList[index].tooltip = buttonsTooltipTranslator[buttonsList[index].name];
  }
};

const handleButtonDataHook = (buttonsList, index) => {
  if (Object.keys(buttonsDataHookTranslator).includes(buttonsList[index].name)) {
    buttonsList[index].dataHook = buttonsDataHookTranslator[buttonsList[index].name];
  }
};

const handleButtonIcon = (buttonsList, index) => {
  if (Object.keys(buttonsIconTranslator).includes(buttonsList[index].name)) {
    buttonsList[index].getIcon = () => buttonsIconTranslator[buttonsList[index].name];
  }
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
