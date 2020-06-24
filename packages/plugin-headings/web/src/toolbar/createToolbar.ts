import HeadingButton from './HeadingButton';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { HEADINGS_DROPDOWN_TYPE } from '../types';

const createToolbar: CreatePluginToolbar = settings => ({
  TextButtonMapper: () => ({
    [HEADINGS_DROPDOWN_TYPE]: {
      component: decorateComponentWithProps(HeadingButton, settings),
      isMobile: true,
      position: { desktop: 0, mobile: 0 },
      group: { desktop: 0, mobile: 1 },
    },
  }),
  name: 'headings',
});

export default createToolbar;
