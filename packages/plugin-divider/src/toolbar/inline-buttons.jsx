import { BUTTONS } from 'wix-rich-content-common';
import {
  ALIGN_LEFT,
  ALIGN_CENTER,
  ALIGN_RIGHT,
  SIZE_SMALL,
  SIZE_MEDIUM,
  SIZE_LARGE
} from '../constants';
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  SizeSmallIcon,
  SizeMediumIcon,
  SizeLargeIcon
} from '../icons';
import {
  changeType,
  changeAlignment,
  changeSize,
  changeAlignmentMobile,
  changeSizeMobile
} from './actions';
import {
  isAligmentDisabled,
  getNextSizeIcon,
  getNextAlignmentIcon
} from './selectors';
import {
  getDropdownOptions,
  createDropdownValueGetter
} from './dropdown-options';

const dataHook = key => `divider-button__${key}`;

export default ({ styles }) => {
  const dropdownOptions = getDropdownOptions(styles);
  return [
    {
      keyName: 'type',
      type: BUTTONS.DROPDOWN,
      options: dropdownOptions,
      onChange: changeType,
      getValue: createDropdownValueGetter(dropdownOptions),
      controlClassName: styles['divider-dropdown__control'],
      tooltipTextKey: 'DividerPlugin_SelectType_Tooltip',
      mobile: true,
      dataHook: dataHook('line-type'),
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'sizeSmall',
      type: 'custom',
      icon: SizeSmallIcon,
      onClick: changeSize(SIZE_SMALL),
      tooltipTextKey: 'DividerPlugin_SizeSmallButton_Tooltip',
      dataHook: dataHook('size-small'),
    },
    {
      keyName: 'sizeMedium',
      type: 'custom',
      icon: SizeMediumIcon,
      onClick: changeSize(SIZE_MEDIUM),
      tooltipTextKey: 'DividerPlugin_SizeMediumButton_Tooltip',
      dataHook: dataHook('size-medium'),
    },
    {
      keyName: 'sizeLarge',
      type: 'custom',
      icon: SizeLargeIcon,
      onClick: changeSize(SIZE_LARGE),
      tooltipTextKey: 'DividerPlugin_SizeLargeButton_Tooltip',
      dataHook: dataHook('size-large'),
    },
    {
      keyName: 'sizeMobile',
      type: 'custom',
      icon: SizeLargeIcon,
      onClick: changeSizeMobile,
      mobile: true,
      desktop: false,
      mapComponentDataToButtonProps: componentData => ({
        icon: getNextSizeIcon(componentData),
      }),
      dataHook: dataHook('size-mobile'),
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'alignLeft',
      type: 'custom',
      icon: AlignLeftIcon,
      tooltipTextKey: 'DividerPlugin_AlignLeftButton_Tooltip',
      onClick: changeAlignment(ALIGN_LEFT),
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAligmentDisabled(componentData),
      }),
      dataHook: dataHook('align-left'),
    },
    {
      keyName: 'alignCenter',
      type: 'custom',
      icon: AlignCenterIcon,
      onClick: changeAlignment(ALIGN_CENTER),
      tooltipTextKey: 'DividerPlugin_AlignCenterButton_Tooltip',
      dataHook: dataHook('align-center'),
    },
    {
      keyName: 'alignRight',
      type: 'custom',
      icon: AlignRightIcon,
      onClick: changeAlignment(ALIGN_RIGHT),
      tooltipTextKey: 'DividerPlugin_AlignRightButton_Tooltip',
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAligmentDisabled(componentData),
      }),
      dataHook: dataHook('align-right'),
    },
    {
      keyName: 'alignMobile',
      type: 'custom',
      icon: AlignCenterIcon,
      onClick: changeAlignmentMobile,
      mobile: true,
      desktop: false,
      mapComponentDataToButtonProps: componentData => ({
        icon: getNextAlignmentIcon(componentData),
        disabled: isAligmentDisabled(componentData),
      }),
      dataHook: dataHook('align-mobile'),
    },
    { keyName: 'separator3', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true }
  ];
};
