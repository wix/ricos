import ThemeGenerator from './ThemeGenerator';
import jss, { SheetsRegistry, Classes } from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';

jss.setup(preset());

let theme: RicosCssOverride,
  rawCss: string,
  prevPalette: Palette | PalettePreset,
  paletteClasses: Classes;

export default function themeStrategy(
  isViewer: boolean,
  themeGeneratorFunctions?: ThemeGeneratorFunction[],
  palette?: Palette | PalettePreset,
  cssOverride?: RicosCssOverride
): { theme: RicosCssOverride; rawCss: string } {
  const sheets = new SheetsRegistry();
  if (prevPalette !== palette || !rawCss) {
    if (palette) {
      prevPalette = palette;
      const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
      const sheet = jss.createStyleSheet(themeGenerator.getStylesObject());
      sheets.add(sheet);
      paletteClasses = sheet.classes;
      rawCss = sheets.toString();
    } else {
      paletteClasses = {};
      rawCss = '';
    }
  }
  theme = { ...defaultTheme, ...paletteClasses, ...cssOverride };
  return {
    theme,
    rawCss,
  };
}
