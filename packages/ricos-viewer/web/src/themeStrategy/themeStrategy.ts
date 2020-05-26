import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';

jss.setup(preset());

export default function themeStrategy(
  isViewer: boolean,
  themeGeneratorFunctions?: ThemeGeneratorFunction[],
  palette?: Palette | PalettePreset,
  cssOverride?: RicosCssOverride
): { theme: RicosCssOverride } {
  let paletteTheme = {};
  if (palette) {
    const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
    const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
    paletteTheme = styles.attach().classes;
  }
  return { theme: { ...defaultTheme, ...paletteTheme, ...cssOverride } };
}
