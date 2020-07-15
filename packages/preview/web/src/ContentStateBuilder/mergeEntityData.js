const defaultMerger = (mediaInfo, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    ...mediaInfo,
  },
});

const imageMerger = ({ url, width, height, metadata, link, source = null }, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    config: {
      ...entity.data.config,
      link,
    },
    metadata,
    src: {
      width,
      height,
      ...(source === 'static' ? { url, source } : { file_name: url }), // eslint-disable-line
    },
  },
});

const galleryMerger = (items, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    items: items.map((item, index) =>
      item.type === 'image/gif' || item.type === 'video'
        ? {
            itemId: item.id || 'video-' + index,
            url: item.url,
            metadata: {
              type: 'video',
              videoUrl: item.mp4,
              videoId: item.url,
              source: item.type.includes('gif') && 'giphy',
              width: item.width || 600,
              height: item.height || 480,
            },
          }
        : {
            metadata: {
              width: item.width,
              height: item.height,
            },
            url: item.url,
            itemId: item.id || item.url,
          }
    ),
  },
});

const videoMerger = ({ url, isCustom }, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    src: url,
    isCustomVideo: !!isCustom,
  },
});

const giphyMerger = ({ width, height, url, thumbnail }, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    gif: {
      width,
      height,
      originalUrl: url,
      stillUrl: thumbnail,
    },
  },
});

const fileMerger = ({ fileType, name, url }, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    type: fileType,
    name,
    url,
  },
});

const mapMerger = (mapSettings, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    mapSettings,
  },
});

const linkPreviewMerger = ({ url }, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    config: {
      ...entity.data.config,
      link: {
        ...entity.data.config.link,
        url,
      },
    },
  },
});

const mergers = {
  'wix-draft-plugin-image': imageMerger,
  'wix-draft-plugin-gallery': galleryMerger,
  'wix-draft-plugin-giphy': giphyMerger,
  'wix-draft-plugin-video': videoMerger,
  'wix-draft-plugin-sound-cloud': videoMerger,
  'wix-draft-plugin-file-upload': fileMerger,
  'wix-draft-plugin-map': mapMerger,
  'wix-draft-plugin-divider': defaultMerger,
  mention: defaultMerger,
  LINK: defaultMerger,
  'wix-draft-plugin-link-preview': linkPreviewMerger,
  'wix-draft-plugin-headers-markdown': defaultMerger,
  'wix-draft-plugin-link-button': defaultMerger,
  'wix-draft-plugin-action-button': defaultMerger,
  'wix-draft-plugin-poll': defaultMerger, //TODO: make custom merger
  'wix-draft-plugin-html': defaultMerger,
};

export default (mediaInfo, entity) => mergers[entity.type](mediaInfo, entity);
