import runStrategy from './previewStrategy';

describe('preview strategy', () => {
  it('should return empty object if preview settings are unset', () => {
    const testCases = [{ expected: {}, preview: undefined }];
    testCases.forEach(testCase => {
      const strategy = runStrategy(testCase.preview);
      expect(strategy).toStrictEqual(testCase.expected);
    });
  });

  it('should return proper RichContentPreview settings', () => {
    const testCases = [
      {
        expected: { config: { PREVIEW: { field: 'abc' } }, transformation: '123' },
        preview: { config: { field: 'abc' }, transformation: '123' },
      },
      {
        expected: { config: { PREVIEW: {} }, transformation: {} },
        preview: { config: undefined, transformation: undefined },
      },
    ];
    testCases.forEach(testCase => {
      const strategy = runStrategy(testCase.preview as PreviewSettings);
      expect(strategy).toStrictEqual(testCase.expected);
    });
  });
});
