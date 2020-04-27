import { convertFromRaw, convertToRaw, ContentState } from 'wix-rich-content-editor-common';

export const truncateContentState = (raw, index) => {
  const contentState = convertFromRaw(raw);
  const blocks = contentState.getBlocksAsArray();
  const truncateBlocks = blocks.slice(0, index);
  const newContentState = ContentState.createFromBlockArray(truncateBlocks);
  const newRaw = convertToRaw(newContentState);
  return newRaw;
};
