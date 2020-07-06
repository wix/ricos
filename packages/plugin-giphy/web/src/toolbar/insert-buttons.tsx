import { DEFAULTS, MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import {
  getModalStyles,
  TOOLBARS,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon, InsertPluginMobileIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'helpers' | 't' | 'settings' | 'isMobile'> = ({
  helpers,
  t,
  settings,
  isMobile,
}) => {
  const Icon =
    settings?.toolbar?.icons?.InsertPluginButtonIcon ||
    (isMobile ? InsertPluginMobileIcon : InsertPluginIcon);
  const modalStyles = isMobile
    ? getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true, isMobile })
    : null;
  return [
    {
      type: 'modal',
      name: 'GIFPlugin_InsertButton',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon,
      componentData: settings.componentDataDefaults || DEFAULTS,
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(GiphyApiInputModal, settings),
      modalStyles,
      modalStylesFn: ({ buttonRef, toolbarName }) => {
        return getBottomToolbarModalStyles(
          buttonRef,
          {
            customStyles: DesktopFlyOutModalStyles,
            isMobile,
          },
          toolbarName
        );
      },
      helpers,
    },
  ];
};

export default createInsertButtons;
