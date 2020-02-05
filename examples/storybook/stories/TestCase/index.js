import { storiesOf } from '@storybook/react';
import ImagesStory from './Images.js';
import HTMLPluginStory from './HtmlPlugin.js';
import BlogLefties from './BlogLefties.js';
import ImageFloatSpacing from './ImageFloatSpacing.js';
import CrashStory from './CrashStory.js';

storiesOf('Test Cases')
  .add('Image Float Spacing', ImageFloatSpacing)
  .add('Blog Lefties', BlogLefties)
  .add('HTML Instagram Height', HTMLPluginStory)
  .add('Images', ImagesStory)
  .add('Crash test', CrashStory);
