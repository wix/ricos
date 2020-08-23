import { storiesOf } from '@storybook/react';
import BasicUsageStory from './RicosBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import ThemesStory from './Themes';
import RicosStaticToolbar from './RicosStaticToolbar';
import RicosModalSettings from './RicosModalSettings';
import RicosMediaStory from './RicosMediaStory';
import RicosContent from './RicosContentStory';

storiesOf('Ricos', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Palettes', ThemesStory)
  .add('Static Toolbar', RicosStaticToolbar)
  .add('Modal API', RicosModalSettings)
  .add('Ricos Media', RicosMediaStory)
  .add('Ricos Content', RicosContent);
