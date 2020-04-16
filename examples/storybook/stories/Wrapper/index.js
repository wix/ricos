import { storiesOf } from '@storybook/react';
import BasicUsageStory from './WrapperBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import ThemesStory from './Themes';

storiesOf('Rich Content Wrapper', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Palettes', ThemesStory);
