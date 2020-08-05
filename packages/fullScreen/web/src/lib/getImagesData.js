const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';

function imageEntryToGallery(data, index) {
  const url = data.file_name;
  return {
    metadata: {
      height: data.height,
      width: data.width,
    },
    itemId: data.id || url + index,
    url,
  };
}

function convertEntryToGalleryItems(entry, index) {
  switch (entry.type) {
    case imageType:
    case imageTypeLegacy:
      return entry.data.src ? [imageEntryToGallery(entry.data.src, index)] : [];
    case galleryType:
      return entry.data.items;
    default:
      return [];
  }
}

export default function getImagesData({ entityMap }) {
  let sum = 0;
  const imageMap = {};
  const combinedEntityMaps = combineEntityMapsWithInnerRCE(entityMap);
  const images = Object.values(combinedEntityMaps)
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

function combineEntityMapsWithInnerRCE(entityMap) {
  const innerEntityMapsObject = {};
  Object.values(entityMap).forEach(entity => {
    if (entity.type === 'table') {
      const innerEntityMapsArray = getInnerRCEEntityMapsAsArray(entity);
      innerEntityMapsArray.forEach(innerEntity => {
        mergeObjectsWithIndexes(innerEntityMapsObject, innerEntity);
      });
    } else {
      mergeObjectsWithIndexes(innerEntityMapsObject, { 0: entity });
    }
  });
  return innerEntityMapsObject;
}

function mergeObjectsWithIndexes(target, source) {
  for (let [key, value] of Object.entries(source)) {
    while (target[key]) {
      key = `${parseInt(key) + 1}`;
    }
    target[key] = value;
  }
}

function getInnerRCEEntityMapsAsArray(object) {
  let result = [];
  if (object instanceof Array) {
    Array.prototype.forEach.call(object, arrayElement => {
      const innerBlocks = getInnerRCEEntityMapsAsArray(arrayElement);
      if (innerBlocks) {
        result = [...result, ...innerBlocks];
      }
    });
  } else {
    for (const [key, value] of Object.entries(object)) {
      if (key === 'entityMap') {
        return value;
      }
      if (value instanceof Object || value instanceof Array) {
        const innerBlocks = getInnerRCEEntityMapsAsArray(value);
        if (innerBlocks) {
          result = [...result, ...innerBlocks];
        }
      }
    }
  }
  return result;
}
