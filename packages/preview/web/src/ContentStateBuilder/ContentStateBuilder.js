import { currentVersion } from 'wix-rich-content-common';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP } from '../const';
import { toArray, addBlock } from './utils';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: currentVersion };

class ContentStateBuilder {
  constructor(initialState) {
    this.contentState = initialState || DEFAULT_STATE;
  }

  get() {
    return this.contentState;
  }

  image() {}

  gallery() {}

  divider() {}

  video() {}

  soundCloud() {}

  giphy() {}

  file() {}

  map() {}
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

export default ContentStateBuilder;
