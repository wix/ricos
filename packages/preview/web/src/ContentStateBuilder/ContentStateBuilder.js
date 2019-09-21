import { currentVersion } from 'wix-rich-content-common';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP, METHOD_PLUGIN_DATA_MAP } from '../const';
import { toArray, addBlock, addPlugin } from './utils';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: currentVersion };

class ContentStateBuilder {
  constructor(initialState) {
    this.contentState = initialState || DEFAULT_STATE;
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
  ContentStateBuilder.prototype[method] = function(mediaInfo, config = {}) {
    this.contentState = addPlugin({
      contentState: this.contentState,
      data: mediaInfo,
      config: {
        ...defaultEntityData,
        data: {
          ...defaultEntityData.data,
          config: { ...defaultEntityData.data.config, ...config },
        },
      },
    });
    return this;
  };
});

export default ContentStateBuilder;
