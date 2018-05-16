import { translate } from 'react-i18next';
import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-common';
import EditIcon from '../icons/icon-edit.svg';
import WidthIcon from '../icons/width.svg';
import HeightIcon from '../icons/height.svg';
import HTMLSettingsModal from './HTMLSettings';
import SettingsModal from './SettingsModal';
import EditModal from './EditModal';

export default({ t }) => {
  return [
  //the icons in the toolbar are the following:
  // Edit - open a small dialog that has an option to add src for the iframe or code
    {
      keyName: 'edit',
      type: BUTTONS.PANEL,
      panelElement: translate(null)(EditModal),
      icon: EditIcon,
      onClick: pubsub => console.log('*** click edit *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'EditButton_Tooltip',
    },
    { type: BUTTONS.SEPARATOR },
    {
      keyName: 'width',
      type: BUTTONS.PANEL,
      panelElement: translate(null)(SettingsModal),
      icon: WidthIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      tooltipTextKey: 'HtmlPlugin_Width',
    },
    {
      keyName: 'height',
      type: BUTTONS.PANEL,
      panelElement: translate(null)(SettingsModal),
      icon: HeightIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      tooltipTextKey: 'HtmlPlugin_Height',
    },
    { type: BUTTONS.SEPARATOR },
    {
      keyName: 'settings',
      type: BUTTONS.PANEL,
      panelElement: translate(null)(SettingsModal),
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
    },
    {
      keyName: 'external_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      modalElement: HTMLSettingsModal,
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click external settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE },
  ];
};
