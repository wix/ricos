// import { ModalsMap as ImageModalsMap } from 'wix-rich-content-plugin-image';
// import { ModalsMap as GalleryModalsMap } from 'wix-rich-content-plugin-gallery';
import { ModalsMap as VideoModalsMap } from 'wix-rich-content-plugin-video';
import { ModalsMap as SoundCloudModalsMap } from 'wix-rich-content-plugin-sound-cloud';

export default {
  // ...ImageModalsMap,
  // ...GalleryModalsMap,
  ...VideoModalsMap,
  ...SoundCloudModalsMap,
};
