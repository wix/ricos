import { BUTTONS, AlignCenterIcon, SizeLargeIcon } from 'wix-rich-content-editor-common';
import { changeType, changeAlignmentMobile, changeSizeMobile } from './actions';
import { isAlignmentDisabled, getNextSizeIcon, getNextAlignmentIcon } from './selectors';
import { getDropdownOptions, createDropdownValueGetter } from './dropdown-options';
import { CreateInlineButtons } from 'wix-rich-content-common';

export const createInlineButtons: CreateInlineButtons<'styles' | 't' | 'settings'> = ({
  styles,
  t,
  settings,
}) => {
  const dropdownOptions = getDropdownOptions(styles);
  const icons = settings?.toolbar?.icons || {};
  return [
    {
      keyName: 'type',
      type: BUTTONS.DROPDOWN,
      options: dropdownOptions,
      onChange: changeType,
      getValue: createDropdownValueGetter(dropdownOptions),
      controlClassName: styles?.['divider-dropdown__control'],
      tooltipTextKey: 'DividerPlugin_SelectType_Tooltip',
      t,
      mobile: true,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL },
    { keyName: 'sizeMedium', type: BUTTONS.SIZE_MEDIUM },
    { keyName: 'sizeLarge', type: BUTTONS.SIZE_LARGE },
    {
      keyName: 'sizeMobile',
      type: BUTTONS.CUSTOM,
      icon: icons.sizeMobile || SizeLargeIcon,
      onClick: changeSizeMobile,
      mobile: true,
      desktop: false,
      mapComponentDataToButtonProps: componentData => ({
        icon: getNextSizeIcon(componentData),
      }),
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'alignLeft',
      type: BUTTONS.TEXT_ALIGN_LEFT,
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAlignmentDisabled(componentData),
      }),
    },
    { keyName: 'alignCenter', type: BUTTONS.TEXT_ALIGN_CENTER },
    {
      keyName: 'alignRight',
      type: BUTTONS.TEXT_ALIGN_RIGHT,
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAlignmentDisabled(componentData),
      }),
    },
    {
      keyName: 'alignMobile',
      type: BUTTONS.CUSTOM,
      icon: icons.alignMobile || AlignCenterIcon,
      onClick: changeAlignmentMobile,
      mobile: true,
      desktop: false,
      mapComponentDataToButtonProps: componentData => ({
        icon: getNextAlignmentIcon(componentData),
        disabled: isAlignmentDisabled(componentData),
      }),
    },
    { keyName: 'separator3', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
