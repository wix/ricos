import { DEFAULTS } from '../video-component';
import { getModalStyles, TOOLBARS, decorateComponentWithProps, WixUtils } from 'wix-rich-content-common';
import VideoURLInputModal from './videoSelectionInputModal';
import { InsertPluginIcon } from '../icons';
import { InputModalCustomStyle, ExtendedInputModalCustomStyle } from './inputModalStyles';

export default ({ helpers, t, settings }) => {
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(VideoURLInputModal, settings),
      modalStyles: getModalStyles({
        customStyles: (settings.handleFileSelection) ? ExtendedInputModalCustomStyle : InputModalCustomStyle,
        fullScreen: false
      }),
      helpers,
    },
  ];
};
