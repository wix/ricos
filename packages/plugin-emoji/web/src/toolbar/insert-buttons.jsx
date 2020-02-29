import { DesktopFlyOutModalStyles } from '../constants';
import {
  TOOLBARS,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
  DECORATION_MODE,
} from 'wix-rich-content-editor-common';
import EmojiPreviewModal from './emojiPreviewModal';
import Arrow from './arrow';
import EmojiPluginIcon from '../icons/EmojiPluginIcon.svg';

export default ({ helpers, t, settings, getEditorState, setEditorState }) => {
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
        return getBottomToolbarModalStyles(buttonRef, {
          customStyles: DesktopFlyOutModalStyles,
        });
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
