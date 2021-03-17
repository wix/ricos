import { TABLE_TYPE } from 'wix-rich-content-common';

export const getPluginParams = data => ({
  [TABLE_TYPE]: {
    rows: data?.config.rowsHeight.length,
    columns: data?.config.colsWidth.length,
  },
});
