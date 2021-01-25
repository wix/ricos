import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import {
  CreatePluginsDataMap,
  RICOS_DIVIDER_TYPE,
  migrateDividerData,
} from 'wix-rich-content-common';
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
