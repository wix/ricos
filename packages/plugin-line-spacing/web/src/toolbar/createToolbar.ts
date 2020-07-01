import LineSpacingButton from './LineSpacingButton';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = settings => ({
  TextButtonMapper: () => ({
    LinsSpacing: {
      component: decorateComponentWithProps(LineSpacingButton, settings),
      isMobile: true,
    },
  }),
  name: 'line-spacing',
});

export default createToolbar;
