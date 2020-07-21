import themeStrategy from './themeStrategy';
import getType from 'jest-get-type';
import { Palette, ThemeGeneratorFunction } from './themeTypes';
import { RicosCssOverride } from '../types';
import { wixPalettes } from '../../../../../examples/storybook/stories/palettesExample';

// eslint-disable-next-line mocha/no-skipped-tests
interface strategyProps {
  themeGeneratorFunctions?: ThemeGeneratorFunction[];
  palette?: Palette;
  parentClass?: string;
  cssOverride?: RicosCssOverride;
}
describe('ThemeStrategy', () => {
  const driver = {
    runStrategy: ({
      themeGeneratorFunctions,
      palette,
      parentClass,
      cssOverride,
    }: strategyProps = {}) =>
      themeStrategy()({
        isViewer: false,
        themeGeneratorFunctions,
        theme: { palette, parentClass },
        cssOverride,
      }),
  };

  it('should create a theme object', () => {
    const themeStrategyResult = driver.runStrategy();
    expect(getType(themeStrategyResult)).toBe('object');
    expect(themeStrategyResult).toHaveProperty('theme');
  });

  const emptyResult = driver.runStrategy();
  it('should succeed without arguments', () => {
    expect(emptyResult).toBeTruthy();
    expect(emptyResult.theme).toBeTruthy();
  });

  it('should include modalTheme', () => {
    expect(emptyResult.theme.modalTheme).toBeTruthy();
    expect(getType(emptyResult.theme.modalTheme)).toBe('object');
  });

  it('should set inner props to override the default theme', () => {
    const cssOverride: RicosCssOverride = { modalTheme: { content: { backgroundColor: 'white' } } };
    const themeStrategyResult = driver.runStrategy({ cssOverride });
    expect(themeStrategyResult.theme?.modalTheme?.content).toStrictEqual({
      backgroundColor: 'white',
    });
  });

  it('should wrap classnames with parentClass prop, if given with a palette', () => {
    const cssOverride: RicosCssOverride = { modalTheme: { content: { backgroundColor: 'white' } } };
    const dummyParent = 'dummyParentClassname';
    const themeStrategyResult = driver.runStrategy({
      palette: wixPalettes.site1,
      parentClass: dummyParent,
      cssOverride,
    });
    const { rawCss } = themeStrategyResult;
    expect(rawCss).toBeDefined();
    rawCss?.split('\n').forEach(line => {
      if (line.startsWith('.')) expect(line.startsWith(`.${dummyParent} `)).toBeTruthy();
    });
  });
});
