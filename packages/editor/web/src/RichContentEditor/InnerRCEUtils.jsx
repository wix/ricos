export const getInnerModalPosition = (editorRef, innerRCECaptionRef) => {
  // this.innerRCEHeight = innerRCECaptionRef.offsetHeight;
  const width = innerRCECaptionRef.offsetWidth;
  const top =
    innerRCECaptionRef.getBoundingClientRect().top - editorRef.getBoundingClientRect().top;
  const left =
    innerRCECaptionRef.getBoundingClientRect().left - editorRef.getBoundingClientRect().left;
  return { width, top, left };
};

export const getInnerModalStyle = innerRCEPosition => {
  return {
    backgroundColor: 'white',
    position: 'absolute',
    top: `${innerRCEPosition.top}px`,
    left: `${innerRCEPosition.left}px`,
    width: `${innerRCEPosition.width}px`,
    height: `auto`,
    zIndex: 5,
  };
};
