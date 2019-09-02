import { BUTTONS } from 'wix-rich-content-common';
import { MediaReplaceIcon } from '../icons';

export default ({ settings, t }) => {
  return [
    { keyName: 'sizeSmallLeft', type: BUTTONS.ALIGN_LEFT, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.ALIGN_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.FILES,
      icon: MediaReplaceIcon,
      settings,
      tooltipTextKey: t('FileUploadReplaceButton_tooltip'),
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
