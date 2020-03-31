import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import pluginNested from 'jss-plugin-nested';
import { defaultTheme } from './defaults';

export default function themeStrategy(isEditor, themeProperties) {
  const { theme } = themeProperties;
  if (typeof theme === 'string') {
    jss.setup({ plugins: [...preset().plugins, pluginNested] });
    const themeGenerator = new ThemeGenerator(isEditor, themeProperties);
    const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
    const themeObj = styles.attach();
    return { theme: { ...defaultTheme, ...themeObj.classes } };
  }
  return { theme: { ...defaultTheme, ...theme } };
}
