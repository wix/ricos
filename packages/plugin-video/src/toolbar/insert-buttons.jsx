import { DEFAULTS } from '../video-component';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import VideoURLInputModal from './videoURLInputModal';
import { InsertPluginIcon } from '../icons';

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
      modalStyles: getModalStyles({ fullScreen: false }),
      helpers,
    },
  ];
};
