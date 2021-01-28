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

const blockToImagesKeys = {
  [imageType]: (entity, blockKey) => {
    if (!entity.data.config.disableExpand) return { [blockKey]: calcNumberOfImages(entity) };
  },
  [tableType]: entity => {
    const tableKeys = {};
    Object.entries(entity.data?.config.rows).forEach(([, row]) => {
      Object.entries(row.columns).forEach(([, column]) => {
        const keysMapper = getAtomicBlocksKeysMapper(column.content.blocks);
        Object.entries(column.content.entityMap).forEach(([, block], j) => {
          if (block.type === imageType && !block.data.config.disableExpand) {
            tableKeys[keysMapper[j]] = calcNumberOfImages(block);
          }
        });
      });
    });
    return tableKeys;
  },
  [accordionType]: entity => {
    const accordionKeys = {};
    entity.data?.pairs.forEach(pair => {
      const keysMapper = getAtomicBlocksKeysMapper(pair.content.blocks);
      Object.entries(pair.content.entityMap).forEach(([, block], j) => {
        if (block.type === imageType && !block.data.config.disableExpand) {
          accordionKeys[keysMapper[j]] = calcNumberOfImages(block);
        }
      });
    });
    return accordionKeys;
  },
  [galleryType]: (entity, blockKey) => {
    if (!entity.data.config.disableExpand) return { [blockKey]: calcNumberOfImages(entity) };
  },
};

function contentTraverser(content) {
  return content.blocks.map(block => {
    const entityKey = block.entityRanges[0]?.key;
    const blockKey = block.key;
    const entity = content.entityMap[entityKey];
    const entityType = entity?.type;
    if (blockToImagesKeys[entityType]) {
      return blockToImagesKeys[entityType](entity, blockKey);
    }
    return null;
  });
}

function calcNumberOfImages(entity) {
  if (entity.type === imageType) return 1;
  if (entity.type === galleryType) return entity.data.items.length;
}
function getTableImages(entry, index) {
  const tableImages = [];
  const { rows } = entry.data.config;
  Object.entries(rows).forEach(([, row]) => {
    Object.entries(row.columns).forEach(([, column]) => {
      const entityMap = column.content.entityMap;
      entityMap &&
        Object.entries(entityMap).forEach(([, block]) => {
          if (block.type === imageType || block.type === imageTypeLegacy) {
            block.data?.src &&
              !block.data?.config.disableExpand &&
              tableImages.push(imageEntryToGallery(block.data, index));
          }
        });
    });
  });
  return tableImages;
}

function getAccordionImages(entry, index) {
  const accordionImages = [];
  entry.data.pairs.forEach(pair => {
    Object.entries(pair.content.entityMap).forEach(([, block]) => {
      if (block.type === imageType || block.type === imageTypeLegacy) {
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
      return !disableExpand ? entry.data.items : [];
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

function getAtomicBlocksKeysMapper(blocks) {
  const keysMapper = {};
  blocks.forEach(block => {
    if (block.type === atomicType) {
      const entityIndex = block.entityRanges[0].key;
      keysMapper[entityIndex] = block.key;
    }
  });
  return keysMapper;
}

export default function getImagesData(content) {
  const blockKeys = contentTraverser(content).filter(keys => keys);
  let imageIndex = 0;
  const imageMap = {};
  const images = Object.values(content.entityMap)
    .map(convertEntryToGalleryItems)
    .reduce((urls, entryUrls, i) => {
      if (blockKeys[i]) {
        Object.entries(blockKeys[i]).forEach(([key, size]) => {
          imageMap[key] = imageIndex;
          imageIndex += size;
        });
      }
      return urls.concat(entryUrls);
    }, []);

  return { images, imageMap };
}
