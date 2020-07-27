import { storiesOf } from '@storybook/react';
import PreviewRules from './PreviewRules';
import PreviewContentExamples from './PreviewContentExamples';

storiesOf('Preview')
  .add('Rules', PreviewRules)
  .add('Examples', PreviewContentExamples);
