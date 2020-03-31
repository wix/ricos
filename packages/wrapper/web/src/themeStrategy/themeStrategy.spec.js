import themeStrategy from './themeStrategy';

const getType = require('jest-get-type');

// eslint-disable-next-line mocha/no-skipped-tests
describe('ThemeStrategy', () => {
  const driver = {
    runStrategy: (theme, palette, themeGenerators) =>
      themeStrategy(false, { theme, palette, themeGenerators }),
  };

  it('should create a theme object', () => {
    expect(getType(driver.runStrategy())).toBe('object');
    expect(driver.runStrategy()).toHaveProperty('theme');
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
    const theme = { modalTheme: 1 };
    expect(driver.runStrategy(theme).theme.modalTheme).toBe(1);
  });
});
