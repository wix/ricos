import Version from './versioningUtils';

describe('compare', () => {
  it('should return correct comparison result for valid version input', () => {
    const testCases = [
      {
        left: '1.0.0',
        right: '1.0.0',
        expected: 0,
      },
      {
        left: '1.0.1',
        right: '1.0.0',
        expected: 1,
      },
      {
        left: '0.9.1',
        right: '1.0.0',
        expected: -1,
      },
    ];

    testCases.forEach(testCase => {
      const actual = Version.compare(testCase.left, testCase.right);
      expect(actual).toEqual(testCase.expected);
    });
  });

  it('should return correct comparison result for partial versions', () => {
    const testCases = [
      {
        left: '1.',
        right: '1',
        expected: 0,
      },
      {
        left: '1.1',
        right: '1.0',
        expected: 1,
      },
      {
        left: '.9',
        right: '1.0',
        expected: -1,
      },
    ];

    testCases.forEach(testCase => {
      const actual = Version.compare(testCase.left, testCase.right);
      expect(actual).toEqual(testCase.expected);
    });
  });

  it('should return correct comparison result for prerelease versions', () => {
    const testCases = [
      {
        left: '4.0.0-alpha.0',
        right: '4.0.0-alpha.1',
        expected: 0,
      },
      {
        left: '4.0.1-alpha.0',
        right: '4.0.0-alpha.1',
        expected: 1,
      },
      {
        left: '4.0.0-alpha.5',
        right: '4.2.0-alpha.1',
        expected: -1,
      },
    ];

    testCases.forEach(testCase => {
      const actual = Version.compare(testCase.left, testCase.right);
      expect(actual).toEqual(testCase.expected);
    });
  });
});

describe('evaluate', () => {
  it('should return correct results for valid conditions', () => {
    const testCases = [
      {
        left: '1.0.0',
        right: '1.0.0',
        expected: true,
      },
      {
        left: '1.0.0',
        right: '1.0.1',
        expected: false,
      },
      {
        left: '1.0.1',
        right: '>1.0.0',
        expected: true,
      },
      {
        left: '1.0.0',
        right: '>1.0.0',
        expected: false,
      },
      {
        left: '0.9.1',
        right: '<1.0.0',
        expected: true,
      },
      {
        left: '0.9.1',
        right: '=1.0.0',
        expected: false,
      },
      {
        left: '1.0.0',
        right: '=1.0.0',
        expected: true,
      },
      {
        left: '1.0.0',
        right: '>=1.0.0',
        expected: true,
      },
      {
        left: '1.0.0',
        right: '<=1.0.0',
        expected: true,
      },
      {
        left: '1.0.1',
        right: '>=1.0.0',
        expected: true,
      },
      {
        left: '0.9.1',
        right: '<=1.0.0',
        expected: true,
      },
    ];

    testCases.forEach(testCase => {
      const actual = Version.evaluate(testCase.left, testCase.right);
      expect(actual).toEqual(testCase.expected);
    });
  });
});
