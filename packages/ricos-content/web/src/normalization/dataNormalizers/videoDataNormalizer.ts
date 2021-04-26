const videoDataNormalizer = (componentData, normalizerConfig) => {
  const shouldNormalizeDisableDownload =
    componentData.disableDownload === undefined && normalizerConfig.disableDownload;

  if (shouldNormalizeDisableDownload) {
    componentData.disableDownload = true;
  }

  return componentData;
};

export default videoDataNormalizer;
