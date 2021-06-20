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
import { EditorState, ContentBlock } from '@wix/draft-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnchorableBlockType = any;

export const getAnchorableBlocks = (editorState: EditorState, selectedBlock?: string) => {
  const anchorableBlocks: AnchorableBlockType[] = [];
  const typesWithIndexes = {};

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectedBlockKey = selectedBlock || selection.getStartKey();

  contentState
    .getBlockMap()
    .filter(block => selectedBlockKey !== block?.getKey())
    .forEach(block => {
      if (block && isAnchorableBlock(block, editorState)) {
        const anchorableBlock = isAtomicBlock(block)
          ? mapAtomicBlocks(block, editorState)
          : mapInlineBlocks(block);
        anchorableBlocks.push(anchorableBlock);
      } else if (block && isInnerRCEBlock(block, editorState)) {
        const { type, entityData } = getBlockInfo(editorState, block?.getKey() || '');
        if (type === 'wix-rich-content-plugin-collapsible-list') {
          entityData.pairs.forEach(pair => {
            const titleEditorState = pair.title;
            anchorableBlocks.push(
              ...getAnchorableBlocks(titleEditorState, selectedBlockKey).anchorableBlocks
            );
            const contentEditorState = pair.content;
            anchorableBlocks.push(
              ...getAnchorableBlocks(contentEditorState, selectedBlockKey).anchorableBlocks
            );
          });
        }
      }
    });

  anchorableBlocks.forEach(block => mapBlocksTypesAndIndexes(block, typesWithIndexes));
  return { anchorableBlocks, pluginsIncluded: Object.keys(typesWithIndexes) };
};

export const filterAnchorableBlocks = (array, filter) => {
  return array.filter(block => block.anchorType === filter);
};

function isInnerRCEBlock(block: ContentBlock, editorState: EditorState) {
  const { type } = getBlockInfo(editorState, block.getKey());
  const rceInRcePlugins = [
    // 'wix-rich-content-plugin-table',
    'wix-rich-content-plugin-collapsible-list',
  ];
  return rceInRcePlugins.includes(type);
}

const mapBlocksTypesAndIndexes = (block, typesWithIndexes) => {
  if (!typesWithIndexes[block.anchorType]) {
    typesWithIndexes[block.anchorType] = 1;
  } else {
    typesWithIndexes[block.anchorType]++;
  }
  block.index = typesWithIndexes[block.anchorType];
};

const isAnchorableBlock = (block: ContentBlock, editorState: EditorState) => {
  if (isAtomicBlock(block)) {
    const { type } = getBlockInfo(editorState, block.getKey());
    return anchorableAtomicPlugins(type);
  } else {
    return anchorableInlineElement(block.getType()) && /\S/.test(block.getText());
  }
};

const mapInlineBlocks = (block: ContentBlock) => {
  let blockType = block.getType();
  if (headersType(blockType)) {
    blockType = 'header';
  }
  return { ...block.toJS(), anchorType: blockType };
};

const mapAtomicBlocks = (block: ContentBlock, editorState: EditorState) => {
  const { type, entityData } = getBlockInfo(editorState, block.getKey());
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

const isAtomicBlock = (block: ContentBlock) => block.getType() === 'atomic';

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
