import { ModalsMap as ImageModalsMap } from 'wix-rich-content-plugin-image';
import { ModalsMap as GalleryModalsMap } from 'wix-rich-content-plugin-gallery';
import { ModalsMap as VideoModalsMap } from 'wix-rich-content-plugin-video';
import { ModalsMap as SoundCloudModalsMap } from 'wix-rich-content-plugin-sound-cloud';
import { ModalsMap as GiphyModalsMap } from 'wix-rich-content-plugin-giphy';

export default {
  ...ImageModalsMap,
  ...GalleryModalsMap,
  ...VideoModalsMap,
  ...SoundCloudModalsMap,
  ...GiphyModalsMap,
};
