import HeadingButton from './HeadingButton';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = settings => ({
  TextButtonMapper: () => ({
    HeadingsDropdown: {
      component: decorateComponentWithProps(HeadingButton, settings),
      isMobile: true,
      position: { desktop: 0, mobile: 0 },
      group: { desktop: 0, mobile: 1 },
    },
  }),
  name: 'headings',
});

export default createToolbar;
