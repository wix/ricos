import { merge } from 'lodash';

const getPluginProps = (
  isEditor: boolean,
  {
    config = {},
    plugins = [],
    ModalsMap = {},
    typeMappers = [],
    decorators = [],
    inlineStyleMappers = [],
    theme = {},
  }: any,
  contentState?: ContentState
): EditorPluginsStrategy | ViewerPluginsStrategy =>
  isEditor
    ? { config, plugins, ModalsMap }
    : {
        config,
        typeMappers,
        decorators: decorators.map(decorator => decorator(theme, config)),
        inlineStyleMappers:
          contentState && inlineStyleMappers.map(mapper => mapper(config, contentState)),
      };

function editorStrategy(prev: EditorPluginsStrategy, curr: EditorPluginConfig) {
  const { type, config, createPlugin, ModalsMap } = curr;
  return {
    config: { ...prev.config, [type]: config },
    plugins: prev.plugins.concat(createPlugin),
    ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
  };
}

function viewerStrategy(
  prev: ViewerPluginsStrategy,
  curr: ViewerPluginConfig,
  theme: object,
  contentState?: ContentState
) {
  const { type, config, typeMapper, decorator, inlineStyleMapper } = curr;
  return {
    config: { ...prev.config, [type]: config },
    typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
    decorators:
      (decorator && prev.decorators.concat([decorator(theme, config)])) || prev.decorators,
    inlineStyleMappers:
      (inlineStyleMapper &&
        contentState &&
        prev.inlineStyleMappers.concat([inlineStyleMapper?.(config, contentState)])) ||
      prev.inlineStyleMappers,
  };
}

export default function pluginsStrategy(
  isEditor = false,
  plugins: PluginConfig[] = [],
  childProps: RichContentProps = {},
  theme: Theme,
  contentState?: ContentState
): PluginsStrategy {
  let strategy: EditorPluginsStrategy | ViewerPluginsStrategy;

  if (isEditor) {
    const emptyStrategy: EditorPluginsStrategy = { config: {}, plugins: [], ModalsMap: {} };
    strategy = plugins.reduce((prev, curr) => editorStrategy(prev, curr), emptyStrategy);
  } else {
    const emptyStrategy: ViewerPluginsStrategy = {
      config: {},
      typeMappers: [],
      decorators: [],
      inlineStyleMappers: [],
    };
    strategy = plugins.reduce(
      (prev, curr) => viewerStrategy(prev, curr, theme, contentState),
      emptyStrategy
    );
  }

  const childPluginProps = getPluginProps(isEditor, childProps, contentState) as PluginsStrategy;

  return merge(strategy, childPluginProps);
}
