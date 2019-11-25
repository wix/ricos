import { toArray } from 'lodash';
import convertShortNameToUnicode from './convertShortNameToUnicode';
import createEmojisFromStrategy from './createEmojisFromStrategy';
import emojiList from './emojiList';
import strategy from 'emojione/emoji.json';

const getGroupEmojis = category => {
  const emojis = createEmojisFromStrategy(strategy)[category];
  const emojisDisplay = [];
  toArray(emojis).map(shortName => {
    try {
      emojisDisplay.push(convertShortNameToUnicode(emojiList.list[shortName][0]));
    } catch (e) {
      return 0;
    }
    return 0;
  });

  return emojisDisplay;
};

export default getGroupEmojis;
