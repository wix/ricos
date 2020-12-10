// This is your plugin's ModalSetting & ModalMap.
// Uncomment if you need it.

import UnavailableOnOneAppModal from './components/unavailable-on-oneapp-modal';

const Modals = {
  UNAVAILABLE_ON_ONEAPP_SETTINGS: 'unavailable-on-oneapp',
};

const ModalsMap = {
  [Modals.UNAVAILABLE_ON_ONEAPP_SETTINGS]: UnavailableOnOneAppModal,
};

export { Modals, ModalsMap };
