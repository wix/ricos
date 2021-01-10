/** Based on https://gist.github.com/Yimiprod/7ee176597fef230d1451 */
/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

import { transform, isEqual, isObject, get } from 'lodash';
/**
 * Deep diff between two object, using lodash
 * @param  {RicosContent} object Object compared
 * @param  {RicosContent} base   Object to compare with
 * @return {RicosContent}        Return a new object who represent the diff
 */
export function compare(object, base) {
  const { entityMap } = object;

  function changes(object, base) {
    return transform<any, any>(object, (result, value, key) => {
      const baseValue = base[key];
      if (
        !['anchorNode', 'lastEdited', 'key'].includes(key as string) &&
        !isEqual(value, baseValue) &&
        get(entityMap, `${baseValue.key}.type`) === 'EMOJI_TYPE' // ignore changes in emoji plugin
      ) {
        const areObjects = isObject(value) && isObject(baseValue);
        const currentValue = areObjects ? changes(value, baseValue) : value;
        result[key] = currentValue;
        if (!isObject(currentValue) || Object.keys(currentValue).length === 0) {
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
