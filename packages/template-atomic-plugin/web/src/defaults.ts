// import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
/*
  This module contains default params for your plugin.
  You can add whatever you like here.
  theme - optional function. Receives 'colors' object that represents a palette received from ricos, if provided.
  won't be triggered if palette is not given.
  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/

import { YOUR_PLUGIN_NAME_TYPE as type } from './types';
export const DEFAULTS = {
  type,
  config: {
    size: 'content',
    alignment: 'center',
  },
};

// export const theme = (colors: PaletteColors, utils: ThemeUtils) => {};
