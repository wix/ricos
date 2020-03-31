import { storiesOf } from '@storybook/react';
import LinkPreviewStory from './LinkPreviewStory';
import GalleryPlugin from './GalleryPlugin.js';
import DividerPluginStory from './DividerPluginStory.js';

storiesOf('Plugins')
  .add('Divider Plugin', DividerPluginStory)
  .add('Gallery Plugin', GalleryPlugin)
  .add('Link Preview', LinkPreviewStory);
