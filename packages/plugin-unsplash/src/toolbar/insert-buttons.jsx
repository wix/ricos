import {
  TOOLBARS,
  DECORATION_MODE,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-common';
import { DEFAULTS, MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import UnsplashApiInputModal from './unsplashApiInputModal';
import Arrow from './arrow';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings, componentData, insertToolbars, isMobile }) => {
  return [
    {
      type: 'modal',
      name: 'PhotosByUnsplash',
      tooltipText: isMobile
        ? t('UnsplashPlugin_InsertButton_Tooltip_Mobile')
        : t('UnsplashPlugin_InsertButton_Tooltip_Desktop'),
      mobile: true,
      Icon: InsertPluginIcon,
      componentData: componentData || DEFAULTS,
      toolbars: insertToolbars || [TOOLBARS.FOOTER],
      modalElement: decorateComponentWithProps(UnsplashApiInputModal, { ...settings, isMobile }),
      modalStyles: isMobile
        ? getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true })
        : null,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
        });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 65;
        const modalTop = top - 386;
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
