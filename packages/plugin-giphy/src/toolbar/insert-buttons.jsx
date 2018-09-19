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
    top: 200,
    left: 200
  }
};
const icon = WixUtils.isMobile() ? InsertPluginIconMobile : InsertPluginIcon;

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'GIF',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: GiphyApiInputModal,
      modalStyles: getModalStyles({ customStyles: mobileFullScreenCustomStyle, fullScreen: true, isFlyOutModal: true }),
      isFlyOutModal: true,
      helpers
    }
  ];
};
