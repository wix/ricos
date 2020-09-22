/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  DEFAULTS - should contain at least an empty 'config' (or else ricos won't work)
*/

import { YOUR_PLUGIN_NAME_TYPE as type } from './types';
export const DEFAULTS = Object.freeze({
  type,
  config: {
    size: 'content',
    alignment: 'center',
  },
});
