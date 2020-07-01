import TextSpoilerButton from './TextSpoilerButton';
import { SPOILER_TYPE } from '../types';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = () => ({
  TextButtonMapper: () => ({
    [SPOILER_TYPE]: {
      component: TextSpoilerButton,
      isMobile: true,
      position: { desktop: 0, mobile: 3 },
      group: {
        desktop: 3,
        mobile: 2,
      },
    },
  }),
  name: SPOILER_TYPE,
});
export default createToolbar;
