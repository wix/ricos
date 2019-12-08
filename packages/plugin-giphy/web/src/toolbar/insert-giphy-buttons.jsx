import { get } from 'lodash';
import { DEFAULTS, MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import {
  getModalStyles,
  TOOLBARS,
  DECORATION_MODE,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon, InsertPluginMobileIcon } from '../icons';
import Arrow from './arrow';

export default ({ helpers, t, settings, isMobile }) => {
  const Icon = get(
    settings,
    'toolbar.icons.GIF',
    isMobile ? InsertPluginMobileIcon : InsertPluginIcon
  );
  const modalStyles = isMobile
    ? getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true, isMobile })
    : null;
  return [
    {
      type: 'modal',
      name: 'GIF',
      tooltipText: t('GiphyPlugin_InsertButton_Tooltip'),
      Icon,
      componentData: settings.componentDataDefaults || DEFAULTS,
      toolbars: settings.insertToolbars || [TOOLBARS.FOOTER],
      modalElement: decorateComponentWithProps(GiphyApiInputModal, settings),
      modalStyles,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
          isMobile,
        });
        const { top, left, right } = buttonRef.getBoundingClientRect();
        const isRtl = buttonRef.closest('[dir=rtl]') !== null;
        let modalLeft, modalRight;
        if (isRtl) {
          modalRight = window.innerWidth - right - 8;
        } else {
          modalLeft = left - 15;
        }
        const isAboveButton = top - 365 > 0;
        const modalTop = isAboveButton ? top - 365 : top + 30;
        return {
          ...modalStyles,
          content: {
            ...modalStyles.content,
            top: modalTop,
            left: modalLeft,
            right: modalRight,
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
