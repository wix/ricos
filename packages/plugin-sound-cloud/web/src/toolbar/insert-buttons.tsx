import { DEFAULTS } from '../soundCloud';
import { getModalStyles, TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import SoundCloudURLInputModal from './soundCloudURLInputModal';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'isMobile' | 'settings'> = ({
  t,
  isMobile,
  settings,
}) => {
  const content = isMobile
    ? {
        maxWidth: 580,
        minHeight: '100%',
        minWidth: '100%',
        margin: 0,
        alignContent: 'center',
        top: 0,
        transform: 'none',
      }
    : { maxWidth: 580, minHeight: 348 };
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.MODAL,
      name: 'SoundcloudPlugin_InsertButton',
      tooltip: t('SoundCloudPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.EXTERNAL, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: SoundCloudURLInputModal,
      modalStyles: getModalStyles({ customStyles: { content }, fullScreen: false, isMobile }),
      section: 'BlockToolbar_Section_Embed_Social',
    },
  ];
};

export default createInsertButtons;
