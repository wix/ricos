import { getBlockInfo } from '../../Utils/draftUtils';
import {
  IMAGE_TYPE,
  VIDEO_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HEADER_BLOCK,
  UNSTYLED,
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  MAP_TYPE,
  FILE_UPLOAD_TYPE,
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
} from 'wix-rich-content-common';

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
  contentEntityType === LINK_BUTTON_TYPE || contentEntityType === ACTION_BUTTON_TYPE;

const headersType = blockType =>
  blockType === HEADER_BLOCK.TWO ||
  blockType === HEADER_BLOCK.THREE ||
  blockType === HEADER_BLOCK.FOUR ||
  blockType === HEADER_BLOCK.FIVE ||
  blockType === HEADER_BLOCK.SIX;

const anchorableAtomicPlugins = atomicPluginType =>
  atomicPluginType === IMAGE_TYPE ||
  atomicPluginType === GALLERY_TYPE ||
  atomicPluginType === VIDEO_TYPE ||
  atomicPluginType === MAP_TYPE ||
  atomicPluginType === LINK_BUTTON_TYPE ||
  atomicPluginType === ACTION_BUTTON_TYPE ||
  atomicPluginType === GIPHY_TYPE ||
  atomicPluginType === FILE_UPLOAD_TYPE;

const anchorableInlineElement = blockType =>
  blockType === UNSTYLED ||
  blockType === HEADER_BLOCK.TWO ||
  blockType === HEADER_BLOCK.THREE ||
  blockType === HEADER_BLOCK.FOUR ||
  blockType === HEADER_BLOCK.FIVE ||
  blockType === HEADER_BLOCK.SIX ||
  blockType === CODE_BLOCK_TYPE ||
  blockType === BLOCKQUOTE;
