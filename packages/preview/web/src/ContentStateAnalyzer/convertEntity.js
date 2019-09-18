/*
 *  The converter functions convert different plugin entities to a common structure objects, accordingly to media type.
 *  every converter function signature:
 *  entity => [ { type, ...specificMediaData } ]
 * */
const defaultEntitiyConverter = () => [];

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
const imageConverter = entity => [
  {
    width: entity.data.src.width,
    height: entity.data.src.height,
    url: entity.data.src.file_name,
    type: 'image',
  },
];

const galleryConverter = entity =>
  entity.data.items.map(({ metadata, url }) => ({
    url,
    height: metadata.height,
    width: metadata.width,
    type: 'image',
  }));

const giphyConverter = entity => [
  {
    type: 'image',
    url: entity.data.gif.originalUrl,
    thumbnail: entity.data.gif.stillUrl,
    width: entity.data.gif.width,
    height: entity.data.gif.height,
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

const videoConverter = entity => [
  {
    type: 'video',
    url: entity.data.src,
  },
];

const fileConverter = entity => [
  {
    name: entity.data.name,
    type: 'file',
    fileType: entity.data.type,
    url: entity.data.url,
  },
];

const mapConverter = entity => [
  {
    type: 'map',
    mapSettings: entity.data.mapSettings,
  },
];

const converters = {
  'wix-draft-plugin-image': imageConverter,
  'wix-draft-plugin-gallery': galleryConverter,
  'wix-draft-plugin-divider': defaultEntitiyConverter,
  'wix-draft-plugin-video': videoConverter,
  'wix-draft-plugin-sound-cloud': videoConverter,
  'wix-draft-plugin-giphy': giphyConverter,
  'wix-draft-plugin-file-upload': fileConverter,
  'wix-draft-plugin-map': mapConverter,
  mention: defaultEntitiyConverter,
  LINK: defaultEntitiyConverter,
};

const convertEntity = entity => converters[entity.type](entity);

export default convertEntity;
