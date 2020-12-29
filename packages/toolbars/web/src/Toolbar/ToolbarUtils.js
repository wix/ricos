const getElementCoordsInWindow = elem => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

const getWindowWidth = () => {
  return window.innerWidth;
};

const getWidth = element => {
  return element.clientWidth;
};

export const getModalPosition = element => {
  if (window && document) {
    const modalOffset = getElementCoordsInWindow(element).left;
    const modalWidth = getWidth(element);
    const windowWidth = getWindowWidth();
    if (modalWidth + modalOffset > windowWidth) {
      return { right: 0 };
    } else {
      return { left: 0 };
    }
  } else {
    console.error('window or document not found'); //eslint-disable-line
  }
};
