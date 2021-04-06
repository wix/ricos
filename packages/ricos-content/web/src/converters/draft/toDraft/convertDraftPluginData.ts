/* eslint-disable fp/no-delete */
import { Node_Type, Decoration_Type } from 'ricos-schema';
import toCamelCase from 'to-camel-case';
import toSnakeCase from 'to-snake-case';
import { cloneDeep, has } from 'lodash';
import {
  ENTITY_DECORATION_TO_DATA_FIELD,
  FROM_RICOS_DECORATION_TYPE,
  FROM_RICOS_ENTITY_TYPE,
  TO_RICOS_DATA_FIELD,
} from '../consts';

export const convertNodeToDraftData = node => {
  const { type } = node;
  const draftPluginType = FROM_RICOS_ENTITY_TYPE[type];
  const dataFieldName = TO_RICOS_DATA_FIELD[draftPluginType];
  return convertNodeDataToDraft(type, node[dataFieldName]);
};

export const convertDecorationToDraftData = decoration => {
  const { type } = decoration;
  const dataFieldName = ENTITY_DECORATION_TO_DATA_FIELD[FROM_RICOS_DECORATION_TYPE[type]];
  return convertDecorationDataToDraft(type, decoration[dataFieldName]);
};

export const convertNodeDataToDraft = (nodeType: Node_Type, data) => {
  const converters = {
    [Node_Type.VIDEO]: convertVideoData,
    [Node_Type.DIVIDER]: convertDividerData,
    [Node_Type.FILE]: convertFileData,
    [Node_Type.IMAGE]: convertImageData,
    [Node_Type.GALLERY]: convertGalleryData,
    [Node_Type.POLL]: convertPollData,
    [Node_Type.VERTICAL_EMBED]: convertVerticalEmbedData,
    [Node_Type.HTML]: convertHtmlData,
    [Node_Type.GIPHY]: convertGiphyData,
    [Node_Type.LINK_PREVIEW]: convertLinkPreviewData,
  };
  if (nodeType in converters) {
    const convert = converters[nodeType];
    const newData = cloneDeep(data);
    convert(newData);
    return newData;
  }
  return data;
};

export const convertDecorationDataToDraft = (decorationType: Decoration_Type, data) => {
  const converters = {
    [Decoration_Type.MENTION]: convertMention,
  };
  if (decorationType in converters) {
    const convert = converters[decorationType];
    const newData = cloneDeep(data);
    convert(newData);
    return newData;
  }
  return data;
};

const convertVideoData = data => {
  if (data.url) {
    data.src = data.url;
    delete data.url;
  }
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const convertDividerData = data => {
  has(data, 'type') && (data.type = toCamelCase(data.type));
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const convertFileData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const convertImageData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
  if (has(data, 'src.originalFileName')) {
    data.src.original_file_name = data.src.originalFileName;
    delete data.src.originalFileName;
  }
  if (has(data, 'src.fileName')) {
    data.src.file_name = data.src.fileName;
    delete data.src.fileName;
  }
};

const convertGalleryData = data => {
  has(data, 'config.size') && (data.config.size = toCamelCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const convertPollData = data => {
  has(data, 'layout.poll.type') && (data.layout.poll.type = toCamelCase(data.layout.poll.type));
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = toCamelCase(data.layout.poll.direction));
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = toCamelCase(data.design.poll.backgroundType));
};

const convertVerticalEmbedData = data => {
  has(data, 'type') && (data.type = toCamelCase(data.type));
};

const convertHtmlData = data => {
  has(data, 'config.alignment') && (data.config.alignment = toCamelCase(data.config.alignment));
};

const convertGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toCamelCase(data.configViewer.sizes.desktop));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toCamelCase(data.configViewer.sizes.mobile));
};

const convertLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'providerUrl')) {
    data.provider_url = data.providerUrl;
    delete data.providerUrl;
  }
};

const convertMention = data => {
  data.mention = { slug: data.slug, name: data.name };
  delete data.name;
  delete data.slug;
};

const keysToSnakeCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value]));
