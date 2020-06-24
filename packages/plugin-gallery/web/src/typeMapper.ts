import GalleryViewer from './gallery-viewer';
import { GALLERY_TYPE } from './types';

export const typeMapper: PluginTypeMapper = () => ({
  [GALLERY_TYPE]: { component: GalleryViewer },
});
