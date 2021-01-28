import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_LINK_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertDecorationDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createLinkData: CreatePluginsDataMap[typeof RICOS_LINK_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const linkData = convertDecorationDataToDraft(rich_content.Decoration.Type.LINK, pluginData);
  return merge({}, currentData || DEFAULTS, linkData);
};
