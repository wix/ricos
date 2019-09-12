export const COMMANDS = {
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
};

export const MODIFIERS = {
  COMMAND: 'command',
  CTRL: 'ctrl',
  OPTION: 'option',
  SHIFT: 'shift',
};

export const TOOLBARS = {
  SIDE: 'SIDE',
  MOBILE: 'MOBILE',
  FOOTER: 'FOOTER',
  STATIC: 'TEXT',
  INLINE: 'INLINE',
  PLUGIN: 'PLUGIN',
};

export const DISPLAY_MODE = {
  NORMAL: 'NORMAL',
  FLOATING: 'FLOATING',
};

export const DECORATION_MODE = {
  PREPEND: 'PREPEND',
  WRAP: 'WRAP',
  APPEND: 'APPEND',
};

export const HEADER_BLOCK = {
  ONE: 'header-one',
  TWO: 'header-two',
  THREE: 'header-three',
};

export const BLOCK_TYPES = [
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'unordered-list-item',
  'ordered-list-item',
  'blockquote',
  'atomic',
  'code-block',
  'unstyled',
];

export const PLUGIN_DECORATIONS = {
  RESIZEABLE: 'RESIZEABLE',
};

export const PLUGIN_DECORATION_PROPS = {
  [PLUGIN_DECORATIONS.RESIZEABLE]: props => ({
    onMouseDown: props.onMouseDown,
    onMouseMove: props.onMouseMove,
    onMouseLeave: props.onMouseLeave,
    style: props.style,
    width: props.width,
    containerClassName: props.containerClassName,
  }),
};
