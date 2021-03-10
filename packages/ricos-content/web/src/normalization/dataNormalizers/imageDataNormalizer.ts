const imageDataNormalizer = (componentData, normalizerConfig) => {
  if (
    componentData.disableRightClick === undefined &&
    normalizerConfig.disableRightClick !== undefined
  ) {
    componentData.disableRightClick = normalizerConfig.disableRightClick;
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
