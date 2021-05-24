const giphy = item => {
  const { width = 600, height = 480 } = item;
  return {
    mediaUrl: item.mp4,
    metadata: {
      type: 'video',
      videoUrl: item.mp4,
      videoId: item.url,
      poster: {
        url: item.url,
        width,
        height,
      },
      source: 'giphy',
      width,
      height,
    },
  };
};

const getPoster = item => {
  const url =
    item.url.thumbnail?.pathname ||
    item.thumbnail?.pathname ||
    item.thumbnail_url ||
    item.thumbnail;
  const width =
    item.url.thumbnail?.width || item.thumbnail?.width || item.thumbnail_width || item.width;
  const height =
    item.url.thumbnail?.height || item.thumbnail?.height || item.thumbnail_height || item.height;
  return { url, width, height };
};

const video = item => {
  const { isCustom } = item;
  const { width = 600, height = 480 } = isCustom ? item.url : item;
  const url = isCustom ? item.url?.pathname : item.url;
  return {
    url,
    mediaUrl: url,
    metadata: {
      type: 'video',
      poster: getPoster(item),
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
  }));

export { toGalleryItems };
