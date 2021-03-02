/* eslint-disable fp/no-delete */
import toConstantCase from 'to-constant-case';
import toCamelCase from 'to-camel-case';
import { has, cloneDeep } from 'lodash';
import {
  DIVIDER_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  LINK_PREVIEW_TYPE,
  MENTION_TYPE,
  POLL_TYPE,
  SOUND_CLOUD_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
} from '../../../consts';

export const convertBlockDataToRicos = (blockType: string, data) => {
  const newData = cloneDeep(data);
  const conversionFunctions = {
    [VIDEO_TYPE]: convertVideoData,
    [DIVIDER_TYPE]: convertDividerData,
    [IMAGE_TYPE]: convertImageData,
    [GALLERY_TYPE]: convertGalleryData,
    [POLL_TYPE]: convertPollData,
    [VERTICAL_EMBED_TYPE]: convertVerticalEmbedData,
    [HTML_TYPE]: convertHtmlData,
    [GIPHY_TYPE]: convertGiphyData,
    [LINK_PREVIEW_TYPE]: convertLinkPreviewData,
    [SOUND_CLOUD_TYPE]: convertSoundCloudData,
    [MENTION_TYPE]: convertMention,
  };
  if (blockType in conversionFunctions) {
    conversionFunctions[blockType](newData);
  }
  return newData;
};

const convertVideoData = data => {
  // src is split into src for objects and url for strings
  if (typeof data.src === 'string') {
    data.url = data.src;
    delete data.src;
  }
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
  if (data.metadata) {
    data.metadata = keysToCamelCase(data.metadata);
  }
};

const convertDividerData = data => {
  has(data, 'type') && (data.type = toConstantCase(data.type));
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const convertImageData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
  if (has(data, 'src.original_file_name')) {
    data.src.originalFileName = data.src.original_file_name;
    delete data.src.original_file_name;
  }
  if (has(data, 'src.file_name')) {
    data.src.fileName = data.src.file_name;
    delete data.src.file_name;
  }
};

const convertGalleryData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const convertPollData = data => {
  has(data, 'config.size') && (data.config.size = toConstantCase(data.config.size));
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
  has(data, 'layout.poll.type') && (data.layout.poll.type = toConstantCase(data.layout.poll.type));
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = toConstantCase(data.layout.poll.direction));
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = toConstantCase(data.design.poll.backgroundType));
};

const convertVerticalEmbedData = data => {
  has(data, 'type') && (data.type = toConstantCase(data.type));
};

const convertHtmlData = data => {
  has(data, 'config.alignment') && (data.config.alignment = toConstantCase(data.config.alignment));
};

const convertGiphyData = data => {
  has(data, 'configViewer.sizes.desktop') &&
    (data.configViewer.sizes.desktop = toConstantCase(data.configViewer.sizes.desktop));
  has(data, 'configViewer.sizes.mobile') &&
    (data.configViewer.sizes.mobile = toConstantCase(data.configViewer.sizes.mobile));
};

const convertLinkPreviewData = data => {
  has(data, 'thumbnail_url') && (data.thumbnailUrl = data.thumbnail_url);
  has(data, 'provider_url') && (data.providerUrl = data.provider_url);
};

const convertSoundCloudData = data => {
  if (data.metadata) {
    data.metadata = keysToCamelCase(data.metadata);
  }
};

const convertMention = data => {
  data.name = data.mention.name;
  data.slug = data.mention.slug;
  delete data.mention;
};

export const keysToCamelCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toCamelCase(key), value]));
