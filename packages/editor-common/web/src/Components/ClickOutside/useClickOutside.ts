import React, { useEffect, useRef, useState } from 'react';

const isMouseEvent = e => ['mouseup', 'mousedown'].includes(e.type);
const isTouchEvent = e => ['touchstart', 'touchend'].includes(e.type);
const isStartEvent = e => ['touchstart', 'mousedown'].includes(e.type) && !!e.target;
const isEndEvent = e => ['touchend', 'mouseup'].includes(e.type) && !!e.target;
const isEventInside = (containerRef, e) => containerRef.current?.contains(e.target as Node);

function useClickOutside(
  containerRef: React.RefObject<HTMLElement>,
  onClickOutside: (e: MouseEvent | TouchEvent) => void
) {
  const isTouch = useRef(false);
  const [isStartEventInside, setStartEventInside] = useState(false);
  const events = ['touchstart', 'touchend', 'mousedown', 'mouseup'];

  useEffect(() => {
    events.forEach(e => document.addEventListener(e, handler, true));
    return () => {
      events.forEach(e => document.removeEventListener(e, handler, true));
    };
  });

  function handler(e: MouseEvent | TouchEvent) {
    isTouch.current = isTouchEvent(e);
    if (isMouseEvent(e) && isTouch.current) {
      return;
    }

    if (isStartEvent(e)) {
      setStartEventInside(isEventInside(containerRef, e));
    }
    if (isEndEvent(e) && !isEventInside(containerRef, e) && !isStartEventInside) {
      onClickOutside(e);
    }
  }
}

export default useClickOutside;
