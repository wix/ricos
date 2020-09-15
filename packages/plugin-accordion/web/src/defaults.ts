import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
export { ACCORDION_TYPE } from './types';

export const COMPONENT_DATA = 'componentData';

import { ArrowIcon, PlusIcon, DndIcon } from './icons';

export const directions = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const EXPANDED = 'expanded';
export const COLLAPSED = 'collapsed';
export const FIRST_EXPANDED = 'first_expanded';

export const MAX_ZINDEX = 5;
export const MID_ZINDEX = 1;
export const MIN_ZINDEX = 0;

export const Icons = {
  arrow_01: ArrowIcon,
  plus: PlusIcon,
  dnd: DndIcon,
};

export const generateKey = () => Math.floor(Math.random() * 100000) + 1;

export const DEFAULTS = Object.freeze({
  config: {
    expandState: FIRST_EXPANDED,
    iconStyle: Object.keys(Icons)[0],
    direction: directions.LTR,
    expandOnlyOne: false,
  },
  pairs: [
    {
      key: generateKey(),
      title: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    },
  ],
});

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
