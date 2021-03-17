const imageDataNormalizer = (componentData, normalizerConfig) => {
  const shouldNormalizeRightClick =
    componentData.disableDownload === undefined &&
    normalizerConfig.disableDownload !== undefined;

  const shouldNormalizeExpand =
    componentData.disableExpand === undefined && normalizerConfig.disableImagesExpand !== undefined;

  if (shouldNormalizeRightClick) {
    componentData.disableDownload = normalizerConfig.disableDownload;
  }

  if (shouldNormalizeExpand) {
    componentData.disableExpand = normalizerConfig.disableImagesExpand;
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
