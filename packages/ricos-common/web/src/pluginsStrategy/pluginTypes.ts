type ModalsMap = Record<string, import('react').ComponentType>;

type TypeMapper = () => Record<string, unknown>;

type InlineStyleMapper = (
  config: Record<string, unknown>,
  raw: RicosContent
) => Record<string, unknown>;

type CreatePluginFunction = (config?: Record<string, unknown>) => Record<string, unknown>;

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
  decorator?: import('wix-rich-content-common').Decorator;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: any[];
}

interface PluginsStrategy extends EditorPluginsStrategy, ViewerPluginsStrategy {}
