import { CssVarsObject, RicosTypography } from '../themeTypes';
import { mockWixTypography, mockOutput } from '../../../tests/mockWixTypography';
import createTypography from './typography';

describe('Typography', () => {
  const mocks: { input?: RicosTypography; output: CssVarsObject }[] = [
    { input: undefined, output: {} },
    { input: {}, output: {} },
    {
      input: { fontFamily: 'Arial' },
      output: { fontFamily: 'Arial' },
    },
    {
      input: { wixTypography: mockWixTypography },
      output: mockOutput,
    },
    {
      input: { fontFamily: 'Arial', wixTypography: mockWixTypography },
      output: { fontFamily: 'Arial', ...mockOutput },
    },
  ];

  it('should return empty object if typography is empty / undefined', () => {
    const cssVars1 = createTypography(mocks[0].input);
    const cssVars2 = createTypography(mocks[1].input);
    expect(cssVars1).toEqual({});
    expect(cssVars2).toEqual({});
  });

  it('should apply fontFamily', () => {
    const cssVars = createTypography(mocks[2].input);
    expect(cssVars).toStrictEqual(mocks[2].output);
  });

  it('should apply wixTypography', () => {
    const cssVars = createTypography(mocks[3].input);
    expect(cssVars).toStrictEqual(mocks[3].output);
  });

  it('should apply fontFamily & wixTypography', () => {
    const cssVars = createTypography(mocks[4].input);
    expect(cssVars).toStrictEqual(mocks[4].output);
  });
});
