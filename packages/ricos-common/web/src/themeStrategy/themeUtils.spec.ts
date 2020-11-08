import { toDashedKey, toVarStrings, buildCssVars, toHexFormat } from './themeUtils';

const expected1 = `
  * {
    --ricos-text-color: #111111;
    --ricos-text-color-tuple: #222222;
    --ricos-action-color: #333333;
    --ricos-action-color-tuple: #444444;
    --ricos-action-color-fallback: #333333;
    --ricos-action-color-fallback-tuple: #333333;
    --ricos-background-color: #333333;
    --ricos-background-color-tuple: #333333;
  }\n`;

const expected2 = `
  .editorWrapper {
    --ricos-text-color: #111111;
    --ricos-text-color-tuple: #222222;
    --ricos-action-color: #333333;
    --ricos-action-color-tuple: #444444;
  }\n`;

describe('Palette Mechanism', () => {
  it('should convert RGB to HEX', () => {
    expect(toHexFormat('rgb(255, 255, 255)')).toBe('#ffffff');
    expect(toHexFormat('rgb(0, 0, 0)')).toBe('#000000');
    expect(toHexFormat('rgb(25%, 25%, 25%)')).toBe('#404040');
  });
  it('should convert RGBA to HEXA', () => {
    expect(toHexFormat('rgba(0, 0, 0, 0.9)')).toBe('#000000e6');
    expect(toHexFormat('rgba(0, 0, 0, 1)')).toBe('#000000ff');
    expect(toHexFormat('rgba(30%, 30%, 30%, 0.5)')).toBe('#4d4d4d80');
  });
});
describe('CSS Variables Creation Mechanism', () => {
  const subset1 = {
    textColor: '#111111',
    textColorTuple: '#222222',
    actionColor: '#333333',
    actionColorTuple: '#444444',
  };
  const subset2 = {
    actionColorFallback: '#333333',
    actionColorFallbackTuple: '#333333',
    backgroundColor: '#333333',
    backgroundColorTuple: '#333333',
  };
  it('should convert field name to dashed variable', () => {
    const variables = { thisKeyShouldBeDashedOnEveryCapitalLetter: true };
    expect(toDashedKey(Object.keys(variables)[0])).toStrictEqual(
      'this-key-should-be-dashed-on-every-capital-letter'
    );
  });
  it('should convert object field to ricos variable', () => {
    const variables = { textColor: '#333333' };
    expect(toVarStrings(variables)).toStrictEqual('--ricos-text-color: #333333;\n');
  });
  it('should filter undefined variables', () => {
    const variables = { textColor: undefined };
    expect(toVarStrings(variables)).toStrictEqual('');
  });
  it('should wrap css vars into css object', () => {
    expect(buildCssVars('', subset1, subset2)).toStrictEqual(expected1);
  });
  it('should wrap css vars under a parent className, if given', () => {
    expect(buildCssVars('editorWrapper', subset1)).toStrictEqual(expected2);
  });
});
