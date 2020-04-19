import { cloneDeep } from 'lodash';
const shouldCreateNewGroup = (mergedList, groupIndex) => !mergedList[groupIndex];

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
export const mergeButtonLists = (sourceList, positionedList, formFactor = 'desktop') => {
  const mergedList = cloneDeep(sourceList);
  positionedList.forEach(buttonData => {
    const groupIndex =
      buttonData.group?.[formFactor] !== undefined
        ? buttonData.group?.[formFactor]
        : sourceList.length;
    const position = buttonData.position?.[formFactor];
    if (position < mergedList[groupIndex]?.length) {
      mergedList[groupIndex].splice(position, 0, buttonData.name);
    } else {
      if (shouldCreateNewGroup(mergedList, groupIndex)) {
        mergedList.push([]);
      }
      mergedList[groupIndex].push(buttonData.name);
    }
  });
  formFactor === 'desktop' && addSeparators(mergedList);
  return mergedList.flat();
};
