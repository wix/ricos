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
  MAP_TYPE,
  SOCIAL_EMBED_TYPE,
  VIDEO_EMBED_TYPE,
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
    [MAP_TYPE]: convertMapData,
    [SOCIAL_EMBED_TYPE]: convertSocialEmbed,
    [VIDEO_EMBED_TYPE]: convertVideoEmbed,
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
  const { size, alignment, width, spoiler, height } = data.config || {};
  let newSpoiler: PluginContainerData_Spoiler | undefined;
  if (spoiler?.enabled) {
    const { description, buttonContent } = spoiler;
    newSpoiler = { description, buttonText: buttonContent };
  }
  data.containerData = {
    alignment: alignment && kebabToConstantCase(alignment),
    spoiler: newSpoiler,
  };
  typeof height === 'number' && (data.containerData.height = { custom: height });
  typeof width === 'number'
    ? (data.containerData.width = { custom: width })
    : size && (data.containerData.width = { size: kebabToConstantCase(size) });
};

const convertVideoData = (data: {
  src: VideoComponentData;
  metadata?: { thumbnail_url?: string; width?: number; height?: number };
  video;
  thumbnail;
}) => {
  data.video = { src: { custom: data.src.pathname } };
  data.thumbnail = {
    src: { custom: data.src.thumbnail.pathname },
    width: data.src.thumbnail.width,
    height: data.src.thumbnail.height,
  };
};

const convertVideoEmbed = (data: {
  src?: string | VideoComponentData;
  metadata?;
  video;
  thumbnailUrl;
  videoUrl;
  providerName;
  type;
  title;
  html;
  thumbnailHeight;
  thumbnailWidth;
  height;
  width;
}) => {
  data.width = data.metadata?.width;
  data.height = data.metadata?.height;
  data.thumbnailUrl = data.metadata?.thumbnail_url;
  data.thumbnailWidth = data.metadata?.thumbnail_width;
  data.thumbnailHeight = data.metadata?.thumbnail_height;
  data.title = data.metadata?.title;
  data.html = data.metadata?.html;
  data.type = data.metadata?.type;
  data.providerName = data.metadata?.provider_name;
  data.videoUrl = data.metadata?.video_url;
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
  data.containerData = { width: { size: PluginContainerData_Width_Type.CONTENT } };
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

const convertVerticalEmbedData = (data: {
  type;
  selectedProduct;
  thumbnailUrl;
  title;
  src;
  providerName;
  html;
}) => {
  data.thumbnailUrl = data.selectedProduct.imageSrc;
  data.title = data.selectedProduct.name;
  data.src = data.selectedProduct.id;
  data.providerName = 'wix';
  data.html = data.selectedProduct.html;
};

const convertLinkPreviewData = (data: {
  thumbnail_url?: string;
  config?: { link };
  thumbnailUrl;
  link;
  type;
}) => {
  has(data, 'thumbnail_url') && (data.thumbnailUrl = data.thumbnail_url);
  data.config?.link && (data.link = convertLink(data.config.link));
};

const convertSocialEmbed = (data: { type; thumbnailUrl; thumbnail_url; src; config }) => {
  data.type = 'rich';
  const url = data.config?.link?.url;
  url && (data.src = url);
  data.thumbnailUrl = data.thumbnail_url;
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
      rel,
      target,
    });
  }
};

const convertHTMLData = data => {
  const { src, srcType } = data;
  data[srcType] = src;
};

const convertMapData = data => {
  const {
    isDraggingAllowed,
    isMarkerShown,
    isStreetViewControlShown,
    isZoomControlShown,
    locationDisplayName,
    isViewControlShown,
    zoom,
    mode,
  } = data.mapSettings;
  data.mapSettings.draggable = isDraggingAllowed;
  data.mapSettings.marker = isMarkerShown;
  data.mapSettings.streetViewControl = isStreetViewControlShown;
  data.mapSettings.zoomControl = isZoomControlShown;
  data.mapSettings.locationName = locationDisplayName;
  data.mapSettings.initialZoom = zoom;
  data.mapSettings.mapType = mode;

  if (has(data.mapSettings, 'isViewControlShown')) {
    data.mapSettings.viewModeControl = isViewControlShown;
  }
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
