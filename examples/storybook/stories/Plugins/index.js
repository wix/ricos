import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkPreviewStory from './LinkPreview';
import GalleryPlugin from './GalleryPlugin';
import DividerPluginStory from './Divider';
import Image from './Image';

storiesOf('Plugins')
  .add('Divider', DividerPluginStory)
  .add('Image', Image)
  .add('Gallery', GalleryPlugin)
  .add('Link Preview', LinkPreviewStory);
