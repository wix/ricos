/* eslint-disable fp/no-delete */
import toCamelCase from 'to-camel-case';
import { has, cloneDeep } from 'lodash';
import {
  ACTION_BUTTON_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  IMAGE_TYPE,
  LINK_BUTTON_TYPE,
  LINK_PREVIEW_TYPE,
  MENTION_TYPE,
  POLL_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
} from '../../../consts';
import { PluginContainerData_Spoiler, FileSource } from 'ricos-schema';

const kebabToConstantCase = (str: string) => str.toUpperCase().replace('-', '_');

export const convertBlockDataToRicos = (blockType: string, data) => {
  const newData = cloneDeep(data);
  const conversionFunctions = {
    [VIDEO_TYPE]: convertVideoData,
    [DIVIDER_TYPE]: convertDividerData,
    [IMAGE_TYPE]: convertImageData,
    [POLL_TYPE]: convertPollData,
    [VERTICAL_EMBED_TYPE]: convertVerticalEmbedData,
    [LINK_PREVIEW_TYPE]: convertLinkPreviewData,
    [MENTION_TYPE]: convertMention,
    [FILE_UPLOAD_TYPE]: convertFileData,
    [LINK_BUTTON_TYPE]: convertButtonData,
    [ACTION_BUTTON_TYPE]: convertButtonData,
  };
  if (blockType in conversionFunctions) {
    conversionFunctions[blockType](newData, blockType);
  }
  if (newData.config) {
    convertContainerData(newData);
  }
  return newData;
};

const convertContainerData = data => {
  const { size, alignment } = data.config;
  let spoiler: PluginContainerData_Spoiler | undefined;
  if (data.config.spoiler?.enabled) {
    const { description, buttonContent } = data.config.spoiler;
    spoiler = { description, buttonText: buttonContent };
  }
  data.containerData = {
    width: kebabToConstantCase(size),
    alignment: kebabToConstantCase(alignment),
    spoiler,
  };
};

const convertVideoData = data => {
  // src is split into src for objects and url for strings
  if (typeof data.src === 'string') {
    data.video = { src: { url: data.src } };
    data.thumbnail = {
      src: { url: data.metadata.thumbnail_url },
      width: data.metadata.width,
      height: data.metadata.height,
    };
  } else if (typeof data.src === 'object') {
    data.video = { src: { custom: data.src.pathname } };
    data.thumbnail = {
      src: { custom: data.src.thumbnail.pathname },
      width: data.src.thumbnail.width,
      height: data.src.thumbnail.height,
    };
  }
};

const convertDividerData = data => {
  has(data, 'type') && (data.type = data.type.toUpperCase());
};

const convertImageData = data => {
  const { id, file_name, width, height } = data.src;
  const { link, anchor, disableExpand } = data.config;
  data.image = { src: { custom: id || file_name }, width, height };
  data.link = anchor ? { anchor } : link;
  data.disableExpand = disableExpand;
  data.altText = data.metadata?.alt;
  data.caption = data.metadata?.caption;
};

const convertPollData = data => {
  has(data, 'layout.poll.type') && (data.layout.poll.type = data.layout.poll.type.toUpperCase());
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = data.layout.poll.direction.toUpperCase());
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = data.design.poll.backgroundType.toUpperCase());
};

const convertVerticalEmbedData = data => {
  has(data, 'type') && (data.type = data.type.toUpperCase());
};

const convertLinkPreviewData = data => {
  has(data, 'thumbnail_url') && (data.thumbnailUrl = data.thumbnail_url);
  has(data, 'provider_url') && (data.providerUrl = data.provider_url);
};

const convertMention = data => {
  data.name = data.mention.name;
  data.slug = data.mention.slug;
  delete data.mention;
};

const convertFileData = data => {
  const src: FileSource = { url: data.url, custom: data.id };
  data.src = src;
};

const convertButtonData = (data, blockType) => {
  const { settings, design } = data.button;
  const { borderRadius, borderWidth, background, color, borderColor } = design;
  const { buttonText, url, rel, target } = settings;
  data.styles = {
    borderRadius,
    borderWidth,
    backgroundColor: background,
    textColor: color,
    borderColor,
  };
  data.type = blockType;
  data.text = buttonText;
  if (settings.url) {
    data.link = { url, rel, target };
  }
};

export const keysToCamelCase = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [toCamelCase(key), value]));
