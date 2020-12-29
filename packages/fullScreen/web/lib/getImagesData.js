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
  let tableImages = [];
  // eslint-disable-next-line fp/no-loops
  for (const [, row] of Object.entries(entry.data.config.rows)) {
    // eslint-disable-next-line fp/no-loops
    for (const [, column] of Object.entries(row.columns)) {
      const entity = Object.entries(column.content.entityMap);
      const entryData = entity.length ? entity[0][1].data : null;
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!entryData?.src) {
        tableImages = [...tableImages, ...imageEntryToGallery(entryData, index)];
      }
    }
  }
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
