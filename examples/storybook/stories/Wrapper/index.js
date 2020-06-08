import { storiesOf } from '@storybook/react';
import BasicUsageStory from './RicosBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import ThemesStory from './Themes';
import RicosStaticToolbar from './RicosStaticToolbar';

storiesOf('Ricos', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Palettes', ThemesStory)
  .add('Static Toolbar', RicosStaticToolbar);
