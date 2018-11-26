import { BUTTONS, getModalStyles, PluginSettingsIcon } from 'wix-rich-content-common';
import { Modals } from '../modals';
import ButtonInputModal from './buttonInputModal';

const custumStyleSettingModal = {
  content:
  {
    maxWidth: '420px',
  }
};

export default ({ }) => {
  return [
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: true },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: true },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: true },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalName: Modals.BUTTON_SETING,
      activeTab: 'advanced_settings',
      modalElement: ButtonInputModal,
      modalStyles: getModalStyles({ customStyles: custumStyleSettingModal }),
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      relValue: 'nofollow'
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
