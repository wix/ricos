/*
  This module contains default params for your plugin.
  DEFAULTS - should at least contain an empty object of config (or else the wrapper won't work)
  THEME - receives 'colors' object (palette) and returns a css object which is the exact css style of the plugin,
          but with a transformation of colors based on the palette.
          Please find examples of usage in other plugins.
*/
export const DEFAULTS = Object.freeze({
  config: {},
});

// colors["actionColor", "bgColor", "textColor", "secondaryColor"]
export const THEME = colors => {
  console.warn(
    `YourPluginName needs to provide css definitions for RichContentWrapper.
    If you're using any color that arrives from Wix Palettes, then you should go to your
    plugin's "defaults.js" and add the relevant classnames.
    If you don't - you can remove this message.`
  );
  return {};
};
