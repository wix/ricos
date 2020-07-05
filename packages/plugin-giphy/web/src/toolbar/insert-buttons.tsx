import {
  DEFAULTS,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
  DESKTOP_FLY_OUT_MODAL_STYLES,
  EXTERNAL_POPUP_STYLES,
} from '../constants';
import {
  getModalStyles,
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings, isMobile }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;

  const modalStylesByToolbar = {
    [TOOLBARS.FOOTER]:
      isMobile &&
      getModalStyles({ customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE, fullScreen: true, isMobile }),
    [TOOLBARS.EXTERNAL]: isMobile
      ? getModalStyles({
          customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE,
          fullScreen: true,
          isMobile,
        })
      : getModalStyles({ customStyles: EXTERNAL_POPUP_STYLES, fullScreen: false, isMobile }),
  };

  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: 'GIFPlugin_InsertButton',
    tooltip: t('GiphyPlugin_InsertButton_Tooltip'),
    getIcon: () => icon,
    componentData: settings.componentDataDefaults || DEFAULTS,
    modalElement: decorateComponentWithProps(GiphyApiInputModal, settings),
  };

  return [
    {
      ...buttonProps,
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER],
      modalStyles: modalStylesByToolbar[TOOLBARS.FOOTER],
      modalStylesFn: ({ buttonRef, toolbarName }) => {
        return getBottomToolbarModalStyles(
          buttonRef,
          {
            customStyles: DESKTOP_FLY_OUT_MODAL_STYLES,
            isMobile,
          },
          toolbarName
        );
      },
      helpers,
    },
    {
      ...buttonProps,
      toolbars: [TOOLBARS.EXTERNAL],
      modalStyles: modalStylesByToolbar[TOOLBARS.EXTERNAL],
    },
  ];
};
