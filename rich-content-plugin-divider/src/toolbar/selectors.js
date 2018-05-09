import {
  DEFAULTS,
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
  ALIGN_LEFT,
  ALIGN_CENTER,
  ALIGN_RIGHT
} from '../constants';
import {
  SizeLargeIcon,
  SizeMediumIcon,
  SizeSmallIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon
} from '../icons';

export const getType = (componentData = {}) =>
  componentData.type || DEFAULTS.type;

export const getConfigFromStore = store =>
  getConfig(store.get('componentData'));

export const getConfig = (componentData = {}) => {
  const config = componentData.config || {};
  if (!config.dividerSize) {
    config.dividerSize = DEFAULTS.config.dividerSize;
  }
  if (!config.dividerAlignment) {
    config.dividerAlignment = DEFAULTS.config.dividerAlignment;
  }
  return config;
};

export const isAligmentDisabled = (componentData = {}) =>
  getConfig(componentData).dividerSize === SIZE_LARGE;

export const getNextValue = (array, currentValue) =>
  array[(array.indexOf(currentValue) + 1) % array.length];

export const getNextSizeIcon = componentData => {
  const { dividerSize } = getConfig(componentData);
  return {
    [SIZE_LARGE]: SizeMediumIcon,
    [SIZE_MEDIUM]: SizeSmallIcon,
    [SIZE_SMALL]: SizeLargeIcon,
  }[dividerSize];
};

export const getNextAlignmentIcon = componentData => {
  const { dividerAlignment } = getConfig(componentData);
  return {
    [ALIGN_LEFT]: AlignCenterIcon,
    [ALIGN_CENTER]: AlignRightIcon,
    [ALIGN_RIGHT]: AlignLeftIcon,
  }[dividerAlignment];
};
