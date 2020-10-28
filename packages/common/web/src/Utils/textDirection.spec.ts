import { getTextDirection } from './textDirection';

describe('text direction utility', () => {
  it('should resolve empty text as neutral', () => {
    expect(getTextDirection('')).toEqual('neutral');
    expect(getTextDirection()).toEqual('neutral');
    expect(getTextDirection(undefined)).toEqual('neutral');
  });

  it('should resolve Hebrew text as rtl', () => {
    expect(getTextDirection('עברית')).toEqual('rtl');
    expect(getTextDirection('עברית 🇮🇱')).toEqual('rtl');
    expect(getTextDirection('!עברית עם סימני פיסוק, קריאה ורווחים')).toEqual('rtl');
    expect(getTextDirection('עברית עם מספרים: 123')).toEqual('rtl');
  });

  it('should resolve English text as ltr', () => {
    expect(getTextDirection('English')).toEqual('ltr');
    expect(getTextDirection('English 🇬🇧')).toEqual('ltr');
    expect(getTextDirection('English with whitespaces')).toEqual('ltr');
    expect(
      getTextDirection('English with comma, numbers and _other chars: (-123 + 456.5)*3 = ?')
    ).toEqual('ltr');
  });

  it('should resolve ideographics as ltr', () => {
    expect(getTextDirection('海南航空')).toEqual('ltr');
    expect(getTextDirection('조선글')).toEqual('ltr');
    expect(getTextDirection('日本語')).toEqual('ltr');
  });

  it('should resolve weak symbols as neutral', () => {
    expect(getTextDirection('💀')).toEqual('neutral');
    expect(getTextDirection('123')).toEqual('neutral');
    expect(getTextDirection('!@#')).toEqual('neutral');
  });
});
