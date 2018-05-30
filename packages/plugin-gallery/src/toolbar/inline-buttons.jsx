import { BUTTONS, PluginSettingsIcon, getModalStyles } from 'wix-rich-content-common';
import { Modals } from '../modals';
import AddIcon from '../icons/toolbar/icon-upload.svg';
import ManageMediaIcon from '../icons/manageMedia.svg';
import { galleryLayoutsDropdown, switchLayout, getCurrentLayout } from '../helpers';

const modalStyles = getModalStyles();

export default({ t }) => {
  return [
    {
      keyName: 'add',
      type: BUTTONS.FILES,
      icon: AddIcon,
      onFilesSelected: (pubsub, files) => {
        if (files.length > 0) {
          const handleFilesSelected = pubsub.store.get('handleFilesSelected');
          handleFilesSelected(files);
        }
      },
      mobile: false,
      multiple: true,
      tooltipTextKey: 'UploadMediaButton_Tooltip',
      dataHook: 'gallery_file_input',
    },
    { type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'layout',
      type: BUTTONS.DROPDOWN,
      options: galleryLayoutsDropdown(t),
      onChange: switchLayout,
      getValue: getCurrentLayout,
      mobile: true,
      dataHook: 'gallery_layouts_dropdown'
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
      icon: ManageMediaIcon,
      modalName: Modals.GALLERY_SETTINGS,
      activeTab: 'manage_media',
      modalStyles,
      t,
      mobile: true,
      tooltipTextKey: 'ManageMediaButton_Tooltip',
    },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalName: Modals.GALLERY_SETTINGS,
      activeTab: 'advanced_settings',
      modalStyles,
      switchLayout,
      t,
      mobile: false,
      tooltipTextKey: 'SettingsButton_Tooltip',
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
