import { get } from 'lodash';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../constants';

export default ({ helpers, t, settings }) => {
  const icon = get(settings, 'toolbar.icons.Map', InsertPluginIcon);
  return [
    {
      name: 'Map',
      tooltipText: t('MapPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      // NOTE: settings contains google maps sdk key, should not be exposed
      componentData: {
        config: {
          size: settings.size || DEFAULTS.size,
          alignment: settings.alignment || DEFAULTS.alignment,
          width: settings.width || DEFAULTS.width,
          height: settings.height || DEFAULTS.height,
        },
        mapSettings: settings.mapSettings,
      },
      helpers,
      t,
    },
  ];
};
