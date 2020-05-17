export default isMobile => {
  let content = { maxWidth: 580, minHeight: 585 };
  if (isMobile) {
    content = {
      ...content,
      minHeight: '100%',
      minWidth: '100%',
      margin: 0,
      alignContent: 'center',
      top: 0,
      transform: 'none',
      backgroundColor: 'white',
    };
  }
  return { content };
};
