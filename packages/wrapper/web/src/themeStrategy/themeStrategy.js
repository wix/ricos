import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';

export default function themeStrategy(isEditor, themeProperties) {
  const { theme } = themeProperties;
  if (typeof theme === 'string') {
    jss.setup(preset());
    const themeGenerator = new ThemeGenerator(isEditor, themeProperties);
    const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
    const themeObj = styles.attach();
    return { theme: { ...defaultTheme, ...themeObj.classes } };
  }
  return { theme: { ...defaultTheme, ...theme } };
}
