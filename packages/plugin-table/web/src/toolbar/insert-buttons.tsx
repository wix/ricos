import { getDefaultsSettings } from '../defaults';
import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, TranslationFunction, PluginConfig } from 'wix-rich-content-common';
import tableSettingsModal from './tableSettingsModal';
import { DesktopFlyOutModalStyles, MOBILE_FULL_SCREEN_CUSTOM_STYLE } from '../consts';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.MODAL,
      name: 'TablePlugin_InsertButton',
      getLabel: () => t('TablePlugin_InsertButton'),
      tooltip: t('TablePlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      isActive: () => false,
      isDisabled: () => false,
      componentData: getDefaultsSettings(),
      modalElement: decorateComponentWithProps(tableSettingsModal, { ...settings, isMobile }),
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
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
      modalStyles: isMobile
        ? getModalStyles({
            customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE,
            fullScreen: true,
            isMobile,
          })
        : undefined,
    },
  ];
};

export default createInsertButtons;
