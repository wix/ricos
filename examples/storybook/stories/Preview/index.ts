import { storiesOf } from '@storybook/react';
import PreviewRules from './PreviewRules';
import PreviewContentExamples from './PreviewContentExamples';
import TruncateContent from './TruncateContent';

storiesOf('Preview', module)
  .add('Rules', PreviewRules)
  .add('Examples', PreviewContentExamples)
  .add('Beta', TruncateContent);
