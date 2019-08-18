import clsx from 'clsx';
import { camelCase, isNumber, upperFirst } from 'lodash';

export const alignmentClassName = (componentData, theme, styles, isMobile) => {
  const { alignment, size } = componentData.config || {};
  if (!alignment || (isMobile && size !== 'original')) {
    return '';
  }
  let align = alignment;
  if (size === 'original' && alignment !== 'center') {
    const { width } = componentData.src || {};
    if (isNumber(width) && width > 350) {
      align = 'center';
    }
  }
  return clsx(styles[`align${upperFirst(align)}`], theme[`align${upperFirst(align)}`]);
};

export const sizeClassName = (componentData, theme, styles, isMobile) => {
  const { size } = componentData.config || {};
  if (!size || (isMobile && size === 'original')) {
    return '';
  }
  return isMobile
    ? clsx(styles.sizeFullWidth, theme.sizeFullWidth)
    : clsx(
        styles[`size${upperFirst(camelCase(size))}`],
        theme[`size${upperFirst(camelCase(size))}`]
      );
};
