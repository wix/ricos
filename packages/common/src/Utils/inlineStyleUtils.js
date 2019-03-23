/**
 * getSelectionStyles
 *
 * @param {function} styleSelectionPredicate - style selection criteria
 * @returns {string[]} a set of relevant styles found in selection
 */
export const getSelectionStyles = (styleSelectionPredicate, editorState) => {
  return editorState
    .getCurrentInlineStyle()
    .toArray()
    .filter(style => styleSelectionPredicate(style));
};
