/* eslint-disable fp/no-delete */
import {
  Node,
  Node_Type,
  Decoration_Type,
  Link,
  ImageData,
  Decoration,
  PluginContainerData,
  VideoData,
  DividerData,
  MentionData,
  FileData,
  ButtonData,
} from 'ricos-schema';
import { cloneDeep, has } from 'lodash';
import {
  ENTITY_DECORATION_TO_DATA_FIELD,
  FROM_RICOS_DECORATION_TYPE,
  FROM_RICOS_ENTITY_TYPE,
  TO_RICOS_DATA_FIELD,
} from '../consts';
import { ComponentData, FileComponentData } from '../../../types';

export const convertNodeToDraftData = (node: Node) => {
  const { type } = node;
  const draftPluginType = FROM_RICOS_ENTITY_TYPE[type];
  const dataFieldName = TO_RICOS_DATA_FIELD[draftPluginType];
  return convertNodeDataToDraft(type, node[dataFieldName]);
};

export const convertDecorationToDraftData = (decoration: Decoration) => {
  const { type } = decoration;
  const dataFieldName = ENTITY_DECORATION_TO_DATA_FIELD[FROM_RICOS_DECORATION_TYPE[type]];
  return convertDecorationDataToDraft(type, decoration[dataFieldName]);
};

export const convertNodeDataToDraft = (nodeType: Node_Type, data) => {
  const newData = cloneDeep(data);
  const converters = {
    [Node_Type.VIDEO]: convertVideoData,
    [Node_Type.DIVIDER]: convertDividerData,
    [Node_Type.FILE]: convertFileData,
    [Node_Type.IMAGE]: convertImageData,
    [Node_Type.POLL]: convertPollData,
    [Node_Type.VERTICAL_EMBED]: convertVerticalEmbedData,
    [Node_Type.LINK_PREVIEW]: convertLinkPreviewData,
    [Node_Type.BUTTON]: convertButtonData,
    [Node_Type.HTML]: convertHTMLData,
    [Node_Type.MAP]: convertMapData,
  };
  if (newData.containerData && nodeType !== Node_Type.DIVIDER) {
    convertContainerData(newData, nodeType);
  }
  if (nodeType in converters) {
    const convert = converters[nodeType];
    convert(newData);
  }
  return JSON.parse(JSON.stringify(newData));
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

const convertContainerData = (
  data: { containerData?: PluginContainerData; config },
  nodeType: string
) => {
  const { width, alignment, spoiler, height } = data.containerData || {};
  data.config = Object.assign(
    {},
    data.config,
    width?.size && { size: constantToKebabCase(width.size) },
    width?.custom && { width: parseInt(width.custom) },
    height?.custom && { height: parseInt(height.custom) },
    alignment && { alignment: constantToKebabCase(alignment) },
    spoiler && {
      spoiler: {
        enabled: true,
        description: spoiler.description,
        buttonContent: spoiler.buttonText,
      },
    }
  );
  if (nodeType === Node_Type.IMAGE && width?.custom) {
    data.config.size = 'inline';
  } else if ((nodeType === Node_Type.MAP || nodeType === Node_Type.LINK_PREVIEW) && width?.custom) {
    data.config.size = 'content';
  }
  delete data.containerData;
};

const convertVideoData = (data: VideoData & { src; metadata }) => {
  const videoSrc = data.video?.src;
  if (videoSrc?.url) {
    data.src = videoSrc.url;
    const { src, width, height } = data.thumbnail || {};
    data.metadata = { thumbnail_url: src?.url, width, height };
  } else if (videoSrc?.custom) {
    const { src, width, height } = data.thumbnail || {};
    data.src = {
      pathname: videoSrc.custom,
      thumbnail: { pathname: src?.custom, width, height },
    };
  }
  delete data.video;
  delete data.thumbnail;
};

const convertDividerData = (
  data: Partial<DividerData> & {
    type;
    config?: ComponentData['config'];
  }
) => {
  has(data, 'type') && (data.type = data.type.toLowerCase());
  data.config = { textWrap: 'nowrap' };
  if (has(data, 'width')) {
    data.config.size = data.width?.toLowerCase();
    delete data.width;
  }
  if (has(data, 'alignment')) {
    data.config.alignment = data.alignment?.toLowerCase();
    delete data.alignment;
  }
  delete data.containerData;
};

const convertImageData = (data: ImageData & { src; config; metadata }) => {
  const { link, config, disableExpand, image, altText, caption } = data;
  const { src, width, height } = image || {};
  data.src = { id: src?.custom, file_name: src?.custom, width, height };
  const links = link?.anchor ? { anchor: link?.anchor } : { link: link && convertLink(link) };
  data.config = { ...(config || {}), ...links, disableExpand };
  data.metadata = (altText || caption) && { caption, alt: altText };
  delete data.disableExpand;
  delete data.image;
  delete data.link;
  delete data.caption;
  delete data.altText;
};

const convertPollData = data => {
  has(data, 'layout.poll.type') && (data.layout.poll.type = data.layout.poll.type.toLowerCase());
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = data.layout.poll.direction.toLowerCase());
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = data.design.poll.backgroundType.toLowerCase());
};

