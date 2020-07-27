import { storiesOf } from '@storybook/react';
import pluginMenuStory from './PluginMenuStory';
import ShortcutMenu from './ShortcutMenuStory';

storiesOf('Toolbars')
  .add('Plugin Menu Desktop', () => pluginMenuStory(false))
  .add('Shortcut Menu', ShortcutMenu);

storiesOf('Toolbars')
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('Plugin Menu Mobile', () => pluginMenuStory(true));
