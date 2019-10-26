import { Version } from 'wix-rich-content-common';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP, METHOD_PLUGIN_DATA_MAP } from '../const';
import { toArray, addBlock, addPlugin } from './builder-utils';
import { readMore, seeFullPost, imageCounter } from '../Interactions/interaction-utils';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: Version.currentVersion };

class ContentStateBuilder {
  constructor(initialState) {
    this.contentState = { ...DEFAULT_STATE, ...(initialState || {}) };
  }

  get() {
    return this.contentState;
  }
}

Object.entries({
  ...METHOD_BLOCK_MAP,
  ...METHOD_GROUPED_BLOCK_MAP,
}).forEach(([method, type]) => {
  ContentStateBuilder.prototype[method] = function(text, config) {
    const content = toArray(text);

    this.contentState = content.reduce(
      (state, blockText) =>
        addBlock({
          contentState: state,
          text: blockText,
          type,
          config,
        }),
      this.contentState
    );
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
        },
        ...overrides,
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
