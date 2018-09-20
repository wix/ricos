import { DEFAULTS } from '../constants';
import { getModalStyles, TOOLBARS, WixUtils } from 'wix-rich-content-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon, InsertPluginIconMobile } from '../icons';

const mobileFullScreenCustomStyle = {
  overlay: {
    backgroundColor: 'transparent'
  },
  content: {
    overflow: 'hidden',
    top: 0,
    left: 0,
    paddingRight: '6px'
  }
};

let icon, modalStyles;
if (WixUtils.isMobile()) {
  icon = InsertPluginIconMobile;
  modalStyles = getModalStyles({ customStyles: mobileFullScreenCustomStyle, fullScreen: true });
}
else {
  icon = InsertPluginIcon;
  modalStyles = getModalStyles({ isFlyOutModal: true });
}

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'GIF',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER],
      modalElement: GiphyApiInputModal,
      modalStyles: modalStyles,
      isFlyOutModal: true,
      helpers
    }
  ];
};
