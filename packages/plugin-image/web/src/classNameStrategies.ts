import classNames from 'classnames';
import { camelCase, isNumber, upperFirst } from 'lodash';
import { ClassNameStrategy } from 'wix-rich-content-common';

export const alignmentClassName: ClassNameStrategy = (componentData, theme, styles, isMobile) => {
  const { alignment, size } = componentData.config || {};
  if (!alignment || (isMobile && size !== 'original')) {
    return '';
  }
  let align = alignment;
  if (size === 'original' && alignment !== 'center') {
    const { width } = componentData.src || {};
    if (isNumber(width) && width >= 350) {
      align = 'center';
    }
  }
  return classNames(styles[`align${upperFirst(align)}`], theme[`align${upperFirst(align)}`]);
};

export const sizeClassName: ClassNameStrategy = (componentData, theme, styles, isMobile) => {
  const { size } = componentData.config || {};
  if (!size || (isMobile && size === 'original')) {
    return '';
  }
  return isMobile
    ? classNames(styles.sizeFullWidth, theme.sizeFullWidth)
    : classNames(
        styles[`size${upperFirst(camelCase(size))}`],
        theme[`size${upperFirst(camelCase(size))}`]
      );
};
