const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';
const accordionType = 'wix-rich-content-plugin-accordion';
const tableType = 'table';

function imageEntryToGallery(data, index) {
  if (data.config.disableExpand) return;
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
function getAccordionImages(entry, index) {
  const accordionImages = [];
  // const entityMaps = Object.entries(entry.data.pairs[0].content.entityMap);
  // entityMaps.forEach(([, block]) => {
  //   if (block.type === imageType) {
  //     accordionImages.push(imageEntryToGallery(block.data, index));
  //   }
  // });
  entry.data.pairs.forEach(pair => {
    Object.entries(pair.content.entityMap).forEach(([, block]) => {
      if (block.type === imageType) {
        accordionImages.push(imageEntryToGallery(block.data, index));
      }
    });
  });

  return accordionImages;
}

function convertEntryToGalleryItems(entry, index) {
  switch (entry.type) {
    case imageType:
    case imageTypeLegacy:
      return entry.data.src ? [imageEntryToGallery(entry.data, index)] : [];
    case galleryType: {
      // console.log('gallery',entry.data.items);
      return entry.data.items;
    }
    case tableType: {
      return getTableImages(entry);
    }
    case accordionType: {
      return getAccordionImages(entry);
    }
    default:
      return [];
  }
}

export default function getImagesData(data) {
  console.log('data', data);
  const blockKeys = data.blocks.filter(block => block.type === 'atomic');

  const accordionData = Object.values(data.entityMap).filter(block => block.type === accordionType);
  const accordionIndexes = accordionData.map(d => Object.values(data.entityMap).indexOf(d));
  const accordionkeys = [];

  accordionData.forEach(a => {
    a.data?.pairs.forEach(pair => {
      const entityKeyRange = {};
      pair.content.blocks.forEach(block => {
        if (block.type === 'atomic') {
          entityKeyRange[block.entityRanges[0].key] = block.key;
        }
      });
      // console.log('entityKeyRange', entityKeyRange);
      // console.log('pair.content.entityMap', Object.entries(pair.content.entityMap));
      Object.entries(pair.content.entityMap).forEach(([, block], i) => {
        if (block.type === imageType) {
          accordionkeys.push(entityKeyRange[i]);
        }
      });
    });
    // Object.entries(a.data?.pairs[0].content.blocks).forEach(([, b]) => {
    //   // console.log('block', b);
    //   // const entityKey = b.entityRanges[0]?.key;
    //   // console.log('a.data?.pairs', a.data?.pairs);
    //   // const entityType = a.data?.pairs[0].content.entityMap[entityKey]?.type;
    //   // if (b.type === 'atomic' && entityType === imageType) {
    //   //   return accordionkeys.push(b.key);
    //   // }
    // });
  });
  console.log('accordionkeys', accordionkeys);
  // console.log('accordionkeys', accordionkeys);
  //TODO => Handle images in table
  // const tableData = Object.values(data.entityMap).filter(block => block.type === tableType);
  // const tableIndexes = tableData.map(d => Object.values(data.entityMap).indexOf(d));
  // console.log('tableData', tableData, 'tableIndexes', tableIndexes);
  // const tableKeys = [];
  // tableData.forEach(t => {
  //   Object.entries(t.data?.config.rows).forEach(([, row]) => {
  //     Object.entries(row.columns).forEach(([, column]) => {
  //       const blocks = column.content.blocks;
  //       const atomicKey = blocks.filter(block => block.type === 'atomic')[0];
  //       console.log('table atomicKeys', atomicKey?.entityRanges[0]?.key);
  //       // const entityType = t.data?.pairs[0].content.entityMap[entityKey]?.type;
  //       // if (row.type === 'atomic' && entityType === imageType) {
  //       //   // return accordionkeys.push(row.key);
  //       // }
  //     });
  //   });
  // });

  let sum = 0;
  const imageMap = {};
  const images = Object.values(data.entityMap)
    .map(convertEntryToGalleryItems)
    .reduce((urls, entryUrls, i) => {
      if (entryUrls.length > 0) {
        // console.log('accordionkeys', i in accordionIndexes, i);
        if (!(i in accordionIndexes) && urls.concat(entryUrls).length >= sum) {
          // console.log('sum', sum);
          accordionkeys.forEach(key => (imageMap[key] = sum++));
          // console.log('imageMap accordionType', imageMap);
        } else {
          const blockKey = blockKeys[i].key;
          imageMap[blockKey] = sum;
        }
      }
      sum += entryUrls.length;
      return urls.concat(entryUrls);
    }, [])
    .filter(expandableImage => expandableImage);

  console.log('imageMap', imageMap);
  console.log('images', images);
  return { images, imageMap };
}
