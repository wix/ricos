import RceTheme from './RceTheme';
import { createUseStyles } from 'react-jss';

export default function themeStrategy({ settings = {}, ...rest }) {
  const { theme, palette } = settings;
  const customizedTheme = (rest && rest.theme) || {};
  if (typeof theme === 'string') {
    const rceTheme = new RceTheme(theme, palette);
    const generateTheme = createUseStyles(rceTheme.getStylesObject());
    const themeObj = generateTheme();
    return { theme: { ...themeObj, ...customizedTheme } };
  }
  return { theme };
}
