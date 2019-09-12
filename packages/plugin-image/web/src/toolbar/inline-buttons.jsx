import { BUTTONS, PluginSettingsIcon, getModalStyles } from 'wix-rich-content-common';
import { Modals } from '../modals';
import { MediaReplaceIcon, ImageEditorIcon } from '../icons';

const removeEmpty = list => list.filter(item => !!item);

export default ({ t, anchorTarget, relValue, uiSettings, isMobile, imageEditorWixSettings }) => {
  const modalStyles = getModalStyles({ isMobile });
  const imageEditorStyles = getModalStyles({
    customStyles: { content: { maxWidth: '100%', background: 'transparent' } },
  });
  const imageEditorButton = imageEditorWixSettings
    ? {
        keyName: 'imageEditor',
        type: BUTTONS.EXTERNAL_MODAL,
        icon: ImageEditorIcon,
        modalName: Modals.IMAGE_EDITOR,
        modalStyles: imageEditorStyles,
        t,
        imageEditorWixSettings,
        mobile: false,
        tooltipTextKey: 'ImageEditorButton_Tooltip',
      }
    : null;

  const buttons = [
    { keyName: 'sizeOriginal', type: BUTTONS.SIZE_ORIGINAL, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'alignLeft', type: BUTTONS.ALIGN_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.ALIGN_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.ALIGN_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'link', type: BUTTONS.LINK, mobile: false },
    imageEditorButton,
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: PluginSettingsIcon,
      modalName: Modals.IMAGE_SETTINGS,
      modalStyles,
      anchorTarget,
      relValue,
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      uiSettings,
    },
    {
      keyName: 'replace',
      type: BUTTONS.FILES,
      onFilesSelected: (pubsub, files) => {
        if (files.length > 0) {
          pubsub.getBlockHandler('handleFilesSelected')(files);
        }
      },
      icon: MediaReplaceIcon,
      mobile: true,
      tooltipTextKey: 'ReplaceImageButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];

  return removeEmpty(buttons);
};
