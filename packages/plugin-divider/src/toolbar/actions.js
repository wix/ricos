import {
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
} from '../constants';
import { getConfigFromStore, getNextValue } from './selectors';

export const changeType = (type, _componentData, store) => {
  store.update('componentData', { type: type.value });
};

export const changeAlignmentMobile = ({ store }) => {
  const config = getConfigFromStore(store);
  const alignment = getNextValue([ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT], config.alignment);
  store.update('componentData', {
    config: { ...config, alignment },
  });
};

export const changeSizeMobile = ({ store }) => {
  const config = getConfigFromStore(store);
  const size = getNextValue([SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL], config.size);
  store.update('componentData', {
    config: { ...config, size },
  });
};
