const toGalleryItems = items =>
  items.map((item, index) => ({
    itemId: item.id || 'item-' + index,
    url: item.url,
    ...getItemByType(item),
  }));

const getItemByType = item => {
  switch (item.type) {
    case 'giphy':
      return giphyItem(item);
    case 'video':
      return videoItem(item);
    default:
      return imageItem(item);
  }
};

const giphyItem = item => ({
  metadata: {
    type: 'video',
    videoUrl: item.mp4,
    videoId: item.url,
    source: 'giphy',
    width: item.width || 600,
    height: item.height || 480,
  },
});

const videoItem = item => {
  const { isCustom } = item;
  const { width = 600, height = 480 } = isCustom ? item.url : item;
  const url = isCustom ? item.url.pathname : item.url;
  return {
    url,
    metadata: {
      type: 'video',
      videoId: url,
      width,
      height,
    },
  };
};

const imageItem = item => ({
  itemId: item.id || item.url,
  metadata: {
    width: item.width,
    height: item.height,
  },
});

export { toGalleryItems };
