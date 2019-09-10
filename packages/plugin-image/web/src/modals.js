import ImageSettingsModal from './toolbar/image-settings';
import ImageEditorModal from './imageStudio/image-editor';

const Modals = {
  IMAGE_SETTINGS: 'image-settings',
  IMAGE_EDITOR: 'image-editor',
};

const ModalsMap = {
  [Modals.IMAGE_SETTINGS]: ImageSettingsModal,
  [Modals.IMAGE_EDITOR]: ImageEditorModal,
};

export { Modals, ModalsMap };
