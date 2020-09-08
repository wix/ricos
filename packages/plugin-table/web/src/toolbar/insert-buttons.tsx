import { getDefaultsSettings } from '../defaults';
import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';
import tableSettingsModal from './tableSettingsModal';
import { DesktopFlyOutModalStyles } from '../consts';

const createInsertButtons: CreateInsertButtons<'t' | 'settings' | 'isMobile'> = ({
  t,
  settings,
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.MODAL,
      name: 'table_InsertButton',
      getLabel: () => t('table_InsertButton'),
      tooltip: t('table_Tooltip'),
      getIcon: () => icon,
      isActive: () => false,
      isDisabled: () => false,
      componentData: getDefaultsSettings(),
      modalElement: decorateComponentWithProps(tableSettingsModal, settings),
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalStylesFn: ({ buttonRef, toolbarName }) => {
        return getBottomToolbarModalStyles(
          buttonRef,
          {
            customStyles: DesktopFlyOutModalStyles,
          },
          toolbarName
        );
      },
    },
  ];
};
export default createInsertButtons;
