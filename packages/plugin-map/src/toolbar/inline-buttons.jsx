import {
  BUTTONS,
  getModalStyles,
  PluginSettingsIcon,
  SizeSmallCenterIcon,
} from 'wix-rich-content-common';
import { MapSettingsModal } from './MapSettingsModal';
import get from 'lodash/get';
import { DEFAULTS } from '../constants';

const getAlignmentButtonProps = ({ store, componentData }) => {
  const MAX_ALIGNMENT_WIDTH = 739;
  const bounds = store.get('editorBounds');
  const maxAlignmentWidth = bounds ? bounds.width - 1 : MAX_ALIGNMENT_WIDTH;
  return {
    disabled: get(componentData, 'config.width', 0) > maxAlignmentWidth,
  };
};

export default ({ settings, t, helpers }) => {
  const { maxWidth, minWidth, maxHeight, minHeight } = settings;

  return [
    {
      type: BUTTONS.WIDTH,
      keyName: 'width',
      min: minWidth || DEFAULTS.minWidth,
      mapStoreDataToPanelProps: ({ store }) => {
        const bounds = store.get('editorBounds');
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
      mapStoreDataToButtonProps: getAlignmentButtonProps,
      mobile: false,
    },
    {
      type: BUTTONS.ALIGNMENT_CENTER,
      keyName: 'alignCenter',
      icon: SizeSmallCenterIcon,
      mobile: false,
    },
    {
      keyName: 'sizeSmallRight',
      type: BUTTONS.SIZE_SMALL_RIGHT,
      mapStoreDataToButtonProps: getAlignmentButtonProps,
      mobile: false,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalElement: MapSettingsModal,
      modalStyles: getModalStyles(),
      mobile: true,
      tooltipTextKey: 'MapPluginButton_Settings_Tooltip',
      helpers,
      t,
      settings,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
