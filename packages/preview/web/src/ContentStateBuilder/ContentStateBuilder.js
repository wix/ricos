import { currentVersion } from 'wix-rich-content-common';
import { toArray, addBlock } from './utils';

const DEFAULT_STATE = { blocks: [], entityMap: {}, VERSION: currentVersion };

class ContentStateBuilder {
  constructor(initialState) {
    this.contentState = initialState || DEFAULT_STATE;
  }

  get() {
    return this.contentState;
  }

  text(text, config) {
    const content = toArray(text);

    this.contentState = content.reduce(
      (state, blockText) =>
        addBlock({
          contentState: state,
          text: blockText,
          type: 'unstyled',
          config,
        }),
      this.contentState
    );

    return this;
  }

  // ul(items) {}
  //
  // ol(items) {}
  //
  // code(content) {}
  //
  // quote(content) {}
  //
  // h2(content) {}
  //
  // h3(content) {}
  //
  // h4(content) {}
  //
  // h5(content) {}
  //
  // h6(content) {}

  image() {}

  gallery() {}

  divider() {}

  video() {}

  soundCloud() {}

  giphy() {}

  file() {}

  map() {}
}

export default ContentStateBuilder;
