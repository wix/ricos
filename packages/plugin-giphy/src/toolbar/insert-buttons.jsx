import { DEFAULTS } from '../constants';
import { getModalStyles, TOOLBARS, WixUtils } from 'wix-rich-content-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon, InsertPluginIconMobile } from '../icons';

const mobileFullScreenCustomStyle = {
  overlay: {
    backgroundColor: 'transparent'
  },
  content: {
    margin: '200px',
    width: '265px',
    height: '367px',
    overflow: 'hidden',
    top: 0,
    left: 0
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
