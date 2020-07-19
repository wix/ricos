import { SettingsModal } from './components/settings';

const Modals = {
  POLL_SETTINGS: 'poll-settings',
};

const ModalsMap = {
  [Modals.POLL_SETTINGS]: SettingsModal,
};

export { Modals, ModalsMap };
