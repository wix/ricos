import uut from './localeStrategyProvider';
import hebResources from 'wix-rich-content-common/dist/statics/locale/messages_he.json';
import rusResources from 'wix-rich-content-common/dist/statics/locale/messages_ru.json';

describe('locale strategy provider', () => {
  it('provided strategy does not merge the default locale', () => {
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

  it('should provide a strategy returning correct resource accordingly to locale', () => {
    const testCases = [
      { expected: { localeResource: hebResources }, config: { locale: 'he' } },
      { expected: { localeResource: rusResources }, config: { locale: 'ru' } },
    ];
    testCases.forEach(testCase => {
      const strategy = uut(testCase.config);
      const actual = strategy({});
      expect(actual).toEqual(testCase.expected);
    });
  });
});
