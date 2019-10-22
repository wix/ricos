/**
 * @param {Array<any>} pluginTextButtons array of button data entries
 * @param {Function} filterButtons [optional] filter function button data => boolean
 * @returns {object} { buttonName1: button1, ... }
 */
export const reducePluginTextButtons = (pluginTextButtons, filterButtons = () => true) => {
  // iterate plugin buttons
  return pluginTextButtons.reduce((buttons, buttonData, i) => {
    if (buttonData) {
      // iterate each button set
      const buttonSet = Object.keys(buttonData).reduce((singlePluginButtons, key) => {
        if (filterButtons(buttonData[key])) {
          // index appended to avoid cross-plugin name conflicts
          return Object.assign(singlePluginButtons, { [`${key}_${i}`]: buttonData[key].component });
        }
        return singlePluginButtons;
      }, {});
      return Object.assign(buttons, buttonSet);
    }
    return buttons;
  }, {});
};

/**
 * @param {Array<any>} pluginTextButtons array of button data entries
 * @param {Function} filterButtons [optional] filter function button data => boolean
 * @returns {Array<any>} [{ name1, position1 }, ...]
 */
export const reducePluginTextButtonNames = (pluginTextButtons, filterButtons = () => true) => {
  // iterate plugin button mappers
  return pluginTextButtons.reduce((buttonNames, buttonData, i) => {
    if (buttonData) {
      // iterate each buttonData
      const singlePluginButtonNames = Object.keys(buttonData).reduce((names, key) => {
        if (filterButtons(buttonData[key])) {
          // index appended to avoid cross-plugin name conflicts
          return [...names, { name: `${key}_${i}`, position: buttonData[key].position }];
        }
        return names;
      }, []);
      return [...buttonNames, ...singlePluginButtonNames];
    }
    return buttonNames;
  }, []);
};
