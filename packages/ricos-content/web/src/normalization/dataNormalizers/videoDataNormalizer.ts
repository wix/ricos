const videoDataNormalizer = (componentData, normalizerConfig) => {
  const shouldNormalizeDisableDownload =
    componentData.disableDownload === undefined &&
    normalizerConfig.disableVideoDownload !== undefined;
  // the first condition normalize the old video config
  // the second condition normalize disableRightClick(as disableDownload) from the viewer config
  if (shouldNormalizeDisableDownload) {
    componentData.disableDownload = normalizerConfig.disableVideoDownload;
  } else if (
    componentData.disableDownload === undefined &&
    normalizerConfig.disableVideoDownload === undefined &&
    normalizerConfig.disableDownload !== undefined
  ) {
    componentData.disableDownload = normalizerConfig.disableDownload;
  }
  return componentData;
};

export default videoDataNormalizer;
