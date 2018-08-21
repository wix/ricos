import merge from 'lodash/merge';
import { simplePubsub, getToolbarTheme, getConfigByFormFactor } from 'wix-rich-content-common';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import { MobileTextButtonList, DesktopTextButtonList } from './buttons';
import { reducePluginTextButtonNames, mergeButtonLists } from './buttons/utils';

const appendSeparator = ({ mergedList, sourceList, buttonData, formFactor }) => {
  if (mergedList.length === sourceList.length &&
    (!buttonData.position || buttonData.position[formFactor] === undefined ||
      buttonData.position[formFactor] < 0 || buttonData.position[formFactor] > mergedList.length)) {
    return [...mergedList, 'Separator'];
  }
  return mergedList;
};

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
  const { pluginButtons, pluginTextButtons } = buttons;

  const pubsub = simplePubsub();

  const textButtons = {
    mobile: mergeButtonLists(MobileTextButtonList,
      reducePluginTextButtonNames(pluginTextButtons, ({ isMobile }) => isMobile !== false), 'mobile', appendSeparator),
    desktop: mergeButtonLists(DesktopTextButtonList, reducePluginTextButtonNames(pluginTextButtons), 'desktop', appendSeparator)
  };

  const defaultToolbarSettings = getDefaultToolbarSettings({ pluginButtons, textButtons, pluginTextButtons });
  const customSettings = getToolbarSettings({ pluginButtons, textButtons, pluginTextButtons });

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
    .forEach(({ name, getButtons, getTextPluginButtons, getPositionOffset, getVisibilityFn, getInstance }) => {
      toolbars[name] = getInstance({
        buttons: getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] }),
        textPluginButtons: getConfigByFormFactor({ config: getTextPluginButtons(), isMobile, defaultValue: [] }),
        offset: getConfigByFormFactor({ config: getPositionOffset(), isMobile, defaultValue: { x: 0, y: 0 } }),
        visibilityFn: getConfigByFormFactor({ config: getVisibilityFn(), isMobile, defaultValue: () => true }),
        theme: { ...getToolbarTheme(theme, name.toLowerCase()), ...theme },
        defaultTextAlignment: textAlignment,
        getEditorState,
        setEditorState,
        pluginButtons,
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
