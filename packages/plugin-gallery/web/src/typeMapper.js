import GalleryViewer from './gallery-viewer';
import { GALLERY_TYPE } from './types';

export const typeMapper = () => ({
  [GALLERY_TYPE]: { component: GalleryViewer },
});
