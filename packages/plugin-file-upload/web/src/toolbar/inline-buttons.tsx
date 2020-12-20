import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { MediaReplaceIcon } from '../icons';
import { CreateInlineButtons, TranslationFunction } from 'wix-rich-content-common';
import { FilePluginEditorConfig } from '../types';

const createInlineButtons: CreateInlineButtons = ({
  settings,
  t,
}: {
  t: TranslationFunction;
  settings: FilePluginEditorConfig;
}) => {
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;
  return [
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
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

export default createInlineButtons;
