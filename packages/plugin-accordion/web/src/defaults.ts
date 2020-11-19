import { generateKey } from 'wix-rich-content-plugin-commons';
export { ACCORDION_TYPE } from './types';
export const COMPONENT_DATA = 'componentData';

export const directions = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const EXPANDED = 'expanded';
export const COLLAPSED = 'collapsed';
export const FIRST_EXPANDED = 'first_expanded';

export const DEFAULTS = Object.freeze({
  config: {
    expandState: FIRST_EXPANDED,
    direction: directions.LTR,
    expandOnlyOne: false,
  },
  pairs: [
    {
      key: generateKey(),
    },
  ],
});
