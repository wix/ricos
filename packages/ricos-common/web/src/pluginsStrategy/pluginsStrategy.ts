import { RicosTheme } from './../themeStrategy/themeTypes';
import { merge } from 'lodash';
import {
  EditorPluginsStrategy,
  ViewerPluginsStrategy,
  BasePlugin,
  PluginsStrategy,
} from './pluginTypes';
import { RicosCssOverride, RichContentProps } from '../types';
import {
  AvailableExperiments,
  DraftContent,
  EditorPlugin,
  ViewerPlugin,
  ThemeData,
} from 'wix-rich-content-common';

const getPluginProps = (
  isViewer: boolean,
  {
    config = {},
    plugins = [],
    ModalsMap = {},
    createPluginsDataMap = {},
    typeMappers = [],
    decorators = [],
    inlineStyleMappers = [],
    theme = {},
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  content?: DraftContent
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
    : { config, plugins, ModalsMap, createPluginsDataMap };

function editorStrategy(prev: EditorPluginsStrategy, curr: EditorPlugin) {
  const { type, config, createPlugin, ModalsMap, createPluginData } = curr;
  return {
    config: { ...prev.config, [type]: config },
    plugins: createPlugin ? prev.plugins.concat(createPlugin) : prev.plugins,
    ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
    createPluginsDataMap: { ...prev.createPluginsDataMap, [type]: createPluginData },
  };
}

function viewerStrategy(
  prev: ViewerPluginsStrategy,
  curr: ViewerPlugin,
  cssOverride: RicosCssOverride,
  content?: DraftContent
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

export default function pluginsStrategy({
  themeData,
  isViewer,
  plugins = [],
  childProps,
  cssOverride,
  content,
  experiments, // eslint-disable-line
}: {
  themeData: ThemeData;
  isViewer: boolean;
  plugins: BasePlugin[];
  childProps: RichContentProps;
  cssOverride: RicosCssOverride;
  content?: DraftContent;
  experiments?: AvailableExperiments;
}): PluginsStrategy {
  let strategy: EditorPluginsStrategy | ViewerPluginsStrategy;

  if (isViewer) {
    const emptyStrategy: ViewerPluginsStrategy = {
      config: { themeData },
      typeMappers: [],
      decorators: [],
      inlineStyleMappers: [],
    };
    strategy = plugins.reduce(
      (prev, curr) => viewerStrategy(prev, curr, cssOverride, content),
      emptyStrategy
    );
  } else {
    const emptyStrategy: EditorPluginsStrategy = {
      config: { themeData },
      plugins: [],
      ModalsMap: {},
      createPluginsDataMap: {},
    };
    strategy = plugins.reduce((prev, curr) => editorStrategy(prev, curr), emptyStrategy);
  }

  const childPluginProps = getPluginProps(isViewer, childProps, content) as PluginsStrategy;

  return merge(strategy, childPluginProps);
}
