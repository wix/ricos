import { range } from 'lodash';
import Hashtag from './HashtagComponent';
import hashtagRegexes from './hashtagRegexes';

export default (hasLinksInBlock, immutableList) =>
  class HashtagDecorator {
    constructor(componentProps) {
      this.componentProps = componentProps;
    }

    getDecorations(block, contentState) {
      const key = block.getKey();
      const text = block.getText();
      const type = block.getType();
      const decorations = Array(text.length).fill(null);

      if (
        type !== 'code-block' &&
        text &&
        !hasLinksInBlock(block, contentState) &&
        text.match(hashtagRegexes.hashSigns)
      ) {
        text.replace(
          hashtagRegexes.validHashtag,
          (match, before, hash, hashText, offset, chunk) => {
            const after = chunk.slice(offset + match.length);
            if (after.match(hashtagRegexes.endHashtagMatch)) {
              return;
            }
            const start = offset + before.length;
            const end = start + hashText.length + 1;
            const htagId = `htag${start}${end}`;
            const tagRange = range(start, end, 1);
            tagRange.forEach(i => (decorations[i] = `${key}-${htagId}`));
          }
        );
      }
      // In editor returns an Immutable.js List object. In the Viewer return an array.
      return immutableList ? immutableList(decorations) : decorations;
    }

    getComponentForKey() {
      return Hashtag;
    }

    getPropsForKey() {
      return this.componentProps;
    }
  };
