const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';
const accordionType = 'wix-rich-content-plugin-accordion';
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

const blockToImagesKeys = {
  [imageType]: (entity, blockKey) => {
    if (!entity.data.config.disableExpand) return { [blockKey]: 1 };
  },
  [imageTypeLegacy]: (entity, blockKey) => {
    if (!entity.data.config.disableExpand) return { [blockKey]: 1 };
  },
  [tableType]: entity => {
    let tableImagesKeys = {};
    Object.entries(entity.data?.config.rows).forEach(([, row]) => {
      Object.entries(row.columns).forEach(([, column]) => {
        const blockKeys = contentTraverser(column.content).filter(key => key);
        const imageKeys = blockKeys.length ? Object.assign(...blockKeys) : {};
        tableImagesKeys = {
          ...tableImagesKeys,
          ...imageKeys,
        };
      });
    });
    return tableImagesKeys;
  },
  [accordionType]: entity => {
    let accordionImagesKeys = {};
    entity.data?.pairs.forEach(pair => {
      const blockKeys = contentTraverser(pair.content).filter(key => key);
      const imageKeys = blockKeys.length ? Object.assign(...blockKeys) : {};
      accordionImagesKeys = {
        ...accordionImagesKeys,
        ...imageKeys,
      };
    });
    return accordionImagesKeys;
  },
  [galleryType]: (entity, blockKey) => {
    if (!entity.data.config.disableExpand) return { [blockKey]: entity.data.items.length };
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

function innerRceImagesMapper(entityMap, index) {
  const images = [];
  Object.entries(entityMap).forEach(([, block]) => {
    if (block.type === imageType || block.type === imageTypeLegacy) {
      block.data?.src &&
        !block.data?.config.disableExpand &&
        images.push(imageEntryToGallery(block.data, index));
    }
  });
  return images;
}

function getTableImages(entry, index) {
  let tableImages = [];
  const { rows } = entry.data.config;
  Object.entries(rows).forEach(([, row]) => {
    Object.entries(row.columns).forEach(([, column]) => {
      tableImages = [...tableImages, ...innerRceImagesMapper(column.content.entityMap, index)];
    });
  });
  return tableImages;
}

function getAccordionImages(entry, index) {
  let accordionImages = [];
  entry.data.pairs.forEach(pair => {
    accordionImages = [...accordionImages, ...innerRceImagesMapper(pair.content.entityMap, index)];
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
