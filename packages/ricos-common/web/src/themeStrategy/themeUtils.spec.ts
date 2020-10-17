import { toDashedKey, createVarStrings, createVars } from './themeUtils';

describe('CSS Variables Creation Mechanism', () => {
  it('should convert field name to dashed variable', () => {
    const variables = { thisKeyShouldBeDashedOnEveryCapitalLetter: true };
    expect(toDashedKey(Object.keys(variables)[0])).toStrictEqual(
      'this-key-should-be-dashed-on-every-capital-letter'
    );
  });

  it('should convert object field to ricos variable', () => {
    const variables = { textColor: '#333333' };
    expect(createVarStrings(variables)).toStrictEqual('--ricos-text-color: #333333;\n');
  });

  it('should wrap css vars into css object', () => {
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
    expect(createVars('', subset1, subset2)).toStrictEqual(`
      * {
        --ricos-text-color: #111111;
        --ricos-text-color-tuple: #222222;
        --ricos-action-color: #333333;
        --ricos-action-color-tuple: #444444;
        --ricos-action-color-fallback: #333333;
        --ricos-action-color-fallback-tuple: #333333;
        --ricos-background-color: #333333;
        --ricos-background-color-tuple: #333333;
      }\n`);
  });

  it('should wrap css vars under a parent className, if given', () => {
    const variables = {
      textColor: '#111111',
      textColorTuple: '#222222',
      actionColor: '#333333',
      actionColorTuple: '#444444',
    };
    expect(createVars('editorWrapper', variables)).toStrictEqual(`
      .editorWrapper {
        --ricos-text-color: #111111;
        --ricos-text-color-tuple: #222222;
        --ricos-action-color: #333333;
        --ricos-action-color-tuple: #444444;
      }\n`);
  });
});
