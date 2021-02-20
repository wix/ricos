/**
 * @param {Array<any>} pluginTextButtons array of button data entries
 * @returns {object} { buttonName1: button1, ... }
 */
export const reducePluginTextButtons = pluginTextButtons =>
  pluginTextButtons.reduce((buttons, buttonData) => {
    const buttonSet = Object.keys(buttonData).reduce(
      (singlePluginButtons, key) => ({ ...singlePluginButtons, [key]: buttonData[key] }),
      {}
    );
    return { ...buttons, ...buttonSet };
  }, {});
