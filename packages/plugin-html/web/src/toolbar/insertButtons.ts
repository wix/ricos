import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon, AdsenseIcon } from '../icons';
import { htmlButtonsTypes, adsenseDefaults, defaults } from '../constants';

const createInsertButtons: CreateInsertButtons = ({ helpers, t, settings }) => {
  const { exposeButtons = [htmlButtonsTypes.html], siteDomain } = settings;
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const index = exposeButtons.indexOf(htmlButtonsTypes.adsense);
  if (!siteDomain && index > -1) {
    exposeButtons.splice(index, 1);
  }
  const buttonsMap = {
    [htmlButtonsTypes.html]: {
      name: 'HTMLCodePlugin_InsertButton',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: defaults(),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
    [htmlButtonsTypes.adsense]: {
      name: 'AdSensePlugin_InsertButton',
      tooltipText: t('AdSensePlugin_InsertButton_Tooltip'),
      Icon: AdsenseIcon,
      componentData: adsenseDefaults(),
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      section: 'BlockToolbar_Section_Embed_Anywhere',
    },
  };
  return exposeButtons.map(buttonType => buttonsMap[buttonType]);
};

export default createInsertButtons;
