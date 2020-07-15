import pluginsStrategy from './pluginsStrategy';
import getType from 'jest-get-type';
import { PluginConfig } from './pluginTypes';

describe('PluginsStrategy', () => {
  const driver = {
    runStrategy: (isViewer: boolean, plugins: PluginConfig[] = []) =>
      pluginsStrategy(isViewer, plugins, {}, { modalTheme: { content: {} } }),
  };

  it('should create an object', () => {
    expect(getType(driver.runStrategy(false))).toBe('object');
  });

  const emptyResult = driver.runStrategy(false);
  it('should succeed without arguments', () => {
    expect(emptyResult).toBeTruthy();
  });

  it('should include config', () => {
    expect(emptyResult.config).toBeTruthy();
    expect(getType(emptyResult.config)).toBe('object');
  });

  it('should supply editor props', () => {
    const result = driver.runStrategy(false);
    expect(result.config).toBeTruthy();
    expect(result.plugins).toBeTruthy();
    expect(result.ModalsMap).toBeTruthy();
  });

  it('should supply viewer props', () => {
    const result = driver.runStrategy(true);
    expect(result.config).toBeTruthy();
    expect(result.typeMappers).toBeTruthy();
    expect(result.decorators).toBeTruthy();
    expect(result.inlineStyleMappers).toBeTruthy();
  });
});
