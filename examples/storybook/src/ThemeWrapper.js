import React, { Children } from 'react';
import RceTheme from './RceTheme';
import { StyleSheet, css } from 'aphrodite';

const ThemeWrapper = ({ children, theme, palette }) => {
  const rceTheme = new RceTheme(theme, palette);
  const themes = StyleSheet.create(rceTheme.getStylesObject());
  const themeObj = Object.entries(themes).reduce((prev, curr) => {
    return { ...prev, [curr[0]]: css(curr[1]) };
  }, {});
  return Children.only(React.cloneElement(children, { theme: themeObj }));
};

export default ThemeWrapper;
