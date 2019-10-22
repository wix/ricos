import {
  BUTTONS,
  getModalStyles,
  PluginSettingsIcon,
  SizeSmallCenterIcon,
} from 'wix-rich-content-common';
import { MapSettingsModal } from './MapSettingsModal';
import { get } from 'lodash';
import { DEFAULTS } from '../constants';

const getAlignmentButtonPropsFn = getEditorBounds => ({ componentData }) => {
  const MAX_ALIGNMENT_WIDTH = 739;
  const editorBounds = getEditorBounds();
  const maxAlignmentWidth = editorBounds ? editorBounds.width - 1 : MAX_ALIGNMENT_WIDTH;
  return {
    disabled: get(componentData, 'config.width', 0) > maxAlignmentWidth,
  };
};

export default ({ settings, t, helpers, getEditorBounds, isMobile }) => {
  const { maxWidth, minWidth, maxHeight, minHeight } = settings;

  return [
    {
      type: BUTTONS.WIDTH,
      getEditorBounds,
      keyName: 'width',
      min: minWidth || DEFAULTS.minWidth,
      mapStoreDataToPanelProps: () => {
        const bounds = getEditorBounds();
        if (bounds && bounds.width) {
          return { max: maxWidth ? Math.min(maxWidth, bounds.width) : bounds.width };
        } else {
          return { max: maxWidth || DEFAULTS.maxWidth };
        }
      },
    },
    {
      type: BUTTONS.HEIGHT,
      keyName: 'height',
      min: minHeight || DEFAULTS.minHeight,
      max: maxHeight || DEFAULTS.maxHeight,
      inputMax: maxHeight || DEFAULTS.maxHeight,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'sizeSmallLeft',
      type: BUTTONS.SIZE_SMALL_LEFT,
      mapStoreDataToButtonProps: getAlignmentButtonPropsFn(getEditorBounds),
      mobile: false,
    },
    {
      type: BUTTONS.TEXT_ALIGN_CENTER,
      keyName: 'alignCenter',
      icon: SizeSmallCenterIcon,
      mobile: false,
    },
    {
      keyName: 'sizeSmallRight',
      type: BUTTONS.SIZE_SMALL_RIGHT,
      mapStoreDataToButtonProps: getAlignmentButtonPropsFn(getEditorBounds),
      mobile: false,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalElement: MapSettingsModal,
      modalStyles: getModalStyles({ isMobile }),
      mobile: true,
      tooltipTextKey: 'MapPluginButton_Settings_Tooltip',
      helpers,
      t,
      settings,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
