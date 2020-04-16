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

export const MODIFIERS = Object.freeze({
  COMMAND: 'command',
  OPTION: 'option',
  SHIFT: 'shift',
});

export const TOOLBARS = Object.freeze({
  SIDE: 'SIDE',
  MOBILE: 'MOBILE', //Text Toolbar
  FOOTER: 'FOOTER',
  STATIC: 'TEXT', //Text Toolbar
  INLINE: 'INLINE', //Text Toolbar
  PLUGIN: 'PLUGIN',
  TEXT: 'ALL-TEXT-TOOLBARS',
});

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
