import { ModalsMap as VideoModalsMap } from 'ricos/video';
import { ModalsMap as SoundCloudModalsMap } from 'ricos/sound-cloud';
import { ModalsMap as GiphyModalsMap } from 'ricos/giphy';
import { ModalsMap as headingsModalsMap } from 'ricos/headings';
import { ModalsMap as ImageModalsMap } from 'ricos/image';
import { ModalsMap as GalleryModalsMap } from 'ricos/gallery';
import { ModalsMap as TextColorModalsMap } from 'ricos/text-color';
import { ModalsMap as LineSpacingModalsMap } from 'ricos/line-spacing';
import { ModalsMap as PollModalsMap } from 'ricos/social-polls';
import { ModalsMap as VerticalEmbedModalsMap } from 'ricos/vertical-embed';
import { ModalsMap as TableModalsMap } from 'ricos/table';
import { ModalsMap as AccordionModalsMap } from 'ricos/accordion';

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
