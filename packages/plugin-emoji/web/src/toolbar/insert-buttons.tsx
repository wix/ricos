import { DesktopFlyOutModalStyles } from '../constants';
import {
  TOOLBARS,
  BUTTON_TYPES,
  INSERT_PLUGIN_BUTTONS,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import EmojiPreviewModal from './emojiPreviewModal';
import EmojiPluginIcon from '../icons/EmojiPluginIcon';
import {
  CreateInsertButtons,
  TranslationFunction,
  PluginConfig,
  GetEditorState,
  SetEditorState,
} from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons = ({
  t,
  isMobile,
  settings,
  getEditorState,
  setEditorState,
}: {
  t: TranslationFunction;
  settings: PluginConfig;
  isMobile: boolean;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || EmojiPluginIcon;

  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: INSERT_PLUGIN_BUTTONS.EMOJI,
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
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER, TOOLBARS.SIDE],
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
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE],
    },
  ];
};

export default createInsertButtons;
