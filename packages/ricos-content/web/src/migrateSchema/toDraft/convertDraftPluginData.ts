/* eslint-disable fp/no-delete */
import { rich_content } from 'ricos-schema';
import toCamelCase from 'to-camel-case';
import toSnakeCase from 'to-snake-case';
import { has } from 'lodash';
import {
  ENTITY_DECORATION_TO_DATA_FIELD,
  FROM_RICOS_DECORATION_TYPE,
  FROM_RICOS_ENTITY_TYPE,
  TO_RICOS_DATA_FIELD,
} from '../consts';

export const convertNodeToDraftData = node => {
  const { type } = node;
  const validType: rich_content.Node.Type = Number.isInteger(type)
    ? type
    : rich_content.Node.Type[type];
  const draftPluginType = FROM_RICOS_ENTITY_TYPE[validType];
  const dataFieldName = TO_RICOS_DATA_FIELD[draftPluginType];
  return convertNodeDataToDraft(validType, node[dataFieldName]);
};

export const convertDecorationToDraftData = decoration => {
  const { type } = decoration;
  const validType: rich_content.Decoration.Type = Number.isInteger(type)
    ? type
    : rich_content.Decoration.Type[type];
  const dataFieldName = ENTITY_DECORATION_TO_DATA_FIELD[FROM_RICOS_DECORATION_TYPE[validType]];
  return convertDecorationDataToDraft(validType, decoration[dataFieldName]);
};

export const convertNodeDataToDraft = (nodeType: rich_content.Node.Type, data) => {
  const converters = {
    [rich_content.Node.Type.VIDEO]: [convertVideoData, rich_content.VideoData],
    [rich_content.Node.Type.DIVIDER]: [convertDividerData, rich_content.DividerData],
    [rich_content.Node.Type.FILE]: [convertFileData, rich_content.FileData],
    [rich_content.Node.Type.IMAGE]: [convertImageData, rich_content.ImageData],
    [rich_content.Node.Type.GALLERY]: [convertGalleryData, rich_content.GalleryData],
    [rich_content.Node.Type.POLL]: [convertPollData, rich_content.PollData],
    [rich_content.Node.Type.VERTICAL_EMBED]: [
      convertVerticalEmbedData,
      rich_content.VerticalEmbedData,
    ],
    [rich_content.Node.Type.HTML]: [convertHtmlData, rich_content.HTMLData],
    [rich_content.Node.Type.GIPHY]: [convertGiphyData, rich_content.GiphyData],
    [rich_content.Node.Type.LINK_PREVIEW]: [convertLinkPreviewData, rich_content.LinkPreviewData],
    [rich_content.Node.Type.SOUND_CLOUD]: [convertSoundCloudData, rich_content.SoundCloudData],
  };
  if (nodeType in converters) {
    const [convert, Type] = converters[nodeType];
    const newData = getNewObjectWithStringEnums(data, Type);
    convert(newData);
    return newData;
  }
  return data;
};

export const convertDecorationDataToDraft = (
  decorationType: rich_content.Decoration.Type,
  data
) => {
  const converters = {
    [rich_content.Decoration.Type.MENTION]: [convertMention, rich_content.MentionData],
  };
  if (decorationType in converters) {
    const [convert, Type] = converters[decorationType];
    const newData = getNewObjectWithStringEnums(data, Type);
    convert(newData);
    return newData;
  }
  return data;
};

const getNewObjectWithStringEnums = (object, Type) =>
  Type.toObject(Type.fromObject(object), { enums: String });

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

const convertSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToSnakeCase(data.metadata);
  }
};

const convertMention = data => {
  data.mention = { slug: data.slug, name: data.name };
  delete data.name;
  delete data.slug;
};

const keysToSnakeCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value]));
