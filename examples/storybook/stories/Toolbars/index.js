import { storiesOf } from '@storybook/react';
import pluginMenuStory from './PluginMenuStory';
import ShortcutMenu from './ShortcutMenuStory';
import ExternalToolbar from './External';

storiesOf('Toolbars')
  .add('Plugin Menu Desktop', () => pluginMenuStory(false))
  .add('Shortcut Menu', ShortcutMenu)
  .add('External Toolbar', ExternalToolbar);

storiesOf('Toolbars')
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('Plugin Menu Mobile', () => pluginMenuStory(true));
