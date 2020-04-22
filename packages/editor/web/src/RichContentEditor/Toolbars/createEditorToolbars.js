import {
  simplePubsub,
  getToolbarTheme,
  TOOLBARS,
  DISPLAY_MODE,
  mergeToolbarSettings,
  isiOS,
} from 'wix-rich-content-editor-common';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import { MobileTextButtonList, DesktopTextButtonList } from './buttons';
import {
  reducePluginTextButtonNames,
  mergeButtonLists,
  reducePluginTextButtons,
} from './buttons/utils';
import { get } from 'lodash';

const appendSeparator = ({ mergedList, sourceList, buttonData, formFactor }) => {
  if (
    mergedList.length === sourceList.length &&
    (!buttonData.position ||
      buttonData.position[formFactor] === undefined ||
      buttonData.position[formFactor] < 0 ||
      buttonData.position[formFactor] > mergedList.length)
  ) {
    return [...mergedList, 'Separator'];
  }
  return mergedList;
};

const createEditorToolbars = ({ buttons, textAlignment, refId, context }) => {
  const { pluginsConfig = {}, getToolbarSettings = () => [] } = context.config;
  const { pluginButtons, pluginTextButtons } = buttons;

  const { isMobile, theme = {} } = context;

  const pubsub = simplePubsub();

  const textButtons = {
    mobile: mergeButtonLists(
      MobileTextButtonList,
      reducePluginTextButtonNames(pluginTextButtons, ({ isMobile }) => isMobile !== false),
      'mobile',
      appendSeparator
    ),
    desktop: mergeButtonLists(
      DesktopTextButtonList,
      reducePluginTextButtonNames(pluginTextButtons),
      'desktop',
      appendSeparator
    ),
  };

  const pluginTextButtonsByFormFactor = {
    mobile: reducePluginTextButtons(pluginTextButtons, ({ isMobile }) => isMobile !== false),
    desktop: reducePluginTextButtons(pluginTextButtons),
  };

  const defaultSettings = getDefaultToolbarSettings({
    pluginButtons,
    textButtons,
    pluginTextButtons: pluginTextButtonsByFormFactor,
  });
  const customSettings = getToolbarSettings({
    pluginButtons,
    textButtons,
    pluginTextButtons: pluginTextButtonsByFormFactor,
  });
  const toolbarSettings = mergeToolbarSettings({ defaultSettings, customSettings });
  const toolbars = {};
  const deviceName = !isMobile ? 'desktop' : isiOS() ? 'mobile.ios' : 'mobile.android';

  toolbarSettings
    .filter(({ name }) => name !== TOOLBARS.PLUGIN)
    .filter(({ shouldCreate }) => get(shouldCreate(), deviceName, true))
    .forEach(
      ({
        name,
        getButtons,
        getTextPluginButtons,
        getPositionOffset,
        getVisibilityFn,
        getInstance,
        getDisplayOptions,
        getToolbarDecorationFn,
        showSearch,
        splitToSections,
      }) => {
        toolbars[name] = getInstance({
          ...context,
          displayOptions: get(getDisplayOptions(), deviceName, {
            displayMode: DISPLAY_MODE.NORMAL,
          }),
          toolbarDecorationFn: get(getToolbarDecorationFn(), deviceName, () => null),
          textPluginButtons: get(getTextPluginButtons(), deviceName, []),
          offset: get(getPositionOffset(), deviceName, { x: 0, y: 0 }),
          visibilityFn: get(getVisibilityFn(), deviceName, () => true),
          buttons: get(getButtons(), deviceName, []),
          theme: { ...getToolbarTheme(theme, name.toLowerCase()), ...theme },
          defaultTextAlignment: textAlignment,
          pluginButtons,
          uiSettings: pluginsConfig.uiSettings,
          pubsub,
          refId,
          showSearch,
          splitToSections,
        });
      }
    );

  return toolbars;
};

export default createEditorToolbars;
