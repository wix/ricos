import UnsupportedBlocksViewer from './unsupported-blocks-viewer';
// import { UNSUPPORTED_BLOCKS_TYPE } from './types';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [UNSUPPORTED_BLOCKS_TYPE]: { component: UnsupportedBlocksViewer },
});
