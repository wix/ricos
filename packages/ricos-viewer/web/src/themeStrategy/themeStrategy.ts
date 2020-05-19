import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import { merge } from 'lodash';
import { defaultTheme } from './defaults';

jss.setup(preset());

export default function themeStrategy(
  isViewer: boolean,
  themeProperties: ThemeProperties
): { theme: Theme } {
  const { palette, theme = {} } = themeProperties;
  let paletteTheme: object = {};
  if (!palette || palette !== 'Default') {
    const themeGenerator = new ThemeGenerator(isViewer, themeProperties as PropertiesWithPalette);
    const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
    paletteTheme = styles.attach().classes;
  }
  return { theme: merge(defaultTheme, paletteTheme, theme) };
}
