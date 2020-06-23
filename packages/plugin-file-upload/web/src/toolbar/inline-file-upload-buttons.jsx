import { BUTTONS } from 'wix-rich-content-editor-common';
import { MediaReplaceIcon } from '../icons';

export default ({ settings, t }) => {
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;
  return [
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.ALIGN_CENTER, mobile: false },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator3', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.FILES,
      icon,
      settings,
      tooltipTextKey: t('FileUploadReplaceButton_tooltip'),
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
