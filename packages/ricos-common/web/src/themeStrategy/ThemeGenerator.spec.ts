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
    '--ricos-text-color': '#FFFFFF;',
    '--ricos-text-color-tuple': '255, 255, 255;',
    '--ricos-action-color': '#D6FF00;',
    '--ricos-action-color-tuple': '214, 255, 0;',
    '--ricos-action-color-fallback': '#000000;',
    '--ricos-action-color-fallback-tuple': '0, 0, 0;',
    '--ricos-background-color': '#0E092B;',
    '--ricos-background-color-tuple': '14, 9, 43;',
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

      const styles = cssVars
        .split('\n')
        .map(val => val.trim().split(': '))
        .filter(val => val[0].startsWith('--ricos'))
        .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {});
      expect(styles).toStrictEqual(expected);
    });

    it('should apply ricos palette', () => {
      const themeGenerator = createTheme(false, ricosPalettes[9]);
      const cssVars = themeGenerator.getStylesString();

      const styles = cssVars
        .split('\n')
        .map(val => val.trim().split(': '))
        .filter(val => val[0].startsWith('--ricos'))
        .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {});
      expect(styles).toStrictEqual(expected);
    });
  });
});
