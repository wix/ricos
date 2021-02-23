import { storiesOf } from '@storybook/react';
import ThemesStory from './ThemeStory';
import CustomStyles from './CustomStyles';

storiesOf('Theme', module)
  .add('Palette', ThemesStory)
  .add('Custom Styles', CustomStyles);
