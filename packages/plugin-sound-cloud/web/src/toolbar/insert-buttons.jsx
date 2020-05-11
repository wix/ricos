import { DEFAULTS } from '../soundCloud';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-editor-common';
import SoundCloudURLInputModal from './soundCloudURLInputModal';
import { InsertPluginIcon } from '../icons';

let content = { maxWidth: '580px', minHeight: '348px' };

export default ({ helpers, t, isMobile, settings }) => {
  if (isMobile) {
    content = {
      ...content,
      minHeight: '100%',
      minWidth: '100%',
      margin: 0,
      alignContent: 'center',
      top: 0,
      transform: 'none',
    };
  }
  const customStyles = { content };
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: 'modal',
      name: 'SoundcloudPlugin_InsertButton',
      tooltipText: t('SoundCloudPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: SoundCloudURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
      helpers,
      section: 'BlockToolbar_Section_Embed_Social',
    },
  ];
};
