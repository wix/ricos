import { translate } from 'react-i18next';
import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-common';
import decorateComponentWithProps from 'decorate-component-with-props';
import EditIcon from '../icons/icon-edit.svg';
import WidthIcon from '../icons/width.svg';
import HeightIcon from '../icons/height.svg';
import HTMLSettingsModal from './HTMLSettings';
import SettingsModal from './SettingsModal';
import EditPanel from './HtmlEditPanel';
import SliderPanel from './SliderPanel';

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
      keyName: 'width',
      type: BUTTONS.PANEL,
      panelContent: decorateComponentWithProps(SliderPanel, {
        min: 35,
        max: 940,
        getValue: ({ componentData }) => componentData.config.width,
        onChange: ({ store }) => width => store.update('componentData', { config: { width } }),
      }),
      icon: WidthIcon,
      tooltipTextKey: 'HtmlPlugin_Width',
    },
    {
      keyName: 'height',
      type: BUTTONS.PANEL,
      panelContent: decorateComponentWithProps(SliderPanel, {
        min: 35,
        max: 1200,
        getValue: ({ componentData }) => componentData.config.height,
        onChange: ({ store }) => height => store.update('componentData', { config: { height } }),
      }),
      icon: HeightIcon,
      tooltipTextKey: 'HtmlPlugin_Height',
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
