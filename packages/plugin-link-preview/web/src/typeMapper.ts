import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewViewer from './LinkPreviewViewer';

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_PREVIEW_TYPE]: { component: LinkPreviewViewer },
});
