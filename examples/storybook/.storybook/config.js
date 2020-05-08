const storybook = require('@storybook/react');
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  options: {
    theme: themes.dark,
    showPanel: false,
  },
  viewport: { viewports: INITIAL_VIEWPORTS },
});
function loadStories() {
  require('../stories');
}

storybook.configure(loadStories, module);
