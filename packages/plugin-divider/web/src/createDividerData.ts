import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
import { RicosDivider } from 'ricos-schema';
import { migrateDividerData } from 'ricos-content';

export const createDividerData: CreatePluginsDataMap[typeof DIVIDER_TYPE] = pluginData => {
  if (!pluginData) {
    return DEFAULTS;
  }
  const dividerData = RicosDivider.toObject(pluginData, {
    enums: String,
  });
  migrateDividerData(dividerData);
  return merge({}, DEFAULTS, dividerData);
};
