import { DEFAULTS } from '../video-component';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import VideoURLInputModal from './videoURLInputModal';
import { InsertPluginIcon } from '../icons';

const modalCustomStyle = {
  content:
  {
    maxWidth: '460px',
    minHeight: '262px'
  }
};

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: VideoURLInputModal,
      modalStyles: getModalStyles({ customStyles: modalCustomStyle, fullScreen: false, inline: false }),
      // modalStylesFn: ({ buttonRef }) => {
      //   const modalStyles = getModalStyles({ customStyles: modalCustomStyle, fullScreen: false });
      //   const { top, left } = buttonRef.getBoundingClientRect();
      //   const modalTop = top > 172 ? top - 172 : top + 172;
      //   return { ...modalStyles, content: { ...modalStyles.content, top: modalTop, left, margin: 0, position: 'absolute' } };
      // },
      helpers,
    },
  ];
};
