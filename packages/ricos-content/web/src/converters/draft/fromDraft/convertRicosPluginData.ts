/* eslint-disable fp/no-delete */
import { has, cloneDeep } from 'lodash';
import {
  ACTION_BUTTON_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  LINK_BUTTON_TYPE,
  LINK_PREVIEW_TYPE,
  MENTION_TYPE,
  POLL_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
} from '../../../consts';
import {
  PluginContainerData_Spoiler,
  FileSource,
  PluginContainerData_Width_Type,
  ButtonData_Type,
  Link,
  Link_Target,
} from 'ricos-schema';
import { TO_RICOS_DATA } from './consts';
import {
  ComponentData,
  FileComponentData,
  ImageComponentData,
  VideoComponentData,
} from '../../../types';

export const convertBlockDataToRicos = (blockType: string, data) => {
  const newData = cloneDeep(data);
  const converters = {
    [VIDEO_TYPE]: convertVideoData,
    [DIVIDER_TYPE]: convertDividerData,
    [FILE_UPLOAD_TYPE]: convertFileData,
    [IMAGE_TYPE]: convertImageData,
    [POLL_TYPE]: convertPollData,
    [VERTICAL_EMBED_TYPE]: convertVerticalEmbedData,
    [LINK_PREVIEW_TYPE]: convertLinkPreviewData,
    [MENTION_TYPE]: convertMention,
    [LINK_BUTTON_TYPE]: convertButtonData,
    [ACTION_BUTTON_TYPE]: convertButtonData,
    [HTML_TYPE]: convertHTMLData,
  };
  if (newData.config && blockType !== DIVIDER_TYPE) {
    convertContainerData(newData);
  }
  if (blockType in converters) {
    const convert = converters[blockType];
    convert(newData, blockType);
  }
  const fromJSON = data => {
    const pluginDataMethods = TO_RICOS_DATA[blockType];
    return pluginDataMethods?.fromJSON(data) || data;
  };
  return fromJSON(newData);
};

const convertContainerData = (data: { config?: ComponentData['config']; containerData }) => {
  const { size, alignment, width, spoiler } = data.config || {};
  let newSpoiler: PluginContainerData_Spoiler | undefined;
  if (spoiler?.enabled) {
    const { description, buttonContent } = spoiler;
    newSpoiler = { description, buttonText: buttonContent };
  }
  const type =
    size && (size === 'inline' ? PluginContainerData_Width_Type.CUSTOM : kebabToConstantCase(size));
  data.containerData = {
    width: {
      type,
      customWidth: typeof width === 'number' ? width : undefined,
    },
    alignment: alignment && kebabToConstantCase(alignment),
    spoiler: newSpoiler,
  };
};

const convertVideoData = (data: {
  src?: string | VideoComponentData;
  metadata?: { thumbnail_url?: string; width?: number; height?: number };
  video;
  thumbnail;
}) => {
  if (typeof data.src === 'string') {
    data.video = { src: { url: data.src } };
    const { thumbnail_url, width, height } = data.metadata || {};
    data.thumbnail = {
      src: { url: thumbnail_url },
      width,
      height,
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

const convertDividerData = (data: {
  type?: string;
  config?: ComponentData['config'];
  width;
  alignment;
  containerData;
}) => {
  has(data, 'type') && (data.type = data.type?.toUpperCase());
  has(data, 'config.size') && (data.width = data.config?.size?.toUpperCase());
  has(data, 'config.alignment') && (data.alignment = data.config?.alignment?.toUpperCase());
  data.containerData = { width: { type: PluginContainerData_Width_Type.CONTENT } };
};

const convertImageData = (data: {
  src?: ImageComponentData;
  config?: ComponentData['config'];
  metadata?: { alt?: string; caption?: string };
  image;
  link;
  disableExpand;
  altText;
  caption;
}) => {
  const { file_name, width, height } = data.src || {};
  const { link, anchor, disableExpand } = data.config || {};
  data.image = { src: { custom: file_name }, width, height };
  data.link = (link || anchor) && convertLink({ ...link, anchor });
  data.disableExpand = disableExpand;
  data.altText = data.metadata?.alt;
  data.caption = data.metadata?.caption;
};

const convertPollData = (data: { layout; design }) => {
  has(data, 'layout.poll.type') && (data.layout.poll.type = data.layout.poll.type.toUpperCase());
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = data.layout.poll.direction.toUpperCase());
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = data.design.poll.backgroundType.toUpperCase());
};

const convertVerticalEmbedData = (data: { type?: string }) => {
  has(data, 'type') && (data.type = data.type?.toUpperCase());
};

const convertLinkPreviewData = (data: {
  thumbnail_url?: string;
  provider_url?: string;
  config?: { link };
  thumbnailUrl;
  providerUrl;
}) => {
  has(data, 'thumbnail_url') && (data.thumbnailUrl = data.thumbnail_url);
  has(data, 'provider_url') && (data.providerUrl = data.provider_url);
  data.config?.link && (data.config.link = convertLink(data.config?.link));
};

const convertMention = (data: {
  mention?: { name?: string; slug?: string };
  name?: string;
  slug?: string;
}) => {
  data.name = data.mention?.name;
  data.slug = data.mention?.slug;
  delete data.mention;
};

const convertFileData = (data: FileComponentData & { src }) => {
  const src: FileSource = { url: data.url, custom: data.id };
  data.src = src;
};

const convertButtonData = (
  data: { button?: { settings; design }; styles; type; text; link },
  blockType: string
) => {
  const { settings, design } = data.button || {};
  const { borderRadius, borderWidth, background, color, borderColor } = design || {};
  const { buttonText, url, rel, target } = settings || {};
  data.styles = {
    borderRadius,
    borderWidth,
    backgroundColor: background,
    textColor: color,
    borderColor,
  };
  data.type = blockType === ACTION_BUTTON_TYPE ? ButtonData_Type.ACTION : ButtonData_Type.LINK;
  data.text = buttonText;
  if (url) {
    data.link = convertLink({
      url,
      rel: rel ? 'nofollow' : undefined,
      target: target ? '_blank' : '_top',
    });
  }
};

const convertHTMLData = data => {
  data.containerData.width.type = PluginContainerData_Width_Type.CUSTOM;
};

const convertLink = ({
  url,
  rel,
  target,
  anchor,
}: {
  url?: string;
  rel?: string;
  target?: string;
  anchor?: string;
}): Link => {
  const relValues =
    rel
      ?.split(' ')
      .filter(key => ['nofollow', 'sponsored', 'ugc'].includes(key))
      .map(key => [key, true]) || [];
  return {
    anchor,
    url,
    rel: relValues.length > 0 ? Object.fromEntries(relValues) : undefined,
    target: target?.toUpperCase().substring(1) as Link_Target,
  };
};

const kebabToConstantCase = (str: string) => str.toUpperCase().replace('-', '_');
