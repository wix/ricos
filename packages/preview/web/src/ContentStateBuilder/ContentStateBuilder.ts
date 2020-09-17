import { Version, RicosContent } from 'wix-rich-content-common';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP, METHOD_PLUGIN_DATA_MAP } from '../const';
import { toArray, mergeBlockWithEntities, addPlugin } from './builder-utils';
import { readMore, seeFullPost, imageCounter } from '../Interactions/interaction-utils';
import { PluginData, TextBlockWithEntities } from '../ContentStateAnalyzer/types';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: Version.currentVersion };

type ContentBuildMethod = (
  textBlocksWithEntities: TextBlockWithEntities | TextBlockWithEntities[]
) => ContentStateBuilder;
type PluginBuildMethod = (pluginData: PluginData) => ContentStateBuilder;
type InteractionBuildMethod = (settings?: Record<string, unknown>) => ContentStateBuilder;

class ContentStateBuilder {
  contentState: RicosContent;

  // Content
  h1: ContentBuildMethod;
  h2: ContentBuildMethod;
  h3: ContentBuildMethod;
  h4: ContentBuildMethod;
  h5: ContentBuildMethod;
  h6: ContentBuildMethod;
  quote: ContentBuildMethod;
  plain: ContentBuildMethod;
  code: ContentBuildMethod;
  ol: ContentBuildMethod;
  ul: ContentBuildMethod;

  // Plugins
  image: PluginBuildMethod;
  video: PluginBuildMethod;
  gallery: PluginBuildMethod;
  soundCloud: PluginBuildMethod;
  giphy: PluginBuildMethod;
  map: PluginBuildMethod;
  file: PluginBuildMethod;
  divider: PluginBuildMethod;
  link: PluginBuildMethod;
  linkPreview: PluginBuildMethod;

  // Interactions
  readMore: InteractionBuildMethod;
  seeFullPost: InteractionBuildMethod;
  imageCounter: InteractionBuildMethod;

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
  ContentStateBuilder.prototype[method] = function(
    textBlocksWithEntities: TextBlockWithEntities | TextBlockWithEntities[]
  ) {
    const textContentArray = toArray(textBlocksWithEntities) as TextBlockWithEntities[];
    this.contentState = textContentArray.reduce((state: RicosContent, { block, entities }) => {
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
