const PANEL_WIDTH = 216;
const PANEL_HEIGHT = 116;
export const MODAL_STYLES = {
  desktop: {
    content: {
      display: 'inline-table',
      minHeight: PANEL_HEIGHT,
      height: 'auto',
      position: 'absolute',
      borderRadius: 6,
      border: 'solid 1px #ededed',
      margin: 0,
      minWidth: PANEL_WIDTH,
      maxWidth: 360,
      width: 'auto',
      transform: 'unset',
    },
    overlay: {
      background: 'transparent',
    },
  },
  mobile: {
    content: {
      display: 'inline-table',
      position: 'absolute',
      boxShadow: '4px 0 4px 0 rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.1)',
      margin: 0,
      bottom: 0,
      top: 'unset',
      transform: 'unset',
      width: '100%',
    },
    overlay: {
      background: 'transparent',
    },
  },
};
