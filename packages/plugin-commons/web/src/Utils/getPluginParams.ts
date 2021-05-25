import {
  PluginAddParams,
  TABLE_TYPE,
  LINK_PREVIEW_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
} from 'wix-rich-content-common';

interface Data {
  componentData;
  buttonName: string;
}

const getTableParams = componentData => ({
  rows: componentData?.config?.rowsHeight.length,
  columns: componentData?.config?.colsWidth.length,
});

const getEmbedService = (buttonName: string) =>
  buttonName.substr(0, buttonName.indexOf('_InsertButton')); //Twitter_InsertButton

const getLinkPreviewParams = (componentData, buttonName: string) => ({
  link: componentData?.config?.link?.url || '',
  service: getEmbedService(buttonName),
});

const getVideoParams = (componentData, buttonName: string) => ({
  link: componentData?.src?.pathname || componentData?.src || '',
  service: getEmbedService(buttonName),
});

const getVerticalEmbedParams = componentData => ({
  type: componentData?.type,
  id: componentData?.selectedProduct?.id,
});

export const getPluginParams = (data: Data, blockType: string): PluginAddParams | undefined => {
  const { componentData, buttonName } = data;
  switch (blockType) {
    case TABLE_TYPE:
      return getTableParams(componentData);
    case LINK_PREVIEW_TYPE:
      return getLinkPreviewParams(componentData, buttonName);
    case VIDEO_TYPE:
      return getVideoParams(componentData, buttonName);
    case VERTICAL_EMBED_TYPE:
      return getVerticalEmbedParams(componentData);
    default:
      return undefined;
  }
};
