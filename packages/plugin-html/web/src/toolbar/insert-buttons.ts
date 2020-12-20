import { INSERT_PLUGIN_BUTTONS, TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { InsertPluginIcon, AdsenseIcon } from '../icons';
import { htmlButtonsTypes, adsenseDefaults, defaults } from '../defaults';
import { CreateInsertButtons, TranslationFunction, Helpers } from 'wix-rich-content-common';
import { HtmlPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  helpers,
  t,
  settings,
}: {
  t: TranslationFunction;
  settings: HtmlPluginEditorConfig;
  helpers: Helpers;
}) => {
  const { exposeButtons = [htmlButtonsTypes.html], siteDomain } = settings;
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const index = exposeButtons.indexOf(htmlButtonsTypes.adsense);
  if (!siteDomain && index > -1) {
    exposeButtons.splice(index, 1);
  }
  const buttonsMap = {
    [htmlButtonsTypes.html]: {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.HTML,
      helpers,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      tooltip: t('HtmlPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData: defaults(false),
    },
    [htmlButtonsTypes.adsense]: {
      type: BUTTON_TYPES.BUTTON,
      name: 'AdSensePlugin_InsertButton',
      componentData: adsenseDefaults(),
      helpers,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      section: 'BlockToolbar_Section_Embed_Anywhere',
      tooltip: t('AdSensePlugin_InsertButton_Tooltip'),
      getIcon: () => AdsenseIcon,
    },
  };
  return exposeButtons.map(buttonType => buttonsMap[buttonType]);
};

export default createInsertButtons;
