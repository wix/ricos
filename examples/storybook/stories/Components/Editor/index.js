import { storiesOf } from '@storybook/react';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
// import hashtagTheme from './hashtag.css';

import '../../Global.css';

import BasicUage from './BasicUsage';
import PluginsStory from './PluginsStory';
import ThemesStory from './ThemesStory';

storiesOf('Rich Content Editor', module)
  .add('Basic Usage', BasicUage)
  .add('Plugins', PluginsStory)
  .add('Themes', ThemesStory);
