import {
  BUTTONS,
  getModalStyles,
  PluginSettingsIcon,
  decorateComponentWithProps,
} from 'wix-rich-content-common';
import { Modals } from '../modals';
import ButtonInputModal from './buttonInputModal';
import { get } from 'lodash';

const DesktopCustomModalStyles = {
  content: {
    width: '420px',
  },
};

const MobileFullScreenCustomStyle = {
  content: {
    width: '100vw',
  },
};

export default ({ settings, isMobile }) => {
  const customStyles = isMobile ? MobileFullScreenCustomStyle : DesktopCustomModalStyles;
  const icons = get(settings, 'toolbar.icons') || {};
  return [
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.advanced_settings || PluginSettingsIcon,
      modalName: Modals.BUTTON_INPUT,
      activeTab: 'advanced_settings',
      modalElement: decorateComponentWithProps(ButtonInputModal, settings),
      modalStyles: getModalStyles({ customStyles, isMobile }),
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      settings,
      isMobile,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
