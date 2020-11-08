import createPalette from './palette';
import { ricosPalettes, wixPalettes } from '../../../tests/palettesExample';
import { PalettePreset } from '../themeTypes';

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
    const cssVars = createPalette();
    expect(cssVars).toEqual({});
  });

  it('should throw if theme is unknown', () => {
    const func = () => createPalette('stam' as PalettePreset);
    expect(func).toThrow();
  });

  it('should apply wix palette', () => {
    const cssVars = createPalette(wixPalettes[9]);
    expect(cssVars).toStrictEqual(expected);
  });

  it('should apply ricos palette', () => {
    const cssVars = createPalette(ricosPalettes[9]);
    expect(cssVars).toStrictEqual(expected);
  });

  it('should support transparent coloring', () => {
    const cssVars = createPalette({
      actionColor: 'transparent',
      bgColor: 'transparent',
      textColor: 'transparent',
    });
    expect(cssVars).toStrictEqual({
      textColor: '#FFFFFF00',
      textColorTuple: '255, 255, 255',
      actionColor: '#FFFFFF00',
      actionColorTuple: '255, 255, 255',
      actionColorFallback: '#000000',
      actionColorFallbackTuple: '0, 0, 0',
      backgroundColor: '#FFFFFF00',
      backgroundColorTuple: '255, 255, 255',
    });
  });
});
