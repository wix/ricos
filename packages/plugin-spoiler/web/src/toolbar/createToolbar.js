import SpoilerComponent from '../spoiler-component';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

// import createInsertButtons from './insert-buttons';

// export default function createToolbar({ helpers, t, settings, isMobile }) {
//   // return {
//   //   InlineButtons: createInlineButtons({ t, settings, isMobile }),
//   //   InsertButtons: createInsertButtons({ helpers, t, settings, isMobile }),
//   //   name: 'spoiler',
//   // };
// }

export default settings => ({
  TextButtonMapper: () => ({
    spoiler: {
      component: decorateComponentWithProps(SpoilerComponent, settings),
      isMobile: true,
      // position: { desktop: 0, mobile: 0 },
      group: { desktop: 2, mobile: 2 },
    },
  }),
});
