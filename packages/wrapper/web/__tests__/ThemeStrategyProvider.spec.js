import themeStrategyProvider from '../src/ThemeStrategy';

const getType = require('jest-get-type');

describe('ThemeStrategyProvider', () => {
  const driver = {
    runStrategy: (theme, palette, themeGenerators) =>
      themeStrategyProvider(false, { theme, palette, themeGenerators }),
  };

  it('should create a function', () => {
    expect(getType(driver.runStrategy())).toBe('function');
  });

  const emptyResult = driver.runStrategy()();
  it('should succeed without arguments', () => {
    expect(emptyResult).toBeTruthy();
    expect(emptyResult.theme).toBeTruthy();
  });

  it('should include modalTheme', () => {
    expect(emptyResult.theme.modalTheme).toBeTruthy();
    expect(getType(emptyResult.theme.modalTheme)).toBe('object');
  });

  it('should enable inner props to override theme', () => {
    const defaultOverrider = {
      theme: { modalTheme: 1 },
    };
    expect(driver.runStrategy()(defaultOverrider).theme.modalTheme).toBe(1);
  });
});
