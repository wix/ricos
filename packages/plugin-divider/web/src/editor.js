import { createDividerPlugin } from './createDividerPlugin';
import { DIVIDER_TYPE } from './constants';

const config = {};

export const pluginDivider = {
  config,
  type: DIVIDER_TYPE,
  createPlugin: createDividerPlugin,
  ModalsMap: {},
};
