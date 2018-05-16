import {
  SizeLargeIcon,
  SizeMediumIcon,
  SizeSmallIcon,
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
} from 'wix-rich-content-common';

import {
  DEFAULTS,
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
  ALIGN_LEFT,
  ALIGN_CENTER,
  ALIGN_RIGHT
} from '../constants';

export const getType = (componentData = {}) =>
  componentData.type || DEFAULTS.type;

export const getConfigFromStore = store =>
  getConfig(store.get('componentData'));

export const getConfig = (componentData = {}) => {
  const config = componentData.config || {};
  if (!config.size) {
    config.size = DEFAULTS.config.size;
  }
  if (!config.alignment) {
    config.alignment = DEFAULTS.config.alignment;
  }
  return config;
};

export const isAligmentDisabled = (componentData = {}) =>
  getConfig(componentData).size === SIZE_LARGE;

export const getNextValue = (array, currentValue) =>
  array[(array.indexOf(currentValue) + 1) % array.length];

export const getNextSizeIcon = componentData => {
  const { size } = getConfig(componentData);
  return {
    [SIZE_LARGE]: SizeMediumIcon,
    [SIZE_MEDIUM]: SizeSmallIcon,
    [SIZE_SMALL]: SizeLargeIcon,
  }[size];
};

export const getNextAlignmentIcon = componentData => {
  const { alignment } = getConfig(componentData);
  return {
    [ALIGN_LEFT]: AlignmentLeftIcon,
    [ALIGN_CENTER]: AlignmentCenterIcon,
    [ALIGN_RIGHT]: AlignmentRightIcon,
  }[alignment];
};
