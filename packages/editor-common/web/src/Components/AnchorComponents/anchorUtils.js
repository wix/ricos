import { getBlockInfo } from '../../Utils/draftUtils';

export const getAnchorableBlocks = editorState => {
  const anchorableBlocks = [];
  const typesWithIndexes = {};

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectedBlockKey = selection.getStartKey();

  contentState
    .getBlockMap()
    .filter(block => selectedBlockKey !== block.key)
    .forEach(block => {
      if (isAnchorableBlock(block, editorState)) {
        const anchorableBlock = isAtomicBlock(block)
          ? mapAtomicBlocks(block, editorState)
          : mapInlineBlocks(block);
        anchorableBlocks.push(anchorableBlock);
      }
    });

  anchorableBlocks.forEach(block => mapBlocksTypesAndIndexes(block, typesWithIndexes));
  return { anchorableBlocks, pluginsIncluded: Object.keys(typesWithIndexes) };
};

export const filterAnchorableBlocks = (array, filter) => {
  return array.filter(block => block.anchorType === filter);
};

const mapBlocksTypesAndIndexes = (block, typesWithIndexes) => {
  if (!typesWithIndexes[block.anchorType]) {
    typesWithIndexes[block.anchorType] = 1;
  } else {
    typesWithIndexes[block.anchorType]++;
  }
  block.index = typesWithIndexes[block.anchorType];
};

const isAnchorableBlock = (block, editorState) => {
  if (isAtomicBlock(block)) {
    const { type } = getBlockInfo(editorState, block.key);
    return anchorableAtomicPlugins(type);
  } else {
    return anchorableInlineElement(block.type) && /\S/.test(block.text);
  }
};

const mapInlineBlocks = block => {
  let blockType = block.type;
  if (headersType(blockType)) {
    blockType = 'header';
  }
  return { ...block.toJS(), anchorType: blockType };
};

const mapAtomicBlocks = (block, editorState) => {
  const { type, entityData } = getBlockInfo(editorState, block.key);
  let contentEntityType = type;
  if (buttonsType(contentEntityType)) {
    contentEntityType = 'buttons';
  }
  return {
    ...block.toJS(),
    anchorType: contentEntityType,
    data: entityData,
  };
};

const isAtomicBlock = block => block.type === 'atomic';

const buttonsType = contentEntityType =>
  contentEntityType === 'wix-draft-plugin-link-button' ||
  contentEntityType === 'wix-draft-plugin-action-button';

const headersType = blockType =>
  blockType === 'header-two' ||
  blockType === 'header-three' ||
  blockType === 'header-four' ||
  blockType === 'header-five' ||
  blockType === 'header-six';

const anchorableAtomicPlugins = atomicPluginType =>
  atomicPluginType === 'wix-draft-plugin-image' ||
  atomicPluginType === 'wix-draft-plugin-gallery' ||
  atomicPluginType === 'wix-draft-plugin-video' ||
  atomicPluginType === 'wix-draft-plugin-map' ||
  atomicPluginType === 'wix-draft-plugin-link-button' ||
  atomicPluginType === 'wix-draft-plugin-poll' ||
  atomicPluginType === 'wix-draft-plugin-action-button' ||
  atomicPluginType === 'wix-draft-plugin-giphy' ||
  atomicPluginType === 'wix-draft-plugin-file-upload';

const anchorableInlineElement = blockType =>
  blockType === 'unstyled' ||
  blockType === 'header-two' ||
  blockType === 'header-three' ||
  blockType === 'header-four' ||
  blockType === 'header-five' ||
  blockType === 'header-six' ||
  blockType === 'code-block' ||
  blockType === 'blockquote';
