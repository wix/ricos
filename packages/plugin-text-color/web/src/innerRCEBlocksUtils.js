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
  let result = false;
  Object.keys(entityMap).forEach(entityKey => {
    if (isRceInRcePlugin(entityMap[entityKey].type)) {
      result = true;
    }
  });
  return result;
}

function isRceInRcePlugin(pluginType) {
  const rceInRcePlugins = ['table', 'accordion'];
  return rceInRcePlugins.includes(pluginType);
}
