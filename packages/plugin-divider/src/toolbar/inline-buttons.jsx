import {
  BUTTONS,
  AlignmentCenterIcon,
  SizeLargeIcon
} from 'wix-rich-content-common';
import {
  changeType,
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
      dataHook: dataHook('line-type')
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL },
    { keyName: 'sizeMedium', type: BUTTONS.SIZE_MEDIUM },
    { keyName: 'sizeLarge', type: BUTTONS.SIZE_LARGE },
    {
      keyName: 'sizeMobile',
      type: 'custom',
      icon: SizeLargeIcon,
      onClick: changeSizeMobile,
      tooltipTextKey: 'DividerPlugin_SizeMobileButton_Tooltip',
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
      type: BUTTONS.ALIGNMENT_LEFT,
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAligmentDisabled(componentData)
      })
    },
    { keyName: 'alignCenter', type: BUTTONS.ALIGNMENT_CENTER },
    { keyName: 'alignRight', type: BUTTONS.ALIGNMENT_RIGHT,
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAligmentDisabled(componentData)
      })
    },
    {
      keyName: 'alignMobile',
      type: 'custom',
      icon: AlignmentCenterIcon,
      onClick: changeAlignmentMobile,
      mobile: true,
      desktop: false,
      tooltipTextKey: 'DividerPlugin_AlignMobileButton_Tooltip',
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
