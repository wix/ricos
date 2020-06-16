import HeadingButton from './HeadingButton';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

export default settings => ({
  TextButtonMapper: () => ({
    'wix-rich-content-plugin-headings': {
      component: decorateComponentWithProps(HeadingButton, settings),
      isMobile: true,
      position: { desktop: 0, mobile: 0 },
      group: { desktop: 0, mobile: 1 },
    },
  }),
});
