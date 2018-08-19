import { DEFAULTS } from '../soundcloud';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import soundcloudURLInputModal from './soundcloudURLInputModal';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'Soundcloud',
      tooltipText: t('SoundCloudPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: soundcloudURLInputModal,
      modalStyles: getModalStyles({ fullScreen: false }),
      helpers,
    },
  ];
};
