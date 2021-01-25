import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_DIVIDER_TYPE } from 'wix-rich-content-common';
// eslint-disable-next-line no-unused-vars
import { RicosDivider } from 'ricos-schema';
import { migrateDividerData } from 'ricos-content/libs/migrateSchema';

export const createDividerData: CreatePluginsDataMap[typeof RICOS_DIVIDER_TYPE] = pluginData => {
  if (!pluginData) {
    return DEFAULTS;
  }
  // const dividerData = RicosDivider.toObject(pluginData, {
  //   enums: String,
  // });
  const dividerData = pluginData;
  migrateDividerData(dividerData);
  return merge({}, DEFAULTS, dividerData);
};
