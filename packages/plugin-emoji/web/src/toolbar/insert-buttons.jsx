import { DesktopFlyOutModalStyles } from '../constants';
import { TOOLBARS, decorateComponentWithProps, getModalStyles } from 'wix-rich-content-common';
import EmojiPreviewModal from './emojiPreviewModal';
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
        const modalLeft = left - 311;
        const modalTop = top - 287;
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
      helpers,
    },
  ];
};
