import { RicosContent } from 'wix-rich-content-common';

export const getBlockIndex = (content: RicosContent, blockKey: string) =>
  content.blocks.findIndex(block => block.key === blockKey);
