import { BUTTONS, PluginSettingsIcon, getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import { ManageMediaIcon, UploadIcon } from '../icons';
import { galleryLayoutsDropdown, switchLayout, getCurrentLayout } from '../layout-helper';
import { CreateInlineButtons } from 'wix-rich-content-common';

const modalStyles = getModalStyles();

const createInlineButtons: CreateInlineButtons<'t' | 'anchorTarget' | 'relValue' | 'settings'> = ({
  t,
  anchorTarget,
  relValue,
  settings,
}) => {
  const icons = settings?.toolbar?.icons || {};
  return [
    {
      keyName: 'add',
      type: BUTTONS.FILES,
      icon: icons.add || UploadIcon,
      onFilesSelected: (pubsub, files) => {
        if (files.length > 0) {
          pubsub.getBlockHandler('handleFilesSelected')(files);
        }
      },
      mobile: false,
      multiple: true,
      tooltipTextKey: 'UploadMediaButton_Tooltip',
      settings,
    },
    { type: BUTTONS.SEPARATOR, mobile: false, keyName: 'separator0' },
    {
      keyName: 'layout',
      type: BUTTONS.DROPDOWN,
      options: galleryLayoutsDropdown(t),
      onChange: switchLayout,
      getValue: getCurrentLayout,
      mobile: true,
      tooltipTextKey: 'GalleryPlugin_Layout_Select_Tooltip',
      t,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator3', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'manage_media',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.manage_media || ManageMediaIcon,
      modalName: Modals.GALLERY_SETTINGS,
      activeTab: 'manage_media',
      modalStyles,
      t,
      mobile: true,
      tooltipTextKey: 'ManageMediaButton_Tooltip',
      anchorTarget,
      relValue,
      accept: settings.accept,
    },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.advanced_settings || PluginSettingsIcon,
      modalName: Modals.GALLERY_SETTINGS,
      activeTab: 'advanced_settings',
      modalStyles,
      switchLayout,
      t,
      mobile: false,
      tooltipTextKey: 'SettingsButton_Tooltip',
      anchorTarget,
      relValue,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
export default createInlineButtons;
