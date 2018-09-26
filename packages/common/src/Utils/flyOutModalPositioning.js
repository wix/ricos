export const getFlyOutModalPosition = (event, modalWidth, modalHeight, pubsub) => {
  const btnHeight = event.target.clientHeight;
  const btnWidth = event.target.clientWidth;
  const editorHeight = pubsub.store.get('editorBounds').height;
  const editorTop = pubsub.store.get('editorBounds').top;
  const editorWidth = pubsub.store.get('editorBounds').width;
  const editorLeft = pubsub.store.get('editorBounds').left;
  const y = (editorHeight - (event.clientY - editorTop) > modalHeight) ?
    event.clientY + btnHeight + 15 : event.clientY - modalHeight - 15;
  const x = (editorWidth - (event.clientX - editorLeft > modalWidth)) ?
    event.clientX - btnWidth : event.clientX - btnWidth / 2;
  return { left: x, top: y, postion: 'absolute' };
};

export const getFlyOutArrowModalPosition = (event, x, y, modalWidth, pubsub) => {
  const top = event.clientY - pubsub.store.get('editorBounds').top;
  const left = event.clientX - pubsub.store.get('editorBounds').left;
  const arrowX = (x > left) ? 15 : modalWidth - 15;
  return (y < top) ?
    {
      WebkitTransform: 'rotate(45deg)',
      left: arrowX,
      transform: 'rotate(45deg)',
      bottom: '-7px',
      display: 'block'
    } : {
      WebkitTransform: 'rotate(-135deg)',
      left: arrowX,
      transform: 'rotate(-135deg)',
      top: '-7px',
      display: 'block'
    };
};
