import mergeWith from 'lodash/mergeWith';
import pickBy from 'lodash/pickBy';
import has from 'lodash/has';

const cssClassMerger = (defaultStyleClassName, themeClassName) =>
  `${defaultStyleClassName} ${themeClassName}`;

export const mergeStyles = ({ styles, theme }) => {
  if (!theme) {
    return styles;
  }
  const themeStyles = pickBy(theme);
  const themeStylesToMerge = pickBy(themeStyles, (value, key) => has(styles, key));
  return mergeWith({ ...styles }, themeStylesToMerge, cssClassMerger);
};
