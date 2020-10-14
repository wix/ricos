const RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
const LTR =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF';

const isRtlRegex = new RegExp('^[^' + LTR + ']*[' + RTL + ']');
const isLtrRegex = new RegExp('^[^' + RTL + ']*[' + LTR + ']');
// eslint-disable-next-line max-len
const emojiRegex = /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g;

export const getTextDirection = (text?: string) => {
  let result = 'neutral';

  if (!text) {
    return result;
  }

  const plainText = text.replace(emojiRegex, '');

  if (isRtlRegex.test(plainText)) {
    result = 'rtl';
  } else if (isLtrRegex.test(plainText)) {
    result = 'ltr';
  }

  return result;
};

export const getDirectionFromAlignmentAndTextDirection = (
  textAlignment: 'right' | 'left',
  textDirection: 'rtl' | 'ltr'
) => {
  if (textAlignment === 'right') {
    return 'rtl';
  } else if (textAlignment === 'left') {
    return 'ltr';
  } else {
    return textDirection && textDirection === 'rtl' ? textDirection : 'ltr';
  }
};
