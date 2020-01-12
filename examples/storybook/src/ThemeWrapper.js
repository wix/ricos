import React, { Children } from 'react';
import RceTheme from './RceTheme';
import { createUseStyles } from 'react-jss';

const ThemeWrapper = ({ children, theme, palette }) => {
  const rceTheme = new RceTheme(theme, palette);
  const useHashtagStyles = createUseStyles(rceTheme.getStylesObject());
  const themeObj = useHashtagStyles();
  return Children.only(React.cloneElement(children, { theme: themeObj }));
};

export default ThemeWrapper;
