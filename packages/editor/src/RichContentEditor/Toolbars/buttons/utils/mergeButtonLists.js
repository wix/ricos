/**
 *
 * @param {string[]} sourceList built-in button list
 * @param {Array} positionedList plugin button data { name, position } array
 * @param {string} formFactor determines position type desktop/mobile
 * @param {Function} onInsert [optional] callback called before name merged to list
 * @returns {Array} merged button list
 */
export const mergeButtonLists = (
  sourceList,
  positionedList,
  formFactor = 'desktop',
  onInsert = ({ mergedList }) => mergedList
) => {
  return positionedList.reduce(
    (mergedList, buttonData) => {
      if (buttonData.name) {
        if (
          buttonData.position &&
          buttonData.position[formFactor] &&
          buttonData.position[formFactor] > 0 &&
          buttonData.position[formFactor] < mergedList.length
        ) {
          const transformedList = onInsert({ mergedList, sourceList, formFactor, buttonData });
          transformedList.splice(buttonData.position[formFactor], 0, buttonData.name);
          return transformedList;
        }
        const transformedList = onInsert({ mergedList, sourceList, formFactor, buttonData });
        const merged = [...transformedList, buttonData.name];
        return merged;
      }
      return mergedList;
    },
    [...sourceList]
  );
};
