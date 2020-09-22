/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  THEME - receives 'colors' object (palette) and returns a css object which is the exact css style of the plugin,
          but with a transformation of colors based on the palette.
          Please find examples of usage in other plugins.
  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/

import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
import { ACCORDION_TYPE as type } from './types';
export const DEFAULTS = Object.freeze({
  type,
  config: {
    size: 'content',
    alignment: 'center',
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const theme = (colors: PaletteColors, utils: ThemeUtils) => {};
