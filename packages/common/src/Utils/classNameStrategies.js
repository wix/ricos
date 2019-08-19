import clsx from 'clsx';
import { camelCase, upperFirst } from 'lodash';

export const alignmentClassName = (componentData, theme, styles) => {
  const { alignment } = componentData.config || {};
  if (!alignment) {
    return '';
  }
  const key = `align${upperFirst(alignment)}`;
  return clsx(styles[key], theme[key]);
};

export const sizeClassName = (componentData, theme, styles) => {
  const { size } = componentData.config || {};
  if (!size) {
    return '';
  }
  const key = `size${upperFirst(camelCase(size))}`;
  return clsx(styles[key], theme[key]);
};

export const textWrapClassName = (componentData, theme, styles) => {
  const { textWrap } = componentData.config || {};
  if (!textWrap) {
    return '';
  }
  const key = `textWrap${upperFirst(camelCase(textWrap))}`;
  return clsx(styles[key], theme[key]);
};
