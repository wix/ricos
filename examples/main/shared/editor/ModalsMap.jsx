import { ModalsMap as VideoModalsMap } from 'wix-rich-content-plugin-video';
import { ModalsMap as SoundCloudModalsMap } from 'wix-rich-content-plugin-sound-cloud';
import { ModalsMap as GiphyModalsMap } from 'wix-rich-content-plugin-giphy';
import { ModalsMap as headingsModalsMap } from 'wix-rich-content-plugin-headings';
import { ModalsMap as ImageModalsMap } from 'wix-rich-content-plugin-image';
import { ModalsMap as GalleryModalsMap } from 'wix-rich-content-plugin-gallery';
import { ModalsMap as TextColorModalsMap } from 'wix-rich-content-plugin-text-color';
import { ModalsMap as LineSpacingModalsMap } from 'wix-rich-content-plugin-line-spacing';
import { ModalsMap as PollModalsMap } from 'wix-rich-content-plugin-social-polls';
import { ModalsMap as VerticalEmbedModalsMap } from 'wix-rich-content-plugin-vertical-embed';
import { ModalsMap as AccordionModalsMap } from 'wix-rich-content-plugin-accordion';

export default {
  ...VideoModalsMap,
  ...SoundCloudModalsMap,
  ...GiphyModalsMap,
  ...ImageModalsMap,
  ...GalleryModalsMap,
  ...TextColorModalsMap,
  ...LineSpacingModalsMap,
  ...PollModalsMap,
  ...headingsModalsMap,
  ...VerticalEmbedModalsMap,
  ...AccordionModalsMap,
};
