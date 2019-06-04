import isNaN from 'lodash/isNaN';
import commonPackageJson from '../../package.json';
export const getCurrentVersion = (packageJson = commonPackageJson) => {
  return packageJson.version;
};

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
export const compareVersions = (left, right) => {
  const leftVersion = toVersion(left);
  const rightVersion = toVersion(right);
  const diff = leftVersion.map((left, idx) => Math.sign(left - rightVersion[idx]));
  return diff.find(num => num !== 0) || 0;
};
