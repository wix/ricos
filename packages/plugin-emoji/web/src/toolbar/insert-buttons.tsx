import { DesktopFlyOutModalStyles } from '../constants';
import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import EmojiPreviewModal from './emojiPreviewModal';
import EmojiPluginIcon from '../icons/EmojiPluginIcon.svg';

export default ({ t, isMobile, settings, getEditorState, setEditorState }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || EmojiPluginIcon;

  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: 'EmojiPlugin_InsertButton',
    tooltip: t('EmojiPlugin_InsertButton_Tooltip'),
    getIcon: () => icon,
    componentData: settings.componentDataDefaults || {},
    modalElement: decorateComponentWithProps(EmojiPreviewModal, {
      getEditorState,
      setEditorState,
      ...settings,
    }),
  };

  return [
    {
      ...buttonProps,
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER],
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
    {
      ...buttonProps,
      modalStyles: getModalStyles({ fullScreen: false, isMobile }),
      toolbars: [TOOLBARS.EXTERNAL],
    },
  ];
};
