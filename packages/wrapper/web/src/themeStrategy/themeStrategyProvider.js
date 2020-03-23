import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import pluginNested from 'jss-plugin-nested';
import { defaultTheme } from './defaults';

const createThemeStrategy = (themeObj = {}) => (innerProps = {}) => {
  const { theme = {} } = innerProps;
  return { theme: { ...themeObj, ...theme } };
};

export default function themeStrategyProvider(isEditor, themeProperties) {
  const { theme } = themeProperties;
  if (typeof theme === 'string') {
    jss.setup({ plugins: [...preset().plugins, pluginNested] });
    const themeGenerator = new ThemeGenerator(isEditor, themeProperties);
    const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
    const themeObj = styles.attach();
    return createThemeStrategy({ ...defaultTheme, ...themeObj.classes });
  }
  return createThemeStrategy({ ...defaultTheme, ...theme });
}
