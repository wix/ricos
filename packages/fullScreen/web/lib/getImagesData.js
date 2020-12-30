const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';
const tableType = 'table';

function imageEntryToGallery(data, index) {
  const src = data.src;
  const url = src.file_name;
  const metadata = data.metadata;
  return {
    metadata: {
      height: src.height,
      width: src.width,
      title: (metadata && metadata.caption) || '',
      altText: (metadata && metadata.alt) || '',
    },
    itemId: src.id || url + index,
    url,
  };
}

function getTableImages(entry, index) {
  const tableImages = [];
  const { rows } = entry.data.config;
  Object.entries(rows).forEach(([, row]) => {
    Object.entries(row.columns).forEach(([, column]) => {
      const entityMap = column.content.entityMap;
      entityMap &&
        Object.entries(entityMap).forEach(([, entityData]) => {
          entityData.data?.src && tableImages.push(imageEntryToGallery(entityData.data, index));
        });
    });
  });
  return tableImages;
}

function convertEntryToGalleryItems(entry, index) {
  switch (entry.type) {
    case imageType:
    case imageTypeLegacy:
      return entry.data.src ? [imageEntryToGallery(entry.data, index)] : [];
    case galleryType: {
      return entry.data.items;
    }
    case tableType: {
      return getTableImages(entry);
    }
    default:
      return [];
  }
}

export default function getImagesData({ entityMap }) {
  let sum = 0;
  const imageMap = {};
  const images = Object.values(entityMap)
    .map(convertEntryToGalleryItems)
    .reduce((urls, entryUrls, i) => {
      if (entryUrls.length > 0) {
        imageMap[i] = sum;
      }
      sum += entryUrls.length;
      return urls.concat(entryUrls);
    }, []);
  return { images, imageMap };
}
