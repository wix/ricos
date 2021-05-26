import { DEFAULT_CONFIG } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DEFAULT_PALETTE = ['#FFFFFF', '#D5D4D4', '#000000', '#ABCAFF', '#81B0FF', '#0261FF'];
export const getDefaultComponentData = (isLinkButton, rel, target) => {
  const linkButtonSettings = isLinkButton ? { url: '', rel, target } : {};
  return {
    config: DEFAULT_CONFIG,
    button: {
      settings: {
        buttonText: 'Click Me',
        ...linkButtonSettings,
      },
      design: {
        activeButton: 0,
        borderRadius: 0,
        borderWidth: 0,
        padding: 12,
      },
    },
  };
};
