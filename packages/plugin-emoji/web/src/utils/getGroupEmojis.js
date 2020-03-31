import convertShortNameToUnicode from './convertShortNameToUnicode';
import emojiList from './emojiList';

const getGroupEmojis = category => {
  const emojis = emojiList[category];
  const emojisDisplay = [];
  emojis.map(shortName => {
    try {
      emojisDisplay.push(convertShortNameToUnicode(shortName));
    } catch (e) {
      return 0;
    }
    return 0;
  });
  return emojisDisplay;
};

export default getGroupEmojis;
