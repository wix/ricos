const videoDataNormalizer = (componentData, normalizerConfig) => {
  if (
    componentData.disableDownload === undefined &&
    normalizerConfig.disableVideoDownload !== undefined
  ) {
    componentData.disableDownload = normalizerConfig.disableVideoDownload;
  }
  return componentData;
};

export default videoDataNormalizer;
