/** Based on https://gist.github.com/Yimiprod/7ee176597fef230d1451 */
/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

import { transform, isEqualWith, isEqual, isObject, omit, cloneDeep } from 'lodash';

const IGNORED_KEYS = ['updatedDate'];
const IGNORED_POLL_CONFIG_KEYS = ['alignment', 'size', 'width'];

/**
 * Deep diff between two object, using lodash
 * @param object Object compared
 * @param base   Object to compare with
 * @return       Return a new object who represent the diff
 */
export function compare(object, base, options: { verbose?: boolean; ignoredKeys?: string[] } = {}) {
  const { verbose, ignoredKeys } = options;
  const allIgnoredKeys = [...IGNORED_KEYS, ...(ignoredKeys || [])];
  const comparator = getComparator(allIgnoredKeys);

  const objectWithoutEmoji = object.blocks ? removeEmoji(object) : object;
  const basetWithoutEmoji = base.blocks ? removeEmoji(base) : object;

  // Ignore ignoredKeys in object top level
  const objectWithoutIgnored = omit(objectWithoutEmoji, allIgnoredKeys);
  const basetWithoutIgnored = omit(basetWithoutEmoji, allIgnoredKeys);

  function changes(object, base) {
    return transform<any, any>(object, (result, value, key) => {
      const baseValue = base[key];
      if (!isEqualWith(value, baseValue, comparator)) {
        const areObjects = isObject(value) && isObject(baseValue);
        const currentValue = areObjects ? changes(value, baseValue) : value;
        result[key] = currentValue;
        if (verbose && (!isObject(currentValue) || Object.keys(currentValue).length === 0)) {
          console.dir(
            {
              [key]: {
                from: baseValue,
                to: value,
              },
            },
            { depth: null }
          );
        }
      }
    });
  }

  return changes(objectWithoutIgnored, basetWithoutIgnored);
}

const getComparator = (ignoredKeys: string[]) => (left, right, key) => {
  if (ignoredKeys.includes(key)) {
    return true;
  }
  if (left?.enableVoteRole !== undefined || right?.enableVoteRole !== undefined) {
    return isEqual(omit(left, IGNORED_POLL_CONFIG_KEYS), omit(right, IGNORED_POLL_CONFIG_KEYS));
  }
  return undefined;
};

const removeEmoji = object => {
  const newObject = cloneDeep(object);
  const emojiEntityKeys: number[] = [];
  Object.entries<any>(newObject.entityMap).forEach(
    ([key, value]) => value.type === 'EMOJI_TYPE' && emojiEntityKeys.push(parseInt(key, 10))
  );
  newObject.entityMap = Object.fromEntries(
    Object.entries<any>(newObject.entityMap).filter(([, value]) => value.type !== 'EMOJI_TYPE')
  );
  newObject.blocks = newObject.blocks.map(block => ({
    ...block,
    entityRanges: block.entityRanges.filter(range => !emojiEntityKeys.includes(range.key)),
  }));
  return newObject;
};
