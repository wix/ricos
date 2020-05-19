import { storiesOf } from '@storybook/react';
import BasicUsageStory from './WrapperBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import ThemesStory from './Themes';
import StaticToolbarWraper from './WrapperStaticToolbar';

storiesOf('Rich Content Wrapper', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Palettes', ThemesStory)
  .add('Static Toolbar', StaticToolbarWraper);
