const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';
const accordionType = 'wix-rich-content-plugin-accordion';
const tableType = 'table';
const atomicType = 'atomic';

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
          entityData.data?.src &&
            !entityData.data?.config.disableExpand &&
            tableImages.push(imageEntryToGallery(entityData.data, index));
        });
    });
  });
  return tableImages;
}

function getAccordionImages(entry, index) {
  const accordionImages = [];
  entry.data.pairs.forEach(pair => {
    Object.entries(pair.content.entityMap).forEach(([, block]) => {
      if (block.type === imageType) {
        block.data?.src &&
          !block.data?.config.disableExpand &&
          accordionImages.push(imageEntryToGallery(block.data, index));
      }
    });
  });

  return accordionImages;
}

function convertEntryToGalleryItems(entry, index) {
  const { disableExpand } = entry?.data.config;
  switch (entry.type) {
    case imageType:
    case imageTypeLegacy:
      return entry.data.src && !disableExpand ? [imageEntryToGallery(entry.data, index)] : [];
    case galleryType: {
      return !disableExpand && entry.data.items;
    }
    case tableType: {
      return getTableImages(entry, index);
    }
    case accordionType: {
      return getAccordionImages(entry, index);
    }
    default:
      return [];
  }
}
const getAtomicBlocksKeysMapper = blocks => {
  const keysMapper = {};
  blocks.forEach(block => {
    if (block.type === atomicType) {
      const entityIndex = block.entityRanges[0].key;
      keysMapper[entityIndex] = block.key;
    }
  });
  return keysMapper;
};

const getImagesKeys = (entityMap, innerRceIndexes, keysMapper, currentInnerRceIndex) => {
  const imagesKeys = {};
  Object.entries(entityMap).forEach(([, block], j) => {
    if (block.type === imageType && !block.data.config.disableExpand) {
      const imageKey = innerRceIndexes[currentInnerRceIndex];
      imagesKeys[imageKey] = [...imagesKeys[imageKey], ...keysMapper[j]];
    }
  });
  return imagesKeys;
};

const getBlocksByType = (type, entityMap) =>
  Object.values(entityMap).filter(block => block.type === type);

const getBlocksIndexes = (blocks, entityMap) =>
  blocks.map(block => Object.values(entityMap).indexOf(block));

const addInnerRceKeysToKeysMap = (keys, keysMap, imageIndex) => {
  keys.forEach(key => key && (keysMap[key] = imageIndex));
};

export default function getImagesData(data) {
  const blockKeys = data.blocks.filter(block => block.type === atomicType);

  const accordionBlocks = getBlocksByType(accordionType, data.entityMap);
  const accordionIndexes = getBlocksIndexes(accordionBlocks, data.entityMap);
  let accordionImagesKeys = {};
  accordionBlocks.forEach((block, i) => {
    block.data?.pairs.forEach(pair => {
      const keysMapper = getAtomicBlocksKeysMapper(pair.content.blocks);
      accordionImagesKeys = {
        ...accordionImagesKeys,
        ...getImagesKeys(pair.content.entityMap, accordionIndexes, keysMapper, i),
      };
    });
  });

  const tableBlocks = getBlocksByType(tableType, data.entityMap);
  const tableIndexes = getBlocksIndexes(tableBlocks, data.entityMap);
  let tableImagesKeys = {};
  tableBlocks.forEach((block, i) => {
    Object.entries(block.data?.config.rows).forEach(([, row]) => {
      Object.entries(row.columns).forEach(([, column]) => {
        const keysMapper = getAtomicBlocksKeysMapper(column.content.blocks);
        tableImagesKeys = {
          ...tableImagesKeys,
          ...getImagesKeys(column.content.entityMap, tableIndexes, keysMapper, i),
        };
      });
    });
  });

  let sum = 0;
  const imageMap = {};
  const images = Object.values(data.entityMap)
    .map(convertEntryToGalleryItems)
    .reduce((urls, entryUrls, i) => {
      const isAccordionIndex = accordionIndexes.length && accordionIndexes.indexOf(i) !== -1;
      const isTableIndex = tableIndexes.length && tableIndexes.indexOf(i) !== -1;

      if (entryUrls.length > 0) {
        if (isAccordionIndex) {
          addInnerRceKeysToKeysMap(accordionImagesKeys[i], imageMap, sum++);
        } else if (isTableIndex) {
          addInnerRceKeysToKeysMap(tableImagesKeys[i], imageMap, sum++);
        } else {
          const blockKey = blockKeys[i].key;
          imageMap[blockKey] = sum;
          sum += entryUrls.length;
        }
      }
      return urls.concat(entryUrls);
    }, []);
  return { images, imageMap };
}
