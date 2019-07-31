import { isNaN } from 'lodash';
import { version as currentVersion } from '../../package.json';

// "1.2.3-alpha.4" => [1, 2, 3]
const toVersion = versionString => {
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
const compareVersions = (left, right) => {
  const leftVersion = toVersion(left);
  const rightVersion = toVersion(right);
  const diff = leftVersion.map((left, idx) => Math.sign(left - rightVersion[idx]));
  return diff.find(num => num !== 0) || 0;
};

const evaluations = {
  '<': (left, right) => compareVersions(left, right) < 0,
  '>': (left, right) => compareVersions(left, right) > 0,
  '=': (left, right) => compareVersions(left, right) === 0,
  '<=': (left, right) => compareVersions(left, right) <= 0,
  '>=': (left, right) => compareVersions(left, right) >= 0,
};

/**
 * evaluateVersion
 * @description evaluates version string with conditional semver
 * @param {string} tested version to evaluate
 * @param {string} semver consisting of operator and version (<1.0.0, >=2.3.3). supports < > = operators
 * @returns {boolean} true if version meets the semver condition
 */
const evaluateVersion = (tested, semver) => {
  const [expr, operator, version] = /([<>=]{0,2})(.*)/gm.exec(semver); // eslint-disable-line no-unused-vars
  return evaluations[operator || '='](tested, version);
};

export default {
  lessThan: (left, right) => compareVersions(left, right) < 0,
  greaterThan: (left, right) => compareVersions(left, right) > 0,
  equal: (left, right) => compareVersions(left, right) === 0,
  compare: compareVersions,
  currentVersion,
  evaluate: evaluateVersion,
};
