import { TABLE_TYPE } from 'wix-rich-content-common';

export const getPluginParams = (data, blockType) => {
  if (blockType === TABLE_TYPE) {
    return {
      rows: data?.config.rowsHeight.length,
      columns: data?.config.colsWidth.length,
    };
  }
};
