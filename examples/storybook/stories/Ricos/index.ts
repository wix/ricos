import { storiesOf } from '@storybook/react';
import BasicUsageStory from './RicosBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import ThemesStory from './ThemeStory';
import CustomStyles from './CustomStyles';
import RicosStaticToolbar from './RicosStaticToolbar';
import RicosModalSettings from './RicosModalSettings';
import RicosMediaStory from './RicosMediaStory';
import RicosContent from './RicosContentStory';
import MountedRicosContent from './MountedRicosContent';
import PlainTextStory from './PlainTextStory';
import MaxTextLengthStory from './MaxTextLengthStory';

storiesOf('Ricos', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Ricos Theme', ThemesStory)
  .add('Ricos Custom Styles', CustomStyles)
  .add('Static Toolbar', RicosStaticToolbar)
  .add('Modal API', RicosModalSettings)
  .add('Ricos Media', RicosMediaStory)
  .add('Ricos Content', RicosContent)
  .add('Mounted Ricos Content Change', MountedRicosContent)
  .add('maxTextLength Demo', MaxTextLengthStory)
  .add('Plain Text Converter', PlainTextStory);
