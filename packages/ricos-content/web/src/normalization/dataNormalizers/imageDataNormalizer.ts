const imageDataNormalizer = (componentData, normalizerConfig) => {
  const shouldNormalizeDisableDownload =
    componentData.disableDownload === undefined && normalizerConfig.disableDownload !== undefined;

  const shouldNormalizeExpand =
    componentData.disableExpand === undefined && normalizerConfig.disableImagesExpand !== undefined;

  if (shouldNormalizeDisableDownload) {
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
