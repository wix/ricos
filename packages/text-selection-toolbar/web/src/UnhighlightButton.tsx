import React, { FunctionComponent } from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

function unhighlight(node) {
  if (node.nodeType === 1) {
    const bg = node.style.backgroundColor;
    if (bg === 'yellow') {
      node.style.backgroundColor = '';
    }
  }

  let child = node.firstChild;

  while (child) {
    unhighlight(child);
    child = child.nextSibling;
  }
}

const UnhighlightButton: FunctionComponent = () => {
  return (
    <button
      data-hook="unhightlight-button"
      className={styles.option}
      onClick={() => unhighlight(document.body)}
    >
      <del>H</del>
    </button>
  );
};

export default UnhighlightButton;
