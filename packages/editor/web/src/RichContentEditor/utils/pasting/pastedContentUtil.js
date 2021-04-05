import { OrderedSet } from 'immutable';
import rgbToHex from './rgbToHex';
import { Modifier, SelectionState } from 'wix-rich-content-editor-common';
import htmlToBlock from './htmlToBlock';
import { colorNameToHex } from './colorNameToHex';
import { reduce } from 'lodash';

const isBlack = color => color === '#000000';

const shouldIncludeColor = color => {
  if (color && !isBlack(color)) {
    return true;
  }
  return false;
};

const getInlineColors = style => {
  const styles = [];
  if (style.color) {
    const FG = colorNameToHex(style.color) || rgbToHex(style.color);
    if (shouldIncludeColor(FG)) {
      styles.push(`{"FG":"${FG}"}`);
    }
  }

  if (style.backgroundColor) {
    const BG = colorNameToHex(style.backgroundColor) || rgbToHex(style.backgroundColor);
    if (shouldIncludeColor(BG)) {
      styles.push(`{"BG":"${BG}"}`);
    }
  }
  return styles;
};

export const pastedContentConfig = customHeadings => {
  return {
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span') {
        const styles = [];
        styles.push(...getInlineColors(node.style));
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
