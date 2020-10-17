import ThemeGenerator from './ThemeGenerator';
import { ricosPalettes, wixPalettes } from '../../tests/palettesExample';
import { PalettePreset, ThemeGeneratorFunction, RicosTheme } from './themeTypes';

describe('ThemeGenerator', () => {
  const createTheme = (
    isViewer: boolean,
    palette?: RicosTheme['palette'],
    themeGenerators?: ThemeGeneratorFunction[]
  ) => new ThemeGenerator(isViewer, palette, themeGenerators);

  const expected = {
    textColor: '#FFFFFF',
    textColorTuple: '255, 255, 255',
    actionColor: '#D6FF00',
    actionColorTuple: '214, 255, 0',
    actionColorFallback: '#000000',
    actionColorFallbackTuple: '0, 0, 0',
    backgroundColor: '#0E092B',
    backgroundColorTuple: '14, 9, 43',
  };

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const themeGenerator = createTheme(true);
      expect(themeGenerator.palette).toBeFalsy();
    });

    it('should throw if theme is unknwon', () => {
      const func = () => createTheme(true, 'stam' as PalettePreset);
      expect(func).toThrow();
    });

    it('should apply wix palette', () => {
      const themeGenerator = createTheme(false, wixPalettes[9]);
      const cssVars = themeGenerator.getStylesString();
      expect(cssVars).toStrictEqual(expected);
    });

    it('should apply ricos palette', () => {
      const themeGenerator = createTheme(false, ricosPalettes[9]);
      const cssVars = themeGenerator.getStylesString();
      expect(cssVars).toStrictEqual(expected);
    });
  });
});
