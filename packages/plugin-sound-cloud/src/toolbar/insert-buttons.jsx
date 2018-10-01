import { DEFAULTS } from '../soundCloud';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import SoundCloudURLInputModal from './soundCloudURLInputModal';
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
      name: 'soundCloud',
      tooltipText: t('SoundCloudPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: SoundCloudURLInputModal,
      modalStyles: getModalStyles({ customStyles: modalCustomStyle, fullScreen: false }),
      helpers,
    },
  ];
};
