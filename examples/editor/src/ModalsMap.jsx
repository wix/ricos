import { ModalsMap as VideoModalsMap } from 'wix-rich-content-plugin-video';
import { ModalsMap as SoundCloudModalsMap } from 'wix-rich-content-plugin-sound-cloud';
import { ModalsMap as GiphyModalsMap } from 'wix-rich-content-plugin-giphy';
export { ModalsMap as galleryModals } from 'wix-rich-content-plugin-gallery';

export default {
  ...VideoModalsMap,
  ...SoundCloudModalsMap,
  ...GiphyModalsMap,
  ...galleryModals,
};
