import React from 'react';
import { storiesOf } from '@storybook/react';

import HTMLPluginStory from './HtmlPlugin.js';
import BlogLefties from './BlogLefties.js';
import ImageFloatSpacing from './ImageFloatSpacing.js';
import MaxHeight from './MaxHeight';
import OneLiner from './OneLiner';
import VeryBigPost from './VeryBigPost';
import ViewerAnchors from './ViewerAnchors';
import MobileView from './MobileViewStory';
import ShakeyTwitter from './ShakeyTwitter';
import GroupsStory from './GroupsStory';

storiesOf('Test Cases')
  .add('Groups', GroupsStory)
  .add('Viewer Anchors', () => <ViewerAnchors />)
  .add('Mobile view', MobileView)
  .add('Shakey Twitter', ShakeyTwitter)
  .add('Very Big Post', VeryBigPost)
  .add('One-Liner', OneLiner)
  .add('Image Float Spacing', ImageFloatSpacing)
  .add('Blog Lefties', BlogLefties)
  .add('HTML Instagram Height', HTMLPluginStory)
  .add('Max Height', MaxHeight);
