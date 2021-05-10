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

const video = item => {
  const {
    isCustom,
    thumbnail: { pathname: thmbUrl, width: thmbWidth, height: thmbHeight },
    thumbnail_url,
    thumbnail_width,
    thumbnail_height,
  } = item;
  const { width = 600, height = 480 } = isCustom ? item.url : item;
  const url = isCustom ? item.url.pathname : item.url;
  return {
    url,
    mediaUrl: url,
    metadata: {
      type: 'video',
      poster: {
        url: thmbUrl || thumbnail_url || item.url,
        width: thmbWidth || thumbnail_width,
        height: thmbHeight || thumbnail_height,
      },
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
