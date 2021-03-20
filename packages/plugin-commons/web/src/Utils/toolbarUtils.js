// calculates total offset for an element, relative to (0,0)
export const getCumulativeOffset = (element, offsetTop, offsetLeft) => {
  if (element.offsetParent) {
    return getCumulativeOffset(
      element.offsetParent,
      offsetTop + element.offsetTop || 0,
      offsetLeft + element.offsetLeft || 0
    );
  }

  return {
    offsetTop: offsetTop + element.offsetTop,
    offsetLeft: offsetLeft + element.offsetLeft,
  };
};
