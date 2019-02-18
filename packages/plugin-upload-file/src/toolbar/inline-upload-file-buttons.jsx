import { BUTTONS } from 'wix-rich-content-common';
import { MediaReplaceIcon } from '../icons';

export default ({ t, settings }) => {
  return [
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.FILES,
      icon: MediaReplaceIcon,
      settings,
      tooltipTextKey: t('replace_file_tooltip'),
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
