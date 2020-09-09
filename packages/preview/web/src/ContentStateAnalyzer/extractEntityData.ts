import { RicosEntity } from 'wix-rich-content-common';
import { PreviewEntityData } from '../types';
/*
 *  The converter functions convert different plugin entities to a common structure objects, accordingly to media type.
 *  every converter function signature:
 *  (entity: RicosEntity): PreviewEntity[] => [ { type, ...specificMediaData } ]
 * */

const defaultEntityConverter = (): PreviewEntityData[] => [];

/*
 * wix-draft-plugin-image data format:
 *
 * {
 *  src: { width, height, file_name },
 * }
 *
 *
 * wix-draft-plugin-gallery image data format:
 *
 * {
 *  items: [
 *    { metadata: { height, width }, url },
 *  ]
 * }
 *
 *
 * common representation:
 *
 * { width, height, url, type: 'image', thumbnail? }
 * */

const imageConverter = (entity: RicosEntity): PreviewEntityData[] => [
  {
    width: entity.data.src.width,
    height: entity.data.src.height,
    url: entity.data.src.file_name,
    type: 'image',
    metadata: entity.data.metadata,
    link: entity.data.config.link,
  },
];

const galleryConverter = (entity: RicosEntity): PreviewEntityData[] =>
  entity.data.items.map(({ metadata, url, itemId }) => ({
    url,
    height: metadata.height,
    width: metadata.width,
    id: itemId,
    type: 'image',
    isGalleryItem: true,
  }));

const giphyConverter = (entity: RicosEntity): PreviewEntityData[] => [
  {
    type: 'giphy',
    url: entity.data.gif.originalUrl,
    mp4: entity.data.gif.downsizedSmallMp4,
    thumbnail: entity.data.gif.stillUrl,
    width: entity.data.gif.width,
    height: entity.data.gif.height,
    source: 'static',
  },
];

/*
 * wix-draft-plugin-video, wix-draft-plugin-sound-cloud data format:
 * { src: 'url_string' }
 *
 * common representation:
 *
 * { url, type: 'video', thumbnail? }
 *
 */

const videoConverter = (entity: RicosEntity): PreviewEntityData[] => [
  {
    type: 'video',
    url: entity.data.src,
    isCustom: entity.data.isCustomVideo,
  },
];

const fileConverter = (entity: RicosEntity): PreviewEntityData[] => [
  {
    name: entity.data.name,
    type: 'file',
    fileType: entity.data.type,
    url: entity.data.url,
  },
];

const mapConverter = (entity: RicosEntity): PreviewEntityData[] => [
  {
    type: 'map',
    mapSettings: entity.data.mapSettings,
  },
];

const linkConverter = (entity: RicosEntity): PreviewEntityData[] => [
  {
    type: 'link',
    url: entity.data.url,
  },
];

const converters = {
  'wix-draft-plugin-image': imageConverter,
  'wix-draft-plugin-gallery': galleryConverter,
  'wix-draft-plugin-divider': defaultEntityConverter,
  'wix-draft-plugin-video': videoConverter,
  'wix-draft-plugin-sound-cloud': videoConverter,
  'wix-draft-plugin-giphy': giphyConverter,
  'wix-draft-plugin-file-upload': fileConverter,
  'wix-draft-plugin-map': mapConverter,
  mention: defaultEntityConverter,
  'wix-draft-plugin-headers-markdown': defaultEntityConverter,
  'wix-draft-plugin-link-button': defaultEntityConverter,
  'wix-draft-plugin-action-button': defaultEntityConverter,
  'wix-draft-plugin-poll': defaultEntityConverter, //TODO: make custom converter
  LINK: linkConverter,
  LINK_PREVIEW: linkConverter,
  'wix-draft-plugin-html': defaultEntityConverter,
};

const extractEntityData = (entity: RicosEntity): PreviewEntityData[] =>
  converters[entity.type] ? converters[entity.type](entity) : defaultEntityConverter();

export default extractEntityData;
