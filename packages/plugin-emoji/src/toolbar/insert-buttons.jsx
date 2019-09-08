import { DEFAULTS, MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import { TOOLBARS, decorateComponentWithProps, getModalStyles } from 'wix-rich-content-common';
import EmojiPreviewModal from './emojiPreviewModal';
import { EmojiPluginIcon } from '../icons';

export default ({ helpers, t, settings, isMobile, getEditorState, setEditorState }) => {
  return [
    {
      type: 'modal',
      name: 'EMOJI',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon: EmojiPluginIcon,
      componentData: settings.componentDataDefaults || DEFAULTS,
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(EmojiPreviewModal, {
        getEditorState,
        setEditorState,
        ...settings,
      }),
      modalStyles: isMobile
        ? getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true })
        : null,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
        });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 15;
        const modalTop = top - 395;
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
