/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  THEME - receives 'colors' object (palette) and returns a css object which is the exact css style of the plugin,
          but with a transformation of colors based on the palette.
          Please find examples of usage in other plugins.
  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/

import { DownArrowIcon, RightArrowIcon } from './icons';

export const directions = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const visualizations = {
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed',
  FIRST_EXPANDED: 'first_expanded',
};
export const NEW_PAIR_DATA = { title: {}, content: {} };

export const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
    settings: {
      visualization: visualizations.FIRST_EXPANDED,
      iconStyle: 'arrow',
      direction: directions.LTR,
      expandOneSection: false,
    },
    pairs: {
      '1': NEW_PAIR_DATA,
    },
  },
});

export const TABS = {
  DESIGN: 'design',
  SETTINGS: 'settings',
};

export const Icons = {
  arrow: { expanded: DownArrowIcon, collapsed: RightArrowIcon },
};

export const NEW_PAIR = 'new_pair';

export const FIRST_PAIR = '1';

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
