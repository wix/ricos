import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewViewer from './LinkPreviewViewer';

export const typeMapper = () => ({
  [LINK_PREVIEW_TYPE]: { component: LinkPreviewViewer },
});
