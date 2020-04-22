const shouldCreateNewGroup = (mergedList, groupIndex) => !mergedList[groupIndex];

const addSeparators = list => {
  list.forEach((list, i) => {
    if (i !== list.length - 1) {
      list.push({ buttonName: 'Separator' });
    }
  });
};

const compareButtons = (a, b) => {
  if (a.position === b.position && a.isPositioned && !b.isPositioned) {
    return -1;
  }
  if (a.position === b.position && b.isPositioned && !a.isPositioned) {
    return 1;
  }
  return a.position - b.position;
};
/**
 * @param {string[]} sourceList built-in button list
 * @param {Array} positionedList plugin button data { name, position, group } array
 * @param {string} formFactor determines position & group type desktop/mobile
 * @returns {Array} merged button list
 */
export const mergeButtonLists = (sourceList, positionedList, formFactor = 'desktop') => {
  const groups = [];
  sourceList.forEach((group, groupIndex) => {
    group.forEach((buttonName, i) => {
      const button = { buttonName, position: i * 2, groupIndex };
      if (shouldCreateNewGroup(groups, groupIndex)) {
        groups.push([]);
      }
      groups[button.groupIndex].push(button);
    });
  });

  positionedList.forEach(buttonData => {
    const groupIndex =
      buttonData.group?.[formFactor] !== undefined
        ? buttonData.group?.[formFactor]
        : sourceList.length;
    const position =
      buttonData.position?.[formFactor] !== undefined ? buttonData.position?.[formFactor] : 100;
    if (shouldCreateNewGroup(groups, groupIndex)) {
      groups.push([]);
    }
    groups[groupIndex].push({
      buttonName: buttonData.name,
      position,
      groupIndex,
      isPositioned: true,
    });
  });

  groups.forEach(group => group.sort(compareButtons));
  formFactor === 'desktop' && addSeparators(groups);
  let mergedList = [];
  groups.forEach(group => {
    group.forEach(button => {
      mergedList = [...mergedList, button.buttonName];
    });
  });
  return mergedList;
};
