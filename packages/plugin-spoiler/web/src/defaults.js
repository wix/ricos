import { SPOILER_TYPE } from './types';

export const DEFAULTS = {
  config: {
    preview: {
      enable: true,
    },
  },
};
export const THEME = colors => ({
  [SPOILER_TYPE]: {
    color: colors.actionColor,
    textDecoration: 'none',
  },
});
