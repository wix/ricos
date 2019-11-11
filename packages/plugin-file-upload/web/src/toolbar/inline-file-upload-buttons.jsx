import { BUTTONS } from 'wix-rich-content-common';
import { MediaReplaceIcon } from '../icons';
import { get } from 'lodash';

export default ({ settings, t }) => {
  const icon = get(settings, 'toolbar.icons') || {};
  return [
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.FILES,
      icon: icon.replace || MediaReplaceIcon,
      settings,
      tooltipTextKey: t('FileUploadReplaceButton_tooltip'),
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
