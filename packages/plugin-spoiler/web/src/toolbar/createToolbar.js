import SpoilerButton from './SpoilerButton';
import { SPOILER_TYPE } from '../types';

export default function createToolbar() {
  return {
    TextButtonMapper: () => ({
      [SPOILER_TYPE]: {
        component: SpoilerButton,
        isMobile: true,
        position: { desktop: 0, mobile: 3 },
        group: {
          desktop: 3,
          mobile: 2,
        },
      },
    }),
  };
}
