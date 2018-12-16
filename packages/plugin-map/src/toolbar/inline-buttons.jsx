import {
  BUTTONS,
  getModalStyles,
  PluginSettingsIcon,
  WixUtils,
  SizeSmallCenterIcon,
  DECORATION_MODE,
  decorateComponentWithProps
} from 'wix-rich-content-common';
import MapSettingsModal from './mapSettingsModal';
import { MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import Arrow from './arrow';

export default ({ settings, t, helpers }) => {
  const { maxWidth, minWidth, maxHeight, minHeight, minZoom, maxZoom } = settings;

  return [
    {
      type: BUTTONS.HEIGHT,
      keyName: 'height',
      min: minHeight,
      max: maxHeight,
      inputMax: maxHeight,
    },
    {
      type: BUTTONS.WIDTH,
      keyName: 'width',
      min: minWidth,
      mapStoreDataToPanelProps: ({ store }) => {
        const bounds = store.get('editorBounds');
        if (bounds && bounds.width) {
          return { max: maxWidth ? Math.min(maxWidth, bounds.width) : bounds.width };
        } else {
          return { max: maxWidth || maxWidth };
        }
      }
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { type: BUTTONS.ALIGNMENT_CENTER, keyName: 'alignCenter', icon: SizeSmallCenterIcon, mobile: false },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalElement: decorateComponentWithProps(MapSettingsModal, settings),
      modalStyles: WixUtils.isMobile() ?
        getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true }) : null,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({ customStyles: DesktopFlyOutModalStyles, fullScreen: true });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 120;
        const modalTop = top > 475 ? top - 485 : top + 30;
        return { ...modalStyles, content: { ...modalStyles.content, top: modalTop, left: modalLeft, margin: 0, position: 'absolute' } };
      },
      modalDecorations: [{
        decorationMode: DECORATION_MODE.APPEND,
        decorator: Arrow
      }],
      mobile: true,
      tooltipTextKey: 'MapPluginButton_Settings_Tooltip',
      helpers,
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
