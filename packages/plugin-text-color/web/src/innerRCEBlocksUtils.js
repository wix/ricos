/* eslint-disable fp/no-loops */
export const getBlocksFromContentState = contentState => {
  const innerRCEBlocks = isInnerRCEExists(contentState.entityMap)
    ? getInnerRCEBlocks(contentState.entityMap)
    : [];
  return [...contentState.blocks, ...innerRCEBlocks];
};

function getInnerRCEBlocks(object) {
  let result = [];
  if (object instanceof Array) {
    Array.prototype.forEach.call(object, arrayElement => {
      const innerBlocks = getInnerRCEBlocks(arrayElement);
      if (innerBlocks) {
        result = [...result, ...innerBlocks];
      }
    });
  } else {
    for (const [key, value] of Object.entries(object)) {
      if (key === 'blocks') {
        return value;
      }
      if (value instanceof Object || value instanceof Array) {
        const innerBlocks = getInnerRCEBlocks(value);
        if (innerBlocks) {
          result = [...result, ...innerBlocks];
        }
      }
    }
  }
  return result;
}

function isInnerRCEExists(entityMap) {
  const rceInRcePlugins = ['table', 'wix-rich-content-plugin-accordion'];
  return Object.values(entityMap).some(entity => rceInRcePlugins.includes(entity.type));
}
