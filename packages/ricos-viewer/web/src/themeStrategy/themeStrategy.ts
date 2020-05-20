import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';

export default function themeStrategy(
  isViewer: boolean,
  themeGeneratorFunctions?: ThemeGeneratorFunction[],
  palette?: Palette | PalettePreset,
  cssOverride?: CssOverride
): { theme: CssOverride } {
  jss.setup(preset());
  const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
  const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
  const theme: object = styles.attach().classes;
  return { theme: { ...defaultTheme, ...theme, ...cssOverride } };
}
