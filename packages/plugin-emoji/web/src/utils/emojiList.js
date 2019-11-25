//Idea got from https://github.com/draft-js-plugins/draft-js-plugins/tree/master/draft-js-emoji-plugin/
/* eslint-disable fp/no-loops */
/* eslint-disable no-prototype-builtins */
import emojione from 'emojione';

const newEmojiListWithOutPriorityList = priorityList => {
  const list = {};
  for (const key in emojione.emojioneList) {
    if (priorityList.hasOwnProperty(key)) {
      continue;
    }
    list[key] = emojione.emojioneList[key].unicode;
  }

  return { ...priorityList, ...list };
};

const emojiList = {};

emojiList.setPriorityList = newPriorityList => {
  emojiList.list = newEmojiListWithOutPriorityList(newPriorityList);
};

const initPriorityList = {
  ':thumbsup:': ['1f44d'],
  ':smile:': ['1f604'],
  ':heart:': ['2764-fe0f', '2764'],
  ':ok_hand:': ['1f44c'],
  ':joy:': ['1f602'],
  ':tada:': ['1f389'],
  ':see_no_evil:': ['1f648'],
  ':raised_hands:': ['1f64c'],
  ':100:': ['1f4af'],
};
emojiList.setPriorityList(initPriorityList);

export default emojiList;
