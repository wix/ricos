import themeStrategy from './themeStrategy';
import getType from 'jest-get-type';
import { Palette, ThemeGeneratorFunction, RicosCssOverride } from 'ricos-common';
import { wixPalettes } from '../tests/palettesExample';

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

  it('should wrap classnames with parentClass prop, if given with a palette', () => {
    const parentClass = 'dummyParentClassname';
    const themeStrategyResult = driver.runStrategy({
      palette: wixPalettes.site1,
      parentClass,
    });
    const { html } = themeStrategyResult;
    expect(html).toBeDefined();

    html.props.children.split('\n').forEach(line => {
      if (line.startsWith('.')) expect(line.startsWith(`.${parentClass} `)).toBeTruthy();
    });
  });
});