const convertVerticalEmbedData = data => {
  has(data, 'type') && (data.type = data.type.toLowerCase());
};

const convertLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'link')) {
    data.config.link = convertLink(data.link);
    delete data.link;
  }
};

const convertMention = (data: Partial<MentionData> & { mention }) => {
  data.mention = { slug: data.slug, name: data.name };
  delete data.name;
  delete data.slug;
};

const convertFileData = (data: FileData & FileComponentData) => {
  const { url, custom } = data.src || {};
  data.url = url;
  data.id = custom;
  delete data.src;
};

const convertButtonData = (data: Partial<ButtonData> & { button }) => {
  const { link, text, styles } = data;
  const { borderRadius, borderWidth, backgroundColor, textColor, borderColor } = styles || {};
  const convertedLink = link ? convertLink(link) : {};
  data.button = {
    settings: {
      buttonText: text,
      ...convertedLink,
    },
    design: {
      borderRadius,
      borderWidth,
      background: backgroundColor,
      color: textColor,
      borderColor,
    },
  };
  delete data.link;
  delete data.text;
  delete data.type;
  delete data.styles;
};

const convertHTMLData = data => {
  const { html, url, config = {} } = data;
  const srcType = html ? 'html' : 'url';
  data.srcType = srcType;
  data.src = html || url;
  delete data[srcType];
  config.size && delete data.config.size;
};

const convertMapData = data => {
  const {
    draggable,
    marker,
    streetViewControl,
    zoomControl,
    locationName,
    viewModeControl,
    initialZoom,
    mapType,
  } = data.mapSettings;
  data.mapSettings.isDraggingAllowed = draggable;
  data.mapSettings.isMarkerShown = marker;
  data.mapSettings.isStreetViewControlShown = streetViewControl;
  data.mapSettings.isZoomControlShown = zoomControl;
  data.mapSettings.locationDisplayName = locationName;
  data.mapSettings.zoom = initialZoom;
  data.mapSettings.mode = mapType;
  delete data.mapSettings.draggable;
  delete data.mapSettings.marker;
  delete data.mapSettings.streetViewControl;
  delete data.mapSettings.zoomControl;
  delete data.mapSettings.locationName;
  delete data.mapSettings.initialZoom;
  delete data.mapSettings.mapType;

  if (viewModeControl) {
    data.mapSettings.isViewControlShown = viewModeControl;
    delete data.mapSettings.viewModeControl;
  }
};

const convertLink = ({
  url,
  rel,
  target,
  anchor,
}: Link): {
  url?: string;
  rel?: string;
  target?: string;
  anchor?: string;
} => ({
  anchor,
  url,
  rel:
    rel &&
    Object.entries(rel)
      .flatMap(([key, value]) => (value ? key : []))
      .join(' '),
  target: target && '_' + target.toLowerCase(),
});

const constantToKebabCase = (str: string) => str.toLowerCase().replace('_', '-');
