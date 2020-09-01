import {
  BUTTONS,
  getModalStyles,
  PluginSettingsIcon,
  decorateComponentWithProps,
} from 'wix-rich-content-plugin-commons';
import { Modals } from '../modals';
import ButtonInputModal from './buttonInputModal';
import { CreateInlineButtons } from 'wix-rich-content-common';

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

const createInlineButtons: CreateInlineButtons<'settings' | 'isMobile'> = ({
  settings,
  isMobile,
}) => {
  const customStyles = isMobile ? MobileFullScreenCustomStyle : DesktopCustomModalStyles;
  const icon = settings?.toolbar?.icons?.['advanced_settings'] || PluginSettingsIcon;
  return [
    { keyName: 'alignLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.SIZE_CONTENT_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
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

export default createInlineButtons;
