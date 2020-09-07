import {
  SizeLargeIcon,
  SizeMediumIcon,
  SizeSmallIcon,
  AlignCenterIcon,
} from 'wix-rich-content-plugin-commons';

import { AlignLeftIcon, AlignRightIcon } from 'wix-rich-content-editor-common';

import {
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
  ALIGN_LEFT,
  ALIGN_CENTER,
  ALIGN_RIGHT,
} from '../constants';

import { Divider } from '../domain/divider';

export const isAlignmentDisabled = (componentData = {}) =>
  new Divider(componentData).isAlignmentDisabled();

export const getNextSizeIcon = componentData => {
  const { size } = new Divider(componentData);
  return {
    [SIZE_LARGE]: SizeMediumIcon,
    [SIZE_MEDIUM]: SizeSmallIcon,
    [SIZE_SMALL]: SizeLargeIcon,
  }[size];
};

export const getNextAlignmentIcon = componentData => {
  const { alignment } = new Divider(componentData);
  return {
    [ALIGN_LEFT]: AlignLeftIcon,
    [ALIGN_CENTER]: AlignCenterIcon,
    [ALIGN_RIGHT]: AlignRightIcon,
  }[alignment];
};
