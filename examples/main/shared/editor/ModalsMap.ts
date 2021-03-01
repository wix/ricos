import { ModalsMap as VideoModalsMap } from 'ricos/video/editor';
import { ModalsMap as SoundCloudModalsMap } from 'ricos/sound-cloud/editor';
import { ModalsMap as GiphyModalsMap } from 'ricos/giphy/editor';
import { ModalsMap as headingsModalsMap } from 'ricos/heading';
import { ModalsMap as ImageModalsMap } from 'ricos/image/editor';
import { ModalsMap as GalleryModalsMap } from 'ricos/gallery/editor';
import { ModalsMap as TextColorModalsMap } from 'ricos/text-color/editor';
import { ModalsMap as LineSpacingModalsMap } from 'ricos/line-spacing/editor';
import { ModalsMap as PollModalsMap } from 'ricos/poll/editor';
import { ModalsMap as VerticalEmbedModalsMap } from 'ricos/vertical-embed/editor';
import { ModalsMap as TableModalsMap } from 'ricos/table/editor';
import { ModalsMap as AccordionModalsMap } from 'ricos/accordion/editor';

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
  ...TableModalsMap,
  ...AccordionModalsMap,
};
