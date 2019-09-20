const defaultMerger = (mediaInfo, entity) => ({ ...mediaInfo, ...entity });

const imageMerger = ({ url, width, height }, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    src: {
      width,
      height,
      file_name: url,
    },
  },
});

const galleryMerger = (items, entity) => ({
  ...entity,
  data: {
    ...entity.data,
    items: items.map(item => ({
      metadata: {
        width: item.width,
        height: item.height,
      },
      url: item.url,
    })),
  },
});

const mergers = {
  'wix-draft-plugin-image': imageMerger,
  'wix-draft-plugin-gallery': galleryMerger,
  'wix-draft-plugin-giphy': defaultMerger,
  'wix-draft-plugin-video': defaultMerger,
  'wix-draft-plugin-sound-cloud': defaultMerger,
  'wix-draft-plugin-file-upload': defaultMerger,
  'wix-draft-plugin-map': defaultMerger,
  'wix-draft-plugin-divider': defaultMerger,
  mention: defaultMerger,
  LINK: defaultMerger,
};

export default (mediaInfo, entity) => mergers[entity.type](mediaInfo, entity);
