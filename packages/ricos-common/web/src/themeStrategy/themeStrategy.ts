import ThemeGenerator from './ThemeGenerator';
import jss, { SheetsRegistry, Classes } from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';
import { PalettePreset, Palette, ThemeGeneratorFunction, RicosCssOverride } from './themeTypes';
import { RicosTheme } from '../RicosTypes';

jss.setup(preset());

interface ThemeState {
  rawCss?: string;
  prevPalette?: Palette | PalettePreset;
  paletteClasses?: Classes;
}

interface ThemeStrategyArgs {
  isViewer: boolean;
  themeGeneratorFunctions?: ThemeGeneratorFunction[];
  theme?: RicosTheme;
  cssOverride?: RicosCssOverride;
}

interface ThemeStrategyResult {
  theme: RicosCssOverride;
  rawCss?: string;
}

export type ThemeStrategyFunction = (args: ThemeStrategyArgs) => ThemeStrategyResult;

const addParentClass = (rawCss: string, parentClass: string): string =>
  rawCss
    .split('\n')
    .map(line => (line.startsWith('.') ? `.${parentClass} ${line}` : line))
    .join('\n');

function themeStrategy(themeState: ThemeState, args: ThemeStrategyArgs): ThemeStrategyResult {
  const { isViewer, themeGeneratorFunctions, theme = {}, cssOverride } = args;
  const { palette, parentClass } = theme;
  const sheets = new SheetsRegistry();
  if (themeState.prevPalette !== palette || !themeState.rawCss) {
    if (palette) {
      themeState.prevPalette = palette;
      const themeGenerator = new ThemeGenerator(isViewer, palette, themeGeneratorFunctions);
      const sheet = jss.createStyleSheet(themeGenerator.getStylesObject());
      sheets.add(sheet);
      const rawCss = sheets.toString();
      themeState.paletteClasses = sheet.classes;
      themeState.rawCss = parentClass ? addParentClass(rawCss, parentClass) : rawCss;
    } else {
      themeState.paletteClasses = {};
      themeState.rawCss = '';
    }
  }
  const cssTheme: RicosCssOverride = {
    ...defaultTheme,
    ...themeState.paletteClasses,
    ...cssOverride,
  };
  return {
    theme: cssTheme,
    rawCss: themeState.rawCss,
  };
}

export default function createThemeStrategy() {
  const themeState: ThemeState = {};
  const strategy: ThemeStrategyFunction = args => themeStrategy(themeState, args);
  return strategy;
}
