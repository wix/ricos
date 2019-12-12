import { DEFAULTS } from '../soundCloud';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-editor-common';
import SoundCloudURLInputModal from './soundCloudURLInputModal';
import { InsertPluginIcon } from '../icons';

const customStyles = {
  content: {
    maxWidth: '460px',
    minHeight: '262px',
  },
};

export default ({ helpers, t, isMobile, settings }) => {
  if (isMobile) {
    customStyles.content.minHeight = '202px';
  }
  const icon = settings?.toolbar?.icons?.SoundCloud || InsertPluginIcon;
  return [
    {
      type: 'modal',
      name: 'SoundCloud',
      tooltipText: t('SoundCloudPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: SoundCloudURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
      helpers,
    },
  ];
};
