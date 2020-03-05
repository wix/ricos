import { range } from 'lodash';
import Hashtag from './HashtagComponent';
import hashtagRegexes from './hashtagRegexes';

export default (getLinkRangesInBlock, immutableList) =>
  class HashtagDecorator {
    constructor(componentProps) {
      this.componentProps = componentProps;
    }

    checkOverlap = (range, start, end) => {
      return (start <= range[0] && end >= range[0]) || (range[0] <= start && range[1] >= start);
    };

    getDecorations(block, contentState) {
      const key = block.getKey();
      const text = block.getText();
      const type = block.getType();
      const decorations = Array(text.length).fill(null);

      if (type !== 'code-block' && text && text.match(hashtagRegexes.hashSigns)) {
        text.replace(
          hashtagRegexes.validHashtag,
          (match, before, hash, hashText, offset, chunk) => {
            const after = chunk.slice(offset + match.length);
            if (after.match(hashtagRegexes.endHashtagMatch)) {
              return;
            }
            const start = offset + before.length;
            const end = start + hashText.length + 1;
            const linkRanges = getLinkRangesInBlock(block, contentState);
            const overlap = linkRanges.some(range => this.checkOverlap(range, start, end));
            if (!overlap) {
              const htagId = `htag${start}${end}`;
              const tagRange = range(start, end, 1);
              tagRange.forEach(i => (decorations[i] = `${key}-${htagId}`));
            }
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
