import { CssVarsObject, RicosCustomTheme } from '../themeTypes';
import { mockCustoms, mockOutput } from '../../../tests/mockCustoms';
import createCustoms from './customs';

describe('CustomTheme', () => {
  const mocks: { input?: RicosCustomTheme; output: CssVarsObject }[] = [
    { input: undefined, output: {} },
    { input: {}, output: {} },
    {
      input: mockCustoms,
      output: mockOutput,
    },
  ];

  it('should return empty object if customs is empty / undefined', () => {
    const cssVars1 = createCustoms(mocks[0].input);
    const cssVars2 = createCustoms(mocks[1].input);
    expect(cssVars1).toEqual({});
    expect(cssVars2).toEqual({});
  });

  it('should apply customs', () => {
    const cssVars = createCustoms(mocks[2].input);
    expect(cssVars).toStrictEqual(mocks[2].output);
  });
});
