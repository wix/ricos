import { Version } from '../../version';

export default (componentData, normalizerConfig, stateVersion: string) => {
  const shouldNormalizeRightClick =
    componentData.disableRightClick === undefined &&
    normalizerConfig.disableRightClick !== undefined;

  const shouldNormalizeExpand =
    componentData.disableExpand === undefined &&
    normalizerConfig.disableGalleryExpand !== undefined;

  if (shouldNormalizeRightClick) {
    componentData.disableRightClick = normalizerConfig.disableRightClick;
  }

  if (shouldNormalizeExpand) {
    componentData.disableExpand = normalizerConfig.disableGalleryExpand;
  }

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
