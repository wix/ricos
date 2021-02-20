import uut from './localeStrategy';
import hebResources from 'wix-rich-content-common/dist/statics/locale/messages_he.json';
import rusResources from 'wix-rich-content-common/dist/statics/locale/messages_ru.json';

describe('locale strategy', () => {
  it('should not merge the default locale', () => {
    const testCases = [
      { expected: { locale: 'en' }, locale: undefined },
      { expected: { locale: 'en' }, locale: 'en' },
    ];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.locale);
      expect(strategy).resolves.toEqual(testCase.expected);
    });
  });

  it('should throw if invalid locale is provided', () => {
    const testCases = [{ locale: 'zz' }, { locale: 'xx' }];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.locale);
      expect(strategy).rejects.toThrow();
    });
  });

  it('should be correctly overridden by inner props', () => {
    const testCases = [{ expected: { locale: 'he', localeResource: hebResources }, locale: 'he' }];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.locale);
      expect(strategy).resolves.toEqual(testCase.expected);
    });
  });

  it('should return correct resource accordingly to locale', () => {
    const testCases = [
      { expected: { locale: 'he', localeResource: hebResources }, locale: 'he' },
      { expected: { locale: 'ru', localeResource: rusResources }, locale: 'ru' },
    ];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.locale);
      expect(strategy).resolves.toEqual(testCase.expected);
    });
  });
});
