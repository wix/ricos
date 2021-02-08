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
    disabledColor: undefined,
    disabledColorTuple: undefined,
    fallbackColor: '#000000',
    fallbackColorTuple: '0, 0, 0',
    textColorLow: undefined,
    textColorLowTuple: undefined,
  };

  const wixExpected = {
    ...expected,
    disabledColor: '#FFFFFF',
    disabledColorTuple: '255, 255, 255',
    textColorLow: '#FFFFFF',
    textColorLowTuple: '255, 255, 255',
  };

  const transparentExpected = {
    ...expected,
    textColor: '#FFFFFF00',
    actionColor: '#FFFFFF00',
    actionColorTuple: '255, 255, 255',
    backgroundColor: '#FFFFFF00',
    backgroundColorTuple: '255, 255, 255',
  };

  it('should return empty colors object', () => {
    const { paletteVarsObject: cssVars } = createPalette();
    expect(cssVars).toEqual({});
  });

  it('should throw if theme is unknown', () => {
    const func = () => createPalette('stam' as PalettePreset);
    expect(func).toThrow();
  });

  it('should apply wix palette', () => {
    const { paletteVarsObject: cssVars } = createPalette(wixPalettes[9]);
    expect(cssVars).toStrictEqual(wixExpected);
  });

  it('should apply ricos palette', () => {
    const { paletteVarsObject: cssVars } = createPalette(ricosPalettes[9]);
    expect(cssVars).toStrictEqual(expected);
  });

  it('should support transparent coloring', () => {
    const { paletteVarsObject: cssVars } = createPalette({
      actionColor: 'transparent',
      bgColor: 'transparent',
      textColor: 'transparent',
    });
    expect(cssVars).toStrictEqual(transparentExpected);
  });
});
