import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewViewer from './LinkPreviewViewer';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_PREVIEW_TYPE]: { component: LinkPreviewViewer },
});
