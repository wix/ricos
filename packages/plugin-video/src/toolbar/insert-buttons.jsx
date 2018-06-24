import { DEFAULTS } from '../video-component';
import { getModalStyles } from 'wix-rich-content-common';
import VideoURLInputModal from './videoURLInputModal';
import InsertPluginIcon from '../../statics/icons/insert-plugin.svg';

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      modalElement: VideoURLInputModal,
      modalStyles: getModalStyles({ fullScreen: false }),
      helpers,
    },
  ];
};
