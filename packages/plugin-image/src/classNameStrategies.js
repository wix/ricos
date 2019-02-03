import classNames from 'classnames';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import isNumber from 'lodash/isNumber';

export const alignmentClassName = (componentData, theme, styles) => {
  const { alignment, size } = componentData.config || {};
  if (!alignment) {
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

export const sizeClassName = (componentData, theme, styles) => {
  const { size } = componentData.config || {};
  if (!size) {
    return '';
  }
  return classNames(
    styles[`size${upperFirst(camelCase(size))}`],
    theme[`size${upperFirst(camelCase(size))}`]
  );
};
