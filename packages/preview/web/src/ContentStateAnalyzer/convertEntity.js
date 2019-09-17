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
 * { width, height, url, type: 'image' }
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

const converters = {
  'wix-draft-plugin-image': entity => imageConverter(entity),
  'wix-draft-plugin-gallery': entity => galleryConverter(entity),
  'wix-draft-plugin-divider': defaultEntitiyConverter,
  'wix-draft-plugin-file-upload': defaultEntitiyConverter,
  'wix-draft-plugin-map': defaultEntitiyConverter,
  mention: defaultEntitiyConverter,
  // TODO: video, sound-cloud, giphy
  'wix-draft-plugin-video': defaultEntitiyConverter,
  'wix-draft-plugin-sound-cloud': defaultEntitiyConverter,
  'wix-draft-plugin-giphy': defaultEntitiyConverter,
  LINK: defaultEntitiyConverter,
};

const convertEntity = entity => converters[entity.type](entity);

export default convertEntity;
