import { CssVarsObject } from '../themeTypes';
import { customStylesTestCase, expectedOutput } from '../../../tests/customStylesExamples';
import createCustomStyles from './customStyles';
import { RicosCustomStyles } from 'wix-rich-content-common';

describe('CustomTheme', () => {
  const mocks: { input?: RicosCustomStyles; output: CssVarsObject }[] = [
    { input: undefined, output: {} },
    { input: {}, output: {} },
    {
      input: customStylesTestCase as RicosCustomStyles,
      output: expectedOutput,
    },
  ];

  it('should return empty object if customStyles is empty / undefined', () => {
    const cssVars1 = createCustomStyles(mocks[0].input);
    const cssVars2 = createCustomStyles(mocks[1].input);
    expect(cssVars1).toEqual({});
    expect(cssVars2).toEqual({});
  });

  it('should apply customStyles', () => {
    const cssVars = createCustomStyles(mocks[2].input);
    expect(cssVars).toStrictEqual(mocks[2].output);
  });

  it('should set lineHeight to 1.5 under the right condition', () => {
    const cssVars1 = createCustomStyles({ h2: { fontSize: '40px' } });
    expect(cssVars1).toStrictEqual({
      'custom-h2-fontSize': '40px',
      'custom-h2-lineHeight': 1.5,
    });

    const cssVars2 = createCustomStyles({ h2: { fontSize: '40px', lineHeight: 2 } });
    expect(cssVars2).toStrictEqual({
      'custom-h2-fontSize': '40px',
      'custom-h2-lineHeight': 2,
    });

    const cssVars3 = createCustomStyles({ h2: { lineHeight: 2 } });
    expect(cssVars3).toStrictEqual({
      'custom-h2-fontSize': undefined,
      'custom-h2-lineHeight': 2,
    });
  });
});
