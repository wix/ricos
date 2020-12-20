import GallerySettingsModal from './components/gallery-settings-modal';

const Modals = {
  GALLERY_SETTINGS: 'gallery-settings',
};

const ModalsMap = {
  [Modals.GALLERY_SETTINGS]: GallerySettingsModal,
};

export { Modals, ModalsMap };
