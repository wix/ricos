import React from 'react';
import { storiesOf } from '@storybook/react';

import BarrelRoll from './BarrelRoll';
import UseHeadingOne from './UseHeadingOne';
import ImagePluginQualityPreload from './ImagePluginQualityPreload';

storiesOf('Experiments', module)
  .add('BarrelRoll', BarrelRoll)
  .add('useHeadingOne', UseHeadingOne)
  .add('Image Plugin Preload Experiment', ImagePluginQualityPreload);
