import { Divider } from '../domain/divider';
import { Store, ComponentData } from 'wix-rich-content-common';

const COMPONENT_DATA = 'componentData';

const getDividerFromStore = (store: Store) => new Divider(store.get(COMPONENT_DATA));

const updateStoreConfig = (store: Store, config: ComponentData) => {
  store.update(COMPONENT_DATA, { config });
};

export const changeType = (type, _componentData: ComponentData, store: Store) => {
  store.update(COMPONENT_DATA, { type: type.value });
};

export const changeAlignmentMobile = ({ store }: { store: Store }) => {
  const divider = getDividerFromStore(store);
  updateStoreConfig(store, divider.getNextAlignmentConfig());
};

export const changeSizeMobile = ({ store }: { store: Store }) => {
  const divider = getDividerFromStore(store);
  updateStoreConfig(store, divider.getNextSizeConfig());
};
