import { merge } from 'lodash';

const getPluginProps = (
  isViewer: boolean,
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
  isViewer
    ? {
        config,
        typeMappers,
        decorators: decorators.map(decorator => decorator(theme, config)),
        inlineStyleMappers:
          contentState && inlineStyleMappers.map(mapper => mapper(config, contentState)),
      }
    : { config, plugins, ModalsMap };

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
  isViewer,
  plugins: PluginConfig[] = [],
  childProps: RichContentProps = {},
  theme: Theme,
  contentState?: ContentState
): PluginsStrategy {
  let strategy: EditorPluginsStrategy | ViewerPluginsStrategy;

  if (isViewer) {
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
  } else {
    const emptyStrategy: EditorPluginsStrategy = { config: {}, plugins: [], ModalsMap: {} };
    strategy = plugins.reduce((prev, curr) => editorStrategy(prev, curr), emptyStrategy);
  }

  const childPluginProps = getPluginProps(isViewer, childProps, contentState) as PluginsStrategy;

  return merge(strategy, childPluginProps);
}
