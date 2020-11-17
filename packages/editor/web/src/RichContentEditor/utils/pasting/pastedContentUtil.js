import { OrderedSet } from 'immutable';
import rgbToHex from './rgbToHex';
import { Modifier, SelectionState } from 'wix-rich-content-editor-common';
import htmlToBlock from './htmlToBlock';
import { reduce } from 'lodash';

export const pastedContentConfig = customHeadings => {
  return {
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span') {
        const styles = [];
        node.style.color && styles.push(`{"FG":"${rgbToHex(node.style.color)}"}`);
        node.style.backgroundColor &&
          styles.push(`{"BG":"${rgbToHex(node.style.backgroundColor)}"}`);
        node.style.fontWeight > 500 && styles.push('BOLD');
        // fixes pasting text from google docs
        if (node.style.fontWeight === '400' && currentStyle?.toJS?.()?.includes?.('BOLD')) {
          // eslint-disable-next-line no-param-reassign
          currentStyle = currentStyle.delete('BOLD');
        }
        return OrderedSet.of(...styles).merge(currentStyle);
      } else {
        const styles = [];
        return OrderedSet.of(...styles).merge(currentStyle);
      }
    },
    htmlToEntity: (nodeName, node, createEntity) => {
      if (nodeName === 'a' && node.parentNode.tagName !== 'LI') {
        return createEntity('LINK', 'MUTABLE', {
          url: node.href,
          target: '_blank',
          rel: 'noopener',
        });
      }
      return null;
    },
    htmlToBlock: htmlToBlock(customHeadings),
  };
};

export const clearUnnecessaryInlineStyles = contentState => {
  const selection = selectAllContent(contentState);

  return reduce(
    unnecessaryInlineStyles,
    (newContentState, style) => Modifier.removeInlineStyle(newContentState, selection, style),
    contentState
  );
};

const unnecessaryInlineStyles = ['CODE'];

const selectAllContent = contentState => {
  const firstBlock = contentState.getBlockMap().first();
  const lastBlock = contentState.getBlockMap().last();
  const firstBlockKey = firstBlock.getKey();
  const lastBlockKey = lastBlock.getKey();
  const lengthOfLastBlock = lastBlock.getLength();

  return new SelectionState({
    anchorKey: firstBlockKey,
    anchorOffset: 0,
    focusKey: lastBlockKey,
    focusOffset: lengthOfLastBlock,
  });
};
