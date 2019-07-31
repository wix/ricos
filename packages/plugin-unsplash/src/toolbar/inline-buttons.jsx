import {
  BUTTONS,
  getModalStyles,
  DECORATION_MODE,
  decorateComponentWithProps,
  PluginSettingsIcon,
} from 'wix-rich-content-common';
import { MediaReplaceIcon } from '../icons';
import UnsplashApiInputModal from './unsplashApiInputModal';
import UnsplashImageSettingsModal from './unsplashImageSettingsModal';
import { MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import Arrow from './arrow';

const modalStyles = getModalStyles();

export default ({ t, settings, anchorTarget, relValue, uiSettings, isMobile }) => {
  const settingsModalProps = {
    anchorTarget,
    relValue,
    isMobile,
    ...settings,
    ...uiSettings,
  };

  return [
    { keyName: 'sizeOriginal', type: BUTTONS.SIZE_ORIGINAL, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalElement: decorateComponentWithProps(UnsplashImageSettingsModal, settingsModalProps),
      modalStyles,
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
    },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: MediaReplaceIcon,
      modalElement: decorateComponentWithProps(UnsplashApiInputModal, settings),
      modalStyles: isMobile
        ? getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true })
        : null,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
        });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 532;
        const modalTop = top > 357 ? top - 365 : top + 30;
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
      mobile: true,
      tooltipTextKey: 'ReplaceUnsplashButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
