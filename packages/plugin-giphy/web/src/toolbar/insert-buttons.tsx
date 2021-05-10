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
  INSERT_PLUGIN_BUTTONS,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { GiphyPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: GiphyPluginEditorConfig;
  isMobile: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;

  const modalStylesByToolbar = {
    [TOOLBARS.FOOTER]: isMobile
      ? getModalStyles({
          customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE,
          fullScreen: true,
          isMobile,
        })
      : undefined,
    [TOOLBARS.INSERT_PLUGIN]: isMobile
      ? getModalStyles({
          customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE,
          fullScreen: true,
          isMobile,
        })
      : getModalStyles({ customStyles: EXTERNAL_POPUP_STYLES, fullScreen: false, isMobile }),
  };

  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: INSERT_PLUGIN_BUTTONS.GIF,
    tooltip: t('GiphyPlugin_InsertButton_Tooltip'),
    getIcon: () => icon,
    componentData: settings.componentDataDefaults || DEFAULTS,
    modalElement: decorateComponentWithProps(GiphyApiInputModal, settings),
  };

  return [
    {
      ...buttonProps,
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER, TOOLBARS.SIDE, TOOLBARS.MOBILE],
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
    },
    {
      ...buttonProps,
      toolbars: [TOOLBARS.INSERT_PLUGIN],
      modalStyles: modalStylesByToolbar[TOOLBARS.INSERT_PLUGIN],
    },
  ];
};

export default createInsertButtons;
