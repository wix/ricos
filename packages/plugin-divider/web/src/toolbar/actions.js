import { Divider } from '../domain/divider';

const COMPONENT_DATA = 'componentData';

const getDividerFromStore = store => new Divider(store.get(COMPONENT_DATA));

const updateStoreConfig = (store, config) => {
  store.update(COMPONENT_DATA, { config });
};

export const changeType = (type, _componentData, store) => {
  store.update(COMPONENT_DATA, { type: type.value });
};

export const changeAlignmentMobile = ({ store }) => {
  const divider = getDividerFromStore(store);
  updateStoreConfig(store, divider.getNextAlignmentConfig());
};

export const changeSizeMobile = ({ store }) => {
  const divider = getDividerFromStore(store);
  updateStoreConfig(store, divider.getNextSizeConfig());
};
