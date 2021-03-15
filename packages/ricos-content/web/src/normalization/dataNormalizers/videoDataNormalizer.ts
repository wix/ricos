const videoDataNormalizer = (componentData, normalizerConfig) => {
  const shouldNormalizeDisableDownload =
    componentData.disableDownload === undefined &&
    normalizerConfig.disableVideoDownload !== undefined;

  if (shouldNormalizeDisableDownload) {
    componentData.disableDownload = normalizerConfig.disableVideoDownload;
  }

  return componentData;
};

export default videoDataNormalizer;
