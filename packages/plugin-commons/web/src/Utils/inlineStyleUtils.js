import {
  getSelectedBlocks,
  getSelectionRange,
  isInSelectionRange,
} from 'wix-rich-content-editor-common';
import { uniq } from 'lodash';

const getBlockStyleRanges = (block, styleSelectionPredicate) => {
  const styleRanges = [];

  block.findStyleRanges(
    character => {
      const styles = character.getStyle();
      return styles.toArray().filter(style => styleSelectionPredicate(style));
    },
    (start, end) => {
      const styles = block.getInlineStyleAt(start).filter(style => styleSelectionPredicate(style));
      styles.toArray().forEach(style => styleRanges.push({ start, end, style }));
    }
  );
  return styleRanges;
};

/**
 * getSelectionStyles
 *
 * @param {function} styleSelectionPredicate - style selection criteria
 * @returns {string[]} a set of relevant styles found in selection
 */
export const getSelectionStyles = (styleSelectionPredicate, editorState) => {
  const selectedBlocks = getSelectedBlocks(editorState);
  return uniq(
    selectedBlocks.reduce((selectedStyles, block) => {
      const blockSelectionRange = getSelectionRange(editorState, block);

      // for each selected block, get its style ranges (only for styles that meet the styleSelectionPredicate criteria)
      const blockStyleRanges = getBlockStyleRanges(block, styleSelectionPredicate); // { start, end, style }

      // if style range is in selection, add this style to result set
      return [
        ...selectedStyles,
        ...blockStyleRanges
          .filter(range => isInSelectionRange(blockSelectionRange, [range.start, range.end]))
          .map(range => range.style),
      ];
    }, [])
  );
};
