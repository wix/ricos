export const DesktopTextButtonList = [
  [],
  ['Bold', 'Italic', 'Underline', 'Title', 'Blockquote'],
  ['Alignment', 'OrderedList', 'UnorderedList'],
];

export const MobileTextButtonList = [
  [],
  [
    'AddPlugin',
    'Bold',
    'Italic',
    'Underline',
    'Title',
    'Blockquote',
    'AlignLeft',
    'AlignCenter',
    'AlignRight',
    'AlignJustify',
    'OrderedList',
    'UnorderedList',
  ],
];

export { default as textAlignmentButton } from './TextAlignmentButton';
export { default as AddPluginButton } from './AddPluginButton';
export {
  boldButton,
  italicButton,
  underlineButton,
  titleButton,
  blockquoteButton,
  alignTextLeftButton,
  alignTextCenterButton,
  alignTextRightButton,
  alignTextJustifyButton,
  orderedListButton,
  unorderedListButton,
} from './TextButtons';
