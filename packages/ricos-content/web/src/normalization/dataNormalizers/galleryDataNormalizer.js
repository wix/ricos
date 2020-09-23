import { Version } from '../../version';

export default (componentData, config, stateVersion) => {
  if (Version.lessThan(stateVersion, '6')) {
    const items = componentData.items.map(item => {
      const { metadata } = item;
      const altText = metadata.title;
      if (altText) {
        metadata.altText = altText;
      }
      // eslint-disable-next-line fp/no-delete
      delete metadata.title;
      return item;
    });
    componentData.items = items;
  }
  return componentData;
};
