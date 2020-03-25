export const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const modalStyles = (state, theme) => {
  return {
    content: Object.assign(
      {},
      (state.modalStyles || modalStyleDefaults).content,
      theme.modalTheme.content
    ),
    overlay: Object.assign(
      {},
      (state.modalStyles || modalStyleDefaults).overlay,
      theme.modalTheme.overlay
    ),
  };
};

const modalTheme = {
  content: {},
};

export const defaultTheme = {
  modalTheme,
};
