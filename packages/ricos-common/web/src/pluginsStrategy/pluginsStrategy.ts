import { merge } from 'lodash';
import {
  EditorPluginsStrategy,
  ViewerPluginsStrategy,
  EditorPluginConfig,
  ViewerPluginConfig,
  PluginConfig,
  PluginsStrategy,
} from './pluginTypes';
import { RicosContent, RicosCssOverride, RichContentProps } from '../types';

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
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  content?: RicosContent
): EditorPluginsStrategy | ViewerPluginsStrategy =>
  isViewer
    ? {
        config,
        typeMappers,
        decorators: decorators.map(decorator => decorator(theme, config)),
        inlineStyleMappers: content
          ? inlineStyleMappers.map(mapper => mapper(config, content))
          : [],
      }
    : { config, plugins, ModalsMap };

function editorStrategy(prev: EditorPluginsStrategy, curr: EditorPluginConfig) {
  const { type, config, createPlugin, ModalsMap } = curr;
  return {
    config: { ...prev.config, [type]: config },
    plugins: createPlugin ? prev.plugins.concat(createPlugin) : prev.plugins,
    ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
  };
}

function viewerStrategy(
  prev: ViewerPluginsStrategy,
  curr: ViewerPluginConfig,
  cssOverride: RicosCssOverride,
  content?: RicosContent
) {
  const { type, config, typeMapper, decorator, inlineStyleMapper } = curr;
  const finalConfig = { ...prev.config, [type]: config };
  return {
    config: finalConfig,
    typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
    decorators:
      (decorator && prev.decorators.concat([decorator(cssOverride, config)])) || prev.decorators,
    inlineStyleMappers:
      (inlineStyleMapper &&
        content &&
        prev.inlineStyleMappers.concat([inlineStyleMapper?.(finalConfig, content)])) ||
      prev.inlineStyleMappers,
  };
}

export default function pluginsStrategy(
  isViewer: boolean,
  plugins: PluginConfig[] = [],
  childProps: RichContentProps,
  cssOverride: RicosCssOverride,
  content?: RicosContent
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
      (prev, curr) => viewerStrategy(prev, curr, cssOverride, content),
      emptyStrategy
    );
  } else {
    const emptyStrategy: EditorPluginsStrategy = { config: {}, plugins: [], ModalsMap: {} };
    strategy = plugins.reduce((prev, curr) => editorStrategy(prev, curr), emptyStrategy);
  }

  const childPluginProps = getPluginProps(isViewer, childProps, content) as PluginsStrategy;

  return merge(strategy, childPluginProps);
}
