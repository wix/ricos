import { DEFAULTS } from '../video-component';
import {
  getModalStyles,
  TOOLBARS,
  INSERT_PLUGIN_BUTTONS,
  BUTTON_TYPES,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import VideoSelectionInputModal from './videoSelectionInputModal';
import { InsertPluginIcon } from '../icons';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { VideoPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: VideoPluginEditorConfig;
  isMobile: boolean;
}) => {
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
      name: INSERT_PLUGIN_BUTTONS.VIDEO,
      tooltip: t('VideoPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(VideoSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
    },
  ];
};

export default createInsertButtons;
