import generateColors from './generatePalette';
import { ricosPalettes, wixPalettes } from '../../tests/palettesExample';
import { PalettePreset } from './themeTypes';

describe('Palette', () => {
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

  it('should return empty colors object', () => {
    const cssVars = generateColors();
    expect(cssVars).toEqual({});
  });

  it('should throw if theme is unknwon', () => {
    const func = () => generateColors('stam' as PalettePreset);
    expect(func).toThrow();
  });

  it('should apply wix palette', () => {
    const cssVars = generateColors(wixPalettes[9]);
    expect(cssVars).toStrictEqual(expected);
  });

  it('should apply ricos palette', () => {
    const cssVars = generateColors(ricosPalettes[9]);
    expect(cssVars).toStrictEqual(expected);
  });
});
