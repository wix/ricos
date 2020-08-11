import { storiesOf } from '@storybook/react';
import pluginMenuStory from './PluginMenuStory';
import ShortcutMenu from './ShortcutMenuStory';
import FormattingExternalToolbar from './FormattingExternalToolbar';
import TextSelectionStory from './TextSelectionToolbar';

storiesOf('Toolbars')
  .add('Plugin Menu Desktop', () => pluginMenuStory(false))
  .add('Shortcut Menu', ShortcutMenu)
  .add('External Formatting Toolbar', FormattingExternalToolbar)
  .add('Text Selection Listener', TextSelectionStory);

storiesOf('Toolbars')
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('Plugin Menu Mobile', () => pluginMenuStory(true));
