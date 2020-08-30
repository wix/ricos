import { Version, RicosContent } from 'wix-rich-content-common';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP, METHOD_PLUGIN_DATA_MAP } from '../const';
import { toArray, mergeBlockWithEntities, addPlugin } from './builder-utils';
import { readMore, seeFullPost, imageCounter } from '../Interactions/interaction-utils';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: Version.currentVersion };

class ContentStateBuilder {
  contentState: RicosContent;
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
  ContentStateBuilder.prototype[key] = function(settings) {
    return method(this, settings);
  };
});

export default ContentStateBuilder;
