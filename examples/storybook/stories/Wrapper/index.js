import { storiesOf } from '@storybook/react';
import BasicUsageStory from './WrapperBasicUsageStory';
import ThemesStory from './Themes';

storiesOf('Wrappers', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Palettes', ThemesStory);
