import { BUTTONS, getModalStyles, PluginSettingsIcon } from 'wix-rich-content-common';
import { Modals } from '../modals';
import ButtonInputModal from './buttonInputModal';

const custumStyleSettingModal = {
  content:
  {
    padding: '20px',
    maxWidth: '350px',
  }
}
export default ({ t, anchorTarget, relValue, styles }) => {
  return [
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalName: Modals.BUTTON_SETING,
      activeTab: 'advanced_settings',
      modalElement: ButtonInputModal,
      modalStyles: getModalStyles({ customStyles: custumStyleSettingModal }),
      mobile: false,
      tooltipTextKey: 'SettingsButton_Tooltip',
      anchorTarget,
      relValue
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};