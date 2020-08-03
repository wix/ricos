export const getBlocksFromContentState = contentState => {
  const clonedContentState = JSON.parse(JSON.stringify(contentState));
  const innerRCEBlocks = getInnerRCEBlocks(clonedContentState.entityMap);
  if (innerRCEBlocks && innerRCEBlocks.length !== 0) {
    clonedContentState.blocks = clonedContentState.blocks.concat(innerRCEBlocks);
  }
  return clonedContentState.blocks;
};

function getInnerRCEBlocks(object) {
  let result = [];
  if (object instanceof Array) {
    object.foreach(arrayElement => {
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
