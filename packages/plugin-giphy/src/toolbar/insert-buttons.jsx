import { DEFAULTS } from '../constants';
import { getModalStyles, TOOLBARS, WixUtils } from 'wix-rich-content-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon, InsertPluginMobileIcon } from '../icons';

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

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'GIF',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon: WixUtils.isMobile() ? InsertPluginMobileIcon : InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER],
      modalElement: GiphyApiInputModal,
      modalStyles: WixUtils.isMobile() ?
        getModalStyles({ customStyles: mobileFullScreenCustomStyle, fullScreen: true }) : getModalStyles({ isFlyOutModal: true }),
      isFlyOutModal: true,
      helpers
    }
  ];
};
