import { storiesOf } from '@storybook/react';

import GalleryPlugin from './GalleryPlugin.js';
import DividerPluginStory from './DividerPluginStory.js';

storiesOf('Plugins')
  .add('Divider Plugin', DividerPluginStory)
  .add('Gallery Plugin', GalleryPlugin);
