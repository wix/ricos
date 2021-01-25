import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_DIVIDER_TYPE } from 'wix-rich-content-common';
import { migrateDividerData } from 'ricos-content/libs/migrateSchema';
import { RicosDivider } from 'ricos-schema';

export const createDividerData: CreatePluginsDataMap[typeof RICOS_DIVIDER_TYPE] = pluginData => {
  if (!pluginData) {
    return DEFAULTS;
  }
  const dividerData = RicosDivider.toObject(pluginData, {
    enums: String,
  });
  migrateDividerData(dividerData);
  return merge({}, DEFAULTS, dividerData);
};
