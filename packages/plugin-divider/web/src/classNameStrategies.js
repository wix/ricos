import classNames from 'classnames';

export const customClassName = (componentData, theme, styles) => {
  const { alignment } = componentData.config || {};
  if (alignment !== 'center') {
    return '';
  }
  const key = `flex`;
  return classNames(styles[key], theme[key]);
};
