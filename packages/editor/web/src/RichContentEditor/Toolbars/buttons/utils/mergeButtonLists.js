import { cloneDeep } from 'lodash';

const isPositionInBounds = (position, mergedList, group) =>
  position > 0 && position < mergedList[group]?.length;

const isNewGroup = (mergedList, group) => group && !mergedList[group];

const addSeparators = mergedList => {
  mergedList.forEach((list, i) => {
    if (i !== mergedList.length - 1) {
      list.push('Separator');
    }
  });
};
/**
 * @param {string[]} sourceList built-in button list
 * @param {Array} positionedList plugin button data { name, position, group } array
 * @param {string} formFactor determines position & group type desktop/mobile
 * @returns {Array} merged button list
 */
export const mergeButtonLists = (
  sourceList,
  positionedList,
  formFactor = 'desktop',
  isIncludeSeparators
) => {
  const merged = positionedList.reduce((mergedList, buttonData) => {
    if (buttonData.name) {
      const group =
        buttonData.group?.[formFactor] !== undefined
          ? buttonData.group?.[formFactor]
          : sourceList.length;
      const position = buttonData.position?.[formFactor];
      if (isPositionInBounds(position, mergedList, group)) {
        mergedList[group].splice(position, 0, buttonData.name);
        return mergedList;
      }
      if (isNewGroup(mergedList, group)) {
        mergedList.push([]);
      }
      mergedList[group].push(buttonData.name);
      return mergedList;
    }
    return mergedList;
  }, cloneDeep(sourceList));
  isIncludeSeparators && addSeparators(merged);
  return merged.flat();
};
