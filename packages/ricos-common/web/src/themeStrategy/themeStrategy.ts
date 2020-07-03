import ThemeGenerator from './ThemeGenerator';
import jss, { SheetsRegistry, Classes } from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';
import { PalettePreset, Palette, ThemeGeneratorFunction, RicosCssOverride } from './themeTypes';

jss.setup(preset());

interface ThemeState {
  rawCss?: string;
  prevPalette?: Palette | PalettePreset;
  paletteClasses?: Classes;
}

interface ThemeStrategyArgs {
  isViewer: boolean;
  themeGeneratorFunctions?: ThemeGeneratorFunction[];
  palette?: Palette | PalettePreset;
  cssOverride?: RicosCssOverride;
}

interface ThemeStrategyResult {
  theme: RicosCssOverride;
  rawCss?: string;
}

export type ThemeStrategyFunction = (args: ThemeStrategyArgs) => ThemeStrategyResult;

function themeStrategy(themeState: ThemeState, args: ThemeStrategyArgs): ThemeStrategyResult {
  const { isViewer, themeGeneratorFunctions, palette, cssOverride } = args;
  const sheets = new SheetsRegistry();
  if (themeState.prevPalette !== palette || !themeState.rawCss) {
    if (palette) {
      themeState.prevPalette = palette;
      const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
      const sheet = jss.createStyleSheet(themeGenerator.getStylesObject());
      sheets.add(sheet);
      themeState.paletteClasses = sheet.classes;
      themeState.rawCss = sheets.toString();
    } else {
      themeState.paletteClasses = {};
      themeState.rawCss = '';
    }
  }
  const theme: RicosCssOverride = { ...defaultTheme, ...themeState.paletteClasses, ...cssOverride };
  return {
    theme,
    rawCss: themeState.rawCss,
  };
}

export default function createThemeStrategy() {
  const themeState: ThemeState = {};
  const strategy: ThemeStrategyFunction = args => themeStrategy(themeState, args);
  return strategy;
}
