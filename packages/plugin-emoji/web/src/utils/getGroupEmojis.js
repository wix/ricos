import convertUnicodeToEmoji from './convertUnicodeToEmoji';
import emojiList from './emojiList';

const getGroupEmojis = category => {
  return emojiList[category].map(unicode => {
    return convertUnicodeToEmoji(unicode);
  });
};
export default getGroupEmojis;
