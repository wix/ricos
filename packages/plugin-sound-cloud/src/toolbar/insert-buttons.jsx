import { DEFAULTS } from '../soundCloud';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import SoundCloudURLInputModal from './soundCloudURLInputModal';
import { InsertPluginIcon } from '../icons';

const customStyles = {
  content: {
    maxWidth: '460px',
    minHeight: '262px',
  },
};

export default ({ helpers, t, isMobile }) => {
  if (isMobile) {
    customStyles.content.minHeight = '202px';
  }

  return [
    {
      type: 'modal',
      name: 'SoundCloud',
      tooltipText: t('SoundCloudPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: SoundCloudURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
      helpers,
    },
  ];
};
