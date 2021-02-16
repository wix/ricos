import React, { FunctionComponent } from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

function highlightSelection() {
  let range;
  const sel = window.getSelection();

  if (sel) {
    range = sel.getRangeAt(0);
  }

  document.designMode = 'on';

  if (range) {
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  document.execCommand('BackColor', false, 'yellow');
  document.designMode = 'off';
}

const HighlightButton: FunctionComponent = () => {
  return (
    <button
      data-hook="hightlight-button"
      className={styles.option}
      onClick={() => highlightSelection()}
    >
      H
    </button>
  );
};

export default HighlightButton;
