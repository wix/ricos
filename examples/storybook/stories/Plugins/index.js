import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkPreviewStory from './LinkPreview';
import GalleryPlugin from './GalleryPlugin';
import DividerPluginStory from './Divider';
import Image from './Image';
import Video from './Video';

storiesOf('Plugins')
  .add('Divider', DividerPluginStory)
  .add('Image', Image)
  .add('Video', Video)
  .add('Gallery', GalleryPlugin)
  .add('Link Preview', LinkPreviewStory);
