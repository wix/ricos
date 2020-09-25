import ThemeGenerator from './ThemeGenerator';
import { wixPalettes } from '../tests/palettesExample';
import { PalettePreset, WixPalette, ThemeGeneratorFunction } from 'ricos-common';

describe('ThemeGenerator', () => {
  const createTheme = (
    isViewer: boolean,
    palette?: WixPalette | PalettePreset,
    themeGenerators?: ThemeGeneratorFunction[]
  ) => new ThemeGenerator(isViewer, palette, themeGenerators);

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const themeGenerator = createTheme(true);
      expect(themeGenerator.palette).toBeFalsy();
    });

    it('should throw if theme is unknwon', () => {
      const func = () => createTheme(true, 'stam' as PalettePreset);
      expect(func).toThrow();
    });

    it('should modify theme colors', () => {
      const themeGenerator = createTheme(false, wixPalettes.site10);
      const cssVars = themeGenerator.getStylesString();

      const styles = cssVars
        .split('\n')
        .map(val => val.trim().split(': '))
        .filter(val => val[0].startsWith('--ricos'))
        .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {});
      expect(styles).toStrictEqual({
        '--ricos-text-color': '#FFFFFF;',
        '--ricos-text-color-tuple': '255, 255, 255;',
        '--ricos-action-color': '#D6FF00;',
        '--ricos-action-color-tuple': '214, 255, 0;',
        '--ricos-action-color-fallback': '#000000;',
        '--ricos-action-color-fallback-tuple': '0, 0, 0;',
        '--ricos-action-color-fallback-bright': '#FFFFFF;',
        '--ricos-action-color-fallback-bright-tuple': '255, 255, 255;',
        '--ricos-background-color': '#0E092B;',
        '--ricos-background-color-tuple': '14, 9, 43;',
      });
    });
  });
});
