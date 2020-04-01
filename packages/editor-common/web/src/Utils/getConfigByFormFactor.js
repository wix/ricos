import { get } from 'lodash';
import { isiOS } from './osUtils';

export const getConfigByFormFactor = ({ config, isMobile, defaultValue }) => {
  const offsetPath = !isMobile ? 'desktop' : isiOS() ? 'mobile.ios' : 'mobile.android';
  return get(config, offsetPath, defaultValue);
};
