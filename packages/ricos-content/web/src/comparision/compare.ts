/** Based on https://gist.github.com/Yimiprod/7ee176597fef230d1451 */
/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

import { transform, isEqualWith, isEqual, isObject, omit } from 'lodash';

const IGNORED_KEYS = ['lastEdited', 'key'];
const IGNORED_POLL_CONFIG_KEYS = ['alignment', 'size', 'width'];

/**
 * Deep diff between two object, using lodash
 * @param  {RicosContent} object Object compared
 * @param  {RicosContent} base   Object to compare with
 * @return {RicosContent}        Return a new object who represent the diff
 */
export function compare(object, base, options: { verbose?: boolean } = {}) {
  const { verbose } = options;
  object.blocks && removeEmoji(object);
  base.blocks && removeEmoji(base);

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
                to: currentValue,
              },
            },
            { depth: null }
          );
        }
      }
    });
  }

  return changes(object, base);
}

const comparator = (left, right, key) => {
  if (IGNORED_KEYS.includes(key)) {
    return true;
  }
  if (left?.enableVoteRole !== undefined || right?.enableVoteRole !== undefined) {
    return isEqual(omit(left, IGNORED_POLL_CONFIG_KEYS), omit(right, IGNORED_POLL_CONFIG_KEYS));
  }
  return undefined;
};

const removeEmoji = object => {
  const emojiEntityKeys: number[] = [];
  Object.entries<any>(object.entityMap).forEach(
    ([key, value]) => value.type === 'EMOJI_TYPE' && emojiEntityKeys.push(parseInt(key, 10))
  );
  object.entityMap = Object.entries<any>(object.entityMap).filter(
    ([, value]) => value.type !== 'EMOJI_TYPE'
  );
  object.blocks = object.blocks.map(block => ({
    ...block,
    entityRanges: block.entityRanges.filter(range => !emojiEntityKeys.includes(range.key)),
  }));
};
