import { translate } from 'react-i18next';
import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-common';
import EditIcon from '../icons/edit.svg';
import HtmlSettingsModal from './HtmlSettings';
import SettingsModal from './SettingsModal';
import EditPanel from './HtmlEditPanel';

export default({ t }) => {
  return [
  //the icons in the toolbar are the following:
  // Edit - open a small dialog that has an option to add src for the iframe or code
    {
      keyName: 'edit',
      type: BUTTONS.INLINE_PANEL,
      panelContent: translate(null)(EditPanel),
      icon: EditIcon,
      tooltipTextKey: 'EditButton_Tooltip',
    },
    { type: BUTTONS.SEPARATOR },
    {
      type: BUTTONS.WIDTH,
      min: 35,
      max: 940,
    },
    {
      keyName: 'height',
      type: BUTTONS.HEIGHT,
      min: 35,
      max: 1200,
    },
    { type: BUTTONS.SEPARATOR },
    {
      keyName: 'settings',
      type: BUTTONS.PANEL,
      panelContent: translate(null)(SettingsModal),
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
    },
    {
      keyName: 'external_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      modalElement: HtmlSettingsModal,
      icon: PluginSettingsIcon,
      onClick: pubsub => console.log('*** click external settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE },
  ];
};
