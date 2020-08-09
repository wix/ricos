export function setListeners(div) {
  let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

  div.addEventListener('mousedown', e => {
    curCol = e.target.parentElement;
    nxtCol = curCol.nextElementSibling;
    pageX = e.pageX;

    const padding = paddingDiff(curCol);

    curColWidth = curCol.offsetWidth - padding;
    if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
  });

  div.addEventListener('mouseover', e => {
    e.target.style.borderRight = '2px solid #0000ff';
  });

  div.addEventListener('mouseout', e => {
    e.target.style.borderRight = '';
  });

  document.addEventListener('mousemove', e => {
    if (curCol) {
      const diffX = e.pageX - pageX;
      if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + 'px';
      curCol.style.width = curColWidth + diffX + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
  });
}

function paddingDiff(col) {
  if (getStyleVal(col, 'box-sizing') === 'border-box') {
    return 0;
  }

  const padLeft = getStyleVal(col, 'padding-left');
  const padRight = getStyleVal(col, 'padding-right');
  return parseInt(padLeft) + parseInt(padRight);
}

function getStyleVal(elm, css) {
  return window.getComputedStyle(elm, null).getPropertyValue(css);
}
