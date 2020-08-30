const giphy = item => ({
  mediaUrl: item.mp4,
  metadata: {
    type: 'video',
    videoUrl: item.mp4,
    videoId: item.url,
    poster: item.url,
    source: 'giphy',
    width: item.width || 600,
    height: item.height || 480,
  },
});

const video = item => {
  const { isCustom } = item;
  const { width = 600, height = 480 } = isCustom ? item.url : item;
  const url = isCustom ? item.url.pathname : item.url;
  return {
    url,
    mediaUrl: url,
    metadata: {
      type: 'video',
      poster: item.url,
      videoId: url,
      width,
      height,
    },
  };
};

const image = item => ({
  itemId: item.id || item.url,
  metadata: {
    width: item.width,
    height: item.height,
  },
});

const galleryTypeConverters = {
  giphy,
  video,
  image,
};

const toGalleryItems = items =>
  items.map((item, index) => ({
    itemId: item.id || 'item-' + index,
    url: item.url,
    ...galleryTypeConverters[item.type](item),
    isGalleryItem: true,
  }));

export { toGalleryItems };
