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
});
