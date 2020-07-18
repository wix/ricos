const toGalleryItems = items =>
  items.map((item, index) => ({
    itemId: item.id || 'item-' + index,
    url: item.url,
    ...getItemByType(item),
  }));

const getItemByType = item =>
  item.type === 'image/gif'
    ? gifItem(item)
    : item.type === 'video'
    ? videoItem(item)
    : imageItem(item);

const gifItem = item => ({
  metadata: {
    type: 'video',
    videoUrl: item.mp4,
    videoId: item.url,
    source: 'giphy',
    width: item.width || 600,
    height: item.height || 480,
  },
});

const videoItem = item => ({
  metadata: {
    type: 'video',
    videoUrl: item.mp4,
    videoId: item.url,
    width: item.width || 600,
    height: item.height || 480,
  },
});

const imageItem = item => ({
  itemId: item.id || item.url,
  metadata: {
    width: item.width,
    height: item.height,
  },
});

const isImage = type => type.includes('image');

export { toGalleryItems, isImage };
