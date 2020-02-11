import { DesktopFlyOutModalStyles } from '../constants';
import {
  TOOLBARS,
  decorateComponentWithProps,
  getBottomModalStyles,
  DECORATION_MODE,
} from 'wix-rich-content-editor-common';
import EmojiPreviewModal from './emojiPreviewModal';
import Arrow from './arrow';
import EmojiPluginIcon from '../icons/EmojiPluginIcon.svg';

export default ({ helpers, t, settings, getEditorState, setEditorState, isMobile }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || EmojiPluginIcon;

  return [
    {
      type: 'modal',
      name: 'EMOJI',
      tooltipText: t('EmojiPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: settings.componentDataDefaults || {},
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER],
      modalElement: decorateComponentWithProps(EmojiPreviewModal, {
        getEditorState,
        setEditorState,
        ...settings,
      }),
      modalStylesFn: ({ buttonRef }) => {
        const { modalStyles, contentStyles } = getBottomModalStyles(buttonRef, isMobile, {
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
        });

        return {
          ...modalStyles,
          content: {
            ...modalStyles.content,
            ...contentStyles,
          },
        };
      },
      modalDecorations: [
        {
          decorationMode: DECORATION_MODE.APPEND,
          decorator: Arrow,
        },
      ],
      helpers,
    },
  ];
};
