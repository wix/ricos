import { transform, isEqual, isObject } from 'lodash';
/**
 * Deep diff between two object, using lodash
 * @param  {RicosContent} object Object compared
 * @param  {RicosContent} base   Object to compare with
 * @return {RicosContent}        Return a new object who represent the diff
 */
export function compare(object, base) {
  function changes(object, base) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return transform<any, any>(object, (result, value, key) => {
      const baseValue = base[key];
      if (
        !isEqual(value, baseValue) &&
        !['anchorNode', 'lastEdited', 'key'].includes(key as string)
      ) {
        const areObjects = isObject(value) && isObject(baseValue);
        const currentValue = areObjects ? changes(value, baseValue) : value;
        if (!(isObject(currentValue) && Object.keys(currentValue).length === 0)) {
          result[key] = currentValue;
          if (!areObjects) {
            // eslint-disable-next-line no-console
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
      }
    });
  }
  return changes(object, base);
}
