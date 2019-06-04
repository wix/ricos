import { compareVersions as uut } from './versioningUtils';

describe('compareVersions', () => {
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
      const actual = uut(testCase.left, testCase.right);
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
      const actual = uut(testCase.left, testCase.right);
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
      const actual = uut(testCase.left, testCase.right);
      expect(actual).toEqual(testCase.expected);
    });
  });
});
