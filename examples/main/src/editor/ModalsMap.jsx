import { ModalsMap as VideoModalsMap } from 'wix-rich-content-plugin-video';
import { ModalsMap as SoundCloudModalsMap } from 'wix-rich-content-plugin-sound-cloud';
import { ModalsMap as GiphyModalsMap } from 'wix-rich-content-plugin-giphy';
import { ModalsMap as ImageModalsMap } from 'wix-rich-content-plugin-image';
import { ModalsMap as TextColorModalsMap } from 'wix-rich-content-plugin-text-color';
import { ModalsMap as LineSpacingModalsMap } from 'wix-rich-content-plugin-line-spacing';

export default {
  ...VideoModalsMap,
  ...SoundCloudModalsMap,
  ...GiphyModalsMap,
  ...ImageModalsMap,
  ...TextColorModalsMap,
  ...LineSpacingModalsMap,
};
