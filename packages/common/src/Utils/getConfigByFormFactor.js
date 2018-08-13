import get from 'lodash/get';
import WixUtils from './wixUtils';

export const getConfigByFormFactor = ({ config, isMobile, defaultValue }) => {
  const offsetPath = !isMobile ? 'desktop' : WixUtils.isiOS() ? 'mobile.ios' : 'mobile.android';
  return get(config, offsetPath, defaultValue);
};
