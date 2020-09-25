import { isNaN } from 'lodash';
import { version as currentVersion } from '../../package.json';

// "1.2.3-alpha.4" => [1, 2, 3]
const toVersion = (versionString: string) => {
  return versionString
    .split('.')
    .map(literal => {
      const numeric = parseInt(literal, 10);
      return isNaN(numeric) ? 0 : numeric;
    })
    .slice(0, 3);
};

/**
 * compareVersions
 * @description compares 2 version strings. assumption: versions are valid and exact (semantics not supported)
 * @param {string} left version string "major.minor.revision"
 * @param {string} right version string "major.minor.revision"
 * @returns integer: left > right => 1, left === right => 0, left < right => -1
 */
const compareVersions = (left: string, right: string) => {
  const leftVersion = toVersion(left);
  const rightVersion = toVersion(right);
  const diff = leftVersion.map((left, idx) => Math.sign(left - rightVersion[idx]));
  return diff.find(num => num !== 0) || 0;
};

const evaluations: { [operator: string]: (left: string, right: string) => boolean } = {
  '<': (left: string, right: string) => compareVersions(left, right) < 0,
  '>': (left: string, right: string) => compareVersions(left, right) > 0,
  '=': (left: string, right: string) => compareVersions(left, right) === 0,
  '<=': (left: string, right: string) => compareVersions(left, right) <= 0,
  '>=': (left: string, right: string) => compareVersions(left, right) >= 0,
};

const evaluateVersion = (tested: string, semver: string) => {
  const [, operator, version] = /([<>=]{0,2})(.*)/gm.exec(semver) as string[];
  return evaluations[operator || '='](tested, version);
};

export default {
  lessThan: (left: string, right: string) => compareVersions(left, right) < 0,
  greaterThan: (left: string, right: string) => compareVersions(left, right) > 0,
  equal: (left: string, right: string) => compareVersions(left, right) === 0,
  compare: compareVersions,
  currentVersion,
  evaluate: evaluateVersion,
};
