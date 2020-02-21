import uut from './localeStrategyProvider';
import hebResources from 'wix-rich-content-common/dist/statics/locale/messages_he.json';
import rusResources from 'wix-rich-content-common/dist/statics/locale/messages_ru.json';

describe('locale strategy', () => {
  it('should not merge the default locale', () => {
    const testCases = [
      { expected: {}, config: {} },
      { expected: {}, config: { locale: 'en' } },
    ];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.config);
      const actual = strategy({});
      expect(actual).toEqual(testCase.expected);
    });
  });

  it('should throw if invalid locale is provided', () => {
    const testCases = [{ config: { locale: 'zz' } }, { config: { locale: 'xx' } }];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.config);
      const actual = () => strategy({});
      expect(actual).toThrow();
    });
  });

  it('should be correctly overridden by inner props', () => {
    const testCases = [
      { expected: { locale: 'he', localeResource: hebResources }, config: { locale: 'ru' } },
    ];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.config);
      const actual = strategy({ locale: 'he' });
      expect(actual).toEqual(testCase.expected);
    });
  });

  it('should return correct resource accordingly to locale', () => {
    const testCases = [
      { expected: { locale: 'he', localeResource: hebResources }, config: { locale: 'he' } },
      { expected: { locale: 'ru', localeResource: rusResources }, config: { locale: 'ru' } },
    ];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.config);
      const actual = strategy({});
      expect(actual).toEqual(testCase.expected);
    });
  });
});
