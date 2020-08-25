/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  THEME - receives 'colors' object (palette) and returns a css object which is the exact css style of the plugin,
          but with a transformation of colors based on the palette.
          Please find examples of usage in other plugins.
  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/
export { ACCORDION_TYPE } from './types';

import {
  PlusIcon,
  ArrowIcon_01,
  ArrowIcon_02,
  ArrowIcon_03,
  dndHoverIcon,
  dndSelectedIcon,
  dndUnselectedIcon,
} from './icons';

export const directions = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const visualizations = {
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed',
  FIRST_EXPANDED: 'first_expanded',
};

export const NEW_PAIR_DATA = {};

export const Icons = {
  arrow_01: ArrowIcon_01,
  arrow_02: ArrowIcon_02,
  arrow_03: ArrowIcon_03,
  plus: PlusIcon,
  dndHover: dndHoverIcon,
  dndSelected: dndSelectedIcon,
  dndUnselected: dndUnselectedIcon,
};

export const DEFAULTS = Object.freeze({
  config: {
    visualization: visualizations.FIRST_EXPANDED,
    iconStyle: Object.keys(Icons)[1],
    direction: directions.LTR,
    expandOneSection: false,
  },
  pairs: {
    '1': NEW_PAIR_DATA,
  },
});

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
