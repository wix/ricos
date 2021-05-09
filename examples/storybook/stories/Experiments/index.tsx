import React from 'react';
import { storiesOf } from '@storybook/react';

import BarrelRoll from './BarrelRoll';
import ImagePluginQualityPreload from './ImagePluginQualityPreload';

storiesOf('Experiments', module)
  .add('BarrelRoll', BarrelRoll)
  .add('Image Plugin Preload Experiment', ImagePluginQualityPreload);
