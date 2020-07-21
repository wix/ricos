import { storiesOf } from '@storybook/react';
import pluginMenuStory from './PluginMenuStory';
import ShortcutMenu from './ShortcutMenuStory';
import ExternalToolbar from './External';
import FormattingExternalToolbar from './FormattingExternalToolbar';

storiesOf('Toolbars')
  .add('Plugin Menu Desktop', () => pluginMenuStory(false))
  .add('Shortcut Menu', ShortcutMenu)
  .add('Externl Undo/Redo', ExternalToolbar)
  .add('External Formatting Toolbar', FormattingExternalToolbar);

storiesOf('Toolbars')
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('Plugin Menu Mobile', () => pluginMenuStory(true));
