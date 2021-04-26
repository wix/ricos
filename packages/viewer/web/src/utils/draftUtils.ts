import { DraftContent } from 'wix-rich-content-common';

export const getBlockIndex = (content: DraftContent, blockKey: string) =>
  content.blocks.findIndex(block => block.key === blockKey);
