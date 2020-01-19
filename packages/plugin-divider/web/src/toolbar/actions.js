import { Divider } from '../domain/divider';

const COMPONENT_DATA = 'componentData';

const updateStore = (store, obj) => {
  store.update(COMPONENT_DATA, obj);
};

const getDividerFromStore = store => new Divider(store.get(COMPONENT_DATA));

const updateStoreConfig = (store, config) => {
  updateStore(store, { config });
};

export const changeType = (type, _componentData, store) => {
  updateStore(store, { type: type.value });
};

export const changeAlignmentMobile = ({ store }) => {
  const divider = getDividerFromStore(store);
  const { config } = divider;
  const alignment = divider.getNextAlignment();
  updateStoreConfig(store, { ...config, alignment });
};

export const changeSizeMobile = ({ store }) => {
  const divider = getDividerFromStore(store);
  const { config } = divider;
  const size = divider.getNextSize();
  updateStoreConfig(store, { ...config, size });
};
