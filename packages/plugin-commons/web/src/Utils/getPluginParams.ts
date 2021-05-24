import { PluginAddParams, TABLE_TYPE, LINK_PREVIEW_TYPE } from 'wix-rich-content-common';

interface Data {
  componentData;
  buttonName: string;
}

export const getPluginParams = (data: Data, blockType: string): PluginAddParams | undefined => {
  const { componentData, buttonName } = data;
  switch (blockType) {
    case TABLE_TYPE:
      return {
        rows: componentData?.config?.rowsHeight.length,
        columns: componentData?.config?.colsWidth.length,
      };
    case LINK_PREVIEW_TYPE:
      return {
        link: componentData?.config?.link?.url || '',
        service: buttonName.substr(0, buttonName.indexOf('_InsertButton')), //Twitter_InsertButton
      };
    default:
      return undefined;
  }
};
