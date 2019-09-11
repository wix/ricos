import { has, mergeWith, pickBy } from 'lodash';

const cssClassMerger = (defaultStyleClassName, themeClassName) =>
  `${defaultStyleClassName} ${themeClassName}`;

export const mergeStyles = ({ styles, theme }) => {
  if (!theme) {
    console.warn('mergeStyles invoked without theme!'); //eslint-disable-line no-console
    return styles;
  }
  const themeStyles = pickBy(theme);
  const themeStylesToMerge = pickBy(themeStyles, (_, key) => has(styles, key));
  return mergeWith({ ...styles }, themeStylesToMerge, cssClassMerger);
};
