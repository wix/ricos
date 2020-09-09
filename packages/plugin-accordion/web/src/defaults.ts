import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
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
    '1': {
      title: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    },
  },
});

export const FIRST_PAIR = '1';

//@colors is defined in 'ThemeGenerator.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  return {
    new_pair_container: {
      '& $new_pair_button': {
        color: colors.actionColor,
      },
      '& svg': {
        color: colors.actionColor,
        fill: colors.actionColor,
      },
    },
    new_pair_button: {},
    direction_selector_option: {
      '& svg': {
        color: colors.actionColor,
        fill: colors.actionColor,
      },
      '& p': {
        color: colors.actionColor,
        fill: colors.actionColor,
      },
    },
  };
};
