const maxPosition = 100;
const separatorButton = { buttonName: 'Separator' };

const addSeparators = groups => {
  groups.forEach((group, i) => {
    if (i !== group.length - 1) {
      group.push(separatorButton);
    }
  });
};

const shouldCreateNewGroup = (groups, groupIndex) => !groups[groupIndex];

const compareButtons = (a, b) => {
  if (a.position === b.position && a.isPositioned && !b.isPositioned) {
    return -1;
  }
  if (a.position === b.position && b.isPositioned && !a.isPositioned) {
    return 1;
  }
  return a.position - b.position;
};

const initializeGroupButtons = (sourceList, positionedList, formFactor) => {
  const groups = [];
  sourceList.forEach((group, groupIndex) => {
    group.forEach((buttonName, position) => {
      const button = { buttonName, position: position * 2, groupIndex };
      if (shouldCreateNewGroup(groups, groupIndex)) {
        groups.push([]);
      }
      groups[button.groupIndex].push(button);
    });
  });

  positionedList.forEach(buttonData => {
    const groupIndex = buttonData.group?.[formFactor] ?? sourceList.length;
    const position = buttonData.position?.[formFactor] ?? maxPosition;
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
  return groups;
};
/**
 * @param {string[]} sourceList built-in button list
 * @param {Array} positionedList plugin button data { name, position, group } array
 * @param {string} formFactor determines position & group type desktop/mobile
 * @returns {Array} merged button list
 */
export const mergeButtonLists = (sourceList, positionedList, formFactor = 'desktop') => {
  const groups = initializeGroupButtons(sourceList, positionedList, formFactor);
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
