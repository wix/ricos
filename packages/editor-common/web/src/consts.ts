export const HEADER_TYPE_MAP = {
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  P: 'unstyled',
};

export const DEFAULT_HEADERS_DROPDOWN_OPTIONS = ['P', 'H2', 'H3', 'H4', 'H5', 'H6'];

export const COMMANDS = Object.freeze({
  TITLE: 'header-two',
  SUBTITLE: 'header-three',
  ALIGN_LEFT: 'left',
  ALIGN_RIGHT: 'right',
  ALIGN_CENTER: 'center',
  JUSTIFY: 'justify',
  NUMBERED_LIST: 'ordered-list-item',
  BULLET_LIST: 'unordered-list-item',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  BACKSPACE: 'backspace',
  DELETE: 'delete',
  TAB: 'tab',
  SHIFT_TAB: 'shiftTab',
});

export const TEXT_TYPES = Object.freeze([
  'unstyled',
  'blockquote',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'ordered-list-item',
  'unordered-list-item',
]);

export const CHARACTERS = Object.freeze({
  TAB: '\t',
});

export { ModifierKey as MODIFIERS, ToolbarType as TOOLBARS } from 'wix-rich-content-common';

export const DISPLAY_MODE = Object.freeze({
  NORMAL: 'NORMAL',
  FLOATING: 'FLOATING',
});

export const DECORATION_MODE = Object.freeze({
  PREPEND: 'PREPEND',
  WRAP: 'WRAP',
  APPEND: 'APPEND',
});

export const PLUGIN_DECORATIONS = Object.freeze({
  RESIZEABLE: 'RESIZEABLE',
});

export const PLUGIN_DECORATION_PROPS = Object.freeze({
  [PLUGIN_DECORATIONS.RESIZEABLE]: props => ({
    onMouseDown: props.onMouseDown,
    onMouseMove: props.onMouseMove,
    onMouseLeave: props.onMouseLeave,
    style: props.style,
    width: props.width,
    containerClassName: props.containerClassName,
  }),
});

export const TOOLBAR_OFFSETS = Object.freeze({
  top: 12,
  left: 15,
});

export const KEYS_CHARCODE = {
  ENTER: 13,
  ESCAPE: 27,
};

export const TEXT_BUTTONS = Object.freeze({
  BOLD: 'Bold',
  ITALIC: 'Italic',
  UNDERLINE: 'Underline',
  TITLE: 'Title',
  BLOCKQUOTE: 'Blockquote',
  ALIGN_LEFT: 'AlignLeft',
  ALIGN_RIGHT: 'AlignRight',
  ALIGN_CENTER: 'AlignCenter',
  ALIGN_JUSTIFY: 'Justify',
  ORDERED_LIST: 'OrderedList',
  UNORDERED_LIST: 'UnorderedList',
});

export const BUTTON_TYPES = Object.freeze({
  BUTTON: 'button',
  FILE: 'file',
  MODAL: 'modal',
  CUSTOM_BLOCK: 'custom-block',
  SEPARATOR: 'SEPARATOR',
  DROPDOWN: 'DROPDOWN',
  GROUP: 'GROUP',
});
