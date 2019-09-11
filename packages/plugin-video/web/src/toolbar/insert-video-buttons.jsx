import { DEFAULTS } from '../video-component';
// flow
import { getModalStyles, TOOLBARS, decorateComponentWithProps } from 'wix-rich-content-common';
import VideoSelectionInputModal from './videoSelectionInputModal';
import { InsertPluginIcon } from '../icons';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t, settings, isMobile }) => {
  //apply the extended input modal styles if handleFileSelection is avilable in plugin config
  //& on mobile if enableCustomUploadOnMobile is set to true, otherwise the normal modal styles is applied
  const customStyles =
    (!isMobile || settings.enableCustomUploadOnMobile) && settings.handleFileSelection
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
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
