const maxPosition = 100;
const separatorButton = { buttonName: 'Separator' };

const addSeparators = groups => {
  groups.forEach((group, i) => {
    if (group.length !== 0 && i !== groups.length - 1) {
      group.push(separatorButton);
    }
  });
};

const shouldCreateNewGroup = (groups, groupIndex) => !groups[groupIndex];

const compareButtons = (a, b) => {
  return a.position - b.position;
};

const addButton = (buttonName, position, groupIndex, groups) => {
  // eslint-disable-next-line fp/no-loops
  while (shouldCreateNewGroup(groups, groupIndex)) {
    groups.push([]);
  }
  groups[groupIndex].push({
    buttonName,
    position,
    groupIndex,
  });
};

const initializeGroupButtons = (defaultButtons, pluginButtons, formFactor) => {
  const groups = [];
  defaultButtons.forEach((group, groupIndex) => {
    group.forEach((buttonName, position) => {
      addButton(buttonName, position, groupIndex, groups);
    });
  });

  pluginButtons.forEach(buttonData => {
    const groupIndex = buttonData.group?.[formFactor] ?? defaultButtons.length;
    const position = buttonData.position?.[formFactor] ?? maxPosition;
    addButton(buttonData.name, position, groupIndex, groups);
  });
  return groups;
};
/**
 * @param {string[]} defaultButtons built-in button list
 * @param {Array} pluginButtons plugin button data { name, position, group } array
 * @param {string} formFactor determines position & group type desktop/mobile
 * @returns {Array} merged button list
 */
export const mergeButtonLists = (defaultButtons, pluginButtons, formFactor = 'desktop') => {
  const groups = initializeGroupButtons(defaultButtons, pluginButtons, formFactor);
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
