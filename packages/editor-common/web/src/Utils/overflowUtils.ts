type ElementCoords = {
  top: number;
  left: number;
};

const getElementCoordsInWindow = (elem: HTMLElement): ElementCoords => {
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

const getWindowWidth = (): number => {
  return window.innerWidth;
};

const getWidth = (element: HTMLElement): number => {
  return element.clientWidth;
};

export const isElementOutOfWindow = (element: HTMLElement): boolean | undefined => {
  if (window && document) {
    const modalOffset = getElementCoordsInWindow(element).left;
    const modalWidth = getWidth(element);
    const windowWidth = getWindowWidth();
    if (modalWidth + modalOffset > windowWidth) {
      return true;
    } else {
      return false;
    }
  } else {
    console.error('window or document not found'); //eslint-disable-line
  }
};
