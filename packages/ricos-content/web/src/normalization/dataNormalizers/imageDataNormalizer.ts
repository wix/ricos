const imageDataNormalizer = (componentData, normalizerConfig) => {
  const shouldNormalizeRightClick =
    componentData.disableRightClick === undefined &&
    normalizerConfig.disableRightClick !== undefined;

  const shouldNormalizeExpand =
    componentData.disableExpand === undefined && normalizerConfig.disableExpand !== undefined;

  if (shouldNormalizeRightClick) {
    componentData.disableRightClick = normalizerConfig.disableRightClick;
  }
  if (shouldNormalizeExpand) {
    componentData.disableExpand = normalizerConfig.disableExpand;
  }

  const { width, config = {}, ...rest } = componentData;
  if (config.size === 'inline' && width && !config.width) {
    return {
      ...rest,
      config: {
        ...config,
        width,
      },
    };
  } else {
    return componentData;
  }
};

export default imageDataNormalizer;
