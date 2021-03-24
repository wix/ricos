const videoDataNormalizer = (componentData, normalizerConfig) => {
  const isDisableDownloadDefined = componentData.disableDownload !== undefined;
  const shouldNormalizeDisableDownload =
    !isDisableDownloadDefined && normalizerConfig.disableVideoDownload !== undefined;

  if (shouldNormalizeDisableDownload) {
    //normalize the old video config (settings.disableDownload)
    componentData.disableDownload = normalizerConfig.disableVideoDownload;
  } else if (
    // normalize disableRightClick(as disableDownload) from the USettings (USettings.disableRightClick)
    !isDisableDownloadDefined &&
    normalizerConfig.disableVideoDownload === undefined &&
    normalizerConfig.disableDownload !== undefined
  ) {
    componentData.disableDownload = normalizerConfig.disableDownload;
  }
  return componentData;
};

export default videoDataNormalizer;
