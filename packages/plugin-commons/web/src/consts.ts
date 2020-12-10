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

export const FOOTER_BUTTON_ALIGNMENT = Object.freeze({
  CENTER: 'center',
  END: 'end',
});

export const MODAL_CONTROLS_POSITION = Object.freeze({
  TOP: 'top',
  BOTTOM: 'bottom',
});
