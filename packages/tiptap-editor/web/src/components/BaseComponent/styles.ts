import classNames from 'classnames';
import { camelCase, upperFirst } from 'lodash';

export const getAlignmentClassName = (styles, alignment, theme) => {
  if (!alignment) {
    return '';
  }
  const key = `align${upperFirst(alignment)}`;
  return classNames(styles[key], theme[key]);
};

export const getSizeClassName = (styles, size, theme) => {
  if (!size) {
    return '';
  }
  const key = `size${upperFirst(camelCase(size))}`;
  return classNames(styles[key], theme[key]);
};

export const getFocusClassName = (styles, theme, isFocused) => {
  return classNames({
    [styles.hasFocus]: isFocused,
    [theme.hasFocus]: isFocused,
    [styles.hideTextSelection]: !isFocused,
  });
};

export const getTextWrapClassName = (styles, theme, textWrap) => {
  if (!textWrap) {
    return '';
  }
  const key = `textWrap${upperFirst(camelCase(textWrap))}`;
  return classNames(styles[key], theme[key]);
};

export const getPluginContainerClassName = (styles, theme, isMobile) => {
  return classNames(styles.pluginContainer, theme.pluginContainer, theme.pluginContainerWrapper, {
    [styles.pluginContainerMobile]: isMobile,
    [theme.pluginContainerMobile]: isMobile,
  });
};
