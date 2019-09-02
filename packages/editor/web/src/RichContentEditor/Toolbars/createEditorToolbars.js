import {
  simplePubsub,
  getToolbarTheme,
  getConfigByFormFactor,
  TOOLBARS,
  DISPLAY_MODE,
  mergeToolbarSettings,
} from 'wix-rich-content-common';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import { MobileTextButtonList, DesktopTextButtonList } from './buttons';
import {
  reducePluginTextButtonNames,
  mergeButtonLists,
  reducePluginTextButtons,
} from './buttons/utils';

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

const createEditorToolbars = ({
  buttons,
  anchorTarget,
  relValue,
  textAlignment,
  helpers,
  isMobile,
  theme,
  getEditorState,
  setEditorState,
  getEditorBounds,
  t,
  refId,
  getToolbarSettings = () => [],
  uiSettings,
  config,
  locale,
}) => {
  const { pluginButtons, pluginTextButtons } = buttons;

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

  toolbarSettings
    .filter(({ name }) => name !== TOOLBARS.PLUGIN)
    .filter(({ shouldCreate }) =>
      getConfigByFormFactor({ config: shouldCreate(), isMobile, defaultValue: true })
    )
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
      }) => {
        toolbars[name] = getInstance({
          displayOptions: getConfigByFormFactor({
            config: getDisplayOptions(),
            isMobile,
            defaultValue: { displayMode: DISPLAY_MODE.NORMAL },
          }),
          toolbarDecorationFn: getConfigByFormFactor({
            config: getToolbarDecorationFn(),
            isMobile,
            defaultValue: () => null,
          }),
          textPluginButtons: getConfigByFormFactor({
            config: getTextPluginButtons(),
            isMobile,
            defaultValue: [],
          }),
          offset: getConfigByFormFactor({
            config: getPositionOffset(),
            isMobile,
            defaultValue: { x: 0, y: 0 },
          }),
          visibilityFn: getConfigByFormFactor({
            config: getVisibilityFn(),
            isMobile,
            defaultValue: () => true,
          }),
          buttons: getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] }),
          theme: { ...getToolbarTheme(theme, name.toLowerCase()), ...theme },
          defaultTextAlignment: textAlignment,
          getEditorBounds,
          getEditorState,
          setEditorState,
          pluginButtons,
          anchorTarget,
          uiSettings,
          relValue,
          isMobile,
          helpers,
          config,
          pubsub,
          locale,
          refId,
          t,
        });
      }
    );

  return toolbars;
};

export default createEditorToolbars;
