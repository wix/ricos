const getRelativeParent = element => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

export const positionSuggestions = ({
  entryHeight,
  additionalHeight,
  reposition = false,
  visibleItemsBeforeOverflow,
} = {}) => ({ decoratorRect, popover, state, props }) => {
  const relativeParent = getRelativeParent(popover.parentElement);
  const relativeRect = {};

  if (relativeParent) {
    relativeRect.scrollLeft = relativeParent.scrollLeft;
    relativeRect.scrollTop = relativeParent.scrollTop;

    const relativeParentRect = relativeParent.getBoundingClientRect();
    relativeRect.left = decoratorRect.left - relativeParentRect.left;
    relativeRect.top = decoratorRect.bottom - relativeParentRect.top;
  } else {
    relativeRect.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    relativeRect.scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    relativeRect.top = decoratorRect.bottom;
    relativeRect.left = decoratorRect.left;
  }

  const left = relativeRect.left + relativeRect.scrollLeft;
  let top = relativeRect.top + relativeRect.scrollTop;

  const popoverHeight =
    Math.min(props.suggestions.length, visibleItemsBeforeOverflow || props.suggestions.length) *
      entryHeight +
    additionalHeight;
  const isBelow = decoratorRect.bottom + popoverHeight > window.innerHeight;

  if (isBelow && reposition) {
    top -= popoverHeight + decoratorRect.height + 14;
  }

  let transform;
  let transition;
  if (state.isActive) {
    if (props.suggestions.length > 0) {
      transform = 'scale(1)';
      transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else {
      transform = 'scale(0)';
      transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
    }
  }

  const styles = {
    left: `${left}px`,
    top: `${top}px`,
    transform,
    transformOrigin: '1em 0%',
    transition,
  };

  if (visibleItemsBeforeOverflow) {
    styles.overflow = 'auto';
    styles.height = `${popoverHeight}px`;
  }

  return styles;
};
