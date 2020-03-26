import { storiesOf } from '@storybook/react';

import HTMLPluginStory from './HtmlPlugin.js';
import BlogLefties from './BlogLefties.js';
import ImageFloatSpacing from './ImageFloatSpacing.js';
import MaxHeight from './MaxHeight';
import OneLiner from './OneLiner';

storiesOf('Test Cases')
  .add('One-Liner', OneLiner)
  .add('Image Float Spacing', ImageFloatSpacing)
  .add('Blog Lefties', BlogLefties)
  .add('HTML Instagram Height', HTMLPluginStory)
  .add('Max Height', MaxHeight);
