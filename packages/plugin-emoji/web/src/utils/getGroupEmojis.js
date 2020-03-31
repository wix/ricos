import { toArray } from 'lodash';
import convertShortNameToUnicode from './convertShortNameToUnicode';
import emojiList from './emojiList';

const getGroupEmojis = category => {
  const emojis = emojiList[category];
  const emojisDisplay = [];
  toArray(emojis).map(unicode => {
    try {
      emojisDisplay.push(convertShortNameToUnicode(unicode));
    } catch (e) {
      return 0;
    }
    return 0;
  });
  return emojisDisplay;
};

export default getGroupEmojis;
