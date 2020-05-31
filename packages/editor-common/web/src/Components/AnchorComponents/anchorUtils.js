import { getBlockInfo } from '../../Utils/draftUtils';

export const getAnchorableBlocks = editorState => {
  const anchorableBlocks = [];
  const indexes = {};

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectedBlockKey = selection.getStartKey();

  contentState
    .getBlockMap()
    .filter(block => selectedBlockKey !== block.key)
    .forEach(block => {
      if (isAtomicBlock(block)) {
        mapAtomicBlocks(block, editorState, anchorableBlocks, indexes);
      } else {
        mapInlineBlocks(block, anchorableBlocks, indexes);
      }
    });

  // console.log({ anchorableBlocks });
  return { anchorableBlocks, pluginsIncluded: Object.keys(indexes) };
};

export const filterAnchorableBlocks = (array, filter) => {
  return array.filter(block => block.anchorType === filter);
};

const mapInlineBlocks = (block, anchorableBlocks, indexes) => {
  if (anchorableInlineElement(block.type)) {
    if (/\S/.test(block.text)) {
      let blockType = block.type;
      if (headersType(blockType)) {
        blockType = 'header';
      }
      indexes[blockType] = -1;
      anchorableBlocks.push({ ...block.toJS(), anchorType: blockType });
    }
  }
};

const mapAtomicBlocks = (block, editorState, anchorableBlocks, indexes) => {
  const { type, entityData } = getBlockInfo(editorState, block.key);
  if (anchorableAtomicPlugins(type)) {
    let contentEntityType = type;
    if (buttonsType(contentEntityType)) {
      contentEntityType = 'buttons';
    }
    if (!indexes[contentEntityType]) {
      indexes[contentEntityType] = 1;
    } else {
      indexes[contentEntityType]++;
    }
    anchorableBlocks.push({
      ...block.toJS(),
      index: indexes[contentEntityType],
      anchorType: contentEntityType,
      data: entityData,
    });
  }
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
