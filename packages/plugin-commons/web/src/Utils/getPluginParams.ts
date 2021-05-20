import { PluginAddParams, TABLE_TYPE } from 'wix-rich-content-common';

export const getPluginParams = (data, blockType: string): PluginAddParams | undefined => {
  switch (blockType) {
    case TABLE_TYPE:
      return {
        rows: data?.config.rowsHeight.length,
        columns: data?.config.colsWidth.length,
      };
    default:
      return undefined;
  }
};
