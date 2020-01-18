import { configurables, DEFAULTS } from './constants';

export const getType = (componentData = {}) => componentData.type || DEFAULTS.type;

export const getConfig = (componentData = {}) => {
  const config = componentData.config || {};
  configurables.forEach(fld => {
    config[fld] = config[fld] || DEFAULTS.config[fld];
  });

  return config;
};
