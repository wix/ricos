import { storiesOf } from '@storybook/react';
import pluginMenuStory from './PluginMenuStory';

storiesOf('Toolbars').add('Plugin Menu Desktop', () => pluginMenuStory(false));

storiesOf('Toolbars')
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('Plugin Menu Mobile', () => pluginMenuStory(true));
