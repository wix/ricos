import { DesktopFlyOutModalStyles } from '../constants';
import {
  TOOLBARS,
  decorateComponentWithProps,
  getModalStyles,
  DECORATION_MODE,
} from 'wix-rich-content-editor-common';
import EmojiPreviewModal from './emojiPreviewModal';
import Arrow from './arrow';
import { EmojiPluginIcon } from '../icons';

export default ({ helpers, t, settings, getEditorState, setEditorState }) => {
  return [
    {
      type: 'modal',
      name: 'EMOJI',
      tooltipText: t('EmojiPlugin_InsertButton_Tooltip'),
      Icon: EmojiPluginIcon,
      componentData: settings.componentDataDefaults || {},
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER],
      modalElement: decorateComponentWithProps(EmojiPreviewModal, {
        getEditorState,
        setEditorState,
        ...settings,
      }),
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
        });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 288;
        const isAboveButton = top - 293 > 0;
        const modalTop = isAboveButton ? top - 293 : top + 30;
        return {
          ...modalStyles,
          content: {
            ...modalStyles.content,
            top: modalTop,
            left: modalLeft,
            margin: 0,
            position: 'absolute',
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
