type ModalsMap = { [propName: string]: import('react').Component };

type TypeMapper = () => Record<string, unknown>;

type InlineStyleMapper = (
  config: Record<string, unknown>,
  raw: RicosContent
) => Record<string, unknown>;

type Decorator = (theme: Record<string, unknown>, config?: Record<string, unknown>) => any;

type CreatePluginFunction = (config?: Record<string, unknown>) => any;

interface BasicPluginConfig {
  config: Record<string, unknown>;
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
  config: Record<string, unknown>;
  plugins: CreatePluginFunction[];
  ModalsMap: ModalsMap;
}

interface ViewerPluginsStrategy {
  config: Record<string, unknown>;
  typeMappers: TypeMapper[];
  inlineStyleMappers: Record<string, unknown>[];
  decorators: any[];
}

interface PluginsStrategy extends EditorPluginsStrategy, ViewerPluginsStrategy {}
