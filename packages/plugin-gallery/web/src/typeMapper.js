// @flow
import GalleryViewer from './gallery-viewer';
// import { GALLERY_TYPE } from './types';

// if [GALLERY_TYPE] key is used, flow won't typecheck the value. See and upvote: https://github.com/facebook/flow/issues/4649
export const typeMapper /*: PluginTypeMapper*/ = () => ({
  'wix-draft-plugin-gallery': { component: GalleryViewer },
});
