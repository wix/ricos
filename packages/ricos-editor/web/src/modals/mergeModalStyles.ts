const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const mergeModalStyles = (modalStyles, theme) => {
  return {
    content: Object.assign(
      {},
      (modalStyles || modalStyleDefaults).content,
      theme.modalTheme.content
    ),
    overlay: Object.assign(
      {},
      (modalStyles || modalStyleDefaults).overlay,
      theme.modalTheme.overlay
    ),
  };
};

export default mergeModalStyles;
