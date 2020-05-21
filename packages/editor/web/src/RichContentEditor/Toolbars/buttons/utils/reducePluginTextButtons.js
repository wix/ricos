/**
 * @param {Array<any>} pluginTextButtons array of button data entries
 * @param {Function} filterButtons [optional] filter function button data => boolean
 * @returns {object} { buttonName1: button1, ... }
 */
export const reducePluginTextButtons = (pluginTextButtons, filterButtons = () => true) => {
  return pluginTextButtons.reduce((buttons, buttonData) => {
    if (buttonData) {
      const buttonSet = Object.keys(buttonData).reduce((singlePluginButtons, key) => {
        if (filterButtons(buttonData[key])) {
          return { ...singlePluginButtons, [key]: buttonData[key] };
        }
        return singlePluginButtons;
      }, {});
      return { ...buttons, ...buttonSet };
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
  return pluginTextButtons.reduce((buttonNames, buttonData) => {
    if (buttonData) {
      // iterate each buttonData
      const singlePluginButtonNames = Object.keys(buttonData).reduce((names, key) => {
        if (filterButtons(buttonData[key])) {
          return [
            ...names,
            {
              name: key,
              position: buttonData[key].position,
              group: buttonData[key].group,
            },
          ];
        }
        return names;
      }, []);
      return [...buttonNames, ...singlePluginButtonNames];
    }
    return buttonNames;
  }, []);
};
