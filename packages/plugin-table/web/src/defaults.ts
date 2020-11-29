/*
  This module contains default params for your plugin.
  You can add whatever you like here.

  DEFAULTS - should contain at least an empty 'config' (or else the wrapper won't work)
*/

import { TABLE_TYPE as type } from './types';
export const DEFAULTS = Object.freeze({
  type,
  config: {
    size: 'content',
    alignment: 'center',
  },
});
