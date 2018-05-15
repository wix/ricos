import {
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL
} from '../constants';
import { getConfigFromStore, getNextValue } from './selectors';

export const changeType = (type, _componentData, store) => {
  store.update('componentData', { type: type.value });
};

export const changeAlignment = dividerAlignment => ({ store }) => {
  const config = getConfigFromStore(store);
  store.update('componentData', { config: { ...config, dividerAlignment } });
};

export const changeSize = dividerSize => ({ store }) => {
  const config = getConfigFromStore(store);
  store.update('componentData', { config: { ...config, dividerSize } });
};

export const changeAlignmentMobile = ({ store }) => {
  const config = getConfigFromStore(store);
  const dividerAlignment = getNextValue([ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT], config.dividerAlignment);
  store.update('componentData', {
    config: { ...config, dividerAlignment },
  });
};

export const changeSizeMobile = ({ store }) => {
  const config = getConfigFromStore(store);
  const dividerSize = getNextValue([SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL], config.dividerSize);
  store.update('componentData', {
    config: { ...config, dividerSize },
  });
};
