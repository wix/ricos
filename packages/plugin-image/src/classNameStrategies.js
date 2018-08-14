// @flow
import classNames from 'classnames';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import isNumber from 'lodash/isNumber';

export const alignmentClassName /*: ClassNameStrategy*/ = (componentData, theme, styles, isMobile) => {
  const { alignment, size } = componentData.config || {};
  if (!alignment || isMobile) {
    return '';
  }
  let align = alignment;
  if (size === 'original' && alignment !== 'center') {
    const { width } = componentData.src || {};
    if (isNumber(width) && width > 350) {
      align = 'center';
    }
  }
  return classNames(styles[`align${upperFirst(align)}`], theme[`align${upperFirst(align)}`]);
};


export const sizeClassName /*: ClassNameStrategy*/ = (componentData, theme, styles, isMobile) => {
  const { size } = componentData.config || {};
  if (!size) {
    return '';
  }
  if (isMobile) {
    return classNames(styles.sizeFullWidth, theme.sizeFullWidth);
  }
  return classNames(styles[`size${upperFirst(camelCase(size))}`], theme[`size${upperFirst(camelCase(size))}`]);
};
