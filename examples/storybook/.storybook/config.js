const storybook = require('@storybook/react');
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';


addParameters({
  options: {
    theme: themes.dark,
    showPanel: false,
  }
}
);
function loadStories() {
  require('../stories');
}

storybook.configure(loadStories, module);
