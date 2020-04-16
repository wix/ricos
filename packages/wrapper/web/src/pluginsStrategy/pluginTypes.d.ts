type ModalsMap = { [propName: string]: Component };

type TypeMapper = () => object;

type InlineStyleMapper = (config: object, raw: object) => object;

type Decorator = (theme: object, config?: object) => any;

type CreatePluginFunction = (config?: object) => any;

interface BasicPluginConfig {
  config: object;
  type: string;
  theme?: ThemeGeneratorFunction;
}

interface EditorPluginConfig extends BasicPluginConfig {
  createPlugin: CreatePluginFunction;
  ModalsMap?: ModalsMap;
}

interface ViewerPluginConfig extends BasicPluginConfig {
  typeMapper?: TypeMapper;
  inlineStyleMapper?: InlineStyleMapper;
  decorator?: Decorator;
}

interface PluginConfig extends EditorPluginConfig, ViewerPluginConfig {}

interface EditorPluginsStrategy {
  config: object;
  plugins: CreatePluginFunction[];
  ModalsMap: ModalsMap;
}

interface ViewerPluginsStrategy {
  config: object;
  typeMappers: TypeMapper[];
  inlineStyleMappers: object[];
  decorators: any[];
}

interface PluginsStrategy extends EditorPluginsStrategy, ViewerPluginsStrategy {}
