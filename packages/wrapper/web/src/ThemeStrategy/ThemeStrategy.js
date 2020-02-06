import RceTheme from './RceTheme';
import { StyleSheet, css } from 'aphrodite';
import { theme as defaultTheme } from '../defaults';

export default function themeStrategy({ settings = {}, ...rest }) {
  const { theme = {}, palette } = settings;
  const customizedTheme = rest?.theme || {};
  if (typeof theme === 'string') {
    const rceTheme = new RceTheme(theme, palette);
    const themes = StyleSheet.create(rceTheme.getStylesObject());
    const themeObj = Object.entries(themes).reduce((prev, curr) => {
      return { ...prev, [curr[0]]: css(curr[1]) };
    }, {});
    return { theme: { ...defaultTheme, ...themeObj, ...customizedTheme } };
  }
  return { theme: { ...defaultTheme, ...theme } };
}
