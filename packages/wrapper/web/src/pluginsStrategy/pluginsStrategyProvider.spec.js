import pluginsStrategyProvider from './pluginsStrategyProvider';

const getType = require('jest-get-type');

describe('PluginsStrategyProvider', () => {
  const driver = {
    runStrategy: (isEditor, plugins) => pluginsStrategyProvider(isEditor, { plugins }),
  };

  it('should create a function', () => {
    expect(getType(driver.runStrategy())).toBe('function');
  });

  const emptyResult = driver.runStrategy()();
  it('should succeed without arguments', () => {
    expect(emptyResult).toBeTruthy();
  });

  it('should include config', () => {
    expect(emptyResult.config).toBeTruthy();
    expect(getType(emptyResult.config)).toBe('object');
  });

  it('should supply editor props', () => {
    const result = driver.runStrategy(true)();
    expect(result.config).toBeTruthy();
    expect(result.plugins).toBeTruthy();
    expect(result.ModalsMap).toBeTruthy();
  });

  it('should supply viewer props', () => {
    const result = driver.runStrategy(false)();
    expect(result.config).toBeTruthy();
    expect(result.typeMappers).toBeTruthy();
    expect(result.decorators).toBeTruthy();
    expect(result.inlineStyleMappers).toBeTruthy();
  });
});
