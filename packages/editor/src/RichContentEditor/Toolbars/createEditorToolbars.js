import merge from 'lodash/merge';
import { simplePubsub, getToolbarTheme, getConfigByFormFactor } from 'wix-rich-content-common';
import { getDefaultToolbarSettings } from './default-toolbar-settings';

const createEditorToolbars = config => {
  const {
    buttons,
    anchorTarget,
    relValue,
    // textToolbarType,
    textAlignment,
    helpers,
    isMobile,
    theme,
    getEditorState,
    setEditorState,
    t,
    refId,
    getToolbarSettings = () => []
  } = config;
  const { pluginButtons, pluginTextButtonMappers, textButtons } = buttons;

  const pubsub = simplePubsub();

  const defaultToolbarSettings = getDefaultToolbarSettings({ isMobile, pluginButtons, textButtons });
  const customSettings = getToolbarSettings({ isMobile, pluginButtons, textButtons });

  const toolbarSettings = defaultToolbarSettings.reduce((mergedSettings, defaultSetting) => {
  const customSettingsByName = customSettings.filter(s => s.name === defaultSetting.name);
  if (customSettingsByName.length > 0) {
    mergedSettings.push(merge(defaultSetting, customSettingsByName[0]));
  } else {
    mergedSettings.push(defaultSetting);
  }
  return mergedSettings;
  }, []);

  const toolbars = {};

  toolbarSettings.filter(({ shouldCreate }) => getConfigByFormFactor({ config: shouldCreate(), isMobile, defaultValue: true }))
    .forEach(({ name, getButtons, getPositionOffset, getVisibilityFn, getInstance }) => {
      toolbars[name] = getInstance({
        buttons: getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] }),
        offset: getConfigByFormFactor({ config: getPositionOffset(), isMobile, defaultValue: { x: 0, y: 0 } }),
        visibilityFn: getConfigByFormFactor({ config: getVisibilityFn(), isMobile, defaultValue: () => true }),
        theme: { ...getToolbarTheme(theme, name.toLowerCase()), ...theme },
        defaultTextAlignment: textAlignment,
        pluginTextButtonMappers,
        getEditorState,
        setEditorState,
        anchorTarget,
        relValue,
        isMobile,
        helpers,
        pubsub,
        refId,
        t
      });
    });

  return toolbars;
};

export default createEditorToolbars;
