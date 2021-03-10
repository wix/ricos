import { storiesOf } from '@storybook/react';
import BasicUsageStory from './RicosBasicUsageStory';
import ExampleApp from './ExampleAppStory';
import RicosStaticToolbar from './RicosStaticToolbar';
import RicosModalSettings from './RicosModalSettings';
import RicosMediaStory from './RicosMediaStory';
import RicosContentStory from './RicosContentStory';
import RicosPublish from './RicosPublishStory';
import MountedRicosContent from './MountedRicosContent';
import PlainTextStory from './PlainTextStory';
import MaxTextLengthStory from './MaxTextLengthStory';

storiesOf('Ricos', module)
  .add('Basic Usage', BasicUsageStory)
  .add('Example App', ExampleApp)
  .add('Static Toolbar', RicosStaticToolbar)
  .add('Modal API', RicosModalSettings)
  .add('Ricos Media', RicosMediaStory)
  .add('Ricos Content', RicosContentStory)
  .add('Ricos Publish', RicosPublish)
  .add('Mounted Ricos Content Change', MountedRicosContent)
  .add('maxTextLength Demo', MaxTextLengthStory)
  .add('Plain Text Converter', PlainTextStory);
