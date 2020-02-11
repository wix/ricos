import { DEFAULTS, MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import {
  getModalStyles,
  TOOLBARS,
  DECORATION_MODE,
  decorateComponentWithProps,
  getBottomModalStyles,
} from 'wix-rich-content-editor-common';
import GiphyApiInputModal from './giphyApiInputModal';
import { InsertPluginIcon, InsertPluginMobileIcon } from '../icons';
import Arrow from './arrow';

export default ({ helpers, t, settings, isMobile }) => {
  const Icon =
    settings?.toolbar?.icons?.InsertPluginButtonIcon ||
    (isMobile ? InsertPluginMobileIcon : InsertPluginIcon);
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
        const { modalStyles, contentStyles } = getBottomModalStyles(buttonRef, {
          customStyles: DesktopFlyOutModalStyles,
          fullScreen: true,
          isMobile,
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
