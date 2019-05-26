import mergeWith from 'lodash/mergeWith';
import pickBy from 'lodash/pickBy';
import has from 'lodash/has';

const cssClassMerger = (defaultStyleClassName, themeClassName) =>
  `${defaultStyleClassName} ${themeClassName}`;

export const mergeStyles = ({ styles, theme }) => {
  if (!theme) {
    console.warn('mergeStyles invoked without theme!'); //eslint-disable-line no-console
    return styles;
  }
  const themeStyles = pickBy(theme);
  const themeStylesToMerge = pickBy(themeStyles, (value, key) => has(styles, key));
  return mergeWith({ ...styles }, themeStylesToMerge, cssClassMerger);
};
