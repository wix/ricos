import classNames from 'classnames';
import { camelCase, upperFirst } from 'lodash';
import { ClassNameStrategy } from '../types';

export const alignmentClassName: ClassNameStrategy = (componentData, theme, styles) => {
  const { alignment } = componentData.config || {};
  if (!alignment) {
    return '';
  }
  const key = `align${upperFirst(alignment)}`;
  return classNames(styles[key], theme[key]);
};

export const sizeClassName: ClassNameStrategy = (componentData, theme, styles) => {
  const { size } = componentData.config || {};
  if (!size) {
    return '';
  }
  const key = `size${upperFirst(camelCase(size))}`;
  return classNames(styles[key], theme[key]);
};

export const textWrapClassName: ClassNameStrategy = (componentData, theme, styles) => {
  const { textWrap } = componentData.config || {};
  if (!textWrap) {
    return '';
  }
  const key = `textWrap${upperFirst(camelCase(textWrap))}`;
  return classNames(styles[key], theme[key]);
};

export const depthClassName = depth => `public-DraftStyleDefault-block-depth${depth}`;
