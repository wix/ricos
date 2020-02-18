import { storiesOf } from '@storybook/react';

import BasicUage from './BasicUsage';
import PluginsStory from './Plugins';
import ThemesStory from './Themes';
import { MaxHeight } from './MaxHeight';

storiesOf('Rich Content Editor', module)
  .add('Basic Usage', BasicUage)
  .add('Plugins', PluginsStory)
  .add('Themes', ThemesStory)
  .add('Max Height', MaxHeight);
