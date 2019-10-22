import { getImageSrc } from 'wix-rich-content-common';

const imageType = 'wix-draft-plugin-image';
const galleryType = 'wix-draft-plugin-gallery';

// eslint-disable-next-line camelcase
function getUrl({ file_name, width, height }) {
  const { width: screenWidth, height: screenHeight } = window.screen;
  return getImageSrc(
    // eslint-disable-next-line camelcase
    { file_name, width, height },
    {},
    {
      requiredWidth: screenWidth - 200,
      requiredHeight: screenHeight - 200,
      requiredQuality: 90,
      imageType: 'highRes',
    }
  );
}

function imageEntryToUrl(entry) {
  if (!entry.data.src) {
    return '';
  }
  return getUrl(entry.data.src);
}

function galleryEntryToUrls(entry) {
  return entry.data.items.map(convertGalleryItemToImage).map(getUrl);
}

function convertGalleryItemToImage(item) {
  return {
    // eslint-disable-next-line camelcase
    file_name: item.url,
    width: item.metadata.width,
    height: item.metadata.height,
  };
}

function convertEntryToUrls(entry) {
  switch (entry.type) {
    case imageType:
      return [imageEntryToUrl(entry)];
    case galleryType:
      return galleryEntryToUrls(entry);
    default:
      return [];
  }
}

function isSupportedEntityType(type) {
  return type === imageType || type === galleryType;
}

export default function getImagesData({ entityMap }) {
  let sum = 0;
  const imageMap = {};
  const images = Object.values(entityMap)
    .filter(entry => isSupportedEntityType(entry.type))
    .map(convertEntryToUrls)
    .reduce((urls, entryUrls, i) => {
      imageMap[i] = sum;
      sum += entryUrls.length;
      return urls.concat(entryUrls);
    }, [])
    .map(src => ({ src }));
  return { images, imageMap };
}
