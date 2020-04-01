/* eslint-disable */

// Original can be found here: https://github.com/Ranks/emojione
const convertUnicodeToEmoji = function(unicode) {
  if (unicode.indexOf('-') > -1) {
    const parts = [];
    const s = unicode.split('-');
    for (let i = 0; i < s.length; i++) {
      let part = parseInt(s[i], 16);
      if (part >= 0x10000 && part <= 0x10ffff) {
        let hi = Math.floor((part - 0x10000) / 0x400) + 0xd800;
        let lo = ((part - 0x10000) % 0x400) + 0xdc00;
        part = String.fromCharCode(hi) + String.fromCharCode(lo);
      } else {
        part = String.fromCharCode(part);
      }

      parts.push(part);
    }

    return parts.join('');
  } else {
    const s = parseInt(unicode, 16);
    if (s >= 0x10000 && s <= 0x10ffff) {
      const hi = Math.floor((s - 0x10000) / 0x400) + 0xd800;
      const lo = ((s - 0x10000) % 0x400) + 0xdc00;
      return String.fromCharCode(hi) + String.fromCharCode(lo);
    } else {
      return String.fromCharCode(s);
    }
  }
};

export default convertUnicodeToEmoji;
