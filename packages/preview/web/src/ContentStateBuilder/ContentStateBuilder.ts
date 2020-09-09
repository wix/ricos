import { Version, RicosContent } from 'wix-rich-content-common';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP, METHOD_PLUGIN_DATA_MAP } from '../const';
import { toArray, mergeBlockWithEntities, addPlugin } from './builder-utils';
import { readMore, seeFullPost, imageCounter } from '../Interactions/interaction-utils';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: Version.currentVersion };
interface PluginConfig {
  mediaInfo?: unknown;
  config?: unknown;
  overrides?: unknown;
}

class ContentStateBuilder {
  contentState: RicosContent;
  //TODO figure out a cleaner way to do it
  h1: (textContent: unknown) => ContentStateBuilder;
  h2: (textContent: unknown) => ContentStateBuilder;
  h3: (textContent: unknown) => ContentStateBuilder;
  h4: (textContent: unknown) => ContentStateBuilder;
  h5: (textContent: unknown) => ContentStateBuilder;
  h6: (textContent: unknown) => ContentStateBuilder;
  quote: (textContent: unknown) => ContentStateBuilder;
  plain: (textContent: unknown) => ContentStateBuilder;
  code: (textContent: unknown) => ContentStateBuilder;
  ol: (textContent: unknown) => ContentStateBuilder;
  ul: (textContent: unknown) => ContentStateBuilder;
  image: (pluginConfig: PluginConfig) => ContentStateBuilder;
  video: (pluginConfig: PluginConfig) => ContentStateBuilder;
  gallery: (pluginConfig: PluginConfig) => ContentStateBuilder;
  soundCloud: (pluginConfig: PluginConfig) => ContentStateBuilder;
  giphy: (pluginConfig: PluginConfig) => ContentStateBuilder;
  map: (pluginConfig: PluginConfig) => ContentStateBuilder;
  file: (pluginConfig: PluginConfig) => ContentStateBuilder;
  divider: (pluginConfig: PluginConfig) => ContentStateBuilder;
  link: (pluginConfig: PluginConfig) => ContentStateBuilder;
  linkPreview: (pluginConfig: PluginConfig) => ContentStateBuilder;
  readMore: (settings: Record<string, unknown> | undefined) => ContentStateBuilder;
  seeFullPost: (settings: Record<string, unknown> | undefined) => ContentStateBuilder;
  imageCounter: (settings: Record<string, unknown> | undefined) => ContentStateBuilder;
  constructor(initialState?: RicosContent) {
    this.contentState = { ...DEFAULT_STATE, ...(initialState || {}) };
  }

  get() {
    return this.contentState;
  }
}

Object.keys({
  ...METHOD_BLOCK_MAP,
  ...METHOD_GROUPED_BLOCK_MAP,
}).forEach(method => {
  ContentStateBuilder.prototype[method] = function(textContent) {
    const textContentArray = toArray(textContent);
    this.contentState = textContentArray.reduce((state, { block, entities }) => {
      const mergedState = mergeBlockWithEntities({
        contentState: state,
        block,
        entities,
      });
      return mergedState;
    }, this.contentState);
    return this;
  };
});

Object.entries(METHOD_PLUGIN_DATA_MAP).forEach(([method, defaultEntityData]) => {
  ContentStateBuilder.prototype[method] = function({ mediaInfo, config = {}, overrides = {} }) {
    this.contentState = addPlugin({
      contentState: this.contentState,
      data: mediaInfo,
      config: {
        ...defaultEntityData,
        data: {
          ...defaultEntityData.data,
          config: { ...defaultEntityData.data.config, ...config },
          ...overrides,
        },
      },
    });
    return this;
  };
});

Object.entries({ readMore, seeFullPost, imageCounter }).forEach(([key, method]) => {
  ContentStateBuilder.prototype[key] = function(settings: Record<string, unknown> | undefined) {
    return method(this, settings);
  };
});

export default ContentStateBuilder;
