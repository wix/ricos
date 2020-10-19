import { storiesOf } from '@storybook/react';
import BasicUsageStory from './RicosBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import ThemesStory from './ThemeStory';
import RicosStaticToolbar from './RicosStaticToolbar';
import RicosModalSettings from './RicosModalSettings';
import RicosMediaStory from './RicosMediaStory';
import RicosContent from './RicosContentStory';
import RicosModal from './RicosModalStory';

storiesOf('Ricos', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Ricos Theme', ThemesStory)
  .add('Static Toolbar', RicosStaticToolbar)
  .add('Modal API', RicosModalSettings)
  .add('Ricos Media', RicosMediaStory)
  .add('Ricos Content', RicosContent)
  .add('Ricos Modal', RicosModal);
