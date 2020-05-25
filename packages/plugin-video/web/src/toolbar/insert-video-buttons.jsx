import { DEFAULTS } from '../video-component';
// @flow
import {
  getModalStyles,
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import VideoSelectionInputModal from './videoSelectionInputModal';
import { InsertPluginIcon } from '../icons';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t, settings, isMobile }) => {
  //apply the extended input modal styles if handleFileSelection is avilable in plugin config
  //& on mobile if enableCustomUploadOnMobile is set to true, otherwise the normal modal styles is applied
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const customStyles =
    (!isMobile || settings.enableCustomUploadOnMobile) &&
    (settings.handleFileSelection || settings.handleFileUpload)
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;
  return [
    {
      type: BUTTON_TYPES.MODAL,
      name: 'VideoPlugin_InsertButton',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(VideoSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
      helpers,
    },
  ];
};

export default createInsertButtons;
