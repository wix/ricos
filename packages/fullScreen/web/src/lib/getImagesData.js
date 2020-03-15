const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';

function imageEntryToGallery(data) {
  return {
    metadata: {
      height: data.height,
      width: data.width,
    },
    itemId: data.id,
    url: data.file_name,
  };
}

function convertEntryToGalleryItems(entry) {
  switch (entry.type) {
    case imageType:
    case imageTypeLegacy:
      return entry.data.src ? [imageEntryToGallery(entry.data.src)] : [];
    case galleryType:
      return entry.data.items;
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
