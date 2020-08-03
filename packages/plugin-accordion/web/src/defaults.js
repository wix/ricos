/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  THEME - receives 'colors' object (palette) and returns a css object which is the exact css style of the plugin,
          but with a transformation of colors based on the palette.
          Please find examples of usage in other plugins.
  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/

import { ACCORDION_TYPE as type } from './types';
export const DEFAULTS = Object.freeze({
  type,
  config: {
    size: 'content',
    alignment: 'center',
  },
});

export const TABS = {
  DESIGN: 'design',
  SETTINGS: 'settings',
};

//@colors is defined in 'ThemeGenerator.js'
export const THEME = /*colors*/ () => {
  // console.warn(
  //   `Accordion needs to provide css definitions for Ricos.
  //   If you're using any color that arrives from Wix Palettes, then you should go to your
  //   plugin's "defaults.js" and add the relevant classnames.
  //   If you don't - you can remove this message.`
  // );
  return {};
};
