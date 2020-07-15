import { has, mergeWith, pickBy } from 'lodash';
import { Styles, RichContentTheme } from '../types';

const cssClassMerger = (defaultStyleClassName: string, themeClassName: string) =>
  `${defaultStyleClassName} ${themeClassName}`;

export const mergeStyles = ({
  styles,
  theme,
}: {
  styles: Styles;
  theme: RichContentTheme;
}): Styles => {
  if (!theme) {
    console.warn('mergeStyles invoked without theme!'); //eslint-disable-line no-console
    return styles;
  }
  const themeStyles = pickBy(theme);
  const themeStylesToMerge = pickBy(themeStyles, (_, key) => has(styles, key));
  return mergeWith({ ...styles }, themeStylesToMerge, cssClassMerger);
};
