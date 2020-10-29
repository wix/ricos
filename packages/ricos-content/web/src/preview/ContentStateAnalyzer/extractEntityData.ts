import { RicosEntity } from '../../types/contentTypes';
import { PreviewEntityData } from '../types';
/*
 *  The converter functions convert different plugin entities to a common structure objects, accordingly to media type.
 *  every converter function signature:
 *  (entity: RicosEntity): PreviewEntity[] => [ { type, ...specificMediaData } ]
 * */

type PluginConverter = (entity: RicosEntity) => PreviewEntityData[];

const defaultEntityConverter: PluginConverter = () => [];

const imageConverter: PluginConverter = entity => [
  {
    width: entity.data.src.width,
    height: entity.data.src.height,
    url: entity.data.src.file_name,
    type: 'image',
    metadata: entity.data.metadata,
    link: entity.data.config.link,
  },
];

const galleryConverter: PluginConverter = entity =>
  entity.data.items.map(({ metadata, url, itemId }) => ({
    url,
    height: metadata.height,
    width: metadata.width,
    id: itemId,
    type: 'image',
    isGalleryItem: true,
  }));

const giphyConverter: PluginConverter = entity => [
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

const videoConverter: PluginConverter = entity => [
  {
    type: 'video',
    url: entity.data.src,
    isCustom: entity.data.isCustomVideo,
  },
];

const fileConverter: PluginConverter = entity => [
  {
    name: entity.data.name,
    type: 'file',
    fileType: entity.data.type,
    url: entity.data.url,
  },
];

const mapConverter: PluginConverter = entity => [
  {
    type: 'map',
    mapSettings: entity.data.mapSettings,
  },
];

const linkConverter: PluginConverter = entity => [
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

const extractEntityData: PluginConverter = entity =>
  converters[entity.type] ? converters[entity.type](entity) : defaultEntityConverter(entity);

export default extractEntityData;
