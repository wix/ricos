import { storiesOf } from '@storybook/react';

import TextInput from './TextInputStory';
import { UrlInputModalDesktop, UrlInputModalMobile } from './UrlInputModalStory';
import MobileSettingsHeader from './MobileSettingsHeaderStory';

storiesOf('Ricos Components')
  .add('Text Input', TextInput)
  .add('URL Input Modal', UrlInputModalDesktop)
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('Mobile URL Input Modal', UrlInputModalMobile)
  .add('Mobile Settings Header', MobileSettingsHeader);
