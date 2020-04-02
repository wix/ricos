import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkPreviewStory from './LinkPreviewStory';
import GalleryPlugin from './GalleryPlugin';
import DividerPluginStory from './DividerPluginStory';
import Image from './Image';

storiesOf('Plugins')
  .add('Divider', DividerPluginStory)
  .add('Image', Image)
  .add('Gallery', GalleryPlugin)
  .add('Link Preview', LinkPreviewStory);
