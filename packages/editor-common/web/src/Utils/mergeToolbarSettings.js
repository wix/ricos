import { merge } from 'lodash';

export function mergeToolbarSettings({ defaultSettings, customSettings }) {
  return defaultSettings.reduce((mergedSettings, defaultSetting) => {
    const customSettingsByName = customSettings.filter(s => s.name === defaultSetting.name);
    if (customSettingsByName.length > 0) {
      mergedSettings.push(merge(defaultSetting, customSettingsByName[0]));
    } else {
      mergedSettings.push(defaultSetting);
    }
    return mergedSettings;
  }, []);
}
