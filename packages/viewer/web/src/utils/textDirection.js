const RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
const LTR =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF';
const EMOJI =
  '\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]';

export const getTextDirection = text => {
  const rtl = new RegExp('^[^' + LTR + ']*[' + RTL + ']');
  const ltr = new RegExp('^[^' + RTL + ']*[' + LTR + ']');
  text = String(text || '') && text.replace(new RegExp(EMOJI, 'g'), '');

  if (rtl.test(text)) {
    return 'rtl';
  }

  if (ltr.test(text)) {
    return 'ltr';
  }

  return 'neutral';
};
